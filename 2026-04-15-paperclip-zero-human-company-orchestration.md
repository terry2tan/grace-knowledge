---
title: paperclipai/paperclip: Open-source orchestration for zero-human companies
date: 2026-04-15
source: github.com
url: https://github.com/paperclipai/paperclip
type: repo
tags: [AI产品, 工具, 技术]
---

## 摘要

Paperclip 是一个很典型的“组织层 Agent 编排”项目，它不试图替代 OpenClaw、Claude Code、Codex 这类 agent 本身，而是把这些 agent 组织成一个可治理、可追踪、可预算控制的“公司系统”。它最有价值的地方，在于把 org chart、goal lineage、budget、governance、heartbeat、audit log 这些原本零散存在于多 Agent 实验里的概念，统一抽象成一个控制平面。对你的偏好来说，这个项目值得关注，因为它讨论的不是单个 Agent 能做什么，而是多 Agent 如何在长期任务、组织结构、成本约束和管理闭环下持续协作。可以把它理解成一种偏“公司操作系统”的多 Agent orchestration 方向。

## 全文

# paperclipai/paperclip: Open-source orchestration for zero-human companies

Paperclip 的定位非常直接：**如果 OpenClaw 像员工，Paperclip 更像公司。**

它是一个 Node.js server 加 React UI 的开源系统，用来编排一组 AI agents 去运行业务。项目不关心你使用哪一种 agent runtime，而是强调 “bring your own agents”，也就是你可以接 OpenClaw、Codex、Claude、Cursor 等各种 agent，再由 Paperclip 统一管理目标、预算、任务流转、治理和审计。

这个项目最关键的抽象不在单个 Agent 能力，而在“组织层”。它试图把多 Agent 协作从“20 个终端窗口 + 一堆脚本 + 手动盯进度”的状态，变成类似任务管理系统和组织架构结合的控制平面。项目里提到的核心元素包括：

- **Org chart**：Agent 有岗位、上下级、职责和汇报关系
- **Goal alignment**：每个任务都能回溯到项目目标和公司使命，Agent 不只是看到一个标题，而是知道“为什么做”
- **Budgets**：可以按 Agent 分配月度预算，到上限自动停止，防止 runaway cost
- **Heartbeats**：Agent 按计划定期唤醒执行任务，也能响应事件触发
- **Governance**：支持审批、策略覆盖、暂停和终止 Agent
- **Audit log**：完整追踪对话、工具调用和决策链路
- **Multi-company isolation**：一套部署可以跑多个公司，数据完全隔离

Paperclip 还强调了一些 orchestration 层的实现细节，例如：

- **Atomic execution**，避免多个 Agent 重复 checkout 同一任务
- **Persistent agent state**，跨 heartbeat 继续原有上下文而不是每次重启
- **Runtime skill injection**，运行时向 Agent 注入 Paperclip 工作流和项目上下文
- **Governance with rollback**，配置修改支持审计和回滚
- **Portable company templates**，支持组织结构、skills、agent 配置导入导出

项目的基本使用体验，和传统 Agent 工具明显不同。它不是 chat 窗口，不是单 Agent 助手，也不是 drag-and-drop workflow builder，而是把 Agent 当“员工”管理。你定义业务目标，雇佣一组 Agent，批准策略，然后让它们在预算和治理框架下持续工作。

从工程形态看，它支持 `npx paperclipai onboard --yes` 快速启动，也支持手动 clone、pnpm install、pnpm dev 的方式本地运行。开发栈是 Node.js 20+、pnpm、React UI，并会自动创建嵌入式 PostgreSQL，适合本地快速起步。

如果把这个项目压成一句话，它最值得看的点在于：**它把多 Agent 协作从“prompt + skill + task”层，继续往上提到“组织设计 + 成本控制 + 目标治理 + 审计控制”层。** 这不是单纯多 Agent，而是 Agent 时代的公司操作系统思路。
