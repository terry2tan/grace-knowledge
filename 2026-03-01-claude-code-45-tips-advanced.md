---
title: "45 Claude Code Tips: From Basics to Advanced"
date: 2026-03-01
source: github.com
url: https://github.com/ykdojo/claude-code-tips
type: repo
tags: [AI, 工具]
---

## 摘要

ykdojo 整理的 45 条 Claude Code 实战技巧合集，3700+ Stars，覆盖从入门到高阶的完整使用路径。核心亮点包括：自定义状态栏脚本（显示 token 用量/Git 分支）、用 Gemini CLI 突破网站访问限制、把 Claude Code 装进容器执行高风险长任务、手动压缩 context 替代自动 compact 以争取更多上下文空间、用语音输入提升交互速度。高阶技巧包括 Git Worktree 并行分支、slack 掉一半 system prompt、以及让 Claude Code 在容器里自运行等。

## 全文

# 45 Claude Code Tips: From Basics to Advanced

> **仓库**：https://github.com/ykdojo/claude-code-tips
> **Stars**：3706 ⭐
> **Topics**：agentic-ai, claude-code, tips-and-tricks, developer-tools, productivity

---

## Tip 0: 自定义状态栏

在 Claude Code 底部状态栏显示模型名、当前目录、Git 分支、未提交文件数、与远程同步状态、token 用量进度条，以及最后一条消息摘要。支持 10 种颜色主题。

```
Opus 4.5 | 📁claude-code-tips | 🔀main (scripts/context-bar.sh uncommitted, synced 12m ago) | ██░░░░░░░░ 18% of 200k tokens
💬 This is good. I don't think we need to change the documentation...
```

脚本：[scripts/context-bar.sh](scripts/context-bar.sh)

---

## Tip 1: 常用 Slash Commands

- `/usage`：查看 rate limit 和 token 用量（Tab/Shift+Tab 刷新）
- `/chrome`：切换 Claude 原生浏览器集成
- `/mcp`：管理 MCP server
- `/stats`：GitHub 风格的使用活跃度热力图
- `/clear`：清空对话，重新开始
- `/copy`：把 Claude 最后一条回复复制为 Markdown 到剪贴板

---

## Tip 2: 用语音输入

