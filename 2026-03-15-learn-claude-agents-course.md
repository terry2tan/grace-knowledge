---
title: Learn Claude Agents：12 节课拆解 Claude Code 与编程 Agent
date: 2026-03-15
source: learn-claude-agents.vercel.app
url: https://learn-claude-agents.vercel.app/en/
type: article
tags: [AI产品, 工具, 技术]
---

## 摘要

`Learn Claude Agents` 是一个把 Claude Code 拆成 12 个渐进式 session 的交互式学习站点，目标不是教人背命令，而是理解“coding agent 到底如何运作”。它最有价值的地方在于：从最基础的 agent loop、工具调用和 Bash 开始，逐步讲到代码库上下文、子 Agent、上下文压缩、Hooks、MCP 和多 Agent 协作。站点的中心观点很鲜明：Agent 的本质并不神秘，底层就是 while loop + 工具调用，而复杂度是随着真实工程需求自然长出来的。对想系统学懂 Claude Code / Codex 这类 coding agent 的人，这是很好的结构化入门材料。

## 全文

### 基本信息

- 站点：Learn Claude Agents
- 链接：https://learn-claude-agents.vercel.app/en/
- 类型：交互式课程 / 学习站点

### 这个资源讲什么

站点明确写的是：

- 12 个渐进式的 session
- 面向 Claude Code、Codex、Aider 以及“agentic shells”
- 目标是解释 coding agent 如何工作

它不是把工具当黑箱，而是试图回答：

- Agent loop 是什么
- 工具调用如何组成完整行为
- 代码库上下文如何影响结果
- 为什么需要 subagents、hooks、compaction、MCP 和 worktree

### 课程结构

首页列出的 session 包括：

1. Hello Agent
2. Bash Is All You Need
3. The Codebase Is The Prompt
4. Subagents
5. History Summarization
6. Hooks
7. Agentic Shells
8. Design Patterns
9. Session Context
10. Planning vs Execution
11. Model Context Protocol
12. Multi-Agent Coding

### 为什么值得看

这个课程的价值不在“教你几个 Claude Code 小技巧”，而在于它把 coding agent 拆成一层一层可理解的机制：

- 从最简单的 loop 开始
- 再到上下文如何被构造和压缩
- 再到多 agent、分工、协议和工具生态

它很适合已经会用一点 Claude Code，但还没有形成系统模型的人。看完之后，你通常会把 agent 从“神奇黑盒”重新理解为“可组合的软件系统”。

### 适合谁

- 想系统学习 Claude Code / Codex 运行原理的人
- 想做 coding agent 产品或工作流的人
- 想理解 subagent、MCP、上下文压缩这些概念为何存在的人
- 不满足于只学 prompt，而想理解 Agent 架构的人
