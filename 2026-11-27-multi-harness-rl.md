---
title: Hugging Face 多 Harness 强化学习：同一模型换框架，分数为什么会变
date: 2026-11-27
source: 微信公众号 Hugging Face（Adina 译）
url: https://mp.weixin.qq.com/s/P-tde-7a1eCoMP5N9LcG0g
type: article
tags: [AI, Agent, harness engineering]
---

## 摘要

同一套 LFM2.5-2.6B 权重，在留出任务上用 Mini-SWE-Agent 得 62.1%，换 Claude Code 只得 33.2%。单用 OpenCode 做强化学习，收益主要集中在 OpenCode；在 OpenCode、Claude Code、Codex 和 Mini-SWE-Agent 上混合训练，四套框架均有改善。值得收的是**收益分布**，不是多框架总分领先约 2 个百分点：作者认为差距在噪声内，两个训练运行的实际采样量也不等价。

## 工程增量

- **评测单位是模型 × Harness。** 工具接口、上下文处理、执行循环和停止规则会改变模型实际面对的问题。留出任务不等于留出 Harness：实验不能证明收益能迁移到从未参与训练的第五套框架。
- **记录模型实际采样的 token ID，而不是只存文本再分词。** 不同 ID 序列可以解码成同一段文本。OpenEnv 的捕获代理在模型 API 边界记录推理轨迹，Harbor 提供任务环境，训练器另行处理奖励和更新。Harness 改写历史或压缩上下文时，不能假定整段对话只增不改。
- **采样正确不等于学会停。** 早期 Qwen 实验即使保留精确 token，也出现超出评测输出上限、持续调用工具不交答案的问题。LFM 训练与评测统一输出上限，并加入效率奖励。在基础模型和训练后模型均能完成的任务上，多 Harness RL 少调用 31% 的工具；缺少去掉效率奖励的 LFM 对照，不宜作因果解释。

## 数字怎么读

- LFM 基线总分 42.2%；训练曲线第 1,000 步 OpenCode-only RL 52.3%，多 Harness RL 54.2%。文中另在 SFT 对比段报告多 Harness RL 为 54.6%，不与曲线终点混用。
- 两套 RL 都跑 1,000 步，但多 Harness 接触 626 个不同任务、处理 451M 训练 token，单 Harness 为 555 个、162M。作者指出差异主要来自 Claude Code 改写历史后，一条 rollout 可被拆成多条训练数据。步数相同不等于预算相同。
- 教师成功轨迹的 SFT：单 OpenCode 47.5%，多 Harness 43.1%。多 Harness SFT 的总体分掩盖了 Mini-SWE-Agent 从 62.1% 跌至 45.2%，其余三个环境反而进步。这是本实验的结果，不是 RL 普遍优于 SFT 的证据。

## 去重与迁移

未见同源条目。[gBench](2026-11-25-gbench-deepmind-eval.md) 讲怎么搭固定评测；[CRSI](2026-11-25-crsi-self-improvement-memory.md) 讲怎么把改动依据迁给优化器。本篇研究的是**实际运行框架改变后，模型分数和训练增益如何分布**。对个人 Agent OS，先用同一批可验收任务，把 OpenClaw 和 Claude Code 分开跑、分开记成功率、工具调用和是否交付，再谈更换模型或重写 Skill。

[英文原文及图表](https://huggingface.co/spaces/FineEnvs/multi-harness-rl) · [原文源码](https://github.com/adithya-s-k/FineEnvs/tree/main/content/articles/multi-harness-rl)
