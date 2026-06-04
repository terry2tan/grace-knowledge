---
title: The reason big tech is giving away AI agent frameworks
date: 2026-03-18
source: thenewstack.io
url: https://thenewstack.io/agent-framework-container-wars/
type: article
tags: [AI产品, 商业, 技术]
---

## 摘要

这篇文章把 2026 年的 AI agent framework 竞争，类比为 2015 到 2018 年的容器编排战争：表面上大家在比框架能力，实际上真正的竞争点是框架背后的云运行时和基础设施收入。作者认为 AWS、Google、Microsoft、OpenAI 等大厂之所以把 agent framework 做得更轻、更开放，是为了把开发者顺滑引向自家的推理、部署、身份和数据平台。与此同时，模型原生的 tool use、planning 和 reasoning 能力越来越强，也在持续压缩“厚框架”本身的价值空间。文章最后给出的判断是，未来真正值得下注的不是某个单一框架，而是 MCP、A2A 这类协议层，以及跨框架通用的 context engineering、evaluation、observability 和 security 能力。

## 全文

作者：Janakiram MSV

副标题：From Docker to LangGraph: Why the agent framework shakeout is the container wars all over again. Learn to bet on protocols, not frameworks, in this new era.

As someone who had a front-row seat to the container orchestration wars, I am watching the same movie play out again with AI agent frameworks. It’s just that the cast is different, and the stakes are much higher, but the plot is almost identical.

