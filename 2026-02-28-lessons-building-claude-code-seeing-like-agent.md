---
title: "Lessons from Building Claude Code: Seeing like an Agent"
date: 2026-02-28
source: x.com
url: http://x.com/i/article/2027446899310313472
type: article
tags: [AI, 技术]
---

## 摘要

本文是 Anthropic 工程师 @trq212 分享的构建 Claude Code 的实战经验：设计 Agent 工具集的核心是"像 Agent 一样思考"，关键要适配模型真实能力而非想象能力。文章以 AskUserQuestion 工具的三次迭代、Todo→Task 工具的升级、以及搜索接口的演进为例，揭示了渐进式披露（Progressive Disclosure）这一核心设计模式。随着模型能力提升，旧工具可能反而成为约束，需要不断重新审视工具集假设。

## 全文

One of the hardest parts of building an agent harness is constructing its action space.
Claude acts through Tool Calling, but there are a number of ways tools can be constructed in the Claude API with primitives like bash, skills and recently code execution (read more about programmatic tool calling on the Claude API in @RLanceMartin's new article).
Given all these options, how do you design the tools of your agent? Do you need just one tool like code execution or bash? What if you had 50 tools, one for each use case your agent might run into?
To put myself in the mind of the model I like to imagine being given a difficult math problem. What tools would you want in order to solve it? It would depend on your own skills!
Paper would be the minimum, but you'd be limited by manual calculations. A calculator would be better, but you would need to know how to operate the more advanced options. The fastest and most powerful option would be a computer, but you would have to know how to use it to write and execute code.
This is a useful framework for designing your agent. You want to give it tools that are shaped to its own abilities. But how do you know what those abilities are? You pay attention, read its outputs, experiment. You learn to see like an agent.
Here are some lessons we've learned from paying attention to Claude while building Claude Code.

# Improving Elicitation & the AskUserQuestion tool

When building the AskUserQuestion tool, our goal was to improve Claude's ability to ask questions (often called elicitation).
While Claude could just ask questions in plain text, we found answering those questions felt like they took an unnecessary amount of time. How could we lower this friction and increase the bandwidth of communication between the user and Claude?

## Attempt #1 - Editing the ExitPlanTool

The first thing we tried was adding a parameter to the ExitPlanTool to have an array of questions alongside the plan. This was the easiest thing to implement, but it confused Claude because we were simultaneously asking for a plan and a set of questions about the plan. What if the user's answers conflicted with what the plan said? Would Claude need to call the ExitPlanTool twice? We needed another approach.

(you can read more about why we made an ExitPlanTool in our post on prompt caching)

## Attempt #2 - Changing Output Format

Next we tried modifying Claude's output instructions to serve a slightly modified markdown format that it could use to ask questions. For example, we could ask it to output a list of bullet point questions with alternatives in brackets. We could then parse and format that question as UI for the user.
While this was the most general change we could make and Claude even seemed to be okay at outputting this, it was not guaranteed. Claude would append extra sentences, omit options, or use a different format altogether.

## Attempt #3 - The AskUserQuestion Tool

Finally, we landed on creating a tool that Claude could call at any point, but it was particularly prompted to do so during plan mode. When the tool triggered we would show a modal to display the questions and block the agent's loop until the user answered.
This tool allowed us to prompt Claude for a structured output and it helped us ensure that Claude gave the user multiple options. It also gave users ways to compose this functionality, for example calling it in the Agent SDK or using referring to it in skills.
Most importantly, Claude seemed to like calling this tool and we found its outputs worked well. Even the best designed tool doesn't work if Claude doesn't understand how to call it.
Is this the final form of elicitation in Claude Code? We're not sure. As you'll see in the next example, what works for one model may not be the best for another.

# Updating with Capabilities - Tasks & Todos

When we first launched Claude Code, we realized that the model needed a Todo list to keep it on track. Todos could be written at the start and checked off as the model did work. To do this we gave Claude the TodoWrite tool, which would write or update Todos and display them to the user.
But even then we often saw Claude forgetting what it had to do. To adapt, we inserted system reminders every 5 turns that reminded Claude of its goal.
But as models improved, they not only did not need to be reminded of the Todo List but could find it limiting. Being sent reminders of the todo list made Claude think that it had to stick to the list instead of modifying it. We also saw Opus 4.5 also get much better at using subagents, but how could subagents coordinate on a shared Todo List?
Seeing this, we replaced TodoWrite with the Task Tool (read more on Tasks here). Whereas Todos were about keeping the model on track, Tasks were more about helping agents communicate with each other. Tasks could include dependencies, share updates across subagents and the model could alter and delete them.
As model capabilities increase, the tools that your models once needed might now be constraining them. It's important to constantly revisit previous assumptions on what tools are needed. This is also why it's useful to stick to a small set of models to support that have a fairly similar capabilities profile.

# Designing a Search Interface

A particularly important set of tools for Claude are the search tools that can be used to build its own context.
When Claude Code first came out, we used a RAG vector database to find context for Claude. While RAG was powerful and fast it required indexing and setup and could be fragile across a host of different environments. More importantly, Claude was given this context instead of finding the context itself.
But if Claude could search on the web, why not search your codebase? By giving Claude a Grep tool, we could let it search for files and build context itself.
This is a pattern we've seen as Claude gets smarter, it becomes increasingly good at building its context if it's given the right tools.
When we introduced Agent Skills we formalized the idea of progressive disclosure, which allows agents to incrementally discover relevant context through exploration.
Claude could read skill files and those files could then reference other files that the model could read recursively. In fact, a common use of skills is to add more search capabilities to Claude like giving it instructions on how to use an API or query a database.
Over the course of a year Claude went from not really being able to build its own context, to being able to do nested search across several layers of files to find the exact context it needed.
Progressive disclosure is now a common technique we use to add new functionality without adding a tool.

# Progressive Disclosure - The Claude Code Guide Agent

Claude Code currently has ~20 tools, and we are constantly asking ourselves if we need all of them. The bar to add a new tool is high, because this gives the model one more option to think about.
For example, we noticed that Claude did not know enough about how to use Claude Code. If you asked it how to add a MCP or what a slash command did, it would not be able to reply.
We could have put all of this information in the system prompt, but given that users rarely asked about this, it would have added context rot and interfered with Claude Code's main job: writing code.
Instead, we tried a form of progressive disclosure. We gave Claude a link to its docs which it could then load to search for more information. This worked but we found that Claude would load a lot of results into context to find the right answer when really all you needed was the answer.
So we built the Claude Code Guide subagent which Claude is prompted to call when you ask about itself, the subagent has extensive instructions on how to search docs well and what to return.
While this isn't perfect, Claude can still get confused when you ask it about how to set itself up, it is much better than it used to be! We were able to add things to Claude's action space without adding a tool.

## An Art, not a Science

If you were hoping for a set of rigid rules on how to build your tools, unfortunately that is not this guide. Designing the tools for your models is as much an art as it is a science. It depends heavily on the model you're using, the goal of the agent and the environment it's operating in.

Experiment often, read your outputs, try new things. See like an agent.

---

## 中文翻译

# 构建 Claude Code 的经验：像 Agent 一样思考

构建 Agent 框架最难的部分之一，是构造它的动作空间。

Claude 通过工具调用（Tool Calling）来行动，但在 Claude API 中，工具可以用多种方式构造——基础原语包括 bash、skills，以及最近新增的代码执行（更多关于 Claude API 编程式工具调用的内容，可读 @RLanceMartin 的新文章）。

面对这么多选择，你该如何设计你的 Agent 工具集？只需要一个工具，比如代码执行或 bash？还是需要 50 个工具，覆盖每一种可能的场景？

为了进入模型的思维，我喜欢想象自己拿到了一道难题。你需要什么工具来解答它？这取决于你自身的能力！

纸笔是最低配，但你被困在手算的限制里。计算器更好，但你需要知道如何使用高级功能。最快最强大的是电脑，但前提是你得会写代码并执行它。

这是一个设计 Agent 的有用框架：你想给它量身定制的工具，适配它自己的能力。但你怎么知道它的能力是什么？你需要持续关注、阅读它的输出、不断实验。你要学会"像 Agent 一样看世界"。

以下是我们在构建 Claude Code 过程中，通过观察 Claude 学到的几个教训。

# 提升"问询能力"与 AskUserQuestion 工具

构建 AskUserQuestion 工具时，我们的目标是提升 Claude 主动提问的能力（通常称为 elicitation）。

虽然 Claude 可以直接用纯文本提问，但我们发现回答这些问题会让用户花费不必要的时间。如何降低这种摩擦，提升用户与 Claude 之间的沟通效率？

## 尝试 #1 - 修改 ExitPlanTool

第一个方案是给 ExitPlanTool 增加一个参数，让它在计划旁边附带一组问题。这是最容易实现的，但它让 Claude 感到困惑——我们同时要求一个计划，又要求关于计划的一组问题。如果用户的回答与计划冲突怎么办？Claude 是否需要调用两次 ExitPlanTool？我们需要换一种方式。

## 尝试 #2 - 修改输出格式

接下来，我们尝试修改 Claude 的输出指令，让它输出一种略经修改的 markdown 格式来提问——比如要求它输出一个带有选项的问题列表（选项用方括号表示），然后我们解析这个格式并展示为 UI。

虽然这是最通用的改法，Claude 也基本能做到，但并不稳定。Claude 时常会附加多余的句子、漏掉选项，或者完全换了另一种格式。

## 尝试 #3 - AskUserQuestion 工具

最终，我们创建了一个专用工具，Claude 在任何时候都可以调用，但特别是在计划模式下，会被提示优先调用它。工具触发时，我们会弹出一个模态框展示问题，并阻塞 Agent 循环，直到用户回答为止。

这个工具让我们能够引导 Claude 输出结构化内容，并确保 Claude 给用户提供多个选项。它还让用户可以灵活组合这个功能——例如在 Agent SDK 中调用，或在 skills 中引用它。

最重要的是，Claude 似乎很"喜欢"调用这个工具，输出效果也很好。即使是设计最精良的工具，如果 Claude 不理解如何调用它，也是徒劳。

这是 Claude Code 中"问询能力"的最终形态吗？我们不确定。正如你将在下一个例子中看到的，适合一个模型的方案，未必是另一个模型的最优解。

# 随能力升级工具 - 从 Todos 到 Tasks

Claude Code 刚上线时，我们意识到模型需要一个待办列表来保持专注。Todos 在开始时写好，随着任务完成逐项打钩。为此我们给了 Claude TodoWrite 工具，用于写入或更新 Todos 并展示给用户。

但即便如此，我们仍然常常看到 Claude 忘记自己要做什么。为了应对这个问题，我们每 5 轮插入一次系统提醒，提示 Claude 它的目标。

但随着模型持续进步，它们不仅不再需要被提醒 Todo 列表，反而开始被它所限制。定时收到 Todo 提醒让 Claude 以为必须严格遵守列表，而不是灵活修改它。我们还发现 Opus 4.5 在使用子 Agent 方面有了显著提升，但子 Agent 之间如何协调共享 Todo 列表？

看到这些，我们用 Task 工具替换了 TodoWrite。Todos 的重点是让模型保持专注，而 Tasks 更关注 Agent 之间的协作与沟通。Tasks 可以包含依赖关系，支持跨子 Agent 共享更新，模型也可以修改和删除它们。

随着模型能力提升，曾经需要的工具可能现在反而在约束它们。持续重新审视工具集的假设非常重要。这也是为什么，专注支持能力画像相近的少数几个模型会更有价值。

# 设计搜索接口

对 Claude 来说，一类特别重要的工具是搜索工具——它们帮助 Claude 自主构建上下文。

Claude Code 刚推出时，我们用 RAG 向量数据库为 Claude 查找上下文。虽然 RAG 强大且快速，但它需要索引和配置，在不同环境中可能很脆弱。更重要的是，Claude 是被"喂"给上下文，而不是自己去找。

但如果 Claude 能搜索网页，为什么不能搜索你的代码库？通过给 Claude 一个 Grep 工具，我们让它可以自主搜索文件、自己构建上下文。

这是我们看到的一个规律：随着 Claude 越来越聪明，只要给它合适的工具，它就越来越擅长自己构建上下文。

在引入 Agent Skills 时，我们将"渐进式披露"（Progressive Disclosure）的理念正式化——允许 Agent 通过探索逐步发现相关上下文。

Claude 可以读取 skill 文件，这些文件又可以引用其他文件，Claude 可以递归读取。事实上，skills 的一个常见用途就是为 Claude 增加搜索能力——比如告诉它如何使用某个 API 或查询数据库。

在过去一年里，Claude 从几乎无法自主构建上下文，进化到能够跨多层文件做嵌套搜索，精准找到所需上下文。

渐进式披露现在已成为我们在不增加工具的前提下扩展功能的常用技术。

# 渐进式披露 - Claude Code Guide 子 Agent

Claude Code 目前有约 20 个工具，我们持续在问自己：是否真的需要所有这些工具？添加新工具的门槛很高，因为每多一个工具，模型就多一个需要考虑的选项。

举个例子，我们注意到 Claude 对如何使用 Claude Code 本身了解不足。如果你问它如何添加 MCP，或某个斜杠命令是做什么的，它往往无法回答。

我们本可以把所有这些信息塞进系统提示词，但用户极少问这类问题，这样做只会造成"上下文污染"，干扰 Claude Code 的主职：写代码。

于是我们改用渐进式披露。我们给了 Claude 一个文档链接，让它需要时自行加载搜索。这有效，但我们发现 Claude 会加载大量结果到上下文，而其实你只需要那个答案本身。

所以我们构建了 Claude Code Guide 子 Agent——当你问 Claude 关于它自身的问题时，它被提示去调用这个子 Agent，而该子 Agent 有完善的搜索文档指令和返回格式要求。

虽然还不完美——Claude 有时在被问及自身配置时仍会困惑——但已经比以前好多了！我们在不增加工具的情况下，扩展了 Claude 的动作空间。

## 这是一门艺术，而非科学

如果你希望从这篇文章里找到一套构建工具的刚性规则，很遗憾，这不是那种文章。为模型设计工具，既是科学，也是艺术。它高度依赖于你使用的模型、Agent 的目标，以及它所处的运行环境。

频繁实验，认真阅读输出，勇于尝试新事物。像 Agent 一样思考。
