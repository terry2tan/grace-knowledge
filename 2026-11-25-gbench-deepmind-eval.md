---
title: gBench：Google DeepMind 开源的一行命令评测工具，第三层直接用 OpenClaw 的 QA 套件
date: 2026-11-25
source: 微信公众号 / ChallengeHub（原仓库 google-deepmind/gbench）
url: https://mp.weixin.qq.com/s/N_EJs-BsGixZFvfh7jnbyw
type: article
tags: [AI, 技术, 方法论]
---

## 摘要

文章介绍 Google DeepMind 在 2026-10-30 开源的 **gBench**（`google-deepmind/gbench`，Apache-2.0，Python，237 star，至今日更）。它把「模型有多强 / 部署有没有出错 / 能不能真干活」三件事收进同一个命令行：只要有一个兼容 OpenAI 接口的 `/v1` 端点（vLLM、Ollama、Cloud Run 都行），或者让它自己拉起本地 vLLM 测完自动关掉，就能一把跑完性能 + 三层能力评测。

**对 Terry 最要紧的一点，文章没强调但仓库写得很明确：第三层「智能体质量」直接用的是 GemmaClaw / OpenClaw 的 QA 套件**——固定 commit（`d8bc6989`）下的 60 个 QA 场景，测多轮工具调用、会话记忆、插件路由。也就是说 **OpenClaw 已经被 DeepMind 选为「开源模型能不能真干活」的参照 harness**。这个信号比工具本身更有意思：我们自己每天在用的这套东西，正在变成评测基准的一部分。

我照文章去核了仓库，几处需要以仓库为准（见文末），并补了文章省略的实现细节——尤其是第三层的密钥隔离架构和第二层「聊天模板双胞胎对照」的判定矩阵，这两处是全文最值钱的方法论。

## 一、三层能力 + 性能，一个入口

| 层 | 开关 | 规模 | 内容 |
|---|---|---|---|
| 一：学术基准 | `--evals` | **86 套**，六大板块 | 通用知识与科学推理 / 数学与证明 / 编程与算法 / 长上下文与检索 / **工具调用与智能体（28 套，最多）** / 多模态视觉。含 GPQA、MMLU-Pro、AIME、SWE-bench Verified、LiveCodeBench、RULER、BFCL、tau2-bench、GAIA、MMMU-Pro、DocVQA；另有 `swe_lancer`、`ui_control_osworld` 两套重的，必须点名才跑 |
| 二：Golden Set 烟雾测试 | `--golden-only` | **16 条确定性用例** | 代码（跑单测判分 `python_exec`）、数学（`answer_exact`）、工具调用、结构化输出、**聊天模板**、事实知识、翻译、安全、视觉、音频 |
| 三：智能体质量 | `--quality-only` | **60 个场景**（固定 commit `d8bc6989`） | OpenClaw QA 套件：多轮工具调用、会话记忆、插件路由。需要其他厂商模型的场景单列不计分 |
| 性能 | 默认 | — | TTFT / TPOT / ITL / 吞吐膝点，重复多轮报均值中位数标准差 P50/P95/P99 与变异系数 |

支持推理模式（`--eval-thinking`）、自定义评测插件（`--eval-plugins-dir`）、直接喂 JSONL 数据集（`--eval-custom-jsonl`）；图像按数据集里的原始字节发送，不重编码。

## 二、第二层最锋利的设计：聊天模板「双胞胎对照」

这个问题的描述值得逐字读：**聊天模板就是那段把结构化对话拼成一条字符串的 Jinja，模型训练时见的就是拼好的样子。这段代码写错，系统不会报任何错，模型只是悄悄变笨——看上去就像权重本身不行，极难查。**

gBench 的解法是实验设计，不是工具：

| 敏感用例 | 双胞胎（把同样内容塞进一条普通用户消息） | 诊断 |
|---|---|---|
| 通过 | 通过 | 序列化健康 |
| **失败** | **通过** | **模型读得懂内容，是对话结构被模板搞坏了** |
| 失败 | 失败 | 模型本身答不上来，与模板无关 |

四对用例分别压 `assistant tool_calls` 块、`tool` 轮、五轮交替历史；而且两个方向都查——除了「值没传到」，还查反向的「脚手架漏进了答案」：运行时从**被测模型自己的 tokenizer** 读出特殊 token 和 added token，再禁止它们出现在可见回答里；如果用了 `--chat-template t.jinja`，连该文件里 tokenizer 没有对应 token 的定界符字面量（`<|...|>`、`<start_of_turn>` 这类带下划线的名字）也一并禁掉。**这份禁用清单是运行时推导的，不是写死在用例里的**，所以 Gemma 之外的模型家族同样能抓到泄漏。

而且它们诚实标注了边界：文档明说这套双胞胎**目前只在逻辑推理层面成立，没在「故意改坏模板的真实模型」上实测过；也只能告诉你模板坏了，说不出坏在哪一行**，要定位靠另一个专门的 Gemma 4 模板检查器。

