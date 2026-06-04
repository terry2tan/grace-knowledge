---
title: Agent Harness：让AI从聊天机器人变成真正的智能体
date: 2026-04-20
source: blog.qiaomu.ai / 向阳乔木
url: https://blog.qiaomu.ai/2026-04-18-JgypqM
type: article
tags: [AI产品, 工具, 方法论]
---

## 摘要

这篇文章系统解释了 Agent Harness 的定义与边界，核心观点是：真正决定 Agent 是否能进入生产环境的，往往不是模型本身，而是模型外层的基础设施，包括工具、记忆、上下文管理、状态持久化、错误处理、验证循环和安全机制。
文章最有价值的地方，是把 Harness 从“提示词包装器”提升为完整的软件系统，并拆成 12 个生产级组件，覆盖编排循环、工具、记忆、上下文压缩、防护栏、子智能体编排等关键环节。
它还给出一个很重要的判断：随着模型变强，好的 Harness 不是越来越厚，而是应该不断删掉不再必要的复杂性，走向“薄 Harness，强模型”的协同进化。
这篇非常符合你的主线，属于 Agent 工程、上下文工程、多 Agent 与工作流编排的核心方法论文，值得长期留在知识库里。

## 全文

# Agent Harness：让AI从聊天机器人变成真正的智能体

你可能已经搭建过聊天机器人，甚至接入了几个工具，做出了能演示的原型。

但当你想把它推向生产环境时，问题就来了：模型会忘记三步之前做过什么，工具调用会失败，上下文窗口塞满了无用信息。

问题不在模型本身，而在模型周围的一切。

LangChain 用一个实验证明了这点：他们只改变了 LLM 的基础设施，在 TerminalBench 2.0 的排名就从 30 名开外跃升到第 5 名。

另一个研究项目让 LLM 自己优化基础设施，通过率达到 76.4%，超过了人工设计的系统。

这套基础设施现在有了正式名称：**Agent Harness**。

## 什么是 Agent Harness

Harness 是包裹 LLM 的完整软件基础设施：**编排循环、工具、记忆、上下文管理、状态持久化、错误处理和安全防护**。

Anthropic 的 Claude Code 文档直接说明：SDK 就是“驱动 Claude Code 的 Agent harness”。

OpenAI 的 Codex 团队也用同样的表述，明确把 Agent 和 Harness 等同起来，指代让 LLM 真正有用的非模型基础设施。

LangChain 的 Vivek Trivedy 给出了一个精准的公式：**如果你不是模型，你就是 harness。**

这里有个容易混淆的地方：Agent 是涌现出来的行为，Harness 是产生这种行为的机械装置。

当有人说“我做了个 Agent”，实际意思往往是做了个 Harness，然后把它指向了一个模型。

Beren Millidge 在《Scaffolded LLMs as Natural Language Computers》中给出类比：原始 LLM 像一个没有内存、没有硬盘、没有 I/O 的 CPU；上下文窗口像 RAM，外部数据库像硬盘，工具像设备驱动，**Harness 就是操作系统。**

## 三层工程

模型周围有三个同心圆层次的工程：

- 提示词工程：精心制作模型接收的指令
- 上下文工程：管理模型看到什么、何时看到
- Harness 工程：涵盖前两者，再加上工具编排、状态持久化、错误恢复、验证循环、安全执行和生命周期管理

Harness 不是提示词的包装器，而是让自主智能体行为成为可能的完整系统。

## 生产级 Harness 的 12 个组件

文章综合 Anthropic、OpenAI、LangChain 等经验，总结出一个生产级 harness 的 12 个组件：

1. **编排循环（Orchestration Loop）**：通常是一个 while 循环，实现思考-行动-观察（TAO / ReAct）。
2. **工具（Tools）**：工具注册、模式验证、参数提取、沙盒执行、结果回传。
3. **记忆（Memory）**：短期会话记忆与长期持久化记忆结合。
4. **上下文管理（Context Management）**：应对上下文腐烂，常见策略包括压缩、观察遮蔽、即时检索、子智能体委托。
5. **提示词构建（Prompt Construction）**：系统提示词、工具定义、记忆文件、历史对话、当前消息的分层组装。
6. **输出解析（Output Parsing）**：识别 tool_calls、结构化输出与最终答案。
7. **状态管理（State Management）**：支持检查点、恢复、时间旅行调试或 git 式进度管理。
8. **错误处理（Error Handling）**：区分瞬态、LLM 可恢复、用户可修复与意外错误。
9. **防护栏和安全（Guardrails and Safety）**：输入、输出、工具三个层级的防护与权限控制。
10. **验证循环（Verification Loops）**：测试、linter、截图检查、LLM-as-judge 等。
11. **子智能体编排（Subagent Orchestration）**：fork、teammate、worktree、handoff 等模式。
12. **终止与恢复机制**：最大回合、预算耗尽、防护栏触发、中断恢复、长任务跨窗口连续性等。

## 关键方法论

文章后半段最重要的几个判断：

- **首先最大化单智能体，再考虑多智能体**。多智能体不是默认更强，而是有更高协调成本。
- **工具越多不一定越好**。暴露最小必要工具集，通常效果更强。
- **验证循环是玩具 Demo 和生产 Agent 的分水岭**。
- **好的 Harness 要能随着模型升级而变薄**。如果模型变强后还必须继续堆复杂编排，说明设计方向可能不对。

Anthropic 的路线很典型：持续从 Claude Code 的 Harness 中删除规划步骤，因为新模型已内化了这部分能力。

## Harness 就是产品

文章最后的结论非常到位：同一个模型，用不同的 Harness，可以做出截然不同的产品表现。

Harness 不是一个可以忽略的商品层，而正是 Agent 产品真正的差异化所在。真正艰苦的工程工作，就是在这里发生的。

下次 Agent 失败时，别急着怪模型，先看看 Harness。
