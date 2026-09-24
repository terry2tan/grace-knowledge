---
title: Agent Reach — 给 AI Agent 一键装上互联网能力
date: 2026-09-24
source: github.com
url: https://github.com/Panniantong/Agent-Reach
type: repo
tags: [AI, 工具]
---

## 摘要

Agent Reach（85K+ Stars，GitHub Trending #1）是一个面向 AI Agent 的"互联网能力层"：一条命令让 Claude Code / OpenClaw / Cursor 等 Agent 获得读取和搜索 Twitter、Reddit、YouTube、GitHub、B站、小红书、雪球、V2EX、RSS 等平台的能力，全部免费、无 API 费用。核心设计理念是"能力层而非工具"——它不包装读取逻辑，而是负责选型、安装、体检和路由：每个平台维护"首选+备选"的有序后端列表，某条路失效（如 yt-dlp 被 B站风控封死）就自动切换备选，Agent 直接调用上游工具。安装方式极简：把 install.md 链接丢给 Agent 即可；`agent-reach doctor` 一条命令诊断所有渠道状态。Cookie 本地存储（600 权限），默认不修改系统，需 `--system` 显式授权。

## 全文

# 👁️ Agent Reach

**给你的 AI Agent 一键装上互联网能力**

当下最稳的接入方式，替你选好、装好、体检好——接入方式会换代，你不用操心。

## 为什么需要 Agent Reach？

AI Agent 已经能帮你写代码、改文档、管项目——但你让它去网上找点东西，它就抓瞎了：

- "帮我看看这个 YouTube 教程讲了什么" → 看不了，拿不到字幕
- "帮我搜一下推特上大家怎么评价这个产品" → 搜不了，Twitter API 要付费
- "去 Reddit 上看看有没有人遇到过同样的 bug" → 403 被封
- "帮我看看小红书上这个品的口碑" → 打不开，必须登录才能看
- "B站上有个技术视频，帮我总结一下" → 拿不到，通用下载工具被 B站风控全面拦截
- "帮我在网上搜一下最新的 LLM 框架对比" → 没有好用的搜索
- "帮我看看这个网页写了啥" → 抓回来一堆 HTML 标签
- "这个 GitHub 仓库是干嘛的？Issue 里说了什么？" → 能用，但认证配置很麻烦
- "帮我订阅这几个 RSS 源" → 要自己装库写代码

**Agent Reach 把这件事变成一句话：**

```
帮我安装 Agent Reach：https://raw.githubusercontent.com/Panniantong/agent-reach/main/docs/install.md
```

### 在你用之前，你可能想知道

- 💰 **完全免费**：所有工具开源、所有 API 免费。唯一可能花钱的是服务器代理（$1/月），本地电脑不需要
- 🔒 **隐私安全**：Cookie 只存在本地，不上传不外传。代码完全开源
- 🔄 **持续换代**：每个平台都是「首选 + 备选」多后端路由。某个接入方式失效就换下一个，用户无感（2026-06 实例：yt-dlp 被 B站风控封死 → 已切换 bili-cli，用户零操作）
- 🤖 **兼容所有 Agent**：Claude Code、OpenClaw、Cursor、Windsurf……任何能跑命令行的 Agent
- 🩺 **自带诊断**：`agent-reach doctor` 一条命令告诉你哪个通、哪个不通、怎么修

## 支持的平台

| 平台 | 装好即用 | 配置后解锁 |
|------|---------|-----------|
| 🌐 网页 | 阅读任意网页 | — |
| 📺 YouTube | 字幕提取 + 视频搜索 | — |
| 📡 RSS | 阅读任意 RSS/Atom 源 | — |
| 🔍 全网搜索 | — | Exa 语义搜索（MCP 接入，免费无需 Key） |
| 📦 GitHub | 读公开仓库 + 搜索 | 私有仓库、提 Issue/PR、Fork |
| 🐦 Twitter/X | 读单条推文 | 搜索推文、浏览时间线、读长文（Cookie） |
| 📺 B站 | 搜索 + 视频详情（bili-cli，无需登录） | 字幕（OpenCLI） |
| 📖 Reddit | —（匿名接口已被封） | 搜索 + 读帖子和评论（登录态） |
| 📘 Facebook | — | 搜索、主页、Feed、群组（OpenCLI） |
| 📷 Instagram | — | 用户搜索、Profile、Explore（OpenCLI） |
| 📕 小红书 | — | 搜索、阅读、评论（Cookie / OpenCLI） |
| 💼 LinkedIn | Jina Reader 读公开页面 | Profile、公司页面、职位搜索 |
| 🎯 Boss直聘 | CDP 链路体检 | 搜索岗位 + JD 全文（专用真 Chrome） |
| 💻 V2EX | 热门帖子、节点帖子、详情+回复 | — |
| 📈 雪球 | 股票行情、搜索、热门帖子、热门股票排行 | — |
| 🎙️ 小宇宙播客 | — | 播客音频转文字（Whisper，免费 Key） |

