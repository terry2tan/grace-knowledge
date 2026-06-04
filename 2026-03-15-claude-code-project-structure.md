---
title: The Anatomy of a Claude Code Project
date: 2026-03-15
source: x.com
url: https://x.com/NainsiDwiv50980/status/2032743352572195115
type: tweet
tags: [AI产品, 工具, 技术]
---

## 摘要

这条推文的核心观点是：不要把 `CLAUDE.md` 当成单纯的提示词文件，而要把 Claude Code 当成一个需要仓库级结构设计的工程系统。作者把稳定协作所需的信息归纳为四类：项目目的、目录地图、行为规则和工作流，并分别映射到 `CLAUDE.md`、`.claude/skills/`、`.claude/hooks/`、`docs/` 以及局部 `CLAUDE.md`。最重要的判断是，提示词只是临时输入，真正长期起作用的是仓库结构与约束布局。对希望让 Claude Code 更像“项目原生工程师”的团队，这是一套很直接的实践框架。

## 全文

Most people treat `CLAUDE.md` like a prompt file.

That's the mistake.

If you want Claude Code to feel like a senior engineer living inside your repo, your project needs structure.

Claude needs 4 things at all times:

- the why -> what the system does
- the map -> where things live
- the rules -> what's allowed / not allowed
- the workflows -> how work gets done

I call this:

**The Anatomy of a Claude Code Project**

### 1. `CLAUDE.md` = Repo Memory

This is the north star file.

Not a knowledge dump. Just:

- Purpose (WHY)
- Repo map (WHAT)
- Rules + commands (HOW)

If it gets too long, the model starts missing important context.

### 2. `.claude/skills/` = Reusable Expert Modes

Stop rewriting instructions.

Turn common workflows into skills:

- code review checklist
- refactor playbook
- release procedure
- debugging flow

Result:
Consistency across sessions and teammates.

### 3. `.claude/hooks/` = Guardrails

Models forget.

Hooks don't.

Use them for things that must be deterministic:

- run formatter after edits
- run tests on core changes
- block unsafe directories (`auth`, `billing`, `migrations`)

### 4. `docs/` = Progressive Context

Don't bloat prompts.

Claude just needs to know where truth lives:

- architecture overview
- ADRs (engineering decisions)
- operational runbooks

### 5. Local `CLAUDE.md` for risky modules

Put small files near sharp edges:

```text
src/auth/CLAUDE.md
src/persistence/CLAUDE.md
infra/CLAUDE.md
```

Now Claude sees the gotchas exactly when it works there.

Prompting is temporary.

Structure is permanent.

When your repo is organized this way, Claude stops behaving like a chatbot...

...and starts acting like a project-native engineer.

-- @NainsiDwiv50980 (Nainsi Dwivedi), 2026-03-14
