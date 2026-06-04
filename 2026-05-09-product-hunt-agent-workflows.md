---
title: "Product Hunt月榜盘点：单纯做Agent已经不够了，要切进真实、高频的工作流中"
date: 2026-05-09
source: 微信公众号 / Founder Park
url: https://mp.weixin.qq.com/s/YNLocBG1pgYjNVxTiZhQbw
type: article
tags: [AI产品, 工具, 商业]
---

## 摘要

这篇文章复盘 2026 年 4 月 Product Hunt 上 500+ 个 AI 新产品，指出 AI Agent 的市场评价标准正在从“是否像 Agent”转向“能否进入真实、高频工作流并交付结果”。高票产品集中在本地商家网站生成、团队协作 Agent、招聘关系 OS、设计/工程/会议/内容生产工作流等方向，核心共同点是拿到上下文、连接工具、输出可用资产。文章还观察到 MCP 已成为 Agent 产品的标配基础设施，Voice AI 则从底层 API 转向消费级产品窗口。整体很符合你的偏好：它不是单品安利，而是把 Agent 产品从命名红利、生态爆发拉回到工作流、上下文和交付结果这几个关键判断维度。

## 全文

4 月底，我们对 Product Hunt 上当月出现的 500+ 新 AI 产品进行了一次大盘点，相比 3 月，数量少了近 16%。

在 3 月的榜单上，OpenClaw 生态的「命名红利」仍然存在。KimiClaw、JDoodleClaw、KatClaw...... 只要带「Claw」字样的产品就能获得不错的票数。这也是典型的生态爆发期信号：新入口出现了，创业者们一拥而上，先占位再说。

但在 4 月，这种逻辑失效了。OpenClaw 的标签效应在消退，但 Agent 产品形态，逐步稳定下来了。市场开始用更实际的「标准」来衡量 AI 产品：能做好哪些具体任务。

4 月，Product Hunt 上的高票产品给出的答案也越来越具体：Brila 可以直接生成可上线的商家网站，ProdShort 把会议变成可发布内容，Figma for Agents 把 Agent 接进设计系统，Claude Code Routines 让 Agent 自动跑工程任务，Fathom 3.0 把会议记录变成可全局搜索的知识库。

这批产品的背后都是同一个逻辑：AI 不只是能聊天、会生成，而是要真实嵌进工作流，拿到上下文，连接工具，交付结果。

单纯做一个 Agent，已经不够了。更关键的问题是：进入了哪些高频的工作流中？

以下是部分 AI 产品盘点。

## 01

## Agent 产品：「能干活」开始成为新的门槛

