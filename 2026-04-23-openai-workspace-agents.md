---
title: OpenAI 发布 Workspace Agents，接替 GPTs
date: 2026-04-23
source: 微信公众号 / 赛博禅心
url: https://mp.weixin.qq.com/s/x-4v6WAZmohanfXluz8TIw
type: article
tags: [AI产品, 商业, 工具]
---

## 摘要

这篇文章梳理了 OpenAI 新发布的 Workspace Agents，本质上是把原本偏单人、一次性、配置式的 GPTs，升级成团队共享、可持续运行、带治理和记忆的业务 Agent。它的关键信号不是“又一个 Agent 产品”，而是 OpenAI 正正式把 Codex 运行时抬进 ChatGPT 主界面，向企业工作流渗透。
最值得关注的点有三个：第一，官方直接把 Workspace Agents 定义为 GPTs 的进化形态，且后续会提供一键迁移，等于宣告 GPTs 这条产品线进入退场阶段；第二，典型场景集中在 IT、产品反馈、财务、销售、风控这些 SOP 明确但系统分散的团队流程；第三，定价从席位逻辑转向 credit/token 消耗逻辑，这很可能会成为企业 AI 采购的新主线。
对你来说，这篇值得收，因为它不是单纯产品新闻，而是在补一块 Agent 行业版图：OpenAI 也开始从“个人对话工具”转向“团队级操作层”，和 Claude Code、OpenClaw、Hermes 这条线已经开始正面汇合。

## 全文

# OpenAI 发布 Workspace Agents，接替 GPTs

OpenAI 新发布的 **Workspace Agents**，可以理解为面向团队的持久化业务 Agent。官方定位很明确：它是 **GPTs 的进化形态**，底层运行时则是 **Codex**。

文章指出，这其实就是此前被爆料的 Hermes 代号产品，面向 ChatGPT Business、Enterprise、Edu、Teachers 套餐用户开放。

## GPTs 正在退场，Workspace Agents 接棒

文章最关键的判断之一是：OpenAI 已经在产品叙事上把 GPTs 的结局写进去了。

按照作者的总结，三代产品大致是：

- **GPTs（2023）**：prompt + 知识库 + Actions，一次性配置，偏单人使用，没有真正长流程执行能力
- **ChatGPT Agent（2025）**：单用户、一次性任务执行，完成即走，没有持久身份
- **Workspace Agents（2026）**：团队共享、持久运行、有记忆、按流程工作，并带治理能力

也就是说，OpenAI 正在从“个人定制机器人”走向“团队工作流 Agent”。

## 五个官方案例，几乎全是业务流程而不是写代码

OpenAI 官方给出的案例，没有一个主打写代码，而是全部落在企业内部高频、重复、跨系统的工作上：

1. **Software Reviewer**：软件采购请求审查与 IT 工单流转
2. **Product Feedback Router**：收集反馈、分类、打优先级、转 ticket、生成周总结
3. **Weekly Metrics Reporter**：每周自动拉数据、制图、写周报
4. **Lead Outreach Agent**：销售线索研究、打分、起草跟进邮件、更新 CRM
5. **Third-Party Risk Manager**：第三方风险筛查与结构化报告输出

这说明 Workspace Agents 主要瞄准的是：

- SOP 比较清楚
- 数据分散在多个 SaaS
- 人工重复成本高
- 适合交给 Agent 常驻执行

## Codex 成了业务 Agent 的运行时

Workspace Agents 运行在 Codex 之上。每个 Agent 背后有自己的云端工作空间，具备：

- 文件系统
- 代码执行环境
- 连接的应用
- 记忆能力
- 跨多步持续执行能力

也就是说，Codex 不再只是开发者工具，而开始变成更通用的 Agent runtime。

OpenAI 过去一年已经在扩 Codex 的边界：CLI、IDE 扩展、桌面端、几乎万用的 Codex 运行时。现在，Workspace Agents 进一步把这套运行时抬进 ChatGPT 主界面，让销售、财务、IT、市场这些部门也可以直接用。

## 部署从 ChatGPT 扩展到 Slack

目前 Workspace Agents 有两个主要部署面：

- 在 ChatGPT 中对话使用
- 拉进 Slack 频道参与流程

特别是 Slack 这一点很重要，因为它意味着 Agent 不再只是一个私人工具，而是开始进入团队协作现场，成为组织内的工作节点。

## 治理与控制，是团队 Agent 的必要条件

文章还梳理了 Workspace Agents 的四层治理能力：

1. **工具与数据访问控制**：定义 Agent 能访问什么
2. **敏感操作 approval**：编辑表格、发邮件、加日历等可要求先审批
3. **admin RBAC**：管理员控制谁能搭、谁能用、谁能共享
4. **prompt injection 防护**：限制 Agent 被外部恶意内容带偏

此外，管理员还可通过 Compliance API 查看配置、更新记录、运行情况，必要时直接挂起 Agent。

这很关键，因为团队级 Agent 一旦进入真实业务，治理、审计和权限就不再是附加功能，而是产品成立的前提。

## 一个更大的行业信号：企业 AI 采购逻辑正在变化

文章最后提到一个很值得关注的变化：Workspace Agents 在研究预览期内免费，到 2026 年 5 月 6 日之后将采用 **credit-based pricing**。

这意味着企业 AI 的采购逻辑正在从：

- 给多少人开通席位

转向：

- 跑了多少 token
- 带来了多少业务产出

也就是说，未来企业评估 AI 的方式，会越来越接近“产出 / 消耗”的运营逻辑，而不是传统 SaaS 的座位费逻辑。

## 结论

这篇文章的真正价值，不只是告诉你 OpenAI 发了一个新产品，而是补上了一块行业结构图：

- GPTs 这类轻量配置式产品正在退场
- Codex 正在升级为通用 Agent runtime
- OpenAI 开始正式切入团队级工作流 Agent
- 企业 AI 的竞争重点正转向治理、运行时、工作流和计费模型

从这个角度看，Workspace Agents 并不是孤立发布，而是 OpenAI 正在和 Claude Code、OpenClaw、Hermes 这类产品路线汇合。
