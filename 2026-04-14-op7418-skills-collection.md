---
title: 整理一下藏师傅开源的所有 Skills
date: 2026-04-14
source: 微信公众号
url: https://mp.weixin.qq.com/s/LVARdeztA4n3aeorrTRYTw
type: article
tags: [AI产品, 工具, 技术]
---

## 摘要

这篇内容本质上是一份 op7418（藏师傅）开源 Skills 清单，集中展示了几类很典型的 AI 工作流工具，包括 IM 远程控制、视频包装、YouTube 剪辑、文档配图、中文去 AI 味和 PPT 多媒体生成。它的价值不在深度分析，而在于帮你快速扫描一个创作者正在构建的 skill 版图，适合拿来做工具雷达和能力地图。对你来说，最值得关注的是 Claude-to-IM-skill 这类把 Claude Code / Codex 接入聊天软件的远程控制方向，以及 Youtube-clipper-skill、Document-illustrator-skill 这类“内容生产流水线”型技能。整体信息密度中等，更偏资源索引而不是方法论拆解，但作为素材归档是有价值的。

## 全文

# 整理一下藏师傅开源的所有 Skills

Claude-to-IM-skill：
1800🌟
安装后可以将你的 Claude Code 和 Codex 连接到任何聊天软件，实现远程控制
<https://github.com/op7418/Claude-to-IM-skill>

Video-Wrapper-Skills：
200🌟
自动为你的视频添加类似“小Lin说”那样的解释特效，支持高亮卡片、关键词卡片、作者介绍、社交媒体卡片等多种组件
<https://github.com/op7418/Video-Wrapper-Skills>

Youtube-clipper-skill：
1700🌟
帮你从 YouTube 下载长视频，并在分析视频后给出“长剪短”的方案，同时会自动添加中英双语字幕。
<https://github.com/op7418/Youtube-clipper-skill>

Document-illustrator-skill：
300🌟
自动分析文档并生成配图，支持 16:9 和 4:3 比例。它会按照你的分段生成多张配图，并支持多种风格选择。我常用的封面图就是用这个生成的。
<https://github.com/op7418/Document-illustrator-skill>

Humanizer-zh：
5600🌟
去除 AI 生成文档中常见的“AI 味”表述，采用两段式处理，帮你提升 AI 生成内容的观感。
<https://github.com/op7418/Humanizer-zh>

NanoBanana-PPT-Skills：
2100🌟
基于 AI 自动生成高质量 PPT 图片和视频的强大工具，支持智能转场和交互式播放，带有非常顺滑的转场动效。
<https://github.com/op7418/NanoBanana-PPT-Skills>
