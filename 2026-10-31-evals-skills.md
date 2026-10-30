---
title: evals-skills：教 AI Agent 帮你做产品级 Eval 的 9 个 Skill
date: 2026-10-31
source: github.com
url: https://github.com/ai-evals-course/evals-skills
type: repo
tags: [AI产品, 工具]
---

## 摘要

AI Evals Course（Hamel Husain / Shreya Rajpal / Parlance Labs）官方出的 eval skill 集，1.6k 星。定位是**产品特定的 AI eval**（非基础模型 benchmark），把他们在 50+ 公司咨询和课程教学中见到的常见踩坑固化为 agent skill。9 个 skill：`evals-start`（入口路由）、`eval-audit`（审计现有 eval pipeline，按严重度排优先级）、`error-discovery`（最核心：给一个 JSONL/CSV 的 LLM 输出或 trace 文件，agent 读懂数据类型 → 按 Gestalt 原则设计可视化编码 → 起一个单文件 HTML 审查 app（Python stdlib 服务，零依赖）→ 聚类选多样本 → 交互循环：监听你的自由文本批注、归类失败模式、补采样填覆盖缺口）、`generate-synthetic-data`（维度元组生成多样测试输入）、`write-code-eval`（客观失败模式的代码检查）、`write-judge-prompt`（主观质量的 LLM-as-Judge）、`validate-evaluator`（用人工标注校准 judge：数据切分、TPR/TNR、偏差修正）、`evaluate-rag`、`build-review-interface`。核心方法论：**先做 error discovery（定性+定量分析 trace 找失败模式），再写 eval**——顺序反了就是白做。

## 全文

# Eval Skills

Skills that guide AI coding agents to help you build product-specific AI evals (not foundation model benchmarks).

这些 skill 防范在帮助 50+ 公司和教授数千名学生过程中见到的常见 eval 踩坑。参考：hamel.dev 的 evals 系列笔记。

## Why skills for evals

Eval 有很多可以轻松避免的 footgun（见 Hamel 的《Revenge of the Eval》相关博文）。

**evals-start** 是入口：看你的处境并路由到合适的 skill。大多数时候会指向两个之一：

- **eval-audit**：已有 eval pipeline 时，检查配置并给出下一步建议。
- **error-discovery**：有 trace 但还没分析时，构建标注界面并帮你采样 trace。

## 安装

```bash
npx skills add https://github.com/ai-evals-course/evals-skills
# 只装单个 skill
npx skills add https://github.com/ai-evals-course/evals-skills --skill error-discovery
# 更新
npx skills check && npx skills update
```

## 九个 skill

| Skill | 作用 |
|-------|------|
| evals-start | 入口，按处境路由 |
| eval-audit | 审计 eval pipeline，按严重度排优先级 |
| error-discovery | 构建审查 app，选多样本，把笔记整理成失败模式 |
| generate-synthetic-data | 用维度元组生成多样合成测试输入 |
| write-code-eval | 为客观失败模式写代码检查 |
| write-judge-prompt | 为主观质量设计 LLM-as-Judge 评估器 |
| validate-evaluator | 用人工标注校准 LLM judge：数据切分、TPR/TNR、偏差修正 |
| evaluate-rag | 评估 RAG 的检索与生成质量 |
| build-review-interface | 为人工 trace 审查构建定制标注界面 |

## error-discovery skill（最核心）

Error discovery = 对 trace 做定性+定量分析找出失败模式。**只有做完这一步才应该写 eval。**

把 agent 指向一个 JSONL/CSV/JSON 的 LLM 输出或 trace 文件，它会：

1. 读取数据集，判断内容类型（文章、agent trace、代码、结构化输出等）。
2. 根据数据中什么在变化设计视觉编码，用 Gestalt 原则（类别用颜色、层级用间距、重要性用透明度）。
3. 构建一个由 Python stdlib 服务器托管的单文件 HTML 审查 app，零依赖。
4. 聚类数据并挑选多样的初始样本（聚类代表 + 随机抽取）。
5. 跑交互循环：监听批注、归类失败模式、提出新样本以增加覆盖。

你阅读并留自由文本笔记；agent 把笔记整理成失败模式、跟踪覆盖率、挑新样本填补缺口。

用法：装好后直接说 "Can you help me do error analysis on traces.jsonl?"

## 写自己的 skill

这些 skill 处理跨项目的 eval 工作；从这里开始，然后为自己的数据和领域写 skill。推荐 Matt Pocock 的 writing-for-agents skill 学习如何给 agent 写指令。

课程（Maven: parlance-labs/evals）还覆盖生产监控、回归套件、成本等。

## 相关链接

- Hamel 的 evals 笔记：https://hamel.dev/notes/llm/evals/
- error-discovery 演示视频：https://youtu.be/tqUDjc1HzO4