语音比打字快，推荐工具：
- [superwhisper](https://superwhisper.com/)
- [MacWhisper](https://goodsnooze.gumroad.com/l/macwhisper)
- [Super Voice Assistant](https://github.com/ykdojo/super-voice-assistant)（开源，支持 Parakeet v2/v3）

本地模型识别准确率已足够，Claude 能理解识别错误的词。可以在飞机上轻声耳语使用。

---

## Tip 3: 拆解大问题

把复杂任务拆成小步骤，逐个完成再组合。这与传统软件工程思维一致，Claude Code 也同样适用。

---

## Tip 4: Git & GitHub CLI

让 Claude 处理 commit（省去写 commit message）、branch、PR 创建。建议允许 pull 但手动确认 push。

- 使用 draft PR 降低风险，审查后再标记 ready
- `gh` 支持 GraphQL 查询，功能极强

**关闭 commit/PR 署名**（在 `~/.claude/settings.json`）：
```json
{
  "attribution": {
    "commit": "",
    "pr": ""
  }
}
```

---

## Tip 5: Context 像牛奶，越新鲜越好

对话越长性能越差。每个新话题开新对话，或性能下降时重开。

---

## Tip 6: 从终端导出内容

- `/copy`：复制最后一条回复
- `pbcopy`：直接写入剪贴板
- 写入文件再用 VS Code 打开（支持指定行号）
- `open` 命令在浏览器中打开 URL

---

## Tip 7: 终端别名

```bash
alias c='claude'
alias ch='claude --chrome'
alias gb='github'
alias co='code'
alias q='cd ~/Desktop/projects'
```

`c -c` 继续上次对话，`c -r` 查看历史对话列表。

---

## Tip 8: 主动压缩 Context

建议关闭 auto-compact（通过 `/config`），改为手动控制。上下文不够时，让 Claude 先写 HANDOFF.md，然后开新对话加载该文件继续工作：

> "把当前进展写成 HANDOFF.md，包括已尝试的方法、成功/失败情况，让下一个 agent 读完就能继续。"

---

## Tip 9: 写-测试循环

对于自主任务，要求 Claude 完成写代码→运行测试→修 bug 的完整循环，而不只是写代码。

---

## Tip 10: Cmd+A 和 Ctrl+A

- **Cmd+A**（Mac）：选中输入框全文，可以直接替换整条消息
- **Ctrl+A**：在终端中跳到行首

---

## Tip 11: 用 Gemini CLI 访问被屏蔽的网站

```
Use Gemini CLI as a fallback to access sites Claude can't reach
```

当某些网站 Claude Code 无法直接访问时，可以让 Gemini CLI 作为中转工具。

---

## Tip 12: 投资自己的工作流

花时间构建个人化工作流（脚本、别名、CLAUDE.md、Skills），长期复利回报高。

---

## Tip 13: 搜索对话历史

可以搜索过去的对话记录，找回之前解决过的方案或讨论过的思路。

---

## Tip 14: 用 Terminal Tab 多任务

开多个 Tab 同时运行多个 Claude Code 实例，处理不同任务。

---

## Tip 15: 精简 System Prompt

Claude Code 默认 system prompt 占用约 10% context。可以通过修改配置文件将其压缩约一半，节省大量 token。

---

## Tip 16: Git Worktree 并行分支

用 `git worktree` 在不同目录同时处理多个分支，适合并行开发多个功能。

```bash
git worktree add ../feature-branch feature/new-feature
```

---

## Tip 17: 手动指数退避

对于长时间运行的任务失败后，不要立即重试，而是等待一段时间再试（模拟指数退避策略）。

---

## Tip 18: Claude Code 作为写作助手

不只是代码，Claude Code 也擅长写文档、博客文章、技术说明。

---

## Tip 19: Markdown 是核心

用 Markdown 格式组织思路、写指令、输出结果，可以更好地利用 Claude 的理解能力。

---

## Tip 20: 用 Notion 粘贴保留链接

从终端复制内容粘贴到 Notion 时可以保留 Markdown 格式和链接。

---

## Tip 21: 容器隔离高风险任务

对于长时间运行、有潜在副作用的任务，让 Claude Code 在 Docker 容器内执行，避免污染本地环境。

---

## Tip 22: 用就是最好的学习

上手使用比看教程更有效，遇到问题再查。

---

## Tip 23: Clone/Fork 对话

可以克隆对话来创建分叉，用不同方案尝试同一问题；也可以"半克隆"（只取对话前半段）。

---

## Tip 24: 用 realpath 获取绝对路径

```bash
realpath ./some/relative/path
```

在给 Claude 传递文件路径时，用绝对路径避免歧义。

---

## Tip 25: CLAUDE.md vs Skills vs Slash Commands vs Plugins

- **CLAUDE.md**：项目级常驻指令，每次对话自动载入
- **Skills**：可复用的工作流文档，按需调用
- **Slash Commands**：快捷指令触发器
- **Plugins**：扩展 Claude Code 功能的插件

---

## Tip 26: 交互式 PR Review

让 Claude Code 帮你做 PR 审查，可以交互式地提问、讨论改动。

---

## Tip 27: Claude Code 作为研究工具

用于调研技术方案、对比库、分析代码库结构，不只是写代码。

---

## Tip 28: 多种方式验证输出

不要只依赖 Claude 自述，结合以下方式验证：运行测试、人工检查、截图、浏览器预览等。

---

## Tip 29: Claude Code 作为 DevOps 工程师

让 Claude 处理部署脚本、CI/CD 配置、环境搭建等 DevOps 任务。

---

## Tip 30: 保持 CLAUDE.md 简洁，定期审查

CLAUDE.md 太长会浪费 context。定期清理过时的指令，保持精简。

---

## Tip 31: Claude Code 作为通用接口

把 Claude Code 当成操作系统的"通用界面"，任何 CLI 工具都可以通过 Claude 来使用。

---

## Tip 32: 选择正确的抽象层次

根据任务复杂度选择合适的指令粒度：太细碎浪费时间，太笼统容易出错。

---

## Tip 33: 审查已授权命令

定期检查 Claude Code 被允许自动执行的命令列表，清理不再需要或风险过高的权限。

---

## Tip 34: 写测试（用 TDD）

要求 Claude Code 先写测试再写实现，测试驱动开发同样适用于 AI 辅助编程。

---

## Tip 35: 在未知中大胆迭代

面对不确定的问题，勇于让 Claude Code 尝试，失败了再调整方向，迭代求解。

---

## Tip 36: 后台运行 Bash 命令和 Subagent

可以把耗时操作放到后台运行，主对话继续其他任务，后台完成后再通知结果。

---

## Tip 37: 个性化软件时代已到来

Claude Code 让每个人都能快速构建专属工具，门槛极低，鼓励大家主动定制自己的工作流。

---

## Tip 38: 在输入框中导航和编辑

掌握输入框的键盘快捷键（Ctrl+A/E 行首尾、Ctrl+W 删词等），提升输入效率。

---

## Tip 39: 规划与快速原型并重

花时间规划，但也要尽快做出可运行的原型，两者结合效果最好。

---

## Tip 40: 简化过度复杂的代码

主动要求 Claude Code 重构、精简代码，避免过度工程化。

---

## Tip 41: 自动化的自动化

用 Claude Code 来编写自动化脚本，再用脚本自动化重复工作，形成元层次的效率提升。

---

## Tip 42: 分享知识，贡献社区

把有价值的技巧、脚本、工作流分享出去，帮助他人。

---

## Tip 43: 持续学习

Claude Code 更新迭代快，保持关注新功能，定期调整工作流。

---

## Tip 44: 安装 dx 插件

dx 插件提供了开发体验增强功能，推荐安装。详见仓库说明。

---

## Tip 45: 快速安装脚本

仓库提供一键安装脚本，快速完成环境配置。详见 [README](https://github.com/ykdojo/claude-code-tips)。
