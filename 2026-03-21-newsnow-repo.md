---
title: NewsNow：优雅阅读实时与热门新闻
date: 2026-03-21
source: github.com
url: https://github.com/ourongxing/newsnow
type: repo
tags: [工具, 产品, 技术]
---

## 摘要

NewsNow 是一个面向实时新闻消费的开源项目，目标不是做信息聚合后台本身，而是把“热门新闻阅读体验”做成更干净、更顺滑、可自部署的产品。它的亮点在于把实时抓取、缓存、GitHub OAuth 登录、数据同步和可扩展数据源架构放在一起，同时还提供了 MCP Server，方便被 AI agent 或外部工具接入。项目部署门槛不高，支持 Cloudflare Pages、Vercel、Docker，以及基于 Cloudflare D1 的数据库方案。对想做资讯产品、信息聚合站、或给 agent 增加新闻能力的人来说，这个仓库兼具可直接使用的成品感和可二次开发的工程结构。

## 全文

仓库：<https://github.com/ourongxing/newsnow>

官网：<https://newsnow.busiyi.world>

仓库描述：Elegant reading of real-time and hottest news

项目语言：TypeScript

License：MIT

Topics：news, elegant

创建时间：2024-09-23T14:16:12Z

最近更新时间：2026-03-21T13:27:32Z

Stars：18,894（抓取时）

README 核心信息整理如下：

1. 项目定位

这是一个强调“优雅阅读实时与热门新闻”的开源项目。README 明确指出当前公开版本还是 demo，现阶段主要支持中文，后续会发布支持更强定制能力和英文内容的完整版本。

2. 主要功能

- 干净、优雅的阅读界面
- 热门新闻实时更新
- GitHub OAuth 登录与数据同步
- 默认 30 分钟缓存，登录用户可强制刷新
- 基于不同来源更新频率的自适应抓取间隔，最短 2 分钟，用于优化资源使用并降低 IP 被封风险
- 提供 MCP Server

3. MCP 接入方式

README 给出了一个直接可用的 MCP Server 配置示例：

```json
{
  "mcpServers": {
    "newsnow": {
      "command": "npx",
      "args": ["-y", "newsnow-mcp-server"],
      "env": {
        "BASE_URL": "https://newsnow.busiyi.world"
      }
    }
  }
}
```

如果有自己的部署域名，可以替换其中的 `BASE_URL`。

4. 部署方式

项目支持多种部署路径：

- 轻量部署：fork 后直接导入 Cloudflare Pages 或 Vercel
- Cloudflare Pages 构建配置：`pnpm run build`
- 输出目录：`dist/output/public`
- Docker 部署：在项目根目录执行 `docker compose up`

5. 登录与后端配置

如果要启用登录和服务端能力，需要配置 GitHub OAuth：

- 创建 GitHub App
- 无需特殊权限
- 回调地址设为 `https://your-domain.com/api/oauth/github`
- 获取 Client ID 与 Client Secret

本地开发时，README 提示把 `example.env.server` 重命名为 `.env.server`，并配置：

- `G_CLIENT_ID`
- `G_CLIENT_SECRET`
- `JWT_SECRET`
- `INIT_TABLE=true`
- `ENABLE_CACHE=true`

6. 数据库与开发环境

- 推荐使用 Cloudflare D1 Database
- 支持的数据库连接器基于 `db0`
- 本地开发要求 Node.js >= 20
- 启动方式：

```sh
corepack enable
pnpm i
pnpm dev
```

7. 工程可扩展性

README 特别提到新增数据源时，可以参考 `shared/sources` 和 `server/sources` 目录。说明这个项目不只是一个前端壳，而是已经把新闻源扩展抽象成了相对清晰的架构，适合继续补充新的内容源或做二次开发。

8. Roadmap

当前路线图包括：

- 增加多语言支持
- 提升个性化能力，例如基于分类的新闻和保存偏好
- 扩展覆盖全球新闻的多语言数据源

整体来看，NewsNow 不是单纯展示 RSS 的模板项目，而是一套朝着“可部署新闻产品 + 可接入 agent 的新闻能力”发展的开源底座。
