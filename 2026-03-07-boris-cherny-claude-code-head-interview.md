# Claude Code 负责人 Boris Cherny：编程已被解决，之后呢？

**来源**: YouTube - Lenny's Podcast
**链接**: https://youtu.be/We7BZVKbCVw
**主讲**: Boris Cherny（Claude Code 负责人，Anthropic）
**访谈**: Lenny Rachitsky
**标签**: #AI #ClaudeCode #软件工程 #产品 #未来 #Anthropic

---

## 关键数字

- Claude Code 占全球 GitHub **公开** commits 的 **4%**（私有库预计更高）
- 预测年底前占 **1/5** 的所有代码提交
- Boris 本人：**100% 的代码由 Claude Code 生成**，自 2025年11月起没有手写一行代码
- 每天提交 **10~30 个 PR**
- Anthropic 工程师生产力提升 **200%**（以 PR 数量衡量）
- DAU 在过去一个月翻倍，增速仍在加快
- Cowork 从想法到发布：**10天**

---

## Part 1：Claude Code 的起源

### 最初只是一个 hack

- Boris 加入 Anthropic 后，先花一个月做原型探索，再花一个月做 post-training（理解模型的底层）
- 核心信念：**要做好产品，必须理解下一层——工作在 AI 产品层，就要理解模型本身**
- 第一个版本叫 ClaudeC LI，发布内部公告只收到 **2个点赞**

### 为什么选择终端（Terminal）？

- 最初只因为是一个人开发，终端是最省力的方式
- 后来有意坚持终端：**模型改进速度太快，只有终端形态能跟上**
- 终端的"陌生感"反而筛选出了真正有动力的早期用户

### 发布初期并非立刻爆火

- 外部发布（2025年2月）后，真正被广泛理解和采用花了数月时间
- 增长拐点：Opus 4 发布、2025年11月的某个节点……之后增速持续加快

---

## Part 2：编程已被解决

### 什么叫"编程被解决"（Coding is Solved）

> "At least for the kind of programming that I do, it's just a solved problem."

- Claude Code 现在不只是"写代码的助手"，而是**真正使用工具、在世界中行动的 Agent**
- 下一步：Claude Code 开始**主动发现问题**——扫描 Slack 反馈、bug 报告、telemetry，自己提 PR

### 编程技能会萎缩吗？

- Boris 不担心：编程是工具，不是目的；就像从打孔卡到汇编到高级语言的演变
- 类比**印刷机**：识字从 <1% 扩展到 70% 全球人口，花了 200 年；程序员比例的扩张也将如此
- **1~2年内，会使用 Claude Code 的人不再需要懂代码**

### 历史类比：印刷机

- 1400 年代，识字是极少数抄书人的特权
- 古登堡印刷机发明后 50 年，印刷品数量超过此前 1000 年总和
- 类比今天：代码从少数程序员的专利 → 人人可编程
- 一个中世纪抄书人被访谈时说："我不喜欢抄写，但我热爱书籍装订和插图。机器帮我做了抄写，反而让我更快乐。"

---

## Part 3：产品原则

### 1. 潜在需求（Latent Demand）——最重要的产品原则

> "The single most important principle in product."

**传统定义**：观察用户如何"滥用"产品（用它做它本没有设计的事），然后为此需求专门建产品。

案例：
- **Facebook Marketplace**：40% 的 Facebook 群组帖子是买卖交易 → 明显应该建 Marketplace
- **Facebook Dating**：60% 的跨性别陌生人 profile 浏览 → 明显有约会需求
- **Cowork**：大量 Claude Code 用户用它做完全非技术的事（种番茄、分析基因组、恢复婚礼照片、分析 MRI）→ 建了 Cowork

**现代定义（新维度）**：不只是看用户想做什么，还要看**模型想做什么**——给模型最少的约束和工具，让它自己决定怎么用。

> "We inverted the approach: the product is the model. We expose it with minimal scaffolding."

### 2. 欠资源（Underfunding）

> "Underfund things a little bit at the start."

- 一个人负责一个项目，为了快速交付，他会自然地用 Claude 自动化所有能自动化的事
- **逼迫使用 AI 工具，反而产生最高的 AI 利用率**
- 给工程师**无限 token 配额**：让他们先验证想法，优化留到规模化阶段

### 3. 今天能做的事今天做（Ship Fast）

- 早期 Claude Code 唯一的竞争优势就是速度
- 快速反馈循环：用户给反馈 → 立刻修复（5分钟内）→ 用户感到被重视 → 更愿意给反馈

---

## Part 4：对工程师和职业的影响

### "Software Engineer" 这个职位将消失

> "The title software engineer is going to start to go away. It's just going to be replaced by builder."

- 工程/产品/设计三个职位边界越来越模糊，未来可能只有 **Builder**
- Anthropic 的 Claude Code 团队：PM 写代码、设计师写代码、数据科学家写代码、工程师懂产品

### 给个人的建议：成为通才

1. **用好工具，站在前沿**——不要害怕，去用
2. **成为跨学科通才**：工程 × 产品感 / 工程 × 设计 / 工程 × 业务理解 / 工程 × 用户调研
3. **能够理解更大的问题**，而不只是写代码本身

### 对工程师来说是好消息还是坏消息？

- Boris 本人："我从来没有像现在这样享受编程，因为不需要处理所有繁琐的细节了。"
- Lenny 调研：**70% 的工程师和 PM 表示更享受工作**；设计师只有 55%
- 真正要做的："把精力从写代码转移到思考做什么、和用户交谈、协作和系统设计上"

---

## Part 5：为什么 Boris 离开 Cursor 两周后又回来

- 离开 Anthropic 去 Cursor：被 Cursor 团队和产品深深吸引
- 两周后回来：**意识到自己最需要的是使命感**——在 Anthropic，随便拉一个走廊里的人问"你为什么在这里"，答案永远是"安全（Safety）"
- 使命驱动对他来说是不可替代的，任何再酷的产品工作都无法弥补

---

## Part 6：给新团队成员的三个原则

1. **What's better than doing something? Having Claude do it.** ——凡是 Claude 能做的，先让 Claude 做
2. **如果今天能做到，今天就做**——速度是最重要的优势
3. **欠资源地部署团队**——逼迫大家用 AI 解决问题，而不是堆人

---

## 关键金句

> "Coding is largely solved. The next frontier is everything adjacent to coding — and then everything beyond."

> "I imagine a world where everyone is able to program. Anyone can just build software anytime. What does that unlock? It's unimaginable — the same way people in the 1400s couldn't have predicted the Renaissance."

> "Expose the model. Minimal scaffolding. Let it decide."

> "Give engineers as many tokens as possible at the start. Don't optimize too early."

> "You find a thread, you just have to pull on it."
