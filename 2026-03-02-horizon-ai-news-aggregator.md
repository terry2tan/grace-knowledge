---
title: Horizon：全自动 AI 科技新闻聚合与摘要生成器
date: 2026-03-02
source: github.com
url: https://github.com/Thysrael/Horizon
type: repo
tags: [AI, 工具, 技术]
---

## 摘要

Horizon 是一个全自动 AI 新闻聚合工具（526 Stars），支持从 HackerNews、RSS、Reddit、Telegram、GitHub 多源抓取，用 Claude/GPT-4/Gemini/DeepSeek 等模型对每条新闻 0-10 评分过滤，自动生成中英双语每日简报，并通过 GitHub Actions 定时部署到 GitHub Pages。核心亮点是配置驱动（单 JSON 文件）、跨来源去重、联网搜索补充背景知识，以及汇总社区讨论。

## 项目信息

- **仓库**：https://github.com/Thysrael/Horizon
- **Stars**：526
- **语言**：Python
- **Topics**：aggregator, news, llm, python
- **License**：MIT

## 核心功能

- **多源聚合**：Hacker News、RSS/Atom、Reddit、Telegram 公开频道、GitHub（用户事件 & 仓库发布）
- **AI 评分过滤**：Claude/GPT-4/Gemini/DeepSeek/豆包 或任意 OpenAI 兼容 API，每条 0-10 评分，低于阈值（默认 6.0）自动过滤
- **中英双语摘要**：一次运行同时生成 EN 和 ZH 报告
- **内容增强**：对高分内容联网搜索背景知识
- **社区声音**：自动抓取 HackerNews/Reddit 评论并总结
- **跨源去重**：不同平台指向同一 URL 的内容自动合并
- **静态站部署**：GitHub Actions 定时触发，自动发布到 GitHub Pages

## 工作流程

```
Fetch → Deduplicate → AI Score & Filter → Enrich & Search → Summarize → Deploy
```

1. 并发抓取所有来源最新内容
2. 合并跨平台重复 URL
3. AI 评分，保留高于阈值的条目
4. 高分条目联网搜索背景 + 收集社区讨论
5. 生成结构化 Markdown 报告（含摘要、标签、参考链接）
6. 可选发布到 GitHub Pages

## 快速上手

```bash
git clone https://github.com/Thysrael/Horizon.git
cd horizon
uv sync            # 或 pip install -e .
cp .env.example .env
cp data/config.example.json data/config.json
uv run horizon     # 运行（默认抓取过去 24 小时）
```

## 配置示例

```jsonc
{
  "ai": {
    "provider": "anthropic",
    "model": "claude-sonnet-4-6",
    "languages": ["en", "zh"]
  },
  "sources": {
    "hackernews": { "enabled": true, "fetch_top_stories": 20 },
    "rss": [{ "name": "Simon Willison", "url": "https://simonwillison.net/atom/everything/" }],
    "reddit": { "subreddits": [{ "subreddit": "MachineLearning", "sort": "hot" }] }
  },
  "filtering": { "ai_score_threshold": 6.0, "time_window_hours": 24 }
}
```

## Roadmap

- [x] 多源聚合、AI 评分、双语摘要、联网增强、社区讨论、GitHub Pages 部署、Web UI
- [ ] Email/Slack/Webhook 通知
- [ ] 更多来源（Twitter/X、Discord 等）
- [ ] 每来源自定义评分 Prompt
