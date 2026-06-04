---
title: 用 wechat-article-exporter 批量抓取公众号文章与互动数据
date: 2026-05-18
source: x.com / @gengdaJ
type: tweet
url: https://x.com/gengdaJ/status/2055850186497527881
tags: [工具, AI产品, 方法论]
---

## 摘要

这条推文推荐了 `wechat-article/wechat-article-exporter`：一个可批量下载微信公众号文章正文、阅读量、评论区等数据的开源工具，支持在线站点、Docker 私有化部署和 Cloudflare 部署。它和引用推文中的工作流结合起来看，价值在于把公众号文章先批量沉淀为 Markdown/HTML/JSON 等结构化资产，再交给 Codex / Agent 做长文写作研究、生命周期分析和可视化。对用户很有用：它直接补齐了「公众号内容采集 → 知识库沉淀 → Agent 分析 → HTML 可视化」这条工作流；但涉及公众号数据抓取和账号授权，需注意版权、合规和账号安全。

## 全文

## 原推文

@gengdaJ（逸尘）  
2026-05-17 11:17:34  
链接：https://x.com/gengdaJ/status/2055850186497527881

很多朋友好奇我怎么一次性把卡兹克老师的所有公众号文章批量抓取下来的，今天来分享一个宝藏的免费工具，批量抓取公众号博主的正文、互动量、评论区。

GitHub：https://github.com/wechat-article/wechat-article-exporter  
在线网站：https://down.mptext.top/dashboard/account

自用就行，别拿来干坏事🫡

## 引用推文

@gengdaJ（逸尘）  
2026-05-13 11:25:41  
链接：https://x.com/gengdaJ/status/2054402676033781797

最近在结合Codex 5.5仔细地研究卡兹克老师和花生老师的超过1000篇公众号文章，来提升自己写长文章的能力。

做了一个HTML网页，来展示两位老师文章的生命周期和质变节点。

前者能帮我们看清大V的来时路，后者可以供我们学习大佬们到底用了什么优质文章破圈。

图中可以看出，大佬们的成名之路也不是一帆风顺呐，都要有长期的积累，才可能厚积薄发。

最近不是在讨论HTML和Markdown哪个更火吗？我也就今天这个案例发表下我的观点：

没必要跟风吹捧，各有各的优势，Markdown是给Agent读的，HTML是给人读的。Markdown适合做知识库，方便Agent索引，但是HTML更适合人脑记忆。

所以我的工作流一般是：用obsidian沉淀所有重要的文字图片资产，然后用HTML把需要我理解的点可视化出来，分工协作，有条不紊。

## 相关仓库信息

Repository: `wechat-article/wechat-article-exporter`  
URL: https://github.com/wechat-article/wechat-article-exporter  
Stars: 9468  
Topics: `download`, `wechat`, `wechat-article`, `wechat-download`  
Created: 2024-07-17T14:41:12Z  
Updated: 2026-05-17T16:09:28Z

官方描述：一款在线的微信公众号文章批量下载工具，支持导出阅读量与评论数据，无需搭建任何环境，可通过在线网站使用，也支持 Docker 私有化部署和 Cloudflare 部署。支持下载多种文件格式，其中 HTML 格式可 100% 还原文章排版与样式。

### 主要特性

- 搜索公众号，支持关键字搜索；
- 支持导出 HTML / JSON / Excel / TXT / MD / DOCX；
- HTML 格式会打包图片和样式文件，尽量还原文章样式；
- 缓存文章列表数据，减少接口请求次数；
- 支持按作者、标题、发布时间、原创标识、所属合集等过滤；
- 支持合集下载；
- 支持图片分享消息、视频分享消息；
- 支持导出评论、评论回复、阅读量、转发量等数据（需要抓包获取 credentials 信息）；
- 支持 Docker 部署、Cloudflare 部署；
- 开放 API 接口。

### 官方链接

- GitHub：https://github.com/wechat-article/wechat-article-exporter
- 在线下载站：https://down.mptext.top
- 文档站：https://docs.mptext.top

## Grace 备注

这条值得放进工具链参考，而不只是收藏一条推文。它和用户已有的内容收藏、微信公众号提取、AI 长文写作研究、Markdown/HTML 分层知识库思路高度相关：Markdown 适合 Agent 读，HTML 适合人读和做可视化。实际使用时建议优先用于自有授权内容、公开内容归档或个人学习，避免批量搬运和侵权风险。
