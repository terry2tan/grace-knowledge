---
title: "Impeccable：让 AI 更擅长设计的前端设计语言"
date: 2026-03-09
source: github.com
url: https://github.com/pbakaus/impeccable
type: repo
tags: [工具, 技术, AI产品]
---

## 摘要

Impeccable 是 Paul Bakaus 基于 Anthropic 官方 frontend-design skill 扩展的开源设计语言工具包，目标是打破 AI 生成 UI 的"平庸偏见"（Inter 字体、紫色渐变、卡片套卡片）。它包含 1 个扩展 skill（含 7 份领域参考文档）、17 个命令（/audit、/polish、/distill 等），以及一套明确的反模式清单，告诉 AI 不该做什么。支持 Claude Code、Cursor、Gemini CLI、Codex CLI 四大平台，已获 1800+ Stars，Apache 2.0 协议。

## 全文

### 基本信息

- **仓库**：pbakaus/impeccable
- **Stars**：1.8k
- **许可证**：Apache-2.0
- **网站**：impeccable.style
- **作者**：Paul Bakaus

### 项目背景

Anthropic 官方推出了 [frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design) skill，指导 Claude 生成更好的 UI。Impeccable 在此基础上深度扩展，提供更专业的设计领域知识和更多控制手段。

> 每个 LLM 都从同样的通用模板中学习。没有引导，你就会看到同样可预测的错误：Inter 字体、紫色渐变、卡片套卡片、彩色背景配灰色文字。

### 核心内容

#### The Skill：frontend-design（7 份领域参考）

| 参考文档 | 覆盖内容 |
|---------|---------|
| typography | 字体系统、字体搭配、模块化比例、OpenType |
| color-and-contrast | OKLCH、色调中性色、深色模式、无障碍 |
| spatial-design | 间距系统、网格、视觉层次 |
| motion-design | 缓动曲线、错开动画、减少动效 |
| interaction-design | 表单、焦点状态、加载模式 |
| responsive-design | 移动优先、流式设计、容器查询 |
| ux-writing | 按钮标签、错误信息、空状态 |

#### 17 个命令

| 命令 | 作用 |
|------|------|
| `/teach-impeccable` | 一次性设置：收集设计上下文，保存到配置 |
| `/audit` | 技术质量检查（无障碍/性能/响应式） |
| `/critique` | UX 设计评审：层次、清晰度、情感共鸣 |
| `/normalize` | 对齐设计系统标准 |
| `/polish` | 发布前最终打磨 |
| `/distill` | 精简到核心本质 |
| `/clarify` | 改善不清晰的 UX 文案 |
| `/optimize` | 性能优化 |
| `/harden` | 错误处理、国际化、边界情况 |
| `/animate` | 添加有目的的动效 |
| `/colorize` | 引入战略性用色 |
| `/bolder` | 放大平淡的设计 |
| `/quieter` | 降低过于粗犷的设计 |
| `/delight` | 增加令人愉悦的细节 |
| `/extract` | 提取为可复用组件 |
| `/adapt` | 适配不同设备 |
| `/onboard` | 设计引导流程 |

#### 反模式清单（明确告诉 AI 不该做什么）

- 不用过度使用的字体（Arial、Inter、系统默认字体）
- 不在彩色背景上用灰色文字
- 不用纯黑/纯灰（始终加色调）
- 不把所有内容包在卡片里，不嵌套卡片
- 不用弹跳/弹性缓动（显得过时）

### 安装方式

#### Claude Code

```bash
# 项目专用
cp -r dist/claude-code/.claude your-project/

# 全局（适用所有项目）
cp -r dist/claude-code/.claude/* ~/.claude/
```

#### 其他平台

- **Cursor**：`cp -r dist/cursor/.cursor your-project/`（需开启 Nightly + Agent Skills）
- **Gemini CLI**：`cp -r dist/gemini/.gemini your-project/`（需 @preview 版本）
- **Codex CLI**：`cp -r dist/codex/.codex/* ~/.codex/`

或直接访问 [impeccable.style](https://impeccable.style/) 下载对应工具的 ZIP 包。

### 使用示例

```
/audit           # 发现问题
/normalize       # 修复不一致
/polish          # 最终清理
/distill         # 去除复杂性
/audit header    # 聚焦特定区域
/polish checkout-form
```
