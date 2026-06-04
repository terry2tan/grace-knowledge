---
title: 业内推荐｜做Agent最值得关注的190篇顶会+谷歌321个落地案例 ！
date: 2026-05-07
source: 微信公众号 / PaperAgent
url: https://mp.weixin.qq.com/s/sOLlt6OgsaPXAR8-ct8f4Q
type: article
tags: [AI, 工具, 方法论]
---

## 摘要

这篇内容本质上是一篇 Agent 资源包分发文，主打“190 篇顶会论文 + 321 个谷歌落地案例 + 500 个开源 Agent 应用”的合集下载。正文真正有信息量的部分不多，主要是挑了几篇代表性论文做一句话级别介绍，包括 Tree of Thoughts、多智能体协同感知、Agent+RL、Agent Memory 和一篇 Agent Systems 综述。对你来说，它的价值不在文章本身，而在它提示了几个值得继续深挖的研究方向：推理/搜索、Multi-Agent、RL、Memory、系统综述。整体偏资源导航，信息密度一般，适合当线索入口，不适合当深度文章读。

## 全文

# 业内推荐｜做Agent最值得关注的190篇顶会+谷歌321个落地案例 ！

*作者：PaperAgent · 发布时间：2026年5月7日 11:20*

Agent 很火，但很多人入门时不知道从哪里开始，或者已经在研究过程中，复现容易卡壳、找不到创新点。

文章推荐了一份资源包，宣称整理了：

- 190 篇必读顶会论文与源码
- 321 个谷歌发布的落地项目案例
- 500 个开源 AI Agent 应用

作者强调，这些内容覆盖 Agent 的入门、进阶、研究与应用全流程，包括经典方向与前沿方向，如 Agent + RL、Agent Memory 等，并整理了项目源码，方便结合自己的场景做落地和复现。

## 文中列举的代表性论文

### 1. Tree of Thoughts: Deliberate Problem Solving with Large Language Models

文章称这篇论文提出了“思维树”推理框架，把大语言模型的推理过程建模为树状搜索，通过多路径探索、自我评估、前瞻与回溯来提升复杂问题求解能力。在 24 点、创意写作、迷你填字词等任务上，相比 CoT 有明显提升，也显著提高了 GPT-4 的成功率。

### 2. Learning to Detect Objects from Multi-Agent LiDAR Scans without Manual Labels

文章将这篇论文归类到多智能体方向，介绍其提出 DOtA：一种无需人工标注、从多智能体 LiDAR 扫描中学习 3D 目标检测的无监督方法。核心思路是利用多智能体共享的位姿与形状信息初始化检测器，生成伪标签，再用多尺度边界框编码和对比学习提升训练效果，并强调其在协同感知数据集上的效果和对定位噪声的鲁棒性。

### 3. AGENTGYM-RL: An Open-Source Framework to Train LLM Agents for Long-Horizon Decision Making via Multi-Turn RL

这篇论文被归类为 Agent + RL。文章介绍其提出 AgentGym-RL 开源框架，用于训练大语言模型智能体的多轮、长程决策能力。它采用模块化解耦架构，兼容主流 RL 算法，并提出分阶段训练方法 ScalingInter-RL，从短程交互逐步扩展到长程交互，以提高训练稳定性和探索深度。文章声称该方法在 27 个任务上的表现可媲美甚至超越部分商业模型。

### 4. PlugMem: A Task-Agnostic Plugin Memory Module for LLM Agents

文章把这篇论文放在 Agent Memory 类别下，但正文对内容的转述存在明显混乱：标题是 PlugMem，介绍却在讲 speculative decoding（推测解码）和并行草拟/验证加速框架。这部分大概率是拼接或编辑错误，因此不建议直接相信这里的摘要，若真要用，应该回到原论文核对。

### 5. AI Agent Systems: Architectures, Applications, and Evaluation

文章把这篇综述作为“必读综述”推荐。其核心价值在于系统梳理 AI Agent 的架构设计，包括推理、规划、记忆、工具调用等核心组件；总结单智能体/多智能体、集中式/分布式等编排模式；讨论延迟与准确性、自主性与可控性之间的权衡；并归纳评估方法、基准测试及开放问题，如工具动作验证、可扩展记忆管理和可解释性。

## 备注

这篇文章的主要目的仍然是引导读者通过二维码回复关键词获取资源包，正文本身更像营销入口而不是深度分析。可把它当成一份“Agent 学习导航线索”，但如果要做真正的研究整理，建议后续直接顺着上面几类方向去找原论文、benchmark 和开源项目。