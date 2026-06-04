---
title: Taste Skill：反 AI Slop 的前端设计规则手册
date: 2026-02-23
source: x.com
url: https://x.com/vikingmute/status/2025842815721497009
type: tweet
tags: [工具, 技术, 前端设计]
---

# Taste Skill：反 AI Slop 的前端设计规则手册

**来源**: [@vikingmute](https://x.com/vikingmute/status/2025842815721497009)
**日期**: 2026-02-23
**GitHub**: https://github.com/Leonxlnx/taste-skill（2000+ Stars，作者 17 岁）
**用法**: 将 `SKILL.md` 复制到项目，在 Cursor 中用 `@SKILL.md` 引用

> 把审美知识显性化，让 AI 生成的内容从"能用"变成"好看"。

---

## 三个可调参数（1-10）

| 参数 | 含义 | 默认值 |
|------|------|--------|
| `DESIGN_VARIANCE` | 布局保守→艺术混乱 | 8 |
| `MOTION_INTENSITY` | 静止→电影级动效 | 6 |
| `VISUAL_DENSITY` | 美术馆留白→驾驶舱密集 | 4 |

---

## 核心设计规则

### Rule 1：字体（Typography）
- 标题默认：`text-4xl md:text-6xl tracking-tighter leading-none`
- **禁用 Inter**——改用 `Geist`、`Outfit`、`Cabinet Grotesk`、`Satoshi`
- Dashboard/软件 UI **严禁衬线字体**，只用高端无衬线组合（`Geist + Geist Mono`）
- 正文：`text-base text-gray-600 leading-relaxed max-w-[65ch]`

### Rule 2：配色（Color）
- 最多 1 个强调色，饱和度 < 80%
- **THE LILA BAN**：AI 紫/蓝渐变审美被严格禁止，无紫色按钮光晕、无霓虹渐变
- 基础色用绝对中性（Zinc/Slate），配高对比单一强调色（Emerald、Electric Blue、Deep Rose）
- 全项目统一色板，冷暖灰不得混用

### Rule 3：布局（Layout）
- **禁止居中 Hero**（当 `DESIGN_VARIANCE > 4`）
- 改用 Split Screen（50/50）、左对齐内容/右对齐视觉资产、不对称留白

### Rule 4：卡片（Cards）
- 高密度（`VISUAL_DENSITY > 7`）时**禁用泛型卡片容器**
- 改用 `border-t`、`divide-y` 或纯负空间分组数据
- 只在阴影传达层级时才用卡片；阴影颜色需染背景色调

### Rule 5：交互状态
必须实现完整交互循环（LLM 默认只生成"成功态"）：
- **Loading**：骨架屏（匹配布局尺寸，禁用圆形菊花）
- **Empty State**：精心排版的空状态，引导用户填充数据
- **Error State**：清晰的内联报错
- **触觉反馈**：`:active` 时用 `-translate-y-[1px]` 或 `scale-[0.98]` 模拟物理按压

---

## AI Tells：严禁的低级 AI 设计特征

### 视觉 & CSS
- ❌ 霓虹外发光（`box-shadow` glow）
- ❌ 纯黑 `#000000`（用 Zinc-950 或 Off-Black）
- ❌ 过饱和强调色
- ❌ 大标题渐变文字（Gradient Text）
- ❌ 自定义鼠标样式

### 字体
- ❌ Inter 字体
- ❌ 超大 H1（用字重和颜色控制层级，不靠巨大字号）
- ❌ Dashboard 上使用衬线字体

### 布局
- ❌ 三列等宽卡片横排（改用 Zig-Zag 或不对称网格）
- ❌ 复杂 Flexbox 百分比数学（改用 CSS Grid）
- ❌ `h-screen`（改用 `min-h-[100dvh]`）

### 内容（"Jane Doe 效应"）
- ❌ 通用姓名（John Doe、Jane Smith）
- ❌ 通用头像（SVG 蛋形图标）
- ❌ 假数据过于整齐（`99.99%`、`50%`）→ 用有机脏数据（`47.2%`）
- ❌ 创业 Slop 名称（Acme、Nexus、SmartFlow）
- ❌ AI 文案套话（Elevate、Seamless、Unleash、Next-Gen）→ 用具体动词
- ❌ Unsplash 链接（用 `https://picsum.photos/seed/{random}/800/600`）

### 表情符号
- ❌ **代码、标记、文本、alt 中严禁使用 Emoji**，改用高质量图标（Radix、Phosphor）

---

## 高级创意技术库

### 导航 & 菜单
- Mac OS Dock 磁力放大效果
- 磁力按钮（吸附鼠标光标）
- Gooey Menu（粘液状子菜单）
- Dynamic Island（变形胶囊状 UI）
- 右键径向菜单

### 布局 & 网格
- Bento Grid（不对称磁贴，如 Apple 控制中心）
- Masonry Layout（Pinterest 式无固定行高）
- Split Screen Scroll（两侧反向滚动）
- Curtain Reveal（Hero 幕布揭开）

### 卡片 & 容器
- 3D 视差倾斜卡片（跟踪鼠标坐标）
- Spotlight Border Card（光标下边框发光）
- 真实 Glassmorphism（内折射边框 `border-white/10` + 内阴影）
- 全息箔片卡片（鼠标悬停彩虹光晕）

### 滚动动效
- Sticky Scroll Stack（卡片叠加固定）
- Horizontal Scroll Hijack（竖向转横向画廊）
- Zoom Parallax（背景图随滚动缩放）
- SVG 路径自动绘制

### 文字动效
- 动态跑马灯（Kinetic Marquee）
- 文字蒙版视频窗口（Text Mask Reveal）
- Matrix 字符解码（Text Scramble）
- 渐变描边动画

### 微交互
- 点击粒子爆炸按钮
- 方向感知悬停填充（从鼠标进入方向填充）
- 涟漪点击效果
- Mesh 渐变背景（岩浆灯式色块）

---

## 性能红线

- **DOM 消耗**：噪点/颗粒效果只加在 `fixed inset-0 pointer-events-none` 的伪元素上，绝不加在滚动容器
- **硬件加速**：只动画 `transform` 和 `opacity`，禁止动画 `top`/`left`/`width`/`height`
- **Framer Motion**：磁力悬停/持续动画用 `useMotionValue` + `useTransform`，禁用 `useState`，防止移动端性能崩溃
- **无限循环**：必须隔离在独立 Client Component + `React.memo`，禁止在父布局触发重渲染
- **Z-index**：只用于系统级层（Sticky Navbar、Modal、Overlay），禁止随意堆 `z-50`

---

## 三仓库工具集

| 仓库 | 用途 |
|------|------|
| `taste-skill/SKILL.md` | 主设计风格约束 |
| `redesign-skill/SKILL.md` | 审计并优化现有设计 |
| `output-skill/SKILL.md` | 防止输出不完整，消除占位注释 |

---

**标签**: `工具` `技术` `前端设计` `AI设计` `Claude` `Cursor` `Skill`
