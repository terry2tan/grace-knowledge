---
title: Thin Harness, Fat Skills
date: 2026-04-15
source: github.com / garrytan/gbrain
url: https://github.com/garrytan/gbrain/blob/master/docs/ethos/THIN_HARNESS_FAT_SKILLS.md
type: article
tags: [AI产品, 工具, 方法论]
---

## 摘要

这篇文章是 Garry Tan 对 Agent 系统设计的一次高度凝练的总结，核心观点是：决定 AI Agent 产出差异的，不是模型本身，而是围绕模型构建的 harness 与 skills 体系。所谓 thin harness，就是把运行循环、文件读写、上下文管理和安全约束这些通用能力保持得足够薄，不让庞杂工具定义和高延迟接口吞掉上下文窗口；所谓 fat skills，则是把真正有价值的流程、判断、领域知识和工作方法沉淀成可复用的 markdown skill。文章还进一步给出了 resolver、latent vs deterministic、diarization 等概念，用来解释上下文该如何按任务装载、哪些问题该交给模型思考、哪些步骤必须落到确定性系统。对你的偏好来说，这篇非常值得收，因为它几乎就是 Claude Code、OpenClaw、Skill、上下文工程、Agent 架构和工作流设计的一个统一解释框架。

## 全文

# Thin Harness, Fat Skills

Garry Tan 认为，人们看到 AI coding agent 带来的 10x 到 100x 生产力提升时，往往误以为原因在于模型变得更强了。但他认为这是一个错误框架。真正拉开差距的，不是模型参数，而是模型外面的系统设计，也就是 harness 和 skills。

他把 harness 定义为运行 LLM 的那层程序，职责只有四个：运行模型循环、读写文件、管理上下文、执行安全约束。这部分应该尽量保持“薄”。相反，如果 harness 变得很胖，就会出现各种反模式，比如几十个工具定义吃掉上下文窗口、大量 MCP 往返调用带来延迟、REST API 被机械包装成工具导致令牌、时延和失败率全部上升。

与之对应，真正应该变“胖”的是 skills。Garry Tan 把 skill file 定义为一种可复用的 markdown 过程文件，用来教模型“如何做一件事”，而不是直接写死“要做什么”。用户负责提供目标、数据集、参数，skill 负责提供一套可重复执行的判断流程。文章强调，markdown 在这里不是随便写的提示词，而是一种更接近软件设计的能力封装形式，因为它能表达步骤、判断、上下文和经验。

文章还提出了几个重要的补充概念。

**Resolver** 是上下文路由表，用来决定在任务类型 X 出现时，应该优先加载文档 Y。skills 负责 HOW，resolver 负责 WHAT to load WHEN。这样模型不需要把所有规则都背在一个巨大提示词里，而是根据任务动态拉取最相关的上下文。

**Latent vs. Deterministic** 用来区分系统中的两类步骤。Latent space 是模型思考、解释、综合和做判断的地方；Deterministic 则是 SQL、代码、数字计算这种必须稳定可复现的部分。好的系统要把判断留给模型，把可信执行压到确定性工具层，避免让模型处理本该用程序解决的精确问题。

**Diarization** 则是让模型读完围绕某一主题的大量材料后，输出结构化画像或判断摘要。Garry Tan 认为，这类工作正是模型真正有价值的地方，因为它要求模型在大量文档中识别矛盾、把握演化过程并形成结构化认知，而不是做简单检索。

在架构层面，他给出的结构很清晰：

- 顶层是 fat skills，沉淀领域流程、判断逻辑和工作方法
- 中间是 thin CLI harness，负责最小必要的运行控制与上下文管理
- 底层是你的应用和确定性工具，比如数据库查询、文档读取、搜索、时间线等

一句话概括就是：**把智能尽量往上推到 skill，把执行尽量往下压到确定性工具，中间那层 harness 保持足够薄。**

文章后半段还用了 YC Startup School 的 founder 匹配系统做例子，说明如何通过 enrich-founder、match-breakout、match-lunch、match-live、improve 等 skills，把创始人资料富化、分组匹配、活动反馈学习这些任务编成一套会持续迭代的系统。这里最有意思的地方在于，skills 不只是执行流程，还能在活动后根据反馈自动改写自己的规则，形成某种“自我改进”的工作流。

最后，Garry Tan 也把 OpenClaw 纳入这个框架中。他认为 Claude Code 是目前最好的 coding harness，而 OpenClaw 则更适合承担 coding 之外的 email、calendar、meeting、research、alerts 等长期个人 Agent 工作。共同原则不变，仍然是 thin harness, fat skills。每写一个新 skill，都是对整个系统的一次永久升级，而且新模型出来后，技能层能立刻受益，因为 latent judgment 变强了，deterministic execution 仍然稳定。

如果把这篇文章压缩成一句话，它真正想说的是：**Agent 的生产力跃迁，不是模型单点升级，而是通过薄执行层 + 厚技能层 + 精准上下文装载形成的系统工程。**
