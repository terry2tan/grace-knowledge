---
title: "Anthropic分享Skills在Claude Code的最佳实践"
date: 2026-06-06
source: 微信公众号 (PaperAgent)
url: https://mp.weixin.qq.com/s/t7_DCP3Ig7hcrK7C8sRn4A
type: article
tags: [AI, AI产品, 工具]
---

## 摘要

Anthropic 内部跑了数百个 skill 后，得出一个反直觉结论：对 AI 编程助手输出质量影响最大的，不是教它写代码的 skill，而是教它验证代码的 skill。文章梳理了 skill 的九类分类、验证类 skill 为何回报最大，以及写 skill 的七条心法（不陈述显而易见的东西、gotchas 区信号密度最高、用文件系统做上下文工程、不要过度限制、设计好初始化、描述写给模型看、让 Claude 记住历史）。

## 全文

# Anthropic分享Skills在Claude Code的最佳实践

**Skill** 在 Claude Code 里已经被用得很泛了——markdown 文件、脚本文件夹、hook 配置，什么都叫 skill。但 **Anthropic** 内部真的跑了**几百个 skill** 之后，发现了一个反直觉的结论：**对 AI 编程助手输出质量影响最大的，不是教它写代码的 skill，而是教它验证代码的 skill。**

## Claude Code 的 skill 到底是什么

先澄清一个常见误解：skill 不是"一个 markdown 文件"，而是**一个文件夹**——里面可以有脚本、数据、模板、配置文件，agent 可以按需发现、读取和操作这些资源。`SKILL.md` 只是入口，它指向其他文件，Claude 在需要时才去读。

这本身就是一种上下文工程：不是把所有信息塞进一个文件，而是**渐进式披露**——告诉 agent "有哪些文件可用"，让它自己判断什么时候读哪个。

## 九类 skill：做分类不是为了好看，是为了不搞混 agent

Anthropic 把内部 skill 全部 catalog 之后，发现它们自然聚成了**九类**。最好的 skill 干净地属于其中一类；想什么都做的 skill 会跨好几类，然后 agent 就被搞晕了。

| 类别 | 一句话定义 | 典型例子 |
|------|-----------|---------|
| 库和 API 参考 | 教 agent 正确使用内部库/CLI/SDK | `billing-lib`、`internal-platform-cli` |
| **产品验证** | **教 agent 怎么测试/验证代码是否工作** | `signup-flow-driver`、`checkout-verifier` |
| 数据获取与分析 | 连接数据栈，提供查询路径 | `funnel-query`、`datadog` |
| 业务流程自动化 | 把重复工作流压成一条命令 | `standup-post`、`weekly-recap` |
| 代码脚手架 | 生成框架模板和样板代码 | `new-migration`、`create-app` |
| 代码质量与审查 | 强制代码风格、审查流程 | `adversarial-review`、`code-style` |
| CI/CD 与部署 | 推代码、部署、监控 PR | `babysit-pr`、`deploy-` |
| 运维手册 | 拿症状→多工具排查→结构化报告 | `oncall-runner`、`log-correlator` |
| 基础设施操作 | 日常维护，带破坏性操作的护栏 | `-orphans`、`cost-investigation` |

## 第二类才是关键：验证 skill 的回报最大

原文说得很直白：**Verification skills have had the most measurable impact on Claude's output quality internally.** 内部对 Claude 输出质量影响最可衡量、最显著的，就是验证类 skill。

甚至说——**值得让一个工程师花一整周只把验证 skill 做好**。

为什么？因为 AI 写完代码后的自我验证是最弱的环节。你不能指望它"感觉代码没问题"，你需要的是：用 headless browser 跑一遍注册流程、在每个步骤断言状态、用 Stripe 测试卡走完支付、在 TTY 里验证 CLI 交互。这些不是 agent 自己能猜出来的，必须写进 skill。

## 写 skill 的七条心法

### 1. 不要陈述显而易见的东西

Claude 已经会写代码、会读代码库。一个 skill 如果只是在重复 Claude 默认就会做的事，只增加了上下文开销，没有增加价值。**重点放在那些把 Claude 推出默认思维的信息上。** 比如 frontend-design skill 专门纠正 Claude 的"审美惯性"——避免 Inter 字体和紫色渐变。

