---
title: baoyu-design：把 claude.ai 的 Artifact 设计能力搬到本地 Agent Skill
date: 2026-10-31
source: github.com
url: https://github.com/jimliu/baoyu-design
type: repo
tags: [AI产品, 工具]
---

## 摘要

宝玉（Jim Liu）把 claude.ai 的 Artifact types 重新打包成本地 Agent Skill，可在 Cursor、Claude Code、Codex 等 70+ agent 里运行，不依赖 claude.ai/design、无订阅、无上传。五个 skill：`claude-slides`（可编辑幻灯片，导出 PDF/HTML/PowerPoint）、`claude-design`（画布 + artboard 设计，可播放原型）、`claude-design-system`（设计系统：tokens、品牌书、组件预览）、`claude-dashboard`（数据仪表盘：CSV/TSV/JSON 数据集 + 实时图表，Sources 面板可把每个数字追溯到数据行）、`dataviz`（图表规范，agent 画图前必读，带调色板校验）。核心架构思路：每个 skill 写该 Artifact 类型的原生文件格式（deck.json / canvas.json 等）到本地文件夹，通过 `scripts/artifact.mjs` 起一个 localhost 编辑器，人和 agent 编辑同一批文件轮流协作，还支持编辑器内评论（comments.json，agent 可 `--wait` 监听）。5.4k stars，MIT。

## 全文

# baoyu-design

**Run Claude Design on your own local agent — Cursor, Claude Code, Claude Desktop, or any file-capable coding agent.**

把 claude.ai 的 Artifact types 带到本地 agent：可编辑的幻灯片、设计画布、设计系统和数据仪表盘，每个都在本机自己的编辑器里打开。第五个 skill `dataviz` 是 agent 画任何图表前读的图表规范。原版 baoyu-design skill（自包含 HTML 原型）已归档到 `archive/baoyu-design/`。无网站、无额外订阅、无上传步骤；产物全部留在你的 repo 里。

## Skills

| Skill | 产出 | 编辑器 |
|---|---|---|
| `claude-slides` | 幻灯片：`deck.json` + 每页一个 HTML | 演示、改字、拖拽；导出 PDF/HTML/PowerPoint |
| `claude-design` | artboard 画布：`canvas.json` + `.dc.html` Design Components | artboard 并排、播放原型、改文案；导出 HTML/PDF/PNG |
| `claude-design-system` | 设计系统：tokens、README 品牌书、组件预览、字体、资产组 | 浏览编辑颜色、排版、组件、资产 |
| `claude-dashboard` | 数据仪表盘：数据集（CSV/TSV/JSON）+ 图表页 | 实时图表、筛选、Sources 面板追溯每个数字到数据行 |
| `dataviz` | 更好的图表（HTML/SVG/d3/matplotlib/plotly）：形式选择、明暗/色盲可读配色、标记、图例、tooltip，带调色板校验脚本 | 无需打开：agent 写图表代码前读 |

## Artifact skills 机制

四个 skill 写 Artifact 类型的原生文件格式到文件夹，并从本机起服务打开该类型的编辑器页面。agent 写文件、编辑器即时展示；你在编辑器里的编辑保存回同一批文件——人和 agent 轮流协作。

幻灯片/画布/设计系统编辑器里可按 **C** 对元素或区域评论。评论存本地 `comments.json`；agent 通过 `artifact.mjs` 读取回复；`comments <root> --wait` 监听时编辑器提供 **Send to agent** 按钮。

## 运行

```bash
node skills/claude-slides/scripts/artifact.mjs open designs/q3-review   # 起编辑器，打印 URL
node skills/claude-slides/scripts/artifact.mjs check designs/q3-review  # 校验文件
node skills/claude-slides/scripts/artifact.mjs upload designs/q3-review hero.jpg
node skills/claude-slides/scripts/artifact.mjs list                     # 找磁盘上的设计系统
```

Dashboard 通过同一脚本（`write-db`、`read-db`、`upload`、`check`、`open`）写进 `<root>/db/`。`scripts/` 全部预构建为纯 JavaScript，仅需 Node（slides 等 20+，dashboard 22+），无需安装构建。

## 为什么本地跑

- **摆脱网站**：不离开编辑器就获得 claude.ai/design 绝大部分能力，同样方法论、工艺标准、输出格式。
- **Best with Opus 5.5**：skill 是一份很长、要求高的设计 brief，模型越强效果越好；推荐配 Opus 5.5。
- **和 agent 并排编辑**：编辑器跑在 localhost，你的编辑和 agent 写的是同一批文件。
- **一切都是你的**：产物落在 `designs/<slug>/`，纯文件，可版本化、fork、导出、上线。

## 安装

推荐 `npx skills add JimLiu/baoyu-design`（Vercel Labs 的 skills CLI，自动检测 agent，装入 `.claude/skills/` 或 `.agents/skills/`；`-g` 全局）。更新用 `npx skills update claude-slides`。

替代方案：直接把 repo URL 丢给 agent（"Read https://github.com/JimLiu/baoyu-design and follow its skills/claude-slides/SKILL.md…"），agent 自己拉取加载，适合一次性使用。

## 使用

装好后直接说需求（"把这个 PRD 做成 12 页 deck"、"把这个 CSV 变成 dashboard"），或用命令调用。最佳实践：**给设计上下文**——截图、UI kit、设计系统或代码库；从真实上下文出发是质量最大的杠杆。

## Example prompts

- "Make a claude-slides deck for the Q3 review, then export it to PowerPoint."
- "Put a landing page and its phone version side by side on a claude-design canvas."
- "Turn the Chakra UI component library into a design system with live component previews."
- "Turn this analytics CSV into a dashboard that compares the last 28 days with the 28 before."

## Credits

重新打包 Anthropic claude.ai 的 Artifact types 和设计 skills 使其能在本地 agent 上运行；独立社区项目，非 Anthropic 官方。由 Jim Liu 宝玉维护，MIT License。5430 stars。
