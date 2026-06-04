---
title: Claude 新功能 Routines：关上笔记本，也能 7×24 干活
date: 2026-04-15
source: 微信公众号
url: https://mp.weixin.qq.com/s/zafqdw8m5tYY8E49x-vf9g
type: article
tags: [AI, 工具, 技术]
---

## 摘要

这篇文章介绍了 Claude Code 新推出的 Routines，它把 Prompt、代码仓库和连接器封装成可在云端自动执行的任务，支持定时、API 和 GitHub 事件三种触发方式。文章重点解释了它与 cron、GitHub Actions 和长驻 Agent 的区别，本质上更像按需触发的短生命周期 AI 值班员。对高频协作开发团队来说，Routines 的价值在于把代码审查、部署验证、告警分流和文档维护这类重复性工作自动化。对你的兴趣点来说，这篇很契合，因为它直接涉及 Claude Code、工作流编排、事件驱动 Agent 化执行和云端自动化边界。

## 全文

# Claude 新功能 Routines：关上笔记本，也能 7×24 干活

Claude Code 今天上了一个新能力：**Routines**，面向 Pro、Max、Team 和 Enterprise 用户开放

简单来说，就是：你把一段 Prompt、一个代码仓库、一组连接器（Slack、Linear、Google Drive 等）打包成一个「Routine」，设好触发条件，Claude 就会在 Anthropic 的云端基础设施上自动执行

笔记本关着也行，人不在也行

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/jXSGuwJvpdg7ZoRGWkwQfYgjtVwib6fkWwtVtpI4JjTSqmCNJGSZG8RZCrGd8PrDYVvthnZJ3psCJ0osI8Ikd8ia9N14dwVGgWibtnCIUkt4dA/640?from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

Routines 工作流：配置一次，云端自动执行

## 三种触发方式

Routines 支持三种触发方式，可以叠加使用。同一个 Routine 可以同时挂定时触发、API 触发和 GitHub 事件触发

### 定时触发

设一个频率（每小时、每天、工作日、每周），Claude 按这个节奏自动跑。时间按你的本地时区设置，云端自动换算

官方给的场景：每天凌晨 2 点从 Linear 拉最高优先级的 bug，尝试修复，开一个 draft PR

之前在 CLI 里用 `/schedule` 命令创建的定时任务，现在自动升级成了 Routines。不用手动迁移

### API 触发

每个 Routine 会生成一个专属的 HTTP 端点和 Bearer Token。往这个端点 POST 一条消息，就会触发一次执行，返回一个 session URL

请求体里有个 `text` 字段，可以传运行时的上下文信息，比如一段报警日志、一个部署结果

curl -X POST \

 https://api.anthropic.com/v1/claude_code/

 routines/trig_01ABCDE.../fire \

 -H "Authorization: Bearer sk-ant-..." \

 -H "anthropic-beta: experimental-cc-

 routine-2026-04-01" \

 -d '{"text": "Sentry alert fired."}'

返回值包含 `session_id` 和 `session_url`，打开 URL 就能实时看 Claude 在干什么

这个端点目前走的是 `experimental-cc-routine-2026-04-01` beta header，接口形态在 preview 阶段可能会变。Anthropic 承诺最近两个版本的 header 会持续兼容

### GitHub 事件触发

把 Routine 订阅到 GitHub 仓库的事件上。每一个匹配的事件都会启动一个独立的 Claude Code 会话

支持的事件范围很全：Pull Request 全生命周期（opened、closed、synchronized、labeled）、PR Review、Push、Release、Issues、Issue Comment、Discussion、Check Run、Workflow Run 等十几种

PR 触发还支持过滤：按作者、标题、正文、目标分支、来源分支、Labels、是否 Draft、是否已合并、是否来自 Fork

一个实际用法：订阅 `pull_request.opened`，Claude 自动按你团队的 Code Review 清单检查安全、性能、代码风格，留 inline comments。人类 reviewer 上场时，机械检查已经做完了

**Claude 会持续跟踪同一个 PR 的后续事件（新 comment、CI 失败），在同一个 session 里继续处理**

GitHub 触发需要安装 Claude GitHub App。CLI 里跑 `/web-setup` 只是授权了仓库克隆权限，webhook 投递需要单独安装

