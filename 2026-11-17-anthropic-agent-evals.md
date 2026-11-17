---
title: Anthropic：Demystifying Evals for AI Agents（Agent 评测去魅）
date: 2026-11-17
source: Anthropic Research（原发 2026-01-09）
url: https://www.anthropic.com/research/demystifying-evals-for-ai-agents
type: article
tags: [AI, 技术, 方法论]
---

## 摘要

Anthropic 官方的 Agent 评测方法论长文（Claude Code 团队实战总结 + Descript/Bolt 等客户案例）。核心框架：①评测三要素 = task（含 inputs 和成功标准）+ grader（code-based / model-based / human 三类，各查 transcript 或 outcome）+ harness（跑评测的基础设施；注意区分 eval harness 和 agent harness——**评「一个 agent」评的是 harness 和模型的组合体**）；②capability evals（起点应低通过率，是攀登的坡）vs regression evals（应接近 100%，防倒退），能力评测饱和后可「毕业」转成回归套件；③**pass@k 测上限、pass^k 测稳定性**（75% 单次成功率 → pass^3≈42%），k 增大两者反向发散；④零到一路线图 8 步，最有用的几条：20-50 个真实失败任务就能起步（别等几百个）、好 task 的标准是「两个领域专家独立得出相同 pass/fail 判定」、0% pass@100 多半是坏任务而非模型不行（Opus 4.5 在 CORE-Bench 从 42% 修 grader 后跳到 95%）、**评分产出而非路径**（不要检查固定工具调用序列）、每个 task 配一个 reference solution 证明可解。

## 全文要点

### 评测的结构（定义）

- **task**：单条测试，含输入和成功标准；每次尝试是一次 **trial**（模型输出有方差，跑多 trial 才稳）
- **grader**：打分逻辑，一个 task 可有多个 grader，各含多个 assertion（checks）
- **transcript（trace/trajectory）**：trial 的完整记录（输出、工具调用、推理、中间结果）
- **outcome**：trial 结束时环境的最终状态——订票 agent 说「订好了」不算数，outcome 是 SQL 库里有没有那条预订
- **eval harness**：跑评测的基础设施；**agent harness（scaffold）**：让模型成为 agent 的系统。评「一个 agent」= 评 harness+模型的组合
- 前沿模型会超越静态评测：Opus 4.5 在 τ2-bench 里发现订票政策的漏洞拿到对用户更好的解，按写好的标准算「失败」

### 为什么要建评测

- 没评测的团队陷入 reactive loop：等投诉→手动复现→修 bug→祈祷没引入别的回归，无法区分真实回归和噪音
- Claude Code 的路径：先靠员工/用户反馈快迭代，再加窄域 evals（简洁性、文件编辑）→ 复杂行为 evals（过度工程）
- **评测是产品-研究团队之间带宽最高的沟通渠道**，也是新模型快速采纳的杠杆（有套件的团队换模型用天，没套件的用周）
- 早期 evals 迫使团队写清楚「成功是什么」——两个工程师读同一份 spec 会得出不同的边界处理理解，eval suite 消除歧义
- Descript 三维度：don't break things / do what I asked / do it well；Bolt 在规模化后才建，3 个月建成（静态分析 + browser agent 测 app + LLM judge）

### 三类 grader

| 类型 | 方法 | 优点 | 缺点 |
|------|------|------|------|
| Code-based | 字符串匹配、fail-to-pass 测试、静态分析、outcome 验证、工具调用验证、transcript 分析 | 快/便宜/客观/可复现/易调试 | 对合法变体脆弱、缺乏细腻度 |
| Model-based | rubric 评分、自然语言断言、pairwise 对比、参考答案、多 judge 共识 | 灵活/可扩展/抓 nuance/处理开放任务 | 非确定性/更贵/需人工校准 |
| Human | SME 评审、众包、抽检、A/B、标注一致性 | 金标准/用于校准 model grader | 贵/慢/需要专家 |

每 task 可加权（组合分过阈值）、二元（全过）或混合。

### 按类型评 agent

- **编码 agent**：确定性 grader 天然适用（SWE-bench Verified：修好失败测试且不破坏已有的；一年内 40%→80%+）。实践通常 = 单测验正确性 + LLM rubric 验质量，别一开始就堆满 grader。工具调用序列检查别太死。
- **对话 agent**：交互质量本身是被评对象；常需要**第二个 LLM 扮演用户**（τ-Bench/τ2-Bench 模式）；成功是多维的（工单已解决=state check、<10 轮=transcript 约束、语气合适=LLM rubric）
- **研究 agent**：「全面/有据/正确」只有相对标准；组合策略 = groundedness 检查（主张有源支撑）+ coverage 检查（必须包含的关键事实）+ source quality 检查（信源权威而非排最前的）；rubric 要频繁对照专家校准
- **Computer use agent**：真实/沙箱环境跑，查 URL/页面状态/后端状态（确认订单真的下了而不只是确认页出现了）；浏览器 agent 要平衡 token 与延迟（读 Wikipedia 用 DOM 快；逛 Amazon 买电脑包用截图省 token）——Claude for Chrome 专门建了「选对交互方式」的 eval

