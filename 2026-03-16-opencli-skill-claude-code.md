---
title: OpenCLI Skill：把任意网站变成 Claude Code 可调用的 CLI
date: 2026-03-16
source: x.com
url: https://x.com/vista8/status/2033426419523756147
type: tweet
tags: [AI产品, 工具, 技术]
---

## 摘要

这条引用推文的价值不在于单独介绍 `OpenCLI`，而在于展示了一个非常实用的二次封装方向：把 `OpenCLI` 包成 skill，让 Claude Code 和 OpenClaw 直接调用。`vista8` 给出的场景很具体，例如一句话查看 Hacker News 热帖并写入 Obsidian 或飞书，查看知乎私信、微博热搜，甚至直接发微博；背后的关键能力是 `OpenCLI` 本身支持“自迭代生成任意网站 CLI”。被引用的原帖则补充了 `OpenCLI v0.4.4` 的核心升级，包括 11 个新命令、Chrome 144+ 的 CDP 自动发现、`forceExtension` 绕过反爬检测、批量 IPC fetch、更多 Twitter 读写命令，以及 YAML 输出支持。合在一起看，这条知识最重要的意义是：浏览器自动化不只是一个工具，而是可以被继续 skill 化、再被 agent 编排调用的底层能力。

## 全文

### 基本信息

- 转发者：@vista8（向阳乔木）
- 转发时间：2026-03-16 14:13:32
- 原始链接：https://x.com/vista8/status/2033426419523756147
- 被引用作者：@jakevin7（卡比卡比）
- 被引用推文时间：2026-03-16 01:30:45
- 被引用链接：https://x.com/jakevin7/status/2033234460850745481

### 转发推文：为什么这条值得记录

`vista8` 的核心动作是把卡比大神的 `OpenCLI` 封装成一个 skill，方便 Claude Code 和“龙虾”（OpenClaw）直接调用。

安装命令：

```bash
npx skills add joeseesun/opencli-skill
```

他给出的典型场景包括：

- 一句话查看 Hacker News 热帖，并写入 Obsidian 或飞书
- 一句话查看知乎私信
- 一句话查看微博热搜
- 直接发微博

他认为最酷的一点是：`OpenCLI` 支持“自迭代生成任意网站 CLI”。也就是说，这不只是一个预制好的站点脚本集合，而是一个可以把网页逐步抽象成命令行接口的运行时能力。

转发里还提到一个具体例子：已经让 AI 给 `Product Hunt` 写了一个 CLI，并且开源在 GitHub。

### 原帖：OpenCLI v0.4.4 更新了什么

被引用的原帖来自 `@jakevin7`，主题是 `OpenCLI v0.4.4` 发布。

原帖的主张很直接：

> 把任何网站变成你的命令行。

#### 版本增量

从 `v0.4.0` 到 `v0.4.4`：

- 新增 11 个命令
- 命令总数从 46 增加到 57
- 新增 3486 行代码

#### 三阶段性能优化

原帖重点提到了三段式性能优化：

1. `MutationObserver` 智能滚动
2. `Build-time Manifest` 编译 + `Lazy-loading` 引擎
3. `Batch IPC Fetch`

其中第三点的解释尤其关键：把多个浏览器 fetch 合并成一次 `evaluate()` 调用，从而减少 IPC 往返开销。

#### 连接层增强

这次版本在浏览器连接层也做了重要增强：

- 支持 Chrome 144+ 的 CDP 自动发现（通过 `DevToolsActivePort`）
- 不需要安装浏览器扩展也能使用
- 增加 `forceExtension` 模式，可绕过某些站点对 CDP 的检测
- 浏览器会话生命周期做了重构，Tab 管理更稳定

#### 新增站点与命令能力

原帖还列出了一批具体的新能力：

- Twitter 新增 7 个命令：`post`、`reply`、`delete`、`like`、`following`、`followers`、`notifications`
- Twitter 从只读能力扩展到读写全覆盖
- V2EX：签到、个人信息、通知
- Bilibili：关注列表
- BOSS 直聘：城市筛选 + 分页
- 所有命令支持 `-f yaml` 输出

#### 文档结构调整

文档被拆成两条路线：

- `CLI-EXPLORER`：偏探索式开发
- `CLI-ONESHOT`：给一个 URL，4 步产出命令

项目地址：

- GitHub：http://github.com/jackwener/opencli

### 这条知识最有价值的地方

单看原帖，`OpenCLI` 是一个让网站变成 CLI 的底层运行时。

但叠上 `vista8` 的转发视角后，它的定位明显往前走了一步：

- 不只是“人类自己跑 CLI”
- 而是把网站 CLI 再封成 skill
- 再让 Claude Code / OpenClaw 这样的 agent 直接调用

这意味着：

1. 网站能力可以先被 CLI 化
2. CLI 再被 skill 化
3. skill 再进入 agent 的自动化工作流

对于做 agent、skills、浏览器自动化、工作流编排的人来说，这条推文最值得关注的不是某个单独命令，而是这条链路本身：

> 网站 -> CLI -> Skill -> Agent 调用

这是一种非常强的工具抽象路径。
