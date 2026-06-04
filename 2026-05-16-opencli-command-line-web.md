---
title: 别让模型烧Token了！GitHub 20k星神作：把全网变成命令行
date: 2026-05-16
source: 微信公众号 / 量子位
url: https://mp.weixin.qq.com/s/QvvriYIJrulyLMb0xHfWvQ
type: article
tags: [AI, 工具, 技术]
---

## 摘要

这篇文章介绍开源项目 OpenCLI：它把大量网站、社交平台、办公工具和部分桌面应用封装成可在终端调用的命令，让 Agent 不必每次都通过浏览器视觉操作或模型推理来“看网页”。核心价值在于降低 Token 消耗、提升自动化确定性，并让网页/聊天记录/办公数据更容易进入脚本、知识库和分析流程。文章也提到 OpenCLI 覆盖微信、Telegram、Discord、飞书、企业微信、钉钉、小红书、B站、知乎、Reddit、HackerNews 等场景，并支持通过 skill 让 Agent 编写新适配器。值得关注，但涉及私域聊天记录和本地登录态访问，实际使用前需要认真评估隐私与合规边界。

## 全文

闻乐 发自 凹非寺  
量子位 | 公众号 QbitAI

“抱歉，我无法直接访问这些网站。”

每次想让AI读个外部网站的信息，看到这句话头都要炸了。

不过，GitHub有个开源项目 **OpenCLI** 把这事儿解决了：

**网站变命令行。**

目前20k+ Star，还在涨！！

Reddit讨论、B站热门、Arxiv论文，以前开浏览器一个个翻的东西，现在终端一行命令直接出结构化数据。

而且不只是网页，现在OpenCLI连 **微信、Telegram、Discord** 这些私域聊天记录都给打通了。

对，你没看错，微信聊天记录也能查。

所以，只要把配套的skill装进Agent，管你什么公域私域、网站还是App，基本都能通过命令直接在终端里调。

而且CLI命令本身是在本地浏览器里直接执行的，不经过大模型推理。

意思就是很多原本需要Agent“边看边点”的操作，现在浏览器自己就能干，跑多少次都不花一分钱Token。

### 聊天记录变个人信息流

先说咋装。一行命令搞定（Node.js 21+）：

```bash
npm install -g @jackwener/opencli
```

装完跑 `opencli list` 就能看到所有可用的命令，超级多。

然后去Chrome应用商店下载个OpenCLI扩展，打开开发者模式。

不需要手动配置cookie，OpenCLI就能直接复用你Chrome的登录态，你在浏览器里已经登录的站，它都能直接用。

至少不用再自己复制cookie、手搓请求头、把凭证硬编码进脚本里了，也相对安全一些。

OpenCLI把私域聊天全接了进来，统一在 `opencli` 命令下调用：

- `opencli wx search` 搜微信聊天记录；
- `opencli tg search` 搜Telegram消息（基于MTProto协议）；
- `opencli discord recent` 查Discord最近消息。

于是我试了试咱的国民应用，微信。

微信用的是独立的wx-cli工具，安装命令是：

```bash
npm install -g @jackwener/wx-cli
```

首次使用需要 `wx init` 初始化，它会自动检测微信数据目录，然后从微信进程内存里扫描数据库密钥。

这个过程需要root权限（macOS上用 `sudo wx init`），而且微信必须处于登录状态。

初始化搞定之后就能直接用了，我先用 `wx session` 命令拉了下会话列表。

`wx history` 可以精准查找某个联系人的历史会话。

`wx history` 还能直接搜关键词。

聊天记录这东西，本来只是散落在各个App里的碎片信息，但被CLI统一接管之后，它突然开始变得可搜索、可筛选、可导出、可自动化处理。

输出格式支持JSON和CSV，直接灌进知识库或者数据分析流程里，跟Obsidian这类工具接上也顺理成章。

于是以前存在微信里的聊天记录，现在开始越来越像一种 **持续更新的个人信息流**。

甚至可以说，这会让Agent真正开始具备 **持续读取你真实数字生活里的最新信息** 的能力。

因为聊天记录不是静态文档，是实时更新的。

里面有你的工作流、关系链、协作历史、长期偏好，甚至还有大量AI以前根本碰不到的“隐性知识”。

除了社交，办公场景也没落下，给它们做了统一接口：

- `opencli lark-cli` 覆盖飞书200多条命令，消息、文档、日历、任务全拿；
- `opencli wecom-cli` 管企业微信；
- `opencli dws` 管钉钉。

主打一个办公全家桶。

难怪有网友说这玩意儿是电商人福音。

客服聊天记录一键导出，用户反馈批量归档，以前得手动截图复制粘贴的活儿，现在一行命令搞定。

当然，说到聊天记录这块儿得提一嘴：

OpenCLI作为开源项目提供的是工具和思路，私域数据的实际访问和部署属于个人行为，用之前务必仔细评估合规风险和隐私边界。

总之，别因为技术上能做就啥都做（doge）。

### 刷数据、下视频、扒内容一键搞定

OpenCLI跟“让大模型自己操作浏览器”最大的区别在于：

**CLI命令是在本地浏览器里直接执行的，不经过大模型推理。**

意思是如果不分析结果，运行时就零Token消耗。

而且因为是确定性命令，同一个命令跑出来的结果结构是一致的，可管道、可脚本、CI/CD友好。

某种意义上，它是在把浏览器自动化从AI推理重新拉回系统调用，Agent也开始有点软件基础设施那味了。

再说覆盖面。

OpenCLI内置了100+站点适配器，小红书、B站、知乎、豆瓣、虎扑、贴吧这些国内主力平台都有，海外站Twitter/X、HackerNews、Pixiv也没落下。

学术党能搜Google Scholar和百度学术，求职党能查牛客上的面经和薪资。

那咱来看看实际用起来长啥样，比如想在知乎搜AI Agent并下载文章：

```bash
opencli zhihu search “AI Agent”
opencli zhihu download —url “文章地址” —output ./zhihu
```

想看Reddit上今天在讨论啥：

```bash
opencli reddit search “AI”
```

图文/视频/音频一键下载，文章导出Markdown/CSV/JSON，页面点击、翻页、表单填写、批量爬取数据，创作者数据、粉丝分析、评论区抓取……

以前得开浏览器点点点半天的事，现在终端里敲一行就完事儿了。

除了视频下载需要装个yt-dlp，其他基本开箱即用。

如果友友你实在小众，没找到你要的站也不要紧。

OpenCLI给AI Agent准备了一个 `opencli-adapter-author` skill。

通过下面命令安装，Agent就能帮你自动写适配器：

```bash
npx skills add jackwener/opencli —skill opencli-adapter-author
```

社区还有插件系统，`opencli plugin install` 能一键装别人写好的适配器，生态这块儿算是慢慢铺开了。

还有一招比较狠。

通过CDP协议，OpenCLI能直接操控Electron桌面应用的界面，不用手动点鼠标。

Cursor的Composer、聊天和代码提取能控，ChatGPT的macOS桌面端能自动化，Notion能搜索、读取、写入页面，OpenAI Codex CLI能无头驱动，Discord桌面端的消息、频道、服务器操作也能跑。

甚至连豆包AI和ChatWise这种多模型客户端都覆盖了。

好好好，OpenCLI这波属于是，能本地执行的操作，尽量不走模型推理；能白嫖的地方，一分都不给模型花（doge）。

项目地址：https://github.com/jackwener/OpenCLI
