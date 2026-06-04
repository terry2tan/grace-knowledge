---
title: 我用 Harness Engineering 实现无人值守式的产品开发运营
date: 2026-03-31
source: 微信公众号 - 产品二姐
url: https://mp.weixin.qq.com/s/6KnpqIukQO3EtaFYvJpq3w
type: article
tags: [AI 产品，工具，产品]
---

## 摘要

Harness Engineering 是 AI 工程化的新阶段，核心是构建让 AI 无人值守运行的系统（文档、标准、约束、反馈循环）。作者以 book2skills 项目为案例，通过 4 个步骤（需求编写、Skill 构建、锚定文档、自我迭代）实现了全自动书籍分析 Skill 生成流水线。关键在于将方法论沉淀为可执行的 AI Skill，并支持自我迭代更新。

## 全文

### Harness Engineering 的核心概念

**Harness 的寓意**：Harness 原意是缰绳和马鞍。AI 如同一匹强大的马，但没有缰绳和马鞍就会乱跑。构建 Harness 的人就是骑手。

**AI Engineering 的三个发展阶段**：
- **阶段一：Prompt + workflow** — 单次调用 + 硬性编排，流程固定，灵活性差
- **阶段二：上下文工程** — 支持长步骤推理和灵活编排，但容易跑偏，需要人在旁边盯着
- **阶段三：Harness Engineering** — 无人值守运行，提前写好标准、原则、检验标准、工具架（Skills），AI 遇到问题自查文档

### Book2Skills 项目案例

**项目定位**：https://book2skills.com/zh

把经典书籍的核心分析方法提炼成 AI Skill，不是书的摘要和检索，而是方法论的"可执行版本"。安装后可以直接对 AI 说："用《怎样选择成长股》分析一下腾讯控股"，AI 会真正按照书中方法跑一遍分析逻辑。

**解决的两个问题**：
1. 大多数人读完书记住的不超过 20%，真正用起来的更少 — 读书不如"用"书
2. 对任何具体问题，选定一本书就可以知道如何按书中方法分析拆解

### 构建 Harness 的四个步骤

**第一步：充分的 Requirement 编写**（2 小时）
- 让 AI 帮忙找竞品、挖用户诉求、梳理实施方法、寻找设计灵感
- 把模糊的判断变成明确的文字标准，放在 requirements.md 里

**第二步：构建合理大小的 Skill**（5 小时）
三个阶段：a) 粗糙跑通流程 → b) 逐个精细化 → c) 流程拆解（过长的 skill 拆分）

**最终 Skill 生产流程**：
```
选书 → 读书 → 提炼 skill → 发布 GitHub → 生成 skill 效果示例 → 生成网站内容
```
除了选书，所有步骤都用 Skill 完成。

**6 个核心 Skill**：

| Skill | 功能 |
|-------|------|
| book2skills-publisher | 主 Skill，编排整个流程（松散指令，非硬编码） |
| read-book-skill | 调用本地 Python 脚本逐章提取 PDF，生成结构化章节摘要 |
| book-skill-creator | 基于章节内容提炼 SKILL.md（含 frontmatter、响应框架、输出格式） |
| write-skill-repo | 自动生成 GitHub 文件夹（SKILL.md + README + LICENSE），打包.zip |
| book-skills-examples | 真实调用 Skill 生成使用示例，中英文各 2-3 轮对话，带真实数据 |
| write-skills-page-content | 整合产出为网站页面，部署上线 |

**第三步：写锚定文档**
- 写"What is book2skills"文档
- 作用：给自己定边界，确保 Skills 不会过度设计或跑偏

**第四步：持续促进 Skill 的自我迭代**
- Skills 的优势是可以自我迭代
- 用户发现缺陷时直接告诉它"把这条规则加进去"，它会更新文件，下次运行立即生效
- 随着迭代积累，每个 Skill 内部沉淀出 reference 和 spec（标准参照物和设计准则）
- 迭代过程本身也可以自动化

### 最终成果

**全自动发布流水线**：
- 1 个主 Skill + 5 个子 Skill
- 只需选好书籍，调用主 Skill `book2skills-publisher`，剩下的自动完成
- Agent 可以自主并行启动任务（给 10 本书时自动并行处理）

**未来计划**：将运营、UI、SEO 优化也纳入 Harness

### 核心洞察

1. **Harness 不难，但 ROI 很高** — 极大程度把开发者从陪伴式编程中解放出来
2. **驱动是 Skills 的自我迭代** — 持续优化，使用合适的 Skills 是前提
3. **Harness 需要经常维护** — 并非一劳永逸

### 趋势判断

当模型能力发展开始变缓，工程能力会以新的速度蜕变：
- 提示词工程 → 上下文工程 → Harness Engineering
- 每一次进化都让 AI 技术离应用越来越近
