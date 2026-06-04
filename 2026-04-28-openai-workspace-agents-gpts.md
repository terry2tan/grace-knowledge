---
title: OpenAI 发布 Workspace Agents，接替 GPTs
date: 2026-04-28
source: 微信公众号 / 赛博禅心
url: https://mp.weixin.qq.com/s/x-4v6WAZmohanfXluz8TIw
type: article
tags: [AI产品, 工具, 商业]
---

## 摘要

这篇文章梳理了 OpenAI 新发布的 Workspace Agents，本质上是把 GPTs 升级成面向团队的、可持续运行的业务 Agent，底层运行时是 Codex。相比过去一次性、偏个人使用的 GPTs 和单次执行的 ChatGPT Agent，它强调团队共享、长期记忆、流程执行和治理能力。文中最值得关注的是三个变化：部署入口直接进 ChatGPT 和 Slack，控制层引入审批、RBAC 和合规 API，计费模式从席位制逐步转向按 credit 消耗计费。对关注 Agent 工作流和组织级 AI 落地的人来说，这篇的价值不在“又发了个新产品”，而在它说明 OpenAI 正把 Agent 从个人玩具推进成企业流程基础设施。

## 全文

# OpenAI 发布 Workspace Agents，接替 GPTs

今天凌晨，OpenAI 发布了 **Workspace Agents**，基于 Codex 的团队级工作空间 Agent。

这个东西，就是 21 号被 TestingCatalog 爆出的 `Hermes` 代号产品，面向企业市场，对 ChatGPT Business、Enterprise、Edu、Teachers 这四个套餐的订阅用户开放。

官方入口：`openai.com/index/introducing-workspace-agents-in-chatgpt`

OpenAI 给 Workspace Agents 的定位是 an evolution of GPTs，也就是 GPTs 的进化形态。同时也明确提到，后续会提供一键迁移到 workspace agents 的通道，这基本等于 GPTs 正在被替代。

## 是什么

Workspace Agents 可以理解为团队形态的 Agent。一个人把团队里反复做的工作流描述给 ChatGPT，ChatGPT 就会帮忙搭成一个 Agent，然后整个团队可以在 ChatGPT 或 Slack 里用它，一边用一边改，越用越准。

对比之前几代产品，大致可以概括为：

- **GPTs（2023 年 11 月）**：prompt + 知识库 + Actions，一次性配置，偏单人使用，没有真正的长流程执行能力。
- **ChatGPT Agent（2025 年 7 月）**：单用户、一次性任务执行，做完即走，没有持久身份。
- **Workspace Agents（2026 年 4 月）**：团队共享，持久运行，有记忆，按流程工作，带治理。

## 五个官方案例

OpenAI 官方展示了五个 demo，几乎都不是写代码，而是典型企业内部流程自动化：

### Software Reviewer，软件请求分流 Agent

审查员工发起的软件采购请求，对照白名单和政策，推荐下一步，必要时直接开 IT ticket。

### Product Feedback Router，产品反馈路由 Agent

监听 Slack、工单系统、公开渠道的反馈，分类、打优先级，转成 ticket，并每周生成产品反馈小结。

### Weekly Metrics Reporter，周报 Agent

每周五自动拉数据、画图、写叙述段落，把周报交给团队。

### Lead Outreach Agent，销售线索 Agent

对入站线索做背调、按规则评级、起草个性化跟进邮件、更新 CRM。

### Third-Party Risk Manager，第三方风控 Agent

对供应商做制裁名单、财务健康、舆情风险筛查，输出结构化报告。

这几个案例覆盖 IT、产品、财务、销售、风控五个部门，特点都很一致：重复性高、SOP 明确、数据散落在多个系统中。

此外，OpenAI 还提供 finance、sales、marketing 等方向的预置模板库，降低从零搭建的门槛。

## Codex，业务 Agent 的运行时

Workspace Agents 底层运行时是 Codex。每个 Agent 都有一个云端工作空间，里面包含文件系统、代码执行环境、连接的 app 和持久记忆。

这套能力主要包括：

