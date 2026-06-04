---
title: 同一个Claude Opus，换个壳差4.5分——2026最被低估的agent设计约束
date: 2026-05-07
source: 微信公众号 / 深思SenseAI
url: https://mp.weixin.qq.com/s/TTe7IY_pjAuv4zA9krlYrQ
type: article
tags: [AI产品, 工具, 方法论]
---

## 摘要

这篇文章最值得看的地方，不是再讲一遍 harness 很重要，而是把 **Model-Harness-Fit** 具体拆到了协议、工具、skill、记忆引用和模型切换成本这些“字节级约束”上。核心增量是：同一模型换不同壳，性能差异可以大到 4.5 分，说明 agent 能力并不只在权重里，也被 post-training 时绑定的 runtime 协议深度塑形。对你更有价值的是它把 Codex、Claude Code、Copilot CLI 三套壳放到一起比较，明确展示了为什么“模型可插拔”在 agent 时代往往只是表面成立。相比知识库里之前那些偏宏观的 harness 文章，这篇新意在于把问题落到了具体 wire format、patch 格式、subagent 动词、memory citation tag 和 tool schema 层。

## 全文

# 同一个Claude Opus，换个壳差4.5分——2026最被低估的agent设计约束

Original

深思圈

*2026年5月6日 17:10*

我最近看到一条很反直觉的事实：同一个 **Claude Opus 4.6**，配 ForgeCode 能跑到 79.8 分，配 Capy 只有 75.3 分。权重一模一样，一个 byte 都没改，分数差了 4.5 个点。

在 Terminal-Bench 2.0 这种每 0.1 分都在死磕的榜上，4.5 分是一个代差。

更离谱的是 Cursor 团队——**同一个模型，没换权重，只改壳，榜单排名从 Top 30 冲到 Top 5**。一跳 25 位。

Nicolas Bustamante 这篇长文把这件事讲透了。他把 Codex、Claude Code、GitHub Copilot CLI 三个 agent 的内部实现扒了个干净，得出一个结论：**模型不是单独存在的，壳是模型的一部分**。

他给这件事起了个名字，叫 **Model-Harness-Fit**——模型和壳的匹配度。

## 01 先看一个让人不舒服的榜单

Nicolas 贴了 2026 年 4 月 30 日的 Terminal-Bench 2.0 前十名：

> Codex + GPT-5.5 → 82.0%
> ForgeCode + GPT-5.4 → 81.8%
> TongAgents + Gemini 3.1 Pro → 80.2%
> ForgeCode + Claude Opus 4.6 → 79.8%
> ...
> Capy + Claude Opus 4.6 → 75.3%

两件事特别扎眼。

第一，**同一个 Claude Opus 4.6，配 ForgeCode 是 79.8，配 Capy 是 75.3**。4.5 分的差距。

第二，榜单上没有一个模型作者独占前列。**ForgeCode 是第三方壳，占了前六名的三个席位**。斯坦福 IRIS Lab 搞了个叫 Meta-Harness 的自动壳进化系统，把 Opus 4.6 在同一个榜上从基线推到了 76.4 分。

换句话说，**这一年壳带来的分数，比模型升级带来的分数还多**。

LangChain 的 Vivek Trivedy 说得最直白：

> Opus 4.6 跑在 Claude Code 里，分数明显低于 Opus 4.6 跑在其他 harness 里。

Anthropic 的旗舰模型，装在 Anthropic 自己的旗舰壳里，打不过装在第三方壳里的同一批权重。你光看模型的 spec sheet，根本预测不出这个结果。

## 02 为什么会这样

Nicolas 的核心判断是：**模型不是只针对 API 做 post-training 的，它是针对壳做 post-training 的**。

壳里的每一个细节——工具叫什么名字、输入 schema 长什么样、引用标签怎么写、skill 文件放哪里、计划协议什么格式——这些都不是模型的通用能力，**它们是 byte 级别的约定，被烤进了 post-training**。你把模型拖出它的壳，性能的损耗是你再也拿不回来的。除非你把另一边也重写一遍。

这就是为什么每个号称 "model agnostic" 的 agent 都碰过同一堵墙——**你没法就这么换个模型**。

要干净地换模型，你得把壳也一起换掉：工具面、schema 形状、skill 里点名调哪些工具的主体、引用契约、记忆仪式、system prompt 结构，有时连 planning 协议都得换。

壳之上的所有东西，都得跟着模型一起动。

## 03 三个壳，三种合约

Nicolas 扒了三个开源/半开源的 agent 实现。结果是：**它们不是同一个东西的三种写法，它们是三种完全不同的协议**。

**Codex** 走的是 typed asynchronous protocol。模型发出一个 Submission，拿回一串 typed Event。模型被训练成“发 submission、读 event”的思维模式。

**Claude Code** 走的是 direct typed conversation loop。每轮吃一个事件流。模型被训练成在 assistant message 里直接打出工具调用，下一轮接上 tool result。

**GitHub Copilot CLI** 走的是 supervisor protocol。host 不跑 agent loop，而是 spawn 一个子进程，用 vscode-jsonrpc 走 stdio，agent loop 跑在子进程里。

结论不是“实现不同”，而是**模型面对的是不同 wire protocol**。错配通常不会直接报错，而会变成安静退化：漏工具调用、计划强度不对、压缩时机不对、引用标签不被壳解析。

