---
title: learn-claude-code：从 0 到 1 手写一个 Claude Code 式 Agent Harness（17 课）
date: 2026-11-23
source: GitHub / shareAI-lab
url: https://github.com/shareAI-lab/learn-claude-code
type: repo
tags: [AI, 技术, 工具]
---

## 摘要

**80.8k stars / 12.9k forks / MIT / Python** 的「Harness 工程」教学仓库（Trendshift 上榜）。一句话主旨：**"Bash is all you need" —— 一个工具 + 一个循环 = 一个 Agent**。它把 Claude Code 拆成 17 个递进课程（s01→s17），每课一个**可独立运行的单文件 Python 程序**（从 153 行到 3346 行，合计约 13000 行），每加一课就加一个 harness 机制，且每课配一句格言和一张架构 SVG（中/英/日三语 README）。

立论很硬：**Agency 来自模型训练，不来自外部代码编排。** 所以「开发 Agent」只可能是两件事之一——①训练模型（DeepMind/OpenAI/Anthropic 在做）；②构建 Harness（我们大多数人在做）。仓库教的是后者：`Harness = Tools + Knowledge + Observation + Action Interfaces + Permissions`。作者对「拖拽式工作流 / 无代码 Agent 平台 / 提示词链编排库」的批评相当刻薄：那是「鲁布·戈德堡机械」「喷了 LLM 漆的 GOFAI」——「你不可能通过工程手段编码出 agency」。

对 Claude Code 的定义也很干净：
```
Claude Code = Agent Loop + 工具(bash/read/write/edit/glob/grep/browser…)
            + 按需 Skill 加载 + 上下文压缩 + 子 Agent 派生
            + 带依赖图的任务系统 + 异步邮箱的团队协调
            + 任务绑定的 worktree 并行执行 + 权限治理
            + hooks 扩展系统 + memory 持久化 + MCP 外部能力路由
```
「Harness 没让 Claude 变聪明，Claude 本来就聪明。Harness 给了 Claude 双手、双眼和一个工作空间。」

## 17 课清单（每课一句格言）

| 课 | 主题 | 格言/要点 |
|---|---|---|
| s01 | Agent Loop | 「一个循环 + Bash 就够了」——`while True`：模型调工具就执行回灌，不调就退出。最小 153 行 |
| s02 | Tool Use | 「加一个工具，只加一个 handler」——循环不动，新工具注册进 dispatch map |
| s03 | Permission | 「先划边界，再给自由」——先判断能不能做、要不要问用户 |
| s04 | Hooks | 「挂在循环上，不写进循环里」——工具前后留插口，不改主循环也能扩展 |
| s05 | Todo Write | 「没有计划的 agent 走哪算哪」——先列步骤再动手 |
| s06 | Subagent | 给子任务全新的 `messages[]`，最终文本作为一条工具结果返回 |
| s07 | Skill Loading | 「用到时再加载，别全塞 prompt 里」——技能先列目录，用到再展开 |
| s08 | Context Compact | 「上下文总会满，要有办法腾地方」——四步压缩：先整理工具结果，仍超限再生成历史摘要（619 行，最长的「硬核」课之一） |
| s09 | Memory | 「记住该记的，忘掉该忘的」——三个子系统：筛选、提取、整理 |
| s10 | Task System | 「大目标拆成小任务，排好序，持久化」——文件持久化的任务图，多 Agent 协作的基础 |
| s11 | Background Tasks | 「慢操作丢后台，agent 继续思考」——后台线程跑命令，完成后注入通知 |
| s12 | Cron Scheduler | 「定时触发，不需要人推」 |
| s13 | Agent Teams | 「一个 Agent 顾不过来，就让队友分工协作」——持久队友、认领就绪任务、任务绑定的工作目录（1905 行） |
| s14 | MCP Plugin | 「能力不够？插上 MCP」——把外部工具接进同一个工具池 |
| s15 | Integrated Harness | 「多种机制，一个循环」——把前面所有机制集成（3346 行，全仓最大） |
| s16 | Workflow Runtime | 「编排形状固定时，就把它写进代码」——保存好的 workflow 用 journal 续跑 |
| s17 | Goal Loop | 「目标决定循环什么时候真正结束」——模型不调工具只意味「这一轮想停」，goal 在会话级加一个 Stop hook：独立 evaluator 读对话判断完成条件是否成立，未完成就把工作送回同一个循环；目标不可能/执行失败/超续跑上限时把控制权交还用户 |

## 工程细节

- **技术栈**：Python + `anthropic` SDK（`ANTHROPIC_API_KEY` 直接跑），每课一个 `code.py`，目录内配 `images/*.svg` 架构图与三语 README；`requirements.txt` 只有 anthropic / python-dotenv / pyyaml。
- **附带的 4 个 Skill**（可直接当模板抄）：`agent-builder`（含 `init_agent.py` 脚本与 minimal-agent / subagent-pattern / tool-templates 三个参考实现 + agent-philosophy.md）、`mcp-builder`、`code-review`、`pdf`。
- **有测试**：`tests/` 目录覆盖 loop 边界、compaction 工具对、permission 命令词解析、cron、goal loop 等（说明是真的当工程在做，不是一次性教学 demo）。
- **`agents/` 目录**是另一条线（s01-s12 + s_full 的模块化版本），`web/` 提供 web 侧内容；`docs/` 有 zh/ja 全文课程稿。

## 为什么对 Terry 有价值

- **这是把「Harness Engineering」从口号变成代码的最短路径**。之前几篇（Tabbit 的苦涩教训、LobeHub 的 Task 工单、SkillHone、Agent 评测复盘）都在讲 harness 该怎么设计，这个仓库是那些原则的可运行参照实现——尤其 s10 任务系统 与 LobeHub 的 Task 工单、s07 按需加载 Skill 与 OpenClaw 的 skills 机制、s12 cron 与我们的定时任务、s17 goal loop 与「循环何时终止」这条设计线，几乎一一对应。
- **最短的可抄样本**：s01 只有 153 行就把 Agent Loop 说完了。想验证自己对某个机制的理解，直接读对应那一个文件比读文档快。
- **17 课的顺序本身就是一张「harness 能力成熟度表」**：loop → tool → permission → hooks → todo → subagent → skill → compaction → memory → task → background → cron → team → MCP → 集成 → workflow → goal。任何自建 Agent 系统都可以拿它当 gap analysis 的清单。
- 一句值得记住的收敛判断：**「造好 Harness，Agent 会完成剩下的。」**

## 链接

- 仓库：https://github.com/shareAI-lab/learn-claude-code
- 中文 README：https://github.com/shareAI-lab/learn-claude-code/blob/main/README-zh.md
