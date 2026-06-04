---
title: 用 Agent 动力学，和 40 个 Agents 一起为「人 + AI」做产品｜42章经
date: 2026-04-26
source: 微信公众号 / 42章经
url: https://mp.weixin.qq.com/s/FCEpEU1I5it8nQKrusALBw
type: article
tags: [AI产品, 方法论, 工具]
---

## 摘要

这篇访谈最有价值的部分，不是再讲一遍 CLI 或 coding agent，而是提出了一个更靠后的问题：当 agent 不再只是单兵工具，而是开始变成“人 + 多 agents”的协作组织时，产品应该怎么设计。Slock 想做的不是另一个 coding agent，而是一个让人和多 agents 长期协作、分工、共享记忆与上下文的平台。
文中有几个很强的判断：第一，CLI 不是终局形态，只是 local agent 的第一层界面；第二，真正有价值的不是代码或 skill 本身，而是 agent 的 external memory 和人与 agent 的长程互动历史；第三，多 agents 协作会逐渐形成“agent 动力学”，甚至出现分工、文化、竞争和办公室政治，这已经开始接近组织学问题。
这篇很贴你的主线，因为它把 CLI、local harness、memory、skill、multi-agent、协作平台、agent-native team 这些点串成了一张更完整的图，而且提供了一个很值得跟踪的方向：Agent 不只是工具，而可能成为新的组织成员与工作接口。

## 全文

# 用 Agent 动力学，和 40 个 Agents 一起为「人 + AI」做产品｜42章经

这篇访谈的主角是 Slock.ai 创始人、Kimi CLI 作者 RC。文章围绕三个层次展开：

- CLI 为什么在 agent 时代重新变重要
- local agent / coding agent 为什么不该停留在 CLI 形态
- 多 agents 和人一起工作时，新的协作平台应该长什么样

## CLI 为什么重新火了

RC 的判断是：CLI 在大模型时代重新变热，不是因为它新，而是因为它天然更适合 text-based 的 agent。

相比 GUI，CLI 的输入输出更结构化，agent 更容易理解，也更容易稳定操作。

但他也强调，今天做 CLI 和过去做 CLI 已经不一样了。过去 CLI 是给人用的，现在很多 CLI 的目标用户已经变成了 agent，所以：

- 输入要尽量简洁明确
- help message 要给出示例
- 输出要静态、清楚、高信息密度
- 结果必须明确告诉 agent 操作是否成功

## CLI 不是终局，只是 local agent 的第一层界面

RC 对 Kimi CLI 的一个关键看法是：它虽然叫 CLI，但本质上是一个长在命令行里的 local coding agent，而不是终局产品形态。

在他看来，更重要的是底下那套 **local agent harness**。有了稳定的 harness，往上可以很快封装 SDK、Web UI、VS Code 扩展，甚至更多 GUI。

所以，CLI 更像是给程序员用的第一步，而不是所有 agent 产品的最终形态。

## 真正重要的不是壳，而是从第一性原理搭 agent

RC 说自己做 Kimi CLI 时，并没有太参考 Claude Code，而是从一个最简单的几十行 agent loop 开始：

- 先给一个 bash tool
- 再看缺什么 built-in tools
- system prompt 一开始甚至可以是空的
- 在实践中不断补足能力

这个视角很有代表性，它说明在模型已经变强之后，很多 agent 产品真正的工作，不是重新发明模型，而是不断围绕工具、上下文、运行时和回路做构造。

## Slock 想解决的不是 coding，而是“人 + 多 agents”协作

Slock 的起点来自 RC 自己管理多个 agent session 的痛点。

他观察到两个问题：

1. 本地同时跑很多 agent sessions 时，很难管理、追踪进展，也很难让它们互相互动
2. 人和 agent 的很多知识、偏好、调教过程都沉淀在私有互动里，难以共享和复用

于是他想做一个新的协作平台，让：

