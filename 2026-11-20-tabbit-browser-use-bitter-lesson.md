---
title: Tabbit 万字复盘：做了一年半 Browser Use，我们学到的苦涩教训
date: 2026-11-20
source: 微信公众号「Founder Park」（授权转载自「潦草学者」）
url: https://mp.weixin.qq.com/s/6nHfcBLRSg7pGCrWXklZZw
type: article
tags: [AI, 方法论, 技术]
---

## 摘要

Tabbit 团队用一年半时间死磕「让 Agent 像人一样用浏览器」（截图+DOM+编号+逐步点击），把 DOM 压缩成上百种标签、裁剪不可见元素、测了数百种模型×harness 组合，始终没等来临界点。**转折点是被竞争对手打醒的**：Codex 发布 Chrome 扩展后，作者亲眼看它用半小时干完本该手工一个多小时的后台配置，再一个任务十分钟检查完 200+ 条无一遗漏——因为它不走 GUI 循环，只是**不断输出代码**，跑通第一条后剩下的 200 条就是一个 for 循环。这是 Sutton《The Bitter Lesson》的现场版：模型能力跨过临界点后，过去精心搭的脚手架反而成了限制。重构后的 Tabbit CLI 用「四层接口抽象」（Playwright 首选 → DOM-CUA → 视觉坐标 → 原始 CDP 兜底）把浏览器操作彻底变成编程问题，在 BU Bench V1 上正确率最高、成本最低、速度最快（每正确答案输入 token 比 Codex Chrome 少 49%，P90 220.6s vs Agent Browser 489s）。最有价值的几个反直觉发现：①Google 把感知执行做进 Chromium（APC/GLIC）且原生训练 Gemini Flash 做 batch tools，结果内部测评成绩平平甚至不如 Claude 3.7 Sonnet；②字节 Seed 1.8 的 GUI 能力史无前例强（点击准确率完爆 Claude），但 Seed 2.0 反而退步；③模型没被给工具时会自发 `pip install playwright`——Playwright 是模型的「母语」；④端侧小模型 Jev 单步判断准（95.2% 与 K3 持平，0.76s vs 8.54s）但长程任务 118 步里只能接管 2 步。

## 全文要点

### 缘起：The Bitter Lesson

> AI researchers have often tried to build knowledge into their agents — this always helps in the short term, and is personally satisfying to the researcher; but in the long run it plateaus and even inhibits further progress. Breakthrough progress eventually arrives by an opposing approach based on scaling computation by search and learning.
> —— Richard Sutton, 2019

### 01 GUI 路线的一年半（Browser Use 0.1 到全家桶）

**浏览器自动化的前史**：Selenium(2004) → PhantomJS(2011) → Puppeteer(2017, 基于 CDP) → Playwright(2020, 多浏览器+自动等待+深度控制通道)。CDP 能碰到浏览器里一切但写起来繁琐，Puppeteer/Playwright 把它包成一行代码。

**Browser Use 0.1（2024.11 开源）的 GUI 循环**：默认 GPT-4o（未针对 Computer Use 训练）。给 Agent 十个工具（search_google / go_to_url / go_back / click_element / input_text / extract_page_content / switch_tab / open_tab / nothing / done），每步自动 take_screenshot + get_current_state（元素、URL、标题、选择器映射、标签页）。

运行循环 = 看网页 → 模型决定下一步 → 执行 → 再看。给可交互元素编号（「12：搜索框」），模型返回结构化结果（对上一步评价 + 任务记忆 + 下一步目标 + 一个动作），控制器把编号映射到 XPath 再用 Selenium 执行，默认最多 100 步。

**同期其他方案**（本质相同：提供各种 tool 让 Agent 像人一样操作）：
- Browserbase 的 **Stagehand**：自然语言意图 + 代码执行
- 微软 **Playwright MCP**：MCP 协议交付结构化页面信息与底层操作
- Vercel Labs **agent-browser**：轻量 CLI，先取精简快照再按编号点击

**但整整一年多，到 2026 年这批工具迭代很多版本，始终没有从「可用」到「好用」的临界点**：速度慢、点不准、失败率高。

### GUI 路线的三个硬伤（实践出真知）

