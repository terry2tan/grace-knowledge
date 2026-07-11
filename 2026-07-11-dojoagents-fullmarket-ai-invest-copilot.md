---
title: DojoAgents — 全市场个人投资 AI 副驾
date: 2026-07-11
source: Twitter/X → GitHub
url: https://github.com/Alpha-Dojo/DojoAgents
type: repo
tags: [AI, 投资, 工具]
---

## 摘要

DojoAgents 是一个新冒头的开源项目（Apache 2.0），定位为「全市场个人投资 AI Copilot」，核心是一个 Loop-Driven Cognitive Portfolio Agent 推理引擎，而不是简单的看盘面板。它覆盖 A 股/美股/港股/Crypto/外汇，能做每日市场概览、消息面冲击分析、持仓截图智能诊断（多模态识别）、模拟组合跟踪，并自带机构级 React 仪表盘（净值曲线、风险敞口、板块热力图、个股 K 线+PE 带+财报+新闻合一）。架构上分七层：CLI/Web Dashboard/Chat Gateways → Agent Loop → Tools → Data → Infrastructure；支持执行沙箱（动态跑 Python 计算指标）、Memory & SKILLS（把成功的多步分析流程沉淀为可复用技能）、Cron & Gateway（定时推送到 Slack/Telegram/Discord/飞书/微信/邮件）。支持 OpenAI/Anthropic/Gemini/智谱/DeepSeek 及本地 Ollama/llama.cpp/vLLM，可 pip install 直接跑。推文发布时 Star 433，处于早期但架构完整度较高，正好踩中用户长期关注的「投研自动化 + Agent 化研究流程 + 低成本替代 Bloomberg」方向，值得实测评估。

## 全文（推文 + README 整合）

### 原推文（@CycleDecoded / 智享，2026-07-10）

> 离谱了兄弟们，GitHub 刚冒出个闷声发大财的怪物级项目，直接要把机构量化员的饭碗给掀了。
>
> 项目叫 Alpha-Dojo/DojoAgents，定位极其硬核：「全市场个人投资 AI 副驾」。这不是那种只会说车轱辘话的割韭菜大模型，而是真正能下场帮你干活的 AI Agent。不管你是玩美股、做外汇，还是盯 Web3 币圈，这玩意都能做自动化辅助。
>
> 核心干货：
> - 🌍 全盘通吃：股票/外汇/Crypto K 线数据全覆盖，长线大周期直接帮你算。
> - ⚙️ 告别手写：不用再熬夜手敲 Pine Script 搞指标，Agent 自动化跑策略回测。
> - ✂️ 零门槛量化：自动抓行情和消息面，AI 整合后直接提示买卖逻辑。
> - 💸 完全开源：不卖课不收费，代码直接放出来。
>
> 项目链接：https://github.com/Alpha-Dojo/DojoAgents
>
> 互动数据：rt 106 / reply 5 / like 360

### 仓库核心信息

- **名称：** DojoAgents: Full-Market AI Copilot for Personal Investment
- **Stars：** 433（抓取时点）
- **License：** Apache 2.0
- **PyPI 包名：** `dojoagents`（可直接 `uv pip install dojoagents`）
- **入口：** `dojoagents dashboard --host 127.0.0.1 --port 8765`
- **要求：** Python ≥ 3.11、Node ≥ 18、npm ≥ 9、任一 LLM API Key

### README 核心内容整理

**定位（不是看盘面板，是推理 Agent）：**
大多数金融 AI 工具只做新闻摘要、个股解释、指标读数这类"快输出"。DojoAgents 的核心是 **Loop-Driven Cognitive Portfolio Agent**，围绕你的持仓做四维结构化推理：

1. **Fundamental Data Cognition（基本面数据认知）**：实时抓取并交叉对比多市场原始数据（K线、财报、新闻），做结构化处理。
2. **Advanced Logic Analysis（进阶逻辑分析）**：解读估值带、动量指标、板块分类，挖掘隐藏的市场机制。
3. **Cross-Market Strategy Deduction（跨市场策略推演）**：做宏观资产配置和市场联动映射，能多步调用工具自主推理类似"为什么美股半导体软件下跌而 A 股大涨"这种跨市场问题。
4. **Dynamic Portfolio Management（动态组合管理）**：持续诊断风险敞口、监控净值曲线、做业绩归因，辅助调仓决策。

**四大功能场景：**

1. **每日市场概览（Daily Market Overview）**：自动调用全球市场/板块/个股工具，拉取 A 股/美股/港股的涨跌、强弱排名、成交量变化、板块分布，每一步可展开看调用了哪些工具、引用了什么数据。
2. **消息冲击分析（News Impact Analysis）**：例如"Meta 出售算力——会影响哪些美股和 A 股？"，自动拆解并调用市场、新闻、公司、板块工具，把 Meta 价格动作、相关头条、板块表现、AI 算力链/半导体/云/广告科技串起来分析。
3. **持仓截图智能诊断（Screenshot Diagnosis）**：支持多模态模型，上传持仓截图即可（无需手动录入），能识别 40+ 持仓，按市场/板块/供应链位置重分组，给出风险诊断——点出过度集中、敞口重叠、防御性资产不足等问题。
4. **模拟组合跟踪（Simulated Portfolio）**：诊断后给出后续策略建议（剪掉重复持仓、保留核心、优化美股配置、降低弱敞口、加公用事业/必选消费等防御资产），确认后可生成新的观察组合并在 Dashboard 里持续跟踪。

**仪表盘四大支柱（Four-Pillar Dashboard）：**
- **Portfolio（指挥中心）**：净值曲线、实时风险敞口、智能持仓跟踪
- **Markets**：跨市场热力图（美/港/A）、指数跟踪
- **Sectors**：L1/L2/L3 行业分类深挖 + 动量曲线
- **Equities**：K线、PE 带、财报、新闻合一视图

**七层架构（核心卖点）：**
1. CLI / Web Dashboard / Chat Gateways（接入层）
2. Agent Loop（核心推理运行时：多轮工具编排、上下文压缩、防幻觉护栏）
3. Execution Sandbox（安全隔离环境，动态执行 Python 计算技术指标、本地抓取数据）
4. Memory & SKILLS（把成功的多步分析流程自动沉淀为可复用的程序化 SKILLS）
5. Cron & Gateway（解耦的投递管道，定时把自动洞察推到你常用的聊天 App，不阻塞主推理循环）
6. Tools（工具层）
7. Data / Infrastructure（数据与基础设施层）

**LLM 支持：**
- 开箱即用预设：OpenAI、Anthropic、Google Gemini、智谱 GLM、DeepSeek
- 本地/自定义：可覆盖 Base URL 接 Ollama、llama.cpp、vLLM
- API Key 通过 UI 配置，安全写入本地 `~/.dojo/agents.yaml`

**未来规划：**
- Slack / Telegram / Discord / 飞书 / 微信 / 邮件 的个性化日报和预警推送
- 多 Agent 协作的自主量化分析师（已宣传，后续持续做）

**快速启动：**
```bash
# 最简单：PyPI 直装
uv venv && source .venv/bin/activate
uv pip install dojoagents
dojoagents dashboard --host 127.0.0.1 --port 8765
# 打开 http://127.0.0.1:8765/ 在 Settings 里配 LLM 即可

# 源码开发模式：
# git clone → uv pip install -e ".[dev]" → cd dojoagents/dashboard/web → npm i && npm run build
```

**⚠️ 免责声明（原文自带）：** 本项目仅供教育、研究、演示，不构成投资建议或交易推荐，交易金融工具存在重大风险（包括本金损失），所有数据/分析/输出仅供参考。
