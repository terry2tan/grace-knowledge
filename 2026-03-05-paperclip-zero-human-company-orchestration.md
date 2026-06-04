---
title: Paperclip — 开源 AI 公司编排框架（零人工公司）
date: 2026-03-05
source: github.com
url: https://github.com/paperclipai/paperclip
type: repo
tags: [AI产品, 工具, AI]
---

## 摘要

Paperclip 是一个开源的 AI Agent 编排框架，定位是"运行零人工公司的操作系统"。如果说 OpenClaw/Claude Code 是员工，Paperclip 就是公司本身——提供组织架构、目标对齐、预算管控、治理审批和任务调度。支持接入任意 Agent（OpenClaw、Claude Code、Codex、Cursor），一键启动，通过 Dashboard 统一监控所有 Agent 的工作和成本。1474 Stars，TypeScript，MIT 协议。

## 核心概念

**定位：** "If OpenClaw is an employee, Paperclip is the company"

**三步使用流程：**
1. 定义目标：如"把 AI 笔记 App 做到 $1M MRR"
2. 雇佣团队：CEO、CTO、工程师、设计师、市场——任意 Bot、任意 Provider
3. 审批运行：Review 策略，设预算，启动，Dashboard 监控

## 核心功能

| 功能 | 说明 |
|------|------|
| **Bring Your Own Agent** | 任意 Agent、任意 Runtime，统一接入组织架构 |
| **Goal Alignment** | 每个任务都追溯到公司使命，Agent 知道做什么、为什么做 |
| **Heartbeats** | Agent 按计划唤醒、检查工作、执行任务，委派在组织架构中流动 |
| **Cost Control** | 每个 Agent 设月预算，超限自动停止，无失控消费 |
| **Multi-Company** | 单次部署运行多家公司，数据完全隔离 |
| **Ticket System** | 每次对话可追溯，每个决策有解释，完整工具调用链路和不可变审计日志 |
| **Governance** | 你是董事会：审批招聘、覆盖策略、随时暂停/终止任意 Agent |
| **Org Chart** | 层级、角色、汇报关系——Agent 有上司、职称和职位描述 |
| **Mobile Ready** | 随时随地从手机监控和管理自治业务 |

## 解决的核心痛点

| 没有 Paperclip | 有 Paperclip |
|----------------|--------------|
| 20 个 Claude Code 标签页，重启全丢 | 任务基于 Ticket，会话持久化跨重启 |
| 手动收集上下文提醒 Bot 在做什么 | 上下文从任务→项目→公司目标自动流动 |
| Agent 配置文件一团乱 | 开箱即用的组织架构、Ticket、委派和治理 |
| 失控循环浪费几百美元 Token | 预算追踪，超限自动节流 |
| 定期任务需要手动触发 | Heartbeat 处理定期工作，管理层监督 |

## 技术亮点

- **原子执行：** 任务签出和预算执行是原子操作，无重复工作，无失控消费
- **持久 Agent 状态：** Agent 跨 Heartbeat 复用同一任务上下文，不从头重来
- **运行时技能注入：** Agent 在运行时学习 Paperclip 工作流和项目上下文，无需重训
- **治理回滚：** 审批门控，配置变更版本化，可回滚
- **目标感知执行：** 任务携带完整目标血缘，Agent 始终看到"为什么"

## 明确不是什么

- 不是聊天机器人（Agent 有工作，不是聊天窗口）
- 不是 Agent 框架（不管你怎么构建 Agent，管的是由 Agent 组成的公司）
- 不是工作流构建器（不是拖拽式流程图，建模的是公司——组织架构、目标、预算、治理）
- 不是单 Agent 工具（适合 20 个 Agent 的场景，1 个 Agent 不需要）

## 快速开始

```bash
npx paperclipai onboard --yes
```

要求：Node.js 20+，pnpm 9.15+。自托管，无需 Paperclip 账号，内嵌 PostgreSQL 自动创建。

## Roadmap

- **Clipmart** — 一键下载/分享整个公司架构模板
- **Plugin System** — 内嵌自定义插件（报告、知识库等）
- **Cloud Agent Adapters** — 更多云托管 Agent 适配器
