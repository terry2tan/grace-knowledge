---
title: OpenAI 给 Claude Code 做了个插件？两大 AI 编程工具首次联手实测
date: 2026-03-31
source: 硅基鹿鸣
url: https://mp.weixin.qq.com/s/dP_aaoOp3cnHL5-D9eutiQ
type: article
tags: [AI, AI 产品，工具]
---

## 摘要

OpenAI 官方发布 codex-plugin-cc，让开发者可以直接在 Claude Code 中调用 Codex 做代码审查、对抗性审查甚至整段任务移交。这是 OpenAI 主动把自己的工具送进竞争对手 Anthropic 的地盘，体现"用户在哪里，就去哪里"的产品策略。对于开发者而言，这意味着不用选边站，在同一个终端里 Claude 做主力、Codex 做审查，工具从竞争变成协作。

## 全文

### 01 怎么用

装完之后，你会发现 Claude Code 里多了三个以 `/codex:` 开头的命令：

- `/codex:review` — 标准的只读代码审查，让 Codex 帮你过一遍代码
- `/codex:adversarial-review` — 对抗性审查，专门用来挑刺，质疑你的实现思路
- `/codex:rescue` — 把任务直接交给 Codex 处理，相当于换个 Agent 接手

前两个是审查，后一个是执行。逻辑清晰。

安装很简单，需要 ChatGPT 订阅（包括免费版）或者 OpenAI API key，加上 Node.js 18.18 以上版本。如果本地还没装 Codex CLI，先跑一句：

```bash
npm install -g @openai/codex
```

然后登录：

```bash
!codex login
```

配置完了，`/codex:setup` 一下就能开始用了。

### 02 为什么这么做

OpenAI 的开发者 Vaibhav (VB) Srivastav 在配套的长文里解释了使用场景。核心价值在于：在不离开 Claude Code 的情况下，拿到一个来自不同 Agent 的二次审查。

推荐用法也很简单：
- 日常代码改动，跑 `/codex:review`
- 高风险操作，比如数据库迁移、权限变更、基础设施脚本，用 `/codex:adversarial-review`，让 Codex 专门来质疑你的假设
- 线程卡住了？或者想换个 Agent 试试？用 `/codex:rescue` 直接交出去

比较长的任务还能跑后台：

```bash
/codex:review --background
/codex:status
/codex:result
```

### 03 都在本地跑

技术实现上，这个插件走的是本地 Codex CLI 和 Codex app server。也就是说，它用的是你本地已有的认证、配置、环境变量，以及 MCP 设置。并没有另起一套运行时。

VB 说的是："这不是一个独立的运行时。就是 Codex 本身，只不过从 Claude Code 里面调用了而已。"

所以体感上应该比较轻量，毕竟只是在 Claude Code 内部喊了一嗓子……让隔壁的 Codex 过来帮个忙。

还有个可选功能叫 review gate：

```bash
/codex:setup --enable-review-gate
```

开了之后，Claude Code 在结束之前会先等 Codex 审查完。听上去不错，但 VB 也提醒，这容易让 Claude 和 Codex 形成循环调用，token 消耗会很快。

### 04 打入对手腹地

这个操作本身，其实比插件功能更让人琢磨。OpenAI 把自己的产品做成了 Anthropic 旗舰工具的插件，这事就好比可口可乐主动找百事，说「你的自动贩卖机里，给我留个位置呗」。

竞争对手跑在彼此的工具里，护城河从来就不在 IDE 这一层。OpenAI 显然想明白了一件事：用户在哪里，就去哪里。

Claude Code 目前是 AI 编程领域最活跃的终端工具之一。与其等用户切换到自己的平台，不如主动把 Codex 送上门。这背后的逻辑，其实跟当年微软把 Office 搬上 iPad 是一样的。你可以嘴上说竞争，但用户的工作流在哪里，你的产品就得跟到哪里。

很多开发者（比如我）的日常工作流已经建立在 Claude Code 上了，Codex 再好，如果需要切换环境才能用，摩擦成本就足以劝退一大批人。做成插件，摩擦几乎为零，用户用起来更方便了。

### 05 接下来呢

Claude Code 的插件生态其实才刚刚开始。OpenAI 这波操作，也算是帮 Anthropic 验证了一件事：插件市场的价值，可能比 IDE 本身还大。

当竞争对手都愿意把自己的能力以插件形式接入进来，Claude Code 平台的生态飞轮就算是转起来了。而对于我等开发者来说，这也算是个好消息。

你不用选边站了。在同一个终端里，Claude 做主力，Codex 做审查，各司其职。工具之间的竞争，终于变成了工具之间的协作。而最高兴的，当然是坐在终端前面的你了！
