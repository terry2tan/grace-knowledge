---
title: Claude Code Mastery：把「Harness 工程」写成 24 章教材，以及它自己的生成流水线
date: 2026-11-23
source: GitHub / Stanshy
url: https://github.com/Stanshy/Claude-code-mastery
type: repo
tags: [AI, 方法论, 工具]
---

## 摘要

一本**中英双语、24 章、约 29 万字符**的 Claude Code 系统教材，骨架用的是 **David Chu 五层进化模型**（对话式 → 配置式 → 自动化 → 编排式 → 自主式），外加三个方法论模块（Harness Engineering / 实战框架 / 参考）。全部章节围绕同一个贯穿案例 **AI Dev Assistant**（Node 18 + TS 5 + Jest 29 + ESLint 8）逐章加一层能力，形成「产品功能线」和「架构能力线」双线演进。

**但它真正值得存的是两层东西：**

1. **内容层**：把「Harness 工程」从散落的推文/博客收敛成一套可执行的检查框架——七大设计原则、六步建设流程、三条规则毕业路径，每条都配「做对的样子 / 做错的样子」。
2. **元层（更有意思）**：仓库根目录有自己的 `SYSTEM_PROMPT.md` + `CONTENT_RULES.md` + `PROJECT_SPEC.md`。**这本书本身就是用一套内容 Harness 批量生产的**——固定章节模板、硬规则（"禁止『提升效率』这类空泛描述"、"每章只教一个能力"）、五要素实作范例、失败重试机制（最多重写 3 次，仍不合格标「需人工检查」）、每章生成后的技术验证清单。这是一个「用 prompt harness 产出长文档」的完整可抄样本。

> 客观情况：**17 star / 1 fork / 无 license / 只有 1 个 commit**（`restructure to zh/en multilingual architecture`），2026-03 建仓。从行文的一致性、章节模板的严整度、以及仓库自带生成提示来看，内容很可能是 AI 大规模生成后人工校订的。所以**当方法论索引读、当写作流水线模板抄都可以，但里面的具体数字要复核**（见文末「需要打问号的地方」）。

## 一、七大设计原则（模块 6，全库最硬的一章）

核心命题：**Agent 的可靠性瓶颈不在模型，在模型周围的系统。** 每条原则都对应一类真实失败模式，并明确到 Claude Code 的哪个机制上：

| # | 原则 | 一句话 | 落地机制 |
|---|---|---|---|
| 1 | 上下文架构 | 给地图，不给百科全书 | CLAUDE.md 当索引（<200 行）+ Skills 按需载入 + `@` 即时引用 |
| 2 | 架构约束 | 用工具强制，不靠 prompt 建议 | PreToolUse Hook `exit 2`、settings.json deny 规则 |
| 3 | 自验证循环 | 「完成」≠「声称完成」 | **Stop Hook Validator**（退出前跑 `npm test && npm run lint`） |
| 4 | 上下文隔离 | 子 Agent 当防火墙 | Subagents 独立 context + Worktree 隔离文件系统 |
| 5 | 熵管理 | 跑越久越乱，要主动维护 | 踩坑→规则闭环、Auto Memory、**GC Agent / Doc-gardening Agent** |
| 6 | 可拆卸性 | 强模型来了要能卸组件 | Hook/Skill/Agent 各自独立文件，删一个不影响其余 |
| 7 | Agent 可读性 | codebase 首先为 Agent 可读性优化 | repo 是唯一真相来源；linter 错误信息写成可直接执行的修复指令 |

**最锋利的一句**：原则 2 说「Prompt 是建议，不是约束」——「请勿 force push」在 Claude 试了五次 rebase 都失败、认为这是最后手段时会被忽略；Hook 返回 `exit 2` 才是物理上无法继续。**工程师的习惯是写建议，不是写约束**，这是最常被跳过的一条。

## 二、六步建设流程 + 三反模式（06-2）

核心哲学：**踩坑驱动，不做预防性设计。** 「每一條進入 Harness 的規則，都應該對應一個已發生的真實問題」——回答不出「这对应哪次真实踩坑」的规则，地位可疑。

流程：**0 裸跑 + 记账 → 1 最小 CLAUDE.md（50-100 行索引）→ 2 加第一条约束（最频繁或最严重的错）→ 3 加 Stop Validator（几乎对所有项目都有意义，所以是标准动作而非踩坑触发）→ 4 context 过载时才拆第一个 Subagent → 5 建踩坑→规则闭环保环 → 6 定期审计并删除过时组件**。

Stop Validator 的设计参数很具体：**执行时间 60 秒以内**、只验证最关键的「测试通过 + lint 无错」、失败时要输出具体错误让 Agent 知道改什么。

第 6 步审计的三问（每月一次）可直接拿来用：
- 这个组件最近 30 天被触发/使用过吗？
- 最新版模型是否已内建处理了这个问题？
- 移除它最坏情况是什么？能接受吗？
→ 「没有 / 是 / 能接受」就删。

