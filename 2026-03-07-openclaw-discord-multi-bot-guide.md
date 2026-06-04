---
title: 如何用 OpenClaw 打造 AI Agent 军团：Discord 多 Bot 管理指南
date: 2026-03-07
source: 微信公众号
url: https://mp.weixin.qq.com/s/v3WoETGGWifIcvoiAeSy6g
type: article
tags: [AI产品, 工具, 技术]
---

## 摘要

这篇文章是一份面向实操的 `OpenClaw + Discord` 多 Bot 部署指南，核心目标是把单个 AI Bot 升级成能分工协作的 “AI Agent 军团”。文章先解释为什么 `OpenClaw` 适合作为多 Agent 中枢、为什么 `Discord` 适合作为多频道协作阵地，然后按步骤讲清楚环境准备、Discord Bot 创建、频道绑定、多 Agent 路由与权限配置。中段给出了两类配置方法：适合新手的环境变量方案，以及适合复杂场景的 JSON 配置方案，并强调每个 Bot 应使用独立 Token、独立工作区和独立职责。后半部分则把重点放在协同规则和工程化细节上，包括频道隔离、Agent 间通信、`SOUL.md` 人格配置、常见故障排查，以及单 Bot 和多 Bot 在并行度、响应速度和人工干预上的效率对比。

## 全文

### 基本信息

- 标题：如何用 OpenClaw 打造 AI Agent 军团？Discord 多 Bot 管理指南
- 作者：Luckyfans
- 发布时间：2026-03-07 12:08
- 来源：微信公众号
- 原始链接：https://mp.weixin.qq.com/s/v3WoETGGWifIcvoiAeSy6g

## ✨ 核心亮点

- 10 分钟快速部署：无需编程基础，傻瓜式配置
- 多 Agent 编排：一支 AI 军团，协同处理复杂任务
- 灵活配置：支持 GPT-4、Flowise、OpenWebUI 等多种模型
- 数据隔离：每个 Agent 独立工作区，安全可靠
- 效率翻倍：从“单兵作战”到“协同作战”，生产力直接起飞

2026 年，AI Agent 的竞争早已告别“单兵作战”。

这篇文章的核心判断是：高手已经不再只优化单个 Bot 的提示词，而是用 OpenClaw 搭建协同作战的 AI 军团，把 Discord 变成高效能工作中枢。

作者给出的想象场景是：

> 你只需在 Discord 发出一个指令，文案 Bot 自动撰写推文、代码 Bot 排查程序 Bug、调研 Bot 汇总行业报告、客服 Bot 响应群内咨询，所有工作同步推进，而人只做“指挥官”。

文章认为，这并不是科幻场景，而是 OpenClaw + Discord 这组组合能够落地实现的高效协作模式。

## 🎯 先搞懂核心：为什么是 OpenClaw + Discord？

### OpenClaw：AI 军团的“指挥官中枢”

OpenClaw 不是单一 Bot，而是一个本地自托管的 AI Agent 网关，核心能力包括：

- 多 Agent 管理：可同时管理多个独立 Agent，每个 Agent 有独立人格和职责
- 多模型支持：支持 GPT-4、Flowise、OpenWebUI 等不同模型按需搭配
- Agent 间通信：可通过配置实现 Agent 之间的数据传递和协同

作者的解释是：它相当于给每个 AI Bot 分配专属职责，避免混乱，实现真正意义上的协同作战。

### Discord：AI 军团的“作战阵地”

Discord 的多频道、多角色和权限系统天然适合多 Agent 场景：

- 频道隔离：不同 Bot 进入不同频道，如 `#code-bot`、`#content-bot`
- 权限控制：可限制每个 Bot 的访问范围和操作边界
- 实时协作：多个 Bot 在同一平台同步工作
- 易于扩展：新增 Bot 只需新增频道和相应配置

作者把这组关系总结为：OpenClaw 负责“指挥调度”，Discord 负责“场地部署”。

## 🚀 前置准备：3 步搞定部署基础

### 准备 1：OpenClaw 安装

文章提醒，部署前先确认 OpenClaw 已安装完成，且要注意版本要求：

- Node.js：`v22.22.0`
- 操作系统：Windows 10+、macOS 11+、Linux 主流发行版

作者特别强调 Node.js 版本必须严格匹配，否则很容易安装失败。

### 准备 2：Discord 相关

#### 步骤 2.1：创建 Discord 服务器

基本步骤包括：

1. 打开 Discord 客户端，点击左侧 `+`
2. 选择 `Create a Server`
3. 自定义服务器名称
4. 完成创建

