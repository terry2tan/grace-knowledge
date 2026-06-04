---
title: "The Modern AI PM in the age of Agents"
date: 2026-01-07
source: x.com
url: https://x.com/Saboo_Shubham_/status/2008742211194913117
article_url: https://x.com/i/article/2008689193829240832
author: Shubham Saboo (@Saboo_Shubham_)
type: article
tags: [AI, 产品]
---

## 摘要

AI 时代 PM 的核心角色正在从"翻译者"转变为"问题塑造者"——以前 PM 是用户需求与工程师之间的桥梁，现在当 Agent 可以直接将清晰的问题描述转化为可运行代码时，写好 spec 本身就等于交付产品。作者认为新时代 PM 最关键的三项能力是：**问题塑造**（把模糊的用户痛点精确化到 Agent 可执行的程度）、**上下文策划**（喂给 Agent 的上下文质量直接决定输出质量，需要包含真实用户细节、问题原话、成功标准、已失败方案等）、以及**品味与评估**（Agent 快速批量产出时，判断"这是否真正解决了问题"成为最稀缺的技能）。新工作流是 PM 自己用 Agent 搭出第一版原型、直接在真实软件上迭代，再交给工程师推向生产，而非停留在 Figma 或文档阶段。

## 全文

The job of a PM used to be translation.
You talked to customers, synthesized their problems, wrote specs, and handed them to engineers. You were the bridge between "what people need" and "what gets built." The value was in that translation layer.

That layer is compressing.

When agents can take a well-formed problem and produce working code, the PM's job shifts. You're no longer translating for engineers. You're forming intent clearly enough that agents can act on it directly.

**The spec is becoming the product.**

I've watched this happen with myself and dozens of other PMs. Previously, a PM would write a detailed spec, hand it off, wait for questions, clarify, wait for implementation, review, give feedback, iterate. The cycle took weeks. Now they write a clear problem statement with constraints, point an agent at it, and review working code in an hour.

The time between "I know what we should build" and "here it is" collapsed. But the work of knowing what to build didn't get easier. It got more important.

You don't need to write the code yourself. You need to know what you want clearly enough that an agent can build it. The spec and the prototype are becoming the same thing. You just describe what you want, watch it take shape, course-correct, and iterate. The bottleneck isn't implementation anymore.

And the speed of shipping is only accelerating.

I've been at Google for around 3-4 months and it feels like we've shipped years' worth of AI progress. In that window alone: Gemini 3 Pro and Flash, the Multimodal Live API, Nano Banana Pro, Deep Research Agent, Google Interactions API, ADK Java/Go/TypeScript and so much more.

Every big and small AI company is shipping at this pace, thanks to AI coding agents. The cycle times that used to define product development, from quarterly planning, monthly sprints, to weekly releases are compressing into something closer to continuous deployment of ideas.

When the implementation barrier drops this fast, the bottleneck shifts upstream. The scarce resource isn't engineering capacity anymore. It's knowing what's actually worth building.

## The new PM skillset

**Problem shaping**: The best PMs I know have always been good at this, but it used to be one skill among many. Now it's THE skill. Can you take an ambiguous customer pain point and shape it into something clear enough that an agent or team of agents can act on it? Can you identify the constraints that actually matter? Can you articulate what success looks like?

The spec isn't a document anymore. It's a well-formed problem with clear boundaries.

**Context curation**: This is the skill nobody talks about, but every PM who's effective with agents has developed it. The quality of what an agent produces is directly proportional to the context you feed it.

When I first started working with agents, I'd give vague prompts: "build me a dashboard for customer feedback" I'd get something that technically worked but missed the point entirely. It didn't understand our users, our constraints, what "good" looked like for us.

Now I maintain context docs that I feed to agents before starting any project. Over time I've figured out what actually matters in these docs:

- The user, specifically. Not a persona. Real details: who they are, what they care about, what makes them give up, what makes them pay attention.
- The problem in their words. Direct quotes from calls, tickets, or sales notes. Their language, not your synthesis. This grounds the agent in real pain, not abstracted pain.
- What good looks like. Examples your team considers well-designed. Your own past work, competitors, adjacent products. Show, don't describe.
- What you've tried and why it failed. Institutional knowledge that usually lives in people's heads. The approaches you've already killed and the reasons why.
- Constraints that shape the solution. Not every constraint. Just the ones that will actually change what gets built.
- How you'll know it worked. Concrete, not fuzzy. Something you could actually measure or observe.

When I ask an agent to prototype something now, it's not starting from zero. It knows who we're building for, what they actually said, what good looks like, and what's already failed. The output fits because the input was specific.

**Evaluation and Taste**: Taste is underrated. But when agents produce output quickly and in bulk, it becomes the most important skill. Is this actually solving the problem? Does it handle the edge cases that matter? Is this the version we should ship or just the version that runs?

This is harder than it sounds. Agents will confidently produce things that look correct but miss the point entirely. You need reps to develop the taste.

