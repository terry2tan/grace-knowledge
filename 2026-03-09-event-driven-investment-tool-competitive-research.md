---
title: 事件驱动投资分析工具——竞品调研报告
date: 2026-03-09
source: 自研调研
url:
type: article
tags: [投资, AI产品, 商业]
---

## 摘要

调研了"事件发生后，快速分析影响标的、范围和逻辑"这一方向的市场现状。结论：**这个方向目前市场上没有面向投资者的、真正好用的产品**。最接近的是 Yewno（知识图谱方向对，但偏主题投资）和 Stanford 学术工具（方法论对，但不是产品）。面向散户/中小机构的事件影响推导工具，是真实的市场空白。

---

## 一、调研背景与问题定义

**目标方向**：事件驱动型投资分析工具，核心能力不是"发现事件"，而是：

> 事件发生后，30 分钟内，给出一张"影响地图"——哪些公司受益/受损，逻辑是什么，程度深浅如何。

具体拆解为两层能力：
1. **关系图谱**：哪些公司和这个事件有关联（供应链上下游、客户依赖、竞争格局、监管敞口）
2. **影响推导**：关联方向（正向/负向）、传导逻辑、影响程度

**调研范围**：Reddit（r/algotrading、r/ValueInvesting、r/SideProject、r/stocks）、Twitter/X、公开 Web（TechCrunch、Bloomberg、学术论文、公司官网）

---

## 二、调研过程

### 2.1 Reddit 搜索（多轮）

**第一轮关键词**（全站）：
- `event-driven investing analysis tool` → 无相关结果
- `event driven trading tool` → 无相关结果

**第二轮关键词**（垂直版块）：
- `event driven stock news`（r/algotrading）→ 找到 3 个相关帖子
- `built earnings catalyst`（r/SideProject）→ 找到 1 个相关项目
- `supply chain impact analysis stock`（r/algotrading）→ 无直接命中
- `second order effects market event AI`（r/investing）→ 无命中
- `contagion ripple effect stock analysis`（r/ValueInvesting）→ 找到 Novo Nordisk 案例帖

**第三轮关键词**（更垂直）：
- `knowledge graph sector relationship stock impact`（r/algotrading）→ 无命中
- `event impact supply chain stock screener`（r/stocks）→ 无命中
- `built tool news event affected stocks`（r/SideProject）→ 找到地理集中度风险工具

**Reddit 结论**：社区层面**没有人在系统地做"事件→影响链推导"**，现有项目全部停留在"事件发现/情绪监测"阶段。

### 2.2 Web 搜索（多轮）

关键词覆盖：
- `event driven investment analysis tool startup 2025 2026`
- `"second order" OR "downstream impact" stocks event AI analysis tool fintech`
- `startup "supply chain graph" OR "company relationship graph" event stock impact investor`
- `Sentieo Tegus Amenity Analytics "event driven" stock impact`
- `Yewno "knowledge graph" stocks event impact sector`
- `Stanford "Geoeconomic Monitor" Coppola Maggiori AI tool earnings calls tariff`
- `"tariff impact" "which stocks" AI analysis tool startup 2025`

### 2.3 深度阅读的来源

| 来源 | 内容 |
|------|------|
| Yewno Edge 官网（恒大案例） | 知识图谱如何识别恒大暴雷影响的关联标的 |
| Stanford SIEPR 新闻稿 | Geoeconomic Monitor 工具方法论 |
| AlphaSense 官网 + CB Insights | 机构研究平台能力边界 |
| Bloomberg Supply Chain 文档 | 静态供应链数据能力 |
| Reddit r/algotrading（3个帖子详情） | 社区实践现状 |

---

## 三、竞品全景地图

### 3.1 第一类：知识图谱驱动（最接近目标方向）

#### Yewno Edge ⭐⭐⭐⭐（最直接的竞品）

- **定位**：AI 知识图谱驱动的机构投资研究平台
- **核心机制**：从新闻、研报中抽取公司关系，构建动态图谱；自动计算每家公司对"概念/事件/其他公司"的曝露程度
- **事件分析能力**：
  - 恒大案例（2021）：在 9 月暴雷前，用 180 天新闻数据，提前识别 HSBC、渣打等**非明显关联标的**
  - 新冠案例（2020）：早于市场识别出受影响的医疗器械、物流相关标的
  - 概念曝露模块：可追踪推文、贸易战、选举结果等非传统风险因子
- **优势**：方向最接近，非明显关联识别能力强
- **劣势**：
  - 面向机构，定价极高（数万美元/年）
  - 偏向"主题曝露"静态分析，不是事件发生后的快速动态响应
  - 已被 Schwab 顾问平台接入，但对散户不开放
- **官网**：edge.yewno.com

---

### 3.2 第二类：学术研究工具（方法论最先进，但不是产品）

#### Stanford Geoeconomic Monitor（2025年5月发布）⭐⭐⭐⭐

- **团队**：Antonio Coppola（Stanford）、Matteo Maggiori（Stanford）、Christopher Clayton、Jesse Schreger
- **方法**：
  - 两个 LLM 扫描约 **36 万份财报电话会议记录**（2008年起）+ **35 万份分析师报告**（2011年起）
  - 识别哪些公司在财报中主动披露受某事件影响（关税/制裁/出口管制），并量化程度
- **发现（2025年）**：
  - 超过 2/3 的美国上市公司报告关税负面影响
  - 超过 5% 的公司计划涨价应对关税
  - 近 15% 的公司计划重组供应链
- **局限**：
  - 政策研究工具，不是实时投资工具
  - 依赖财报披露，延迟高（季度级别）
  - 不输出"买/卖哪只股票"的投资建议