> **可迁移的实验设计**：任何「静默降级」的装配 bug（模板、序列化、prompt 拼装、工具 schema 转换），都可以用「同一内容走正常路径 vs 走被怀疑的路径」的双胞胎对照，把「模型不行」和「装配坏了」分开。这比「分数低就去调 prompt」高一个维度。

## 三、最值得抄的工程架构：给不受信任的 Agent 发能力，但不给它钥匙

第三层跑一个完整的 OpenClaw Agent（含模型自己写的 `exec` 命令），安全设计是全文最硬的部分：

- **全程只在 Docker 容器里**，没有「不带容器」的模式（连 `GBENCH_SANDBOX` 都不适用）
- 容器**完全断网**、云元数据服务不可达、checkout 只读、以无 capabilities 的用户运行、没有任何可写宿主机路径
- **唯一的出口**是容器内的一个 forwarder，把模型端点调用和 Gemini 调用交给 gBench 宿主机上的 **relay（走 unix socket）**
- **密钥只存在于 relay**，relay 只放行白名单里的 Gemini 调用并补上 key，其他一律 **403 + 记日志**
- 被测模型从头到尾碰不到密钥
- 所有 Gemini 调用都计入 `gemini_calls`；不支持的模态（语音/音乐/视频）不转发并记录拒绝

这套模式可以直接搬到任何「让 Agent 跑别人的代码又要给它 LLM 能力」的场景：**Agent 侧只持有一个指向本地 relay 的假端点，真 key 在 relay 进程里，白名单按调用能力而不是按 URL 前缀。**

## 四、评测态度：宁可不出分，也不给一个会误导人的 0

这一节比任何指标都值钱，它把「评测是产品工程」那篇的原则写成了可执行约束：

- **`pass_rate` 为一空就 `withheld`（`null`，打印 `withheld`），从不为 0**
- **harness 错误不计分**（relay / 端点 / Gemini / 容器故障）；但被测端点对自己的请求返回 4xx（400、422 除外，例如端点用另一个名字服务的 404）算一次失败
- **偏离基准原始协议时标 `leaderboard_comparable: false` 并写原因**，提醒分数别拿去横向比
- 每套基准与上游对账（`docs/RESOURCES.md` + `--eval-provenance`），并把每层锁定的 scaffold 版本写进 `scaffold-versioning.md`，保证跨时间可比
- **上下文窗口未知时直接 `infra_required` 停下**，不填占位值；窗口装不下声明的输出上限时**跑前就拒绝**，并说明原因
- 结果里记录 `served_model_id / context_window / model_max_tokens` 的**值和来源**（`_source` 字段），不是只记录值

对照库里那篇《Agent 评测半年复盘》的「压缩即智能 vs Steer 即作弊」——gBench 的答案是**用结构让作弊没地方发生**：锁 scaffold 版本、记 provenance、协议偏离就打标、宁可 withheld。

## 五、性能侧不是随便压一压

- **模型发现**：读 HuggingFace `config.json` 推断参数量、MoE 拓扑、视觉/音频 token；按规模推荐 GPU 档位（≤20B 用 1 张、≤80B 用 2 张、更大 8 张），并与 `--num-gpus` 对账——**偏离档位只警告，模型装不下直接拒绝**
- **启动超时随规模伸缩**：`max(600, min(3600, (300 + params_b*10) * 3 * (1.3 if MoE)))` 秒
- **重复性**：每配置多轮，报均值/中位数/标准差/P50/P95/P99/变异系数，`--max-cv-percent` 默认 5%，超了就提醒结果不稳
- **开环压力扫描**（`--stress-test`）：每档速率按泊松分布生成一份合并请求计划、**每步速率 ×2 直到某档失败**；每次重复给出一个 [pass, fail] 区间，再对中位数那次的上限做**认证**——按 P99 SLO 定报名规模（≥1099 个请求，约 1400 起发），达到分辨率时给 **±9%**；达不到就给带分辨率的认证下界、或被 `--stress-max-qps` 截断的下界、或认证失败时「无上限」、或标 `UNCERTIFIED` 并说明还需要多少时间
- **判 pass 的五个条件**：队列没在增长、≥90% 请求在 SLO 隐含的端到端时间内完成、P99 TTFT 与 P99 ITL 达标、失败率 <2%、客户端守住了自己的发送节奏（默认 SLO：首 token 5 秒 / token 间隔 200 毫秒）
- **自己写出局限**：队列增长只读 TTFT，因此「只表现为端到端变慢的过载」（例如 KV-cache 抢占）交给完成比例与 ITL 两个闸门兜——这种把自己的检测盲区写在文档里的做法很少见

## 六、体量与工程做法

