---
title: 为什么全网都在疯传 YC CEO 开源的 AI 技能项目
date: 2026-03-21
source: x.com
url: https://x.com/PandaTalk8/status/2035228582461809141
type: article
tags: [AI产品, 工具, 技术]
---

## 摘要

这篇 X Article 的重点，不只是再次介绍 `gstack`，而是从中文创业者视角解释了它为什么会在全网传播：它把 CEO、设计师、程序员、QA、发布工程师等角色拆成结构化工作流，并让每个 skill 的输出顺序传递给下一个环节。作者认为最值得学习的不是“直接照搬 Garry Tan 的整套流程”，而是其中体现出的批判性思维、角色切换和交叉验证机制，尤其是用 `Codex` 等技能减少单模型偏差。与此同时，作者也提醒一人公司创业者不要简单照抄，因为 YC CEO 的工作重心更偏决策，而普通创业者更偏执行反馈。对做 AI coding workflow、个人软件工厂和多角色 agent 编排的人来说，这篇文章的价值在于“借鉴流程框架”，而不是“复制原版模板”。

## 全文

原始推文：<https://x.com/PandaTalk8/status/2035228582461809141>

X Article：<http://x.com/i/article/2035147590527066112>

标题：看完这篇文章，你就知道为什么全网都在疯传YC CEO 开源的AI技能项目

作者：@PandaTalk8（Mr Panda）

发布时间：2026-03-21 13:34:41

文章开头先给出作者自己的判断：

这是目前全网都在疯狂传播的一套 AI 技能框架，作者是现任 Y Combinator 的 CEO，他开源了整套作为 CEO、设计师、程序员的工作流程。作者自己研究、安装并尝试使用了这套开源 Skill。

作者认为最受启发的地方，仍然是这套流程里的批判性思维能力。因为整个工作流都在让 AI 扮演不同角色和定位，对任务进行多角度的批判。为了避免单一模型带来的偏差，它还提供了像 `Codex` 这样的 skill 做交叉验证。

作者接着给出一个很实际的判断：

- 这套工作流框架非常适合一人公司创业者学习
- 但直接拿来即用，大概率并不合适
- 因为 Garry Tan 作为 YC CEO，面临的更多是决策问题
- 而一人创业者更多面临的是执行与反馈问题

作者因此把 `gstack` 视为一个“非常典型的敏捷实践流程”样板。核心不是某个独立 skill，而是：

- 每一步都有对应的 skill
- 每个 skill 的输出会作为输入向下传递
- 这套流程非常值得参考和借鉴

## 文中整理的 gstack 关键信息

文章后半部分对 `gstack` README 做了较完整的中文整理，核心点包括：

1. 项目定位

`gstack` 是 Y Combinator CEO Garry Tan 开源的一套 Claude Code 技能框架，它把 Claude Code 变成一个虚拟工程团队，包含 CEO、工程经理、设计师、QA、发布工程师等 15 个专家角色和 6 个强力工具。

2. Garry Tan 给出的效率宣言

Garry Tan 声称：

- 过去 60 天内产出了 60 万行以上生产代码
- 其中约 35% 是测试
- 日均 1 万到 2 万行可用代码
- 最近 7 天在 3 个项目中新增 140,751 行、362 次提交、约 115,000 行净代码

文章借这组数据强调：当前模型能力叠加结构化工作流后，单人的软件产能已经接近过去一个二十人团队的规模。

3. 核心流程

`gstack` 把冲刺流程拆成：

**思考 → 规划 → 构建 → 审查 → 测试 → 发布 → 复盘**

每个阶段都由对应 skill 负责，且前一步产物会直接传给下一步。例如：

- `/office-hours` 先重构问题定义并输出设计文档
- `/plan-ceo-review` 和 `/plan-eng-review` 继续做产品和工程收敛
- `/review` 发现缺陷
- `/qa` 在真实浏览器里测试和修复
- `/ship` 完成测试、覆盖率审计和发版

4. 关键技能

文中提到的核心技能包括：

- `/office-hours`
- `/plan-ceo-review`
- `/plan-eng-review`
- `/plan-design-review`
- `/design-consultation`
- `/review`
- `/ship`
- `/browse`
- `/qa`
- `/qa-only`
- `/design-review`
- `/setup-browser-cookies`
- `/retro`
- `/investigate`
- `/document-release`
- `/codex`
- `/careful`
- `/freeze`
- `/guard`
- `/unfreeze`
- `/gstack-upgrade`

5. 文章强调的几个新能力

作者特别整理了 `gstack` 几个值得关注的能力：

- `/office-hours` 会在写代码前重构产品问题
- `/design-consultation` 把设计决策放到工作流核心
- `/qa` 让 agent 具备“看见界面并验证修复”的能力
- `/document-release` 让文档与代码发布同步
- `/codex` 提供跨模型第二意见
- `/careful`、`/freeze`、`/guard` 提供安全护栏

## 这篇文章最值得记住的判断

作者最终想表达的重点，不是“又多了一个厉害的 AI 开源项目”，而是：

- 一个有效的 AI 软件工厂，关键在于角色化和流程化
- 批判性思维与交叉验证，比单模型直出更重要
- 创业者更应该学习它背后的方法论，而不是机械复刻 Garry Tan 的原始流程

从这个角度看，这篇文章的最大价值不是翻译 README，而是替中文读者做了一次“如何正确理解 gstack”的使用语境转换。
