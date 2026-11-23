---
title: agentcanvas：把 Logfire 的 Agent 追踪渲染成一份能投屏的单文件 HTML 流程报告
date: 2026-11-24
source: GitHub / vstorm-co（Vstorm）
url: https://github.com/vstorm-co/agentcanvas
type: repo
tags: [AI, 工具, 方法论]
---

## 摘要

**84 star / 9 fork / MIT / Python 3.12+ / 建仓 2026-06，11-19 仍在更新**。一句话：**把 OpenTelemetry GenAI span 树渲染成一份自包含 HTML 流程报告**——`用户 → Agent → 模型调用 → 工具 → 模型调用 → 回答`，嵌套子 Agent 递归画成内嵌边框，每个节点带 token、精确美元成本、推理过程、以及模型当时被提供了哪些工具可选。还有一个 **guided tour（自动/手动逐步播放）**，专门为「给客户投屏讲解」设计。

数据源是 **Logfire 的 Query API（SQL + read token）**，读的是 Pydantic AI 通过 instrumentation 打出的 OTel GenAI span（`invoke_agent <name>` / `chat <model>` / `execute_tool <name>`）。

**它和前一篇 Agent Flow 是同一个问题的两种解法**：Agent Flow 是开发期的实时监控（tail 文件 + hooks，多 runtime），agentcanvas 是事后的**交付物**（一次运行 → 一个 HTML 文件，可离线打开、可发给客户）。两者都收敛到同一个判断：**span/事件树本身就是那张图，可视化只是把树排成版**。

## 一、管线：四步，每步一个薄模块

```
Logfire（OTel GenAI spans）
   │  Query API（SQL + LOGFIRE_READ_TOKEN）
   ▼
logfire_client.py（104 行，httpx + SQL 字符串）
   ▼
parser.py（311 行：span 树 → 递归 payload）
   ▼
pricing.py（51 行：token → 精确成本，靠 genai-prices）
   ▼
render.py（812 行：payload 内嵌 → 单个 .html）
   ▼
agent_flow.html（离线可开，`const RUN = {...}`）
```

**总代码只有 1,760 行**（含测试），这是个刻意的取舍：不做流式、不做服务、不做存储，只做「一份 trace 进、一个 HTML 出」。

`logfire_client.py` 薄到可以忽略：一次 `httpx.get(f"{base}/v1/query", params={"sql": ...})`，然后把 Logfire 返回的列式结果转成行。取的关键列就 `span_id, parent_span_id, span_name, start/end_timestamp, duration, otel_status_code/message, attributes`——**除 `attributes` 外全是标准 OTel 字段**。所以换任何 OTLP 后端（或本地 SQLite 导出）基本只需重写这 104 行，主流程不动。这是它比「绑死某个平台的可视化」更值钱的地方。

## 二、数据模型：把一个 Agent 运行拆成四层递归

```python
WorkflowReport
├── meta     (trace_id, model, duration, num_turns, cost_known)
├── totals   (tokens, cost, reasoning_tokens, model_calls, tools, nested_agents, turns)
├── conversation[]  (role, text, thinking[], tool_calls[])   # 人读的转录
└── turns[]  → AgentRun    (agent_name, model, user_prompt, final_output, rounds[])
              └── rounds[] → ModelCall (model, tokens, cost_usd, thinking[], text_out[],
                                         decided_tool_calls[], available_tools[], tools[])
                             └── tools[] → ToolCall (name, arguments, result, duration_s,
                                                     nested: AgentRun | None)   ← 递归回 AgentRun
```

三个设计点值得抄：

1. **`ToolCall.nested` 指回 `AgentRun`**，靠 `ToolCall.model_rebuild()` 解前向引用——「工具本身是另一个 Agent」这件事在类型层面就是递归的，不靠 `depth` 字段加 if。
2. **`available_tools` 与 `decided_tool_calls` 都存**：不只知道模型调了什么，还知道**当时给了它什么可选**。「为什么它没选那个工具」这类问题才有答案。
3. **`cost_known: bool` 单独存在** `meta` 里。模型不在价格库中时，`pricing.py` 返回 `CostBreakdown(None, None, None, False)`——**成本显示「未知」，而不是猜一个数**。这个原则和 Agent Flow 的 token 估算器恰好相反，值得记：**能拿到权威数字就拿，拿不到就明说未知，别把估算混进财务口径**。

## 三、最值得学的一招：把「讲解」做进产物里

这份 HTML 不是给人「自己探索」的，是给人「照着讲」的：

