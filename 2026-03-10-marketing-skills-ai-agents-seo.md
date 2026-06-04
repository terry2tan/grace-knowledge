---
title: 144个开源 Marketing Skills for AI Agents（SEO/CRO/增长）
date: 2026-03-10
source: x.com + github.com
url: https://x.com/WaytoAGI/status/2031018664670134641
type: repo
tags: [出海, AI产品, 工具]
---

## 摘要

WaytoAGI 整理了 AI 出海增长专家 Kostja 的分享：把服务 100+ AI 产品的 SEO 实战经验打包成 144 个开源 Marketing Skills，覆盖 SEO 技术层、页面模板、CRO、增长运营等全链路。Skills 不只是文档，有触发逻辑和模块互引，Agent 自动调用；核心用法是先生成"产品上下文文档"再叠加 Skills，效果才可用。GitHub 仓库 ⭐12301，作者 Corey Haines，可一键安装到 Claude Code / Cursor 等任意 Agent。

## 推文原文（@WaytoAGI）

服务100+AI产品后，他把SEO营销经验做成了144个AI技能包

3月7日邀请了AI出海增长专家Kostja（k神），85分钟把三年、100+产品的SEO实战经验讲了个透。

他做了一件很值得关注的事：把这些经验打包成144个开源Marketing Skills，放在GitHub上免费用。

### 1. Skills 是什么

人读文章，普通AI读Markdown，Agent读Skills。

Skills不只是文档，它有触发逻辑、模块间互相引用，提示词里出现对应关键词就会自动调用，不需要手动指定。装在Cursor里能用，换到Replit里照样能用，一个字不用改。

### 2. 144个Skills覆盖了什么

核心三块：
- **SEO技术层**：robots.txt、sitemap、IndexNow、可爬取性
- **页面模板**：首页、功能页、定价页、FAQ、API介绍页、客户案例页（ToB ToC都有）
- **可复用组件**

跨渠道通用：关键词调研、竞品调研。程序化SEO和寄生SEO也有专门的Skills。

### 3. 核心用法：上下文 + Skills

装了Skills还不够。要先让AI生成一份**产品上下文文档**，产品定位、目标用户、已有页面关键词、竞品信息、品牌调性都放进去。文档让AI写，不要人写，AI比人全面。

有了上下文再叠加Skills，生成出来才是真正可用的内容。现场演示生成了一个use case页面，面包屑、H1、内链、schema代码都有，从SEO角度直接能用。

### 4. 迭代方法

生成结果不满意，不是去改提示词，而是**把结果丢给AI让它改Skills本身**，再用新Skills重新生成。每一次不满意都变成下一次更准的输出。

用飞书妙记把每周和客户的会议记录转录出来，让AI分析哪些内容需要更新进Skills，几轮下来那份上下文文档会越来越贴合实际项目。

### 5. 工具选型

- **Lovable**：适合前期可视化搭建
- 给客户交付：用Lovable搭好，让客户一比一复刻到自己网站，用他们自己的技术栈发布

> 9.9分的模型和9.8分的模型对大多数人来说没什么区别，更值得提升的是自己调用AI的能力。

### 6. 安全风险

有安全研究表明部分Skills存在投毒情况，agent权限很大，被恶意利用风险不低。建议优先装官方发布的Skills，非官方的先审查内容再装，或者把agent权限调低。

### 7. 安装方式

把GitHub链接直接丢给AI让它自己安装，README是给AI看的，它能搞定。

---

## GitHub 仓库：coreyhaines31/marketingskills

- **地址**：https://github.com/coreyhaines31/marketingskills
- **描述**：Marketing skills for Claude Code and AI agents. CRO, copywriting, SEO, analytics, and growth engineering.
- **⭐ Stars**：12,301
- **官网**：https://marketing-skills.com
- **作者**：Corey Haines（https://corey.co）
- **最后更新**：2026-03-05

### 架构设计

所有 Skill 都以 `product-marketing-context` 为基础，每个 Skill 执行前先读取产品上下文：

```
                    ┌──────────────────────────┐
                    │   product-marketing-context  │
                    │  (所有 Skill 都先读这个)    │
                    └──────────────┬───────────────┘
                                   │
    ┌──────────┬────────────┬───────┼───────┬──────────┬─────────────┐
    ▼          ▼            ▼       ▼       ▼          ▼             ▼
  SEO &      CRO        内容&    付费&    增长&     销售&          策略
  内容                   文案    数据     留存      GTM
```

### 完整 Skill 列表（32个核心 Skills）

| Skill | 触发场景 |
|-------|---------|
| `ab-test-setup` | A/B 测试设计与实施 |
| `ad-creative` | 广告素材生成与迭代 |
| `ai-seo` | AI 搜索引擎优化（被 LLM 引用） |
| `analytics-tracking` | 埋点与数据追踪 |
| `churn-prevention` | 防流失、挽回付费 |
| `cold-email` | B2B 冷邮件序列 |
| `competitor-alternatives` | 竞品对比页 / SEO |
| `content-strategy` | 内容规划 |
| `copy-editing` | 文案编辑与优化 |
| `copywriting` | 落地页/首页文案写作 |
| `email-sequence` | 邮件自动化序列 |
| `form-cro` | 表单转化优化 |
| `free-tool-strategy` | 免费工具营销策略 |
| `launch-strategy` | 产品发布策略 |
| `marketing-ideas` | 营销创意生成 |
| `marketing-psychology` | 行为心理学应用 |
| `onboarding-cro` | 注册后激活优化 |
| `page-cro` | 落地页转化优化 |
| `paid-ads` | Google/Meta/LinkedIn 广告 |
| `paywall-upgrade-cro` | 付费墙 / Upgrade 弹窗优化 |
| `popup-cro` | 弹窗优化 |
| `pricing-strategy` | 定价与套餐设计 |
| `product-marketing-context` | 产品上下文文档（基础） |
| `programmatic-seo` | 程序化 SEO 批量页面 |
| `referral-program` | 推荐裂变计划 |
| `revops` | 销售运营 / 线索生命周期 |
| `sales-enablement` | 销售材料、pitch deck |
| `schema-markup` | 结构化数据标注 |
| `seo-audit` | SEO 审计 |
| `signup-flow-cro` | 注册流程优化 |
| `site-architecture` | 网站架构与 URL 规划 |
| `social-content` | 社媒内容创作 |

### 安装方式

```bash
# 推荐：CLI 一键安装
npx skills add coreyhaines31/marketingskills

# 安装特定 Skill
npx skills add coreyhaines31/marketingskills --skill page-cro copywriting

# Claude Code 插件方式
/plugin marketplace add coreyhaines31/marketingskills
/plugin install marketing-skills
```
