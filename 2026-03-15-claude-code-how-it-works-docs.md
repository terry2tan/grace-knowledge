---
title: Claude Code 如何工作：官方机制文档
date: 2026-03-15
source: code.claude.com
url: https://code.claude.com/docs/zh-CN/how-claude-code-works
type: article
tags: [AI产品, 工具, 技术]
---

## 摘要

这是 Claude Code 官方文档里最值得反复读的一篇，核心作用是把产品从“会用”拉到“理解机制”。文档覆盖的主题非常全面：工具白名单、上下文怎么构造、CLAUDE.md 如何生效、子 agent、记忆、权限控制、Plan mode、hooks、MCP、成本和安全边界。它的重要性在于，很多日常使用中的困惑，例如 Claude 为什么会忘、为什么要写 CLAUDE.md、为什么要分 Plan 与执行，其实都能在这篇文档里找到机制层解释。对任何想把 Claude Code 用成工程系统的人，这篇官方文档都是一等公民。

## 全文

### 基本信息

- 文档：Claude Code 如何工作
- 官方站点：https://code.claude.com/docs/zh-CN/how-claude-code-works
- 语言：中文官方文档

### 文档覆盖范围

页面目录显示，这篇文档至少覆盖这些关键主题：

- 工具允许列表（Allowlist tools）
- 上下文构建
- CLAUDE.md 与导入机制
- 子 agent
- 记忆机制
- 成本追踪
- 安全机制
- Plan mode
- Hooks
- MCP

### 为什么重要

这篇文档并不是“命令清单”，而是 Claude Code 的设计说明书。它回答的是：

- Claude Code 在每轮对话里到底拿到了什么上下文
- 本地项目里的 `CLAUDE.md` 为什么这么重要
- 工具权限与 allowlist 如何影响行为
- 什么时候应该用 Plan mode
- hooks 和 MCP 在架构里分别扮演什么角色

如果你已经在用 Claude Code，但经常凭经验摸索，这篇官方文档能帮你把经验上升为机制理解。

### 适合怎么读

最推荐的顺序是：

1. 先读上下文、CLAUDE.md、Plan mode
2. 再读 subagents、hooks、MCP
3. 最后看成本、安全和记忆

这样能先建立主干模型，再理解周边能力。
