---
title: 如何用 Claude 搭建一个真正懂你的个人 AI 系统
date: 2026-05-18
source: x.com / @boniusex
url: https://x.com/boniusex/status/2055549228403896383
type: article
tags: [AI产品, 工具, 方法论]
---

## 摘要

这篇文章把「个人 AI 系统」拆成 7 层：Personal Preferences、Projects、Memory、声音模仿、Project Knowledge、工具连接器和定时任务。核心观点是：AI 真正的效率差距不在一次性 prompt，而在是否持续沉淀个人上下文、写作风格、项目知识和自动化流程。对用户有价值的是，它和 OpenClaw / Claude / Skills 的长期记忆、项目级上下文、定时工作流非常同构，可作为搭建个人办公 Agent 和资讯整理系统的轻量清单；但文章表达偏增长营销，实践部分需要结合隐私和权限边界谨慎落地。

## 全文

如何用 Claude 搭建一个真正懂你的个人 AI 系统

@boniusex (粥粥聊 AI)  2026-05-16 15:21:40
你的 AI 还不认识你（修好它只要 60 分钟）🤯

你打开 ChatGPT 或 Claude，第一件事是什么？

重新自我介绍一遍。

我叫什么。我做什么业务。我偏好什么风格。上次聊到哪儿了。那个客户叫什么来着。我的定价是多少。

AI 一晚上就把你忘了。第二天早上，你又从零开始。真正开始干活之前，先浪费 15 到 20 分钟在重复输入上。

你习惯了。你以为这就是 AI 的正确用法。

不是的。

真正会玩的人，早在三个月前就搭好了一套 "永远记得你是谁" 的个人 AI 系统。它知道你名字、你业务、你写作风格、你客户名单、你定价层级、你讨厌什么表达、你最近在推进什么目标。

你只需要搭一次。之后每一次新对话，都从第 10 公里开始，而不是从 0 公里。

我三个月前搞完这套系统，差别大到我自己都觉得离谱——Claude 会接我的话；不用我提醒就能用我的语气写；根据上下文就知道我在说哪个客户；记得我上个月做过的某个决定；还会根据它见过的历史模式，帮我揪出我漏掉的错误。

它已经不是聊天机器人了。它是一个比很多同事更了解我的私人 AI。

这篇文章，就是完整的搭建教程。不需要写代码，不需要技术背景。每一步照着做就行。

读完还不行动的，只能说 AI 替你省下来的时间，你还不配拿 🌚

第一层：告诉 AI 你是谁（5 分钟）

这是地基。后面所有东西都盖在这上面。

打开 Claude → 点你头像 → Settings → Personal Preferences。

这玩意儿是干嘛的？你写在这里的内容，会自动注入到每一次新对话。以后你再也不用重复解释自己是谁。

直接抄这个模板：

WHO I AM
- Name：你的名字
- Role：你的职位 + 你每天实际在干什么
- Company：公司名 + 一句话介绍
- Industry：行业
- Experience：经验年限 + 核心能力

HOW I WORK
- 我喜欢简短/详细的回答（除非我额外要求）
- 我的沟通风格：随意/专业/直接
- 帮我写作时，用我的语气，别写出 AI 味
- 我用这些工具：Notion、Slack、Google Docs（列出你的）

WHAT I DO NOT WANT ⭐
- 永远别用 "Great question!" "Absolutely!" 开头
- 别用 em dash
- 别说 "dive deep into" "in today's world" "it's worth noting"
- 别问 "would you like me to continue?" —— 直接继续
- 别给通用建议。针对我的具体情况。

MY CURRENT GOALS
- 目标 1（你现在的主线）
- 目标 2
- 目标 3

控制在 500 词以内。越短越好。

最炸裂的是 "What I Do NOT Want" 这一栏。大多数人直接跳过，但这才是让输出像人写的关键。告诉 AI 你不想要什么，比告诉它你想要什么有用得多。

填完这一段，开个新对话随便问个问题。你立刻能感觉到输出不一样了。

第二层：给不同工作建不同脑子（15 分钟）

大多数人犯的致命错误：用同一个聊天窗口处理所有事情。

营销问题、代码问题、客户邮件、个人研究——全部塞进一个混乱的对话里。

