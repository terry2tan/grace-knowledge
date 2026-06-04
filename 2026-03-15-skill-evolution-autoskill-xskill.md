---
title: 能进化的 Skill，才是好 Skill
date: 2026-03-15
source: 微信公众号
url: https://mp.weixin.qq.com/s/meQajuKfBbjFM4fNyoGRWw
type: article
tags: [AI产品, 工具, 技术]
---

## 摘要

这篇公众号文章用两篇 2026 年的新论文 `AutoSkill` 和 `XSKILL` 串起了一个很明确的判断：静态 Skill 本质上只是更高级的 Prompt，真正有长期价值的是可以持续自我进化的 Skill。`AutoSkill` 的重点是把 Skill 当成可版本化、可合并、可淘汰的资产，通过用户交互驱动 `Add / Merge / Discard` 三种演化决策；文中用 `professional_text_rewrite` 迭代到 `v0.1.34` 作为典型例子。`XSKILL` 则把多模态 Agent 的知识拆成 `Skill Library` 和 `Experience Bank` 两条流，通过 cross-rollout critique、hierarchical consolidation 和 visual grounding 提升复杂环境适应性与跨任务迁移能力。作者最终把结论收束为一句更偏产品哲学的话：未来不是“写 Skill”，而是“养 Skill”，版本历史本身就是组织知识资产。

## 全文

### 基本信息

- 标题：能进化的 Skill，才是好 Skill
- 作者：PaperAgent
- 发布时间：2026-03-15 10:27
- 来源：微信公众号
- 原始链接：https://mp.weixin.qq.com/s/meQajuKfBbjFM4fNyoGRWw

### 核心判断

作者认为，在 Agent 技术栈逐步成熟之后，行业关注点已经不该停留在“Agent 会不会干活”，而应该转向“Agent 能不能越干越好”。围绕这个判断，文章重点解读了两篇同样强调 Skill 自我进化的新论文：

- `AutoSkill`：华东师大与上海 AI Lab 提出，已开源
- `XSKILL`：港科大、浙大、华科联合提出，已开源

两篇论文共同指向同一个结论：静态 Skill 只是高级 Prompt；能自我进化的 Skill，才是值得沉淀的数字资产。

### 1. AutoSkill：把 Skill 变成可版本化资产

`AutoSkill` 的核心思想是，用户的每一次反馈都不只是服务当前任务，还应该反过来让 Skill 变得更聪明。文章把它概括成一个“双循环”架构：

- 左循环：`Response Generation`
  作用是检索相关 Skill，并用它生成当前回答。
- 右循环：`Skill Evolution`
  作用是从用户交互中提炼新 Skill，或者更新已有 Skill。

作者特别强调了 `Skill Management` 的三种演化决策：

- `Add`：新增一个全新能力并入库
- `Merge`：与已有 Skill 合并，并提升版本号
- `Discard`：判断为一次性需求，直接丢弃

在文章给出的案例里，Skill 的版本号本身就是质量和价值的可见指标。WildChat-1M 构建出来的 SkillBank 中，常用生产力技能会快速迭代，例如 `professional_text_rewrite` 已经演化到 `v0.1.34`；而冷门技能可能长期停留在 `v0.1.0`。作者据此提出一个很重要的判断：Skill 的价值，不在于第一版有多完美，而在于它能否被持续调用、持续改进。

### 2. XSKILL：让 Skill 和 Experience 协同进化

如果说 `AutoSkill` 更关注 Skill 的纵向迭代，那么 `XSKILL` 更关注 Skill 如何在复杂多模态环境里横向适应。文章把它的方案概括成“双流知识”结构：

- `Skill Library`
  结构化的任务流程，更像“驾驶手册”
- `Experience Bank`
  情境化的动作提示，更像“驾驶直觉”

作者提炼了 `XSKILL` 的三个关键机制：

- `Cross-Rollout Critique`
  对比多次尝试的成败，从中提取因果经验。
- `Hierarchical Consolidation`
  合并相似经验，删掉冗余内容，让 Skill 文档持续精炼。
- `Visual Grounding`
  所有知识提取建立在视觉观察之上，避免纯文本幻觉。

文章引用了论文中的实验结果来说明“进化”带来的收益：在 5 个多模态基准上，`XSKILL` 相比强基线 `Agent-KB` 最多能提升 11.13 分；在消融实验里，单独依赖 Skill 或单独依赖 Experience 都不够，两者协同时能同时降低错误率并减少语法错误和工具选择错误。作者据此认为，真正有价值的不是孤立的 Skill 文档，而是 Skill 与经验库一起构成的持续学习系统。

### 3. 为什么“能进化”会成为 Skill 的生死线

文章把两篇论文放在一起对比后，总结出静态 Skill 和可进化 Skill 的差别：

- 存储形式：从固定 Prompt，变成带版本控制的 Markdown 工件
- 更新机制：从人工重写，变成自动 `Merge / Add / Discard`
- 知识来源：从预设模板，扩展到用户交互轨迹和视觉观察
- 质量保证：从依赖初始质量，转向依赖迭代次数和交叉验证
- 跨场景能力：从单任务技巧，升级为可零样本迁移的能力

作者进一步给出三个更高层的判断：

- 进化即压缩
  `AutoSkill` 的 merge 与 `XSKILL` 的 consolidation，本质上都在做经验压缩，保留通用模式，丢弃实例噪声。
- 进化即对齐
  每次版本更新，都是对用户偏好的微调式对齐，不需要直接修改底层模型参数。
- 进化即资产
  Skill 的版本历史本身就是组织知识资产，员工离开后真正应该留下的是迭代过上百次的 Skill，而不是散乱聊天记录。

### 4. 从“写 Skill”转向“养 Skill”

文章最后给出了一个很产品化的范式转移：

- 过去：写 Prompt
- 现在：写 Skill
- 未来：养育 Skill

作者的意思很直接：就像不会要求实习生第一天就完美无缺，但会期待他在一百天后成长为专家；我们也不应该要求第一次抽取出来的 Skill 已经足够完美，但必须要求系统具备明确的进化机制。对做 Agent 产品、Skill 市场、工作流编排、知识沉淀的人来说，这篇文章最值得记住的一点，不是某个单独方法，而是“Skill 必须可演化”这个产品前提。

### 文中提到的论文与链接

- AutoSkill 论文：https://arxiv.org/pdf/2603.01145
- AutoSkill 代码：https://github.com/ECNU-ICALK/AutoSkill
- XSKILL 论文：https://arxiv.org/pdf/2603.12056
- XSKILL 网站：https://xskill-agent.github.io/xskill
- XSKILL 代码：https://github.com/XSkill-Agent/XSkill
