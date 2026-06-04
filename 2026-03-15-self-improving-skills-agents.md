---
title: 让 Agent 的 Skills 自我进化
date: 2026-03-15
source: x.com
url: https://x.com/tricalt/status/2032179887277060476
article_url: https://x.com/i/article/2032164771857059840
author: Vasilije (@tricalt)
type: article
tags: [AI产品, 工具, 技术]
---

## 摘要

这篇文章讨论的不是“怎么给 Agent 写 skills”，而是更关键的一步：怎么让 skills 随着环境变化持续改进，而不是慢慢失效。作者的核心判断是，`SKILL.md` 这种形式会长期存在，但 skills 不能再被当成静态提示词文件，而应该被视为可观察、可诊断、可修订、可回滚的系统组件。文中给出了一套相对完整的闭环：先把 skills 结构化入库，再记录每次运行的观测数据，然后基于失败历史做 inspection，提出 amendment，最后通过评估决定是否升级或回滚。对所有在做 agent skill、prompt workflow、工具编排的人来说，这篇文章最有价值的地方，是它把“skill 维护”从手工调 prompt 提升成了可审计的工程流程。

## 全文

### 基本信息

- 作者：@tricalt（Vasilije）
- 发布时间：2026-03-13 03:40:15
- 原始推文：https://x.com/tricalt/status/2032179887277060476
- X Article：https://x.com/i/article/2032164771857059840

### 不是只有 skills，而是会持续变好的 skills

作者一开始就提出一个很重要的判断：未来不会只是“agent 带着 skills”，而会是“agent 带着能够随着时间推移不断改进的 skills”。

`SKILL.md` 这种文件形式大概率会一直存在，但围绕它最根本的问题还没有真正解决：skills 往往是静态的，而周围环境却不是静态的。

一个几周前还能正常工作的 skill，可能会因为以下因素悄悄开始失效：

- 代码库变了
- 模型行为变了
- 用户提出的任务类型变了

而在大多数系统里，这种失效通常只有在输出明显变差、甚至彻底失败之后，才会被人察觉。

作者认为，真正缺失的一环，是把 skills 当成“活的系统组件”来看待，而不是固定不变的 prompt 文件。这也是 `cognee-skills` 想解决的问题：不只是更好地存储或路由 skill，而是让它在失败或表现欠佳时能够持续改进。

### 1. Skill ingestion：先把 skill 结构化

作者举了一个典型的技能目录例子：

```text
my_skills/
  summarize/
    SKILL.md
  bug-triage/
    SKILL.md
  code-review/
    SKILL.md
```

问题不在于“把它们放进文件夹”本身，而在于这些 skill 是否有更清晰的结构。文章提到，借助 `cognee`，可以把 skill 里的不同字段补上更强的语义，例如：

- semantic meaning
- task patterns
- summaries
- relationships

这些都可以作为结构化数据保存下来，帮助系统更聪明地理解 skill，并做更合理的路由。作者把这些内容存储在 `cognee` 的 `Custom DataPoint` 中。

### 2. Observe：没有观测，就谈不上改进

作者强调，skill 想自我改进，系统必须先记住它运行时到底发生了什么。

因此，在每次 skill 执行后，系统至少要记录这些信息：

- 尝试完成的任务是什么
- 选中了哪个 skill
- 是否成功
- 出现了什么错误
- 用户有没有反馈

有了 observation，失败才不再只是“出错了”，而是变成系统可以推理、可以分析的对象。

文章指出，如果你不知道 skill 运行时发生了什么，就不可能真正改进它。因为底层是图结构，所以这些 observation 也可以以额外节点的方式挂到 skill 上，并继续用 `Custom DataPoint` 管理。

### 3. Inspect：从失败历史里找规律

当足够多的失败运行积累起来，或者即便只发生了一次高价值失败，也可以开始 inspection。

Inspection 要看的不是单次错误本身，而是 skill 周围整段关联历史：

- 过去的运行记录
- 用户反馈
- 工具调用失败
- 相似任务模式

因为这些都以图结构方式保存，系统就能追溯“哪些因素总是在导致坏结果”，并据此提出更好的 skill 版本。

作者把这一步简单概括为：

```text
runs -> repeated weak outcomes -> inspection
```

### 4. Amend skill：让系统提出修订建议

一旦系统积累了足够证据，证明某个 skill 表现不佳，它就可以提出 amendment，也就是对 skill 指令本身的修订建议。

这个 amendment 可以：

- 由人来 review
- 也可以自动应用

它的目标很简单：随着系统规模变大，尽量减少人工维护 skills 的摩擦。

作者认为，与其让人类手动去代码库里找哪些 prompt 坏了，不如让系统直接查看该 skill 的执行历史，再基于实际失败证据提出定向修改。

这些修改可能包括：

- 收紧触发条件
- 补上一条缺失条件
- 重新排序步骤
- 修改输出格式

作者把这一步称为：skills 不再像静态 prompt 文件，而开始像会演化的系统组件。你不再需要打开 `SKILL.md` 靠经验猜哪里该改，而是系统根据真实执行证据提出一个 patch。

### 5. Evaluate & Update：改了之后必须验证

作者特别强调：一个能修改自己的系统，绝不能因为“它会自改”就被默认信任。

任何 amendment 都必须经过评估：

- 新版本是否真的提升了结果？
- 是否减少了失败？
- 是否在别处引入了新的错误？

所以这个闭环不能只是：

- observe -> inspect -> amend

而必须是更严格的：

- observe -> inspect -> amend -> evaluate

如果 amendment 没有带来可衡量的改善，系统就应该回滚。因为每次变更都记录了理由和结果，所以原始指令不会丢失，自我改进也就变成一个结构化、可审计的过程，而不是不可控的自我修改。

只有当评估确认效果更好时，这次 amendment 才能成为 skill 的下一个版本。

### 结论

文章最后的结论很直接：在模型、代码库和任务持续变化的环境中，skills 不可能长期保持静态不变。固定的 prompt 文件迟早会退化。

作者给出的方案是：让 skills 拥有完整的生命周期管理能力，包括结构化存储、执行观测、失败检查、自动修订和效果评估。这样既能让系统持续自我改进，又不会放弃人类对技能系统的控制和审计能力。

### 文中提到的链接

- PyPI build：https://pypi.org/project/cognee/0.5.4.dev2/
- Cognee 仓库：https://github.com/topoteretes/cognee
- Discord：https://discord.gg/pMFAz242