结果？AI 也混乱了。你问营销时的上下文在污染代码回答。写客户邮件时的语气渗进了你的个人写作。

解决方案：Projects。

Claude 的 Project 就是一个独立工作区。它有自己的指令、自己的文件、自己的记忆、自己的对话。每个 Project = 你生活中某个领域的独立大脑。

我的设置长这样：

- Project 1：内容创作 — 知道我的风格、受众、内容日历、表现最好的帖子
- Project 2：客户工作 — 知道我的客户、他们业务、偏好、项目历史
- Project 3：业务运营 — 知道我的 SOP、定价、工具、工作流
- Project 4：研究与学习 — 知道我在学什么、能力短板、学习目标
- Project 5：个人 — 知道我的年度目标、日程偏好、健康目标、待读书单

每个 Project 写 3 到 5 行自定义指令就够了。比如内容创作 Project：


> This Project is for content creation. My audience is AI professionals. My tone is direct, practical, no jargon. My best-performing content is how-to guides with specific numbers. When writing for me, use short sentences. No filler. Lead with value.
现在立刻创建 3 个 Project：内容创作、客户工作、个人。10 分钟搞定，改变巨大。

第三层：打开记忆（2 分钟）

这一层很多人甚至不知道存在。

Claude 有记忆系统。它能从你的对话中学习，记住你的偏好、模式、修改意见。用越久，越懂你。

但默认 没有打开。

Settings → Memory → 打开它。

就两下点击。从此 Claude 会自动建立你的个人画像。

它会注意到：你总是要求 bullet points，不喜欢长段落 → 记住，以后自动用。你连续三次纠正了某个格式偏好 → 记住，不再犯。你在五次对话中提到过公司名 → 记住，合适场景自然使用。

你也可以手动命令："Remember that my client Sarah prefers formal emails with no exclamation marks."

想查看 Claude 记住了什么？Settings → Memory。一目了然。随时编辑、随时删除。

记忆的真正威力在于复利。一周后，Claude 了解你的基础信息。一个月后，了解你的模式。三个月后，在你把问题说完之前，它已经提前判断你真正需要什么。


第四层：教 Claude 精准模仿你的声音（10 分钟）

这一层会让别人愣住："它怎么知道要这么写的？？"

Claude 默认的写作风格是礼貌、平衡、略正式。所以它很容易有 AI 味。全世界用户的输出都长得差不多。

解决方案：给它看你自己的写作样本。

四步走：

Step 1 — 收集 5-10 篇你最满意的作品。博客、邮件、社媒帖子、报告，只要能代表你最好的表达。

Step 2 — 打开你的内容创作 Project，把这些文件上传到 Project Knowledge。Claude 会读完它们，学习你的表达模式。

Step 3 — 在 Project 里加一段声音指令：
> VOICE PROFILE: My sentences are short, rarely over 15 words. I use simple words — never "utilize" when "use" works. I start paragraphs with action, not throat-clearing. Never use "in order to" or "it is important to note." End with a clear action step, not a summary.
Step 4 — 创建自定义 Style。Settings → Styles → Create custom style → 粘贴你的声音规则 → 命名为 "My Voice"。之后任何对话都能一键切换。

没设声音前的 Claude 输出，你可能要改 30 分钟。设完之后，改 30 秒就够了。


第五层：把你的世界上传到 Claude（15 分钟）

每个 Project 都能保存文件。这些文件会成为 Claude 的知识库。它会读、会引用、会用来给你更具体的答案。

每个 Project 分别上传什么：

- 内容 Project：内容日历、表现最好的帖子、受众研究、品牌指南、禁用表达
- 客户 Project：客户列表和关键信息、定价层级、提案模板、SOW 模板、项目历史
- 运营 Project：重复任务 SOP、工具栈文档、会议模板、入职清单
- 学习 Project：当前阅读清单、技能差距分析、季度学习目标
- 个人 Project：年度目标、日常作息、健康目标、待读书单

AI 持有的上下文越多，答案越好。

比如你问"帮我写一份客户提案"。没上下文 → 给你一个通用模板，屁用没有。有上下文 → 根据你真实的定价、真实的服务范围、真实的条款，出一份定制文档。

