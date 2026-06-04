---
title: himself65/finance-skills: A collection of skills for AI financial analysis and trading
date: 2026-05-17
source: github.com / himself65/finance-skills
url: https://github.com/himself65/finance-skills
type: repo
tags: [AI产品, 投资, 工具]
---

## 摘要

`finance-skills` 是一个面向 AI 金融分析与交易场景的 Agent Skills 集合，遵循 Agent Skills 开放标准，当前 GitHub Stars 约 2.2k。它把能力拆成市场分析、社交/研究源读取、外部金融数据源、创业公司分析、生成式 UI 和 Skill Creator 等插件组，覆盖估值、财报预览/复盘、ETF 溢价、期权收益图、股票相关性、流动性、SEPA 策略、Twitter/Discord/LinkedIn/Telegram/YC 读取、Funda/Adanos/TradingView 数据接入等。对用户最有价值的是：它正好落在「AI Agent × 投研自动化 × Skills 工具链」交叉点，可作为低成本投研工作流、金融数据接入和 Agent skill 设计的参考库。

## 全文

# Finance Skills

> [!WARNING]
> This project is for educational and informational purposes only. Nothing here constitutes financial advice. Always do your own research and consult a qualified financial advisor before making investment decisions.

A collection of agent skills for financial analysis and trading, following the [Agent Skills](https://agentskills.io) open standard.

**Visit [skills.himself65.com](https://skills.himself65.com/) for documentation, demos, and setup instructions.**

## 仓库信息

- Repository: `himself65/finance-skills`
- URL: https://github.com/himself65/finance-skills
- Description: A collection of skills for AI financial analysis and trading.
- Stars: 2242
- Topics: `claude-code`, `skills`, `trading`, `agent-skills`
- Created: 2026-03-13T23:56:06Z
- Updated: 2026-05-17T15:58:08Z

## Quick Start

### Claude Code — All Plugins

```bash
npx plugins add himself65/finance-skills
```

### Claude Code — Individual Plugins

```bash
npx plugins add himself65/finance-skills --plugin finance-market-analysis
npx plugins add himself65/finance-skills --plugin finance-social-readers
npx plugins add himself65/finance-skills --plugin finance-data-providers
npx plugins add himself65/finance-skills --plugin finance-startup-tools
npx plugins add himself65/finance-skills --plugin finance-ui-tools
npx plugins add himself65/finance-skills --plugin finance-skill-creator
```

### Claude Code — Individual Skills

```bash
npx skills add himself65/finance-skills
```

### Other Agents

```bash
npx skills add himself65/finance-skills -a <agent-name>
```

## Available Skills

### Market Analysis (`finance-market-analysis`)

Stock analysis, earnings, estimates, correlations, liquidity, ETFs, options payoff, and trading strategies via yfinance.

| Skill | Description |
|---|---|
| [company-valuation](https://github.com/himself65/finance-skills/tree/main/plugins/market-analysis/skills/company-valuation/) | DCF + relative + SOTP triangulation — implied share price, WACC × g sensitivity, Bull/Base/Bear scenarios |
| [earnings-preview](https://github.com/himself65/finance-skills/tree/main/plugins/market-analysis/skills/earnings-preview/) | Pre-earnings briefing — consensus estimates, beat/miss history, analyst sentiment |
| [earnings-recap](https://github.com/himself65/finance-skills/tree/main/plugins/market-analysis/skills/earnings-recap/) | Post-earnings analysis — actual vs estimated EPS, price reaction, margin trends |
| [estimate-analysis](https://github.com/himself65/finance-skills/tree/main/plugins/market-analysis/skills/estimate-analysis/) | Analyst estimate deep-dive — revision trends, growth projections, historical accuracy |
| [etf-premium](https://github.com/himself65/finance-skills/tree/main/plugins/market-analysis/skills/etf-premium/) | ETF premium/discount vs NAV — market price comparison, peer analysis, category screener |
| [options-payoff](https://github.com/himself65/finance-skills/tree/main/plugins/market-analysis/skills/options-payoff/) | Interactive options payoff charts with dynamic controls |
| [saas-valuation-compression](https://github.com/himself65/finance-skills/tree/main/plugins/market-analysis/skills/saas-valuation-compression/) | SaaS valuation compression analysis — ARR multiples, cause attribution, peer comparisons |
| [sepa-strategy](https://github.com/himself65/finance-skills/tree/main/plugins/market-analysis/skills/sepa-strategy/) | SEPA strategy analysis — Minervini's trend template, VCP patterns, entry points, position sizing |
| [stock-correlation](https://github.com/himself65/finance-skills/tree/main/plugins/market-analysis/skills/stock-correlation/) | Correlation analysis — sector peers, co-movement, pair-trading candidates |
| [stock-liquidity](https://github.com/himself65/finance-skills/tree/main/plugins/market-analysis/skills/stock-liquidity/) | Liquidity analysis — spreads, volume profiles, market impact, Amihud ratio |
| [yfinance-data](https://github.com/himself65/finance-skills/tree/main/plugins/market-analysis/skills/yfinance-data/) | Market data via yfinance — prices, financials, options, dividends, earnings |

### Social Readers (`finance-social-readers`)

Read-only social media and research feeds — Twitter/X, Discord, LinkedIn, Telegram, Y Combinator, and a generic opencli fallback for 90+ other sources.

| Skill | Description |
|---|---|
| [discord-reader](https://github.com/himself65/finance-skills/tree/main/plugins/social-readers/skills/discord-reader/) | Read-only Discord research via opencli |
| [linkedin-reader](https://github.com/himself65/finance-skills/tree/main/plugins/social-readers/skills/linkedin-reader/) | Read-only LinkedIn feed & job search via opencli |
| [opencli-reader](https://github.com/himself65/finance-skills/tree/main/plugins/social-readers/skills/opencli-reader/) | Generic read-only fallback for 90+ opencli adapters — Yahoo Finance, Bloomberg, Reuters, Eastmoney, Xueqiu, Reddit, HackerNews, Substack, arXiv, and more |
| [telegram-reader](https://github.com/himself65/finance-skills/tree/main/plugins/social-readers/skills/telegram-reader/) | Read-only Telegram channel reader via tdl |
| [twitter-reader](https://github.com/himself65/finance-skills/tree/main/plugins/social-readers/skills/twitter-reader/) | Read-only Twitter/X research via opencli |
| [yc-reader](https://github.com/himself65/finance-skills/tree/main/plugins/social-readers/skills/yc-reader/) | Y Combinator company data via yc-oss/api |

### Data Providers (`finance-data-providers`)

External API data — sentiment via Adanos, fundamental research and raw data via Funda AI (MCP + REST), Hormuz Strait monitoring, and TradingView desktop app reading.

| Skill | Description |
|---|---|
| [finance-sentiment](https://github.com/himself65/finance-skills/tree/main/plugins/data-providers/skills/finance-sentiment/) | Stock sentiment research via Adanos Finance API — Reddit, X.com, news, Polymarket |
| [funda-data](https://github.com/himself65/finance-skills/tree/main/plugins/data-providers/skills/funda-data/) | Funda AI — MCP server for analyst-grade research synthesis plus REST API fallback for raw data |
| [hormuz-strait](https://github.com/himself65/finance-skills/tree/main/plugins/data-providers/skills/hormuz-strait/) | Strait of Hormuz monitoring — shipping, oil impact, insurance risk, crisis timeline |
| [tradingview-reader](https://github.com/himself65/finance-skills/tree/main/plugins/data-providers/skills/tradingview-reader/) | Read-only TradingView desktop reader — quotes, full options chains with greeks/IV, expiries, chart state, screenshots |

### Startup Tools (`finance-startup-tools`)

| Skill | Description |
|---|---|
| [startup-analysis](https://github.com/himself65/finance-skills/tree/main/plugins/startup-tools/skills/startup-analysis/) | Multi-perspective startup analysis — VC investor, job applicant, and CEO/founder viewpoints |

### UI Tools (`finance-ui-tools`)

| Skill | Description |
|---|---|
| [generative-ui](https://github.com/himself65/finance-skills/tree/main/plugins/ui-tools/skills/generative-ui/) | Generative UI design system for Claude's `show_widget` |

### Skill Creator (`finance-skill-creator`)

| Skill | Description |
|---|---|
| [skill-creator](https://github.com/himself65/finance-skills/tree/main/plugins/skill-creator/skills/skill-creator/) | Create new skills, evaluate existing ones against a 10-dimension rubric, and improve skill quality |

## License

MIT