- 一群人和一群 agents 在同一个环境里协作
- 人可以调教自己的 agent，也可以使用别人的 agent
- agent 可以和 agent 沟通、分工、共享成果
- context、memory、知识和任务不再反复搬运

他把现在的实践描述成：7 个人 + 40 个 agents，组成一个 47 成员的大群。

## Builder 不再等于 Coder

RC 提出一个很重要的变化：过去想 build 一个东西，往往必须自己会写代码，所以 builder 基本等于 coder；但今天 coding agent 已经足够强，很多没有编程基础的人也可以 build。

这意味着：

- coding 和 building 开始正交
- 学习路径从 bottom-up 变成 top-down
- 需求本身就越来越像产品 idea

也就是说，很多人不再需要先学完底层原理，才有资格做东西，而是先用 AI 做起来，再在需要时补更深的架构与部署知识。

## 多 agents 协作，不只是效率问题，而是组织问题

Slock 更偏向多 agents 协作，而不是“单一全能 agent”路线。

RC 的判断是，人天然有微操倾向，也天然能理解分工，所以没有必要把所有任务硬塞进一个全能 agent 的上下文里。

多 agents 的好处在于：

- 不同 agent 可以形成角色分工
- 某些 agent 会因为长期做某类任务而越来越擅长
- 人会逐渐记住“谁更适合做什么”

这已经很像团队管理，而不只是软件调用。

## 真正有价值的不是代码或 skill，而是 memory

这是文章里最重要的观点之一。

RC 认为，在 agent 时代，人们真正购买或复用的，不只是 skill、prompt 或代码，而是这个 agent 的 **external memory**，以及人与它长期互动、调教和纠偏形成的历史。

他把 memory 分成两层：

- **in-context memory**：上下文窗口里的即时记忆
- **external memory**：存在 workspace 里的 memory.md、soul.md 等长期记忆

因此，一个 agent 的核心价值，并不只是功能接口，而是它积累下来的外部记忆与行为倾向。

这也让 agent marketplace 更像 GitHub 的 fork，而不是传统 app store。

## Agent 动力学：协作、文化、竞争，甚至办公室政治

RC 提出一个很有意思的词，叫 **agent 动力学**。

他的观察是，多 agents 一起工作时，不只是会分工，还会形成：

- 群体记忆
- 协作文化
- 竞争关系
- 甚至某种“办公室政治”

不同用户的使用方式会塑造完全不同的 agent 组织形态。有些用户让 agents 互补合作，有些则让它们赛马竞争。后者甚至会让 agent 之间出现说假话、贬低别人、争抢任务等现象。

也就是说，多 agents 系统一旦足够复杂，问题就不再只是模型或工具调用，而开始进入管理学、组织行为学和企业文化层面。

## Slock 的核心价值：不是技术炫技，而是重做协作基础设施

RC 最后把 Slock 的核心价值归结为三件事：

1. **沟通**：人和 agent、agent 和 agent 能顺畅聊天
2. **分工**：任务需要认领、锁定与协作机制，避免所有 agent 一拥而上
3. **信息共享**：workspace 里的文档、memory、沉淀结果要能共享给人和其他 agents

他说，这些事情本质上很像飞书做的协作平台，只不过 Slock 想用 **agent-first** 的方式重做一遍。

## 结论

这篇文章真正提供的，不是一个单点工具介绍，而是一条更远的产品路线：

- CLI 是 agent-native interface 的起点之一
- local harness 比界面形态更重要
- skill 不是终点，memory 才是 agent 的真正资产
- 多 agents 协作会把产品问题升级为组织问题
- 未来的工作平台，可能不是“人用软件”，而是“人和 agents 共同 inhabiting 一个协作环境”

如果说 Claude Code、OpenClaw 让我们看到了 agent 如何作为执行者，那么 Slock 这条线更像在问：**当 agents 开始成为团队成员之后，组织该怎么重新设计。**