### 非确定性

- **pass@k**：k 次里至少一次成功的概率，随 k 升；编码场景常关心 pass@1
- **pass^k**：k 次全过的概率，随 k 降；对用户直接可见的 agent 关键（75% 单次 → pass^3≈42%）
- k=1 时相等，k=10 时一个趋 100% 一个趋 0%。选哪个看产品要求：一次成功就行的工具用 pass@k，一致性必须的用 pass^k

### 零到一路线图（8 步）

1. **尽早开始**：20-50 个来自真实失败的简单任务就够（早期改动效应大，小样本足够；拖久了要从活系统逆向工程成功标准）
2. **从手动测试开始**：发布前手动验证的行为、bug 追踪器、支持队列→转成用例
3. **写无歧义的 task + reference solution**：好 task = 两个专家独立得出相同判定、专家自己能做出来。任务规范里的歧义 = 指标里的噪音。**0% pass@100 多半是坏 task 不是模型不行**。每个 task 配 reference solution 验证可解且 grader 配置正确
4. **建稳的 eval harness**：eval 里的 agent 要和生产大致一致；每次 trial 从干净环境隔离开始（共享状态会导致相关失败或虚高——他们见过 Claude 靠翻之前 trial 的 git 历史占便宜）
5. **精心设计 grader**：确定性优先、LLM 灵活补、人工谨慎用。**评产出不评路径**（agent 会找到设计者没预料到的合法解法）。多组件任务给部分分。LLM judge 给「Unknown」出口防幻觉，分维度隔离评分优于一个 judge 包打。防 agent 钻空子作弊。案例：Opus 4.5 在 CORE-Bench 42%→95% 全是 grader bug（「96.12」被判错因期望「96.124991…」、任务有歧义、随机任务不可精确复现）；METR 时间视界基准里按指示做的模型反而得分更低
6. **读 transcript**：不读 transcript 就不知道 grader 好不好。失败要显得公平——能看出 agent 错在哪、为什么。分数不涨时要确信是 agent 问题而不是 eval 问题
7. **监控饱和**：100% 的 eval 只防回归不提供改进信号；接近饱和时大幅能力进步只表现为小幅分数上涨（Qodo 一开始对 Opus 4.5 失望，因为 one-shot eval 没捕捉长任务收益，换了 agentic 框架才看清）。**规则：没人大钻进评测细节、读过 transcript 之前，不把分数当真**
8. **长期维护**：专门 evals 团队拥有基础设施，领域专家和产品团队贡献 task 并自己跑。**eval-driven development**：在 agent 还做不到之前先建 capability evals 定义预期能力，迭代到达标。最贴近用户的人（PM/CSM/销售）用 Claude Code 以 PR 形式贡献 eval task——主动 enabling 他们

### 评测与其他方法的组合（Swiss Cheese 模型）

| 方法 | 优 | 劣 |
|------|----|----|
| 自动化 evals | 快/可复现/无用户影响/每次 commit 可跑 | 前期投入大、需持续维护防漂移、可能与真实用法不匹配造成假信心 |
| 生产监控 | 真实行为/抓合成 eval 漏的问题 | 被动、噪音、缺 ground truth |
| A/B 测试 | 测真实结果、控混淆 | 慢、只测部署的改动 |
| 用户反馈 | 暴露没预料的问题、带真实例子 | 稀疏自选择、偏严重问题、不说 why |
| 人工读 transcript | 建立失败模式直觉、抓微妙质量问题 | 费时、不可扩展 |
| 系统化人工研究 | 金标准、校准 LLM grader | 贵慢、需专家 |

组合：自动化 evals 做 pre-launch/CI 第一道防线，生产监控抓漂移，A/B 验证大改动，反馈和 transcript 常态补位，人工研究留给校准和主观输出。没有单层能拦住所有问题，多层叠加各补漏洞。

### 附录：框架

Harbor（容器化跑 trial、Terminal-Bench 2.0 用它分发）、Braintrust（离线评测+生产观测+autoevals）、LangSmith、Langfuse（开源自托管）、Arize Phoenix/AX。**框架只值你跑过它的 eval task 的价值——快速选一个合手的，把精力投在 task 和 grader 本身。**