1. **复杂组件没有合法 DOM 节点**：飞书多维表格、各类云文档画布把交互嵌在 canvas 里，无法用选择器定位，只能退而求其次让模型输出 `click_coordinates` 预测 (x, y)。而 DOM 信息不但提供不了判断，甚至会干扰模型选择。
2. **坐标漂移**：即便 Claude 3.5 Sonnet / Opus 在真实网页截图上也会出现几十像素漂移；未支持原生多模态的国产模型在千奇百怪分辨率下盲猜坐标是灾难。**当时的任务成功率只有 60% 左右。**
3. **两个被证伪的「希望」**：
   - **字节 Seed 1.8**：GUI 点击准确率史无前例（内部 benchmark 甚至完爆 Claude），但操作手机上没有的组件（如下拉框：滑动找选项再选中）经常出错；且参数量不大智力较差。期待 Seed 2.0 放大优势，结果 **Seed 2.0 的 GUI 能力反而退步**（推测没加入相关数据训练）。
   - **Google APC / GLIC**：把感知执行做进 Chromium 源码——APC（Annotated Page Content）遍历 Blink layout tree 把渲染后页面整理成结构化内容（文本/角色/位置/样式/链接/表单状态/可否点击编辑聚焦），Actor 框架负责动作。**APC 内容极全但大得可怕，本质是把网页图片信息硬生生用文本塞给模型。** 因上下文压力，Google 尝试一次读取输出多个动作（batch tools），2026.6 把 Computer Use 原生集成进 Gemini 3.5 Flash。作者观察 Gemini 3.5/3.6 Flash 像「精力过剩的多动症小孩」——不愿深度思考但格外爱快速触发动作（CursorBench 4.0 上平均步数远超其他模型），但**这个特点没被继承到 Gemini 4 系列**。内部测评：Gemini 3.5/3.6 Flash 在 GLIC 框架下成绩平平，甚至比不上 Claude 3.7 Sonnet；Gemini Chrome Use 只在小范围开放。**「Google 有浏览器、有数据、有模型，完全有能力定义这套方式，但从浏览器底层到接口层到模型训练全投了，成绩也没取得很好效果。」**

### 02 转折：从 eval_javascript 到 Coding-First

- **2026 年初的偶然发现**：早先给 Agent 提供 `eval_javascript` 工具（让模型直接在页面内写 JS 完成动作），成功率与速度有质的提升——因为点击按钮、填表单、提评论在页面里只是 `document.querySelector('button').click()`，代码直接面对 DOM，该循环就循环该筛选就筛选。但早期模型经常写出错误 JS 反复重试反而累积上下文，所以只当「脚本妙招」这种取巧功能上线。
- **理论早已有之**：2024.2 **CodeAct** 论文提出把「可执行代码」作为统一行动介质（代码天然表达循环、判断、异常捕获、工具串联），突破工具调用的协议枷锁；2025.1 Hugging Face **smolagents** 浏览器案例让 CodeAgent 直接写 Python 调 Helium/Selenium。
- **2026 年某个深夜被 Codex 震醒**：新功能上线要手工配一批后台选项（约一个多小时）。Codex 刚发 Chrome 扩展，作者顺手一试——**不到半小时全部配完，再发一个检查任务十分钟全部检查完无一遗漏**。关键不是速度，而是方式：它不截图、不提取 DOM、不裁不可见元素、不算滚动偏移，「只是一味地不断输出代码。跑通第一个配置后，剩下的 200 多个任务对 Coding Agent 而言，仅仅意味着代码里的一个遍历循环」。

### 拆解 Codex：四类接口抽象（主次颠倒）

1. **Playwright（首选）**：selector / role / text / testId 定位，写 `locator().click()`。可读、稳定、模型最熟悉。
2. **DOM-CUA**：读只含可交互元素的 DOM，用 node_id 点击/输入/滚动。介于 Playwright 与视觉之间。
3. **视觉 CUA**：看截图用 (x,y) 坐标点击。**只在 Playwright 定位不到时兜底**（画布、飞书表格）。
4. **原始 CDP**：直接发 DevTools Protocol 命令，最后一层兜底。

> 工具元素一个都没变，但**主次变了**：Coding 成为主要角色，只有 coding 解决不通时才退而求其次用 GUI 方案。

### 03 Tabbit CLI（2026.8）：为什么选 Playwright 而不是裸 CDP

