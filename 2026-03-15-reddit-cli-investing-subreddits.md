---
title: Reddit CLI 与投资常用 Subreddit 清单
date: 2026-03-15
source: x.com
url: https://x.com/jakevin7/status/2032752901567689095
type: tweet
tags: [投资, 工具, AI产品]
---

## 摘要

这组推文一前一后讲了两件很适合投资研究自动化的事。第一条介绍了一个 Reddit CLI 工具 `rdt-cli`，可以在终端里直接浏览 feed、逛 subreddit、搜索帖子、读评论树，并支持 JSON/YAML 输出，方便脚本和 AI agent 接入。第二条则从投资视角整理了一批最常用的 Reddit 分论坛，覆盖 meme 股、低价股、市场新闻、价值投资、股息投资和选股分析。两者结合起来，本质上是在提示一种新的投研工作流：用 CLI + agent 直接把 Reddit 变成结构化信息源和分析入口。

## 全文

### 原始推文：Reddit CLI

@jakevin7（卡比卡比）  
2026-03-14 17:30:19

持续高产中，reddit cli 它也来了！迎接 CLI 宇宙！

reddit 功能实在是太丰富了。欢迎大家多多反馈，出现的问题和功能需求都可以 issue 或者艾特我。

另外求转发，主要是 Reddit 很多国外的人也可以用，但是关注我的并没有什么国外的。

一个 Reddit CLI，可以直接在终端里：

- 看 feed
- 逛 subreddit
- 搜索帖子
- 读评论树
- 导出结果
- 做 upvote / save / subscribe 这些基础交互

作者特别提到几个自己很喜欢的细节：

- `rdt show 3` 这种短索引操作很顺手
- 自动从浏览器提取 cookies 登录
- 支持 JSON / YAML，方便脚本和 AI agent

仓库链接：https://github.com/jackwener/rdt-cli

### 引用推文：投资常用 Reddit 分论坛

@jakevin7（卡比卡比）  
2026-03-14 17:37:13

reddit 是投资人的必备网站了，用 CLI + AI agent 直接把效率拉满，还可以做信息驱动分析等等。

下面是一些投资常用的分论坛：

#### 1. 高风险与散户大本营（Meme / 逼空）

- `r/WallStreetBets`：GME 奇迹发源地，高风险期权狂热者聚集地
- `r/amcstock` 与 `r/GME`：Meme 股专属抱团社区
- `r/pennystocks` 与 `r/pennystocksDD`：专门讨论低价股和深度尽调
- `r/RobinHoodPennyStocks`：Robinhood 用户常看的低价股社区

#### 2. 市场资讯与严肃讨论

- `r/stocks` 与 `r/StockMarket`：大盘走势、宏观经济和中级投资者讨论区
- `r/StockMarketNews`：股市突发新闻和实时更新
- `r/CryptoCurrency`：虽然偏币圈，但经常讨论相关的区块链美股概念

#### 3. 价值投资与基本面研究

- `r/investing` 与 `r/SecurityAnalysis`：偏理性，适合看财报和估值
- `r/ValueInvesting`：巴菲特风格的低估值投资讨论
- `r/UndervaluedStonks`：关注被低估的潜力股
- `r/dividendinvesting`：适合偏稳定、股息收入导向的投资者

#### 4. 新手友好与其他

- `r/Stock_Picks` 与 `r/StockAnalysis`：适合找选股灵感和技术面 / 基本面分析
- `r/InvestmentClub`：模拟投资组合管理的讨论区

### 为什么值得记录

这组内容的真正价值不只是“推荐几个 subreddit”，而是把 Reddit 重新定义成一个可程序化的投研入口：

- CLI 让 Reddit 信息获取进入终端工作流
- JSON / YAML 输出让 agent 更容易做结构化处理
- subreddit 清单提供了面向投资任务的高信号信息源分层

如果把 `rdt-cli`、AI agent 和这份 subreddit 列表结合起来，完全可以做成一个“Reddit 舆情 / 线索 / 讨论质量”驱动的投研系统。
