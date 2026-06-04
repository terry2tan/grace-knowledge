---
title: daily_stock_analysis：LLM 驱动的 A/H/美股智能分析器
date: 2026-03-03
source: github.com
url: https://github.com/ZhuLinsen/daily_stock_analysis
type: github
tags: [投资, AI, 工具, 量化]
---

# daily_stock_analysis：LLM 驱动的 A/H/美股智能分析器

**来源**: [GitHub - ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis)
**日期**: 2026-03-03
**Stars**: 15,497
**语言**: Python
**License**: MIT

---

## 项目简介

基于 AI 大模型的 A股/港股/美股自选股智能分析系统，每日自动分析并推送「决策仪表盘」到多个渠道。**零成本、无需服务器**，依托 GitHub Actions 定时运行。

---

## 核心功能

| 模块 | 功能 |
|------|------|
| AI 决策仪表盘 | 一句话核心结论 + 精确买卖点位 + 操作检查清单 |
| 多维度分析 | 技术面（MA/多头排列）+ 筹码分布 + 舆情情报 + 实时行情 |
| 全球市场 | A股、港股、美股（SPX、DJI、IXIC 等） |
| 市场策略系统 | A股「三段式复盘策略」+ 美股「Regime Strategy」（进攻/均衡/防守） |
| 大盘复盘 | 每日概览、板块涨跌；支持 cn/us/both 切换 |
| 图片识别 | 上传自选股截图，Vision LLM 自动提取股票代码 |
| AI 回测 | 自动评估历史分析准确率、方向胜率、止盈止损命中率 |
| **Agent 问股** | 多轮策略问答，11 种内置策略（均线金叉/缠论/波浪等），Web/Bot/API |
| 多渠道推送 | 企业微信、飞书、Telegram、钉钉、邮件、Pushover、PushPlus |

---

## 技术栈

| 类型 | 支持 |
|------|------|
| AI 模型 | Gemini、OpenAI 兼容、DeepSeek、通义千问、Claude（统一通过 LiteLLM 调用，支持多 Key 负载均衡） |
| 推荐聚合 | AIHubMix（一 Key 切换全系模型，含免费模型） |
| 行情数据 | AkShare、Tushare、Pytdx、Baostock、YFinance（美股） |
| 新闻搜索 | Tavily、SerpAPI、Bocha、Brave |
| Web 框架 | FastAPI |
| 前端 | React（`apps/dsa-web`） |
| 自动化 | GitHub Actions |
| 容器化 | Docker |

---

## 快速部署（GitHub Actions，推荐）

1. Fork 仓库
2. 配置 Secrets（至少一个 AI Key + 一个推送渠道 + `STOCK_LIST`）
3. 启用 Actions
4. 手动触发测试

**默认执行时间**：每个工作日 18:00（北京时间），非交易日自动跳过。

### 关键 Secrets

```
GEMINI_API_KEY / OPENAI_API_KEY / ANTHROPIC_API_KEY  # AI 模型（至少一个）
STOCK_LIST=600519,hk00700,AAPL,TSLA                  # 自选股
TAVILY_API_KEYS                                       # 新闻搜索（推荐）
TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID                # 推送渠道（任选一）
```

---

## Agent 策略问股

```bash
# .env 开启
AGENT_MODE=true
AGENT_SKILLS=all  # 或指定策略，如 ma_cross,chan_theory
```

内置 11 种策略：均线金叉、缠论、波浪理论、多头趋势等，支持自定义（在 `strategies/` 目录添加 YAML 文件）。

---

## 本地/Docker 运行

```bash
git clone https://github.com/ZhuLinsen/daily_stock_analysis.git && cd daily_stock_analysis
pip install -r requirements.txt
cp .env.example .env && vim .env
python main.py              # 执行分析
python main.py --webui      # 启动 Web 界面 + 定时分析
python main.py --webui-only # 仅启动 Web 界面
```

访问 `http://127.0.0.1:8000`

---

## 内置交易纪律

- **严禁追高**：乖离率超 5%（可配置）自动提示风险
- **趋势交易**：MA5 > MA10 > MA20 多头排列
- **精确点位**：买入价、止损价、目标价
- **新闻时效**：默认 3 天，避免过时信息

---

**标签**: `GitHub` `股票分析` `LLM` `AI投资` `量化` `Gemini` `Agent` `GitHub-Actions` `Python` `自动化`
