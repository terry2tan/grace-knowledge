---
title: learn.shareai.run：learn-claude-code 的网站版课程（20 课，含 Claude Code 源码深挖）
date: 2026-11-23
source: shareAI Lab（learn.shareai.run，Next.js 站点）
url: https://learn.shareai.run/zh/
type: repo
tags: [AI, 技术, 工具]
---

## 摘要

这是 GitHub 仓库 `shareAI-lab/learn-claude-code`（本库 `2026-11-23-learn-claude-code-harness.md`）的**网站版**，但**不是同一个课程**——课程数从 17 变成 **20**，编号和内容都不同，且每一课都多了一节「**深入 CC 源码**」的实地考证。如果说 GitHub 版是「教学代码 + 格言」，网站版是「教学代码 + 为什么这样设计 + Claude Code 真源码怎么写的」。

站点自述：「从 0 到 1 构建 nano Claude Code-like agent，每次只加一个机制」，**20 个渐进式课程，从简单循环到完整多 Agent Harness**。首页有核心循环的代码框和一段「**消息增长**」的可视化——观察 Agent 循环执行时 `messages[]` 数组如何增长（len=0 → 逐步累积），把「上下文是怎么被填满的」这件事变成可看的动画。

> 与 GitHub 版的差异（重要）：仓库是 17 课（loop→tool→permission→hooks→todo→subagent→skill→compact→memory→task→background→cron→team→MCP→integrated→workflow→goal），站点是 20 课且**新增了 System Prompt、Error Recovery、Team Protocols、Autonomous Agents、Worktree Isolation** 五个机制课，同时把「集成」一课的体量从 3346 行压到 1708 行（站点 s20 Comprehensive Agent）。两边行数也对不上（如 s01 仓库 153 行 vs 站点 102 行），说明是两版实现而非同一份代码的两种排版。

## 20 课清单（括号内为该课代码行数）

| # | 主题 | 一句话 |
|---|---|---|
| s01 | The Agent Loop (102) | 最小可用 Agent = 调用模型、跑工具、回灌结果的循环 |
| s02 | Tool Use (135) | 循环保持稳定，能力注册进 dispatch table |
| s03 | Permission (180) | 危险动作在 shell 执行前需要一个 harness 决策点 |
| s04 | Hooks (232) | 横切关注点该挂在循环**周围**，不要缠进循环里 |
| s05 | TodoWrite (236) | 显式计划让长任务可见、可纠偏 |
| s06 | Subagent (304) | 给每个子任务干净的消息历史，同时保住主线程 |
| s07 | Skill Loading (335) | 只有任务真的需要时才注入专业知识 |
| s08 | Context Compact (414) | 压缩让对话在窗口拥挤时仍然可用 |
| s09 | Memory (528) | 有些事实要能活过摘要和下一次会话 |
| **s10** | **System Prompt (166)** | **prompt 是组装出来的，不是写死的——分段 + 按需拼接 + 缓存** |
| **s11** | **Error Recovery (287)** | **健壮的 harness 会给失败分类，再决定哪种重试值得做** |
| s12 | Task System (297) | 任务图把模糊目标变成有序、可观测的工作 |
| s13 | Background Tasks (379) | Agent 继续推理，慢活到别处完成 |
| s14 | Cron Scheduler (645) | 周期性工作该由 harness 创建，而不是靠模型记住 |
| s15 | Agent Teams (745) | 持久队友让工作并行，不必把所有想法塞进一个上下文 |
| **s16** | **Team Protocols (709)** | **多 Agent 系统需要显式的消息契约，不是「感觉」** |
| **s17** | **Autonomous Agents (648)** | **队友能自己发现并认领工作，才真的有用** |
| **s18** | **Worktree Isolation (802)** | **并行 Agent 需要隔离的文件系统，就像需要隔离的对话** |
| **s19** | **MCP Tools (835)** | **外部服务通过标准发现与调用协议变成 Agent 工具** |
| s20 | Comprehensive Agent (1708) | 最终 harness 仍然是一个循环，只是被让它可以上生产的系统包围 |