There's no shortcut: you have to build things, evaluate them, learn what "good enough to ship" actually feels like versus "technically works."

## The mental model shift

Here's how I think about it now:

**Old model**: PM figures out what to build → writes spec → engineers build it → PM reviews → iterate

**New model**: PM figures out what to build → PM builds it with agents → PM evaluates → iterate quickly → (when they like it) hand to engineers to go live in prod

The AI PM isn't just handing off requirements anymore. They're vibing the first iteration themselves and getting real feedback on working software, not slide decks or Figma mocks. Engineers then become collaborators on making the product better and production-ready rather than translators of your intent.

This changes your relationship with the product. You're not describing what you want and hoping it comes back right. You're shaping it directly, in real time.

Think in iterations. Let the first version be wrong. Don't try to get it perfect in your head before you start. Give the agent rich context about the problem, then let it take a rough first pass. See what comes out. React. Iterate. You'll learn more from "that's not quite right because..." than from trying to think through every edge case upfront.

I regularly have agents build two or three completely different approaches just to see which one feels right when I use it. That used to be expensive. Now it's a Tuesday afternoon with a few parallel agents.

Hold ambiguity longer. Old PM instinct was to resolve ambiguity into specs as fast as possible. New instinct is to stay in the ambiguous zone while you explore. Don't collapse to a solution too early. Let agents help you understand the solution space before you commit.

## Getting started

If you're a PM who hasn't worked this way yet, here's how to start:

Pick a small problem you actually have. Not an imaginary one. Something that's annoying you right now. A report you have to manually compile. A workflow that's tedious. A prototype you wish existed.

Spend 30 minutes writing context before you prompt. See the context curation section above for the full list.

Point an agent at it and watch what happens. Don't expect perfection. Expect a starting point. React to it. Guide it. Iterate.

Do this ten times. With different problems. Different levels of complexity. You'll develop intuition for what works, what context matters, how to evaluate output. This intuition is the new PM skill.

The PMs who will thrive are the ones who understand problems so clearly that the solution becomes obvious to them and to the agents they work with.

I switch between AI Studio, Cursor, Antigravity and Claude Code depending on the task. The tool matters less than building the muscle of working with agents daily.

Lastly, I'll leave you with this...

If your job was mostly translating customer needs into documents for engineers, that's a workflow. Workflows get automated.

If your job was "understand problems so deeply that the right solution becomes obvious," you're more valuable than ever. Agents amplify that understanding into shipped product faster than any team ever could before.

The question every PM should ask: when the translation layer disappears, what's left?

For the best PMs, the answer is everything that actually mattered.

Understanding the problem. User empathy. Judgment. Taste.

These were always part of the PM job. Now they're becoming the whole job!

---

## 中文翻译

**AI Agent 时代的现代 PM**

PM 的工作曾经是翻译。

你和客户交谈，归纳他们的问题，写规格文档，然后交给工程师。你是"人们需要什么"和"被构建出什么"之间的桥梁。价值就在这个翻译层。

这个翻译层正在被压缩。

当 Agent 能够接收一个清晰的问题并产出可运行的代码时，PM 的工作发生了转变。你不再是为工程师翻译了，而是要把意图表达得足够清晰，让 Agent 能够直接行动。

**规格文档正在成为产品本身。**

我亲眼见证了这件事发生在我自己和数十位 PM 身上。以前，PM 写详细的规格文档，交出去，等问题，澄清，等实现，审查，给反馈，迭代。整个周期需要数周。现在，他们写一个带约束条件的清晰问题陈述，指向一个 Agent，一小时内就能审查可运行的代码。

"我知道该构建什么"到"它在这里了"之间的时间崩塌了。但"知道该构建什么"这件事并没有变得更容易，它变得更加重要了。

你不需要自己写代码。你需要把自己想要什么想得足够清晰，让 Agent 能够构建出来。规格文档和原型正在变成同一件事。你只需描述你想要什么，看着它成形，纠偏，迭代。瓶颈不再是实现了。

而交付速度还在加快。

我在 Google 大概 3-4 个月了，感觉我们交付了数年的 AI 进展。仅在这段时间内就有：Gemini 3 Pro 和 Flash、多模态 Live API、Nano Banana Pro、Deep Research Agent、Google Interactions API、ADK Java/Go/TypeScript 等等。

每家大大小小的 AI 公司都在以这种节奏交付，这要归功于 AI 编程 Agent。曾经定义产品开发的周期——季度规划、月度 sprint、周度发布——正在压缩成近乎持续的想法部署。

当实现门槛如此快速地降低时，瓶颈上移了。稀缺资源不再是工程产能，而是知道什么真正值得构建。

### 新 PM 技能组合

**问题塑造**：我认识的最优秀的 PM 一直擅长这个，但它曾经只是众多技能之一。现在它是核心技能。你能把一个模糊的客户痛点塑造成清晰到 Agent 或 Agent 团队可以行动的东西吗？你能识别出真正重要的约束条件吗？你能清楚表达成功是什么样子吗？

