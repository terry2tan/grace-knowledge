---
title: Karpathy 引爆AI圈的LLM Wiki，我其实已经跑了三个月——于是我开源了
date: 2026-04-14
source: 微信公众号 / 榴莲的AI实验室
url: https://mp.weixin.qq.com/s/z-S-UZfS-U3Ff0Tg_z6TgQ
type: article
tags: [AI产品, 工具, 方法论]
---

## 摘要

这篇文章的价值不只是再次解读 Karpathy 的 LLM Wiki，而是给出了一套作者已经连续运行三个月的实战实现，并把它开源成了 Obsidian Brain OS。它把个人上下文系统拆成 nightly pipeline、personal ops、三层知识架构、Agent 团队、隐私分层和语义搜索几部分，重点强调“你的上下文资产”和“Agent 的灵魂”是两件互补但不同的事。对你来说，最有价值的是它把上下文工程从抽象概念落成了一套可运行的个人操作系统，尤其适合参考其对 conversation mining、knowledge amplification 和晨间驾驶舱这几条链路的设计。整体非常贴近你在做的知识库 / memory / harness 方向，是一篇高相关的系统实现样本。

## 全文

# Karpathy 引爆AI圈的LLM Wiki，我其实已经跑了三个月——于是我开源了

前两天刷到 Karpathy 发了一篇叫 LLM Wiki 的文章，当天几千 star。核心观点是：别再每次 RAG 检索了，让 LLM 帮你维护一个持久化的个人知识库，三层架构、自动摄入、定期审计，Obsidian 当前端。

作者说，自己其实从 1 月份就开始玩，2 月底认真打磨，把“存聊天记录”一步步做成了一整套系统：

- 每天凌晨自动跑知识整合
- 每天早上自动生成今日待办
- 每天晚上自动挖掘当天对话里的关键洞察

一直在用，直到 Karpathy 把底层逻辑用 LLM Wiki 这个框架抽象出来，作者才意识到两边想到了一起，于是决定把自己的系统开源，项目名叫 **Obsidian Brain OS**。

GitHub：<https://github.com/FairladyZ625/Obsidian-Brain-OS>

## 先看它能做什么

### 每天早上 7:00，生成“今日驾驶舱”

AI 每天凌晨读取你的 todo-backlog、承诺事项、决策队列，然后自动生成一份驾驶舱。你早上打开 Obsidian 扫一眼，就知道今天该干什么、催什么、不干什么。15:00 和 20:00 还会自动提醒你检查进展。

### 每天凌晨 2:00-4:00，跑三段自动流水线

你睡觉的时候系统在后台做三件事：

- **02:00 文章整合**：把白天标记的文章自动转成结构化知识卡片，建立领域索引和交叉引用
- **03:00 对话挖掘**：把当天与 AI 的聊天记录提炼成关键洞察、决策记录和研究种子
- **04:00 知识放大**：跨来源做交叉引用，把文章侧技术素材和对话侧战略定位连接起来，形成更强的“交叉信号”

如果信号足够重要，还会进一步调用 NotebookLM 做深度研究，把线索扩成完整报告。

### 知识图谱 / Canvas 每天自动生成

文章还展示了一个自动更新的全局知识图谱，把研究问题、文章笔记和知识卡片自动分组、连线，帮助你一眼看清知识全貌。

## 你每天产生的上下文，正在消失

作者强调：你每天和 AI 聊产品方向、设计决策、技术选型、项目复盘，有时候一个下午就能聊出几个关键判断。但关掉窗口之后，第二天一切从零开始。

不只是对话，读过的文章、做过的决策、犯过的错误、积累的经验，如果不被系统性收集和连接，就只是散落碎片。而真正的价值，不在单个碎片本身，而在它们被交叉引用、被连接之后产生的复利。

Karpathy 在 LLM Wiki 里引用了 Vannevar Bush 的 Memex 设想，作者借这个思路指出：上下文是每个人最重要的复利资产，而 LLM 终于解决了“谁来持续维护它”这个老问题。

