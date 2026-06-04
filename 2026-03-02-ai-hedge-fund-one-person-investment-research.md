---
title: 一个人的 AI 对冲基金（第一篇）：用提示词复刻年费 $600-800 万的投研 Desk
date: 2026-03-02
source: x.com
url: https://x.com/i/article/2028008077874917376
type: tweet
tags: [投资, AI, 工具]
---

## 摘要

前欧洲 AUM 前十对冲基金研究员分享：用 Google Gemini Gem 搭建 9 角色 AI 投研工作流（Atlas→7路并行分析师→CIO仲裁→单页HTML报告），输入一条新闻标题即可输出对冲基金首席投资官级别的投研Memo。核心洞察：散户与对冲基金的差距不是观点准确性，而是"组织化流程"——分工、口径、证据、仲裁、交付。整套系统不需要写代码，靠提示词即可跑通。

## 全文

# 一年 $600–800 万的对冲基金投研团队，我用提示词做成了一个 App

**作者背景**：前欧洲 AUM 前十对冲基金研究员，更早在美国互联网大厂做数据科学家。

核心判断：**散户和对冲基金最大的差别，不是"谁更聪明、观点更准"，而是有没有一套能持续运转的组织化流程——分工、口径、证据、仲裁、交付。基金投研最贵的从来不是观点，而是组织。**

---

## 为什么投研 Desk 这么贵？

一支小型多资产投研 desk 年 run-rate 约 **$600–800 万**（只含投研，不含交易系统/托管/行政）：

**1. 人力成本（约80%，$5–6M）**

需要 8–10 个核心脑力位：投研PM、宏观、行业、个股、crypto、衍生品&链上、风控、量化验证、CIO仲裁。薪酬=底薪+奖金+福利+用人成本。

**2. 数据与研究工具（约20%，$0.2–1.5M）**

Bloomberg/Refinitiv/FactSet 终端、新闻/研报、行情/宏观数据、链上/衍生品数据。

**贵的本质是"组织能力"：**
- **分工**：每个人只做自己那块，深度才出得来
- **并行**：同一时间多路推进，速度才出得来
- **口径**：统一模板，才能复盘、迭代、交接
- **证据**：每个判断都能被数据锚点验证
- **仲裁**：CIO 把分散观点压成"能下单的语言"

---

## 对冲基金投研 Desk 的 9 个角色

| 角色 | 职能 |
|-----|------|
| **Atlas**（投研PM） | 接收输入 → 拆主题 → 列资产 → 分派问题 |
| **Macro** | 利率/美元/流动性 |
| **Equity Sector** | 行业轮动/相对强弱 |
| **Equity Stock** | 公司模型/催化/风险 |
| **Crypto Market** | 风险偏好/叙事/联动 |
| **Derivatives** | funding/OI/清算/拥挤 |
| **Risk** | 组合暴露/情景压力测试/风控动作 |
| **Quant** | 口径统一/趋势动量/关键水平验证 |
| **CIO** | 仲裁证据 → 翻译成仓位与交易语言 → 输出最终报告 |

---

## AI 工作流结构

**一次输入 → 七路并行 → CIO 汇总 → 单页 HTML 报告**

```
Input → Atlas → (并行) Macro / Sector / Stock / Crypto / Derivatives&Onchain / Risk / Quant → CIO → Output
```

---

## 5分钟跑通教程（小白版，无需代码）

### Step 1：建 Google Gemini Gem 项目
- 进入 https://gemini.google.com/
- 点击左侧 sidebar 的 Gem → New Gem

### Step 2：按固定节点名建工作流并连线

节点名：Input → Atlas → Macro / Equity Sector / Equity Stock / Crypto Market / Derivatives & Onchain / Risk / Quant → CIO → Output

连线规则：
- Input → Atlas
- Atlas → 所有分析师模块（并行）
- 所有分析师 → CIO
- CIO → Output

使用 Advanced Editor 编辑提示词。

### Step 3：四大块提示词

**1/4 Atlas（任务分发）**：把输入拆成摘要、资产清单、开启哪些模块、CIO 要回答的关键问题

**2/4 分析师通用模板**（贴到每个分析师节点顶部）：统一输出格式 + 强制"有证据"。复制到 Macro/Sector/Stock/Crypto/Derivatives/Risk。

**3/4 量化分析师（可选）**：可接入免费 Finnhub API（https://finnhub.io/）。硬核版建议用 Cursor 脚本+券商量化MCP。

**4/4 CIO 最终报告**：把所有模块仲裁成"可执行"的投研 memo。

### Final Step：生成 Mini App
- 在对话框一次性输入全部提示词 → 生成 mini app
- 右侧 app 输入任何新闻/观点/股票/代币代码 → 自动输出报告
- 点击 Download file 下载 HTML 文件，浏览器直接渲染完整报告

*底层用 Google Labs 的 Opal（实验产品，偶有 Bug）*

---

## 后续计划

1. 用 Claude Code 生成脚本，把取数、计算、验证补齐
2. 把整套流程打包成可复用的 skill
3. 交给 OpenClaw 的 cron 定时跑
4. 最终效果：你只需要定主题，它按时把报告送到面前

> 《一个人的 AI 对冲基金》第一篇完
