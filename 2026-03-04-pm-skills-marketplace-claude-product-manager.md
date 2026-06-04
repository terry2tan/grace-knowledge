---
title: PM Skills Marketplace：给产品经理的 AI OS，65 个 PM 技能 + 36 个工作流
date: 2026-03-04
source: x.com
url: https://x.com/PawelHuryn/status/2028989940546101328
type: article
tags: [AI, 工具, 产品管理]
---

# PM Skills Marketplace：给产品经理的 AI OS

**来源**: [@PawelHuryn](https://x.com/PawelHuryn/status/2028989940546101328)（Paweł Huryn）
**日期**: 2026-03-04
**GitHub**: https://github.com/phuryn/pm-skills
**原文**: https://x.com/i/article/2028898612235603968

---

## 简介

开源 MIT，专为 Claude Code 和 Cowork 设计，兼容其他 AI 助手。将 Teresa Torres、Marty Cagan、Alberto Savoia 等顶级 PM 方法论内置进日常工作流，**不只是快速生成文档，而是更好的产品决策**。

- **65 个 PM Skills**
- **36 个链式 Commands**
- **8 个 Plugins**

---

## 安装

**Claude Cowork**：Customize → Browse plugins → Personal → + → Add marketplace from GitHub → 输入 `phuryn/pm-skills`

**Claude Code（CLI）**：
```bash
npx skills add phuryn/pm-skills
```

**其他 AI 助手**：直接读取 `skills/*/SKILL.md` 文件（通用格式）

---

## 8 个插件一览

### 1. pm-product-discovery（13 Skills，5 Commands）
持续产品发现：创意头脑风暴、假设识别与优先级、Opportunity Solution Tree（Teresa Torres）、客户访谈脚本与分析

**核心 Commands**：
- `/discover` — 完整发现循环：创意→假设→优先级→实验设计
- `/brainstorm` — 多视角创意（PM/设计/工程）
- `/triage-requests` — 分析批量功能请求
- `/interview` — 准备访谈脚本或总结访谈记录
- `/setup-metrics` — 设计产品指标 Dashboard（北极星+输入指标）

### 2. pm-product-strategy（12 Skills，5 Commands）
战略：9节 Product Strategy Canvas、Lean Canvas、Business Model Canvas、定价策略、Porter 五力、PESTLE、Ansoff 矩阵

**核心 Commands**：
- `/strategy` — 完整 9 节产品战略画布
- `/business-model` — 探索商业模式（lean/full/startup/value-prop）
- `/market-scan` — SWOT + PESTLE + Porter + Ansoff 综合扫描
- `/pricing` — 定价策略+竞争分析+实验

### 3. pm-execution（15 Skills，10 Commands）
日常执行：PRD、OKR、路线图、Sprint、回顾、发布说明、Pre-mortem、利益相关者管理、用户故事

**核心 Commands**：
- `/write-prd` — 8 节 PRD 模板
- `/plan-okrs` — 团队级 OKR
- `/transform-roadmap` — 功能列表→结果导向路线图
- `/sprint plan/retro/release`
- `/pre-mortem` — Tigers/Paper Tigers/Elephants 风险分析
- `/write-stories user/job/wwa` — 用户故事拆解

### 4. pm-market-research（7 Skills，3 Commands）
用户研究与竞品分析：Personas、用户分群、客户旅程地图、TAM/SAM/SOM、竞品分析、情感分析

### 5. pm-data-analytics（3 Skills，3 Commands）
数据分析：SQL 生成（BigQuery/PostgreSQL/MySQL）、Cohort 分析、A/B 测试统计显著性

### 6. pm-go-to-market（6 Skills，3 Commands）
GTM：登陆细分市场、ICP、增长飞轮、GTM 运动评估、竞品 Battlecard

### 7. pm-marketing-growth（5 Skills，2 Commands）
产品营销：定位创意、价值主张话术、产品命名、北极星指标

### 8. pm-toolkit（4 Skills，5 Commands）
PM 工具箱：简历审查与定制、NDA 草稿、隐私政策（GDPR/CCPA）、文字校对

---

## 方法论来源

Teresa Torres（持续发现）、Marty Cagan（INSPIRED）、Alberto Savoia（精益预测）、Dan Olsen（精益产品）、Roger L. Martin（玩赢）、Ash Maurya（Running Lean）、Strategyzer（商业模式画布）、Christina Wodtke（OKR）、Anthony Ulwick（JTBD）、Sean Ellis（增长黑客）

---

**标签**: `AI` `工具` `产品管理` `Claude` `Skills` `开源`
