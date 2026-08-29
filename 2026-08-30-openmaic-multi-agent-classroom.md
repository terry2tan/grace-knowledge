---
title: OpenMAIC - 开源多智能体交互式课堂
date: 2026-08-30
source: github.com
url: https://github.com/THU-MAIC/OpenMAIC
type: repo
tags: [AI, AI产品, 工具]
---

## 摘要

OpenMAIC（清华大学 MAIC 团队，~22k stars，MIT 协议）是一个开源的「多智能体交互式课堂」平台：输入一个主题或上传文档，几分钟内生成完整课程——幻灯片、测验、交互式 HTML 模拟、PBL 项目式学习，由 AI 老师和 AI 同学实时讲授、白板绘图、语音讨论。2026-08-27 发布的 v1.0.0 增加了 Agent 工作台：以对话方式让 agent 规划课程、逐页构建与修改，支持持久化会话（服务端存储、可取消/恢复/中途接管）、会话材料上传（文档/音视频/网络搜索）、20 个内置技能（幻灯片、测验、PBL、图像、视频、语音、.pptx 导入）。架构上基于 Next.js 16 + React 19 + TypeScript 5 + LangGraph 1.1 + Tailwind 4，模型/媒体/搜索/存储 provider 全部中立可插拔（支持 OpenAI、Anthropic、Bedrock、DeepSeek、Qwen、Kimi、GLM、Ollama 本地及任何 OpenAI 兼容 API），可导出可编辑 .pptx 和交互式 .html。有 OpenClaw 集成（`clawhub install openmaic`），可从飞书/Slack/Telegram 等 20+ 消息应用直接生成课堂。

## 全文（README 摘录）

**OpenMAIC** (Open Multi-Agent Interactive Classroom) 是一个开源 AI 平台，把任意主题或文档变成丰富的交互式课堂体验。由多智能体编排驱动，生成幻灯片、测验、交互式模拟和项目式学习活动——全部由能说话、在白板上画图、与你实时讨论的 AI 老师和 AI 同学交付。

### 核心亮点

- 一键生成课程：描述主题或附带材料，AI 几分钟内构建完整课程
- 多智能体课堂：AI 老师和同伴实时授课、讨论、互动
- 丰富场景类型：幻灯片、测验、交互式 HTML 模拟、PBL
- 白板与 TTS：agent 画图、写公式、口头讲解
- 导出任意位置：可编辑 .pptx 幻灯片或交互式 .html 页面
- OpenClaw 集成：通过消息应用生成课堂

### v1.0.0（2026-08-27）：用 agent 构建课程

一句提示词进，一整套课程出——现在还可中途接管。在经典一键生成器之外新增 Pro 工作台：与 agent 对话来规划课程、构建和修改每一页，可直接基于你的材料工作。

- 🤖 Agent 工作台——以对话为先的工作区，规划、构建、修改完整课程
- 💾 持久会话——服务端运行可在重启后存活；随时取消、恢复、接管
- 📎 会话材料——上传文档、音频、视频，或从网络搜索拉取；agent 基于它们构建
- 🧰 课程工具 + 20 个内置技能——幻灯片、测验、交互组件、PBL、图像、视频、语音、.pptx 导入
- 🔌 设计中立——自带模型、媒体、搜索 provider 和存储后端

### 技术栈与 Provider

- Next.js 16 / React 19 / TypeScript 5 / LangGraph 1.1 / Tailwind CSS 4
- LLM Provider：OpenAI、Azure OpenAI、Anthropic、Amazon Bedrock、Google Gemini、DeepSeek、Qwen、Kimi、MiniMax、Grok、OpenRouter、豆包、腾讯混元、小米 MiMo、GLM、Ollama（本地）、Lemonade（本地 LLM/图像/TTS/ASR）、FunASR（本地 ASR）及任何 OpenAI 兼容 API
- `server-providers.yml` 统一配置各 provider
- 本地方案：Lemonade（OpenAI 兼容本地服务，无需 API key）、FunASR 语音识别

### OpenClaw 集成

1. `clawhub install openmaic` 或让 Claw "install OpenMAIC skill"
2. 选模式：Hosted（open.maic.chat 取 access code，零本地部署）或 Self-hosted（skill 引导 clone/配置/启动）
3. 对助手说 "teach me quantum physics" 即可

### 其他能力（版本演进）

- v0.3.2：MP4 视频导出加固、服务端持久化（Postgres 参考栈）、asset registry、`@openmaic/generation` 包
- v0.3.1：一键 MP4 导出、编辑器内直接操作幻灯片、"Edit with AI"（JSON Patch 校验编辑、多会话历史）、文档解析（多格式上传、音视频提取、AliDocMind、MinerU）
- v0.3.0：PBL v2 课堂 UI、`@openmaic/*` SDK 家族（DSL/renderer/importer）发布至 npm、每阶段模型路由、从 AGPL-3.0 改为 MIT
- v0.2.x：深度交互模式（3D 可视化、模拟、游戏、思维导图、在线编程）、VoxCPM2 TTS 语音克隆

### 快速开始

```bash
git clone https://github.com/THU-MAIC/OpenMAIC.git
cd OpenMAIC
pnpm install
cp .env.example .env.local   # 填入至少一个 LLM provider key
```

- 论文：JCST'26（https://jcst.ict.ac.cn/en/article/doi/10.1007/s11390-025-6000-0）
- Live Demo：https://open.maic.chat/