## 已经跑起来的场景

官方列了几个早期用户的典型用法：

### 定时类

→**Backlog 管理**：每晚对新 Issue 分类打标、分配负责人，往 Slack 发摘要

→**文档漂移检测**：每周扫描已合并的 PR，标出引用了已变更 API 的文档，自动开 PR 更新

### API 类

→**部署验证**：CD 流水线部署完成后调用 Routine 端点，Claude 跑冒烟测试、扫错误日志，往 release channel 发 go/no-go 判断

→**告警分流**：把 Datadog 的告警指向 Routine 端点，Claude 拉堆栈、关联最近的 commit，在 on-call 打开 pager 之前就把 draft fix 准备好

→**反馈闭环**：文档反馈组件直接往 Routine 端点发报告，Claude 打开对应仓库的 session，草拟修改

### GitHub 类

→**SDK 同步**：Python SDK 合并一个 PR，Routine 自动把改动移植到 Go SDK，开一个对应的 PR

→**定制化 Code Review**：PR 打开时按内部清单检查，留 inline comments

## 用量限制

Routines 消耗的额度跟交互式 session 一样，从订阅用量里扣。在此基础上，每个账号每天有运行次数上限：

→**Pro**：每天 5 次

→**Max**：每天 15 次

→**Team / Enterprise**：每天 25 次

超出上限的部分，如果开了 extra usage 就按超量计费。没开的话，超了就等第二天

## 跟现有工具的区别

Routines 不是 cron job，也不是 GitHub Actions，也不是完整的 AI Agent

cron job 和 GitHub Actions 跑的是固定脚本，不涉及 AI 模型的动态判断。AI Agent 是一个持续运行、维护状态的长进程。Routines 更接近「按需触发的短命 AI 值班员」：每次触发都从零开始一个全新的 Claude Code 会话，跑完就结束

每次执行，Claude 会克隆你选定的仓库（默认从 default branch 开始），加载你配置的连接器和环境变量，跑 setup script 装依赖，然后按 Prompt 执行任务。可以跑 shell 命令、调用仓库里的 Skills、访问外部服务

默认情况下，Claude 只能往 `claude/` 前缀的分支推代码。如果需要推到其他分支，要在创建 Routine 时给对应仓库开启「Allow unrestricted branch pushes」

每次执行完的 session 会出现在你的 session 列表里，你可以查看 Claude 做了什么、review 代码变更、创建 PR，或者继续对话

跑完的任务，你上班后可以在本地接上继续处理

## 几个值得注意的细节

Routines 绑定在个人 claude.ai 账号上，不跟团队共享。Claude 通过你的 GitHub 身份和连接器执行操作，所以 commit、PR、Slack 消息这些都会以你的名义出现

Routine 在执行过程中**没有权限确认弹窗**，全程自主运行。Prompt 需要写得足够明确和自包含，把成功标准、失败处理、输出格式都交代清楚

创建入口有三个：Web 端 `claude.ai/code/routines`、CLI 里用 `/schedule` 命令、Desktop App 里选「New remote task」。三个入口创建的 Routine 互通

GitHub 事件触发在 preview 阶段有每小时的调用上限（per-routine 和 per-account 两层），超了就丢弃

## 这个方向的信号

Routines 做的事情很具体：把「无人值守、可重复、目标清晰」的开发任务从本地搬到了云端

从 Anthropic 最近的动作看（Managed Agents、Cowork GA、Advisor Tool、Routines），Claude Code 正在从一个「你跟它对话」的工具，变成一个「你部署它」的服务。本地优先处理需要人参与的决策，云端自动化接管基础的重复性任务

随着模型能力提升，「基础的重复性任务」这个圈会越来越大

目前还是 research preview，限制比较多，接口可能会变。Anthropic 说后续会把 webhook 触发扩展到 GitHub 之外的更多事件源

这个功能对独立开发者来说可能用处有限（Pro 一天只有 5 次），对有活跃代码仓库的团队来说，大概率会很快进入日常工作流

Introducing routines in Claude Code（官方博客）

`https://claude.com/blog/introducing-routines-in-claude-code`

Automate work with routines（官方文档）

`https://code.claude.com/docs/en/routines`