#### 步骤 2.2：创建 Discord 应用与 Bot

作者建议在 Discord 开发者平台逐一完成：

1. 新建 Application
2. 进入 `Bot` 页面
3. 开启必要配置
4. 复制 Bot Token
5. 进入 `OAuth2 -> URL Generator`
6. 勾选需要的权限
7. 生成邀请链接并把 Bot 拉入自己的服务器

文中明确提醒：`Bot Token` 相当于 Bot 密码，不能泄露，也不能提交到公开仓库。

#### 步骤 2.3：创建分工频道

文章建议至少创建以下分工频道：

- `#code-bot`：代码调试、技术问题
- `#content-bot`：文案创作、内容生成
- `#research-bot`：资料调研、信息汇总
- `#general`：通用讨论和测试

## 💻 核心实战：用 OpenClaw 部署 Discord 多 Bot

作者把这部分定义为整篇文章的重点，目标是用 OpenClaw 推荐的新配置系统，实现多 Bot 的独立配置和协同工作。

### 步骤 1：对接 Discord Channel

先让 OpenClaw 与 Discord 服务器建立连接：

```text
# 1. 添加 Discord 频道
openclaw channels add

# 2. 按提示选择 Discord (Bot API)
# 3. 粘贴之前复制的 Discord Bot Token
# 4. 选择频道策略（新手建议先选 Open）
```

频道策略说明：

- `Open`：响应所有频道，适合新手测试或私人服务器
- `Allowlist`：仅响应指定频道，适合生产环境
- `Blocklist`：排除指定频道，适合特殊场景

验证方法也很直接：在 Discord 频道中 `@Bot hello`，只要 Bot 正常回复，说明通道接入成功。

### 步骤 2：配置多 Bot

#### 多 Agent 架构说明

文章对 OpenClaw 的多 Agent 架构做了比较清晰的拆解。每个 Agent 都是一个独立作用域的大脑，包含：

- `workspace`：包含 `AGENTS.md`、`SOUL.md`、`USER.md` 和本地文件
- 状态目录 `agentDir`：保存认证配置、模型配置和 Agent 配置
- 会话存储：位于 `~/.openclaw/agents/.../sessions/`，保存聊天历史和路由状态

作者强调这个架构的几个关键特性：

- 独立认证：每个 Agent 读取各自的认证配置
- 完全隔离：不同 Agent 有不同账户、人格、认证和会话
- 共享网关：多人可共用一个 Gateway，同时保持数据隔离
- 可选通信：不显式启用时，Agent 之间默认不互通

#### 配置示例

文中给出了一份包含 `agents`、`bindings` 和 `channels` 的配置示例，说明如何把多个 Agent 与不同账号和渠道绑定起来。

核心思路是：

- 在 `agents.list` 中定义 Agent
- 在 `channels` 中定义渠道账户
- 在 `bindings` 中把 Agent、账户和路由规则连接起来

#### 路由规则

文章指出 OpenClaw 采用确定性路由，优先级从高到低为：

1. `peer` 精确匹配
2. `guildId`
3. `teamId`
4. 渠道级 `accountId`
5. 渠道级通配匹配
6. 默认 Agent

也就是说，最具体的路由条件优先级最高。

#### 多 Bot 配置方式

文章给了两种主要配置方案。

##### 方式 1：环境变量配置

适合新手，优点是简单快速，不需要额外文件。

作者给出的示例思路是：

- 先定义 `bots = code_bot,content_bot,research_bot`
- 然后分别为每个 Bot 配置：
  `name`
  `message_provider`
  `llm_provider`
  `discord_bot_token`
  `api_key`
  `model`

示例里分别展示了：

- `code_bot` 使用 OpenAI GPT-4
- `content_bot` 使用 Flowise
- `research_bot` 使用 OpenWebUI

作者总结的最佳实践包括：

- 每个 Bot 使用单独创建的 Discord Bot 和独立 Token
- 不同 Bot 使用不同模型，按任务分配成本和能力
- 代码任务优先高精度模型，轻量任务可用低成本模型

##### 方式 2：配置文件配置

适合复杂场景，优点是支持精细化配置、版本控制和团队协作。

作者建议：

1. 创建配置目录：

```bash
mkdir -p ~/.openclaw/config/bots
```

2. 为每个 Bot 创建 JSON 配置文件，例如 `code_bot.json`

文件中可配置：

