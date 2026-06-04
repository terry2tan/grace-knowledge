---
title: agent-cli：Hyperliquid 自治交易 Agent
date: 2026-03-15
source: github.com
url: https://github.com/Nunchi-trade/agent-cli
type: repo
tags: [投资, AI产品, 工具]
---

## 摘要

`agent-cli` 是一个围绕 Hyperliquid 永续和 YEX 收益市场构建的自治交易 Agent 框架，不只是单策略机器人，而是一整套“策略 + 编排 + 风控 + 复盘 + Agent 接口”的交易基础设施。它最突出的点有三类：一是内置 14 个策略，覆盖做市、套利、趋势、风控和 LLM 决策；二是提供 APEX 多仓位编排器、Guard 动态止损和 REFLECT 夜间复盘自优化闭环；三是既能作为 CLI 独立运行，也能作为 Claude Code skill、OpenClaw AgentSkill 或 MCP server 接入其他 Agent 系统。对想做 Agent 化交易执行、策略编排或交易工具基础设施的人来说，这是一个完成度很高的开源仓库。

## 全文

### 基本信息

- 仓库：`Nunchi-trade/agent-cli`
- 链接：https://github.com/Nunchi-trade/agent-cli
- Stars：205
- 主要语言：Python
- 最近更新：2026-03-15 07:39:47 UTC
- README 定位：Autonomous Trading Agent for Hyperliquid

### 这个仓库在做什么

仓库目标是让 Agent 在 Hyperliquid 上运行自治交易。README 中强调它并不是一个单点策略脚本，而是完整交易栈：

- 14 个内置策略
- APEX 多 slot 编排器
- REFLECT 夜间复盘与自我改进
- MCP server
- Agent Skills

支持的交易场景包括 Hyperliquid 永续，以及 YEX 收益市场。项目既可以独立作为 CLI 运行，也能作为 Claude Code skill、OpenClaw skill 或 MCP server 提供能力。

### 快速使用方式

README 给出的最短启动流程是：

```bash
git clone https://github.com/Nunchi-trade/agent-cli.git && cd agent-cli
bash scripts/bootstrap.sh
```

之后可以用一组“agent-friendly”命令完成初始化与验证：

```bash
hl wallet auto --save-env
hl setup claim-usdyp
hl builder approve
hl run avellaneda_mm --mock --max-ticks 3
hl apex run --mock --max-ticks 5
```

如果切到主网，则需要把 `HL_TESTNET=false` 并重新执行 builder approve 和运行命令。

### 策略能力

README 列出了 14 个内置策略，主要分成四类：

- 做市：`engine_mm`、`avellaneda_mm`、`regime_mm`、`simple_mm`、`grid_mm`、`liquidation_mm`
- 套利：`funding_arb`、`basis_arb`
- 方向性 / 信号：`momentum_breakout`、`mean_reversion`、`aggressive_taker`
- 风控 / 基础设施：`hedge_agent`、`rfq_agent`、`claude_agent`

其中 `claude_agent` 是一个多模型 LLM 交易代理，可对接 Gemini、Anthropic Claude 和 OpenAI，输入市场快照后输出结构化交易决策。

### 自治交易栈

项目最有意思的部分不是单个策略，而是上层自治编排：

- `Radar`：扫描机会，按市场结构、技术面、资金费率和 BTC 宏观因素打分
- `Pulse`：检测资金快速流入与动量信号
- `Guard`：动态追踪止损与利润锁定
- `APEX`：管理 2-3 个并发仓位的多 slot 顶层编排器
- `REFLECT`：定时复盘交易表现，并根据结果自动调整参数

README 明确把 APEX 描述为顶层 orchestrator，会按 tick 节奏运行扫描、进出场、Guard 和 Watchdog。REFLECT 还会根据手续费拖累、胜率、连续亏损、方向性失衡等现象自动调整阈值。

### 风控与生产安全

仓库对风控和进程故障恢复投入很多，主要包括：

- 交易所级别止损同步：即使 runner 挂掉，Hyperliquid 侧止损仍然存在
- Clearinghouse reconciliation：对账 APEX 状态与真实持仓
- Risk Guardian：`OPEN / COOLDOWN / CLOSED` 三态风控
- Rotation cooldown：限制最短持仓时间和 slot 复用冷却
- 状态归档：关闭仓位后归档状态文件
- Maker fee 优化：默认 ALO（post-only）入场，失败再退回 GTC

这意味着它不是只关注“能不能下单”，而是在设计一套可持续运行的 Agent 交易系统。

### Agent 接口能力

这个仓库不仅是交易 CLI，也明确为 Agent 生态做了接口层：

- `hl mcp serve` 可启动 MCP server
- README 说明共暴露 16 个 MCP tools
- 同时提供 skills，可按 Agent Skills 标准安装
- 支持 OpenClaw / Claude Code 的技能接入

也就是说，这个项目既能自己运行，也能被外部 Agent 当成交易后端调用。

### 部署方式

README 提供了 Railway 一键部署，分两种模式：

- Headless APEX：不依赖大模型，直接跑确定性策略
- OpenClaw Agent：通过 OpenClaw + Telegram 做对话式交易代理

后一种模式会把 CLI 作为工具后端，允许你通过聊天命令启动交易、扫描机会、看状态和查看复盘。

### 项目结构

仓库结构比较完整，关键目录有：

- `cli/`：命令入口、MCP server、Hyperliquid adapter
- `strategies/`：14 个策略实现
- `modules/`：纯逻辑模块，例如 apex、radar、pulse、reflect
- `skills/`：onboard、apex、radar、pulse、guard、reflect 等 skill
- `sdk/`：策略基类与模型注册
- `scripts/`：bootstrap 和 backtest 脚本
- `tests/`：测试集

README 标注当前共有 483 个通过测试。

### 适合谁

这个仓库适合几类人：

- 想在 Hyperliquid 上跑自治交易 Agent 的开发者
- 想研究“策略 + 风控 + 复盘 + 自适应调参”完整闭环的人
- 想把交易能力通过 MCP / skills 暴露给外部 Agent 的团队
- 想做 Agent 化量化工具、投研自动化或交易编排系统的人

### 结论

`agent-cli` 不是普通的量化脚本仓库，而是把交易 Agent 做成“可执行、可编排、可复盘、可接入其他 Agent”的平台型项目。相比只提供几个策略，它更值得关注的是上层 orchestrator、风险控制、REFLECT 自优化和 MCP/skills 兼容性。对 Agent trading 这个方向，它代表的是更偏“系统工程”的做法，而不是单纯拼一个收益曲线。
