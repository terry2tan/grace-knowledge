---
title: 拆解一下 opencode context 做了哪些优化
date: 2026-06-08
source: luozhiyun.com
url: https://www.luozhiyun.com/archives/918
type: article
tags: [AI, 技术, AI产品]
---

## 摘要

本文深度拆解了 opencode（开源终端 AI 编码助手）的上下文工程实现。核心包括：context 构建流程（system prompt + messages）、Prompt Caching 策略（标记 system 和前两轮对话降低延迟/成本）、三层体积控制机制（Compact 压缩旧历史为摘要、Prune 清理旧 tool output、单次 tool result 截断 2000 行/50KB），以及 doom loop 检测（连续 3 次相同 tool 调用触发确认）。对于理解 AI 编码工具的上下文管理设计很有参考价值。

## 全文

### context 是怎么构建的？

opencode 的 context 也是分为这几部分：

- **System Prompt：**
  - environment：包含模型名称、工作目录、git 状态、平台、日期等；
  - skills：加载当前 agent 可用的 skill 工具描述
  - system：项目内向上查找的 `AGENTS.md` / `CLAUDE.md` / `CONTEXT.md`，全局 `~/.claude/CLAUDE.md`，`config.instructions` 中配置的文件或 URL

- **Messages（历史消息 + 本轮消息）：** 主要查询本次 session 的信息，从新的往旧的数据进行查找，分别拼接 user message 和 assistant message；

```
┌─────────────────────────────────────────┐
│  System Prompt                          │
│  ├── 环境信息（模型名、目录、平台、日期）      │
│  ├── Skills 列表                        │
│  └── 指令文件（AGENTS.md / CLAUDE.md）   │
├─────────────────────────────────────────┤
│  Messages（历史 + 本轮）                 │
│  user → assistant → user → assistant…  │
└─────────────────────────────────────────┘
```

除此之外，上下文窗口管理还有三层机制防止上下文溢出：

- **Compaction（压缩）：** 如果 token 数接近模型上限，那么会用全量历史调一次模型，生成结构化摘要，然后在对话中插入一个"压缩点"。下次构建 context 时，遇到这个标记就截断，只保留摘要 + 之后的消息。
- **Prune（裁剪）：** 对话结束后异步执行，从最新消息往前遍历，超过 40,000 token 保护边界之外的旧工具调用结果，将输出替换为 `"[Old tool result content cleared]"`。工具调用的结构（input/output 字段）保留，只清空 output 内容，这样不会破坏 Anthropic 要求的 tool_use/tool_result 配对。
- **图片/媒体单独处理：** 对不支持工具结果中含图片的接口（非 Anthropic/OpenAI/Bedrock），自动把图片提取出来变成单独一条合成 user 消息注入

### Prompt caching

Prompt Caching 是大模型提供商提供的一种优化机制：将某些内容（通常是较长且重复的前缀）在服务端缓存起来，后续请求命中缓存后**跳过对该部分的重新计算**，从而降低延迟和成本（缓存命中的 token 通常价格更低）。

Prompt Caching 通过一般在调用的时候通过给 context 打标记实现，比如当使用 **Claude** 的时候会选择**前两条 system + 最后两条对话**打标记，因为 System prompt 内容几乎不变，最后两条对话消息是模型下一步推理的直接上文，命中率最高。

打了标记后，Anthropic API 会在服务端把这段内容写入缓存，下次相同请求直接复用，不重新计算。

大致装配好之后是这样：

```
messages = [
  { role: "system", content: system[0] },  // ← cache 标记
  { role: "system", content: system[1] },  // ← cache 标记
  ...历史对话消息,
  ...最后两条                               // ← cache 标记
]
```

### context 体积控制 prune & compact

compact 是"总结历史，重建上下文"。prune 是"保留历史骨架，清空很老的 tool 输出正文"。

- **compact**: 用一条 summary 替代一大段旧对话
- **prune**: 不替代消息，只把旧 tool result 的大文本删掉，换成占位符

**Compact**

- 启动一个专门的 compaction agent
- 把当前有效历史送给模型
- 让模型生成一份可继续工作的总结
- 把这份总结存成一条 assistant message，并标记 summary: true

之后在正常对话里，filterCompacted() 会以这条 summary 为边界，只保留"summary 之后的有效历史"。

**什么时候用 compact：** 主要在上下文接近/超过模型限制时。触发点：

- 如果最近一次完成的 assistant message token 太多
- SessionCompaction.isOverflow(…) 返回 true
- 就创建 compaction 任务

**Prune**

`SessionCompaction.prune({ sessionID })`
- 倒着扫描旧消息
- 只关注 tool 的 completed output
- 保留最近一部分 tool 输出
- 对更老的 tool 输出打上 time.compacted
- 后续 toModelMessages() 会把这类输出替换成 [Old tool result content cleared]

### tool result 防膨胀机制

**第一层是"单次工具输出截断"**

- 最大 2000 行
- 最大 50KB
- 超过就截断
- 完整输出落盘到 Global.Path.data/tool-output/…

这意味着一次工具调用就算返回特别大的文本，也不会原样塞回会话上下文。MCP 工具返回文本时就会走这层。

截断后会输出提示，引导用 Grep 搜索或 Read 指定 offset/limit 来查看完整内容。

**第二层是"跨多轮的旧 tool output 清理"**

就是上面提到的 prune：
- 倒序扫描旧的 completed tool outputs
- 保留最近的一部分
- 更老的输出标记为 compacted
- 之后会被替换成 [Old tool result content cleared]

### isOverflow

SessionCompaction.isOverflow() 会根据：
- input tokens
- output tokens
- cache tokens

判断是否接近上下文上限。一旦超限，就自动创建 compaction 任务，把旧历史总结掉。

### doom loop 检测

- 如果连续 3 次调用同一个 tool
- 输入还完全相同
- 会触发权限确认 doom_loop

这防的是 agent 在循环里重复打同一个工具，导致历史疯狂增长。
