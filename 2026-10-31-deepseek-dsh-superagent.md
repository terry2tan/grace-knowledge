---
title: dsh-superagent：DeepSeek 的自主 Super-agent 原型
date: 2026-10-31
source: github.com
url: https://github.com/deepseek-ai/dsh-superagent-prototype
type: repo
tags: [AI, AI产品]
---

## 摘要

DeepSeek 官方放出的研究原型（非正式产品）：一个面向单个 GitHub 仓库的主动式编码 agent，打包为 DeepSeek Harness bundle。它监听 GitHub（可选飞书），被允许的人发起请求后，自动开工作项、在独立 agent 会话和目录里干活、以 PR 等形式回到原对话回答，Web 面板只展示需要人处理的事项。核心哲学是"**尽量少占用人类注意力，尽量多交付价值**"：只在被要求或团队书面规则允许时行动，只在有人必须行动或能用上结果时说话，一次只问一个具体问题，按影响而非努力程度停止。配套文章《Exploring Super-agent Design: Towards a More Autonomous Agent System》描述了更完整的设计方向，原型只实现了其中一部分。文档按 000-philosophy → 001-domain → 002-authorization → 003-execution → 004-prompts → 005-panel 顺序编号，每篇只依赖之前的文档。

## 全文（README + 核心设计文档摘录）

### README

# dsh-superagent

> **Research prototype for reference only, not an official DeepSeek product.** This code grew out of our team's day-to-day development work, with much of the engineering done by coding agents. Treat it as research code, not production-ready software. It may still contain bugs, and its coding style and engineering practices may be inconsistent. Review and adapt it before using it in your own environment.
>
> We have adapted it for publication, so it is not identical to our internal version or the implementation described in *Exploring Super-agent Design: Towards a More Autonomous Agent System*. Some designs discussed in the article are directions for future development and are not implemented in this prototype.

dsh-superagent is a proactive coding agent for one GitHub repository, packaged as a bundle for [DeepSeek Harness](https://www.deepseek.com/en/harness/). It listens to GitHub and, optionally, Feishu. When someone allowed asks the agent for work, it opens a work item, works on it in its own agent session and directory, and answers in the original conversation, for example with a pull request. A web panel shows what needs a person.

It is also a way of working with an agent: **take as little human attention as possible, and give as much value as possible.** An agent that can act for a whole team can also waste a whole team's attention, so it acts only when asked or when a rule the team wrote allows it, and speaks only when someone must act or can use a result. [docs/000-philosophy.md](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/main/docs/000-philosophy.md) explains the principle and what it asks of the operator.

### docs/000-philosophy.md

dsh-superagent is a framework, and also a way of working with an agent. Its core principle:

**Take as little human attention as possible, and give as much value as possible.**

Every part of the project is judged by the attention it costs. A message, a notification, a question, a setting, a panel element and a paragraph of documentation each cost someone's attention, and each has to give more value than that, or it is removed.

**What follows for the agent:**

- **It acts only when asked, or when a written rule allows it.** A request counts only when it addresses the agent directly and comes from a person the team allowed: one on an allowed list, or anyone in a conversation the team opened to requests. Work nobody asked for needs a rule the team wrote, and starts in a mode that only records what the agent would have done.
- **It speaks only when a person must act or can use a result.** It confirms a request once and names what it will do. It stays quiet while it works. It writes again when a result is ready, when it needs a decision, or when it cannot finish. Messages are short and go to the conversation where the request was made.
- **It asks one concrete question at a time,** in a structured form, so the question reaches the person instead of staying inside a long report.
- **It stops by impact, not by effort.** A local change goes as far as a reviewable result. A change that needs a design decision stops with a clear question.
- **It reports honestly.** A draft is marked unfinished, a failure is reported as a failure, and a limit is never bypassed to avoid asking.

**What follows for the design:**

- **Few concepts.** The design has only its domain concepts, such as a Source, and their concrete implementations, such as GitHub and Feishu. A business need becomes an attribute of one of them, or a prompt the agent follows. The design does not add a concept for it.
- **Few settings.** A default replaces a setting when one value suits almost every team. Behaviour that a team describes in words is prompt text, not a setting.
- **A panel that shows only what needs a person.** It lists first what waits for a person. A healthy state takes no space.
- **Documents read in order.** Each numbered document builds only on the ones before it, so a reader never needs a concept that has not been introduced yet.

**Responsibility:**

- **Start narrow.** Begin with a short allowed list and with proactive work only recorded. Widen both once what the agent would have done looks right.
- **Tune for less noise.** When the agent is noisy, make its prompts shorter and stricter, or pause it. Do not add more messages to explain the noise.
- **Do not use it to produce volume.** Mass pull requests, broadcast messages and busywork cost the team more than they give.
- **Own what it says.** Read what the agent posts in your name, and correct it in the prompts when it is wrong.

The goal is the right help at the right time, and nothing at any other time.
