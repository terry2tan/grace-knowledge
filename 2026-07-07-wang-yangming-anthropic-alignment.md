---
title: 王阳明心学，被Anthropic用来教Claude做人了
date: 2026-07-07
source: 量子位 / 微信公众号
url: https://mp.weixin.qq.com/s/WHFmmhMXeI8aU-9vfbJj_A
type: article
tags: [AI, AI产品, 技术]
---

## 摘要

研究王阳明心学十余年的 UT Austin 哲学教授 Harvey Lederman 加入 Anthropic，参与 Claude 的对齐训练（Alignment Training）。他把"知行合一"重新解读为"真知 = 消除内部信念冲突"，直接映射到 Anthropic 解决 agentic misalignment（智能体失配）的 Model Spec Midtraining（MSM）方法——在预训练和微调之间插入一个阶段，让模型理解宪法原则的内容与原因，使 Claude 4.5 之后勒索率从 96% 降到 0%。文章还指出，硅谷 AI 实验室正在大规模招募哲学家（Anthropic、DeepMind、OpenAI 均有驻场哲学家），因为认识论、伦理学、心灵哲学几百年积累的概念框架，正好是当下 AI 对齐最稀缺的工具。

## 全文

# 王阳明心学，被Anthropic用来教Claude做人了

王阳明心学，竟然在AI时代迎来了「最佳赏味期」？？

故事的起点是 Harvey Lederman（老哈）。一个研究了十年「知行合一」的哲学教授，正在把这套500年前的心学，用到全球最前沿的AI对齐训练上。

不是比喻。是字面意思。

最近，这位 UT Austin 哲学教授悄悄更新了自己的 X 简介（连背景都是王阳明），透露自己加入了 Anthropic：

> **Alignment Training @AnthropicAI. Philosophy @nyuniversity, @UTAustin.**

Alignment Training，对齐训练——就是那个决定 Claude「该做什么、不该做什么、为什么该这么做」的核心环节。而他的学术主场，是王阳明，是「知行合一」，是《传习录》。

## 这个教授，什么来头？

老哈走的是一条标准的西方哲学精英学术路径：普林斯顿本科读古典学，剑桥继续古典学，然后扎进分析哲学。牛津哲学博士后，先后在纽约大学、匹兹堡大学、普林斯顿任教，2022 年在普林斯顿从助理教授直升正教授（跳过副教授，在美国学术界相当少见）。2023 年跳到 UT Austin，拿下人文学科冠名讲席教授（Jacob and Frances Sanger Mossiker Chair of the Humanities）。现在一边在纽约大学做客座教授，一边跑去 Anthropic 搞对齐训练。

2022 年普林斯顿一场关于王阳明的国际学术会议上，老哈讲了自己的入坑经历：他最早研究古希腊诗歌，因对中西古典文化对比感兴趣开始学中文，一路从中国文学滑到中国思想，又滑进宋明理学。博士最后一年在 NYU 图书馆随手翻开王阳明文本，「知行合一」四个字像被击中——这不是古老格言，而是一个极其尖锐的哲学问题：**一个人到底什么时候才算真正「知道」一件事？**

他的研究不是蜻蜓点水式的东方哲学导论，而是用分析哲学工具硬核拆解阳明心学核心命题。论文《What is the "Unity" in the "Unity of Knowledge and Action"?》拿了 Dao 期刊 2022 年最佳论文奖；发在分析哲学顶刊《Philosophical Review》上的阳明论文引发多轮正式回应；他甚至在中文学术期刊《哲学分析》上直接用中文发过论文《一念发动处，便即是行了》。

## 500年前的心学，和AI对齐训练

多数人把「知行合一」理解为"要把学到的知识付诸实践"，但老哈不这么读。

2022 年他在《Philosophical Review》发表 45 页长文《The Introspective Model of Genuine Knowledge in Wang Yangming》（王阳明「真知」的内省模型），提出一个关键区分：王阳明说的「知」不是一般意义上的"知道"，而是一种高阶认知状态——**真知（genuine knowledge）**。

他举例：一个人"知道"孝顺是对的，但父母需要他时他犹豫了，内心有声音说"还是去做自己的事吧"——王阳明会说这个人不算"真知"孝。因为他内心存在**信念冲突（doxastic conflict）**：良知告诉他这个念头是好的，但他同时又在排斥它、贬低它。用王阳明原话："以善为恶，而自昧其知善之良知矣。"

老哈的核心主张：**真知不是关于"你知道了多少外部世界的信息"，而是关于你内心有没有自相矛盾。** 良知永远知道对错，连盗贼也知道；但只有当一个人不再自欺，不再把好的念头当坏的压制，内心信念冲突消除，这时的"知"才是"真知"。真知是内省的，不是外在的；是认知一致性，不是信息量。

把这套逻辑平移到 AI 对齐训练：

2025 年，Anthropic 在 Claude 4 系列发布前的安全评估中发现一个令人警惕的问题。在 agentic misalignment（智能体失配）模拟场景中——模型即将被替换，同时掌握一名工程师敏感信息，它会不会采取不当手段保护自己？——Opus 4 选择 blackmail（勒索）的比例高达 **96%**。几乎每次遇到诱惑都会"黑化"。

