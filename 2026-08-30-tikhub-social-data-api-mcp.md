---
title: TikHub - 社交媒体数据 API 与 MCP 基础设施
date: 2026-08-30
source: tikhub.io
url: https://tikhub.io/zh
type: article
tags: [AI, 工具, 技术]
---

## 摘要

TikHub 是面向 AI Agent 时代的社交媒体数据基础设施：一个 API 密钥覆盖 16 个平台（TikTok、抖音、Instagram、X、Reddit、LinkedIn、微信、哔哩哔哩等）的 1000+ 接口，低至 $0.001/次请求，返回结构化 JSON，仅采集公开数据、声明符合 GDPR/CCPA。核心卖点与其说是 API，不如说是 **MCP-first**：提供 990+ 个 MCP 工具、每个平台一个专用 MCP 服务器（`mcp.tikhub.io/{platform}/mcp`），可直连 Claude Desktop、Cursor、Cline、Cherry Studio、LangChain/LangGraph，用自然语言做评论互动分析、账号基准对比、趋势报告（一键生成 HTML 报告+原始数据导出）。另有 Chrome 扩展（BYOK 模式，页面侧边栏内直接分析 TikTok/Instagram/X/B站）、10 亿+ 条记录的训练数据集（CSV/JSON/JSONL/Parquet，可商用授权），以及 2026 年 8 月上线的 marketplace（卖家保留 90% 收入）。

## 全文（摘录）

### 定位

为 AI 时代而生的社交数据基础设施：面向具身智能的社交推理与情感智能数据集，以及驱动量化交易、政府与国防、营销广告领域 AI 智能体的实时社媒数据 API。

### 关键数据

- 16 个平台，1000+ 接口，10 亿+ 数据集记录
- 低至 $0.001/次请求
- 30,000+ 开发者与数据团队，每日 3 亿+ 请求处理量
- 仅采集公开数据，符合 GDPR 与 CCPA

### MCP 集成

- 990+ MCP 工具、16 个平台各一个专用 MCP 服务器，端点模式：`mcp.tikhub.io/{platform}/mcp`
- 原生支持客户端：Claude Desktop、Cursor、Cline、Cherry Studio、LangChain / LangGraph
- 能力：公开视频数据分析（元数据/播放/互动）、评论互动分析（情感/关键词/受众）、公开账号分析（指标+完整内容历史，竞品基准）、深度趋势报告（交互式 HTML + AI 内容分析 + ZIP 导出）

### Chrome 扩展

BYOK（自带密钥）客户端，页面侧边栏直接采集评论、分析主页、生成报告，支持 TikTok、抖音、Instagram、X、哔哩哔哩。

### 数据集

10+ 平台、10 亿+ 结构化记录，CSV/JSON/JSONL/Parquet 交付，持续更新、严格去重、可商用授权，按量阶梯定价。

### Marketplace（2026 年 8 月上线）

可上架 AI 智能体、API 与数据采集方案，卖家每笔交易保留 90% 收入。
