---
title: 用 Karpathy 的 autoresearch 方法，把 Claude Skills 提升 10 倍
date: 2026-03-21
source: x.com
url: https://x.com/MinLiBuilds/status/2034533228162187444
type: article
tags: [AI产品, 工具, 技术]
---

## 摘要

这篇 X Article 的核心观点是：Skill 的真正问题往往不是“能不能跑”，而是“你根本不知道它什么时候在悄悄失效”。作者把 Karpathy 的 `autoresearch` 方法迁移到 Claude Skills 上，形成一个自动循环：先定义可量化 checklist，再让 agent 持续测试、微调 prompt、重新评估，只保留真正提升分数的改动。文中给出的实际例子是落地页文案 skill，从 56% 质量通过率提升到 92%，全程几乎不需要人工盯着调 prompt。最重要的启发不是某个技巧，而是把 skill 优化从“凭感觉改 prompt”升级成“可评估、可记录、可复盘的系统工程”。

## 全文

原始推文：<https://x.com/MinLiBuilds/status/2034533228162187444>

X Article：<http://x.com/i/article/2034525084669681664>

标题：你搭的 Claude Skills，还能提升10倍效果——使用 Karpathy 的 autoresearch 方法【译】

作者：@MinLiBuilds（实践哥MinLi）

发布时间：2026-03-19 15:31:36

文章说明原作者是 Ole Lehmann，原文标题为：

How to 10x your Claude Skills (using Karpathy's autoresearch method)

## 这篇文章在讲什么

作者先抛出一个很扎心的问题：

你做出来的 Claude skill，很多时候并不是“稳定有效”，而只是“看起来会输出东西”。真正的问题在于，你通常不知道它什么时候好用、什么时候在敷衍。

文中把这种失效拆成三类：

- 输出会慢慢漂向安全、模糊、模板化，但你不一定意识到
- 你只看得到那些“还不错”的样本，看不到高频失败
- 你偶尔手动修一次输出，以为解决了问题，但 skill 本身并没有变好

作者的结论是：大多数人都在学怎么“搭” AI workflow，却没人教你怎么“测”它到底有没有真的工作。

## autoresearch 方法怎么迁移到 skill 优化

文章引用了 Andrej Karpathy 的 `autoresearch` 思路：不要靠人工反复调整，而是让 AI agent 在一个循环里自己做小改动、跑测试、比较结果，只保留有效优化。

迁移到 Claude Skills 后，循环变成：

1. 跑一次 skill
2. 用 checklist 给输出打分
3. 找出最薄弱的地方
4. 小幅修改 prompt 或规则
5. 重新运行并比较分数
6. 分数变好就保留，变差就回滚
7. 重复这个过程，直到稳定提升

文章用“改菜谱”的类比解释得很清楚：你不是每次都重写整份菜谱，而是只换一点配料，连续试很多次，看结果是否更稳定。

## 核心前提：先把“好”定义成 checklist

作者认为，整个过程中用户真正需要做的关键事情只有一件：

**给出一套清晰、可判定的是/否 checklist。**

这份 checklist 不是模糊评分，而是具体问题，例如：

- 标题有没有包含具体数字或结果
- 开头是否点出具体的痛点场景
- CTA 是否明确说明下一步会发生什么
- 是否出现“revolutionary”“cutting-edge”这类空洞词
- 第一段是否提到用户拿到结果后的具体变化

文章强调：

- 3 到 6 个问题通常是最佳范围
- 太多检查项会导致 skill 开始“迎合 checklist”，反而损害整体输出

## 具体怎么跑

文中给出的流程大致是：

1. 下载 autoresearch skill，放进 Claude Code 或 Cowork 的 skills 文件夹
2. 指定一个你想优化的 skill，例如“对我的落地页 skill 跑 autoresearch”
3. 回答 agent 的三个问题：
   - 要优化哪个 skill
   - 用什么测试输入
   - checklist 是什么
4. agent 先跑基准测试，得到起始分数
5. 浏览器打开实时 dashboard，显示分数曲线、checklist 通过/失败情况和每轮改动日志
6. agent 自动开始循环优化，直到你叫停，或者连续三次超过 95%

## 文中的实战结果

作者用自己的落地页文案 skill 做测试，结果是：

- 通过率从 56% 提升到 92%
- 共进行了 4 轮改动
- 保留了 3 个改动，撤销了 1 个改动

agent 实际做过的优化包括：

- 强制标题必须包含具体数字或结果
- 加入禁用流行词列表
- 补入高质量示例，帮助 skill 看到“什么是好输出”
- 尝试更严格的字数限制，但因为让文案变薄而撤销

最终产物包括：

- 改进后的 skill 副本
- 原始 skill 备份
- 每轮分数结果日志
- 完整 changelog，记录每次改动、原因和效果

作者特别强调 changelog 的价值，因为它相当于这个 skill 的“经验数据库”。模型升级后，可以接着这份经验继续优化，而不是每次从零试错。

## 这套方法不只适用于 skill

文章最后给出的扩展很重要：任何能被打分的东西，都可以放进 `autoresearch` 循环，比如：

- 网站加载速度优化
- cold outreach 邮件优化
- newsletter 开头优化
- 任何你重复使用的 prompt 或 workflow

总结成一句话就是：

**只要能评估，就能 autoresearch。**

这篇文章最值得记住的，不是“某个 Claude skill 更强了”，而是它把 AI 工作流优化从手工调 prompt，推进成了一个可自动化、可量化、可持续积累的过程。