三种反模式：**完美主义陷阱**（花两周设计才开始用）、**约束堆积症**（只加不删，30 条互相冲突）、**复制粘贴症**（抄别人的 CLAUDE.md，自己说不清每条对应什么问题）。

## 三、五层进化模型 + 三条毕业路径（07-4，全书骨架）

David Chu（前 ENS 工程师）的起点很具体：每天跑 3-5 个 Claude Code、100% 代码由 AI 生成、每天合 2-4 个 PR，**但下班时精神疲惫**——因为大量时间花在切终端、审输出、重下提示，他说这感觉像「管理 Claude」而不是「与 Claude 协作」。

五层：**对话式 → 配置式（CLAUDE.md 让规则跨 session 持久）→ 自动化（Hooks 保证执行 / Skills 编码流程）→ 编排式（专门角色处理专门问题）→ 自主式（你只做最终 review）**。进化不是强制的，触发条件永远是「当前层级无法可靠解决某类问题」。

**三条毕业路径（CLAUDE.md 规则成熟后升级到哪）：**
- **→ Hook**：适用于「Claude 理解了规则但不再持续遵守」。分 PreToolUse（条件判断）/ PostToolUse（回调验证）/ Stop（质量关卡）
- **→ Skill**：① 一个月只用一次的工作流（不该常驻 context）② 模型训练数据里没有的知识（内部库、非主流技术栈、团队 UI 偏好）
- **→ Agent**：需要跨多个任务持续专业判断的场景

**Skill 与 Agent 的分界写得很清晰**：**为 Skill 定义「任务」，为 Agent 定义「人设」**。Skill 是静态流程，Agent 是能在不同情境下做判断的角色。

**三條毕业信号**：① CLAUDE.md 达约 50 行 ② Claude 不再持续遵守某条规则 ③ 到了定期审查时点（建议每两周）。

**Boris 学派 vs RPI 学派的整合**（这段有真东西）：
- Boris 学派：犯错就加，绝不留情，CLAUDE.md 约 2,500 tokens，是全团队 code review 迭代出来的机构记忆
- RPI 学派：控制在 60 行内，CLAUDE.md 占 context 超 40% 就进入「笨蛋区」
- 整合观点：**Boris 说的是早期（先累积习惯），RPI 说的是成熟期（定期毕业精简），毕业机制连接两者**
- 且指出 Boris 那套 2,500 tokens 还能跑动的**秘密武器**：他有一个强制 Agent 每次任务开始真正读取并应用 CLAUDE.md 的验证器——「不是形式上载入后就忽略」。该验证器现在成了 `/simplify` 指令的一部分。

「验证器的数学」这一段方向对但算法粗糙：5 步工作流、每步 80% → 0.8⁵ ≈ 33%；加一个 70% 准确率、可重试 4 次的验证器 → 接近 99%。结论（**验证器是杠杆率最高的单点投资；「好的验证器 + 差的工作流」胜过「好的工作流 + 无验证器」**）可采信，具体数字别引。

## 四、四个开源 Harness 案例的交叉对照（07-3）

用同一套七概念框架横向比，比看四个独立介绍有用：

| 概念 | claude-code-harness | everything-claude-code | gstack | OpenAI Codex 内部 |
|---|---|---|---|---|
| 上下文架构 | Skills 渐进载入 | 按需装语言规则 | CLAUDE.md 当索引 | AGENTS.md ~100 行 + docs/ |
| 架构约束 | **9 条 TS Guardrail（代码层拦截）** | 多语言 Rules 强制 | `/careful` 警告（最轻） | 6 层架构 + 自定义 linter |
| 自验证 | `/harness-work all` | checkpoint evals | `/qa` 自动测试 | **Agent-to-Agent review** |
| 上下文隔离 | 3 Agent 分工 | **28 Subagent** | 18 Skill 独立 | 每 worktree 独立环境 |
| 熵管理 | agent-trace.jsonl | **`/learn-eval` → `/evolve`（自动）** | `/document-release`（手动） | **GC Agent 自动重构 PR** |
| 可拆卸性 | v3 middleware 可整体拔 | 选择性装 | 单 Skill 文件独立 | 未讨论 |

