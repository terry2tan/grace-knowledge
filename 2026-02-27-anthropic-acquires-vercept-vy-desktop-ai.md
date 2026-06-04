---
title: Anthropic 收购 Vercept，桌面 AI 助手 Vy 将并入 Claude
date: 2026-02-27
source: x.com
url: https://x.com/xiaohu/status/2026878447503790131
type: thread
tags: [AI]
---

## 摘要

Anthropic 宣布收购西雅图 AI 创业公司 Vercept，其产品 Vy 是一个通过"观察学习"实现桌面自动化的 AI 助手——用户操作一遍，Vy 就学会了，之后可以自动重复执行。收购核心价值在于 VyUI 模型对 UI 界面的理解能力超过 Anthropic 自家模型，将直接补强 Claude Computer Use 的屏幕理解短板。Vy 将于 3 月 25 日关闭，现有用户引导转向 Claude。多位评论者认为这对 RPA 行业（如 UiPath）是重大威胁。

## 原文

**@xiaohu (小互)**，2026-02-26

Anthropic 宣布收购西雅图 AI 创业公司 Vercept

Vercept 的产品叫 **Vy**，一个桌面 AI 助手。它能跟着你学会如何操作电脑...

具体怎么用：比如你每天要做一个重复工作：打开浏览器查数据 → 复制到 Excel → 整理格式 → 发邮件给同事。你自己操作一遍，Vy 在旁边"看着"，学会了。

**Vercept 的产品 Vy 将在 30 天内关闭（3 月 25 日），现有用户会被引导转向 Claude。**

详细报道：https://www.xiaohu.ai/c/xiaohu-ai/anthropic-ai-vercept-claude

## 关键评论

- **@shiqianping28**：VyUI 在 UI 理解上超过自家模型，这才是收购的核心价值。Claude Computer Use 的短板一直是"看懂屏幕"，Vercept 直接补上来了。
- **@Kunka020**：目前 OpenClaw 操作浏览器最耗 token，用 snapshot 读 DOM 效率远没有眼睛看按钮高。如果操作变得准确高效，达到"人类级点击效率"，everything changes。
- **@kuroshiro01**：OpenClaw 很惊艳，但目前更像玩具，真正值得期待的是 Anthropic 会端出什么产品。
- **@KrixonC / @0xLogicrw**：这不就是 RPA 擅长的东西吗，RPA 公司估计要死。

## 值得关注的产品

- **Vy（Vercept）**：已关闭，3 月 25 日停服，能力并入 Claude
- **Claude Computer Use**：Anthropic 的电脑操作能力，将整合 VyUI 模型
- **OpenClaw / NanoClaw**：当前可用的桌面 AI Agent，相关讨论见 thread

## 核心判断

这次收购本质是 Anthropic 在补强 Claude 的"感知层"——让 Claude 真正看懂屏幕、理解 UI，而不只是截图识别。对标方向：完全替代 RPA（按键精灵、UiPath 这类工具）。
