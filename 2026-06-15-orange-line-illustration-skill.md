---
title: 橙线插画 · Orange Line Illustration
date: 2026-06-15
source: GitHub
url: https://github.com/orange2ai/orange-line-illustration
type: repo
tags: [AI产品, 工具, 方法论]
---

## 摘要

开源 AI Agent 插画 Skill，走纽约客式极简线条风格——细黑墨线 + 纯白背景 + 唯一暖橙点缀色 `#F97316`。支持两种工作流：单张概念配图（文章金句→场景→插图）和 PPT 演讲稿（大纲→批量插图→HTML 幻灯片）。内置三个可复用角色 IP（小橙、线人、线猫），规范完整到 prompt 模板和隐喻方法论。兼容 Cola / Claude Code / Codex 等支持 SKILL.md 约定的 Agent。双许可：开源免费，闭源需商业授权。

## 全文

# 橙线插画 · Orange Line Illustration

上周写了一篇文章，与 AI 一起做产品的六条原则，很多朋友都喜欢这套插图，问我怎么做，就把它做成 skill，开源发布。

在 AI 信息图和 HTML 文字块泛滥的今天，也许一张有空白的插画反而能让注意力聚焦在一点。据说 PPT 做到极致，每页就只有一句话。

支持两种工作流：
- **单张插图** — 为文章、原则、封面生成概念配图
- **PPT 演讲稿** — 将文章/大纲变成带插图的 HTML 幻灯片

## Demo：《置身钉内》20 个切片

用这套 skill 为 7.5 万字的阿里内网长文《置身钉内》生成了 20 张插图，每张配一句原文金句。

## 风格规范

- **线条**：细黑墨线，手绘微抖，不机械
- **背景**：纯白，不要纸纹、渐变、阴影
- **点缀色**：唯一暖橙 `#F97316`，落在最有意义的那个元素上
- **人物**：极小。物永远宏大，人永远渺小
- **金句标注**：右下角灰色小字，安静、可读、不喧宾夺主
- **气质**：witty, restrained, intelligent

## 角色 IP 系统

### 小橙（默认角色）
纯黑线条勾勒的几何小人，胸口一个橙色圆点。安静做事，不声张。

### 线人
极简抽象人形——圆形头部 + 一根弧线身体 + 单线四肢。最少的笔画构成"有人在这里"。

### 线猫
10-12 笔画完的幼猫符号——不闭合的弧线、两个黑点眼、两撇耳朵。观者的大脑自动补全。

## 两种工作流

### 工作流 A：单张概念插图
为文章中的某个判断、原则、隐喻生成一张 16:9 配图。

### 工作流 B：PPT 演讲稿
将文章/大纲变成带插图的 HTML 幻灯片，每页一张场景插画。

## 目录结构

```
.
├── SKILL.md                          # 主规范：风格、隐喻方法、prompt 模板
├── references/
│   ├── xiao-orange-ip.md             # 小橙 IP 定义
│   ├── xiao-orange-prompt-template.md # 小橙生图模板
│   ├── xianren-ip.md                 # 线人 IP 定义
│   ├── xianmao-ip.md                 # 线猫 IP 定义
│   └── ppt-workflow.md               # PPT 演讲稿工作流
├── examples/                         # 示例图片
├── LICENSE.md
└── README.md
```

## 安装

适用于任何支持 SKILL.md 约定的 AI agent（Cola、Claude Code、Codex 等）。把目录放进你的 agent 的 skill 文件夹即可：

```bash
# Cola
~/.cola/skills/orange-line-illustration/

# Claude Code
~/.claude/skills/orange-line-illustration/
```

然后直接对你的 agent 说——"给这篇文章配三张橙线风格插图"或"把这篇文章做成橙线 PPT"。

## 协议

**双许可**：开源与个人使用免费；闭源/专有用途需购买商业授权。详见 LICENSE.md。
