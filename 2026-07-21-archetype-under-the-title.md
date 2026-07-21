---
title: The Archetype Under the Title
date: 2026-07-21
source: paddo.dev
url: https://paddo.dev/blog/the-archetype-under-the-title/
type: article
tags: [AI, 职业, AI产品]
---

## 摘要

作者借 Claude Code 作者 Boris Cherny 提出的五种"原型角色"（Prototyper / Builder / Sweeper / Grower / Maintainer）展开：当 AI 把工程、产品、设计、数据科学的功能层商品化后，"职位头衔"越来越无意义，真正区分人的是他们在产品生命周期中的原型角色。作者点出这套框架其实是 Cringely（1992）、Wardley、Thiel 思路的重排——但 Cherny 第一次把"生命周期阶段"从副轴提升为主轴。一个人能同时是全部五种角色，是因为 Agent 吞下了 Building/Maintaining 的机械工作量；但删除、取舍、判断哪个想法值得做——这些"品味活"依然只能人来做（"Agents add; they don't subtract"）。文章还强调：所有原型角色底下都有一个被忽略的共同技能——影响人的能力（EQ、说服、冲突处理、拿到 buy-in），而恰恰这项能力正被"整天与 Agent 独处"的工作方式悄悄消耗。最后作者给出警惕：这类分类可作为镜子（描述当下）却不该被当作围栏（决定未来该做什么），尤其对初级从业者危险。

## 全文

Boris Cherny, who built Claude Code, posted a small framework this week that's been rattling around my head since. As engineering, product, design and data science melt into one kind of role, he says, what's left isn't job titles. It's five archetypes:

*   **Prototyper:** churns out brand-new ideas, most of which don't ship.
*   **Builder:** turns a prototype into production-grade product and infrastructure.
*   **Sweeper:** cleans up the UI, simplifies the system, unships, optimises.
*   **Grower:** takes a built product and iterates it toward product-market fit.
*   **Maintainer:** owns a mature system and keeps it secure, reliable, and fast as it scales.

His key move is that these don't map to job function. At Anthropic everyone holds the same title, Member of Technical Staff: PMs code, data scientists code. So some designers are Prototypers, some engineers are Maintainers. The archetype, not the title, tells you what someone actually does.

## I'm all five, and that's the tell

I read the list and recognised myself in every row, which is not a brag. It's a symptom. When you build solo with agents, there is no one to hand a phase to. You prototype the idea because nobody else will. You build it, then you're the one who has to go back and delete half of it, then grow it, then keep it alive at 2am. The lifecycle doesn't get shorter because you're one person. You just have to be all five archetypes in sequence.

Watching other people is where it gets interesting. Most of them aren't all five. They're one, or two, occasionally three, and the cluster is remarkably stable. And here's the part that makes Cherny right: **the ones who are obviously Prototypers or obviously Maintainers are not all engineers.** I know non-technical people who are pure Prototyper and engineers who are pure Sweeper. The title on their badge predicts almost nothing about which archetype they are.

## The framework is thirty years old

Before crowning this as new, it's worth saying it has a long lineage. Robert Cringely split tech companies into Commandos, Infantry, and Police in 1992: the people who take the beachhead, the people who make it manufacturable, the people who hold and scale it. Simon Wardley turned that into Pioneers, Settlers, and Town Planners. Peter Thiel compressed it to zero-to-one versus one-to-n. The shape recurs because it's real: the temperament that thrives in chaos is not the temperament that thrives in maintenance.

In every one of those, lifecycle-phase was the _secondary_ axis. The primary axis was something else: personality for Cringely, market strategy for Thiel, company stage for the VCs who swap founders for operators. Phase just explained why different specialists were needed at different times.

> Maybe product roles of the future will look more like this, and less like the domain-specific roles of today.
>
> — Boris Cherny

Cherny flips the axes. Once AI commoditises the functional layer, once the engineer, the PM, and the designer are all just people directing the same agents, the function stops being the thing that distinguishes them. Phase is what's left. The novelty isn't the five boxes. It's that the boxes graduated from a secondary lens to the primary one.

## Why one person can suddenly be all five

The reason I can run the whole lifecycle solo isn't that I got five times more capable. It's that agents absorb the _toil_ inside Building and Maintaining: the boilerplate, the scaffolding, the dependency bumps, the mechanical fixes. That's why the team-of-one is viable at all.

But the delegation has a hard edge, and it's exactly where the archetypes stop being interchangeable. Agents add; they don't subtract. The Sweeper's whole job is subtraction - deleting, unshipping, simplifying - the one thing agents are reliably bad at, because it takes taste to know what shouldn't exist. Same with the Prototyper: an agent generates a hundred ideas, but knowing which one is worth building is judgment it doesn't have. The agent does the grunt work _inside_ every archetype; the judgment at the core of each stays with you.