[上个月](https://mp.weixin.qq.com/s?__biz=Mzg5NTc0MjgwMw==&mid=2247523706&idx=1&sn=adbdaaab9da6cf62d02885f619bc4195&scene=21#wechat_redirect)，我们在盘点 Agent 产品时，发现的一个趋势是：Agent 正在越来越精准地切入某个具体场景，甚至瞄准真实业务流程中的具体岗位。

4 月，这个趋势正在更加清晰地被验证。产品更多突出的能力是：我能帮你完成哪些具体的任务。Agent 赛道的竞争门槛，从「我是谁」变成了「我具体能干好什么活」。

**Brila**

产品官网：https://brila.ai/

4 月，PH 全月的最高票，给了一个 Agent 平台 Brila，1287 票。什么概念？3 月的最高票是 Claude Import Memory（736 票），Brila 是它的 1.7 倍。

Brila 的定位是一个综合性的 Agent 平台，核心亮点是：不只是聊天，能帮用户完成完整的工作流。

Brila 做的事情很具体。根据 Google Maps 上的真实评论，为本地商家生成一页式网站。传统网站生成器通常需要给用户一个模板，再配一些泛化文案。但 Brila 的切入点是先读评论，然后从里面找出用户为什么选择这家店，再用真实措辞、真实照片和真实购买理由生成页面。

除了票数高这一点外，Brila 更值得关注的是，它其实反映了 4 月 AI 产品的一个方向：AI 不再只是单纯的生成内容，更多是能直接生成可用资产。

最热的产品，已经开始直接交付商业资产了。

**Offsite**

产品官网：https://www.teamoffsite.ai/

Offsite 主打的方向是，Your AI Coworker。

但不同的是，Offsite 把人类和 Agent 放进同一个团队，让大家在一张实时组织架构图里协同工作。

之前的 Agent 产品，基本都是「一对一」的使用方式，打开一个 tab，给 Agent 发指令，等它回来告诉你结果。Offsite 把这个模式翻转了：Agent 不再是单独调用的工具，而是作为团队成员存在，和人类同事并排出现在组织架构图里，实时对话、实时协作。

用户可以看到每一条对话记录，审批涉及真实操作的动作，对整个团队的运转保持完整的可见性和控制权。同时还可以接入 Claude Code、OpenClaw 等现有的 Agent 工具。

**Lessie AI**

产品官网：https://lessie.ai/

Lessie AI 也是 4 月 PH 榜上票数较高（413 票）的一款 Agent 产品，解决的是「招人」的问题。

找到合适的人，一直是招聘、销售和商务拓展里最耗时的环节。传统方式是在 LinkedIn 上手动筛选、打标签、逐条发消息。

Lessie 的切入点是：描述你想找的人是谁，比如「美国东海岸、50～200 人规模的 B2B SaaS 创始人」，Agent 自动拆解搜索条件，跨平台扫描数百万条专业档案，然后把匹配结果连同 LinkedIn 主页、邮箱等联系方式一并交付。

更进一步，Lessie 最后想构建一个「关系操作系统（Relationship OS）」，在帮你找到人之后，帮你管理和维护有价值的长期关系。

## 02

## AI 产品：开始把 Agent 接进用户已有的流程中

如果说 2 月、3 月的类 OpenClaw 产品，更像是在围绕 Agent 建生态。那 4 月的趋势是，头部的一些 AI 产品已经开始纷纷在自己的产品中叠加 agent 功能。

**Figma for Agents**

功能介绍：https://www.figma.com/blog/the-figma-canvas-is-now-open-to-agents

Figma for Agents 就是一个典型例子，直接让 Agent 进入到了 Figma 设计团队已经在用的工作流里。

Figma for Agents 解决的是一个很具体的问题：AI 生成设计时，经常看不到团队已有的设计系统，所以很容易做出不符合品牌规范的界面。

Figma for Agents 的方法是通过 use_figma MCP tool，让 Agent 能连接到设计系统，理解组件、规范和上下文。

**Claude Code Desktop App Redesigned、Claude Code Routines**

Claude Code Desktop App 这次的重大改版，也是类似的逻辑，让开发者在一个桌面工作区里运行多个并行 coding agents。开发者能够跨多个 repo 开 session，查看 diff，编辑文件，完成交付，不需要再在多个终端和工具之间切换。

Claude Code Routines 更进一步，直接把 coding agent 变成可定时、可通过 API 或 GitHub 事件触发的自动化任务，比如自动 review PR、整理 backlog、验证部署，不需要开发者一直开着电脑，也不需要自己维护 cron job 或服务器。

这也说明了 AI Coding 正在从单纯的写代码，走向「帮我跑完整个工程流程」。

过去开发者产品拼的是补全速度和上下文长度，现在开始拼谁能真正接管开发流程里的重复任务：review、triage、验证、修复、同步和发布。

## 03

## 底层成熟、成本下降：Voice AI 的消费级窗口打开了

Agent 之外，另一个值得关注的产品方向是 Voice AI。

在 2 月、3 月，PH 榜单上 Voice 相关的新产品，基本上清一色都是针对底层能力，集中上线了一批底层 API 产品。Krisp Accent（413 票）做得是口音转换，ElevenAgents Expressive（154 票）针对语音合成，AssemblyAI（117 票）是语音识别。它们的目标用户基本都是面向开发者，产品形态大多是 API、SDK。

但 4 月，情况完全不同了。能明显感觉到，语音产品更加「成熟」，产品形态从 API 变成了消费级产品，目标用户也从开发者变成了终端用户。

当底层 API 成熟且成本逐渐下降时，做消费级产品的窗口就打开了。底层模型够用了，现在拼的是谁先做出用户真正愿意用的产品。

**NovaVoice**

产品官网：https://novavoice.app/

NovaVoice 是 4 月语音赛道的最高票，面向终端用户的语音交互产品。和 3 月的语音产品追求「怎么让语音听起来更自然」不同的是，NovaVoice 直接解决的是「用说的来完成工作」这个需求。

NovaVoice 把自己定义成「Voice OS」。用户按下快捷键，说话，NovaVoice 能生成上下文感知的文字，语速可以达到 200+ wpm，比打字快得多。

但它不仅仅只是听写工具，进一步变成了用语音完成桌面操作。能响应跨应用的语音指令，不用切换 app 就完成操作，同时会主动记住用户的联系人、常用地址、链接等信息，下次直接调用。它的产品定义是：写、答、做，全部通过声音在桌面完成。

核心逻辑是，让用户用说话来完成打字能做的一切事情。

**Velo**

产品官网：https://www.usevelo.ai/

Velo 做的是 AI 播客，用 AI 来生成和编辑播客内容，解决的是从「随手录一段」到「可以发出去」之间的加工问题。

原始屏幕录制往往质量粗糙，剪辑费时，很少有人愿意花时间整理成可分享的内容。Velo 做的事是用 AI 直接把原始录屏转化成观感流畅、可以直接发送的视频信息。

Velo 的目标用户是产品团队、销售团队和远程协作团队。在这些团队的日常工作场景中，录屏本身是高频动作，但原始素材几乎从不直接对外。Velo 的核心价值，是把「临时录一下」变成「可以发给客户或社区的内容资产」。

值得关注的是，在 3 月的 PH 榜单上，是没有音频内容产品进入前 10 的。Velo 的出现意味着，Voice AI 不只是「交互界面」的故事，还是一个「内容生产」的故事。当语音合成质量足够好、成本足够低时，音频内容的生产方式也在被改变。

**Claude Code Voice Mode**

功能介绍：https://support.claude.com/en/articles/11101966-using-voice-mode

Claude Code Voice Mode 是 Anthropic 为 Claude Code 增加的语音交互模式，开发者可以直接用语音和 AI 编程助手对话，不需要打字输入 Prompt。

Claude Code Voice Mode 支持语音和文字切换，同时提供免手持和按键说话两种模式，方便用户在多任务、学习或移动场景下保持工作节奏。

Anthropic 亲自下场做这件事，也说明了语音作为专业工具交互界面的可行性正在逐步被验证，连写代码这种高度精确的场景也都能用语音驱动。

**Fathom 3.0**

产品官网：https://www.fathom.ai/

和 Voice AI 相关，另外一个值得关注的场景是，会议记录。会议记录是 AI 最容易落地的场景之一。

AI 会议记录产品 Fathom 3.0 版本更新拿到了 PH 日榜的榜首，711 票。这次 3.0 升级包括 bot-free capture、账号级 AI 搜索、Claude 和 ChatGPT 集成、实时摘要、会议中 scratchpad，以及重新设计的桌面体验。

Fathom 这次最核心的更新在于 bot-free capture。以往 Fathom 需要一个 bot 作为参会者加入会议，3.0 让用户可以逐场选择：带 bot 的完整录像、无 bot 的纯音频转录、或仅转录文字，且在无 bot 模式下依然保留说话人识别能力。这也让 Fathom 第一次支持了 Slack Huddles 的记录。

Fathom 的更新方向反映了，会议记录已经不只是「录下来再总结」，而是要进入整个会议前后流程。会中能实时记重点，会后能跨账号搜索和提炼洞察，还能接入 Claude、ChatGPT 继续处理信息。

## 04

## MCP 没过时，

## 已经成为了 Agent 的标配基础设施

在基础设施方面，4 月最值得关注的一个变化是：MCP 已经成了各种 Agent 产品的标配框架。但有意思的是，半年前大家在讲得是 MCP 已经过时了。

截至 4 月底，MCP 的 SDK 月下载量超过了 1.1 亿次，公开活跃服务器超过 10,000 个，社区贡献的 MCP Server 超过 5,800 个。

现在，各家产品把 MCP 放到了具体的工作流，连接权限、审批、上下文和真实工具中。大量 Agent 平台和工作流工具在功能列表里写着「支持 MCP」。

上边提到 Offsite 就是一个很好的例子。它接入了 Claude Code、OpenClaw 和任何 MCP-compatible agent。

**Flint**

产品官网：https://www.tryflint.com/product/api-mcp

Flint 也用了 MCP，但切入点不同。Flint，旨在帮助团队规模化生成符合品牌规范的 landing page。Flint 支持通过 API 或 MCP，从 Claude、CRM 和 GTM 工作流里直接生成页面，用于广告落地页、AEO、GEO、SEO、ABM 和竞品对比页。

**CalendarPipe**

产品官网：https://www.calendarpipe.com/

CalendarPipe 则是把 MCP 放到了日历场景中，可以同步 Google、Outlook、Apple Calendar，通过 programmable pipes 过滤、转换和路由日程。对 agents 来说，它提供 REST API、CalDAV 和 MCP server，让 Agent 能够创建自己的日历、发送邀请。

MCP 更多成为了 Agent 创业的基础设施，在做新产品的时候，或许要先想清楚 MCP 策略是什么。

## 05

## 内容生产类产品成为「黑马」：Agent 开始接管生产的整条链路

AI 内容生产，是 4 月里最容易被忽视、也最出人意料的高票 AI 产品方向之一。对比 3 月 PH 上最高票的视频产品 Mosaic（202 票），4 月月榜的第二名 AI 内容生产工具 ProdShort（707 票），开始从不只是生成内容，延伸到发布、分发和效果追踪的完整链路。

**ProdShort**

产品官网：https://prodshort.com/

ProdShort 主打的是把会议内容，直接转成可以发布的短视频、LinkedIn 和 Twitter 内容。

ProdShort 的切入的非常清晰：创始人和团队每天在会议里说了很多有价值的东西，但很少有人有时间把这些内容整理成对外传播素材。ProdShort 做的事是，把创始人的真实表达剪出来、润色、重组，再变成可发布内容。

ProdShort 作为月榜第二名，拿到了 707 票，仅次于 Brila。这个成绩在视频赛道尤其值得注意，3 月 PH 上最高票的视频产品 Mosaic 只有 202 票。对于创业者来说，ProdShort 也说明了「短视频自动生产」是一个被验证的用户需求。

前面提到过的 Velo 也和 ProdShort 类似。

**Google Vids 2.0**

更新介绍：https://blog.google/products-and-platforms/products/workspace/google-vids-updates-lyria-veo/

Google Vids 2.0 是谷歌在 Cloud Next '26 大会期间发布的产品更新。

核心是，把谷歌旗下视频生成用 Veo 3.1，音乐生成用 Lyria 3 这些最强的 AI 生成模型全部集成进来。同时，还新增了可控 AI 数字人，这些虚拟形象在不同场景下外观和声音保持一致，可以按提示说话、与画面中的物体互动。此外，还新增了 Chrome 录屏插件，支持直接发布到 YouTube，整体降低了视频内容的制作和分发门槛。

谷歌入场，开始做 AI 视频工具，说明这个赛道的市场规模已经被充分验证了。但对创业公司来说，同样也意味着通用型 AI 视频工具的竞争窗口正在收窄。留给独立产品的空间，将越来越集中在垂直场景和特定工作流上。

**Influcio**

产品官网：https://www.influcio.com/

Influcio 是一个 AI 内容生产工具，定位是面向网红营销方向的 Agent 产品。

与单纯的 AI 内容生成工具不同的是，Influcio 更多延伸到了管理内容分发和优化内容投放效果的环节。

Influcio 的核心逻辑是用一个自学习系统来替代传统的单次投放模式。简单来说，它不只是一个 KOL 数据库，能根据真实转化数据来筛选创作者，自动管理从找人、沟通到结果追踪的完整流程，并把每次活动的表现数据反馈给算法，用于优化下一次投放。

对营销团队来说，Influcio 的好处是，不需要在 Instagram、表格、CRM 和付款工具之间来回切换，整条链路在一个平台内完成。

Influcio 的高票数，也说明了 AI 内容生产工具的边界正在逐步扩展，不只是生成内容，延伸内容发布、效果追踪等各个环节。AI 正在接管营销执行层中最繁琐、最依赖人工判断的部分。

## 06

## AI 产品：开始进入更冷静、更具体的阶段

如果把在 2 月、3 月、4 月的 AI 产品盘点连起来看，我们会发现，AI 产品的变化路径很清晰：

- 2 月，OpenClaw 这样的新入口带动了一波生态爆发；
- 3 月，Agent 产品开始扩散到更多场景；
- 4 月，榜单里的高票产品开始回到具体工作流。

这些产品都共同反映了：AI 应用开始进入更冷静、更具体的阶段。

尤其是对于创业者来说，单纯做一个 Agent 已经不够了。更关键的问题是：你的产品进入哪个高频工作流？拿到什么上下文？连接哪些工具？最终交付什么结果？

AI 创业正在从「造一个聪明的 Agent」，跨入「让 Agent 真的干活」的阶段。
