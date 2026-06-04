---
url: https://mp.weixin.qq.com/s/ItWY8F-d_IHyQeRggFPP3A
title: DeepSeek押注的Harness Engineering综述（ETCLOVG七层架构）
author: PaperAgent
source: 微信公众号
captured_at: 2026-06-03
tags: [AI-Agent, Harness-Engineering, 系统架构, 方法论, 综述]
---

# DeepSeek押注的Harness，被这篇最新综述彻底讲透了

> 来源：PaperAgent | 2026年5月25日
> 基于论文：Agent Harness Engineering: A Survey (CMU, Yale, JHU, NEU 联合)

## 背景

DeepSeek Harness 团队开始招人，团队使命：**Model + Harness = Agent**，Harness = 模型之外全部工作。

## 核心论断：绑定约束论（Binding-Constraint Thesis）

**对于长程任务，基准方差由执行 Harness 驱动，而非模型本身。**

三个硬核证据：
1. **Bölük (2026a)**：只改 Harness 格式，15 个模型编码基准提升高达 10 倍，模型权重零改动
2. **Trivedy (2026)**：固定 GPT-5.2-Codex，仅重构 Harness，Terminal-Bench 2.0 从 52.8% → 66.5%（+13.7pp）
3. **Meta-Harness (Lee et al., 2026)**：纯自动化优化 Harness 结构，Terminal-Bench-2 达 76.4%，超越所有手工设计

这些增益远超模型迭代通常带来的 2-4pp 提升。

## 三阶段演进

| 阶段 | 时间 | 核心问题 | 优化范围 |
|------|------|----------|----------|
| Prompt Engineering | 2022-2024 | 模型输入是什么？ | 单调用文本优化 |
| Context Engineering | 2025 | 模型每一步看到什么？ | 多步信息流的动态管理 |
| **Harness Engineering** | **2026** | **模型如何在系统中可靠运行？** | **跨层基础设施整合** |

Harness Engineering 并非取代前两阶段，而是**包含并超越**它们。

## ETCLOVG 七层架构（Harness 工程的"OSI 模型"）

### 结构核心（前四层）

| 层 | 名称 | 核心职责 |
|----|------|----------|
| **E** | Execution & Sandbox | Agent 的"硬件抽象层"：安全、可复现、活性 |
| **T** | Tool Interface & Protocol | Agent 的"系统调用层"：发现、描述、调用工具 |
| **C** | Context & Memory | Agent 的"内存子系统"：上下文管理 |
| **L** | Lifecycle & Orchestration | Agent 的"进程调度器"：任务推进与状态管理 |

### 控制平面（后三层）

| 层 | 名称 | 核心职责 |
|----|------|----------|
| **O** | Observability & Operations | Agent 的"Telemetry 层"：追踪、监控、成本归因 |
| **V** | Verification & Evaluation | Agent 的"质量体系"：五阶段 Task-to-Feedback 生命周期 |
| **G** | Governance & Security | Agent 的"访问控制与审计层"：权限、Hook、合规 |

## 关键设计洞察

### E 层：沙箱的三重目的
1. **安全**：LLM 生成代码不可预测，Prompt 注入可攻击
2. **可复现**：状态重置到已知基线
3. **活性**：Anthropic 报告引入沙箱后权限提示减少 84%

### T 层：工具菜单过大会降低可靠性
生产系统反复报告：**工具菜单过大直接降低可靠性、增加 Token 开销、放大规划错误**。

四个集成边界：
- Model↔Function（Function Calling, OpenAPI）
- Agent↔Capability（MCP, OpenAPI）
- Agent↔Agent（A2A, ACP/ANP）
- Agent↔Repo/Env（AGENTS.md, AGENT.md）

### C 层：上下文窗口不是越大越好
核心矛盾：Transformer 二次注意力成本、U 型注意力曲线（中间信息遗忘）、Context Rot 现象。
**信息放置比信息存在更重要。**

### L 层：三层编排组织
- **单 Agent 内循环**：ReAct 范式（OpenCode, Claude Code, Codex CLI, Aider, SWE-agent）
- **多 Agent 编排**：层级、团队、图组合、扇出
- **全生命周期流水线**：Issue → PR 端到端（Vibe Kanban, Symphony, GitHub Agentic Workflows）

### V 层：五阶段 Task-to-Feedback 生命周期
1. 任务与基准锚定
2. 执行前就绪验证
3. 受控执行与追踪捕获
4. 多级判断与故障归因
5. 持续回归与部署反馈

评估不应只报告最终成功率，而应**诊断失败来源并反馈给 Harness 改进**。

### G 层：治理 Hook 点
单次工具使用周期中的四个 Hook：
- H1：输入护栏
- H2：动作护栏
- H3：后执行信息流控制
- H4：人在回路

## 论文与资源

- **论文**：[Agent Harness Engineering: A Survey](https://openreview.net/pdf?id=eONq7FdiHa)
- **项目站**：https://picrew.github.io/LLM-Harness/

---

## 价值判断

**信息密度：高** — 这是一篇系统性综述的解读，提供了完整的 Agent 工程七层架构、实证数据、演进阶段和设计原则。直接可用于指导 Agent 系统设计。

**用户相关性：极高** — 完全命中用户对 Agent 原理、工作流编排、系统设计、方法论的核心兴趣。
