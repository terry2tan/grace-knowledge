---
title: Karpathy：LLM 能力认知的漏斗正在拉大（4月推文复盘）
date: 2026-10-13
source: x.com
url: https://x.com/karpathy/status/2109361546505966046
type: tweet
tags: [AI, 技术]
---

## 摘要

Karpathy 复盘 4 月的「两组人对 AI 能力各说各话」推文，判断这个认知差距已从"各说各话"恶化成**陡峭漏斗**：约 60 亿人（75%）几乎没接触过 LLM；10-20 亿人（~20%）是免费档轻度用户，看到的是"更好的 Google"；约 2000 万专业人士（0.2%）在数学和代码领域亲历 agent 用一个 prompt 完成过去数周/数月的项目；最顶端约 5000 人（0.00006%）能接触前沿内部系统——数千 agent 协作数周的软件巨型项目、机器速度的网络攻防、前沿数学，而人类审查和理解能力已开始跟不上。漏斗由三个因素驱动：①影响随问题规模和野心放大的复利效应；②能力的"锯齿状"分布（强化学习在可验证奖励上训练，能力集中在数字化、可验证、有经济价值的领域）；③访问层级（免费/付费/内部）。对 Terry 的 AI native 主题是强信号：处在漏斗哪一层，取决于是否用 frontier 模型在 math&code 领域解决大型问题。

## 全文

### 主推（2026-10-12）

@karpathy (Andrej Karpathy)

Dusting off this tweet from April because this gap in shared understanding of LLM capability is *widening*. It's now less "two groups of people speaking past each other" and more a sharp funnel.

- Napkin math somewhere around 6B people (~75% of the population) have barely come in contact with LLMs at all.
- Around 1-2B (~20%) are casual and infrequent users of free-tier ChatGPT-like products. This group sees derpy chatbots and treats them a bit like a better Google search, a writing aid, or etc. Maybe an agent tries to book you a flight. I have non-tech friends who (reasonably, imo) say they have not much use for it at all. Even many professionals outside of math&code are in this tier. For example, execs and many other functions spend a lot of their time talking to other people, so while they understand what is happening intellectually, it is still second-hand and a bit abstract.
- Now we get to professional use of frontier-grade LLMs in math&code. Somewhere around 20M people (0.2%) see first-hand that large, complex projects that used to take them weeks/months can now be completed by agents with a prompt. Building apps, copying apps, translating apps, decompiling apps from binaries... This has all happened very quickly and recently - less than 1 year ago, I was writing code manually by hand, typing memorized computer code commands into a code editor character by character, occasionally pressing Tab to autocomplete a little chunk of code.
- And finally we get to the ~5,000 people (~0.00006%) with access to frontier-grade systems internally. The external world has seen the preview. It looks like swarms of thousands of agents collaborating over weeks on software mega projects: minting zero days, running cyber attacks and defenses at machine speeds, discovering new science, advancing the frontier of mathematics. Things that would have taken top professionals in the industry years of work. Meanwhile, human review and comprehension are starting to fall behind. For example, people are still involved in the "archeology" of the OpenAI-HF incident from many months ago. Mathematicians may be poring over the 722 manuscripts on frontier mathematics for a while.

The funnel is driven by a combination of factors:
1. The impact scales with ambition, problem size, and horizon. A question with a paragraph answer barely stresses the system. You need a reservoir of big, difficult problems that you really care about. This aspect drives the consumer / professional dimension of the funnel.
2. The jaggedness of the system. Capability peaks in domains that are digital, verifiable and economically valuable. This is because LLM capability emerges from reinforcement learning on verifiable rewards on a curated environment mixture driven by revenue potential. This aspect primarily drives the area (e.g. math&code) dimension of the funnel.
3. Access. Free-tier, paid-tier, internal.

So this is the weirdness of the moment. The general public has mostly not interacted with these systems. When they have, it looks like a derpy chatbot. The majority of professionals still see only a modest uplift. And a small sliver of professionals are experiencing the vertigo of the curve going vertical. And it is all happening at the same time.

rt 5234  re 1815  lk 39755

### 引用原推（2026-04-10）

@karpathy：两组人各说各话——一组用免费档旧模型形成"AI 会搞笑出错"的印象；另一组付费使用前沿 agentic 模型（Codex / Claude Code）并在编程、数学、研究中专业使用，目睹模型熔解过去需要数天/数周工作的编程问题，患上"AI Psychosis"。原因：①编程/数学有可验证的显式奖励函数，天然适合 RL；②这些领域在 b2b 场景价值更高，团队火力集中于此。所以免费语音模式在 Instagram reels 上答错最蠢的问题，与最高档 Codex 花 1 小时连贯重构整个代码库，是同时发生的。

rt 2672  re 1250  lk 22536