各案例最值得偷的一条：
- **claude-code-harness**：把 42 个 Skill 收敛成 5 个动词（`/setup /plan /work /review /release`）——用户只需知道「现在处于哪阶段」；以及 R01-R09 的 TS Runtime Guardrail，把「提醒遵守」升级成「违规在技术上不可能」
- **everything-claude-code**：`/learn-eval` 从工作记录/错误日志/review 意见里提取重复 pattern，`/evolve` 把它转成新 Skill——**Harness 自己从踩坑中长出新能力**
- **gstack（Garry Tan）**：18 个角色 Skill 模拟完整工程团队（CEO `/rethink`、Eng Manager `/lock`、Designer `/design-review` 检测 AI slop、Reviewer `/review`、QA `/qa`、Security `/security`、Release `/ship`）；强制 Think→Plan→Build→Review→Test→Ship→Reflect 不许跳步；两个核心机制——**`/office-hours` 动手前强制回答六问**（用户问题是什么、成功如何验证、技术限制、最可能失败在哪、有没有更简单的解法、这个决策可逆吗/错了代价多大）、**`/investigate` 修 bug 前强制根因五步**（重现→隔离变量→形成假设→最小验证→修根因而非症状）
- **OpenAI Codex 内部团队**：AGENTS.md 当 100 行地图 + `docs/` 结构化知识库（渐进式揭露）；6 层架构 Types→Config→Repo→Service→Runtime→UI 由自定义 linter 和结构测试机械强制；**每个 worktree 有独立 log/metrics/trace 栈，Agent 可用 LogQL 和 PromQL 查询**，让「确保启动在 800ms 内」这种要求变成可执行的

## 五、元层：这本书自己的内容 Harness（最值得抄的部分）

`SYSTEM_PROMPT.md`（角色 + 风格 + 统一格式）、`CONTENT_RULES.md`（硬规则 + 强制五要素 + 禁止事项 + 技术验证 + 失败重试）、`PROJECT_SPEC.md`（主案例规格 + 双线演进表）三件套，构成一条**可复用的长文档生产线**：

- **固定章节模板，顺序不可调换**：标题 → 一句话摘要 → 学习目标 → 正文 → 实作范例 → 关键重点 → 自我检核
- **硬规则可测量**：「技术内容 100% 精确，不确定必须标『需验证』」「禁止『提升效率』『很方便』『非常强大』这类空泛描述」「一章一能力」「所有代码必须能跑」
- **实作范例强制 5 元素**：目标 / 前置条件 / 步骤 / 预期结果（含具体输出）/ 常见错误（至少 2 个：错误→原因→解法）
- **写作规则带节奏约束**：先说为什么再说怎么做；每个概念用「定义→原理→范例→常见误解」；对比用表格不用长段落；进阶技巧标注「进阶」不混入基础
- **技术验证清单（工程层）**：CLI 指令是否真实存在（不可有虚构 flag/subcommand）、npm/Node 指令是否符合 Node 18 语法、TS import 是否 ES module 风格、Jest 语法是否 v29 兼容、配置格式是否与官方一致
- **阅读流畅度验证**：第一段是否回答「为什么要学这个」、2-3 分钟阅读内是否出现第一个可执行步骤、实作是否 6-10 步完成
- **失败重试机制**：列出违规项（具体到哪条规则哪段）→ 只重写违规段落不整章重写 → 最多 3 次 → 仍不合格标「需人工检查」并说明卡点

**双线演进**这个设计尤其值得借：`产品功能线` 只在 01-2 / 03-3 / 05-3 / 06-2 加新功能，其余章节只教能力、不增加产品复杂度——避免了「教学书越写越臃肿」这个通病。

## 六、和 learn-claude-code 的关系

两者互补，不重复：

- **`shareAI-lab/learn-claude-code`**（本库 `2026-11-23-learn-claude-code-harness.md` + `2026-11-23-learn-shareai-run-site-20-lessons.md`）：**读代码**——17/20 个可运行单文件，从零手写 harness 机制
- **`Stanshy/Claude-code-mastery`**（本篇）：**读方法论 + 读内容生产线**——24 章教材告诉你「什么时候该用哪个机制、什么时候该拆掉」，外加一套可复用的生成提示

## 需要打问号的地方

- **无 license**，star 极少，单 commit，内容高度可能是 AI 生成的——当作二手综述读，不当一手信源引
- 若干数字无法在文中找到出处，按「需验证」处理：Anthropic 「同一模型只优 prompt 结构/工具设计/验证循环，任务成功率 40%→80%」、Boris Cherny「30 天 259 PR / 4 万行」、gstack「60 天 60 万行」、OpenAI Codex「5 个月 100 万行 / 1500 PR / 3→7 人 / 每人每天 3.5 PR」、RPI「CLAUDE.md 超 40% 进笨蛋区」
- 「验证器的数学」算式不严谨（0.7 准确率 × 4 次重试推 99% 的写法是示意而非推导），只取结论
- 部分 Claude Code 机制名（如 `/simplify`、`settings.local.json` 的具体行为）建议以官方文档复核后再抄进自己的配置

## 链接

- 仓库：https://github.com/Stanshy/Claude-code-mastery
- 繁中入口：https://github.com/Stanshy/Claude-code-mastery/blob/main/zh/00-索引與摘要.md
- 七大原则：https://github.com/Stanshy/Claude-code-mastery/blob/main/zh/06-Harness-Engineering/06-1-七大設計原則.md
- 从零建 Harness：https://github.com/Stanshy/Claude-code-mastery/blob/main/zh/06-Harness-Engineering/06-2-從零建立Harness.md
- David Chu 框架：https://github.com/Stanshy/Claude-code-mastery/blob/main/zh/07-實戰框架與工作流/07-4-David-Chu進化框架.md
