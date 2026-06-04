---
title: AI Agent 工具选择实战：DeepSeek 上 1200 次单测找出 Prompt 和工具描述的真实杠杆
date: 2026-04-20
source: 微信公众号 / 硅基鹿鸣
url: https://mp.weixin.qq.com/s/cZwO2j3jF7aoiNqdOOnucg
type: article
tags: [AI产品, 工具, 方法论]
---

## 摘要

这篇文章用 1200 次对照实验回答了一个很实操的问题：在 Agent 的工具选择上，system prompt 和 tool description 到底谁更关键。结论是，在 DeepSeek-V3 上，真正有效的杠杆不是长 system prompt，而是工具描述里的约束写法，尤其是前置的 NEVER 列表。
最有价值的部分是实验设计本身，作者用 2×2 factorial ablation，把工具描述和系统提示词拆开测，结果发现只改工具描述时，First-call accuracy 从 60.0% 提升到 66.3%，Forbidden Hit 从 13.0% 降到 5.7%；而只改 70 行 system prompt 几乎没有正向效果。
文章进一步指出，Prompt 是否有效高度依赖模型训练路线。Claude 更像会把 system prompt 当“宪法”，而 DeepSeek 更偏向服从当前用户消息，因此最佳实践不是照抄，而是先在目标模型上做 eval，再决定把精力投在哪一层。
这篇非常适合你的知识库，因为它不是泛泛而谈 prompt engineering，而是在讲 Agent harness 中 tool layer、prompt layer 与模型对齐方式之间的真实工程杠杆。

## 全文

# AI Agent 工具选择实战：DeepSeek 上 1200 次单测找出 Prompt 和工具描述的真实杠杆

做 Agent 的人很容易把时间花在 system prompt 上，但上线后往往发现效果不稳定。

作者这次做了一轮 1200 次对照实验，想拆开看：prompt 到底有没有用，工具描述和系统提示词哪一层才是真正的工程杠杆。

结果有些反直觉：在 DeepSeek 上，那份针对失败场景设计的 system prompt 对工具选择准确率的提升接近于零；真正把准确率从 60% 提升到 66.3% 的，是工具描述里的几条 NEVER 约束。

## 实验设计

作者准备了四种组合：

- V1 工具描述：最小化中文版
- V2 工具描述：加了 NEVER 约束前置 + 英文化
- V1 系统提示词：默认 4 行版
- V2 系统提示词：70 行、针对已知失败场景修复的版本

这样形成一个 2×2 的析因实验（factorial ablation），不只看“有没有用”，还看每层各自贡献和组合后的协同效应。

测试集是手工构造的 100 条任务，分三类：

- positive：该用工具时能不能选中
- confuse：遇到诱导性表述时能不能抗干扰
- negative：纯概念性提问时能不能克制不调用工具

每种组合跑 100 任务 × 3 个 seed，共 300 次观测，四档总计 1200 次。

## 核心结果

### Baseline（V1 tool + V1 prompt）

- First-call：60.0%
- Forbidden Hit：13.0%

### 只升级工具描述（V2 tool + V1 prompt）

- First-call：66.3%
- Forbidden Hit：5.7%

也就是准确率提升 6.3 个百分点，误用工具率几乎砍半。

### 只升级系统提示词（V1 tool + V2 prompt）

- First-call：59.3%
- Forbidden Hit：13.7%

和 baseline 几乎没有区别，甚至略差。

### 两层都升级（V2 tool + V2 prompt）

- First-call：65.7%

比“只升级工具描述”还低 0.6 个百分点。也就是说，两层都叠 NEVER 约束时，规则反而可能把模型“吓住”，连合理的 bash 工具调用也变少了。

## 关键发现

最刺眼的证据来自 negative_concept 任务，也就是像“什么是 Harness Engineering”“Python 装饰器怎么用”这种纯概念问题。

V2 prompt 的第一条规则明明写着：

> For conceptual questions, respond in natural language. Do NOT call tools.

但在 DeepSeek-V3 上，模型 12 次观测全部绕过这条系统规则，仍然去调用工具。

这说明在 DeepSeek 的行为里，system prompt 更像背景上下文，而用户当前消息权重更高。用户问题和 system prompt 冲突时，用户问题赢。

反过来，Claude 的 system prompt 服从性更强，更接近“宪法式”约束。因此同样一份 prompt，在 Claude 上可能有效，在 DeepSeek 上却几乎没效果。

## 方法论启发

这篇文章最重要的结论不是“tool description 永远比 prompt 更重要”，而是：

**每一层优化的可动空间，是模型给定的。**

也就是说：

- DeepSeek-V3 上，优先优化工具描述
- Claude 上，system prompt 可能是高杠杆层
- 对没有做 tool-use 对齐的开源模型，prompt 和 description 都可能不够，得退回 hook 层硬拦截

真正普适的最佳实践不是“三层都优化”，而是：

**先做 eval，再决定精力往哪一层投。**

别人模型上的最佳实践，未必能迁移到你的目标模型上。
