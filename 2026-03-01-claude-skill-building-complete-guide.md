# Claude Skills 完整构建指南

> 原文：The Complete Guide to Building Skills for Claude（Anthropic 官方）
> 整理日期：2026-03-01

---

## 核心概念

**Skill（技能）** 是一个文件夹，包含指令集，用于教会 Claude 处理特定任务或工作流。核心价值：**教一次，永久受益**，避免每次对话重复解释。

适合场景：
- 前端设计自动生成
- 有固定方法论的研究流程
- 团队风格一致的文档生成
- 多步骤流程编排

---

## 技能结构

### 文件夹结构

```
your-skill-name/
├── SKILL.md          # 必须（大小写敏感，必须是 SKILL.md）
├── scripts/          # 可选：Python、Bash 等可执行脚本
├── references/       # 可选：参考文档，按需加载
└── assets/           # 可选：模板、字体、图标等
```

### 三级渐进式加载（Progressive Disclosure）

1. **YAML frontmatter**：始终加载，决定 Claude 何时使用该技能
2. **SKILL.md 正文**：相关任务时加载，包含完整指令
3. **链接文件（references/）**：按需加载，避免不必要的 token 消耗

---

## YAML Frontmatter 规范

### 最简格式

```yaml
---
name: your-skill-name
description: What it does. Use when user asks to [specific phrases].
---
```

### 完整格式

```yaml
---
name: skill-name
description: [required description]
license: MIT
allowed-tools: "Bash(python:*) WebFetch"
metadata:
  author: Company Name
  version: 1.0.0
  mcp-server: server-name
  category: productivity
  tags: [project-management, automation]
---
```

### 命名规则

- `name`：纯 kebab-case，无空格、无大写、无下划线
- 禁止使用 `claude` 或 `anthropic` 作为前缀（系统保留）
- 禁止 XML 尖括号 `< >`

---

## description 字段写法

**结构**：`[做什么] + [何时使用] + [关键能力]`

**好的示例**：
```
Analyzes Figma design files and generates developer handoff documentation.
Use when user uploads .fig files, asks for "design specs", "component documentation".
```

**差的示例**：
```
Helps with projects.          # 太模糊
Creates documentation systems.  # 缺少触发词
```

**避免过度触发**：可加负向触发词
```
Advanced data analysis for CSV. Use for statistical modeling.
Do NOT use for simple data exploration (use data-viz skill instead).
```

---

## 三大技能类型

| 类型 | 用途 | 示例技能 |
|------|------|---------|
| **文档与资产创建** | 生成一致性高质量输出 | frontend-design, docx, pptx |
| **工作流自动化** | 多步流程 + 方法论固化 | skill-creator |
| **MCP 增强** | 为 MCP 工具访问提供工作流引导 | sentry-code-review |

### Skills + MCP 关系

| MCP（连接层） | Skills（知识层） |
|-------------|----------------|
| 连接外部服务 | 教 Claude 如何使用服务 |
| 提供实时数据 | 固化工作流最佳实践 |
| What Claude can do | How Claude should do it |

**类比**：MCP = 专业厨房设备，Skills = 食谱

---

## 五大设计模式

### Pattern 1：顺序工作流编排
适用：多步骤有序流程
要点：显式步骤顺序、步骤间依赖、每步验证、失败回滚指令

### Pattern 2：多 MCP 协调
适用：跨多个服务的工作流（如 Figma → Drive → Linear → Slack）
要点：清晰阶段划分、MCP 间数据传递、进入下一阶段前验证

### Pattern 3：迭代精炼
适用：输出质量需要多次迭代改进
要点：明确质量标准、验证脚本、知道何时停止迭代

### Pattern 4：上下文感知工具选择
适用：同一目标根据上下文选择不同工具
要点：清晰决策标准、备用选项、向用户解释选择原因

### Pattern 5：领域专业智能
适用：技能需嵌入超越工具访问的专业知识（如合规检查）
要点：领域专业知识嵌入逻辑、先合规再执行、完整审计追踪

---

## 测试方法

### 三类测试

1. **触发测试**：技能是否在正确时机加载
   - 应该触发的查询（显式 + 释义版本）
   - 不应触发的无关查询

2. **功能测试**：技能是否产生正确输出
   - 输出有效性、API 调用成功、错误处理、边界案例

3. **性能对比**：有 vs. 无技能的效果差异
   - 对比 token 消耗、API 调用次数、用户交互次数

### 成功指标参考

- 90% 相关查询自动触发技能
- 零失败 API 调用
- 用户无需手动纠正即可完成工作流

---

## 常见问题排查

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| 无法上传 | SKILL.md 命名不正确 | 确保大小写完全正确 |
| 不触发 | description 太模糊 | 加入用户实际会说的触发短语 |
| 过度触发 | description 太宽泛 | 添加负向触发词，明确使用范围 |
| 指令不被遵循 | 指令太冗长或位置靠后 | 关键指令前置，用 `## CRITICAL` 标题 |
| MCP 调用失败 | 连接/认证/工具名问题 | 先独立测试 MCP，验证工具名大小写 |
| 响应变慢 | SKILL.md 太大 | 详细文档移入 references/，保持 SKILL.md < 5000 字 |

**调试技巧**：直接问 Claude "When would you use the [skill name] skill?"，根据返回的 description 内容优化。

---

## 分发与发布

### 当前分发方式（2026年1月）

- 个人：上传 .zip 到 Claude.ai Settings > Capabilities > Skills
- 组织：管理员可工作区级统一部署（2025年12月18日上线）
- API：通过 `/v1/skills` 端点 + `container.skills` 参数（需 Code Execution Tool beta）

### 推荐发布流程

1. GitHub 公开仓库（含 README + 使用截图）
2. 在 MCP 文档中添加 Skills 链接和快速上手指南
3. 编写安装指南

### 技能定位原则

- 聚焦结果，而非功能描述
- 强调 MCP + Skills 组合价值
- 好："The ProjectHub skill enables teams to set up workspaces in seconds"
- 差："The skill is a folder containing YAML and Markdown"

---

## 发布前检查清单

- [ ] 明确 2-3 个具体用例
- [ ] 文件夹使用 kebab-case 命名
- [ ] SKILL.md 文件存在（大小写正确）
- [ ] YAML frontmatter 有 `---` 分隔符
- [ ] name 字段：kebab-case、无空格、无大写
- [ ] description 包含"做什么"和"何时用"
- [ ] 无 XML 标签
- [ ] 指令清晰可操作
- [ ] 包含错误处理
- [ ] 提供使用示例
- [ ] references 文件清晰链接
- [ ] 触发测试通过
- [ ] 功能测试通过
- [ ] 压缩为 .zip 文件

---

## 资源链接

- 官方文档：Best Practices Guide / Skills Documentation / API Reference
- 示例仓库：`anthropics/skills`（含 Document Skills、Example Skills、Partner Skills）
- 合作伙伴技能：Asana、Atlassian、Canva、Figma、Sentry、Zapier 等
- 社区：Claude Developers Discord
- Bug 报告：`anthropics/skills/issues`

---

## 关键原则总结

1. **渐进式披露**：减少不必要的 token 消耗
2. **可组合性**：与其他技能协同工作
3. **可移植性**：跨 Claude.ai / Claude Code / API 一致运行
4. **先迭代单一任务**：找到成功模式再扩展
5. **Skills 是活文档**：持续根据反馈迭代
