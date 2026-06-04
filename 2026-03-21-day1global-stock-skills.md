---
title: Day1Global：把美股分析做成一组可安装的投资 Skills
date: 2026-03-21
source: x.com
url: https://x.com/starzq/status/2034967206828941492
type: tweet
tags: [投资, AI产品, 工具]
---

## 摘要

这组引用推文记录了一条很典型的 skill 产品化路径：先由 Ruby 做出一个“读美股最新财报并生成研报”的 Claude skill，再由 Star 发布到 GitHub，最后迭代成一套可一次性安装的 5 个投资分析 skills。最值得注意的不是某个单独 prompt，而是它把原本分散的投研动作拆成了财报分析、估值、宏观流动性、市场情绪和 BTC 底部判断几个模块，开始向可复用的投资工作流工具包演化。对做 AI 投研、个人投资 Agent 或金融 skill 市场的人来说，这条内容的意义在于：投资分析不只是问模型要答案，而是把分析框架逐步封装成可安装、可迭代、可组合的技能系统。

## 全文

原始链接：<https://x.com/starzq/status/2034967206828941492>

作者：@starzq（Star@Day1Global Podcast）

发布时间：2026-03-20 20:16:04

正文：

感谢 @Jimmy_JingLv 的建议，更新了一版美股深度分析 skill。

让你的 Agent 运行：

`npx skills add https://github.com/star23/Day1Global-Skills --all`

就可以一次性安装 5 个 skills：

- 美股财报分析
- 美股估值
- 宏观流动性
- 市场情绪
- btc 底部

作者还提到，接下来 @rubywang 还会继续迭代一版。

## 前一条推文：从单个 skill 到 GitHub 仓库

被引用推文链接：<https://x.com/starzq/status/2027610223310209325>

发布时间：2026-02-28 13:02:03

这条推文说明，Day1Global 已经把“美股财报深度分析 Skill”上传到了 GitHub 仓库：

<https://github.com/star23/Day1Global-Skills>

当时的描述是：

- 可以下载其中的 `tech-earnings-deepdive.skill`
- 直接扔给 Claude 或 OpenClaw 使用
- 仓库里还附送了另外 3 个 skills，可以一起使用

这说明项目最初还是以单点 skill 为主，但已经开始走向仓库化和打包分发。

## 最早的起点：Ruby 的财报研报 skill

最早被引用推文链接：<https://x.com/Rubywang/status/2027333603194220849>

发布时间：2026-02-27 18:42:51

Ruby 当时的原话大意是：

- 花了几天时间在 Claude 里调一个“读取美股最新财报并更新研报”的 skill
- 还加入了自己的投资 Mentor 模式
- 以 Circle 为例，skill 给出了 45-65 美元的买入价格建议
- 整体输出质量“还不错”，但仍然不确定它的雷点在哪里

这条最早的推文很有代表性，因为它展示了很多 skill 项目一开始的真实状态：

- 已经能输出有价值结论
- 也有个人风格和主观框架
- 但还缺少系统评估、稳定性验证和边界测试

## 这组内容最值得记住的地方

把三条推文连起来看，最重要的不是“又多了几个投资 prompt”，而是一个典型的产品化过程：

1. 先做出一个能用的分析 skill
2. 再把它公开到 GitHub，方便安装和传播
3. 然后从单个 skill 扩展成一套可组合的投资分析模块

这背后其实是在把投资研究从一次性问答，推进成更像工作流系统的东西。尤其是把财报、估值、流动性、情绪和 BTC 底部拆开之后，每个模块都更容易单独评估、单独优化，也更适合以后接入不同 Agent 或继续演化成完整的投研操作系统。