- **论文**：[Geoeconomic Pressure (SSRN)](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5160818)

---

### 3.3 第三类：机构研究平台（做了部分，但不是核心定位）

#### AlphaSense（估值 $4B+，已收购 Sentieo + Tegus）

- **覆盖**：财报、研报、专家访谈、SEC 文件，NLP 搜索
- **做了什么**：可以搜"某事件被哪些公司的财报提到" → 被动搜索
- **没做什么**：不会告诉你"X 事件发生后，你应该关注 A/B/C 公司" → 没有主动推导
- **Tegus 收购（$930M）**：补充了专家访谈内容，27,000+ 家公司覆盖
- **定位差异**：是研究工作流工具，而非事件响应工具

#### Bloomberg Terminal / FactSet

- 有静态供应链数据（Bloomberg Supply Chain Analysis SPLC 功能）
- 可以查某公司的客户/供应商列表、收入依赖度
- **致命缺陷**：完全静态，不会结合事件做动态推导，不解释逻辑，不生成"影响地图"

#### Visible Alpha（已被 S&P Global 收购）

- 覆盖卖方共识预测的细粒度数据
- 无事件影响推导能力

---

### 3.4 第四类：供应链风险监控（面向企业采购，不面向投资者）

| 工具 | 定位 | 为什么不是竞品 |
|------|------|--------------|
| Resilinc | 供应链中断预警 | 面向企业采购部门，输出采购决策，不输出投资标的 |
| Kinaxis | 供应链优化 | 企业内部系统，无投资视角 |
| Everstream | 供应链风险评分 | 同上，B2B 企业服务 |
| Salesforce AI 关税 Agent | 产品目录价格调整 | 面向销售运营，不面向投资者 |

---

### 3.5 第五类：个人/小团队项目（Reddit 上的发现）

| 项目 | 版块 | 做了什么 | 为什么不够 |
|------|------|---------|-----------|
| MSTO（Market Sentiment Trading Orchestrator） | r/algotrading ⬆️68 | 实时监控股价+新闻情绪，检测暴跌信号 | 停留在情绪监测，无影响推导 |
| EarningsIntel | r/SideProject ⬆️2 | Claude 分析财报，5分钟生成报告 | 单公司分析，无事件→关联标的 |
| 事件驱动新闻交易（CS 学生构想帖） | r/algotrading ⬆️1 | 只是想法，未实现 | 聚焦"发现事件"，非"分析影响" |
| 地理集中度风险工具 | r/SideProject ⬆️3 | 展示持仓的地理风险敞口 | 静态持仓分析，非事件响应 |

**Reddit/SideProject 总结**：没有任何人在做"事件→影响链推导"，是真实空白。

---

## 四、核心结论

### 4.1 市场空白确认

**你想做的这件事，现在市场上没有一个面向投资者的、真正好用的产品。**

现有工具的能力边界：

```
Bloomberg/FactSet：有静态关系数据，无动态推导
           Yewno：有动态图谱，但偏主题/贵/慢/机构专属
       AlphaSense：有内容搜索，无主动推导
Stanford Monitor：有方法论，无实时产品
  Reddit 项目们：停留在情绪监测，无影响链
```

### 4.2 真正的空白

> **事件发生后，30 分钟内，给出一张"影响地图"——哪些公司受益/受损，逻辑是什么，程度深浅如何——面向散户/中小机构，价格可及。**

这个产品，不存在。

### 4.3 真实案例验证需求

**Novo Nordisk 案例（2026年2月）**：
- 事件：CagriSema 临床数据不及 Eli Lilly 竞品
- 一阶影响：NVO -13.67%
- 二阶影响：OMX Copenhagen 25 指数 -3.6%（NVO 占丹麦市值权重太高）
- 三阶影响：丹麦克朗走弱（外资撤离），Eli Lilly 受益（竞争格局改善）
- 逆向信号：核心胰岛素业务未受影响，基本面噪声 vs 真实信号的判断

**没有任何工具能在事件发生时自动走完这条链。**

### 4.4 竞争格局判断

| 维度 | 判断 |
|------|------|
| 机构市场 | Yewno 已占位，但贵且慢 |
| 散户/中小机构 | **完全空白** |
| 技术可行性 | LLM + 知识图谱 + 财报数据，当前技术完全可行 |
| 数据壁垒 | 中等，供应链关系数据需要积累，但有公开数据可用（SEC、财报、新闻） |
| 先发优势 | 较强，关系图谱积累越多越准 |

---

## 五、关键数据来源

- [Yewno Edge 官网](https://edge.yewno.com)
- [Yewno 恒大案例研究](https://edge.yewno.com/identifying-risks-and-opportunities-using-yewnos-dynamic-knowledge-graph-the-evergrande-group-case-study/)
- [Stanford Geoeconomic Monitor 发布公告](https://siepr.stanford.edu/news/scoping-trade-war-new-tool-tracks-company-responses-tariffs-economic-threats)
- [Geoeconomic Pressure 论文（SSRN）](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5160818)
- [AlphaSense 平台](https://www.alpha-sense.com/)
- [AlphaSense + Tegus 合并](https://www.alpha-sense.com/compare/alphasense-and-tegus/)
- [Reddit r/algotrading - MSTO 项目](https://www.reddit.com/r/algotrading/comments/1hj10gc/msto_market_sentiment_trading_orchestrator/)
- [Reddit r/ValueInvesting - Novo Nordisk 案例](https://www.reddit.com/r/ValueInvesting/comments/1rcfucw/novo_nordisk_trial_flop_ripples_through_denmarks/)
- [Yewno Benzinga 评测](https://www.benzinga.com/money/yewno-edge-review)