## 04 工具表：模型的方言

表面上看，read、write、bash、grep、glob 这些工具很像，但一旦深入就会发散。

Codex 有自己的 `apply_patch`；Claude Code 的编辑更像字符串替换；多 agent 调度上，Codex 是一组动词，Claude Code 倾向单一 `Agent` 语义，Copilot CLI 又是另一套 read_agent / write_agent / task。

Cursor 团队的结论很关键：**OpenAI 模型习惯 patch 格式编辑，Anthropic 模型习惯字符串替换。两个模型都能学会对方的格式，但会多花推理 token，错误率也更高。**

也就是说，工具不是中性的 API 面，而是模型的“方言”。

## 05 Skill 不是 markdown，而是隐式契约

三个壳都能读 `SKILL.md`，看起来像通用标准，但真正的问题在于 **skill body 默认假设了哪些工具存在**。

如果一个 skill 写着：

1. 调 TodoWrite 写三个子任务。
2. 用 Agent 派 subagent。
3. 用 Bash 验证后 claim done。

那它在 Claude Code 里可能完美工作；到了 Codex，TodoWrite / Agent / Bash 的语义都不再一一对应；到了 Copilot CLI，会进一步碎裂。

所以“大家都支持 SKILL.md”很容易误导。**格式可以兼容，行为契约不兼容。**

## 06 记忆层：最密集的碰撞面

文章最有价值的一段，在我看来是记忆系统比较。

**Codex**：延迟批量写，两阶段流水线，严格 JSON schema，引用依赖 `<oai-mem-citation>` 标签。

**Claude Code**：同步 live write，每条记忆一个 `.md` 文件，`MEMORY.md` 常驻索引，按需 read，并在读取时通过 system reminder 做“已过期需验证”提醒。

**Copilot CLI**：服务端记忆，有专门的 `store_memory` 工具，读写和衰减更多在后端完成。

跨壳错配的后果也很具体：
- Codex 训练出来的模型进 Claude Code，会继续吐 citation tag，但壳不解析；
- Claude 训练出来的模型进 Codex，不会吐 citation tag，于是 usage_count 长期为 0，好记忆会被当成没用的记忆淘汰。

这说明记忆不只是“存哪里”，而是**模型如何引用、壳如何奖励、系统如何衰减**的一整套闭环。

## 07 一个 XML tag 就能让系统腐烂

`<oai-mem-citation>` 是全文里很传神的例子。

在 Codex 里，模型每次用完记忆都挂一个 XML 块，壳会解析它，并更新 usage_count / last_usage。这个小契约决定了哪些记忆能活下来。

Claude Code 不需要这一层，因为“读记忆”本身就是显式信号。

把两个系统混起来，就会出问题：
- Codex 模型进 Claude Code：用户可能直接看到一串裸 XML。
- Claude 模型进 Codex：被频繁使用的记忆看起来像从未被引用，最终被衰减掉。

非常小的协议差异，会造成长期系统质量退化。

## 08 Copilot CLI 的诚实做法

Copilot CLI 比较有意思，因为它明确尝试做跨模型路由，但不是用“统一公约数”硬接所有模型，而是承认不同模型需要不同工具面。

文章提到的三种做法：
- **per-model 工具包含**：例如 Codex 家族才加载 patch toolchain。
- **per-model 工具搜索**：Claude 系才启用某些 deferred tool loading 模式。
- **Critic agent 用互补模型**：把不同模型放在互补角色上，而不是同一个 loop 上硬切。

这其实是比较诚实的产品策略：**不是 pretending model-agnostic，而是 model-aware routing。**

## 09 为什么中途切模型代价很高

文中提到三类隐藏成本：

1. **对话历史 out of distribution**：前一个模型留下来的 transcript 是另一种“方言”。
2. **prompt cache 断掉**：provider × model 绑定的缓存失效。
3. **工具表形状变化**：subagent、patch、memory 引用全可能换协议。

因此更干净的做法通常不是在主会话里切模型，而是**派一个 subagent 用另一模型开新上下文**。

这个判断对多 agent 工作流设计很有现实意义。

## 10 对我们的意义

文章最后的结论很扎实：

- **对 agent 平台**：选壳和选模型，本质上是在选一个组合产品。
- **对模型实验室**：壳不是基础设施，而是产品战略的一部分。
- **对用户/开发者**：换模型的真实成本，比“API 兼容”看起来高得多。

还有一个很重要的延伸：**matched pair 不是静态的**。随着模型变强，旧 harness 里很多脚手架会过期，必须删掉。不是越加越多，而是经常要重做减法。

所以这篇文章真正的新意，不是“harness 很重要”，而是把问题推进到了：

> agent 能力是 post-training 与 runtime 联合塑形的结果；
> 模型权重相同，不代表 agent 行为相同；
> 真正该优化的是 matched pair，而不是孤立优化模型或孤立优化壳。

## 相关链接

- 原文：Model-Harness-Fit by Nicolas Bustamante
- Terminal-Bench 2.0 leaderboard（2026-04-30）
- Cursor 研究团队 harness engineering 博客（2026-04-30）
- LangChain Vivek Trivedy：Agent = Model + Harness
- Anthropic rgb_prithvi：long running app development
