---
title: dimensional-drawing：教 Agent 画 Apple 风格的 UI 组件技术图纸
date: 2026-10-31
source: github.com
url: https://github.com/enesozturk/dimensional-drawing
type: repo
tags: [AI产品, 工具]
---

## 摘要

enesozturk 的 dimensional-drawing（1.6k stars，MIT）：给它一个 UI 组件（Card、Dialog），产出一页 Apple 配件图纸风格的技术图纸——padding、间距、圆角、图层、视口位置全部测量标注，像 Apple 给配件厂商发的规格图一样。两个 skill：`dimensional-drawing`（绘图）和 `dimensional-drawing-motion`（把图纸动画成 ~10 秒的「钢笔手绘 + 镜头运动」短片，支持 Claude Motion artifact 或 headless Playwright+ffmpeg）。设计纪律很值得借鉴：单色灰阶（靠线宽/虚线/剖面线区分）、只画架构不画内容（`TITLE SLOT · FLEX`、`ACTION · HUG`）、用变量不用数字（`H1 = 2·S1 + H3`）、去品牌化命名（`UI-CARD-001`）、未知值一律 `[TBD]` 绝不编造。装法：Claude Code 直接 cp 到 skills 目录，或 `npx skills add enesozturk/dimensional-drawing`，支持 Codex/Cursor/Gemini CLI 等任意 agent。

## 全文

# dimensional-drawing ✏️📐

**Give it a UI component, get back a one-page technical drawing of it.**
Paddings, gaps, corner radii, layers and viewport placement, measured and labeled like Apple's dimensional drawings.

Apple 为每台设备发布 [dimensional drawings](https://developer.apple.com/accessories/dimensional-drawings/)，让配件厂商能做出合身的壳。它们冷静、密集、漂亮：一张纸、几个视图、细小的详图圈、到处是数字。

这个 repo 教你的 agent 用同样的方式画**你的组件**。一张 Card 或 Dialog 变成一张规格图纸，可以交给任何人重搭它的*架构*：padding、间距、圆角、图层、在视口里的位置。文案和内容刻意省略，文字变了图纸依然成立。

## 内容

```
skills/
├── dimensional-drawing/          绘图 skill（SKILL.md + card/dialog 示例，单 HTML 文件）
└── dimensional-drawing-motion/   把图纸变成 ~10s 影片
    ├── templates/                参考场景 + 样式表
    └── adapters/
        ├── claude-motion.md      Claude 的 Motion artifact（主要目标）
        └── headless/             Playwright + ffmpeg，无需 Claude
```

## House rules（设计纪律）

| | |
|---|---|
| ⚫️ **单色** | 只有灰阶；靠线宽、虚线和剖面线区分事物 |
| 🧱 **架构，不是内容** | `TITLE SLOT · FLEX`、`ACTION · HUG`、`CONTENT SLOT · FILL` |
| 🔤 **变量，不是数字** | `S1`、`R2`、`H1 = 2·S1 + H3`、`R2 = R1 − B − S6` |
| 🏷️ **去品牌化** | 中性命名如 `UI-CARD-001` |
| 🙅 **绝不编造数值** | 未知的保持 `[TBD]` |

## 安装

**Claude Code**：

```bash
git clone https://github.com/enesozturk/dimensional-drawing
cp -r dimensional-drawing/skills/* ~/.claude/skills/
```

**claude.ai / Claude Desktop**：把 skill 文件夹打成 zip，在 Settings → Capabilities → Skills 里添加。

**其他 agent**（Codex、Cursor、Gemini CLI…）：`npx skills add enesozturk/dimensional-drawing`，或让 agent 直接指向 `SKILL.md`。

## 使用

提需求并指定来源（repo 文件、Storybook story、URL、截图）：

> Make a dimensional drawing of the `Card` component in `src/components/Card.tsx`

产出：顶部是关键变量的标题栏，然后一张密集图纸——注释、平面图、爆炸图层、详图（嵌套圆角、半径、主体）、变量表。也适用于实体物品（第三角投影、毫米、只用已发布规格）。

## 动画

motion skill 把成品图纸动画成钢笔绘制 + 镜头在纸上运动的效果：

1. 特写 header，线条画入
2. 拉回平面图，其余部分继续绘制
3. 图层从平面图升起进入爆炸视图（先描边后填充，避免闪烁）
4. 拉回全图，剩余视图画入

场景是时间的纯函数，可在两处运行：Claude Motion artifact（主要调优目标，导出 MP4）；或 headless：`node render.mjs --scene ../../templates/scene-dialog.js --css ../../templates/base.css --out dialog.mp4`（Node 18+ 和 ffmpeg；Remotion/GSAP/Lottie 等未测试）。

## 致谢

- Apple 的配件图纸是北极星
- Andreas Storm (@avstorm) 的帖子启发了这个项目

MIT © Enes Ozturk. Draw all the things.
