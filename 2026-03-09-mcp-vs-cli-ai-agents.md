---
title: "MCP vs. CLI for AI Agents: How to Choose the Right Tool Transport"
date: 2026-03-09
source: Substack (manveerc)
url: https://manveerc.substack.com/p/mcp-vs-cli-ai-agents
type: article
tags: [AI产品, 技术, 工具]
---

## 摘要

本文驳斥了"MCP vs CLI"是非此即彼的伪命题，提出应该**按每个工具集成单独决策**，而非全局选一个。核心框架：本地工具/成熟云 CLI（AWS、GitHub）选 CLI，无 CLI 的 SaaS 服务/多用户 OAuth/有状态工作流选 MCP。关键数字：GitHub MCP server 初始化耗费约 55,000 tokens，而 `gh` CLI 完成同等任务仅需约 500 tokens。真正决定 agent 效果的不是协议，而是**接口设计质量**——通过 Skills 抽象层统一两种传输方式，使 agent 无需感知底层协议。

## 全文

CLI purists call [MCP](http://modelcontextprotocol.io/) bloated middleware that burns tokens and kills composability. MCP advocates call CLI a developer-centric relic that ignores how 99% of users actually interact with AI agents.

Both sides correctly diagnose the other's weaknesses and miss their own.

The CLI crowd correctly identifies that connecting a standard GitHub MCP server dumps ~55,000 tokens into context before the agent does anything useful. They correctly note that MCP tools don't chain. You can't pipe one into another. They correctly observe that even small models are already RL-trained on shell commands, while MCP schemas carry zero training data advantage. But they wrongly claim that the security model working for a single developer on their own machine scales to multi-tenant, compliance-heavy deployments without additional infrastructure. And they wrongly ignore that the services most business users need don't have CLIs.

The MCP crowd correctly identifies that OAuth discovery, structured schemas, and granular permissions are required for enterprise SaaS integration. They correctly note that a Sales Director can't and shouldn't need to interpret `stderr` tracebacks. But they wrongly dismiss the token economics as a non-issue, and they wrongly ignore that a developer tracing ML predictions through a local DuckDB instance has no use for JSON-RPC serialization overhead.

Practitioners are quietly converging on a different answer: make the transport decision _per tool integration_, not per system, based on where the tool runs, how it authenticates, and what the workflow looks like. Your agent will use both. And regardless of which transport you chose for each tool, the _design quality of the tool interface_ determines whether your agent works well, not the protocol.

Most teams skip that second point. They pick a transport and stop there.

You can see this architecture in production today. Claude Code (for developers) and Cowork (for non-technical users), use _both_ CLI and MCP as transport layers, unified behind a higher-level abstraction called Skills. Claude Code runs shell commands, pipes data through `grep` and `jq`, and chains Unix tools for local work. It also connects to MCP servers for SaaS integrations. Cowork does the same for business users who never see a terminal. In both cases, the agent calls a Skill, and the Skill routes to the appropriate transport.

> These products resolved the debate internally that the community is still having publicly.

---

## Layer 1：按工具逐一选传输协议

**选 CLI 的场景：**
- 工具在本地运行，或有成熟的云厂商 CLI（AWS、GitHub、GCP）
- 认证可预配置（`~/.aws/credentials` 等）
- 工作流可组合、管道式（`grep | awk | sort | uniq`）

**选 MCP 的场景：**
- 服务没有 CLI（Salesforce、HubSpot、Notion、Asana）
- 需要多用户 OAuth / 动态认证
- 有状态、多步骤事务（创建 Jira ticket → 验证 → 发 Slack → 更新看板）

### Token 经济账

| 方式 | 初始化成本 | 规模成本（1万次/天） |
|------|-----------|-------------------|
| GitHub MCP server | ~55,000 tokens | ~$1,600/天（仅工具定义） |
| `gh` CLI | ~500 tokens | 可忽略不计 |

**重要澄清**：55,000 token 是**设计糟糕的** MCP server，而非协议本身的限制。设计良好的分层 MCP server 可以按需加载 schema，接近 CLI 的效率。但大多数 MCP server 实现懒得做这个——这就是为什么需要 Skills 抽象层。

### 决策矩阵（3个因素）

**Factor 1：执行环境**
- 本地文件/数据库 → CLI
- 有成熟 CLI 的云服务（AWS、GitHub、Vercel）→ CLI（开发者用户 + 预配置认证）
- 没有 CLI 的 SaaS / 多用户场景 → MCP

**Factor 2：工作流特征**
- 可组合管道（`find | grep | jq`）→ CLI（Unix 工具经过 50 年打磨，LLM 训练数据中有海量示例）
- 有状态多步骤（需要确认、跨服务传递结构化数据）→ MCP

**Factor 3：用户类型**（注意：这决定产品界面，不决定传输协议）
- 开发者看终端 → 但底层仍然按前两个因素决定
- 业务用户看聊天界面 → Skill 隐藏传输细节，用户不需要知道

---

## Layer 2：为 LLM 设计工具接口（Skills）

协议选好之后，**接口设计质量**才是真正决定 agent 效果的因素。

**Skills 的作用**：
1. 只暴露 agent 真正需要的参数（不是整个 API）
2. 注入业务上下文（团队默认值、项目范围）
3. 输出 token 高效（markdown 比 JSON 节省 40% tokens）
4. 传输协议对 agent 透明——底层换 CLI 还是 MCP，Skill 接口不变

**Jira 示例对比：**

| 方式 | token 成本 | 体验 |
|------|-----------|------|
| 原始 MCP | ~55,000 tokens（400+ endpoints） | agent 迷失在选项中 |
| 原始 CLI | ~最小 | agent 不知道团队约定，容易幻觉 |
| Skill（"创建财务工单"） | ~300 tokens | 只暴露 summary + description，其余自动填充 |

```yaml
skill:
  name: create_finance_ticket
  description: "Creates a ticket in the Finance board."
  context:
    project_key: "FIN"
    priority: "High"
    reporter: "{{user.email}}"
  implementation:
    type: mcp    # agent 不知道也不需要知道
    endpoint: jira-mcp-server
    tool_name: create_issue
  exposed_parameters:
    - summary
    - description
```

**5 个接口设计原则：**
1. 最小化初始上下文（短描述，按需加载详细 schema）
2. 按需发现（agent 需要时才加载，不在 session 开始就全部注入）
3. 结构化但 token 高效（markdown > JSON，一个实践者切换格式后节省 40% tokens）
4. 内置业务上下文（团队默认值、项目范围、约束）
5. 传输层可替换（换底层协议不改 Skill 接口）

---

## 安全模型

"CLI 不安全、MCP 安全"这个论断站不住脚：

- **单开发者、自己机器**：OS 权限 + CLI 凭证管理完全够用，MCP 没有额外安全价值
- **多用户、跨组织**：MCP 的 OAuth 发现和动态客户端注册解决了 CLI 难以处理的问题
- **合规环境（SOC2 等）**：MCP 的 JSON-RPC 格式天然生成结构化审计日志；CLI 需要额外封装

真正的风险是"致命三角"（Simon Willison 提出）：agent 能访问密钥 + 能执行代码 + 能发网络请求——这与传输协议无关，需要沙箱隔离（Firecracker、gVisor、容器）。

---

## 行动建议

1. **列出所有工具，按矩阵分类**（本地 vs SaaS，单用户 vs 多用户，管道 vs 有状态）
2. **每个工具都包一个 Skill**（精简参数、注入业务上下文、token 高效输出）
3. **不要让 agent 看到明文凭证**（CLI：挂载预认证配置；MCP：集中 auth handler）
4. **现在就做审计日志**（MCP 几乎免费；CLI 需要封装 subprocess 调用）

> The protocol is plumbing. The interface design is architecture.
>
> Build for the workflow.
