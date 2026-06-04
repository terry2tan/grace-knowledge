---
title: AI Agent 浏览器三剑客：agent-browser + actionbook + browser-use
date: 2026-02-11
source: x.com
url: https://x.com/wangray/status/2021571885868495351
type: article
tags: [AI, 工具, 技术]
---

# AI Agent 浏览器三剑客：agent-browser + actionbook + browser-use

**来源**: [@wangray](https://x.com/wangray/status/2021571885868495351)（Ray Wang）
**日期**: 2026-02-11
**原文**: https://x.com/i/article/2021563156955594754

---

## 为什么 AI Agent 需要浏览器

LLM 知识有截止日期，无法访问实时信息。传统浏览器自动化（Selenium、Puppeteer）要么脚本繁琐，要么让 LLM 摸索页面结构（慢、贵、不稳定）。

三个专为 Agent 设计的浏览器工具：

| 工具 | 定位 | 特点 |
|------|------|------|
| **agent-browser** | 无头浏览器 + 可访问性树 | 底层能力，读取/截图任意页面 |
| **actionbook** | 预计算操作手册 | 告诉 Agent 怎么操作已支持的网站，省钱省时 |
| **browser-use** | Python 高级封装 | 更易集成到 Python 项目 |

---

## agent-browser 快速上手

### 安装
```bash
npm install -g agent-browser
agent-browser install  # 安装 Chromium
```

### 核心命令
```bash
agent-browser open https://x.com/xxx/status/xxx
agent-browser snapshot          # 输出可访问性树，元素用 e1/e2 引用
agent-browser get text e5       # 读取指定元素文本
agent-browser click e7          # 点击元素
agent-browser fill e3 "文字"    # 填写表单
agent-browser screenshot --annotate  # 截图（带标注）
agent-browser close             # 释放进程
```

### 实战场景
- **读 X/Twitter 帖子**：无需登录，获取完整内容 + 互动数据，比浏览器自动化更稳定
- **读 GitHub Trending**：解析可访问性树提取仓库、Star 数、描述
- **截图存档**：生成带标注截图，约 99KB

---

## actionbook 快速上手

### 安装
```bash
npm install -g actionbook
```

### 核心命令
```bash
actionbook sources list         # 查看已支持网站
actionbook search "reddit"      # 搜索操作手册
actionbook get x.com:/reply:default  # 获取完整操作手册
```

### 已支持网站（示例）
X/Twitter、Reddit、Google Scholar 等，手册里写明每步操作：点哪里、填什么、等什么。Agent 直接执行，不用 LLM 猜测。

---

## 两者配合使用

### 场景 1：读取 + 操作
1. `agent-browser` 打开页面，`snapshot` 获取当前状态
2. `actionbook` 查手册，执行标准化操作（如发帖、点赞）
3. `agent-browser` 再次 `snapshot` 确认结果

### 场景 2：已支持 vs. 未支持网站
- **有 actionbook 手册**（X, Reddit, Google Scholar）→ 优先用 actionbook（快、便宜、稳定）
- **无手册的网站** → 用 agent-browser 读取 + LLM 解析可访问性树

### 场景 3：Google 搜索的坑
Google 会检测机器人 IP，VPS 上跑大概率被拦截。

**解决方案**：
- Google Custom Search API
- Brave Search API（OpenClaw 内置 `web_search`）
- 本地机器跑浏览器（IP 相对干净）

---

## VPS/Linux 无桌面部署

两者均基于 Playwright Chromium，原生支持 headless，无需 X11。

```bash
# Ubuntu/Debian 系统依赖
apt-get install -y libglib2.0-0 libnss3 libatk1.0-0 libcups2 libdrm2 ...

# 安装工具 + Chromium
npm install -g agent-browser actionbook
agent-browser install
actionbook install
```

---

## 与 OpenClaw 集成

通过 OpenClaw 的 `nodes` 工具在 VPS 远程运行浏览器，结果返回本地 Agent。

```bash
# 远程调用示例（节点名 vps-worker）
nodes run vps-worker "agent-browser open https://x.com/xxx && agent-browser snapshot"
nodes run vps-worker "actionbook search reddit"
```

### 为什么远程调用？
- VPS IP 更干净（绕过家宽 IP 检测）
- 本地专注 LLM 推理，浏览器任务丢给远程
- 多节点并行抓取不同网站

---

## 实战建议

1. **优先查 `actionbook sources list`**，有手册就用手册（省钱省时间）
2. 没手册的网站用 `agent-browser` 读取 + LLM 解析
3. **Google 搜索别用浏览器**，用 API（Brave Search / Google Custom Search）
4. VPS 部署记得装 Chromium 依赖，测试 headless 模式
5. OpenClaw 集成时用 `nodes run` 远程调用

---

**标签**: `agent-browser` `actionbook` `browser-use` `AI Agent` `浏览器自动化` `OpenClaw` `CLI` `工具`
