---
title: The Harness Is Everything: What Cursor, Claude Code, and Perplexity Actually Built
date: 2026-03-21
source: x.com
url: https://x.com/rohit4verse/status/2033945654377283643
type: article
tags: [AI产品, 技术, 工具]
---

## 摘要

这篇 X Article 是一篇非常系统的 harness engineering 综述，价值不在提出全新概念，而在于把 SWE-agent、Claude Code、Codex、Anthropic 长任务架构和 AutoJunjie 的 `awesome-agent-harness` 生态整理成了一套统一叙事。作者反复强调一个核心判断：真正拉开差距的不是模型，而是 harness，也就是模型所处的完整环境，包括工具、上下文管理、反馈回路、压缩机制、约束系统、工作流切分与跨会话状态保持。文章最值得看的部分，是它把 harness 从“提示词增强”彻底提升成“系统工程问题”，并进一步总结出一组反复出现的设计模式：渐进式披露、git worktree 隔离、仓库即知识源、机械化架构约束、集成反馈回路。如果你已经理解了 OpenAI 对 harness engineering 的定义，这篇文章适合拿来补齐全景图。

## 全文

原始链接：<https://x.com/rohit4verse/status/2033945654377283643>

X Article：<http://x.com/i/article/2028491712692383744>

标题：The Harness Is Everything: What Cursor, Claude Code, and Perplexity Actually Built

作者：@rohit4verse（Rohit）

发布时间：2026-03-18 00:36:47

## 文章的核心判断

作者一开始就把结论说得很重：

你不是因为没选对模型才没用好 AI，而是因为没有搭对环境。

在他的定义里，`harness` 不是：

- system prompt
- API wrapper
- 单一 eval 框架
- prompt template
- 带记忆的 chatbot

而是一个**完整设计过的运行环境**，包括：

- 工具集合
- 信息格式
- 上下文压缩与历史管理
- 防错误扩散的 guardrails
- 让 agent 能把任务交给“未来的自己”而不丢失一致性的脚手架

作者甚至直接给出一句最强结论：

**The model is almost irrelevant. The harness is everything.**

## 1. 为什么 raw model capability 不够

文章首先回到 SWE-agent 论文的发现：同一个前沿模型，在完全相同的 coding 任务上，只因为任务呈现方式和可用工具不同，表现就会显著不同。

作者借这个案例强调：

- 模型能力不是唯一变量
- 接口本身会决定 agent 如何思考
- 对 LM agent 来说，interface 不是便利层，而是认知结构本身

他甚至写了一句非常值得记住的话：

**The interface is not a convenience layer. For an LM agent, the interface is the mind.**

## 2. Context window 不是内存条

作者对上下文问题的解释也很清楚：

- 很多人把 context window 当成 RAM
- 但实际上它更像 agent 当前会话里的全部工作意识

这意味着：

- 每个 token 都有计算成本
- 无关信息会与关键信息竞争注意力
- 噪声不会被“干净忽略”，而是会真正干扰后续推理

文章用几个非常具体的例子说明：

- 在大代码库里直接 `grep` 返回上万行结果，只会污染上下文
- 用 `cat` 把整个文件灌进去，而不是精准读取两段函数，也是在浪费注意力预算

SWE-agent 的 capped search 工具之所以重要，就是因为它把“信息过载”变成“逼你缩窄搜索范围”的自然流程。

## 3. SWE-agent 为什么重要

文章接着用 SWE-agent 论文作为 harness engineering 的实证起点。

它总结的关键 ACI（Agent-Computer Interface）设计包括：

- capped search
- stateful file viewer
- 带行号的代码阅读界面
- edit 后立刻 lint
- 历史上下文的压缩与摘要

作者强调，这些改进不是语法糖，而是在管理 agent 的认知负荷。模型之所以表现更好，不是因为更聪明了，而是因为不再被无关工作拖垮。

## 4. Anthropic 和 OpenAI 解决的是更长程的问题

SWE-agent 解决的是单次 session 内的交互效率，而 Anthropic 和 OpenAI 遇到的是更长时间跨度的问题：

- 任务跨多个上下文窗口
- 项目比单个 session 大得多
- agent 容易中途迷失、半成品收尾、或错误判断“已经做完”

文章整理了 Anthropic 的两 agent 架构：

- initializer agent 负责初始化环境、feature list、启动脚本和进度文件
- coding agent 负责一轮轮实现具体功能、更新状态、保持 clean handoff

作者特别强调 feature list 和 progress file 的作用，因为它们解决的不是“记忆更多”，而是“给 agent 一个不会漂移的完成定义”。

## 5. OpenAI 做的是让 application 更 legible

作者把 OpenAI 那篇 harness engineering 文章里的重点进一步提炼成一句：

随着 agent 产能上升，真正稀缺的是人类 QA 时间，所以系统必须越来越对 agent 可见。

对应的具体做法包括：

- 每个 git worktree 可独立启动应用
- 接入 Chrome DevTools Protocol
- 给 agent DOM、截图、导航能力
- 本地暴露 logs、metrics、traces
- 每个任务有隔离的 observability 数据

也就是说，agent 不只是“看代码”，而是逐渐能像工程师一样“看系统运行结果”。

## 6. awesome-agent-harness 提供的是生态地图

文章后半部分大量引用了 `awesome-agent-harness` 仓库，把整个生态拆成 7 层：

1. Human Oversight
2. Planning / Spec Tools
3. Full Lifecycle Platforms
4. Task Runners
5. Agent Orchestrators
6. Harness Frameworks / Runtimes
7. Coding Agents

作者借这套分层说明一个关键观点：

真正的竞争优势不在最底层的 coding model，而在上层的协调与环境设计。

## 7. 文章提炼出的 5 个重复出现的设计模式

这是全文最有复用价值的一部分。作者总结出 serious harness architecture 里反复出现的 5 个模式：

1. Progressive Disclosure  
不要一次性把所有信息塞给 agent，而是给最小入口和逐步深入的路径。

2. Git Worktree Isolation  
一个 agent 一个 worktree，隔离并行任务，降低互相污染。

3. Spec First / Repository as System of Record  
Slack、Google Docs 和脑内共识都不算数，agent 真正能消费的是 repo 里的结构化知识。

4. Mechanical Architecture Enforcement  
不要靠人肉 review 维持一致性，尽量把架构边界和风格偏好写进 linter、CI、结构化规则。

5. Integrated Feedback Loops  
尽量让错误在最靠近发生点的地方被发现，比如 edit 后立刻 lint、运行后直接看到 logs 和 traces。

## 8. 工程师真正转向的是什么

文章最后把结论拉回到工程师身上。

作者认为，未来更重要的不是“谁 prompt 写得更好”，而是：

- 谁更理解上下文如何流动
- 谁知道上下文会在哪里被污染
- 谁更会设计反馈系统
- 谁更会把约束变成机械执行
- 谁更会做 environment audit，而不是一上来怪模型不够强

他最后那句值得单独记住：

**The model is what thinks. The harness is what thinks about.**

也就是说，模型负责推理，但决定它能推理出什么结果的，是整个环境。
