---
title: "html-video: HTML→Video meta-layer for coding agents"
date: 2026-06-05
source: Twitter/X
url: https://x.com/tuturetom/status/2062470358687498470
type: thread
tags: [AI产品, 工具, AI]
---

## 摘要

Tom Huang（@tuturetom）正式开源 html-video，一个让 AI Agent 通过写 HTML 生成高品质宣传/解说视频的工具。项目基于 hyperframes 框架构建，Apache 2.0 协议，内置 20+ 顶尖视频风格模板，支持分页预览/编辑和 MP4 导出。已适配 Claude Code、Codex、hermes、cursor 等主流 coding agent CLI，可本地部署，也接入了 Minimax 支持自动配音配乐。3 天完成 3 万行代码，由 Open Design 团队原班人马打造。

**为什么值得看：**
- 把"视频制作"这件事变成了 Agent 可执行的 HTML 渲染任务，降低了 Agent 做视频的门槛
- 模板质量高，开箱即用，适合产品宣传、知识解说、数据可视化场景
- 多 Agent CLI 自动探测 + 一键切换，无需额外配置 API key

## 关键信息

- **GitHub**: https://github.com/nexu-io/html-video
- **模板集合**: https://github.com/nexu-io/open-design
- **底层框架**: https://github.com/heygen-com/hyperframes
- **多 Agent 探测**: https://github.com/multica-ai/multica
- **协议**: Apache 2.0
- **视频尺寸**: 16:9 / 9:16 / 1:1 / 4:5 等
- **Agent 支持**: Codex、Claude Code、hermes、cursor、AMR（官方）
- **配音配乐**: Minimax 集成

## 全文（Thread 精华）

**[1] 主推文**
正式开源 html-video 🚀 html版剪映来了！你的 Agent 现在可以通过写 html 轻松做出世界级水准的产品宣传、知识解说视频，成本极低！历时 3 天，3 万行代码！支持20多套顶尖视频风格模板，分页编辑，mp4 导出，支持包括 Claude Code、Codex、hermes、cursor 等主流 Agent 接入即用。

**[2] 项目背景**
html-video 基于 hyperframes 框架构建，Apache 2.0 开源，由 Open Design 团队原班人马打造。
repo: https://github.com/nexu-io/html-video

**[3] 模板**
内置 20 多套顶级 html 视频模板，适合产品宣传、知识解说、数据可视化。只需丢给 Agent 一个网站链接、文件、公众号文章，Agent 就能生成动态 mp4 视频。模板同样可在 Open Design 中找到。

**[4] 编辑能力**
支持分页预览、分页编辑和帧文字编辑，修改视频不用每改一次就导出看效果。同步支持横屏 16:9 / 竖屏 9:16 / 方形 1:1 / 小红书 4:5 等多种视频尺寸。

**[5] Agent 接入**
自动识别本地 6 种 code agent CLI——Codex、Claude Code、hermes、cursor agent 等。顶部栏一键切换，无需额外配置 API key。没有本地 Agent 的用户也可直接使用官方 AMR 接入。

**[6] 配音配乐**
已接入 Minimax，支持直接根据视频内容生成配音和配乐。

**[7] 致谢**
- hyperframes 视频生成框架: https://github.com/heygen-com/hyperframes
- multica 多 CLI agent 探测策略: https://github.com/multica-ai/multica
