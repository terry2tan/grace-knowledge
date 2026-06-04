---
title: 用 agent-browser skill 控制 Electron 应用：原理与实践
date: 2026-03-02
source: x.com
url: https://x.com/vikingmute/status/2028321502949781600
type: tweet
tags: [AI, 工具, 技术]
---

## 摘要

agent-browser skill 不仅能控制浏览器，还能控制任何基于 Electron 的桌面应用（如 Slack）。原理是 Electron 应用默认暴露 Chrome DevTools Protocol (CDP) 端口（通常 9222），通过 CDP 接入后可像操控 headless Chrome 一样控制应用，Playwright/Puppeteer 等工具均适用。已有人用此方案让 Claude Code 自动化发送 Slack 消息。

## 全文

才发现原来可以使用前几天我推荐的 agent-browser 去控制任何 Electron based 的 App，OP 就用 agent-browser 让 Claude Code 去控制了 Slack，自动化的发送信息。

用的是这两个 skills，一个是 Slack 专属的：
https://skills.sh/vercel-labs/agent-browser/slack
一个是通用的 Electron 应用的：
https://skills.sh/vercel-labs/agent-browser/electron

其实原理很简单：
几乎所有的 Electron 应用都会暴露 Chrome DevTools Protocol (CDP) 端口，通常是 --remote-debugging-port=9222 或类似端口，然后使用 CDP 协议进行控制，一旦连上，就跟控制普通 headless Chrome 几乎一样。

所以任何浏览器自动化工具都是可以控制的，比如 Playwright 或者 Puppeteer。

但是还是一个很棒自动化的思路。
