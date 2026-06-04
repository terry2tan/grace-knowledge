---
title: 才发现，Google Gemini 出了 Mac 版，居然可以读我的屏幕了
date: 2026-04-19
source: 微信公众号 / MacTalk
url: https://mp.weixin.qq.com/s/qEhZ2FKUOqWpsxd--kG10g
type: article
tags: [AI产品, 工具, 技术]
---

## 摘要

这篇文章介绍 Google 新出的 Gemini Mac 原生桌面应用，重点不只是“有个客户端”，而是它已经开始具备读屏、读取本地文件、全局快捷键唤起等系统级能力。
文章最有价值的地方，是把 Gemini.app 放进更大的趋势里看，即大模型公司正从 Web 工具走向原生桌面助手，争夺操作系统层的生产力入口。
其中值得关注的信号包括：100% 原生 Swift、仅支持 Apple Silicon + macOS Sequoia、可按应用粒度授权屏幕共享，这些都说明它不是简单套壳，而是在为更强的桌面 Agent 能力铺路。
对你来说，这篇内容值得收，因为它涉及 Agent 从聊天界面走向系统级上下文入口，也和 Claude Code、OpenClaw、桌面智能体演进路径高度相关。

## 全文

# 才发现，Google Gemini 出了 Mac 版，居然可以读我的屏幕了

Original

池建强

*2026年4月19日 13:36*

周五使用 Gemini 的时候，发现这货终于出了 Mac App，也就是 Gemini.app，这真是 Mac 党的福音啊。

把 App 拖入 Applications，安装完毕，打开就是 Gemini App 的 Mac 桌面版。

看到这个熟悉的界面或许你会脱口而出：这不就是套了个壳吗？还真不是。这次 Google 最新推出的 Gemini 桌面端，原生架构，仅支持 Mac，下载地址是：gemini.google/mac

这次的桌面端是 100% 原生 Swift 应用，而非 Electron 套壳 Web。

Google CEO Sundar Pichai 在 X 上的原话是：“The team built this initial release with Antigravity, and it went from an idea to a native Swift app prototype in a few days.”

工程副总裁 Josh Woodward 明确表示：“100+ features in less than 100 days. 100% native Swift. Lightning fast.”

也就是说，Gemini App 直接使用了 Apple 官方的 Swift 语言、基于 AppKit/SwiftUI 等 macOS 系统 API 构建的纯原生应用。

原生 Swift 让应用可以直接调用 macOS 的系统 API，比如 Option+Space 全局快捷键唤起、按应用粒度的屏幕共享权限，访问本地文件，以及 Apple 在最新系统中引入的 Liquid Glass 界面设计语言。

有趣的是，现在 Anthropic 推出 Claude 设计工具，字节发布 SOLO 独立版，Google 开发 Gemini 桌面版，全部都是用自家 AI 工具实现。SOLO 93% 的代码都是 TRAE SOLO 写的，这次的 Gemini App 从想法到原生 Swift 应用原型，Antigravity 只用了几天时间完成。随后，Antigravity 团队在不到 100 天里上线了 100 多个功能。

其实我们看下 Claude 的发布节奏也就知道，不限量的 Token 和 Coding Agent 帮助这些顶尖大公司提高了多少效率。人是不可能做到一个月几十次发布的。

目前 Antigravity 团队看起来更像是 Google 内部一个特别行动组，估计未来越来越多的公司会使用这种方式：小规模、高效、快速、不限量的 Token 使用。

在使用过程里也能感受产品的原生架构：只支持 Apple Silicon（M1 及以上）+ macOS Sequoia 15 及以上，磁盘占用 170M 左右，远低于典型 Electron 应用 300MB+ 的基线水位。运行速度非常快。

使用体验方面，有了 Mac App 和快捷键，我使用 Gemini 的频率明显增加了。

作者为 Gemini App 设置了快捷键：按两下 option 键呼出迷你对话框，有问题可以直接对话，也可以让 Gemini App 帮忙读文件、感知屏幕，比如把 B 站首页共享给 Gemini，让它帮忙总结和推荐视频。

Gemini App 可以直接读取和处理系统的本地文件，而不需要上传到云端。这个版本还不能通过文件地址访问 Mac 的文件夹，也没有激进到做 Agent 模式，直接像龙虾那样操控你的电脑。

从产品定位看，作者预测 Gemini 会向这个方向发展。Google 把 Gemini 桌面端称作：一个真正个性化、主动且强大的桌面助手。做的就是类似 Spotlight/Siri 的桌面智能助手，甚至取而代之。

作者预计 Google 后续会在这个产品上增加更多依赖系统级能力的新功能。从这个方向上，Web 和原生 App 两者之间的差距只会越拉越大。

另外，Web 版本还有一些功能没有移植到桌面端，比如学习辅导和 NotebookLM，但迁移过来应该只是时间问题。

最后，Gemini Web 端还新增了一个功能，就是导入记忆。作者把 GPT 的记忆导入进去了，并提到 Claude Mem、本地长期记忆共享等思路，认为也许做一个记忆共享工具会更有意思。

AI 的变化日新月异，AI 取代的往往是不拥抱 AI 的人，但即便拥抱了也未必轻松。
