---
title: "Claude Code 的六层记忆架构"
date: 2026-02-28
source: x.com
url: https://x.com/yibie/status/2027507727942250793
type: tweet
tags: [AI, 工具]
---

## 摘要

@yibie 总结了 Claude Code 的六层记忆架构，从组织级到自动记忆分层管理上下文。最有趣的设计是 Auto memory（Claude 自己写笔记）、路径特定规则、MEMORY.md 200 行限制强制简洁，以及 CLAUDE.local.md 自动加入 .gitignore 保护敏感信息。

## 全文

**@yibie** · 2026-02-28

Claude Code 的六层记忆架构

**1. Managed policy（组织级）**
- 位置: `/etc/claude-code/CLAUDE.md`
- 用途: 组织编码规范、安全策略
- 共享范围: 全组织

**2. Project memory（项目级）**
- 位置: `./CLAUDE.md`
- 用途: 项目架构、团队约定
- 共享范围: 团队成员

**3. Project rules（模块化规则）**
- 位置: `.claude/rules/*.md`
- 用途: 模块化规则，支持路径匹配
- 共享范围: 团队成员

**4. User memory（用户级）**
- 位置: `~/.claude/CLAUDE.md`
- 用途: 个人跨项目偏好
- 共享范围: 仅自己

**5. Local memory（本地私有）**
- 位置: `./CLAUDE.local.md`
- 用途: 项目特定私有配置
- 共享范围: 仅自己

**6. Auto memory（自动记忆）**
- 位置: `~/.claude/projects/*/memory/`
- 用途: Claude 自动记录的模式
- 共享范围: 仅自己

---

**最有意思的设计：**

1. **Auto memory** - Claude 自己写笔记（"我们用 pnpm 不是 npm"）
2. **路径特定规则** - YAML frontmatter + glob 模式限定适用范围
3. **200 行限制** - 强制 MEMORY.md 简洁，超出的按需读取
4. **CLAUDE.local.md 自动 .gitignore** - 敏感信息不进入版本控制