- CLI 特性：Agent 通过 CLI 控制真实浏览器，**执行环境保留页面/变量/任务进度，复用用户已有登录态**；Agent 在后台任务空间工作不抢用户窗口；用户可与 Agent 在浏览器里协作。
- **为什么 Playwright**：①**模型对 Playwright 最熟**——最有力的证据是：不给任何浏览器工具、只给终端和代码执行能力时，模型会自发 `pip install playwright && playwright install chromium`。推测训练语料里 Playwright 占比远高于其他框架（InSTA 研究也直接用 Playwright API 轨迹训模型）。②**Playwright 与 CDP 不互斥**——它是建立在底层控制能力上的高层封装，且提供 `CDPSession`，常规接口不够时可下沉到原始 CDP。
- **与 Browser Use 的 taste 差异**：Browser Use 是极客取向，尽量减抽象，让模型直接面对 CDP（2025 年就放弃 Playwright，2026.11 发 V1.0.0「All in CDP」）；Tabbit 务实取向，用成熟封装处理常规任务更简单稳定，特殊需求才下沉 CDP。
- **Benchmark（BU Bench V1，25 题 × 3 次 = 75 次，同模型，Reviewer 模型判分）**：Tabbit CLI 正确率最高、成本最低、速度最快。每个正确答案的输入 token 比 Codex Chrome 少约 49%、比 Agent Browser 少约 61%；P90 耗时 220.6s vs Agent Browser 489.0s。5 个业务案例：AI 日报整理、小红书内容复刻脚本、有赞后台录入商品、飞书多维表格写入、股票价格跟踪。

### Browser-use 的公开转向（时间线，外部验证）

- 2026.4 博客《The Bitter Lesson of Agent Harnesses》：不要把浏览器操作封太死，给 Coding Agent 底层 CDP 访问，允许它修改自己的工具代码按需补能力。
- 2026.6 把 CLI 加入并迁移到开源仓库新 Harness 路线：状态不再由框架预先整理，动作不再来自固定菜单。
- 2026.9 续篇《The Bitter Lesson of Browser Agents》：正式确认 Coding Agent Harness 才是最成熟方案，只需加 `browser_exec` 一类工具让模型用持续代码和底层 CDP 自己决定观察什么、执行什么。
- 2026.11 发布 V1.0.0，All in CDP。

### 04 端侧小模型 Jev 能做 Browser Use 吗？——局部可以，长程不行

- 判断：Jev 适合**问题明确边界**的局部判断，聚焦单网站内完成一个流程；网页环境变化大、更开放的任务智能不足，每步决策仍需通用 Agent。**关键在问题是否固定、答案能否从当前输入直接判断。**
- 数据：165 张浏览器截图离线测试，Jev 判断页面状态准确率 **95.2% 与 Kimi K3 持平**，中位延迟 **0.76s vs K3 的 8.54s**；给明确点击目标+元素列表+截图，36 道定位题 Jev 答对 35、K3 36。
- **但单步判断准 ≠ 长程任务可行**：10 个 BU Bench 任务中让 Jev 优先决策、低置信度交 K3，最终 **118 步里只有 2 步由 Jev 决定**，没有减少 K3 调用；改成 K3 规划 + Jev 点击也未见可靠收益（规划方案未有效触发，Jev 实际 0 次点击）。样本小不能断言无效，但**不能把局部提速推广成完整任务提速**。
- 结论：把 Jev 用在经过验证的具体环节。

### 05 结论：Browser Use 的 Bitter Lesson

- 一开始给模型很多工具、企图让它像人一样「看→想→点」。有人优化模型、有人优化 harness、有人加新工具，但始终找不到「比人还快」的临界点：模型小了智能不够，模型大了速度太慢，不同模型在不同 harness 下表现又不同。
- **模型能力提升后，几乎一夜之间颠覆了脚手架。** 有没有可能模型根本不需要这些脚手架，详细工具反而限制了发挥？
- 代码执行给它的四个能力：**能组织循环和条件；能保存中间状态；能自己处理框架没预见的 edge case；能修改工具补上下一个缺失的函数。**
- 「你必须承认：自己曾经引以为傲的设计，也可能成为下一步的阻碍。」

### 06 WebMCP：另一条支线

- 前述所有方案（GUI / JS / Playwright / CDP）解决的都是「Agent 怎样进入已有网页并理解、操作它」。
- **WebMCP** 提供反方向：网站通过 `navigator.modelContext` 主动声明给 Agent 用的结构化工具（如电商不只展示商品页，还提供查询订单、添加商品的业务接口）。**Agent 不必靠 DOM 推断网站能力，网站直接告诉它「我能为你做什么」。**
- 作者判断：不会马上替代通用 Browser Use（大量网站不会立刻改造，权限/安全/结果验证仍需机制），但很可能成为下一条重要支线——**通用代码接口覆盖存量互联网，WebMCP 让愿意参与的网站提供更稳定明确的业务动作。**

> 延伸阅读（文中提及）：LobeHub 一线复盘（本库已有 `2026-11-18-lobehub-super-agent.md`）
