---
title: 7 个开源 PPT Skill 项目测试与推荐
date: 2026-05-18
source: x.com / @yaohui12138
type: tweet
url: https://x.com/yaohui12138/status/2055849330498736619
tags: [AI产品, 工具, 方法论]
---

## 摘要

这条推文系统梳理了 7 个开源 PPT / HTML Slide Skill 项目，核心判断是：AI 生成 PPT 丑，往往不是模型能力不够，而是缺少可执行的审美约束系统。这些项目的共同价值，是把「什么样的 PPT 人类愿意看」编译成 AI 能理解和复用的规则，分别覆盖看图选风格、多格式交付、杂志风 HTML PPT、Agent 评论迭代、模板库、团队视觉规范和本地优先设计工作流。对用户有价值的是，它非常贴合「Skills + Claude Code + 内容生产工作流」方向，可作为构建演示文稿自动化、审美约束系统和 Agent UI 输出规范的参考清单。

## 全文

@yaohui12138（超级个体｜柿子）  
2026-05-17 11:14:10

最近 guizang 、zarazhangrui  花叔等大佬纷纷开源 PPT Skill，我花了一天测试完了7个ppt skill项目，直接把结论分享给大家：

AI 生成 PPT 丑的核心原因，不是 AI 能力不行，是你没给它正确的审美约束系统

这7个开源 Skill 解决的就是这个问题——它们把“什么样的 PPT 人类才愿意看”编译成了 AI 能理解的规则

下面按使用场景分类推荐，直接对号入座：

### 1. frontend-slides：看图选风格的 Vibe Coding 典范

GitHub: `zarazhangrui/frontend-slides`（17k+ 星）

这是我测下来最符合“Vibe Coding”理念的一个。

核心亮点：不问你要什么风格，直接生成 3 个不同方向的预览图让你挑。

挑完之后再生成完整 deck，全程零 CSS/JS 知识门槛。

支持 12 种精选风格模板，PPT 转网页，一键 Vercel 部署或导出 PDF。

作者 zarazhangrui 在 X 上说得很直白：“代码生成的 slides 可以比大部分 PPT 工具做得更好，但前提是你得先让 Claude 理解什么叫‘好看’”。

这个 Skill 的精髓在于 Show, Don't Tell——不让用户描述审美，而是让用户指认审美。

适合场景：需要快速出一套有设计感的演示文稿，尤其是对外 pitch 或线上分享。

### 2. huashu-design：一句话生成 HTML deck + 可编辑 PPTX

GitHub: `alchaincyf/huashu-design`（13k+ 星）

花叔这个项目野心更大，不只是做 PPT，而是做“HTML-native 设计系统”。

一句 Prompt 能同时输出：

- 专业 HTML deck（浏览器直接打开）
- 可编辑 PPTX（给不懂代码的同事改）
- MP4 导出（直接当视频用）
- 交互原型（可点击的 App demo）

内置 20 种设计哲学（Bauhaus、Swiss、Brutalism……）、5 维设计评审系统。

在 X 中文圈常和 guizang 项目并列推荐，两者审美路线不同：huashu 偏“设计工具消失感”，guizang 偏“杂志编辑部美学”。

适合场景：需要多格式交付，或者团队里既有技术也有非技术人员协作。

### 3. guizang-ppt-skill：专治 AI 生成 PPT 审美灾难

GitHub: `op7418/guizang-ppt-skill`（7k+ 星）

歸藏在 X 上分享自己的 PPT 模板后，直接把整套审美系统开源成了 Skill。

这个项目的定位很明确：横向翻页杂志风 HTML PPT。

- 10 种布局骨架
- 5 套主题配色（不允许自定义 hex 值，强制保护美学）
- WebGL 流体背景
- Motion One 驱动的入场动效
- 单文件输出（离线可用）

歸藏在 README 里写：“颜色搭配错了画面瞬间变丑，保护美学比给自由更重要”。

这句话戳中了 AI 生成内容的核心痛点——自由度和质量往往是反比关系。

适合场景：15-30 分钟的线下分享、私享会，需要凸显个人风格的场合。

### 4. open-slide：Agent 最后一公里生产力工具

GitHub: `1weiho/open-slide`（3k+ 星）

这个项目思路最特别：不是“生成 PPT”，而是“为 Agent 设计的 Slide 框架”。

每张幻灯片是一个 React 组件，固定 1920×1080 画布。

核心 workflow：

1. 一句话 prompt 生成整套 deck
2. 在浏览器里点击任意元素留 comment
3. 运行 `/apply-comments`，Agent 自动应用修改

支持演讲者笔记、定时器、导出 HTML/PDF。

适合场景：需要高频迭代、多轮修改的场景，或者本身就在用 Claude Code/Cursor 的开发者。

### 5. html-ppt-skill：模板党的军火库

GitHub: `lewislulu/html-ppt-skill`（3k+ 星）

这个项目走的是“模板丰富度”路线：

- 36 套主题
- 15 个完整 deck 模板
- 47 种动画预设
- 演讲者模式（讲稿 + 计时器）

适合不想从零开始设计，直接套模板改内容的场景。

如果你的需求是“快速出一版能看的”，这个库的模板密度是最高的。

### 6. beautiful-html-templates：Agent 自动挑选填充

GitHub: `zarazhangrui/beautiful-html-templates`（1k+ 星）

同样是 zarazhangrui 的项目，这个更像是 frontend-slides 的模板仓库。

32 套 HTML Slide 模板，专为 coding agent 准备。

Agent 可以根据内容类型自动挑选合适的模板填充。

适合场景：批量生成多套风格一致的 deck，或者需要建立团队统一视觉规范。

### 7. open-design：Claude Design 的开源替代

GitHub: `nexu-io/open-design`

Tom Huang 团队开源的设计系统，支持：

- 幻灯片、图片、视频、HyperFrames 导出
- 71 套品牌设计系统
- 配套工具 html-anything（多格式转高审美 HTML，包括 Keynote 风 PPT）

这个项目的野心是做“本地优先的 Claude Design 替代方案”。

如果你需要的不只是 PPT，而是整套设计工作流，这个是最完整的。

## 作者结论

这些 Skill 的共同点是：它们都在用代码重新定义“什么是好看的 PPT”。

以前做 PPT 是在 PowerPoint 里拖拽，现在是在跟 AI 描述你要什么。

但 AI 不懂审美，所以这些开源作者做的事，本质上是把审美编译成了 AI 能理解的规则。

这才是这些项目真正的价值。

如果你也在用 Claude Code 做内容生产，这 7 个库值得全部 clone 下来试一遍。

因为你会发现：AI 生成内容的天花板，往往不在 AI 本身，而在你给它的“审美约束系统”有多严谨。

所有项目都是开源免费，直接 GitHub 搜索项目名就能找到。

装好之后在工具里输入对应的 skill 名称就能调用。

原推链接：https://x.com/yaohui12138/status/2055849330498736619
