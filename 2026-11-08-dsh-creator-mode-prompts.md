---
title: DeepSeek 创造模式官方教程：7 套插件提示词 + 提示词技巧提炼
date: 2026-11-08
source: 微信公众号「量子位」
url: https://mp.weixin.qq.com/s/JLjRCh5zMq-B2zqjIW7PDQ
type: article
tags: [AI, 工具, 技术]
---

## 摘要

DeepSeek Harness 官方发布「创造模式（Creator Mode）」玩法指南：一句自然语言让 AI 自己写代码、造插件并装进自己的工作界面，并公开 7 套官方示例 Prompt（3D 建模展厅、Transformer 交互 3D 游戏、视频剪辑工作台、海报设计工作台、论文阅读器、全局像素化换肤、Token 计费板）。本文重点收录 7 条提示词原文，并提炼其共同写作技巧：**定位入口 → 定义功能与交互 → 给样式参考 → 设默认值 → 加边界约束**。官方提示：部分演示插件经多轮修改，单条 Prompt 未必完全复现。官方 Prompt 合集：https://cdn.deepseek.com/harness/dsh-creator-mode-prompt-collection-en.html

## 官方 7 套提示词原文

### 1. 3D 建筑展厅

```
Create a DeepSeek Harness plugin with a left sidebar entry that renders 3D models of the Eiffel Tower in Paris, the Great Wall of China, the Forbidden City, and one more famous building of your choice.
```

### 2. Transformer 计算交互 3D 游戏

```
Create a DeepSeek Harness plugin with a left sidebar entry: an interactive 3D demonstration game that helps me understand the computation inside a Transformer. Keep the panel title and toolbar clear of the native macOS window buttons so they do not overlap.
```

### 3. 视频剪辑工作台

```
Create a video editing workbench accessible from the conversation, using the dark interface and familiar interactions of established video editors. Support uploading multiple videos, editing, and exporting. Place a large preview at the top and a timeline below for importing and editing clips. Also let me import and edit videos through natural-language requests in the conversation.
```

### 4. 海报设计工作台

```
Create a poster design workbench plugin accessible from the conversation. Use the shader background pattern and English font from the DeepSeek Harness website. Let me customize the poster title, text, and shader colors. Keep the default page minimal, with no unnecessary subheadings or information. Set the default poster title to "Everything is a plugin".
```

### 5. 论文阅读器（PDF）

```
Create a paper reader accessible from the right sidebar. Let users upload papers and preserve the original layout, fonts, images, and all other content without any loss. When text is selected, show a floating menu with options to highlight it, add a note, or ask about it in the conversation. Match the default question prompt to the interface language.
```

### 6. 全局像素化换肤

```
Create a DeepSeek Harness plugin with a left sidebar entry that lets me change the look of the entire app. Offer five different styles to choose from, with a pixelated look as one option.
```

### 7. Token 计费板

```
Create a statistics plugin based on my actual conversation data. Show total token usage, conversation count, and estimated costs and budget based on token usage. Include a token-usage timeline, usage and costs for individual conversations, and CPU activity and utilization.
```

## 提示词技巧提炼（跨 7 条共同模式）

1. **动词 + 目标形态开场**：一律 `Create a [DeepSeek Harness] plugin / workbench / reader…`，先声明产物类型（插件/工作台/阅读器），让 Agent 明确要写的是哪种东西。
2. **入口定位必须指定**：`with a left sidebar entry` / `accessible from the right sidebar` / `accessible from the conversation`——UI 从哪里打开写死，不留给模型猜。
3. **布局约束具体到方位**：`Place a large preview at the top and a timeline below`——用方位词（top/below/left/right）直接描述布局，替代抽象描述。
4. **样式用「参考物」而不是形容词**：`using the dark interface and familiar interactions of established video editors` / `Use the shader background pattern and English font from the DeepSeek Harness website`——给现成参照系，避免「好看的深色 UI」这类不可执行的形容。
5. **交互行为逐项枚举**：`When text is selected, show a floating menu with options to highlight it, add a note, or ask about it`——触发条件（选中文本）+ 响应（浮动菜单）+ 选项列表，一次写全。
6. **保真度要求显式声明**：`preserve the original layout, fonts, images, and all other content without any loss`——对内容型插件（论文阅读器）明确零损耗标准。
7. **默认值直接写进 Prompt**：`Set the default poster title to "Everything is a plugin"`、`Match the default question prompt to the interface language`——首屏默认内容本地化/具体化，避免空壳页面。
8. **边界与防冲突约束**：`Keep the panel title and toolbar clear of the native macOS window buttons so they do not overlap`、`Keep the default page minimal, with no unnecessary subheadings`——预留系统 UI 冲突、信息密度的负向约束。
9. **多模态双通道**：视频工作台同时开放 GUI 操作和对话指令（`Also let me import and edit videos through natural-language requests in the conversation`）——界面操作 + 自然语言是并列能力，不是二选一。
10. **数据驱动型插件锚定真实数据源**：计费板 `based on my actual conversation data` + 明确列出要展示的每个指标——需要读数的插件，数据源和指标清单就是需求本身。
11. **留一处自主发挥**：3D 展厅 `and one more famous building of your choice`——在高度确定的规格里留一个小口子给模型创造，产物更有惊喜感。
12. **单条 Prompt ≠ 一次到位**：官方自己声明演示插件经多轮对话修改完善——把 Prompt 当首轮规格、把后续修改当迭代，而不是指望一击必中。

## 使用方式（三步）

1. 打开 DeepSeek Harness，新建会话选择「创造模式」（Creator Mode）
2. 粘贴 Prompt 发送，Agent 读取开发文档、编写插件并尝试运行
3. 检查生成结果和安装权限，按需继续提修改要求

> 公众号：量子位（QbitAI），作者：梦瑶；官方 X 帖：x.com/DeepSeekHarness/status/2117256196227019194
