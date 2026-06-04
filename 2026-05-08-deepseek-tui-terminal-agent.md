---
title: 这款 DeepSeek V4 终端编程神器，在 GitHub 上火了。
date: 2026-05-08
source: 微信公众号 / 逛逛GitHub
url: https://mp.weixin.qq.com/s/V7iLzWYEg3ifAnzB37xf6A
type: article
tags: [AI产品, 工具, 技术]
---

## 摘要

这篇文章介绍了开源项目 DeepSeek-TUI：一个用 Rust 写的终端原生 AI 编程 Agent，定位类似“DeepSeek 版 Claude Code”。它主打对接 DeepSeek V4 的 100 万 token 上下文、Thinking-mode 流式推理、文件读写、Shell、Git、网页搜索、MCP 与子 Agent 编排等能力。文章的增量主要在于提示：如果 DeepSeek V4 的长上下文和低价格成立，终端 coding agent 的成本结构可能会被明显改写。整体符合你关注的 AI Agent / CLI / 工具链方向，但文章偏项目推荐，技术细节和实测深度一般。

## 全文

DeepSeek V4 还是挺顶的。

100 万 token 上下文、思维链推理、价格打到骨折，模型本身的实力没得说。

你用网页版聊天，V4 的编程能力根本发挥不出来。

你不能让它直接改文件、跑命令、Git 管理，只能复制粘贴来回复制粘贴，效率很低。

没有类似 Claude Code 的体验。

所以有人用 Rust 从零写了一个终端原生的编程 Agent，专门对接 DeepSeek V4。

你可以理解为 DeepSeek 原生的终端 Coding Agent。

## 01 开源项目简介

DeepSeek-TUI 是一个跑在终端里的 AI 编程 Agent，用 Rust 写的，专门对接 DeepSeek V4 模型。

说白了就是 DeepSeek 版的 Claude Code。

它能直接在你的终端里读写文件、执行 Shell 命令、搜索网页、管理 Git、甚至编排子 Agent 并行干活。

项目地址：<https://github.com/Hmbown/DeepSeek-TUI>

## 100 万 token 上下文 + 思维链实时可见

DeepSeek V4 最大卖点就是 100 万 token 的上下文窗口，DeepSeek-TUI 直接吃满了这个能力。

更关键的是它支持 Thinking-mode 流式输出，模型的推理过程你是能实时看到的。

它在想什么、为什么这么改，一步步摆在面前，不是黑盒给你个结果就完了。

100 万 token 大概相当于 75 万字，换算成代码差不多能把一个中型项目的全部源码一次性塞进去。

你不需要手动挑选哪些文件喂给 AI，整个项目结构、模块间的调用关系、配置文件、依赖声明，它一次性全看到。

改一个函数的时候它知道这个改动会波及到哪些地方，而不是只盯着你贴进来的那几行代码瞎猜。

另外一个很实际的场景是长对话不会失忆。

用 128K 上下文的工具，聊个十几轮就开始遗忘前面的约定和决策，越到后面输出质量越差。

100 万 token 意味着你可以在一个会话里从需求讨论、架构设计一路干到写测试、修 bug，中间不用重新建立上下文，模型的判断力从第一轮到第五十轮基本是一致的。

而且上下文快满的时候会自动压缩，不会聊着聊着就失忆。

## 三种模式，干活风格随便切

DeepSeek-TUI 有三种工作模式：

- **Plan 模式**：只读，AI 先探索代码库、规划方案，不动任何文件。适合还不确定怎么改时先摸底。
- **Agent 模式**：交互式，AI 会执行操作，但每一步需要用户审批。适合日常开发，兼顾效率和安全。
- **YOLO 模式**：全自动，所有操作直接执行不需要确认。适合信任当前环境、想快速出活的时候使用。

三种模式可以随时切换，键盘一按就能换。

## 完整的工具链 + MCP 协议

这个项目的工具链做得相当完整：文件读写、Shell 执行、Git 操作、网页搜索、补丁应用、子 Agent 编排，该有的都有。

而且原生支持 MCP 协议，可以接各种外部工具服务扩展能力。

它还有一个 HTTP/SSE API 服务模式，运行：

```bash
deepseek serve --http
```

就能把它当无头 Agent 用，嵌入到自己的工作流里。

费用也会实时追踪，每轮对话花了多少 token、多少钱，界面上一目了然。

文章提到，V4 Flash 的价格是输入 0.14 美元 / 百万 token，输出 0.28 美元 / 百万 token。对比 Claude Sonnet 输入 3 美元 / 百万 token、输出 15 美元 / 百万 token，输入便宜二十多倍，输出便宜五十多倍。

## 03 如何使用

安装很简单，一行命令：

```bash
npm i -g deepseek-tui
```

Rust 用户也可以用 Cargo 安装：

```bash
cargo install deepseek-tui-cli --locked
```

国内用户如果 npm 和 GitHub 下载慢，可以配置清华 TUNA 镜像，README 里有详细步骤。

装好之后第一次启动会让你输入 DeepSeek API Key，去 platform.deepseek.com 申请一个即可。

然后直接在终端输入：

```bash
deepseek
```

就能使用。

快捷键：

- Tab：切换模式
- Shift + Tab：调整推理深度
- F1：查看帮助

## Grace 备注

这篇更像开源项目安利文，重点不是深度评测，而是给出一个值得跟踪的信号：DeepSeek V4 的长上下文 + 低成本，如果配上终端 Agent harness，可能会形成 Claude Code 的低价替代路线。后续更值得看的不是“是不是 DeepSeek 版 Claude Code”这个口号，而是它的工具调用稳定性、权限治理、上下文压缩质量、MCP 兼容性和复杂仓库改代码成功率。
