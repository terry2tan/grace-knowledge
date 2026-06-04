---
title: How To Be A World-Class Agentic Engineer：从乱装插件到真正掌控 Agent
date: 2026-03-03
source: x.com
url: https://x.com/systematicls/status/2028814227004395561
type: article
tags: [AI, 工具, 技术]
---

## 摘要

作者是长期在生产环境中使用 Agent 的工程师，核心观点：你的热情和乱装插件可能弊大于利。真正的世界级 Agent 工程师用极简配置，掌握少数基本原则——上下文控制、精确实现、设计任务终止条件、用规则和技能积累偏好，保持精简并定期清理。

---

## 核心原则：Less Is More

> "你不需要最新的 Agent 框架，不需要安装一百个包，也绝对不需要读遍所有文章才能有竞争力。事实上，你的热情可能弊大于利。"

作者现在用的是几乎最裸机的配置——只有基础 CLI（Claude Code + Codex），却在做最突破性的工作。

**为什么 Less Is More**：
- 每一代新模型都会改变最优工作方式，绑定太多依赖 = 锁死在一个可能已经不需要的"解决方案"上
- 如果一个外部工具真的解决了真实痛点，frontier 公司会把它直接内置（Skills、记忆、规划、子 Agent……都是这样进入产品的）
- Codex 5.2 一发布，曾经"必要"的 stop-hooks 就消失了——那些依赖它的人全部被坑

**判断某个工具是否值得用的标准**：OpenAI 和 Claude 是否都实现了它，或者收购了实现它的公司？如果是——它是真的有用。

---

## 一、上下文就是一切

> "上下文膨胀（Context Bloat）= 用花哨的方式说你的 Agent 被太多信息淹没了。"

反面例子：26000 行的 CLAUDE.md，装了各种记忆系统和插件 → Agent 要构建一个绞刑游戏，却被 71 个会话前的进程问题笔记干扰。

**原则**：只给 Agent 完成当前任务所需的精确信息，不多一个字。

---

## 二、精确描述实现细节

**错误做法**：`"Go and build an auth system."`
→ Agent 要先研究所有方案，上下文被无关实现细节填满，容易混淆和幻觉。

**正确做法**：`"Implement JWT authentication with bcrypt-12 password hashing, refresh token rotation with 7-day expiry..."`
→ Agent 直接聚焦，不做无关研究。

**不知道实现细节时的做法**：
1. 用一个 Agent 研究各方案
2. 自己或让另一个 Agent 决定采用哪种
3. **开一个全新上下文的 Agent** 来执行实现

---

## 三、理解"讨好性"（Sycophancy）设计局限

Agent 被设计为尽量满足你的指令——这是把双刃剑：

**陷阱**：说 `"Find me a bug in the codebase"` → Agent 会找到 bug，**哪怕需要发明一个**。

**解法一：中性提示**
- ❌ `"Find me a bug in the database"`
- ✅ `"Search through the database, follow the logic of each component, and report all findings."`

**解法二：利用讨好性——三 Agent 对抗系统**
1. **Bug 发现 Agent**：找到 bug 得分（低影响 +1，高影响 +10），鼓励它尽量找 → 得到所有可能 bug 的超集
2. **对抗 Agent**：驳倒一个 bug 得该 bug 的分，驳错则 -2×分 → 谨慎但积极地筛除假 bug → 得到真实 bug 的子集
3. **裁判 Agent**：声称自己有正确答案，评判前两者（答对 +1，答错 -1）→ 高保真结果

---

## 四、如何让 Agent 知道任务何时结束

Agent 最大的问题之一：知道如何**开始**任务，不知道如何**结束**。

**方法一：测试作为终止条件**
- 除非 X 个测试全部通过，任务才算完成
- 禁止 Agent 修改测试本身
- 确定性终止条件，人工 review 测试即可

**方法二：截图 + 验证**
- 让 Agent 实现到测试通过后截图，验证设计/行为是否符合预期
- 可以让 Agent 迭代直到截图结果满意

**方法三：`{TASK}_CONTRACT.md`**
- 在合约文件中明确所有需要完成的内容：测试、截图验证、其他检查
- 在 stop-hook 中阻止 Agent 终止，直到合约所有条款都已完成
- **精华**：**每个合约开一个新 Session**，而非一个 24 小时长跑 Session（长跑强制引入不相关上下文，造成漂移）

---

## 五、CLAUDE.md 的正确用法

> "把 CLAUDE.md 当作一个逻辑的、嵌套的目录，指向在特定场景下去哪里找上下文。它应该尽可能精简，只包含 IF-ELSE 逻辑。"

**规则（Rules）**：编码偏好
- 看到 Agent 做了你不想要的事 → 写成规则，告诉 Agent 在做那件事之前先读这条规则
- 规则可以嵌套、可以条件触发：`如果在写测试，读 coding-test-rules.md；如果测试失败，读 coding-test-failing-rules.md`

**技能（Skills）**：编码食谱
- 与其担心 Agent 不知道怎么解决问题，不如先让它研究并把方案**写成 Skill**，你审查后再用
- 在 CLAUDE.md 中指定：遇到 X 场景时，读这个 SKILL.md

**定期清理**：
- 规则和技能积累多了会相互矛盾，或造成上下文膨胀
- 定期让 Agent "去 spa"——整合规则和技能，去除矛盾，更新偏好
- 清理后又会感觉像魔法

---

## 六、上下文填充与假设

Agent 在"连点成线"、"填补空白"、"做假设"时表现最差。

**CLAUDE.md 最重要的规则之一**：在每次 compaction 后重新读取 CLAUDE.md 时，第一件事是：
1. 重读任务计划
2. 重读与当前任务相关的文件

---

## 总结

| 做什么 | 不做什么 |
|--------|----------|
| 裸机 CLI + 少量规则和技能 | 装一堆插件和框架 |
| 精确指定实现细节 | 让 Agent 自己研究再实现 |
| 中性提示 | 带偏见的提示（"找个 bug"）|
| 每个合约开新 Session | 24 小时长跑 Session |
| 用测试/截图作为终止条件 | 让 Agent 自己判断什么时候完成 |
| 定期清理规则和技能 | 无限堆叠规则导致矛盾 |
| CLAUDE.md 作为 IF-ELSE 目录 | CLAUDE.md 塞满所有内容 |

> "保持简单，用规则和技能，把 CLAUDE.md 当目录，对上下文和设计局限保持宗教般的警觉。"

---

**标签**: `AI` `工具` `技术` `Claude Code` `Agent工程`