- **832 个文件**、Python 代码约 **16.3 万行**、**341 个测试文件**；文档 `docs/` 有 3.7MB，比多数项目的代码还重（17 篇专题：`golden-set` / `quality` / `performance` / `relay` / `scaffold-versioning` / `THIRD_PARTY_DATASETS` / `GOSPEL` 各一篇）
- `gbench/` 分包：`core`（config/models/scaffold）、`runners`、`analysis`、`golden_dataset`、`third_party`、`docker`
- 门槛：`ruff` + `mypy` + `pytest`；**合并门禁只要单测过**；并且明确写着「**Golden Set 测的是模型，从不用来当 gBench 自己的合并门禁**」——不拿自己的评测当自己的测试，这个边界感很专业
- 5 个可直接跑的 Notebook（01 快速上手/延迟与压力上限、02 负载与并发、03 Golden Set、04 学术评测与推理模式、05 用 GemmaClaw 做智能体质量）
- 作者：Luciano Martins、Frank Li；Apache-2.0

## 七、对 Terry 的实际用法

1. **给自己的 OpenClaw 做一次正式体检**。第三层不是抽象概念，它就是 OpenClaw 的 60 个 QA 场景：多轮工具调用、`memory_search` 记忆检索、中途切换模型、图片生成与理解、Playwright 操作界面。`--scenarios memory-recall mcp-plugin-tools-call` 可以只挑场景跑，`--gemmaclaw-path` 指向自己的 checkout。**这意味着我们现在的 skill/memory/插件路由有没有退化，第一次有了外部标尺。**
2. **换模型前的决策依据**：想从现在的模型换到某个开源权重模型（Gemma 4 / Qwen / 其他），不必凭感觉——Golden Set 16 条几分钟出结论，能立刻区分「模型不行」和「部署配错」。
3. **部署自检的第一道闸**：改 vLLM 参数、换镜像、动 chat template 之后，先跑 Golden Set 再跑全量学术基准（后者动辄几小时）。聊天模板那 4 对用例是这类改动最该跑的东西，因为模板错了不会报错，只会悄悄变笨。
4. **压测方法论可以偷**：泊松开环 + 每步 ×2 + 区间 + 认证到 ±9% + 五条通过判据，比「并发从 1 加到 100 看什么时候崩」严谨一代。
5. **密钥隔离架构可以偷**：relay 白名单模式是「让 Agent 干活又不给它钥匙」的标准解。

## 需要打问号的地方

对照仓库 README，文章有几处要更正或补充：

- **文章说「网上流传 pip install gbench，但从 README 看目前还是源码安装」——仓库实际两种都支持**，PyPI 首页就是 `https://pypi.org/project/gbench/`，README 第一句就是 `pip install gbench`（Python 3.11+）；源码安装作为替代。文章这一段已过时或看的是旧版 README
- 文章说「三层评测各对应一个开关」，实际还有一层**性能评测是默认行为**，以及 `--evals-only` / `--golden-only` / `--quality-only` 三个互斥的「只跑这一层」开关
- 文章说「文档里的例子清一色用 Gemma 4」，这没错，但**第三层需要 `GEMINI_API_KEY`**（套件里的备用模型、图片生成、记忆向量都走 Gemini API），文章提了密钥但没强调这是**跑第三层的硬前置**
- 首次构建 `gbench-quality` 镜像要好几分钟、约 **8GB 磁盘**（文章说了，但这是最容易卡住新人的一步）
- **第三方数据集各有许可**（`docs/THIRD_PARTY_DATASETS.md`），发布分数前必须读——文章提了，但这条对「要对外发榜单」的人是硬约束，不是提示
- 文章未提的重要限制：**评测用例与 OpenClaw 套件都锁在固定 commit**（`d8bc6989`、8192 输出上限 `SELF_HOSTED_DEFAULT_MAX_TOKENS`），所以「60 个场景」是那个 commit 的快照，不是随 OpenClaw 更新的活体；想测自己版本要 `--gemmaclaw-commit` / `--gemmaclaw-path`
- 文章未给 star 数；我抓到的仓库状态是 237 star / 20 fork / Apache-2.0 / Python，建仓 2026-10-30，2026-11-25 仍在更新

## 链接

- 原文：https://mp.weixin.qq.com/s/N_EJs-BsGixZFvfh7jnbyw
- 仓库：https://github.com/google-deepmind/gbench
- PyPI：https://pypi.org/project/gbench/
- 设计宣言：https://github.com/google-deepmind/gbench/blob/main/docs/GOSPEL.md
- 智能体质量层：https://github.com/google-deepmind/gbench/blob/main/docs/quality.md
- Golden Set：https://github.com/google-deepmind/gbench/blob/main/docs/golden-set.md
- 相关（本库，方法论文）：`2026-11-23-agent-eval-product-engineering.md`、`2026-11-17-anthropic-agent-evals.md`、`2026-11-18-openai-eval-best-practices.md`、`2026-11-08-tencent-agent-eval-system.md`