- Bot 名称
- 消息通道
- LLM 提供方
- Discord Bot Token
- 模型名称
- 频道 ID
- 工具权限白名单和黑名单
- 人格设定，如语气和语言

3. 配置完成后重启 OpenClaw：

```bash
openclaw restart
```

### 步骤 3：设置 Bot 协同规则

作者认为，多 Bot 协同最重要的是“分工明确、互不干扰”，文章给出两条核心规则。

#### 协同规则 1：频道绑定

让每个 Bot 只响应指定 Discord 频道，例如：

- `code_bot` 绑定 `#code-bot`
- `content_bot` 绑定 `#content-bot`
- `research_bot` 绑定 `#research-bot`

配置方法是在环境变量或 JSON 配置中加入：

```json
{
  "discord_channel_id": "123456789012345678"
}
```

作者还补了一条实操细节：需要在 Discord 设置里开启开发者模式，然后右键频道复制频道 ID。

#### 协同规则 2：Agent 间通信

文章建议在需要跨 Bot 协作的场景下启用 Agent 间通信。

文中示例是：

- 用户提出“帮我写一篇关于 AI 技术趋势的文章”
- `Research Bot` 先完成资料调研
- 调研结果再传递给 `Content Bot`
- 最后由 `Content Bot` 输出文章

对应配置示例是：

```json
{
  "tools": {
    "agentToAgent": {
      "enabled": true,
      "allow": ["code_bot", "content_bot", "research_bot"],
      "mode": "peer-to-peer"
    }
  }
}
```

### 验证部署

文章建议在配置完成后重启 OpenClaw，然后通过跨频道任务来测试协同效果，例如：

1. 在 `#research-bot` 频道要求 Bot 调研 AI Agent 技术趋势
2. 在 `#content-bot` 频道要求根据调研结果撰写技术文章
3. 观察两个 Bot 是否协同工作

## 🚀 进阶优化：3 个技巧

### 技巧 1：两种协同模式，按需选择

文章把协同模式拆成两类：

- 临时工模式（Sub-Agent）
  主 Agent 自动管理临时 Agent，适合并行搜索、批量处理文件
- 独立模式（分店模式）
  每个 Bot 独立配置、独立记忆、独立权限，适合长期稳定分工

作者给出的建议是：

- 短期任务：用临时工模式
- 长期业务：用独立模式

### 技巧 2：设置 Bot 人格（SOUL.md）

文章建议为每个 Bot 单独编写 `SOUL.md`，用来定义人格和输出风格。

例如为 `Content Bot` 设定：

- 角色：专业科技文案 Bot，擅长撰写公众号推文
- 语气：活泼但专业
- 输出格式：标题吸引人、段落分明、适当使用 emoji、结尾有行动号召
- 禁忌：避免过度营销、不夸大其词、保持客观中立

作者给出的放置路径是：

```text
~/.openclaw/agents//workspace/SOUL.md
```

### 技巧 3：避坑指南

文中列了一组常见问题与解决方案：

- OpenClaw 安装失败：通常是 Node.js 版本不匹配，应安装 `v22.22.0`
- Bot 无响应：通常是 Discord 权限不足，需要开启消息相关权限
- 配置失败：常见原因是多个 Bot 的 Token 混淆
- 依赖下载慢：可能是网络原因，需要优化 GitHub 访问
- Bot 乱回复：通常是没有设置 `discord_channel_id` 做频道绑定

## 📊 效率对比：单 Bot vs 多 Bot 协同

文章给出的对比非常直白：

- 任务并行度：从 1 个任务提升到 5+ 任务同步
- 响应速度：从平均 30 秒缩短到平均 10 秒
- 人工干预：从频繁降低到极少
- 覆盖场景：从单一领域扩展到多领域协同
- 人力成本：从 12 人/月压缩到 1 人/月

虽然这些数字更偏宣传口径，但作者要表达的重点很明确：多 Agent 协同带来的核心价值不在单点能力，而在工作流级别的并行与分工。

## 🎯 最后：从“使用者”到“指挥官”

文章最后回到一个更大的判断：2026 年，AI Agent 的核心价值已经不是单个 Bot 有多强，而是多 Agent 的协同效率。

作者给出的结论是，借助 OpenClaw + Discord：

- 不需要复杂代码
- 不需要高额成本
- 普通人也能实现“一人指挥，多 AI 干活”

最后列出的几个使用案例包括：

- 跨境电商从业者：一人撑起 12 人业务量
- 独立开发者：2 周完成原本 10 人团队 3 个月的项目
- 内容创作者：从选题到发布仅需 1 小时
