# 龙虾越火越应该打磨 Skill——乔帮主精选 Skills 合集

**来源**: X Article / @vista8（向阳乔木）
**链接**: https://x.com/i/article/2029933398874279939
**转发**: @dotey（宝玉）
**日期**: 2026-03-06
**标签**: #工具 #OpenClaw #龙虾 #Skill #AI #效率

---

## 核心观点

> **Skill 是龙虾的灵魂。没有 Skill 的龙虾，就像一台没装 App 的手机。**

龙虾（OpenClaw）越热，普通人越应该沉下心打磨 Skill，否则装了也没太大用处。
先想清楚：**你让 AI 帮你干什么？** 这个问题想清楚了，Skill 自然知道怎么写。

---

## 一、抓取采集 Skill

### 1. Agent Reach — 给 AI 装上眼睛
- **仓库**: https://github.com/Panniantong/Agent-Reach
- **功能**: 零 API 成本，让 AI Agent 访问整个互联网
- 覆盖：网页抓取、YouTube 字幕、Twitter/X 搜索、GitHub、Reddit、B站、小红书、抖音、微信公众号、RSS、语义搜索
- 亮点：全部免费开源后端、本地凭证存储（cookie 不外传）、内置诊断工具 `agent-reach doctor`
- **安装**: 让 AI 说 "帮我安装 Agent Reach: https://raw.githubusercontent.com/Panniantong/agent-reach/main/docs/install.md"
- 前置：Python、yt-dlp、gh CLI；中文平台需 Docker

### 2. Defuddle — 网页正文提取神器
- **仓库**: https://github.com/joeseesun/defuddle-skill
- **功能**: 提取干净的文章正文，去除广告/侧边栏等杂乱元素
- 来源：Obsidian CEO 写的命令行工具，封装成 Skill
- 返回：Markdown 正文 + 标题、作者、发布日期、字数等元数据
- **安装**: `npx skills add joeseesun/defuddle-skill`

### 3. YouTube 搜索下载（yt-search-download）
- **仓库**: https://github.com/joeseesun/yt-search-download
- **功能**: YouTube 全站搜索 + 视频下载 + 字幕提取，一站搞定
- 支持：按日期/播放量/相关性排序、频道搜索、最高4K下载、MP3提取、SRT字幕、英文标题自动翻译中文
- 典型用法：搜索主题视频 → 提取字幕 → 后续内容创作
- **安装**: `npx skills add joeseesun/yt-search-download`
- 前置：YouTube API Key（免费申请）+ `brew install yt-dlp`；注意经常更新 yt-dlp，使用干净 IP

### 4. Anything to NotebookLM — 万物皆可用 NotebookLM 处理
- **仓库**: https://github.com/joeseesun/anything-to-notebooklm
- **功能**: 把任何内容扔进 Google NotebookLM，自动生成播客/PPT/思维导图/测验等
- 整合：NotebookLM-py（tenglin）+ 微软 Markitdown 等开源项目
- 支持输入：微信公众号、YouTube、PDF、EPUB、网页、Office、图片、音频（15+格式）
- 支持输出：播客、PPT、思维导图、测验、报告、视频、信息图
- **安装**:
  ```bash
  git clone https://github.com/joeseesun/anything-to-notebooklm.git
  cd anything-to-notebooklm && ./install.sh
  ```

---

## 二、内容创作 Skill

### 5. 宝玉老师 Skill 合集 — 内容创作全家桶
- **仓库**: https://github.com/jimliu/baoyu-skills
- **作者**: @dotey（宝玉）
- 视觉内容：小红书信息图、通用信息图（20布局×17风格）、封面图（5维度）、幻灯片（14+风格）、漫画、文章插图
- 社交媒体发布：X/Twitter、微信公众号、小红书
- 内容工具：Markdown转换、图片压缩（WebP/PNG）、DeepL翻译、URL转Markdown
- **安装**: `npx skills add jimliu/baoyu-skills`

### 6. Markdown 一键发 X 长文
- **仓库**: https://github.com/joeseesun/qiaomu-x-article-publisher
- **功能**: 写好 Markdown，一键发布为 X Articles 草稿
- 支持：完整 Markdown 格式、自动图片上传、7天免重复认证
- **安装**:
  ```bash
  git clone https://github.com/joeseesun/qiaomu-x-article-publisher.git ~/.claude/skills/qiaomu-x-article-publisher
  pip install Pillow pyobjc-framework-Cocoa patchright
  python auth_manager.py setup
  ```

### 7. Knowledge Site Creator — 一句话生成学习网站
- **仓库**: https://github.com/joeseesun/knowledge-site-creator
- **功能**: 告诉 AI 你想学什么，自动生成完整学习网站并部署上线（全程零代码）
- 流程：主题分析 → 内容创作 → 页面设计 → Vercel 部署
- 学习模式：闪卡、渐进学习、测验、索引、进度追踪
- 技术：PWA 离线支持、SEO 优化、零前端依赖（原生 HTML/CSS/JS）
- **安装**: `npx skills add joeseesun/knowledge-site-creator`

---

## 三、效率工具 Skill

### 8. Spotify 音乐播放器 — 自然语言听歌
- **仓库**: https://github.com/joeseesun/qiaomu-music-player-spotify
- **功能**: 自然语言控制 Spotify，内置 5947 种音乐风格数据库
- 例："放点适合写代码的音乐" / "来首 Bohemian Rhapsody"
- 支持：搜索、播放、暂停、跳曲、音量、队列、场景/情绪推荐
- 零外部依赖，纯 Python 标准库，自动 OAuth token 刷新
- 需要 Spotify Premium（约150元/年）
- **安装**: `npx skills add joeseesun/qiaomu-music-player-spotify`

### 9. Design Advisor — 乔布斯式设计顾问
- **仓库**: https://github.com/joeseesun/qiaomu-design-advisor
- **功能**: 融合乔布斯产品直觉 + Dieter Rams 功能纯粹主义的 UI/UX 顾问
- 特点：挖掘表面需求背后的真实用户需求，审视间距/色温/动画时序等细节
- 每个问题提供三层方案：渐进改进 / 结构重设计 / 理想方案
- 触发词：`重新设计`、`redesign`、`review UI`、`优化交互体验`
- **安装**: `npx skills add joeseesun/qiaomu-design-advisor`

---

## 四、Skill 管理与发现

### Skill Publisher — 一键发布 Skill 到 GitHub
- **仓库**: https://github.com/joeseesun/skill-publisher
- 自动完成：验证 SKILL.md 元数据 → 创建 GitHub 仓库 → 推送代码 → 验证可通过 `npx skills add` 安装
- **安装**: `npx skills add joeseesun/skill-publisher`
- 前置：GitHub CLI (`gh`) 已安装并认证

### 发现更多 Skill 的三个渠道

| 平台 | 链接 | 特点 |
|------|------|------|
| **Skills.sh** | https://skills.sh/ | Vercel 官方目录，86,000+ Skills，支持20+平台 |
| **Find Skills** | `npx skills add vercel-labs/skills/find-skills` | "元Skill"，在终端搜索安装其他Skill |
| **SkillsMP** | https://skillsmp.com/zh | 社区驱动，38万+ Skills，中文界面，自动从GitHub同步 |

---

## 微信多开 Skill（附赠）
- **安装**: `npx skills add joeseesun/wechat-multi`
- **使用**: 对 CC 说"微信双开"或"打开几个微信"，自动运行
