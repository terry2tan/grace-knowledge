---
title: 歸藏设计 · dsh-guizang-design（DeepSeek Harness 插件）
date: 2026-10-31
source: github.com
url: https://github.com/op7418/dsh-guizang-design
type: repo
tags: [AI产品, 工具]
---

## 摘要

歸藏（@op7418）为 DeepSeek Harness（dsh）做的设计插件，把内容生产 skill 打包成一套系统：网页 PPT、图文卡片、网页排版、去 AI 味四个 skill + 一个「学你写作语气」的语气档案。核心设计亮点是三个输出 skill 共用同一套设计 token（6 套杂志风 + 4 套瑞士风主题，OKLCH 色彩科学 + WCAG/APCA 对比度约束，可从品牌色生成受约束主题），外加跨 skill 的内容生产工作流（一篇文章三种出口、演讲回收、封面矩阵等）。语气档案从用户在 DeepSeek 里亲手发的消息和文章中学习写作习惯，每条特征要求至少两处样本证据，数据全部本地存储。四个 skill 各有独立仓库，可在 Claude Code / Codex 等 agent 里单独使用。

## 全文

# 歸藏设计 · dsh-guizang-design

[DeepSeek Harness](https://www.npmjs.com/package/@deepseek-ai/dsh)（dsh）插件。把歸藏的内容生产 skill 装进 dsh：网页 PPT、图文卡片、网页排版、去 AI 味，外加一个学你写作语气的语气档案。前三个共用同一套设计系统，同一篇内容做成 PPT、卡片和网页，主题、字体和版式是一家人。

## 五个 skill

| skill | 命令 | 做什么 | 产出 |
|---|---|---|---|
| 网页 PPT | `/guizang-ppt-skill` | 横向翻页的演示稿，杂志风或瑞士风；WebGL 背景、演讲者视图、讲稿备注、数据大字报 | 单个 HTML 文件 |
| 图文卡片 | `/guizang-social-card-skill` | 小红书 3:4 组图、公众号 21:9 头图和 1:1 分享卡，一条命令出图并核对尺寸 | PNG |
| 网页排版 | `/guizang-page-skill` | 把文章、笔记排成精排单页网页，忠实模式或解释模式；可导出 PDF 和长图 | HTML / PDF / 长图 |
| 去 AI 味 | `/humanizer-zh` | 删掉中文里的空话、重复和模板化表达，保留事实、确定程度和作者自己的语气 | 改好的文字 |
| 语气档案 | `/guizang-voice` | 从你在 DeepSeek 里发过的消息和你写过的文章学出你的写作习惯，存成本机的一份档案 | 一份 Markdown 档案 |

在输入框里打 `/` 就能看到它们。不用记命令也行：直接说「帮我把这篇文章排成网页」，模型会自己选 skill。

## 一套设计系统

PPT、卡片、网页三个 skill 用同一套 token：

- **杂志风** 6 套主题：墨水经典、靛蓝瓷、森林墨、牛皮纸、沙丘、午夜墨（深色，用于卡片和网页）。
- **瑞士风** 4 套主题：克莱因蓝、柠檬黄、柠檬绿、安全橙。
- **品牌色**：给一个品牌色或 logo 主色，按色彩科学（OKLCH）收进风格允许的明度和彩度范围，生成受约束的品牌主题；文字、线条和强调色按对比度规则（WCAG + APCA）算好。
- **字体**：中英文字体按固定版本加载；卡片出图和网页 `--embed` 时按实际用字子集化内置，离线也能正确显示。

## 插件页面

- **概览**：作品、专栏、工作流、语气档案数量；skill 入口；最近作品；官方示例。
- **我的作品**：带缩略图，按 skill 筛选/搜索，连载按专栏归组，可「做新一期」「做同款」（开新对话并按该作品的主题版式填好草稿）。
- **内容生产工作流**：跨 skill 组合。
- **语气档案**：可「从我的 DeepSeek 对话学习」「用我写过的文章补充」。

## 内容生产工作流

| 工作流 | 步骤 | 用途 |
|---|---|---|
| 一篇文章，三种出口 | 网页 → 卡片 | 同一篇文章排成网页 + 小红书组图 + 公众号封面，同一套主题 |
| 先去 AI 味，再排版 | 去 AI 味 → 网页 | 先把文字改自然再排版 |
| 演讲回收 | 网页 → 去 AI 味 | 讲完的 PPT 按每页内容和讲稿备注整理成文章 |
| 品牌套件 | PPT → 卡片 | 品牌色生成受约束主题，统一使用 |
| 封面矩阵 | 卡片 | 一次做齐公众号头图、分享卡和小红书首图 |
| 中英双版本 | 网页 | 中文和英文两版网页，英文按英文读者习惯重写 |

## 语气档案

记录写作习惯：常用词/不用词、句子长短、开头结尾方式、标点称呼。学习来源：

1. DeepSeek 里用户亲手发的消息（不含 skill 注入和系统消息，30 字以上，长段优先）。
2. 用户写过的文章。

每条特征要求样本里至少两处证据，建完给用户过目可改。后续对话中纠正措辞会被记住。用途：去 AI 味时保留用户本来的说法；替用户写文案/讲稿/标题时按用户语气写。

## 安装

需要 dsh `0.2.1-rc.2` ~ `0.3.0` 以下。插件页面安装（推荐，桌面版和网页版都适用）：包名 `dsh-guizang-design`。命令行（仅网页版自跑 `dsh web`）：`dsh plugin --profile web add dsh-guizang-design`。

按需准备：卡片出图用 Playwright Chromium（`npx playwright install chromium`）；网页导出 PDF/长图用本机 Chrome。

## 数据和隐私

所有数据在本机 `$DSH_HOME/guizang-design/`（默认 `~/.dsh/guizang-design/`）：`library.json` 作品库、`thumbs/` 缩略图、`voice.md` 语气档案、`voice-corpus.md` 学习素材。不外发。

## 和独立 skill 仓库的关系

四个 skill 各有独立仓库，在 Claude Code、Codex 等 agent 里可单独用：

- guizang-ppt-skill
- guizang-social-card-skill
- guizang-pages-skill
- Humanizer-zh

插件里的 `skills/` 是固定提交快照（版本记在 `skills/manifest.json`）。用户自装的同名 skill 优先。

## 开发

目录结构：`lib/`（插件本体）、`gallery/`（插件页面）、`skills/`（快照）、`own-skills/`（语气档案）、`examples/`、`scripts/`（library.mjs / voice.mjs）。License: AGPL-3.0（humanizer-zh 为 MIT）。目前 8 stars。