配置不需要查文档，直接告诉 Agent「帮我配 XXX」，它会一步步引导。

## 快速上手

OpenClaw 用户需先开启 exec 权限：`openclaw config set tools.profile "coding"`，重启 Gateway。

复制这句话给 Agent：

```
帮我安装 Agent Reach：https://raw.githubusercontent.com/Panniantong/agent-reach/main/docs/install.md
```

默认安全模式只检查环境不装系统包；显式 `--system` 才安装依赖并注册 SKILL.md。`--dry-run` 可预览。

## 设计理念

**Agent Reach 是一个能力层（capability layer），不是又一个工具。**

它比任何具体实现高一层——负责**选型、安装、体检、路由**，不负责底层读取本身。读取由 Agent 直接调用上游工具完成，没有包装层。

### 每个平台 = 首选 + 备选的有序后端列表

```
channels/
├── web.py          → Jina Reader
├── twitter.py      → twitter-cli ▸ OpenCLI ▸ bird
├── youtube.py      → yt-dlp
├── github.py       → gh CLI
├── bilibili.py     → bili-cli ▸ OpenCLI ▸ 搜索 API
├── reddit.py       → OpenCLI ▸ rdt-cli
├── facebook.py     → OpenCLI（桌面浏览器登录态）
├── instagram.py    → OpenCLI（桌面浏览器登录态）
├── xiaohongshu.py  → OpenCLI ▸ xiaohongshu-mcp ▸ xhs-cli
├── linkedin.py     → mcp-server-linkedin ▸ Jina Reader
├── rss.py          → feedparser
└── exa_search.py   → Exa via mcporter
```

每个渠道文件按序**真实探测**各候选后端（不只是看命令存不存在），第一个完整可用的当选；坏掉的会给出修复处方。

### 当前选型摘要

| 场景 | 首选 | 备选 | 理由 |
|------|------|------|------|
| 读网页 | Jina Reader | — | 免费无 Key |
| 读推特 | twitter-cli | OpenCLI | 搜索稳定；OpenCLI 浏览器登录态兜底 |
| Reddit | OpenCLI（桌面） | rdt-cli | 匿名接口被封，只剩登录态路线 |
| YouTube 字幕 | yt-dlp | — | 仍是最佳（不再用于 B站） |
| B站 | bili-cli | OpenCLI ▸ 搜索 API | yt-dlp 被 412 封死，bili-cli 无登录可搜可读 |
| 搜全网 | Exa via mcporter | — | AI 语义搜索，MCP 免 Key |
| GitHub | gh CLI | — | 官方工具 |
| 小红书 | OpenCLI（桌面） | xiaohongshu-mcp ▸ xhs-cli | OpenCLI 只用用户已有会话 |
| LinkedIn | mcp-server-linkedin | Jina Reader | MCP + 浏览器自动化 |

## 安全性

- 凭据本地存储：`~/.agent-reach/config.yaml`，权限 600，不上传不外传
- 默认安全：`install` 不改系统；`--system` 才装外部工具和写配置
- 完全开源，可审查；`--dry-run` 预览
- 可插拔架构：不信任某组件，换对应 channel 文件即可

**Cookie 封号风险提醒**：Twitter、小红书等 Cookie 登录平台存在被检测封号风险，务必用专用小号，不要用主账号。

## 卸载

```bash
agent-reach uninstall            # 清除 ~/.agent-reach/（含 token/cookie）、skill 文件、MCP 配置
agent-reach uninstall --dry-run  # 只预览
agent-reach uninstall --keep-config  # 只删 skill 文件，保留 token 配置
pip uninstall agent-reach        # 卸载 Python 包
```

> Stats: 85,206 Stars · MIT License · Python 3.10+ · 不要从 PyPI 安装同名包，它不是本项目
