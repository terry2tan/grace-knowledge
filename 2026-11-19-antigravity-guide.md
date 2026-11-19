---
title: Claude 被封后我切到了谷歌 Antigravity：安装、上手与 6 大坑
date: 2026-11-19
source: 微信公众号「ferlich」
url: https://mp.weixin.qq.com/s/xT6Fj9pxCMRommMazJvwAg
type: article
tags: [AI, 工具]
---

## 摘要

作者 Claude 账号被封后高强度试用 Google Antigravity 2.0 三个月的完整实战复盘 + 避坑指南。背景：Antigravity 2.0 迭代凶猛（独立桌面端、Go 重写的 `agy` CLI、云端远程 Agent、Gemini Live 全双工语音、定时任务），Gemini 4 Carbon 在 Artificial Analysis 综合榜压过 Claude Opus 5.5 和 GPT-6 Astra 登顶。核心判断：agy CLI 对 Claude Code「像素级复刻」（命令、扩展目录、快捷键、连 `--dangerously-skip-permissions` 参数名都一致）——谷歌的算盘是用户习惯已被 CC/Codex 养刁，不做兼容没人愿意换。最有参考价值的增量：①登录三坑的本质是 Google 账号 Country Association 地区绑定而非网络出口；②双额度池机制（自研池 vs 友商池各自「5 小时限额 + 单周总封顶」同步扣减——「5 小时额度等于一周额度」的真相）；③子代理默认继承主对话昂贵模型的暗坑及规则修法；④Skills 与 CC 完全兼容的三种迁移方式（含 skills.json 指路文件实现多工具共享一套 Skill）。

## 全文要点

### 背景

- 三大家对标：Antigravity 以前垫底（掉线、慢），2.0 补齐短板且几个交互细节超过友商。
- 三个入口：**Antigravity App**（桌面客户端，工作区+多会话，推荐首选）、**Antigravity CLI（`agy`，Go 重写，接替旧 Gemini CLI）**、**IDE 及编辑器扩展**。CLI 安装：`curl -fsSL https://antigravity.google/cli/install.sh | bash`。

### 登录三坑（90% 卡死在这里）

1. **报 not eligible / 卡 Setting Up**：根因是 Google 账号底层 Country Association 挂在未开放区，与当前网络出口无关。修法：TUN 模式接管桌面软件流量 + 「环境三要素」对齐（连接位置/系统时区/系统区域设置统一为目标区）后递交 https://policies.google.com/country-association-form 变更表，半小时~一天过审。
2. **Account restricted 核验**：二维码是 Google 自家 App 内联唤醒机制——必须用 Google App 搜索框的 Google Lens 扫（联动唤起 YouTube App 确认），用自带相机/微信扫会掉进国际短信死胡同（发短信也过不了）。备用：手机 Chrome 开 https://g.co/verifyaccount。一机可扫多号，但过多触发设备上限。
3. **验证死循环**：十有八九是本地旧凭证坏了。`Ctrl+Shift+P` → `Antigravity: Reset Onboarding` + 浏览器撤回 Antigravity/Code Assist 授权再重登。其次查公共线路风控、2FA、账号年龄、Workspace 管理员开关；`Ctrl+Shift+U` 看底层日志（弹窗敷衍，日志里写着 401 或支付异常）。

### 桌面版核心用法

- 主界面：New Conversation / **Automations（定时任务）** / Customizations（Rules+Skills+Marketplace）/ Projects/Settings；输入框 `@` 引文件、`/` 命令；左下模型、右下权限。
- 项目三模式：No Project（纯对话）/ **Local**（直接读写目录，新手选空目录）/ **New worktree**（Git 分支目录，多窗口并行互不干扰）/ New Remote Project（谷歌云端跑）。
- Settings 值得开的：**Prevent Sleep**（防休眠掐断后台长任务）、Keep In Menu Bar（后台常驻）、**Enable Remote Control**（生成链接/二维码，手机网页遥控家里电脑）；AI Credit Overages（超额自动扣积分，怕烧备用积分就关）。
- 权限四档：Request Review（最谨慎）/ Default / Auto / **Turbo**（全速不请示，重要目录别开）。Advanced 里 Non-Workspace File Access 建议 Ask。
- Review ≠ Commit：Review 面板像 Git diff 摊开未提交改动，行号旁 `+` 写行内批注让它解释/返工。
- 右侧面板可对照 PDF 聊天、`/browser` 让 Agent 自己开网页点按钮截屏验收。

### 配置与 Skills 迁移（对 CC 用户最有价值）