规格文档不再是一份文件，而是一个边界清晰的良构问题。

**上下文策划**：这是没人谈论的技能，但每个有效使用 Agent 的 PM 都已经发展出来了。Agent 产出的质量与你喂给它的上下文直接成正比。

当我刚开始与 Agent 合作时，我会给出模糊的提示："帮我构建一个客户反馈仪表板"。我得到的东西在技术上可以运行，但完全没抓住重点。它不了解我们的用户、我们的约束条件、对我们来说"好"是什么样子的。

现在我维护着上下文文档，在开始任何项目之前都会喂给 Agent。随着时间推移，我找出了这些文档中真正重要的内容：

- 具体的用户。不是人设，是真实细节：他们是谁，他们在意什么，什么让他们放弃，什么让他们关注。
- 用他们自己话说的问题。来自通话、工单或销售备注的直接引用。他们的语言，而非你的归纳。这让 Agent 扎根于真实的痛苦，而非抽象的痛苦。
- 好的样子是什么。你的团队认为设计良好的案例。你自己过去的作品、竞争对手、相邻产品。展示，而非描述。
- 你尝试过什么以及为何失败。通常存在于人们脑海中的机构知识。你已经放弃的方案以及原因。
- 塑造解决方案的约束条件。不是所有约束条件，只是那些真正会改变构建内容的。
- 你怎么知道它成功了。具体的，不模糊的。你实际上能测量或观察到的东西。

现在当我让 Agent 做原型时，它不是从零开始。它知道我们为谁构建、他们实际说了什么、好的样子是什么、什么已经失败了。产出合适，是因为输入是具体的。

**评估与品味**：品味被低估了。但当 Agent 快速、大量地产出时，它变成了最重要的技能。这真的解决了问题吗？它处理了重要的边缘情况吗？这是我们应该交付的版本，还是只是能运行的版本？

这比听起来要难。Agent 会自信地产出看起来正确但完全没抓住重点的东西。你需要积累经验来培养品味。

没有捷径：你必须构建东西，评估它们，了解"足够好可以交付"和"技术上可运行"的感觉有何不同。

### 心智模型的转变

我现在这样思考：

**旧模型**：PM 想清楚构建什么 → 写规格文档 → 工程师构建 → PM 审查 → 迭代

**新模型**：PM 想清楚构建什么 → PM 用 Agent 构建 → PM 评估 → 快速迭代 → （满意后）交给工程师推向生产

AI PM 不再只是移交需求了。他们亲自在真实可运行的软件上完成第一次迭代并获得真实反馈，而非停留在幻灯片或 Figma 原型阶段。工程师随后成为让产品更好、更具生产就绪性的协作者，而非意图的翻译者。

这改变了你与产品的关系。你不是在描述你想要什么然后希望它正确地回来，而是在实时直接塑造它。

用迭代思考。让第一个版本是错的。不要在开始之前就在脑海中追求完美。给 Agent 关于问题的丰富上下文，然后让它先粗略地走一遍。看看输出什么。反应。迭代。你从"这不太对，因为……"中学到的比试图预先想通每个边缘情况要多。

我经常让 Agent 构建两三种完全不同的方案，就是为了看看用起来哪种感觉对。这曾经很昂贵，现在不过是周二下午开几个并行 Agent 的事。

更长时间保持模糊。旧的 PM 本能是尽快将模糊转化为规格。新的本能是在你探索时停留在模糊区域。不要过早收敛到解决方案。让 Agent 帮助你在承诺之前理解解决方案空间。

### 入门指南

如果你是还没有这样工作过的 PM，以下是开始的方式：

选一个你真实存在的小问题。不是假想的。是现在让你烦恼的事情。你必须手动整理的报告。繁琐的工作流程。你希望存在的原型。

在提示之前花 30 分钟写上下文。参见上面的上下文策划部分。

把 Agent 指向它，看看发生什么。不要期待完美，期待一个起点。对它做出反应，引导它，迭代。

做十次。用不同的问题、不同的复杂程度。你会培养出直觉：什么有效、什么上下文重要、如何评估输出。这种直觉就是新的 PM 技能。

会蓬勃发展的 PM 是那些把问题理解得如此清晰，以至于解决方案对他们和他们合作的 Agent 都变得显而易见的人。

我根据任务在 AI Studio、Cursor、Antigravity 和 Claude Code 之间切换。工具不如每天与 Agent 合作建立肌肉记忆重要。

最后，我想留给你这句话……

如果你的工作主要是将客户需求翻译成工程师的文档，那是一个工作流程。工作流程会被自动化。

如果你的工作是"深刻理解问题，以至于正确的解决方案变得显而易见"，你比以往任何时候都更有价值。Agent 将这种理解放大为比任何团队以前都更快交付的产品。

每个 PM 都应该问的问题是：当翻译层消失时，剩下什么？

对于最优秀的 PM，答案是所有真正重要的东西。

理解问题。用户同理心。判断力。品味。

这些一直都是 PM 工作的一部分，现在它们正在成为全部工作！