### 2. gotchas 区才是信号密度最高的部分

整篇实践里最值钱的结论之一：**gotchas 区是任何 skill 里信号密度最高的内容。** 这些都是从 agent 反复踩坑里攒出来的——

- "`subscriptions` 表是 append-only，你要的行是版本号最高的那条，不是 `created_at` 最新的"
- "API 网关里这个字段叫 `@request_id`，计费服务里叫 `trace_id`，其实是同一个值"
- "Staging 环境返回 200 不代表 Stripe webhook 真处理了，查 `payment_events` 才是真实状态"

这些坑，agent 不可能自己想到。写下来，就是 skill 最核心的价值。

### 3. 把文件系统当上下文工程用

`SKILL.md` 不需要塞满所有内容。它指向其他文件——`references/api.md` 放详细签名、`assets/` 放输出模板、`scripts/` 放辅助脚本。**告诉 Claude 有哪些文件，让它按需读取。** 这比把一切写进一个超长 markdown 要高效得多。

### 4. 不要把 Claude 钉死

Claude 会尽量遵守你的指令。但 skill 是会被反复复用的，**写得太具体反而有害**。给信息，但也给灵活性。比如不要写"必须先做 A 再做 B 再做 C"，而是说"通常先做 A 效果较好，但请根据具体情况判断"。

### 5. 想清楚初始化

有些 skill 需要用户配置——比如往哪个 Slack 频道发 standup。好做法是用 `config.json` 存配置，如果没配好就让 agent 主动问用户。如果你想让 agent 提供结构化选项，可以用 `AskUserQuestion` 工具。

### 6. 描述是写给模型看的，不是给人看的

Claude Code 启动时会列出所有 skill 的 description。**这个 description 不是摘要，而是触发条件。** 要写的是"什么时候该用这个 skill"，不是"这个 skill 是什么"。

比如 `babysit-pr` 的描述里要包含"babysit"这个触发词，这样当用户说"babysit my PR"时 Claude 才能匹配上。

### 7. 让 Claude 记住

skill 可以内置记忆——最简单的形式是一个 append-only 文本日志。比如 `standup-post` 每次发完 standup 就往 `standups.log` 里追记，下次运行时 Claude 就能看到上次发了什么，只输出增量。

## 两个按需 hook 的妙用

skill 可以注册只在 skill 被调用时才激活的 hook，用完即关：

- **/careful**——拦截 `rm -rf`、`DROP TABLE`、`force-push`、`kubectl delete`。碰生产环境时才开，常开人会疯。
- **/freeze**——只允许在指定目录里 Edit/Write。调试时想加日志又忍不住顺手"修"别的代码，这个 hook 能管住手。

## 分发和度量

skill 有两种分发路径：**小团队直接提交到 repo 的 .claude/skills 目录；规模大了之后走内部 Plugin Marketplace。** repo 内嵌的问题是每个 skill 都增加模型上下文开销，marketplace 让团队按需安装。

Anthropic 内部不做中心化审批，而是**自然生长**：有人想分享就放到 sandbox，在 Slack 里吆喝；有了 traction 再 PR 进 marketplace。

度量方式也简单——用 `PreToolUse` hook 记录 skill 使用日志，找出哪些热门、哪些该触发却没触发。

## 这意味着什么

**对任何在用 AI 编程工具的人来说，这篇的核心信息是：你花在"教 AI 验证代码"上的时间，比花在"教 AI 写代码"上更值钱。** AI 自己能学会写代码，但它不知道你的 `subscriptions` 表是 append-only，不知道 `@request_id` 和 `trace_id` 是同一回事，不知道 staging 的 200 可能是假的。这些坑只有你能告诉它——而 gotchas 区，就是性价比最高的投入点。

从一两行和一个坑开始，有人踩新坑就往里加，最好的 skill 都是这样长出来的。

---

**原文链接：** https://claude.com/blog/lessons-from-building-claude-code-how-we-use-skills