架构层次（站点的正交切分）：Tools & Execution (4 版) / Planning & Control (5 版) / Memory Management (2 版) / Concurrency & Scheduling (2 版) / Multi-Agent Platform (7 版)。

## 「深入 CC 源码」这一节的价值（以 s10 为例）

每课末尾有基于 **Claude Code 真源码**的分析（s10 引用 `constants/prompts.ts` 914 行、`constants/systemPromptSections.ts` 68 行、`context.ts` 189 行、`utils/api.ts` 718 行、`utils/systemPrompt.ts` 123 行、`bootstrap/state.ts`）。s10 披露的细节：

- **section 分静态/动态两类**，数量不固定，受 feature flag、output style、KAIROS/Proactive 模式、用户类型、token 预算影响
  - 静态（始终加载）：identity、system、doing_tasks、actions、using_tools、tone_style、output_efficiency
  - 动态（按状态加载）：session_guidance、memory、ant_model_override、env_info_simple、language、output_style、mcp_instructions、scratchpad、frc、summarize_tool_results、numeric_length_anchors、token_budget、brief
- **`mcp_instructions` 是唯一的易失性 section**（由 `DANGEROUS_uncachedSystemPromptSection()` 创建），因为 MCP server 可以在轮次间连接和断开
- `getSystemPrompt()` 返回 `string[]`（每个元素一个 section），用 **`SYSTEM_PROMPT_DYNAMIC_BOUNDARY`** 分隔静态与动态
- **cache scope**：启用 global cache boundary 时静态 section 合并成一个 global cache block，动态 section 不参与（`cacheScope: null`）；没有 boundary 时走 org scope
- **三层缓存**：① lodash memoize（getSystemContext/getUserContext 在会话内缓存）② section 注册缓存（`STATE.systemPromptSectionCache`，`/clear` 或 `/compact` 时清除）③ API 级缓存（`splitSysPromptPrefix()` 按 boundary 切成不同 cache scope 的块）
- **getSystemContext vs getUserContext**：前者内容为 gitStatus/cacheBreaker，追加到 system prompt 数组；后者为 CLAUDE.md 内容 + currentDate，**前置成 `<system-reminder>` 用户消息**。自定义 system prompt 时前者跳过、后者始终运行
- **模式改变 prompt**：`CLAUDE_CODE_SIMPLE` 整个 prompt 只有 2 行；Proactive/KAIROS 用紧凑版替换所有标准 section；Coordinator 用专用 prompt 完全替换；Agent 模式用 Agent 定义的 prompt 替换或追加
- **总大小**：标准交互模式 system prompt 核心约 **20-30KB**；SIMPLE 模式约 150 字符

## 为什么值得和仓库版一起存

- **教学版 → 生产版的对照**：教学版 s10 的实现只有「分段 + json.dumps 检测 + 缓存」，作者明确说「这里的缓存只避免重复拼接字符串，和 CC 的 API prompt cache 不是一回事」——这种把教学简化与真实实现**显式区分开**的写法，比含糊带过有用得多。
- **补齐了 GitHub 版缺的三个机制**：Error Recovery（失败分类与重试策略：升级 token、压缩上下文、指数退避、切换模型）、Team Protocols（消息契约）、Worktree Isolation（并行 Agent 的文件系统隔离）——这三个正好是「多 Agent 真能干活」绕不过去的东西。
- **源码考证本身可当 Claude Code 逆向笔记读**：即使不跟着写代码，光看每课的「深入 CC 源码」也能拿到一批别处查不到的实现细节（section 清单、cache boundary、prompt 总大小量级）。

## 链接

- 站点（中文）：https://learn.shareai.run/zh/
- 示例课（含源码深挖）：https://learn.shareai.run/zh/s10/
- 对应仓库：https://github.com/shareAI-lab/learn-claude-code
