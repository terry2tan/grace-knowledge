---
title: gstack：把 Claude Code 变成多角色专家团队
date: 2026-03-15
source: github.com
url: https://github.com/garrytan/gstack
type: repo
tags: [AI产品, 工具, 技术]
---

## 摘要

`gstack` 是 YC CEO Garry Tan 开源的一套 Claude Code 工作流技能包，核心想法是把“一个泛化助手”切换成“按角色召唤的专家团队”。它提供 8 个偏工作流的 slash command，包括 CEO 视角的规划审查、工程经理视角的架构审查、偏 paranoid staff engineer 的代码 review、发布、浏览器 QA、cookie 导入和 retrospective。这个项目最有价值的地方，不是 prompt 文案本身，而是把产品思考、工程治理、QA 和 release 明确拆成不同 cognitive modes，让 Claude Code 在不同阶段切换不同的“脑”。对重度使用 Claude Code 做软件交付的人，这是一套很强的 workflow operating system。

## 全文

### 基本信息

- 仓库：`garrytan/gstack`
- 链接：https://github.com/garrytan/gstack
- 描述：Use Garry Tan's exact Claude Code setup
- Stars：11,625
- 主要语言：TypeScript
- 最近更新：2026-03-15 08:04:48 UTC

### 这个仓库解决什么问题

gstack 的核心判断是：Claude Code 不应该永远处于“一个模糊的通用模式”。规划、审查、发版、浏览器 QA、本来就是不同类型的认知任务，应该显式切换不同的 skill / mode。

README 把它定义为：

- 8 个带明确立场的 workflow skills
- 不是给新手的 prompt pack
- 而是给重度用户的 operating system

### 内置技能

README 列出的核心技能包括：

- `/plan-ceo-review`：从产品和 founder 视角重想问题
- `/plan-eng-review`：从工程经理视角锁定架构、数据流、边界和测试
- `/review`：偏 paranoid 的 staff engineer review
- `/ship`：执行 release 流程
- `/browse`：浏览器自动化 QA
- `/qa`：系统化 QA 测试
- `/setup-browser-cookies`：导入浏览器会话
- `/retro`：工程复盘

### 为什么值得学

gstack 代表了一种很典型的 Claude Code 高阶用法：

- 用 skill 显式切 cognitive mode
- 用浏览器能力补齐 agent 的“眼睛”
- 用 `/review` 和 `/ship` 做强约束交付闭环
- 用 `/retro` 把团队协作也纳入 agent 工作流

它把 Claude Code 从“会写代码”提升到“能参与完整软件交付流程”。

### 安装方式

README 给出的全局安装方式是：

```bash
git clone https://github.com/garrytan/gstack.git ~/.claude/skills/gstack
cd ~/.claude/skills/gstack
./setup
```

然后把 gstack 配置写进 `CLAUDE.md`，明确可用 skills，并让 `/browse` 成为默认网页浏览方式。

### 适合谁

- 已经重度使用 Claude Code 的工程师 / founder
- 想把规划、架构审查、发布和 QA 标准化的人
- 想研究“多角色 skill 工作流”如何设计的人
