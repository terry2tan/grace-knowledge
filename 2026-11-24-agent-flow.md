---
title: Agent Flow：把 Claude Code / Codex 的 Agent 编排变成实时节点图
date: 2026-11-24
source: GitHub / patoles（Simon Patole，Antics）
url: https://github.com/patoles/agent-flow
type: repo
tags: [AI, 工具, AI产品]
---

## 摘要

**1,810 star / 224 fork / Apache-2.0 / TypeScript / 建仓 2026-03-21，至今仍在日更（v0.9.6）**。一句话：**给「黑盒里跑的 Agent」装一块实时仪表盘**——Claude Code 和 Codex 的每一轮工具调用、每一次子 Agent 派生与返回、每一次等待授权，都渲染成可平移缩放的节点图，而不是等最后看结果。

作者 Simon Patole 是在做 [Antics](https://antics.gg)（AI Agent 驱动的游戏创作平台）时被 debug Agent 逼出来的：「你看得到最终结果，看不到旅程」。同一作者的配套工具 **Ravenry** 走另一条路——把多个 session 铺成一块看板，标出哪个在等你、并支持手机直接回话。

**三种入口**：`npx agent-flow-app`（浏览器，零安装）／源码跑 Next.js web + 事件中继／VS Code 扩展（兼容 Cursor、Windsurf，1.85+）。

为什么值得收：它不是又一个 Agent 框架，而是**一个公开可读的「Agent 运行时可观测性」实现**——两条数据通道（实时 hook + 事后 transcript 轮询）、一个 12 类型的最小事件协议、若干「事件源不存在时靠推理补」的工程技巧。这些正好是自建 Agent 系统（比如 OpenClaw）做可视化时缺的那块。

## 一、架构：两条数据通道 + 一个统一事件模型

```
Claude Code hooks ──POST JSON──▶ HookServer (localhost:随机端口)
                                  │
Claude transcripts ──fs.watch────▶ SessionWatcher ──▶ AgentEvent ──▶ Webview / SSE
Codex rollout.jsonl ──tail───────▶ CodexSessionWatcher      │
任意 AgentEvent JSONL ───────────▶ JsonlEventSource         ▼
                                                    Canvas 节点图 + 时间轴 + 转录面板
```

### 通道 1：Hooks → 本地 HTTP（零延迟）

自动写入 `~/.claude/settings.json`（或工作区 `.claude/settings.local.json`），注册 **9 个事件**：`SessionStart / PreToolUse / PostToolUse / PostToolUseFailure / SubagentStart / SubagentStop / Notification / Stop / SessionEnd`。每个 hook 只是一个命令，把 payload POST 给本地服务器。

工程细节写得比多数同类项目严谨：

- **端口 0** 让 OS 分配，避免多实例抢端口；被占时返回 `HOOK_SERVER_NOT_STARTED = -1` 而不是崩
- **hook timeout 2 秒**，且转发脚本自己设 1 秒超时、内部还留 500ms 安全边际（`HOOK_SAFETY_MARGIN_MS`）——保证 hook 一定在 Claude Code 杀掉它之前退出，不会拖慢主流程
- **请求守卫**：校验 Host/Origin 必须是 localhost 模式，body 上限 1MB（`request-guard.ts`，39 行）
- **幂等合并**：不是覆盖 settings.json，而是 merge 自己的 hook 条目；还带 `migrateLegacyHttpHooks()` 迁移旧格式、manifest 记录已配置过的工作区、以及 uninstall 脚本

### 通道 2：Transcript 轮询（hooks 挂了也能用）

读 `~/.claude/projects/<编码后的项目路径>/<session-uuid>.jsonl`，逐行解析 `assistant` 消息里的 `tool_use` 块和 `user` 消息里的 `tool_result` 块。子 Agent 的转录在独立目录，靠 `.meta.json` sidecar 拿名字；拿不到就用文件名哈希生成稳定名，**避免多个 workflow subagent 撞成同一个节点**。

- `fs.watch` 为主 + **3 秒轮询兜底**（`POLL_FALLBACK_MS`，防 fs.watch 漏事件）
- 增量读：记录 offset + tail 缓冲（`readNewFileLines`），只处理新追加的行
- 会话发现：只捞 10 分钟内写过的文件（`ACTIVE_SESSION_AGE_S`），但**故意设得比"不活跃判定"更长**（5 分钟），这样长时间 extended thinking 不会把会话误判成结束

### 通道 3 / 4：Codex rollout + 任意 JSONL

Codex 侧读 `~/.codex/sessions/**/rollout-*.jsonl`（尊重 `CODEX_HOME`），而且专门去拿 **Codex 自己事件流里的权威 token 数**，不靠估算。

第四条是最有移植价值的：`agentVisualizer.eventLogPath` 指向任意 `.jsonl`，每行只要满足

```json
{"time": 1234567890, "type": "tool_call_start", "payload": {...}}
```

就当成事件渲染。**这就是给任何 Agent runtime 接这块画布的入口**（见下文第三节）。

## 二、事件模型：12 个类型就够了

```ts
type AgentEventType =
  | 'agent_spawn' | 'agent_complete' | 'agent_idle'
  | 'message' | 'context_update' | 'model_detected'
  | 'tool_call_start' | 'tool_call_end'
  | 'subagent_dispatch' | 'subagent_return'
  | 'permission_requested' | 'error'
```

`time` + `type` + 扁平 `payload` + 可选 `sessionId`。就这么多。`tool_call_start/end` 会带 `toolUseId`（Claude 的 tool_use id / Codex 的 call_id），**以便并行调用同一个工具时能正确配对**——这是并行 Agent 可观测性里最容易做错的地方。

## 三、最值得偷的一个技巧：把「沉默」当信号

Claude Code **没有提供「正在等你授权」的 hook**。这类状态通常只能靠屏幕截取或人工盯着。Agent Flow 的解法是**推理式可观测性**（`permission-detection.ts`，84 行）：

1. 有 pending 的工具调用（排除 `Agent` / `Task` 这类本身就是派生的）→ 起一个 5 秒定时器
2. 定时器到期时复查：这些 pending 的工具调用是否仍在（且是定时器启动前就挂着的，不是新加的）
3. 还要排除「其实在跑」的情况——检查该 session 的主/子转录文件最近 5 秒内有没有被写入；有写入说明工具在执行，不是卡在授权
4. 确认静止 → 发 `permission_requested`
5. 一旦有新活动 → 反向发一个 `agent_idle` 把那个视觉状态清掉

**这套「pending + 无外部活动 + 超阈值 → 推断阻塞」的模式可以推广到任何没有显式事件的等待态**：CI 卡住、长检索无返回、子 Agent 静默超时。它比「等事件」更工程化，也比「定时截图 + OCR」便宜一个数量级。

## 四、体量与工程质量

| 部分 | 规模 |
|---|---|
| `extension/src/` | **24 个模块 / 5,626 行**（transcript-parser 783、codex-rollout-parser 637、session-watcher 619、hook-server 357、subagent-watcher 319、webview-provider 281） |
| `web/` | **约 10,242 行**：canvas 渲染（draw-agents 392 / draw-cost 276 / canvas 352）、timeline-panel、message-feed、**文件注意度热力图**、cost 绘制、stress-test-scenario（给画布压测用） |
| `scripts/` | 1,439 行，其中 `relay.ts` 554 行是**独立事件中继**（hooks → buffer → SSE 广播），让浏览器版脱离 VS Code 也能跑 |
| 测试 | 15 个 `.test.ts`（hook-server、transcript-parser、codex-rollout-parser、subagent-watcher、session-relocation、request-guard…），CI 在 `.github/workflows/ci.yml` |

**所有魔法数集中在一个 `constants.ts`（215 行）**，且每条带注释解释"为什么是这个值"——比如 `INACTIVITY_TIMEOUT_MS = 5min` 的注释直接写「Claude 开 extended thinking 能想好几分钟，这里要宽容，避免误判完成」。截断上限也全在常量里（preview 60 / args 80 / result 200 / message 2000 字符）。

这是「小模块 + 集中常量 + 每个坑都留注释」的写法，读起来比功能更值得抄。

## 五、对 Terry 的实际用处

1. **OpenClaw 的可视化缺口有现成参照实现**。我们的 session 现在同样是黑盒；Agent Flow 给出了完整的一期方案：事件协议（`time/type/payload`）→ 采集（hooks 优先、文件轮询兜底）→ 中继（SSE）→ 画布。最短路径甚至不用改它——把 OpenClaw 的事件按 `AgentEvent` 写成 JSONL，用 `agentVisualizer.eventLogPath` 指过去就能先看效果，再决定要不要做 hook server。
2. **「沉默即阻塞」这个启发式可以直接搬**：我们的 cron/巡检/子 Agent 都可能卡在"等授权"或"静默超时"，这套 pending + 无活动 + 阈值的判定比轮询状态字段更稳。
3. **读 runtime 自己的事件日志，不要猜**。Codex 的 token 数取自 rollout 事件流而非估算；同理 OpenClaw 侧应优先读 session 事件而不是解析终端输出。
4. **`SubagentStart/Stop` + toolUseId 配对**是并行 Agent 可视化的两个必要条件，自己写的时候不要省。
5. 配套的 **Ravenry**（一块板看所有 session + 手机回答授权）如果真能用，可能是比可视化更省注意力的东西——Terry 的多 session 场景正好命中。

## 需要打问号的地方

- **依赖 Claude Code 内部文件格式**：`~/.claude/projects/<编码路径>/*.jsonl` 的结构、subagents 目录与 `.meta.json` sidecar 都不是公开契约，Claude Code 一改版就可能失效（这正是它同时做 hook 通道的原因，但 hook 事件名与 payload 同样是内部约定）
- **默认开启遥测**：`npx agent-flow-app` 发行版默认开（源码运行与 VS Code 扩展不发）。只报聚合值（session 数、时长、事件数、OS/arch、版本、模型 ID、runtime、错误类名），不发 prompt / 路径 / 工具参数。可用 `AGENT_FLOW_TELEMETRY=false` 或 `DO_NOT_TRACK=1` 关闭；`cat ~/.agent-flow/telemetry/events.jsonl` 可自检。**装之前知道这件事就行**
- 只覆盖 Claude Code 与 Codex 两个 runtime；其他 Agent 只能走自制 JSONL
- README 无任何性能数字（大 session 下的帧率、事件吞吐），`stress-test-scenario.ts` 存在但没公布压测结果；超长 session 的实际表现需自己验
- 未讨论可拆卸性以外的 Harness 原则（如架构约束），它自身只是可观测层，不改变 Agent 行为

## 链接

- 仓库：https://github.com/patoles/agent-flow
- 演示视频：https://www.youtube.com/watch?v=Ud6eDrFN-TA
- VS Code Marketplace：https://marketplace.visualstudio.com/items?itemName=simon-p.agent-flow
- 配套看板 Ravenry：https://patoles.github.io/ravenry/
- 作者产品 Antics：https://antics.gg
