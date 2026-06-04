---
title: Harness engineering: leveraging Codex in an agent-first world
date: 2026-03-21
source: openai.com
url: https://openai.com/index/harness-engineering/
type: article
tags: [AI产品, 工具, 技术]
---

## 摘要

这篇 OpenAI 官方文章的核心观点是：当代码不再主要由人手写，而主要由 agent 生成时，工程师的工作重心会从“实现功能”转向“设计环境、指定目标、搭建反馈回路并约束 agent 行为”。OpenAI 用一个内部 beta 产品做实验，在 5 个月里由少量工程师驱动 Codex 生成了约 100 万行代码和约 1500 个 PR，并声称整体速度约为手写开发的 10 倍。文章反复强调，真正的瓶颈不在模型本身，而在于系统是否足够“agent-legible”：仓库知识是否结构化、UI 与观测系统是否对 agent 可见、架构和品味是否被编码进规则，以及评审与合并流程是否适配高吞吐 agent 协作。对做 AI coding、开发平台和 agent 系统设计的人来说，这篇文章的重要性不只是案例，而是它第一次比较完整地定义了什么叫“harness engineering”。

## 全文

原文链接：<https://openai.com/index/harness-engineering/>

发布时间：2026-02-11

作者：Ryan Lopopolo（Member of the Technical Staff）

## 文章在讲什么

OpenAI 描述了一个持续 5 个月的内部实验：团队用 Codex 构建并交付一个有真实用户、会持续上线、会出错也会被修复的软件产品，而且**没有任何一行代码是人工手写的**。

文章给出的核心口号是：

**Humans steer. Agents execute.**

也就是说，人类工程师的主要任务不再是自己写代码，而是：

- 设计 agent 运行的环境
- 把目标和约束说清楚
- 搭建足够可靠的反馈回路
- 让 agent 能持续完成可验证的工作

## 1. 从空仓库开始，让 agent 写出整个系统

文章提到，第一个 commit 从一个空的 git 仓库开始。最初的仓库结构、CI 配置、格式化规则、包管理器设置、应用框架，甚至最早的 `AGENTS.md`，都是由 Codex CLI 配合 GPT-5 生成的。

5 个月后，仓库已经扩展到大约：

- 100 万行代码
- 覆盖应用逻辑、基础设施、工具链、文档和内部开发工具
- 约 1500 个 PR

OpenAI 还给出一个吞吐量指标：小团队驱动 Codex，平均每位工程师每天大约能推进 3.5 个 PR。

## 2. 工程师的角色被重新定义

文章认为，零人工手写代码并不意味着工程师变少了，而是工程工作本身变了。

新的工程工作包括：

- depth-first 地拆解目标
- 为 agent 构建中间能力模块
- 找出系统里缺失的“可见且可执行”的能力
- 让 agent 能更稳定地 review、test、respond 和 iterate

OpenAI 的描述里，人类工程师与系统的交互几乎全部通过 prompt 完成：描述任务、运行 agent、让它开 PR、让它自审和互审、循环迭代直到满意。

## 3. 提高 application legibility

随着代码产能上升，文章说瓶颈逐渐变成了人类 QA 能力。因为人类时间和注意力是最稀缺的资源，所以他们不断让应用本身对 Codex 更“可读”。

文中给出的做法包括：

- 每个 git worktree 都能独立启动应用
- 把 Chrome DevTools Protocol 接入 agent runtime
- 创建处理 DOM 快照、截图和页面导航的 skills
- 让 agent 自己复现 bug、验证修复并推理 UI 行为

同样的思路也延伸到 observability：

- 日志、指标和 traces 通过本地可观测栈暴露给 Codex
- 每个 worktree 都有一套隔离的日志与指标环境
- agent 可以直接查 LogQL、PromQL 等信号

文章认为，这样一来，像“确保启动时间小于 800ms”或“关键路径 span 不超过 2 秒”这样的要求，才真正变得可操作。

## 4. 仓库知识就是 system of record

OpenAI 特别强调，上下文管理是让 agent 在复杂任务中有效工作的最大挑战之一。他们最早尝试过“大而全的 AGENTS.md”，但很快发现会出现几个问题：

- 上下文会被巨大的说明文件挤占
- 重要信息太多，反而没有重点
- 单一大文件会很快腐化
- 很难做机械校验

所以后来他们把 `AGENTS.md` 降级成“目录”，而把真正的知识库放进结构化的 `docs/` 目录中。

文章里的核心原则是：

- 给 Codex 一张地图，而不是 1000 页手册
- 用稳定、短小的入口引导 agent 渐进式发现更多上下文
- 把 active plans、completed plans、tech debt、architecture docs、product specs 等都版本化、仓库内化

这也是他们所说的“repository knowledge is the system of record”。

## 5. Agent legibility 才是目标

文章指出，因为整个代码库都是 agent 生成的，所以它首先被优化成对 agent 可读，而不是只对人类工程师可读。

从 agent 的角度看：

- 仓库里看不到的东西就等于不存在
- Google Docs、Slack、口头共识、隐性经验，都不在上下文里
- 只有仓库本地、可版本控制、可检索的 artifacts 才是系统真正能利用的知识

因此，OpenAI 的选择是：

- 尽量把更多知识推入 repo
- 倾向选择更稳定、可组合、训练集中分布更多的技术栈
- 在某些情况下，宁可让 agent 自己重写一小块功能，也不愿意和黑盒上游库做艰难对接

## 6. 架构与品味要能被执行

文章后续的重点之一，是不仅要让 agent 知道“怎么做”，还要让架构约束和团队品味被机械执行。

这意味着：

- 架构边界不能只写在文档里
- 设计与代码质量标准要进入 linter、CI、review 流程和技能体系
- “taste” 这种原本很主观的东西，也要尽可能变成可操作规则

从这篇文章的视角看，工程师越来越像系统设计者，而不是纯粹实现者。

## 7. throughput 改变了 merge philosophy

文章指出，当 agent 带来高吞吐 PR 产出时，很多传统软件团队的合并哲学都会变化。

因为此时真正稀缺的是：

- 人类的 review 能力
- 人类的 QA 时间
- 人类在高并发任务中的注意力

在这种前提下，团队必须把越来越多 review 和验证工作转移给 agent-to-agent 协作、自动化检查和结构化反馈系统，否则高吞吐只会制造混乱。

## 8. 这篇文章真正定义了什么是 harness engineering

从全文看，OpenAI 给出的 harness engineering 并不是单一工具或单一 prompt 技巧，而是一套完整的方法：

- 让 agent 能看到应用和环境
- 让仓库成为知识系统的唯一真相源
- 让架构、质量和品味进入规则系统
- 让验证与 observability 成为 agent 可直接消费的反馈
- 让人类只把时间花在最稀缺的判断、引导和策略设计上

所以它真正想表达的是：

未来高效的软件工程，不只是“用 agent 写代码”，而是**围绕 agent 重新设计整个工程环境**。