- 写代码、跑代码
- 调用连接的 app（Gmail、GitHub、Google Drive、Slack 等，走 ChatGPT Connectors）
- 记住之前学到的东西
- 跨多步持续执行，而不是每一步都重新唤醒

过去一年，Codex 的存在感一直在扩张，从 Codex CLI 到 IDE extension，再到 macOS app、Windows app，以及 4 月 16 日的 `Codex for (almost) everything`。现在，Workspace Agents 相当于把 Codex 正式抬进了 ChatGPT 主界面，给销售、财务、IT、市场这些非工程团队直接使用。

## 部署：ChatGPT 和 Slack

Workspace Agents 目前主要有两种部署方式：

- 在 ChatGPT 里直接对话
- 在 Slack 里把 Agent 拉进频道

Slack 里的 Agent 能跟着上下文回复消息、处理请求、推进工作流。

文章里提到，OpenAI 内部销售团队已经在用一个 Agent，把通话记录和账户调研拼起来、给线索打分、在销售邮箱里直接起草跟进邮件。财务团队也在用 Agent 做月结、准备分录、做资产负债表对账和差异分析，并附带底稿供复核。

从竞争态势看，这明显是在追赶 Anthropic 之前把 Claude Cowork 推到桌面端和多终端协作的节奏。OpenAI 的生态目前不一定更强，但推进速度很快。

## 控制与治理

团队级 Agent 真正落地，关键不是“能不能做”，而是“谁能用、能动什么、做到哪一步要停下来问人”。

Workspace Agents 的控制大致分四层：

1. **工具与数据访问**：每个 Agent 能访问哪些工具和数据源，在搭建时就配置好。
2. **敏感操作 approval**：比如编辑表格、发邮件、加日历事件等，可以设置先征求用户同意。
3. **admin RBAC**：Enterprise 和 Edu 管理员可控制谁能用、谁能搭、谁能共享，以及哪些 connected tools 开给哪些 user group。
4. **Prompt injection 防护**：对外部内容里的对抗指令设置护栏，避免 Agent 被带偏。

上线后，搭建者能看到运行次数、活跃用户、趋势等分析；管理员则能通过 Compliance API 查看 Agent 配置、更新记录和每次运行，并在必要时直接挂起 Agent。后续 OpenAI 还会在 admin console 里增加组织级全局视图。

## 一个重要信号：非工程岗位也能搭团队 Agent

文章引用了 Rippling 的案例。Rippling 的 AI Engineering 负责人提到，真正难的从来不是模型本身，而是集成、记忆、交互体验这些“脚手架”。Workspace Agents 把脚手架打包之后，一个 Sales Consultant 就能自己搭出面向整个销售团队的 Sales Opportunity Agent，而不需要工程团队介入。

这说明 OpenAI 想讲的故事不是“更强的聊天机器人”，而是“非技术岗位也能直接生产团队级 Agent，并让它长期服务组织流程”。

## 定价与下一步

研究预览期到 2026 年 5 月 6 日之前，workspace agents 免费。5 月 6 日之后开始走 **credit-based pricing**。

同一天，OpenAI 也给 Enterprise plan 推了 flexible pricing 的 credit pool，workspace agents 从这个池子里扣量。企业 AI 的预算模型，正从“开多少席位”逐步切换到“消耗多少 token / credit，产出多少业务价值”。

OpenAI 给出的后续路线包括：

- **Triggers**：由事件自动触发，不只是时间表触发
- **更好的 dashboard**：帮助搭建者持续优化 Agent
- **更多业务工具 actions**：在更多 SaaS 里执行动作
- **Codex app 支持**：workspace agents 进入 Codex 桌面应用

## 值得怎么理解

这篇最重要的信号，不是 GPTs 下线本身，而是 OpenAI 正把 Agent 产品重心从“个人定制助手”切到“组织流程基础设施”。

如果你关心 AI Agent、工作流编排、上下文工程和企业内部自动化，这篇是值得收的。它补上了一个很关键的判断：下一阶段的竞争，已经不是谁能做出一个会聊天的 Agent，而是谁能把 Agent 做成可部署、可治理、可审计、可计费的组织生产系统。
