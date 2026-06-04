---
title: 论文精读：Everything is Context——用文件系统抽象统一 Agent 上下文工程
date: 2026-03-04
source: arxiv.org
url: https://arxiv.org/abs/2512.05470
type: paper
tags: [AI, 技术, Agent, 上下文工程]
---

# 论文精读：Everything is Context

**论文**: [Everything is Context: Agentic File System Abstraction for Context Engineering](https://arxiv.org/abs/2512.05470)
**作者**: Xiwei Xu, Robert Mao, Quan Bai, Xuewu Gu, Yechao Li, Liming Zhu
**日期**: 2026-03-04（收录）/ 2024-12（arXiv 发布）
**实现框架**: [AIGNE](https://github.com/aigneer)（开源）

---

## 核心命题

> 类比 Unix "一切皆文件"，提出 **"一切皆上下文"**——将 Agent 的所有输入（知识、记忆、工具、人类输入）统一抽象为文件系统接口，从而把上下文工程从"临时拼凑"变成"可验证的系统工程学科"。

---

## 一、为什么需要"上下文工程"

**问题**：GenAI 系统设计的关键挑战已从模型能力转向**上下文工程**——如何捕获、结构化、治理 LLM 推理所需的外部知识、记忆、工具和人类输入。

**现有方法的缺陷**：
- 提示工程：只处理单次文本块，无状态、无追踪
- RAG：临时检索注入，无持久化治理
- 工具集成：各自为政，产生"context rot"（上下文腐烂——不可验证的临时工件）

**上下文工程的定义**：管理信息的完整生命周期——选择 → 检索 → 过滤 → 构建 → 压缩 → 评估 → 刷新。

---

## 二、文件系统抽象：类比 Unix

| Unix "一切皆文件" | 本论文 "一切皆上下文" |
|---|---|
| 设备、进程、Socket 统一为文件接口 | 知识图谱、记忆库、API、人类笔记统一为文件接口 |
| 进程通过 read/write/open 操作资源 | Agent/人类通过 read/write/search/list 操作上下文 |
| 挂载点（mount）统一命名空间 | 上下文资源"挂载"进层级命名空间 |
| 文件权限与访问控制 | 元数据、访问控制、事务日志 |

**实际操作**：所有上下文资源都通过统一的 AFS（Agentic File System）接口访问，路径如：
- `/context/memory/fact/` — 事实记忆
- `/context/memory/episodic/` — 情节记忆
- `/modules/github-mcp/` — GitHub MCP 工具

---

## 三、上下文的三层生命周期

```
原始交互 ──→ History（不可变，全量日志，带时间戳/来源/模型版本）
                 ↓ 摘要/向量化/索引
             Memory（可变，Agent 专属，可检索）
                 ↑ 验证后晋升
           Scratchpad（临时推理工作区，任务完成后清除）
```

---

## 四、七种上下文类型分类

| 类型 | 时间范围 | 结构单元 | 表示形式 |
|------|----------|----------|----------|
| Scratchpad（暂存） | 临时/任务内 | 对话轮次、推理状态 | 纯文本/向量 |
| Episodic Memory（情节记忆） | 中期/会话内 | 会话摘要、案例历史 | 文本摘要 |
| Fact Memory（事实记忆） | 长期/细粒度 | 原子事实陈述 | Key-Value/三元组 |
| Experiential Memory（经验记忆） | 长期/跨任务 | 观察-行动轨迹 | 结构化日志 |
| Procedural Memory（程序记忆） | 长期/系统级 | 函数、工具定义 | API/代码引用 |
| User Memory（用户记忆） | 长期/个性化 | 用户属性、偏好 | Profile/向量 |
| Historical Record（历史记录） | 不可变/全量 | 所有交互原始日志 | 纯文本+元数据 |

---

## 五、三组件流水线

### 5.1 Context Constructor（上下文构造器）

将无界知识库转化为任务专属输入：
- **选择**：从持久化仓库中按元数据（时效性、来源）挑选相关工件
- **优先级排序**：按相关性加权
- **压缩**：摘要/向量化/聚类以适配 token 预算
- **治理执行**：隐私保护、访问控制、会话隔离
- **Manifest 生成**：记录哪些元素被选中/排除及原因（可追踪、可复现、可验证）

### 5.2 Context Updater（上下文更新器）

管理持久化存储与 token 窗口之间的同步：
- **静态注入**：推理开始前注入上下文快照
- **增量流式**：推理过程中渐进加载片段
- **自适应刷新**：根据模型反馈或人类干预替换过时元素
- **多 Agent 隔离**：确保不同 Agent 的上下文不干扰/不泄漏
- **全追踪**：所有加载/替换操作记录为带时间戳的元数据事件

### 5.3 Context Evaluator（上下文评估器）

形成闭环反馈，维护治理：
- **幻觉检测**：通过语义对比和事实一致性检查验证输出
- **元数据记录**：置信度分数、对齐指标、人工干预率
- **记忆整合**：将验证后的输出转化为结构化记忆元素
- **Human-in-the-loop**：低置信度时触发人工审核，注释作为显式上下文元素存储
- **可逆性**：所有更新带时间戳和溯源元数据版本化

```
持久化上下文仓库（历史/记忆/工具/人类输入）
        ↓
  Context Constructor（选择→优先级→压缩）
        ↓
  Context Updater（静态/增量/自适应注入）
        ↓
  [LLM Token 窗口]
        ↓
  Context Evaluator（验证→更新仓库→人工审核）
        ↓
  [闭环治理]
```

---

## 六、三大架构约束

1. **Token 窗口上限**：模型注意力有界（128K-200K tokens），自注意力计算为二次方复杂度，必须精选压缩
2. **无状态性**：LLM 跨会话不保留状态，需外部持久化仓库重建上下文，并去重防止记忆膨胀
3. **非确定性输出**：概率采样导致同一输入产生不同输出，架构必须保存输入-输出对、元数据和溯源用于审计和回放

---

## 七、与 RAG / 提示工程的关系

| 维度 | 提示工程 | RAG | 上下文工程（本文）|
|------|----------|-----|------------------|
| 范围 | 单次指令构建 | 检索+注入外部文档 | 管理信息全生命周期+治理 |
| 持久化 | 无，会话内 | 临时检索 | 持久化、版本化、可追踪 |
| 可追踪性 | 极少 | 仅检索日志 | 全溯源（事务日志）|
| 治理 | 无 | 隐式 | 显式访问控制、版本、人工监督 |

**RAG 的定位**：成为 Constructor 检索阶段的**一个子组件**，而非独立方案。

---

## 八、AIGNE 框架实现

**核心模块**：
- **AFS（Agentic File System）**：主接口，支持 list/read/write/search
- **SystemFS**：沙箱虚拟文件系统，支持深度限制导航和 ripgrep 集成
- **Programmable Resolvers**：声明式映射（类 GraphQL/OpenAPI schema），将异构后端转换为 AFS 节点，无需格式转换

---

## 九、两个案例

### 案例 1：Memory-Enabled Agent（记忆代理）
```
DefaultMemory → SQLite (file:./memory.sqlite3)
     ↓
AFSHistory（对话历史）+ UserProfileMemory（用户档案）
     ↓
Agent 通过统一 AFS 接口访问
```
每轮对话自动追加记忆，跨会话保持上下文连贯，无需显式状态管理。

### 案例 2：GitHub Assistant（基于 MCP）
```
GitHub 官方 MCP Server（Docker 容器化）
     ↓
MCPAgent 封装器
     ↓
挂载至 AFS 命名空间：/modules/github-mcp/
     ↓
Agent 调用：afs_exec(/modules/github-mcp/search_repositories)
```
Agent 将 GitHub API 操作视为文件操作，无需专用 GitHub 客户端逻辑。任意 MCP Server 都可作为一等 AFS 模块集成。

---

## 十、人类在架构中的角色

论文强调人类不是旁观者，而是主动参与者：
- **策展者（Curators）**：选择和组织上下文资源
- **验证者（Verifiers）**：审核低置信度输出，修正幻觉
- **共同推理者（Co-reasoners）**：将隐性知识和伦理判断作为显式上下文元素贡献
- **监督者**：人工注释作为一等工件存储，将"隐性知识"纳入可验证知识库

---

## 核心结论

将上下文工程从**碎片化的工业实践**转变为**有原则、可验证的架构**，基于 Unix 风格的统一抽象，使 GenAI 系统具备：可追踪性、可审计性、人类对齐性，为工业级可维护 AI 系统奠定基础。

---

**标签**: `AI` `技术` `Agent` `上下文工程` `论文` `LLM架构` `记忆管理`
