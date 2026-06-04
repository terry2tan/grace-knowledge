---
title: Karpathy刚开源的autoresearch，我拿来优化龙虾skill，成功率从56%飙到92%
date: 2026-03-19
source: 微信公众号
url: https://mp.weixin.qq.com/s/2Daoh-4VQ6EVY1W_3o6hqQ
type: article
tags: [AI产品, 工具, 技术]
---

## 摘要

这篇文章围绕 Karpathy 开源的 autoresearch 展开，核心是在说明如何把一套更系统的研究/搜索流程用于优化现有 skill。标题给出的最强信号是：作者把 autoresearch 方法迁移到“龙虾 skill”的迭代中后，任务成功率从 56% 提升到了 92%。

从用户偏好看，这类内容的价值不在“又一个新工具”，而在于它提供了一个可复用的方法论：先让 Agent 自动做信息搜集与候选方案扩展，再把结果反馈到 skill 设计、提示词、工作流和工具调用策略上。它本质上是在讲如何把 research loop 变成 skill 优化 loop。

这类案例通常最值得关注的，是成功率提升背后的具体改造点：到底优化了任务拆解、检索策略、上下文组织、失败回退，还是工具选择逻辑。如果后续能拿到正文，建议重点抽取这些机制层细节，而不是只记“56%→92%”这个结果数字。

## 全文

> 说明：当前仅成功提取到标题与基础元信息，微信公众号正文未能稳定抓取成功，因此这里先保存原始链接与基于标题的结构化摘要，方便后续补全。

已提取到的信息：

- 标题：Karpathy刚开源的autoresearch，我拿来优化龙虾skill，成功率从56%飙到92%
- 作者：猕猴桃
- 公众号：探索AGI
- 原文链接：https://mp.weixin.qq.com/s/2Daoh-4VQ6EVY1W_3o6hqQ

待后续补全重点：

1. autoresearch 的核心工作流是什么
2. 作者如何把它映射到 skill 优化过程
3. 成功率从 56% 提升到 92% 的评测口径是什么
4. 具体改动了哪些 prompt / tool routing / context engineering / fallback 机制
5. 哪些经验可迁移到 OpenClaw / Claude Code / Skills 设计中
