---
title: alphaXiv SKILL.md：让 Claude Code 读论文更高效
date: 2026-03-10
source: x.com
url: https://x.com/askalphaxiv/status/2031120122619060445
type: tweet
tags: [AI产品, 工具, 技术]
---

## 摘要

alphaXiv 发布了一个 SKILL.md，让 Claude Code 不再直接读 PDF，而是通过 alphaXiv 获取结构化的论文概览（AI-friendly paper overviews）。alphaXiv 是 arXiv 论文的 AI 增强阅读平台，提供结构化摘要、讨论、实现代码等；通过 SKILL.md 接入 Claude Code，研究者可以让 Agent 直接获取高质量的论文结构化信息，而不是费力解析原始 PDF。

## 原文

@askalphaxiv (alphaXiv) 2026-03-10

If you're using Claude Code for research: stop making it read directly from PDFs

We've introduced a SKILL.md that fetches structured, AI-friendly paper overviews from alphaXiv 👀

❤️ 814  🔁 101  💬 18

---

## 背景信息

**alphaXiv** 是 arXiv 的增强阅读平台（https://alphaxiv.org），提供：
- 每篇 arXiv 论文的 AI 生成结构化概览（overview）
- 社区讨论、实现代码链接
- 按热度/点赞排序的论文发现
- 支持自然语言问答搜索（如"数学推理最流行的 benchmark 是什么"）

**SKILL.md** 的用途：将 alphaXiv 的 paper overview API 封装为 Claude Code 可调用的技能，Agent 遇到需要查阅论文的场景时自动调用，获取结构化内容而非解析 PDF。

**相关 GitHub 仓库**：
- `alphaXiv/paper-implementations`：热门论文的干净实现代码
- `alphaXiv/agents`：alphaXiv 自研的 TypeScript Agent 库
