---
title: CLI-Anything：让所有软件都 Agent-Native
date: 2026-03-15
source: github.com
url: https://github.com/HKUDS/CLI-Anything
type: repo
tags: [AI产品, 工具, 技术]
---

## 摘要

CLI-Anything 的目标很明确：把任何有代码库的软件自动改造成 AI Agent 可直接调用的 CLI 工具，而不是依赖脆弱的截图点击式 GUI 自动化。这个仓库最有价值的地方有三点：一是它把“把软件改造成 agent-native 工具”做成了一条 7 阶段自动流水线；二是它不仅支持 Claude Code，还给 OpenCode、Codex、Qodercli 提供了对应入口；三是项目已经用 11 个真实软件做了完整验证，README 声称总计通过 1,508 项测试。对想让 Agent 操作桌面软件、专业软件或现有代码库的人来说，这是一个很强的基础设施项目。

## 全文

### 基本信息

- 仓库：`HKUDS/CLI-Anything`
- 描述：CLI-Anything: Making ALL Software Agent-Native
- 链接：https://github.com/HKUDS/CLI-Anything
- Stars：14,305
- 主要语言：Python
- 最近更新：2026-03-15 07:54:15 UTC

### 这个项目在做什么

CLI-Anything 的核心主张是：CLI 才是人类和 AI Agent 的通用接口。相比 UI 自动化和零散 API，它更结构化、更可组合、更适合模型消费，也更容易做稳定的 JSON 输出。

项目试图用“一条命令”把任意软件或代码库转成 agent-ready CLI。README 明确提到可面向 OpenClaw、Claude Code、Codex 等智能体环境使用。

### 工作方式

在 Claude Code 场景里，它通过插件市场安装：

```bash
/plugin marketplace add HKUDS/CLI-Anything
/plugin install cli-anything
```

安装后可以直接运行：

```bash
/cli-anything ./gimp
```

README 给出的完整流水线有 7 个阶段：

1. Analyze：扫描代码并映射 GUI 动作到底层 API
2. Design：设计命令分组、状态模型和输出格式
3. Implement：生成基于 Click 的 CLI，支持 REPL、JSON 输出、撤销重做
4. Plan Tests：生成测试计划
5. Write Tests：实现测试
6. Document：回写测试结果和说明
7. Publish：生成安装配置并放到 PATH

项目还支持后续 `refine`，用于逐步补齐 CLI 覆盖范围，而不是一次性生成后就结束。

### 为什么它重要

README 对问题的定义很清楚：Agent 擅长推理，但不擅长真正使用专业软件。现有替代方案通常只有三种：

- 脆弱的 UI 自动化
- 能力很有限的 API
- 为 Agent 重新造一个缩水版软件

CLI-Anything 的方案是：不重做软件，而是给真实软件建立结构化 CLI 接口，尽可能保留原始能力。

它强调几个原则：

- 调真实软件，而不是自己造一个替代实现
- 每个命令天然支持 `--json`，适合 Agent 消费
- 同时支持 REPL 和子命令模式
- 依赖真实后端，缺失时测试直接失败而不是“优雅降级”

### 已验证的软件覆盖

README 里给出了 11 个已验证应用，包括：

- GIMP
- Blender
- Inkscape
- Audacity
- LibreOffice
- OBS Studio
- Kdenlive
- Shotcut
- Zoom
- Draw.io
- AnyGen

仓库宣称总共通过了 1,508 项测试，包含单元测试和端到端测试，并覆盖真实软件调用结果验证。这一点很关键，因为很多 Agent 工具只演示“能跑通 demo”，但这里强调的是生产级验证。

### 对 Codex 的支持

这个仓库不仅是 Claude Code 插件，也包含 `codex-skill/`。README 给出的 Codex 用法是先安装 skill：

```bash
git clone https://github.com/HKUDS/CLI-Anything.git
bash CLI-Anything/codex-skill/scripts/install.sh
```

之后可以直接用自然语言让 Codex 构建、refine 或 validate 某个软件的 harness。

### 项目结构

README 里最值得注意的目录包括：

- `cli-anything-plugin/`：Claude Code 插件与命令定义
- `cli-anything-plugin/HARNESS.md`：整个方法论的 SOP
- `codex-skill/`：Codex 技能入口
- 多个 `agent-harness/` 示例目录：展示不同软件生成后的 CLI 结构和测试

其中 `HARNESS.md` 被项目定义为单一事实来源，负责沉淀把软件改造成 agent-accessible CLI 的方法论。

### 适用场景

根据 README，CLI-Anything 适合几大类场景：

- 把开源软件改造成 Agent 可控工具
- 把一堆零散 Web API 包装成一个统一 CLI
- 替代或强化 GUI 型 Agent 工作流
- 为 Agent 任务生成更可测试、更可评估的执行接口

覆盖领域从创意工具、开发工具、数据分析，到企业办公、协作、图表和 AI 内容生成。

### 限制

README 也写得比较诚实，主要限制有三条：

- 依赖强模型，弱模型生成的 harness 质量不稳定
- 强依赖源代码可用，只有二进制时效果会明显变差
- 往往需要多次 refine，不能假设一轮就达到生产质量

### 结论

CLI-Anything 不是一个单点工具，而是一套把“现有软件如何变成 Agent 原生能力”系统化的方法论和工程框架。它真正有意思的地方，不只是给某个软件加 CLI，而是把这种改造过程抽象成可复用、可测试、可发布的流水线。对任何想做 Agent 基础设施、软件自动化接口层、或让模型真正操作复杂软件的人来说，这个仓库都值得仔细研究。
