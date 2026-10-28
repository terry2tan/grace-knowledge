---
title: "VoiceStudio：开源全本地 ElevenLabs 替代品"
date: 2026-10-28
source: github.com
url: https://github.com/debpalash/VoiceStudio
type: repo
tags: [AI, 工具, 技术产品]
---

## 摘要

VoiceStudio 是一个开源（AGPL-3.0）、完全本地运行的语音工作站，定位为 ElevenLabs 的替代品，支持 646 种语言的语音克隆、语音设计、视频配音、听写、转录和有声书制作，92k+ Stars。默认引擎为 k2-fsa/OmniVoice，Model Manager 内可切换几十种其他引擎（whisper.cpp ASR、CosyVoice GGUF 等）。覆盖 macOS（MPS）/ Windows（CUDA/ROCm）/ Linux / Docker / Android / iOS 全平台，无 GPU 也能纯 CPU 跑。特别值得注意的是它提供 **本地 API + MCP 接口**供 agent 调用，还有可复用 recipes、watch folders 和官方 agent skills（`npx skills add debpalash/VoiceStudio`），属于"本地能力 agent 化"的典型实现。无账号、无 API key，数据不离开设备。

## 全文（要点整理）

### 定位
- 开源、全本地的语音 studio：clone / design / dub / dictate / transcribe / narrate，支持 646 种语言
- 号称 ElevenLabs 开源替代：无账号、无 API key、默认不联网，数据不出设备
- 92,328 Stars，Trendshift 榜单在列，活跃度很高

### 功能矩阵
| 类别 | 能力 |
|---|---|
| Create | 语音克隆、语音设计（文字描述生成音色） |
| Produce | 视频配音（多说话人、定时对齐）、有声书/故事、批量任务 |
| Connect | 本地 API & MCP（供 agent 调用）、可复用 recipes、watch folders |
| 输入 | 浮动听写小组件（dictation） |

### 平台与加速
- macOS Apple Silicon：Metal (MPS)，稳定
- Windows x64：CUDA / AMD ROCm (opt-in) / CPU，稳定
- Linux：AppImage / .deb / snap / Nix，CUDA / CPU，稳定
- Docker：GHCR 镜像，CUDA / ROCm
- Android 10+ / iOS 17+：端上离线（Preview）
- 无 GPU 可纯 CPU 运行，只是慢；GGUF 引擎支持 Vulkan（AMD/Intel/NVIDIA）

### Agent 集成（对本用户最有价值的部分）
- **Local API**：`docs/speech-platform.md`
- **MCP**：`docs/mcp.md`，可直接接入 Claude Code / OpenClaw 等 agent 工作流
- **Agent skills**：`npx skills add debpalash/VoiceStudio`（voicestudio 处理音频，voicestudio-maintainer 用于仓库维护）
- **编码 agent 安装指引**：README 直接给了给 Claude Code/Codex/Cursor 的一段安装提示词，附 `docs/install/agent.md`
- 典型的"本地模型能力通过 MCP/skills 暴露给 agent"架构，可参考其 MCP 设计

### 引擎体系
- 默认引擎 OmniVoice（k2-fsa），GGUF 版在 Windows/Linux 自动选 GPU 和模型大小
- 其他引擎：CosyVoice GGUF、whisper.cpp ASR 等几十种，在 Model Manager 中管理
- 每个模型的权重/输出许可在 Model Manager 中明示

### 商业与许可
- 完全免费，无付费云；靠赞助维持（maintainer 时间、测试硬件、代码签名、发布基础设施）
- AGPL-3.0（含商业使用），模型权重与生成输出有各自许可
- 语音克隆需获音色所有者许可

### 团队
- Creator：Palash Debnath（@idebpalash），核心团队两人 + 社区贡献者