别一次塞太多。每个 Project 先放最重要的 3 个文件。之后发现缺什么再补。

第六层：把 Claude 接入你的真实工具（10 分钟）

Claude 能连接你已经在用的工具：Gmail、Google Calendar、Google Drive、Slack，以及一堆 MCP 连接器。

每接一个工具，系统价值翻一倍。
 - 接 Gmail：Claude 读你的邮件、起草回复、标出紧急消息
- 接 Google Calendar：查看日程、帮你准备会议、建议时间块
- 接 Google Drive：读取你的文档、引用你的文件、直接保存输出
- 接 Slack：扫描频道、找出需要你关注的讨论、发布更新

Settings → Connectors → 添加 → 授权 → 完成。

接完之后，你的 Morning Briefing 就变成真的了。Claude 读你的真实邮件、真实日程、真实 Slack——不是假设案例，是你的真实生活。

今天先接 Gmail 和 Google Calendar。明天早上问 Claude："What does my day look like and what should I focus on?"

它会根据你的日程、邮件和截止日期给你一个具体回答。那一刻，你才真正明白这玩意儿值多少钱。

第七层：让它在你睡觉时工作（5 分钟）

最后一层。这一层把整个系统，从 "你主动用的工具"，变成 "主动替你工作的系统"。

Claude Cowork 有 scheduled tasks。Claude Code 有 Routines。定时自动化，不需要你手动点。

我的三个定时任务：

☀️ 早上 6:30：Morning Briefing — Claude 读我的 Gmail、Calendar、Slack，生成一页简报，发到我个人 Slack 频道。我打开电脑前，今天重点已经整理好了。

📊 周五下午 4:00：Weekly Report — 汇总本周成果、指标、下周重点，保存到 Google Drive。我花 5 分钟看一遍，直接转发。

📝 周日晚上 8:00：Content Plan — Claude 读取数据，找出表现最好的内容，生成下周内容计划，包含 hook 和大纲。周一早上直接执行，不用再花一小时临时想选题。

现在设一个定时任务。从 Morning Briefing 开始。设为明天早上 6:30。连接 Gmail 和 Calendar。明天一早打开电脑看 Slack——你的简报已经在等你了。

那一刻你会意识到：你没有在用一个聊天机器人。你在运行一个个人 AI 系统。

复利效应

搭完这 7 层之后会发生什么？

- 第 1 周：Claude 知道你的名字、角色、偏好。回答不再那么通用了。
- 第 2 周：通过样本学会了你的声音。写出来的东西开始像你自己写的。
- 第 3 周：记忆开始积累。记得你的客户、项目、习惯。你不再需要反复解释。
- 第 1 个月：定时任务在跑。早晨变快了。报告自动生成。内容计划每周日晚上自动出现。
- 第 2 个月：Claude 开始提前判断你需要什么。在你开口前给建议。根据历史模式抓你的错误。引用三周前的对话。
- 第 3 个月：你没法想象回到从前。再打开空白 AI 聊天窗口，就像从智能手机退回翻盖手机。

每一层强化其他层。记忆让 Projects 更有用。Projects 让声音匹配更准。声音匹配让内容创作更快。连接器让定时任务更聪明。所有东西互相叠加。

现在该干什么

别试图今天一天搭完 7 层。那样最容易烂尾。

今天：完成第 1 层（Preferences，5 分钟）+ 第 2 层（3 个 Project，15 分钟）+ 第 3 层（Memory，2 分钟）

明天：第 4 层（上传写作样本 + 声音档案，10 分钟）

本周：第 5 层（关键文件上传，15 分钟）+ 第 6 层（接 Gmail 和 Calendar，10 分钟）

下周：第 7 层（第一个定时任务，5 分钟）

总共大约 60 分钟，分散在一周内。用 60 分钟，搭建一个每周帮你省 5-10 小时的系统。

大多数人读完这篇，脑子里想的是 "以后再做"。

真正打开 Claude 开始填 Personal Preferences 的人，会后悔自己为什么没早三个月做这件事。

你的 AI 还不认识你，现在去修好这件事。

https://x.com/i/article/2055547800814043136
