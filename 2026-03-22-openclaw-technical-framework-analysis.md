# OpenClaw 技术框架分析

> 研究日期：2026-03-22
> 参考：GitHub openclaw/openclaw、ppaolo.substack.com、mariozechner.at

---

## 一、项目定位

OpenClaw 是一个**自托管的个人 AI 助手运行时**，核心价值是把 AI Agent 接入你日常使用的聊天平台（WhatsApp、Telegram、Discord 等 20+ 个）。

- 作者：奥地利开发者 Peter Steinberger
- 发布时间：2025 年 11 月（最初名为 Clawdbot）
- 改名历程：Clawdbot → Moltbot（被 Anthropic 商标投诉）→ OpenClaw
- 上线 24 小时获 9000 GitHub Stars，2026 年 2 月已超 214,000 Stars
- 技能生态：ClawHub 上 5700+ 社区技能

**设计哲学**：配置驱动，不写代码，写 Markdown 文件即可定义一个 Agent 的全部行为。

---

## 二、现成框架和库

### 语言 & 运行时

| 层级 | 技术 |
|------|------|
| 主要语言 | TypeScript / Node.js（核心） |
| 移动端 | Swift（macOS/iOS）、Kotlin（Android） |
| 运行时要求 | Node 22.16+ 或 Node 24+ |
| 包管理 | pnpm |
| 可选运行器 | Bun |

### 消息平台接入（全部用现成 SDK）

| 平台 | 库 |
|------|-----|
| WhatsApp | Baileys |
| Telegram | grammY |
| Slack | Bolt |
| Discord | discord.js |
| Signal | signal-cli |
| Google Chat | Chat API |

### 前端 & UI

- React + Primer React（Web 控制台）
- Lit（Web Components，轻量 UI 组件）
- Vite（构建工具）

### 基础设施

- SQLite（会话存储 + 向量嵌入语义检索）
- WebSocket `ws` 库（Gateway 控制平面）
- Commander.js（CLI 工具）
- Docker / Podman（工具沙箱隔离）
- ElevenLabs（语音 TTS/STT）
- Chromium + CDP（浏览器自动化）

### AI 运行时核心

- `@mariozechner/pi-agent-core`（pi Agent 库）
- OpenClaw 直接 import 使用，而非 subprocess 调用，通过 `createAgentSession()` 实例化

### 开发工具链

- Vitest（测试，要求 70% 覆盖率）
- oxlint + prettier + shellcheck（代码规范）

---

## 三、原创设计

### 1. Gateway 控制平面

自研 WebSocket 服务，绑定 `ws://127.0.0.1:18789`，是整个系统的单一数据总线。所有消息平台、设备节点、AI Agent 都通过它路由。管理会话、presence、cron 任务、webhook。

### 2. 六阶段消息处理流水线

```
Ingestion         → 接收平台消息，提取文本和元数据
Access Control    → allowlist 验证 + 会话解析
Context Assembly  → 加载 workspace 文件 + 历史 + 语义记忆 + 技能定义
Model Invocation  → 流式请求 LLM
Tool Execution    → 执行 bash / 浏览器 / 文件 / 技能工具
Response Delivery → 格式化后写回各平台，持久化会话状态
```

### 3. Workspace 配置文件体系

OpenClaw 原创的"配置即代理"设计，用 Markdown 文件定义 Agent 行为：

| 文件 | 归属 | 作用 |
|------|------|------|
| `AGENTS.md` | **行业标准**（非 OpenClaw 原创） | 定义 Agent 能力和行为规则，由 OpenAI/Cursor/Google 等共同推动，现由 Linux 基金会管理 |
| `SOUL.md` | **OpenClaw 原创** | 定义 Agent 人格、价值观、沟通风格、行为边界 |
| `TOOLS.md` | **OpenClaw 原创** | 声明 Agent 可用工具 |
| `HEARTBEAT.md` | **OpenClaw 原创** | 定时任务配置 |

> 注：`AGENTS.md` 是跨项目的行业标准，pi coding agent 也在使用，但两者都不是发明者。`SOUL.md` 才是 OpenClaw 独有的。

### 4. 技能（Skills）系统

插件化能力扩展，通过 `package.json` 的 `openclaw.extensions` 字段发现插件，支持 channel / memory / tool / provider 四类插件。技能可以按 Agent 粒度过滤，不同 Agent 拥有不同能力子集。

### 5. 设备节点协议（Device Node Protocol）

macOS / iOS / Android 设备通过 Gateway WebSocket 注册为节点，广播自身能力：
```
node.list    → 列出所有节点
node.describe → 描述节点能力
node.invoke  → 跨设备调用能力
```
Agent 可以跨设备操作（如控制手机、读取本地文件）。

### 6. DM Pairing 安全机制

陌生人发消息不直接执行，先发配对码，用户审批后才处理。默认策略 `dmPolicy=pairing`，防止任意人触发你的 Agent。

### 7. 多 Agent 路由

不同聊天频道 / 群组路由到完全隔离的 Agent 实例，每个 mapping 独立控制：workspace、模型选择、system prompt 覆盖、沙箱策略。

### 8. Canvas + A2UI

Agent 驱动的可视化工作区，专有 UI 框架，允许 Agent 渲染和操控一个"画布"界面。

---

## 四、整体架构

```
消息平台（WhatsApp / TG / Discord / ...20+）
    ↓ Baileys / grammY / discord.js（现成 SDK）
Gateway WebSocket 127.0.0.1:18789 ← 自研核心
    ↓
Access Control（allowlist + DM pairing）← 原创
    ↓
Context Assembly
  ├── SOUL.md / AGENTS.md / TOOLS.md（原创配置体系）
  ├── 会话历史（SQLite）
  ├── 语义记忆检索（向量嵌入）
  └── 技能定义（动态注入）
    ↓
pi-agent-core（第三方 AI 推理库）
    ↓
LLM Provider（OpenAI 等）
    ↓
Tool Execution
  ├── bash / 文件 / 浏览器（CDP）
  └── 技能插件（Docker 沙箱隔离）
    ↓
Response → 回写各平台
```

---

## 五、存储结构

```
~/.openclaw/
├── openclaw.json       # 主配置（JSON5 格式）
├── sessions/           # 会话历史（append-only event log）
├── memory/<agentId>.sqlite  # 语义记忆（向量嵌入）
└── credentials/        # 平台凭证（0600 权限）
```

---

## 六、总结

| 维度 | 结论 |
|------|------|
| 消息接入层 | 全部用现成 SDK |
| AI 推理层 | pi-agent-core 第三方库 |
| 前端 | React + Primer（现成） |
| 存储 | SQLite（现成） |
| 真正原创 | Gateway 控制平面、SOUL.md 体系、六阶段流水线、技能系统、设备节点协议、DM Pairing、多 Agent 路由 |

OpenClaw 的策略：底层能复用的全部复用，精力集中在"如何把 20+ 消息平台统一成一个持久化 Agent 运行时"这个核心原创问题上。

---

## 参考资料

- [GitHub - openclaw/openclaw](https://github.com/openclaw/openclaw)
- [OpenClaw Architecture, Explained](https://ppaolo.substack.com/p/openclaw-system-architecture-overview)
- [What I learned building pi coding agent](https://mariozechner.at/posts/2025-11-30-pi-coding-agent/)
- [agents.md 官网](https://agents.md/)
- [Pi Integration Architecture - OpenClaw Docs](https://docs.openclaw.ai/pi)