In 2015, if you wanted to orchestrate containers, you had a plethora of choices. [Docker Swarm](https://thenewstack.io/docker-swarm-a-user-friendly-alternative-to-kubernetes/), Apache Mesos, Hashicorp Nomad, and, of course, [Kubernetes](https://thenewstack.io/kubernetes/) in its early form. Each had genuine technical merit. Smart people argued passionately for their pick. I remember sitting in conference halls watching vendors make compelling cases for why their orchestrator was the one.

By 2018, Kubernetes had absorbed the ecosystem. Not because it was technically superior in every dimension, but because it had the deepest hyperscaler backing, the strongest community gravity through [CNCF](https://thenewstack.io/cto-chris-aniszczyk-on-the-cncf-push-for-ai-interoperability/), and it became the default substrate for everything being built in the container world.

Today, I see developers facing the same bewildering choice of agent frameworks. LangGraph, CrewAI, [Google ADK](https://thenewstack.io/what-is-googles-agent-development-kit-an-architectural-tour/), [AWS Strands](https://thenewstack.io/aws-launches-its-take-on-an-open-source-ai-agents-sdk/), Microsoft Agent Framework, [OpenAI Agents SDK](https://thenewstack.io/introduction-to-the-openai-agents-sdk-and-responses-api/), Mastra, Pydantic AI, and Agno. I have spent time with most of these, and I can tell you each one has something genuinely useful to offer.

But the real story is not about features. It’s about who controls what happens after you pick the framework.

## Free framework, paid runtime

Here is what most framework comparison articles miss. They line up features in a table and let you pick. That is like comparing container orchestrators in 2015 by listing which ones support health checks. It misses the game being played underneath.

The hyperscalers are not competing on framework features. They are giving away frameworks as on-ramps to their paid inference and deployment runtimes.

> The hyperscalers are not competing on framework features. They are giving away frameworks as on-ramps to their paid inference and deployment runtimes.

AWS released [Strands](https://strandsagents.com/latest/) as open source. It is deliberately thin. Three components: a model, tools, and a prompt. The Strands team was refreshingly honest about why. They [said](https://aws.amazon.com/blogs/opensource/introducing-strands-agents-an-open-source-ai-agents-sdk/) their previous framework libraries "started to get in our way of fully leveraging the capabilities of newer LLMs." But here is the part that matters. Strands is co-designed with [Amazon Bedrock AgentCore](https://aws.amazon.com/bedrock/agentcore/).

Strands is tightly integrated with Amazon [Bedrock AgentCore for production deployment and already underpins agentic](https://thenewstack.io/aws-unveils-bedrock-agentcore-to-scale-ai-agents-from-prototype-to-production/) features in Amazon Q Developer, AWS Glue, and VPC Reachability Analyzer. The Strands SDK itself is open source with no license fee, while Bedrock and Bedrock AgentCore are metered AWS services.

Google ADK follows the same playbook. It is open source on GitHub, multi-agent-native, with a genuinely impressive context-engineering architecture. Google’s engineering team [treats](https://developers.googleblog.com/architecting-efficient-context-aware-multi-agent-framework-for-production/) context as a "compiled view over a richer stateful system." That is serious systems engineering. But ADK is optimized for Gemini and comes with native connectors to Vertex AI, BigQuery, and AlloyDB. The framework is free. Vertex AI is not.

> "This is the GKE, EKS, AKS playbook applied to agents: Give away the orchestrator. Monetize the infrastructure underneath."

Microsoft Agent Framework plugs into [Microsoft Foundry](https://ai.azure.com/), with [Entra Agent ID](https://www.microsoft.com/en-in/security/business/identity-access/microsoft-entra-agent-id) providing agent identity management. OpenAI’s [Agents SDK](https://openai.github.io/openai-agents-python/) is even more minimal. Three primitives: Agents, Handoffs, Guardrails. The bet is simple. If the framework is easy enough, you never leave the OpenAI API.

This is the GKE, EKS, AKS playbook applied to agents: Give away the orchestrator. Monetize the infrastructure underneath.

Then there are the independents. [LangGraph](https://www.langchain.com/langgraph) leads the pack with over 80,000 GitHub stars and the largest ecosystem. [CrewAI](https://www.crewai.com/) is popular for rapid prototyping. [Mastra](https://mastra.ai/) targets TypeScript developers. [PydanticAI](https://ai.pydantic.dev/) appeals to Python developers who want type safety. These are all model-agnostic, vendor-neutral, and genuinely useful.

But they all face the same existential question I watched Docker Swarm and Mesos face a decade ago. Can you build a sustainable business on a layer that hyperscalers are commoditizing from above?

## Smarter models, thinner frameworks

Here is where the agent framework story diverges from the container wars, and not in a way that helps the independents.

During the container orchestration era, the underlying technology (containers) did not improve dramatically in terms of self-orchestration. You always needed a scheduler. The orchestration layer was durable.

With agent frameworks, the opposite is happening. The models themselves are getting better at orchestration. AWS’s Strands team said this plainly: "We realized that we no longer needed such complex orchestration to build agents, because models now have native tool-use and reasoning capabilities." What used to take months to make production-ready now takes days with a model-driven approach.

When [GPT-3.5 was state-of-the-art](https://thenewstack.io/donald-knuth-asked-chatgpt-20-questions-what-did-we-learn/), LangGraph’s graph-based orchestration was essential. Models could not reliably chain tool calls without explicit control flow. Today, with Claude Sonnet 4.6, Gemini 3 Pro, and Llama 4 Scout with its 10-million-token context window, models handle planning, tool selection, and self-correction on their own. The need for heavy framework orchestration shrinks with every model generation.

This means the independent frameworks are caught in a two-front squeeze. Hyperscaler runtimes commoditize the deployment and observability layers. Better models commoditize the orchestration logic from below. The framework layer is getting thinner.

## Where Value Actually Lives

If the framework layer thins out, where does the real value go? From what I have seen, building with these tools, four areas matter.

**Context engineering** is becoming the actual differentiator for production agents. Not how you orchestrate tool calls, but how you manage what the model sees. Google ADK’s [tiered context architecture](https://developers.googleblog.com/architecting-efficient-context-aware-multi-agent-framework-for-production/) is ahead of the curve here. The team at Manus [rebuilt](https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus) their agent framework four times before getting context management right. This is where the hard engineering problems live now.

**Evaluation and observability** are where LangChain’s real moat lives, not in the chain abstraction, but in [LangSmith](https://smith.langchain.com/). [Langfuse](https://langfuse.com/), [Braintrust](https://www.braintrust.dev/), and [Ragas](https://www.ragas.io/) are also building in this space. AWS shipped Strands Evals with version 1.0. You cannot improve agents you cannot measure, and production agents need continuous evaluation pipelines.

**Agent security** is the emergent category nobody saw coming. A recent Gravitee report found that 88% of organizations experienced confirmed or suspected agent security incidents. Only 14% had full security approval for their agent fleet. Microsoft [published](https://www.microsoft.com/en-us/security/blog/2026/02/10/80-of-fortune-500-use-active-ai-agents-observability-governance-and-security-shape-the-new-frontier/) this week that 80% of Fortune 500 companies have active AI agents. However, most organizations still treat agents as extensions of human user accounts rather than as independent entities that require their own identities and access controls. This security layer is framework-agnostic, which means whoever owns it gains cross-framework leverage.

**Interoperability protocols** might be the most important shift of all. [MCP](https://thenewstack.io/model-context-protocol-a-primer-for-the-developers/) is becoming the universal standard for tool integration. [A2A](https://a2a-protocol.org/latest/) handles agent-to-agent communication. Google’s ADK and Amazon’s Strands ship with support for both. If MCP and A2A harden into industry standards, the framework above them becomes a thinner commodity layer. This is exactly what happened when [Kubernetes standardized container orchestration](https://thenewstack.io/the-impact-of-containerization-on-apm-strategies/) while individual distributions competed on top of it.

## Where the analogy breaks

Now, here is where I have to be honest about the limits of my own analogy. The container orchestration war produced one clear winner because containers are a homogeneous abstraction. A container is a container. Workloads are portable by definition.

Agents are not like that. A coding agent, a customer service agent, and a data analysis agent have fundamentally different runtime requirements, tool chains, evaluation needs, and context patterns. This heterogeneity suggests the agent-based market framework might not consolidate into a single Kubernetes-style winner.

> "The 'Kubernetes of agents' might not be a framework at all. It might be the protocol layer."

What I think happens instead is a fragmented but layered stack. Hyperscaler SDKs win for teams already committed to that cloud, because the framework-to-runtime co-design is a genuine engineering advantage. LangGraph maintains its position as a solution for complex workflows that require graph-level control and auditability. Lightweight model-driven SDKs like Strands and OpenAI’s work well for agents where the LLM handles orchestration itself. And protocols, MCP and A2A, become the unifying substrate underneath, the way TCP/IP unified networking without requiring everyone to use the same operating system.

The "Kubernetes of agents" might not be a framework at all. It might be the protocol layer.

## Pick protocols, not frameworks

If I were advising a platform engineering team today, and I do, here is what I would say.

First, bet on protocols, not frameworks. Design your tool integrations around MCP from day one. Adopt A2A for inter-agent communication. This is your hedge against framework churn, and there will be churn.

Second, invest in evaluation and observability independently of your framework choice. This layer outlasts any framework. Pick tooling that works across frameworks, not tooling that locks you into one.

Third, if you are already deep in a hyperscaler, use their SDK. The co-design between Strands and Bedrock, or ADK and Vertex, is a real engineering advantage. Do not fight that gravity. It is not worth the friction.

The container wars taught us that ecosystems, not features, win infrastructure battles. The agent framework shakeout will teach us whether that lesson still holds when the workloads themselves are as diverse as the intelligence running them.

## 全文翻译

作者：Janakiram MSV

副标题：从 Docker 到 LangGraph：为什么 agent framework 的洗牌，正在重演当年的容器大战。在这个新时代，你应该押注的是协议，而不是框架。

作为一个曾经近距离见证容器编排大战的人，我现在看着 AI agent framework 的竞争，感觉像是在重看同一部电影。只是演员换了，赌注更高了，但剧情几乎一模一样。

2015 年，如果你想做容器编排，可选项非常多。[Docker Swarm](https://thenewstack.io/docker-swarm-a-user-friendly-alternative-to-kubernetes/)、Apache Mesos、Hashicorp Nomad，当然还有当时还处于早期形态的 [Kubernetes](https://thenewstack.io/kubernetes/)。它们各自都有真实的技术价值。很多聪明人都会非常激烈地为自己支持的方案辩护。我还记得自己坐在各种大会现场，看着不同厂商有理有据地论证为什么他们的编排器才是正确答案。

到了 2018 年，Kubernetes 吞并了整个生态。原因并不是它在每一个维度上都技术最强，而是它拥有最深的超大云厂商支持、通过 [CNCF](https://thenewstack.io/cto-chris-aniszczyk-on-the-cncf-push-for-ai-interoperability/) 获得了最强的社区引力，并且逐渐变成了整个容器世界默认的底层基座。

今天，我看到开发者们面对 agent framework 时，也有同样让人眼花缭乱的选择：LangGraph、CrewAI、[Google ADK](https://thenewstack.io/what-is-googles-agent-development-kit-an-architectural-tour/)、[AWS Strands](https://thenewstack.io/aws-launches-its-take-on-an-open-source-ai-agents-sdk/)、Microsoft Agent Framework、[OpenAI Agents SDK](https://thenewstack.io/introduction-to-the-openai-agents-sdk-and-responses-api/)、Mastra、Pydantic AI、Agno。我接触过其中大多数，可以明确地说，它们每一个都有真正有用的地方。

但真正的故事从来不在于功能点，而在于你选定某个 framework 之后，谁能掌控接下来发生的一切。

## 免费框架，收费运行时

大多数 framework 对比文章都忽略了这一点。它们通常会把功能列成一个表，让你据此做选择。这就像 2015 年比较容器编排器时，只看谁支持 health check 一样。它完全没看到底层正在发生的那场真正的博弈。

超大云厂商竞争的重点，并不是 framework 的功能，而是把 framework 当作入口，导向它们收费的推理运行时和部署运行时。

> 超大云厂商真正竞争的不是 framework 功能，而是把 framework 作为进入其收费推理与部署运行时的入口。

AWS 把 [Strands](https://strandsagents.com/latest/) 开源了。它被刻意设计得很薄，只有三个组件：模型、工具和提示词。Strands 团队对这么做的原因说得很坦率。他们[表示](https://aws.amazon.com/blogs/opensource/introducing-strands-agents-an-open-source-ai-agents-sdk/)，之前那些 framework 库“开始妨碍我们充分利用新一代 LLM 的能力”。但真正关键的地方在于：Strands 是和 [Amazon Bedrock AgentCore](https://aws.amazon.com/bedrock/agentcore/) 一起联合设计出来的。

Strands 与 Amazon [Bedrock AgentCore 在生产部署层深度集成，并且已经支撑 Amazon Q Developer、AWS Glue 和 VPC Reachability Analyzer 中的 agentic](https://thenewstack.io/aws-unveils-bedrock-agentcore-to-scale-ai-agents-from-prototype-to-production/) 功能。Strands SDK 本身是开源的，不收许可费，但 Bedrock 和 Bedrock AgentCore 是按量计费的 AWS 服务。

Google ADK 走的是同样的路线。它在 GitHub 上开源，原生支持多 agent，并且在 context engineering 架构上做得确实非常出色。Google 的工程团队[把](https://developers.googleblog.com/architecting-efficient-context-aware-multi-agent-framework-for-production/)上下文视为“对更丰富的有状态系统的一种编译后视图”。这是真正严肃的系统工程。但 ADK 也是为 Gemini 优化的，并且原生连接 Vertex AI、BigQuery、AlloyDB。框架是免费的，Vertex AI 不是。

> “这就是 GKE、EKS、AKS 的那套打法，被直接搬到了 agents 身上：把编排器免费送出去，再把底层基础设施变现。”

Microsoft Agent Framework 对接的是 [Microsoft Foundry](https://ai.azure.com/)，而 [Entra Agent ID](https://www.microsoft.com/en-in/security/business/identity-access/microsoft-entra-agent-id) 提供 agent 身份管理。OpenAI 的 [Agents SDK](https://openai.github.io/openai-agents-python/) 甚至更极简，只有三个原语：Agents、Handoffs、Guardrails。它的下注逻辑很简单：只要 framework 足够容易上手，你就不会离开 OpenAI API。

这就是 GKE、EKS、AKS 那套打法在 agents 时代的翻版：编排器免费送，底层基础设施收费。

然后是独立厂商。[LangGraph](https://www.langchain.com/langgraph) 领跑，GitHub 星标超过 8 万，生态也是最大的。[CrewAI](https://www.crewai.com/) 适合快速原型。[Mastra](https://mastra.ai/) 面向 TypeScript 开发者。[PydanticAI](https://ai.pydantic.dev/) 则吸引那些想要类型安全的 Python 开发者。它们都与模型无关、保持厂商中立，而且确实很好用。

但它们都面临着和十年前 Docker Swarm、Mesos 一样的生存性问题：当超大云厂商从上层把这一层能力商品化时，你还能不能在这一层上建立一个可持续的商业模式？

## 更聪明的模型，更薄的框架

agent framework 的故事在这里开始偏离容器大战，而且这种偏离对独立厂商并不友好。

在容器编排时代，底层技术，也就是容器本身，并没有在“自我编排”能力上发生根本性进化。你始终需要一个调度器，所以编排层的价值是稳定的。

但在 agent framework 世界里，情况正好相反。模型本身正在变得更擅长编排。AWS 的 Strands 团队把这件事说得非常直白：“我们意识到，构建 agents 已经不再需要那么复杂的编排，因为模型现在已经拥有原生的工具调用和推理能力。”过去需要数月才能做成生产可用的东西，现在用模型驱动的方式，几天就够了。

当 [GPT-3.5 还是最先进模型](https://thenewstack.io/donald-knuth-asked-chatgpt-20-questions-what-did-we-learn/) 时，LangGraph 那种基于图的编排是必需的。那时候模型无法在没有显式控制流的情况下，可靠地串联多个工具调用。到了今天，Claude Sonnet 4.6、Gemini 3 Pro、Llama 4 Scout 以及它们千万 token 级的上下文窗口，已经可以自己完成规划、工具选择和自我修正。每一代模型进步，厚重 framework 编排的必要性就会再缩小一点。

这意味着独立 framework 正被两头挤压。超大云厂商的运行时把部署和可观测性层商品化；更强的模型又从底部把编排逻辑商品化。framework 这一层正在变得越来越薄。

## 真正的价值到底在哪里

如果 framework 这一层在变薄，真正的价值会流向哪里？根据我自己构建和使用这些工具的观察，有四个方向最重要。

**上下文工程（Context engineering）** 正在成为生产级 agents 的真正差异化点。真正关键的已经不是你怎样编排工具调用，而是你怎样管理模型能看到什么。Google ADK 的[分层上下文架构](https://developers.googleblog.com/architecting-efficient-context-aware-multi-agent-framework-for-production/)在这方面明显走在前面。Manus 团队为了把上下文管理做好，曾经[把](https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus)自己的 agent framework 重写了四次。现在真正艰难的工程问题，就集中在这里。

**评估与可观测性（Evaluation and observability）** 才是 LangChain 真正的护城河，而不是 chain 这种抽象本身，它真正的价值在 [LangSmith](https://smith.langchain.com/)。[Langfuse](https://langfuse.com/)、[Braintrust](https://www.braintrust.dev/)、[Ragas](https://www.ragas.io/) 也都在这个方向上构建能力。AWS 也在 Strands 1.0 中发布了 Strands Evals。你无法改进一个无法衡量的 agent，而生产级 agent 必须有持续性的评估流水线。

**Agent 安全（Agent security）** 是一个几乎没人预料到的新兴类别。Gravitee 最近的一份报告显示，88% 的组织经历过已确认或疑似的 agent 安全事件，但只有 14% 的组织为其 agent fleet 获得了完整的安全批准。Microsoft 本周[发布](https://www.microsoft.com/en-us/security/blog/2026/02/10/80-of-fortune-500-use-active-ai-agents-observability-governance-and-security-shape-the-new-frontier/)的信息显示，80% 的财富 500 强企业已经在使用活跃的 AI agents。然而，大多数组织仍然把 agents 当作人类用户账号的延伸，而不是把它们视为需要独立身份和访问控制的实体。这个安全层与具体 framework 无关，因此谁掌握了它，谁就能获得跨 framework 的杠杆。

**互操作协议（Interoperability protocols）** 可能是最重要的变化。[MCP](https://thenewstack.io/model-context-protocol-a-primer-for-the-developers/) 正在成为工具集成的通用标准；[A2A](https://a2a-protocol.org/latest/) 负责 agent 之间的通信。Google ADK 和 Amazon Strands 都已经支持这两者。如果 MCP 和 A2A 最终固化为行业标准，那么位于其上的 framework 层就会变成一个更薄的商品层。这和当年 [Kubernetes 标准化了容器编排](https://thenewstack.io/the-impact-of-containerization-on-apm-strategies/)，而不同发行版在其上竞争的过程非常类似。

## 这个类比失效的地方

不过，我也必须诚实地承认，这个类比是有边界的。容器编排大战最后产生了一个非常明确的赢家，是因为容器本身是一种同质化的抽象。容器就是容器，工作负载天然可移植。

但 agents 不是这样。一个 coding agent、一个客服 agent、一个数据分析 agent，它们在运行时需求、工具链、评估方式和上下文模式上都根本不同。这种异质性意味着，agent framework 市场未必会像 Kubernetes 那样收敛到一个单一赢家。

> “所谓 agents 的 Kubernetes，最终可能根本不是某个 framework，而是协议层。”

我认为最终会出现的是一个分裂但分层的技术栈。对那些已经深度绑定某个云厂商的团队来说，超大云厂商的 SDK 会胜出，因为 framework 与 runtime 的协同设计确实有真实的工程优势。LangGraph 会继续保有它在复杂工作流中的位置，特别是在那些需要图级别控制和审计能力的场景中。像 Strands 和 OpenAI 这类轻量、模型驱动的 SDK，则适合那些让 LLM 自己负责编排的 agent。至于协议层，MCP 和 A2A 会成为下方的统一基座，就像当年 TCP/IP 统一了网络世界，但并不要求所有人使用同一种操作系统。

所谓 agents 的“Kubernetes”，可能根本就不是某个 framework，而是协议层。

## 押注协议，而不是框架

如果今天让我给平台工程团队提建议，而我确实也在做这件事，我会这样说。

第一，押注协议，不要押注框架。从第一天起，就围绕 MCP 来设计你的工具集成；在 agent 间通信上采用 A2A。这样做是为了对冲 framework 的频繁更替，而这种更替一定会发生。

第二，独立于 framework 选择之外去投资评估和可观测性。这一层会比任何单一 framework 活得更久。选择那些能跨 framework 工作的工具，而不是那些把你锁死在某个生态中的工具。

第三，如果你已经深度在某个超大云厂商的生态里，就直接用他们的 SDK。Strands 与 Bedrock、ADK 与 Vertex 之间的协同设计，确实带来了真实的工程优势。不要试图逆着这种重力走，那不值得。

容器大战给我们的教训是：在基础设施战争中，真正赢的是生态，而不是功能。agent framework 的这轮洗牌，则会告诉我们，当工作负载本身像“智能”一样高度多样化时，这条规律是否依然成立。
