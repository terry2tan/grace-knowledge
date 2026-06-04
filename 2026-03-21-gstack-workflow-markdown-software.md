---
title: GStack 的关键不是 Skill，而是工作流
date: 2026-03-21
source: x.com
url: https://x.com/JamesAI/status/2035136034946912707
type: tweet
tags: [AI产品, 工具, 技术]
---

## 摘要

这条引用推文最有价值的点，不是再讲一遍 Skill 很重要，而是把 GStack 的真正价值归纳成“可控、步进式、引导式工作流”的设计能力。JamesAI 总结了五个模式：统一提问格式、Skill 链路推荐、进度与状态可视化、完成报告与统计、以及 Telemetry 驱动的复盘积累；本质上都是把一次性功能，变成可持续优化的软件流程。被引用的 Garry Tan 原推则进一步给出一个更激进的判断：Markdown 不只是文档，而是在某些场景下比传统代码更适合表达带上下文感知和决策能力的工作流。对做 coding agent、Skill 市场和 AI 工具链的人来说，这条内容的启发是，竞争优势正在从“单点能力”转向“流程设计 + 数据回流 + 自我迭代”。

## 全文

原始链接：<https://x.com/JamesAI/status/2035136034946912707>

作者：@JamesAI（在悉尼和稀泥）

发布时间：2026-03-21 07:26:56

正文：

从 @garrytan 的 GStack 学习到的其实不止 Skill 的写法，更多的是 Workflow 的构建。一个可控的，步进式的，引导性的工作流，不管是实际产出，还是用户心智，对比 skill 都有极大的改进。我目前学习到的 5 个核心模式：

1. 统一的 AskUserQuestion 格式

每次提问都有 4 个固定板块：Re-ground（重申上下文）、Simplify（简单解释）、Recommend（带理由的推荐）、Options（带工作量估算的选项）。

作者认为这显著降低了用户输入门槛。因为 AI 效果很大程度上受用户输入质量影响，而统一提问格式可以在某种程度上规范用户输入，减少结果波动。

2. 全流程的 Skill 链路引导

每个 skill 结束时主动推荐下一个 skill，形成链，例如：

`/office-hours → /plan-ceo-review → /plan-eng-review → /ship`

3. 进度条 + 状态追踪面板

例如 QA 报告里包含评分、分类统计表、before/after 对比、ship readiness 仪表盘。作者认为进度和状态的可视化对于工作流是必须的。

4. 完成报告 + 数据统计

例如 `/retro` 输出 commit 统计、热点分析、focus score；`/qa` 输出修复数量和 before/after 截图。也就是“交付即复盘”，让用户获得确定性。

5. Telemetry + 复盘数据积累

每次 skill 调用记录到 `skill-usage.jsonl`，再由 `/retro` 分析历史趋势。作者提到自己之前也在写作 skill 里做了数据追踪和迭代，但主要追踪的是写作规则等功能层数据，而不是工作流层效率数据。受 GStack 启发，他准备把自己的写作工作流和其他 skills 做进一步整合。

作者最后的总结是：Garry 带来的不是某个孤立技巧，而是一套“把点连成线”的系统化思维。相比单点功能，流程化对效率和质量的提升是指数级的。从这个角度看，确实可以说 “Markdown is code”，甚至 “Markdown is software”。

## 引用推文

被引用原推链接：<https://x.com/garrytan/status/2035080491725201574>

作者：@garrytan（Garry Tan）

发布时间：2026-03-21 03:46:13

正文：

Markdown is code. I am in a branch where I am modifying GStack so that it can automatically do Codex code and plan reviews as a default setting.

Of course I have the skill vendored in the repo so my workspace uses whatever is local.

So as I was actually running /ship it ran its own code, but was also self-aware enough that it says "Choose A because you're literally shipping this feature right now."

Absolutely remarkable! The markdown is better than JS or deterministic language because it knows what is happening and can make choices with intelligence.

Markdown is not just code. It is better than code. (For some things!)

这条原推的关键补充是：Garry 不是把 Markdown 当文档格式，而是把它当成一种可执行、可推理、可根据上下文做选择的工作流媒介。也就是说，在 agent 场景里，Markdown 的价值不只在“描述流程”，而在“携带语义、嵌入判断并参与执行”。
