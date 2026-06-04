---
title: Google Stitch + Claude Code，DESIGN.md让Vibe Design更有设计感
date: 2026-03-21
source: 微信公众号
url: https://mp.weixin.qq.com/s/i9y73F-ohzwfucbyce39Gw
type: article
tags: [AI产品, 工具, 技术]
---

## 摘要

这篇文章最有价值的发现，不是单独夸 Google Stitch 或 Claude Code，而是指出两者最优的组合方式：让 Stitch 负责设计方向，让 Claude Code 负责工程实现，中间用 `DESIGN.md` 作为桥梁。作者对比了 4 种做法后发现，Claude Code 裸跑或只加 `frontend-design` skill，设计表现都明显不如 Stitch；但把 Stitch 导出的 `DESIGN.md` 交给 Claude Code 后，最终页面质量反而最好。核心原因是 Stitch 强在设计直觉和视觉体系，Claude Code 强在代码结构和落地实现，而 `DESIGN.md` 把设计决策结构化后，刚好让两者各做最擅长的部分。对做 AI 前端、Vibe Design 和设计转代码工作流的人来说，这是一条很实用的工作流结论。

## 全文

原始链接：<https://mp.weixin.qq.com/s/i9y73F-ohzwfucbyce39Gw>

公众号：硅基鹿鸣

作者：Lex 陆徐洲

发布时间：2026-03-21 10:00

文章围绕一个非常具体的问题展开：如果要给一款中文 AI 写作助手做落地页，Google Stitch 和 Claude Code 分别表现如何？两者有没有更好的组合方式？

作者使用同一段中文提示词，给一款名为“墨流 InkFlow”的 AI 写作助手做中文落地页，页面内容包括：

- 导航栏
- 首屏
- 功能卡片
- 用户评价
- 数据展示
- 定价区
- FAQ
- 底部导航

## Stitch 的表现

作者先测试了 Google Stitch。

结论是：

- 同一段提示词连续跑三次，三次风格都明显不同
- 第一版是绿色系白底，灵动大方
- 第二版预览有问题，只显示文字排布，需要手动进入编辑状态才正常
- 第三版直接变成暗黑风

作者认为 Stitch 的设计审美“确实在线”。第一版在配色体系、版面节奏和留白处理上都明显好于常见的安全但无聊的 AI 设计套路，而且生成速度也很快，两分钟左右就能出图。

在迭代测试里，作者要求 Stitch 修改三处布局。虽然画布预览看起来像重新生成了一版，一度以为内容丢失，但实际导出的 HTML 里三处修改都已经生效。作者据此判断，问题主要出在画布预览体验，而不是生成能力本身。

不过 Stitch 也有两个明显短板：

- 同一个提示词每次结果不一样，稳定性不足
- 导出内容只有 HTML/CSS，代码结构比较粗糙，不适合直接拿去开发

## Claude Code 的表现

随后作者测试 Claude Code。

第一轮是不装任何设计插件，直接让 Claude Code 自己跑。结果是：

- Claude 自己调用了 Pencil MCP
- 6 分 20 秒出结果
- 配色偏蓝黑，被“墨流”这个名字带偏
- 对比度较低，设计感不强

第二轮加上安装量 12.4 万的官方 `frontend-design` skill：

- 4 分 37 秒出结果
- 相比裸跑更明亮一些
- 但整体提升有限

作者的判断很直接：

**Claude Code 写代码靠谱，但自己做设计决策差点意思。**

## 转折点：Stitch 导出的 DESIGN.md

文章最关键的部分出现在这里。

作者发现 Stitch 导出的 ZIP 里，除了 HTML 和截图，还包含一个 `DESIGN.md` 文件。这个文件并不是简单的“主色、圆角、字号”参数表，而是一整套设计体系说明。

作者举的例子包括：

- 设计主题被命名为 “The Modern Calligrapher”
- 定位是“中国水墨画美学”
- 禁用 1px 边框，改用背景色层级差做分隔
- 标题和正文分别使用不同字体
- 按钮渐变模拟“湿墨光泽”
- 动画效果要求像“墨在水中晕开”

作者认为，Stitch 花两分钟生成的这套设计说明，比 `frontend-design` skill 给出的设计指导要具体得多。

## 最优组合：Stitch 做设计，Claude Code 写代码

作者接着把 Stitch 导出的 `DESIGN.md` 直接交给 Claude Code，要求它严格按规范生成落地页。

结果是：

- 4 分 38 秒出结果
- 字体、排版、色彩层次都明显提升
- 四组方案里视觉效果最好

这让作者得出一个非常清晰的结论：

- Stitch 强在设计直觉
- Claude Code 强在工程实现
- `DESIGN.md` 是连接两者的桥

也就是说：

Stitch 把设计决策结构化写出来，Claude Code 再拿着这份规范生成代码。设计和代码不再让一个模型“全包”，而是交给各自擅长的系统分工完成。

## 文章给出的推荐工作流

作者最后总结出的操作步骤很简单：

1. 打开 `stitch.withgoogle.com`
2. 输入页面需求
3. 选出一版满意的结果并导出 ZIP
4. 把 ZIP 里的 `DESIGN.md` 交给 Claude Code
5. 让 Claude Code 按这份规范生成页面

作者认为，这套“Stitch 当设计总监，Claude Code 当前端工程师”的组合，是他目前试过的出活质量最高的工作流。