- 工具栏一个 **Tour** 按钮，进入后所有未进行到的节点 `dim`，当前节点高亮 + 弹出**这段是干什么的解释**（不是数据，是讲解词："A tool is real code the agent invoked. The model chose the input; the function returned the output."）
- **自动播放**（每 2.4 秒一步）与**手动前后步**双模式，带 `Step 3 / 12` 进度条
- 布局是 Figma 式的 pan / zoom / drag，节点可点开 inspector
- 配色统一：所有节点类型（user / agent / model / tool / output）共用同一个强调色（Logfire 品红），靠形状和边框区分，而不是靠五种颜色互相打架

作者在 README 里把动机写得很直白：「客户很少理解一个『AI Agent』到底做了什么，他们只看到一个 prompt 和一个答案」。**所以这不是 debug 工具，是销售/汇报工具**——把「我们的 Agent 真的在干活、每一步值多少钱」变成可视证据。

对 Terry 的直接启发：**给客户/团队汇报 Agent 效果时，一个可逐步讲解的单文件 HTML 比任何 PPT 都强**，而且它天然带「每一步多少钱」这件事。

## 四、和 Agent Flow 的位置关系（别只收一个）

| 维度 | Agent Flow | agentcanvas |
|---|---|---|
| 时机 | 实时（hooks + 文件 tail） | 事后（拉一次 trace） |
| 产物 | 常驻面板 / 浏览器实时画布 | **单个自包含 .html** |
| 数据源 | Claude Code hooks、`~/.claude/projects/*.jsonl`、Codex rollout | OTel GenAI spans（Logfire Query API） |
| Runtime 覆盖 | Claude Code + Codex | 任何走 Pydantic AI + OTel 的 Agent |
| 强项 | 调试、多 session、卡在授权的提醒 | 交付、讲解、精确成本、递归嵌套结构 |
| 可移植性锚点 | 自制 `AgentEvent` JSONL | 标准 OTel span 字段（换后端 ≈ 重写 104 行 client） |

**两条路都能接到自己的系统上**：Agent Flow 提供「实时怎么看」，agentcanvas 提供「怎么把一次运行变成可交付物」。若要给 OpenClaw 做可视化，我的建议是**先做后者**——把 session 事件导成 OTel/JSON，出一份单文件报告，成本极低、当天就能拿去讲；实时面板是第二阶段。

## 五、工程质量

- `agentcanvas/` 只有 5 个功能性模块（client 104 / parser 311 / render 812 / pricing 51 / cli 79），`render.py` 之所以 812 行是因为整份 HTML+CSS+JS 模板内嵌在里面（一个字符串变量），换任何模板语言都会拆碎它的「单文件」特性
- **全类型标注**（pydantic 模型 + mypy），`make all` = ruff + mypy + pytest 必须过
- 4 个测试文件 + `tests/fixtures/trace_conversation.json`（真实 trace 形状的 fixture，含 thinking、多轮、嵌套子 Agent）
- 附 `assets/scripts/main.py` 一个**可运行的示例 Agent**（thinking + 5 个工具 + 嵌套子 Agent + 多轮对话），以及 `make_demo.py` / `make_screenshots.py` 生成 README 的 GIF 与截图——**文档素材本身也是脚本产出**，和上一篇 Claude Code Mastery 的「内容 harness」是同一个思路
- 有 CHANGELOG、CONTRIBUTING、CI（含 add-to-project），Vstorm 是家做生产 Agent 落地的咨询公司，这仓库是他们的作品集

## 需要打问号的地方

- **绑定 Pydantic AI v2 的 span 命名约定**（`invoke_agent <name>` / `chat <model>` / `execute_tool <name>`）。换个 Agent 框架即使也发 OTel，span 名对不上就要改 `parser.py`
- **Logfire 是它唯一的读取路径**，虽然 client 薄，但「Query API + SQL」这个假设在自建后端要重写；README 没提供直接从本地 OTLP collector 读的路径
- README 无成本准确性验证；`genai-prices` 的价格库更新滞后时，报告里的美元数会偏（好在有 `cost_known` 兜底为「未知」而非错值）
- 84 star / 9 fork，体量小，文档与 API 可能变动；无 demo 在线地址（只有 GIF/截图），需自己配 read token 才能验
- 只做「读 + 渲染」，不做 trace 采集；不做多 trace 对比（想看 A/B 两个版本的差异得自己跑两次并排开两个 HTML）

## 链接

- 仓库：https://github.com/vstorm-co/agentcanvas
- 母站（Vstorm，做生产 Agent 落地）：https://vstorm.co
- 依赖的价格库 `genai-prices`（Pydantic 出品）：https://github.com/pydantic/genai-prices
- 对比参照（本库）：`2026-11-24-agent-flow.md`
