---
title: "装完Hermes Agent玩了一圈，我觉得龙虾已死！"
date: 2026-04-09
source: 微信公众号
url: https://mp.weixin.qq.com/s/TpH2wtXAOthbciA1m-5Spw
author: 探索AGI
type: article
tags: [AI产品, 工具, 技术]
---

## 摘要

这篇文章把 `Hermes Agent` 视为 OpenClaw 之后第一个值得认真关注的同类竞争者，原因不在“连了多少渠道”，而在它把 Skill 的沉淀、复用和更新也交给了 Agent 自己完成。作者认为，这相当于把 `AGENTS.md` 和 `harness engineering` 进一步自动化了：复杂任务执行完后，Agent 会把流程写成结构化 Skill 文档，下次直接复用，并在使用中持续迭代。文章还给出了 Hermes 的安装、模型配置、Telegram 网关和常驻运行方式，说明它已经具备很强的实操可用性。核心判断是：如果下一阶段的竞争焦点是 Agent 能否自我进化，而不只是接更多工具和渠道，那么 Hermes 押注的是更长线的学习闭环。

## 全文

原始链接：<https://mp.weixin.qq.com/s/TpH2wtXAOthbciA1m-5Spw>

公众号：探索AGI

作者：探索AGI

发布时间：2026-04-08 11:50

## 文章在讲什么

作者最近体验了 `Hermes Agent`，觉得它之所以势头很猛，不只是因为“又来了一个新的 Agent 框架”，而是它在设计上踩中了一个更关键的方向：

- 不只是让 Agent 调工具
- 不只是让 Agent 接渠道
- 而是让 Agent 把完成任务的方法，也自动沉淀成可复用的 Skill

作者的第一反应是：

`Hermes 在让 Agent 自己做 Harness Engineering。`

过去一段时间，围绕 Agent 的一个共识越来越明确：真正稀缺的能力，往往不在模型本身，而在模型之外的那套运行机制，包括：

- 规则
- 记忆
- evaluator
- 工具编排
- 反馈与迭代闭环

OpenAI 写 `AGENTS.md`，Stripe 写 `Blueprint`，Anthropic 强调 evaluator，本质上都在做同一件事：把人脑里的经验和判断写成外部约束，让 Agent 更稳定地工作。

而 Hermes 的不同点在于，它进一步把“写这些规则”也交给了 Agent。

## 1. Hermes 的核心设计：Agent 自己写 Skill

作者认为，Hermes 最有意思的地方不是单纯提供一个技能系统，而是这个技能系统的来源发生了变化。

当 Hermes 完成一个复杂任务，尤其是那种会经历多次工具调用、需要试错和修正的任务时，它会把整个过程总结成一份结构化的 Skill 文档，并存成 Markdown 文件，遵循 `agentskills.io` 的开放标准。

这意味着：

- 下次遇到类似任务时，不需要从零开始
- Agent 可以直接加载之前生成的 Skill
- 如果执行过程中发现更好的做法，还会继续更新这份 Skill

作者把它理解成：

- `AGENTS.md` 的自动化版本
- Harness 的自动沉淀机制
- Skill 的自举式进化

与之相比，OpenClaw 也有技能系统和技能市场，但它更偏向：

- 人来写 Skill
- 社区来贡献 Skill
- Agent 负责调用 Skill

而 Hermes 走的是另一条路线：

- Agent 写 Skill
- Agent 用 Skill
- Agent 改 Skill

作者认为，这就是 Hermes 能在 OpenClaw 之后迅速被关注的根本原因。两者在功能层面有很多重叠，但 Hermes 押注的是“Agent 自己进化”的可能性。

## 2. 怎么上手 Hermes

文章给出的安装非常直接，一行命令即可：

```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

安装完成后，先跑两个检查命令：

```bash
hermes version
hermes doctor
```

然后执行初始化向导：

```bash
hermes setup
```

模型提供方可以通过下面的命令交互式选择：

```bash
hermes model
```

作者提到，Hermes 支持：

- OpenRouter
- Nous Portal
- 任意 OpenAI 兼容端点

这意味着它的底层模型接入比较灵活，不被单一平台锁死。

## 3. Telegram 网关与实际体验

如果想快速把 Hermes 接到 Telegram，文章给出的步骤是：

1. 在 Telegram 中搜索 `@BotFather`
2. 创建一个 bot
3. 拿到 token
4. 在 Hermes 中完成网关配置

对应命令：

```bash
hermes gateway setup
hermes gateway
```

作者建议，配置完成后，不要只让它做过于简单的任务，而是直接给一个稍微复杂的问题，例如：

“帮我看一下 GitHub 现在 trending 的前 5 个项目，总结一下每个有什么意思。”

这种任务的意义在于：

- 有检索
- 有多次工具调用
- 有信息汇总
- 有结果压缩

如果任务足够复杂，执行结束后查看 Skill 目录：

```bash
ls ~/.hermes/skills/
```

理论上会新增一个 Markdown 文件。这份文件就是 Hermes 在执行过程中自动沉淀出来的 Skill。

## 4. 运行形态：更像一个长期在线的 Agent 进程

作者提到，Hermes 并不要求你做本地推理。它更像一个长期在线的 Agent 进程，负责：

- 维护终端状态
- 保存记忆
- 调用工具
- 通过 OpenAI 兼容 API 接入外部界面

例如它可以直接与 `Open WebUI` 对接。

如果想要 24/7 持续运行，则可以把 gateway 安装成 systemd 服务：

```bash
hermes gateway install
systemctl status hermes-gateway
```

作者的判断是，Hermes 跑在 VPS 上就已经够用了，不必执着于本地算力。

## 5. 回到 Harness Engineering：Hermes 在自动化什么

作者把 Hermes 的系统拆开，认为它实际上对应了 Harness 的几个核心构件：

- `Skills` = Agent 自己写的 `AGENTS.md`
- `记忆` = Agent 自己管理的上下文
- `审批` = Agent 的 evaluator 或安全边界
- `closed learning loop` = Harness 的自动反馈循环

这让文章回到了一个更大的判断：

Harness 的可能性空间不会缩小，只会随着模型和工具能力变化而不断迁移。每一代模型出现之后，都要重新判断哪些约束依旧需要人写，哪些已经可以交给 Agent 自己演化。

Hermes 的答案是：

`既然 Harness 需要持续演化，那就让 Agent 自己来做。`

## 6. Hermes 与 OpenClaw 怎么选

作者并没有简单地说 Hermes 一定会替代 OpenClaw，而是做了更细的区分。

如果你的目标更偏向：

- 多渠道平台
- 现成的技能市场
- 更成熟的生态

那么 OpenClaw 仍然更合适。

如果你更看重：

- Agent 的长期进化
- 任务执行后自动沉淀方法
- 系统随着使用不断变聪明

那么 Hermes 更值得尝试。

也就是说，两者的差异不只是“功能谁多谁少”，而是产品哲学不同：

- OpenClaw 更像“连接世界的 Agent 平台”
- Hermes 更像“会自己积累经验的 Agent 系统”

## 结尾观点

文章最后用一句很强的对照来总结：

- OpenClaw 让每个人都能养一只 AI
- Hermes 想让 AI 自己养自己

作者由此进一步推演：

如果未来 Agent 真的能自己写规则、自己管记忆、自己画出安全边界，那么 Harness Engineering 的终局，也许就不再是人类不断手工编写 Harness，而是 Harness 自己持续生成和更新自己。

## 参考资料

- 官方文档：<https://hermes-agent.nousresearch.com/docs/getting-started/quickstart>