## Agent 的灵魂和你的上下文，是两件事

这一段很值得记。作者把问题拆成两类：

- **Agent Memory**：Agent 自己的个性化记忆，让 AI 有灵魂、更像你的伙伴
- **你的上下文资产**：健康记录、工作决策、读过的文章、犯过的错、行业经验等，能让 Agent 真正懂你、成为数字分身

作者的判断是：龙虾类系统解决的是“怎么让 AI 有灵魂”，而 Brain OS 解决的是“怎么让你的上下文资产不丢失、不散落、还能持续增长”。一个是 Agent 侧的问题，一个是用户侧的问题，它们互补。

## 这套系统到底有什么

文章把 Brain OS 拆成几个主要模块：

### 1. Nightly Pipeline

核心是上面提到的三段夜间流水线，再加上 NotebookLM 深度研究。完全自动，每天凌晨运行。

### 2. Personal Ops

把 AI 当成“参谋长”。todo-backlog 丢进去，AI 帮你排优先级、生成每日驾驶舱、追踪承诺事项、管理决策队列，甚至还能自动生成周计划和月里程碑。

### 3. 三层知识架构

- **READING**：真正要读的内容
- **WORKING**：AI 的工作台，用户不需要直接看
- **SYSTEM**：流水线内部的自动处理层

通过物理隔离，避免高质量内容被中间产物淹没。

### 4. QMD 语义搜索

向量检索已经内置，可以直接用自然语言搜索整个知识库，不必记关键词。

### 5. Agent 团队

系统由多个 Agent 协作组成：

- 主 Agent 负责总编排
- Writer Agent 负责写入，保证格式一致
- Chronicle Agent 负责静默记录历史
- Review Agent 负责审计，定期检查知识库健康

### 6. 隐私分层

例如 `06-PERSONAL-DOCS` 默认不给 AI 碰，`07-WORK-CONTEXT` 可以让 AI 参考。作者强调，隐私的边界要由你自己控制。

### 7. Skills 体系

包含 7 个核心 Skill 和 18 个推荐 Skill，核心 skill 驱动 nightly pipeline 和 personal ops，推荐 skill 则来自社区中常用的 brainstorming、写作、深度研究、代码审计等工具。

## 怎么开始

作者给了一套让 Claude / Codex / Cursor / OpenClaw 等编程助手自动安装 Brain OS 的安装话术，并说明它自带一个安装向导 Skill。Agent 读完 skill 后会一步步问你 vault 放哪、叫什么、时区等，再帮你配置整个系统。

但作者也特别提醒了几个现实问题：

- 这不是下载即用的工具，需要你投入时间和 Agent 一起配置使用场景、定时任务和上下文结构
- 这套系统还很早期，还没经过非常完善的测试
- 这是一个活项目，作者每天都在继续迭代

文章还提到了一个建议的 MVP 路径：先从最简单的 INBOX + todo-backlog + morning brief 开始，用两周理解它的价值，再逐步加 nightly pipeline、conversation mining 和 knowledge amplification。

## 这篇文章真正有价值的地方

如果只把它看成“又一个 Obsidian + AI 项目”，会低估它。更准确地说，它是把 LLM Wiki 思路具象化成一套个人上下文操作系统：

- 不只是存储，而是**夜间持续编译**
- 不只是检索，而是**跨来源交叉放大**
- 不只是给 Agent 记忆，而是**给用户积累可复利的上下文资产**

对做知识库、memory、agent ops、personal harness 的人来说，这篇最值得参考的不是某个单点功能，而是它把 conversation mining、todo ops、nightly audit、知识放大和 Agent 团队编排成一整套系统的方式。

## 参考链接

- Karpathy LLM Wiki：<https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f>
- Obsidian Brain OS：<https://github.com/FairladyZ625/Obsidian-Brain-OS>
- MemPalace：<https://github.com/milla-jovovich/mempalace>
- Vannevar Bush《As We May Think》：<https://www.theatlantic.com/magazine/archive/1945/07/as-we-may-think/303881/>
