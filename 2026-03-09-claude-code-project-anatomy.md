---
title: The Anatomy of a Claude Code Project（CLAUDE.md 不是提示词文件）
date: 2026-03-09
source: x.com
url: https://x.com/RodmanAi/status/2030881602251956276
type: thread
tags: [AI产品, 工具, 技术]
---

## 摘要

Leonard Rodman 的推文指出大多数人把 CLAUDE.md 当提示词用，这是错误的。真正让 Claude Code 像项目原生工程师一样工作的关键是仓库结构：CLAUDE.md 保持精简（为什么/是什么/怎么做），Skills 封装可复用工作流，Hooks 设置不会被遗忘的护栏，docs/ 存放渐进式上下文，敏感模块旁放置局部 CLAUDE.md。提示词是临时的，结构是永久的。

## 原文

@RodmanAi (Leonard Rodman) 2026-03-09

Most people treat CLAUDE.md like a prompt file.

That's the mistake.

If you want Claude Code to feel like a senior engineer living inside your repo, your project needs structure.

Claude needs 4 things at all times:

- the why → what the system does
- the map → where things live
- the rules → what's allowed / not allowed
- the workflows → how work gets done

I call this:

**The Anatomy of a Claude Code Project**

---

### 1️⃣ CLAUDE.md = Repo Memory（保持精简）

This is the north star file.

Not a knowledge dump. Just:

- Purpose (WHY)
- Repo map (WHAT)
- Rules + commands (HOW)

If it gets too long, the model starts missing important context.

---

### 2️⃣ .claude/skills/ = Reusable Expert Modes

Stop rewriting instructions.

Turn common workflows into skills:

- code review checklist
- refactor playbook
- release procedure
- debugging flow

Result: Consistency across sessions and teammates.

---

### 3️⃣ .claude/hooks/ = Guardrails

Models forget. Hooks don't.

Use them for things that must be deterministic:

- run formatter after edits
- run tests on core changes
- block unsafe directories (auth, billing, migrations)

---

### 4️⃣ docs/ = Progressive Context

Don't bloat prompts.

Claude just needs to know where truth lives:

- architecture overview
- ADRs (engineering decisions)
- operational runbooks

---

### 5️⃣ Local CLAUDE.md for risky modules

Put small files near sharp edges:

```
src/auth/CLAUDE.md
src/persistence/CLAUDE.md
infra/CLAUDE.md
```

Now Claude sees the gotchas exactly when it works there.

---

Prompting is temporary.

Structure is permanent.

When your repo is organized this way, Claude stops behaving like a chatbot…

…and starts acting like a project-native engineer.

❤️ 881  🔁 138  💬 53
