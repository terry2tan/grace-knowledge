---
title: Harness Engineering Is Cybernetics
date: 2026-03-21
source: x.com
url: https://x.com/odysseus0z/status/2030416758138634583
type: article
tags: [AI产品, 技术, 工具]
---

## 摘要

这篇 X Article 把 `harness engineering` 放进一条更长的技术史脉络里理解：瓦特调速器、Kubernetes controller 和今天的 coding agent，其实都属于同一种模式，也就是控制论式的反馈回路设计。作者最重要的判断是，LLM 第一次让代码库高层决策也有机会被“感知并执行”，但要真正跑稳，关键不在模型本身，而在你是否把架构约束、工程品味和“什么叫好”的标准外化成机器可读的规则。对工程师来说，未来更稀缺的能力不是比 agent 写得更快，而是更会设计环境、校准反馈、定义正确性并高效评估输出。相比中文转述版，这篇原文更短，但论点更锋利，也更适合作为 harness engineering 的概念原典之一。

## 全文

原始链接：<https://x.com/odysseus0z/status/2030416758138634583>

X Article：<http://x.com/i/article/2030414577213820928>

标题：Harness Engineering Is Cybernetics

作者：@odysseus0z（George）

发布时间：2026-03-08 06:54:13

文章开头给出的核心观点是：作者读完 OpenAI 关于 harness engineering 的文章后，意识到这不是第一次出现的模式，而是已经在技术史上出现过至少三次。

## 同一个模式，出现了三次

1. James Watt 的离心调速器

过去需要工人站在蒸汽机旁边手动调阀门，后来由飞球调速器自动感知转速并调节阀门。工人没有消失，但工作内容变成了“设计调速器”而不是“拧阀门”。

2. Kubernetes

工程师声明目标状态，例如副本数、镜像和资源限制，controller 持续监测实际状态并自动做 reconciliation。工作重心从手动重启服务，变成撰写系统对齐的 spec。

3. 现在的 harness engineering

OpenAI 描述的工程师不再直接写代码，而是设计环境、反馈回路和架构约束，再让 agent 去写代码。

作者用 Wiener 的术语来统一这三者：**cybernetics（控制论）**。也就是你不再亲手拧阀门，而是去“掌舵”。

## 为什么代码库一直是最后的 holdout

文章认为，代码库并不是没有反馈回路，而是以前只有低层回路：

- 编译器处理语法
- 测试处理行为
- Linter 处理风格

这些反馈机制都是真的控制回路，但只能机械判断那些可形式化的问题。更高层的问题长期没有闭环，例如：

- 这次改动是否符合整体架构
- 这个方案是不是对的
- 这个抽象未来会不会变成问题

作者的关键判断是：LLM 第一次同时改变了“感知”和“执行”两端。它不仅能像人一样判断这些高层问题，还能直接动手去重构模块、改接口、重写测试。

## 但闭环只是必要条件，不是充分条件

文章马上补充：能闭环，不代表系统就会自动跑稳。

- 瓦特的调速器需要调校
- Kubernetes controller 需要正确的 spec
- LLM working on your codebase 也需要你提供更难的一样东西

这个更难的东西，就是把你脑子里那些系统级判断，转成机器可以读取和执行的形式。

## 校准 sensor 和 actuator

作者认为，很多人误判 agent 的问题，常说：

“它一直在做错的事，它根本不理解我们的代码库。”

但这个诊断通常是错的。真正的问题往往是：

- 什么叫“好”没有写下来
- 哪些架构模式被鼓励没有写下来
- 哪些模式应该避免也没有写下来

如果这些知识没有被 externalize，agent 第一百次犯的错，和第一次不会有本质区别。

因此，真正需要做的工作包括：

- 写清楚实际的架构分层和依赖方向
- 做带 remediation instructions 的自定义 linter
- 写出能编码团队 taste 的 golden principles

作者还提到，OpenAI 也经历了类似阶段：他们曾经每周五花 20% 时间清理 “AI slop”，直到把标准编码进 harness 本身，问题才真正缓解。

## The only way forward

文章最有力的一段，是说这些需求其实并不新鲜：

- 文档
- 自动化测试
- 编码成规则的架构决策
- 快速反馈回路

这些一直都是正确的工程实践，只是过去不做它们的代价来得慢、散、隐蔽。但在 agentic engineering 时代，这个代价会被放大到无法承受：

- 跳过文档，agent 会在每个 PR 上、以机器速度重复同样的错误
- 跳过测试，反馈回路根本关不上
- 跳过架构约束，drift 会比你修得更快
- 更糟的是，如果 agent 根本不知道什么叫“干净”，你也没法再用它来清理自己制造的 mess

作者的结论非常直接：

**The practices haven't changed. The penalty for ignoring them has become unbearable.**

## 人的价值会转向“验证”而不是“生成”

文章最后把焦点落到 generation-verification asymmetry，也就是生成和验证之间的不对称。

作者的意思是：

- 生成正确答案通常更难
- 验证一个答案是否正确往往更容易

所以你不需要在实现层面胜过机器，你真正需要的是：

- 定义什么叫正确
- 识别输出偏离目标的地方
- 判断整体方向是否合理

文章最后一句也最有力量：

设计出瓦特调速器的人，没有再回去拧阀门。不是因为他们不会，而是因为那样做已经没有意义了。