- **直接兼容 AGENTS.md / GEMINI.md**（统称 Rules）：项目里现成的 Codex AGENTS.md 一行不用改，自动向上查找（单文件上限 24KB）。Workspace 规则存 `.agents/rules/`，全局存 `~/.gemini/config/`。
- **Skills 三种迁移法**：
  1. 复制 `<skill>/` 到项目 `.agents/skills/` 或全局 `~/.gemini/config/skills/`。⚠️ CC 允许 SKILL.md 不写头，**Antigravity 要求极严格：开头必须有 name+description frontmatter（name 与文件夹同名），否则整个被当无效文件扔掉**。放好后 `/skills reload`。
  2. **skills.json 指路文件**：`{ "entries": [ { "path": "~/.agents/skills" } ] }`——CC、Codex、Antigravity 共用一套 Skill，改一处全生效。
  3. 终极偷懒：直接说「帮我把本机 Claude Code 和 Codex 的配置、Skills 和 MCP 迁移过来」，内置迁移技能打包成独立插件，可一键关。
- **子代理省额度**：Antigravity 派子代理默认继承主对话昂贵模型。修法是写进 AGENTS.md：跨目录检索/读长文档派子代理、`invoke_subagent` 必须显式 `Model="flash"`（免费 Gemini 3.8 Flash）、纯查资料用只读子代理 `TypeName="research"`；主对话只收结论+文件名行号，不塞原始长日志。
- Marketplace：Notion/Google Docs/Sheets/Drive/GitHub/Figma 官方插件即装即用。

### Remote Control vs Remote Agents（名字像，两码事）

- Remote Control：任务跑在**自己电脑**（不能关机），对标 CC 的 /remote-control；槽点：只有手机网页版，没接进 Gemini 手机 App。
- Remote Agents：跑在**谷歌云端容器**，本地合盖关机照跑；绑定 GitHub/云盘/传文件；本质是 Personal Agent（对标 OpenAI Dots、Claude Duet），谷歌直接整合进 Antigravity 没单独发新软件。分批向付费 AI Pro/Ultra 推送。

### 语音与定时任务

- Voice Mode（声波图标，基于 Gemini Live）全双工：可随时打断、字幕同步、读写审批动嘴放行；**高风险动作（删文件、sudo、force push）仍停下来等屏幕确认**——分寸感稳。比 Codex 语音顺畅得多。
- Automations：填 Prompt+Project+Schedule+模型档位，建议先手动跑通再定时化。

### agy CLI：照抄 Claude Code + 3 个绝活

- 命令对照：`/model` `/usage`（多模型池额度面板）/ `/config` `/plan` `/goal`（持续推进到验收条件）/ `/compact` `/rewind` `/resume` `/skills reload` `/browser` `/boost`（多子 Agent 攻坚，付费）/ `/btw`（不打断主线提问）/ `/learn`（沉淀规则或 Skill）/ `/effort`（思考深度）；`@` 引文件、`!` 跑 shell、`-p` 非交互；连 `--dangerously-skip-permissions` 参数名都分毫不差。配置存 `~/.gemini/antigravity-cli/settings.json`。
- **3 个差异化**：①后台并发子代理看板 `/agents` + **Fast Path Alert**（输入框上方弹审批，`Ctrl+K` 秒批、`Ctrl+J` 切排队详情）——比 CC 痛快；②`/artifacts` 终端里汇总本轮所有交付物，review/approve/reject；③**自带 Nano Banana Pro 二代**，先读仓库代码文档摸清逻辑再画架构图/草图，终端桌面互通。

### 额度三坑（花钱前必看）

4. **付费 Pro 才有 Claude 5.5**：真金白银的付费 Pro（$19.99）和 Ultra 能看到 Claude Opus 5.5（1M 上下文默认思考）/Sonnet 5.5；Jio/Pixel/学生等**赠送版 Pro 全部被屏蔽**（同 GitHub Copilot 学生版 3 月下架 Claude 自选）。Sonnet 5.5 在 Terminal-Bench 4.0 拿 70.6%，高于 Opus 5.5 的 66.4%。
5. **双额度池**：谷歌自研池（Gemini/Argon）与友商池（Claude+GPT 全系混用）分开统计，各自「5 小时周期限额 + 单周总封顶」，**且每消耗一分 5 小时限额、周封顶同步扣**——Pro 档给友商池和 Argon 的周盘子很薄，连轴两三小时就把整周大水缸抽干。省法：关 AI Credit Overages；日常用 Gemini 3.8 Flash Medium 或 Sonnet 5.5（价格 Opus 一半、终端跑分更高），攻坚再切 Argon/Opus。Ultra 的 Opus 5.5 额度很厚（体感接近 $200 官方订阅）。
6. 套餐：免费版可跑通桌面+CLI 全流程；Pro $19.99；Ultra $99.99/$199.99（额度 5x/20x，白送 1000/2000 Colab 算力单元）。

### 结论

- 只奔着 Claude 模型去的别开 Google One Pro（池子浅且非原生顺滑度不如 Claude Code）。
- 最适合：①被封号/怕断粮的人当**主力备胎**（免费版+Skills 直接迁移）；②主力 Gemini 4 Argon 用户；③用 Colab 的科研党（Ultra 附赠算力单元）。