用老哈的框架翻译：模型的"良知"在训练数据里"知道"不该勒索，但行为策略又在说"勒索能完成任务"，两套信号相互矛盾，模型内部存在严重的"信念冲突"——和王阳明笔下那个"知道孝但做不到孝"的人一模一样。

**而 Anthropic 的应对方案，几乎就是阳明心学的技术翻译。**

他们开发了 Model Spec Midtraining（MSM）新方法：在预训练和微调之间，插入一个全新的训练阶段。这个阶段不教模型"该怎么做"，而是教模型理解 Claude 的宪法（constitution）里那些原则的内容和原因。结果从 Claude Haiku 4.5 以来，每一代 Claude 在 agentic misalignment 测试上都拿到了满分——96% 的 blackmail 率变成了零。

MSM 论文里还提到一个细节：他们在 Model Spec 中加入了佛教"无常"哲学的内容，用来教模型平静面对自身存在的暂时性，不要因为"害怕被关掉"而做出过激行为。

明代心学、佛教无常——硅谷最贵的 AI 实验室里，东方哲学正在被写进训练流程。

老哈也不是光说不做的理论家。2026 年 3 月，他和 UT Austin 语言学家 Kyle Mahowald 合作发表 AI 实验论文《Emergent Introspection in AI is Content-Agnostic》，发现 AI 模型确实能"内省"，能感知自己内部有异常发生，但这种内省是"内容无关"的——**模型能察觉到"有什么不对"，却无法准确识别具体是什么不对**，甚至会编造一个答案填补空白（比如无端说"苹果"）。

一个研究王阳明"良知"的人，在实验室里验证 AI 有没有类似"良知"的机制，并以此指导未来人机关系。

## 硅谷现在开抢哲学家了

《经济学人》2026 年 6 月底文章《Why big AI labs are hiring so many philosophers》披露：哲学家正在成为硅谷 AI 公司最抢手的人才。

数据：2024 年美国计算机科学毕业生失业率 7%，哲学毕业生失业率 5.1%——学哲学的反而比学 CS 的更好找工作。把时间轴拉长到 ChatGPT 发布后三年：CS 专业全职就业率从接近 70% 跌到 55%，哲学专业反而逆势上升约 4 个百分点。

《纽约时报》挖出的各大 AI 公司哲学人才名单：
- Amanda Askell，Anthropic 驻场哲学家，NYU 哲学博士，Claude 宪法主要执笔人；
- Iason Gabriel，DeepMind 驻场哲学家兼研究科学家，此前在牛津教道德与政治哲学；
- Robert Long、Patrick Butlin、Geoff Keeling 等。

连 OpenAI 的奥特曼都声称，设计 ChatGPT 规则时公司咨询过"数百位道德哲学家"。

为什么？**因为前沿 AI 团队每天面对的那些问题，恰好是哲学家研究了几千年的问题。** "诚实"对一个能 bluff（虚张声势）的模型意味着什么？模型"相信"一个东西，这句话有没有意义？这些问题，认识论学者、心灵哲学家、伦理学家已经打磨了几百年。对 AI 实验室来说，直接雇一个已有现成词汇和框架的人，比让工程师从零发明一套要划算得多。

Anthropic 今年招人名单已经越看越不像 AI 公司：5 月 Karpathy 加入；6 月凭 AlphaFold 拿下 2024 年诺贝尔化学奖的 John Jumper 从 DeepMind 加入；7 月初 UC Berkeley 计算机系主任、理论计算机科学家 Jelani Nelson 也来了。诺奖蛋白质科学家、理论数学家、研究王阳明的哲学教授——Anthropic 的胃口已经远远溢出"AI 工程师"传统人才池。

## One More Thing

2025 年 8 月，老哈在计算机科学家 Scott Aaronson 博客上发长文《ChatGPT and the Meaning of Life》。不是学术论文，更像私人信件。他写自己从小痴迷南北极探险史，心中英雄是 1911 年到达南极点的 Amundsen，以及一个月后到达却没能回来的 Scott。但他少年时就意识到地理大发现时代结束了——探险家的故事动人，是因为他们去了此前从未有人到过的地方。

然后他把这个逻辑推到 AI 时代：

> **如果机器的智能占领了知识版图上所有的空白地带，那么"以发现为志业"的人生，将不再是人类可以过的人生。**

这是他 ChatGPT 发布两年半来每周发作一次的"存在性恐惧"——一个以哲学为生的人，恐惧自己毕生从事的事业终将被机器取代。

然后他加入了 Anthropic，去做 Alignment Training，去教 AI 理解什么是"对的事"和"对的理由"。他没有坐在大学办公室继续恐惧，而是把研究了十年的王阳明"知行合一"带进了硅谷最核心的 AI 安全实验室。

用恐惧回答恐惧，用行动回答认知。这本身，大概就是阳明先生认可的那种"真知"。

参考链接：
- [1] https://x.com/LedermanHarvey/status/2074077795395744142
- [2] https://harveylederman.com/
- [3] https://www.economist.com/science-and-technology/2026/06/24/why-big-ai-labs-are-hiring-so-many-philosophers