**Delegate the toil, keep the taste** — Hand agents the mechanical mass of Building and Maintaining, but stay the Sweeper and Prototyper yourself. Deletion and idea-selection are taste calls, and taste doesn't transfer to a model that only knows how to add.

## The evidence it's actually happening

This isn't just one Anthropic engineer's vibe. Anthropic's own study of 400,000 Claude Code sessions found management occupations posting the _highest_ success rates of any group, every one of the ten largest occupations landing within seven points of software engineers, and a flat conclusion that a coding background is becoming less relevant to coding well. The org-chart evidence is louder: LinkedIn scrapped its Associate Product Manager program for a rotating "Product Builder" track, and at Shopify the fastest-growing users of AI build tools are support and revenue, not engineering. The title is dissolving in public.

## The skill beneath all five

Notice what the archetypes are silent about. Prototyper, Builder, Sweeper, Grower, Maintainer all describe how you act on the _product_. None of them describe the fact that all of it happens among _people_. And as the building gets cheap, that's the part that stops being incidental and starts being the whole game.

The data has been pointing here for a while. The WEF's 2025 Future of Jobs report found "leadership and social influence" was the single fastest-rising skill employers named, up 22 points, now third behind only analytical thinking and resilience. LinkedIn's 2025 list put conflict mitigation at number two and stakeholder management at nine. And when the people building the tools say it themselves, it's hard to wave away: Anthropic's co-founder Daniela Amodei says the company hires for EQ and communication first, and that the things that make us human will become more important, not less.

> We look for people who are great communicators, who have excellent EQ and people skills, who are kind and compassionate and curious and want to help other people.
>
> — Daniela Amodei, Anthropic

This is the part I keep circling back to. When the moat was never the code and the build is a prompt away, what stays scarce is the ability to move people. Not the slick-presenter version. The unglamorous, load-bearing version: getting a sceptical stakeholder to back an idea, holding a line on scope without making an enemy, asserting yourself without flattening the room, bringing people on the journey when the destination is still uncertain. Every archetype needs it. The Prototyper has to sell the idea before anyone funds it. The Sweeper has to convince a team to let him delete their work. The Maintainer has to fight, in a room full of Prototypers, for the boring work that keeps the thing alive. Lenny Rachitsky lists exactly this as what survives the automation: "aligning opinionated stakeholders, unblocking blockers, getting buy-in on big ideas."

Here's the trap, and it's the one I worry about most. The same workflow that makes this skill scarce is quietly eating it. You spend the day alone with your agents, and the interpersonal muscle is like any other: use it or lose it. Already 46% of Gen Z workers say leaning on AI has weakened their skill set. So the differentiator is becoming the one thing the new way of working gives you the least practice at. This is also why the introvert's quiet, listen-first leadership is having its moment: the people who win the next few years won't just be good at directing agents, they'll be the ones who stayed good with humans while everyone around them got out of practice.

## Where it goes wrong

The framework is sharp, which is exactly why it's worth poking at the soft parts.

*   **Naming the unglamorous roles doesn't dignify them.** Sweeper and Maintainer are Tanya Reilly's "glue work" with a nicer name: the cleanup that keeps teams alive and quietly tanks your promotion case. A label doesn't fix the incentive that pays Prototypers in status and Maintainers in being taken for granted. It might just brand the trap.
*   **An archetype is a lens, not a cage.** Explore-versus-exploit research says these are fluid modes, not fixed identities: people switch across projects and careers, and the best switch on purpose. But the moment a manager writes "Maintainer" next to your name, the lens hardens into a label, and labels decide who gets kept off the early work where the learning is.
*   **The convergence is partial.** It's real for mid-stack product work, not for the hard edges: security, distributed systems, ML research, where the cognitive demands are _rising_ and specialist hiring is climbing. The archetypes describe the melting middle, not the parts that refuse to melt.
*   **Juniors don't get to self-select.** The framework assumes enough career behind you to know which archetype you are. Enter the workforce now and the label arrives before the self-knowledge does, pinned on you by the first thing someone saw you do.

## What I'm keeping

I'm all five because the tools made a one-person lifecycle possible and then left me holding every phase of it. Cherny named that shift better than the thirty years of frameworks it descends from, because he's the first writing from inside a world where the job title genuinely stopped meaning anything. The thing I'd hold onto is the difference between a description and a verdict. Right now "which archetype are you" is a useful way to understand a team and yourself. But it's one personality taxonomy among many, and they all curdle the same way: the instant it stops describing how you work today and starts deciding what you're allowed to work on tomorrow. Use it as a mirror. Don't let anyone use it as a fence.
