---
title: "Hermes Agent vs OpenHarness实测：工程实现的两条路径"
date: 2026-04-09
source: 微信公众号
url: https://mp.weixin.qq.com/s/2lsbaUipiVtppS3zy1IPQw
author: Lex 陆徐洲
type: article
tags: [AI产品, 工具, 技术]
---

## 摘要

这篇文章最有价值的地方，不是简单比较两个 Python Agent 框架谁更强，而是把 `Harness Engineering` 真正会踩坑的地方摊开讲清楚了。作者在 Windows 11 上分别实测 `Hermes Agent` 和 `OpenHarness`，发现前者功能更全，但在 OAuth token 读取、工具描述、bash 路径选择等工程细节上存在明显平台假设；后者更像 Claude Code 的 Python 翻译版，开箱体验更顺，但能力边界相对更窄。文章还用同一个代码分析任务比较了两者的真实表现，说明当前 Python 阵营已经开始出现值得借鉴的 Harness 实现。核心结论是：Harness 的难点并不在概念层架构图，而在那些会直接决定 Agent 能不能稳定跑起来的微小工程细节。

## 全文

原始链接：<https://mp.weixin.qq.com/s/2lsbaUipiVtppS3zy1IPQw>

公众号：硅基鹿鸣

作者：Lex 陆徐洲

发布时间：2026-04-08 22:48

## 文章在讲什么

作者正在写一本关于 `Harness Engineering` 实战的书，主体语言选用 Python，因为对数据分析和深度学习从业者来说，Python 的普适性更高。书的后半部分涉及三个实战场景：

- 遗留系统重构
- 高合规行业的 Harness 设计
- 多 Agent 协作开发

这些内容需要真实框架验证，不能只停留在抽象设计层面。于是作者选择了两个近期较火、都以 Python 为主的 Agent 框架做对比实测：

- `Hermes Agent`，来自 Nous Research
- `OpenHarness`，来自香港大学 HKUDS 实验室

作者把它们都装到 Windows 11 上，用同一个任务跑一遍，观察 Python 阵营的 Harness 已经发展到什么程度。

## 1. Hermes Agent：功能成熟，但默认假设你在 Linux/macOS

Hermes 的安装比较直接：

```bash
pip install -e ".[all]"
```

作者遇到的唯一依赖问题是 FastAPI 版本冲突，通过下面的命令即可解决：

```bash
pip install --upgrade fastapi
```

之后 `hermes doctor` 显示 Python 环境、依赖和目录结构都正常，`hermes setup` 的引导配置流程也比较顺。

问题出现在真正连接模型之后。

### 坑 1：OAuth 认证成功，但推理代码读不到 token

作者选择了 Anthropic Provider，并通过 Claude Pro 订阅完成 OAuth 登录。流程本身是成功的，token 也写进了 Hermes 自己的 `auth.json` 文件里。

但实际发消息时，系统返回：

`No inference provider configured.`

继续查源码后，作者发现问题出在 token 解析逻辑。`resolve_anthropic_token()` 会按顺序从下面几个位置查找 token：

- 环境变量 `ANTHROPIC_TOKEN`
- `CLAUDE_CODE_OAUTH_TOKEN`
- Claude Code 凭证文件
- `ANTHROPIC_API_KEY`

也就是说，虽然 OAuth 过程把 token 存进了 Hermes 的 `auth.json`，但真正调用模型时却不会从那里读取，导致“认证成功”与“实际可用”之间断了一环。

解决办法是手动把 token 写进：

```bash
~/.hermes/.env
```

格式如下：

```bash
ANTHROPIC_TOKEN=sk-ant-oat01-你的token
```

之后还需要额外选择模型：

```bash
/model claude-opus-4-6
```

### 坑 2：工具描述写死平台环境，误导了模型判断

连通之后，作者让 Hermes 读取本地 Windows 文件，结果它回答自己“运行在云端 Linux 沙箱里，无法访问本地 Windows 文件系统”。

作者是在 Windows 11 的 `cmd` 中运行的，所以这个回答显然不对。继续看源码后，发现问题出在 `tools/terminal_tool.py` 的工具描述文案被写死为：

- Linux environment
- cloud sandboxes may be cleaned up

模型会把这段描述当成真实运行环境来理解，因此即使本地环境明明是 Windows，它也会错误判断自己的执行上下文。

作者认为，这类问题不是模型能力问题，而是 Harness 给模型喂了错误的系统描述。

### 坑 3：bash 查找策略在 Windows 上容易命中 WSL 空壳入口

Hermes 在 Windows 上需要通过 `shutil.which("bash")` 找到可用的 bash。作者机器上命中的路径是：

```text
C:\Users\luxuzhou\AppData\Local\Microsoft\WindowsApps\bash.exe
```

这其实是 WSL 的 bash 入口，但作者并没有安装 Linux 发行版，所以每次 shell 命令都会失败。

Hermes 源码里其实已经提供了环境变量 `HERMES_GIT_BASH_PATH` 用于手动指定 Git Bash 路径，但默认优先级还是先用 `shutil.which` 的结果，因此 WSL 占位入口被误选中。

可行修复方式是：

```bash
HERMES_GIT_BASH_PATH=C:\Program Files\Git\bin\bash.exe
```

作者总结，Hermes 的功能确实非常成熟，提供：

- 25 个工具
- 71 个 Skills
- 8 个消息平台支持

但它的很多实现默认是面向 Linux 或 macOS 环境设计的。Windows 11 不是不能跑，而是需要开发者自己补齐几个关键配置。

## 2. OpenHarness：更像 Claude Code 的 Python 复刻版

相比之下，OpenHarness 的安装体验更简单：

```bash
uv sync
uv run oh setup
```

在设置过程中，OpenHarness 能自动检测到 `~/.claude/.credentials.json` 里的 Claude 订阅凭证，并一键绑定，这一点对已有 Claude 用户非常友好。

作者提到，它启动时会显示一个明显的 ASCII 艺术字界面：

`OH MY HARNESS!`

可见产品化表达比很多实验型项目更完整。

OpenHarness 也有坑，但只有一个主要问题：默认模型名被终端 ANSI 转义码污染，导致发送给 API 的模型名尾部多出 `[1m]` 这样的格式控制符，最终收到 Anthropic 的 404。

解决方式是手动指定模型环境变量：

```bash
set ANTHROPIC_MODEL=claude-opus-4-6
```

这个问题修掉之后，作者认为它的交互体验和 Claude Code 很像，具备：

- 54 个斜杠命令
- 压缩系统
- 权限模式

甚至其压缩系统注释里直接写着：

`Faithfully translated from Claude Code's compaction system`

作者因此把它概括为“Claude Code 的 Python 翻译版”。

## 3. 两个框架都能继续利用 Claude 订阅

文章还提到一个对当前生态很现实的细节：

在 OpenClaw 被封杀后，很多用户原有的 Claude 订阅入口受影响。但 `Hermes Agent` 和 `OpenHarness` 都支持 Claude Pro/Max 订阅的 OAuth 认证，这意味着：

- 同一份 Claude 订阅
- 换一个 Harness 框架
- 仍然能继续使用

这对已经形成使用习惯的开发者来说，是一个很重要的迁移价值。

## 4. 同任务实测：分析 `harness_py` 代码库

为了不只停留在安装体验层面，作者又做了一个真实任务测试：

让两个框架都去分析配套书稿中的 `harness_py` 代码库。

代码规模为：

- 1470 行 Python
- 11 个文件

任务内容包括：

- 扫描代码结构
- 查找重复逻辑
- 检查未使用 import
- 生成重构报告

### Hermes 的表现

Hermes 的处理方式让作者有些意外。它没有自己串行读文件，而是直接调用 `delegate`，派出子 Agent，一次性读完 11 个文件，然后生成了一份分级报告：

- 高优先级 3 项
- 中优先级 6 项
- 低优先级 7 项

作者认为报告质量不错，其中高优项还准确指出了 `http_client.py` 在重建 Session 时遗漏 `retry` 参数的问题，这属于真实存在的 copy-paste 缺陷。

### OpenHarness 的表现

OpenHarness 运行同一任务时，也碰到了和 Windows/WSL 有关的执行环境问题，但它给出了备选方案，最终也完成了报告输出。

作者没有把它描述成明显弱于 Hermes，而是认为两者都已经能支持有一定复杂度的代码分析任务，只是实现路线和工程取舍不同。

## 5. 作者的结论：两条不同的工程路线

文章最后把两个框架的定位压缩成一句很清楚的话：

- 想要什么都能干，选 Hermes
- 想看清 Harness 每一层怎么搭，选 OpenHarness

进一步展开，就是：

### Hermes 更适合

- 工具和技能更丰富
- 平台接入范围更大
- 更像一个功能成熟的全能型 Agent 框架

但代价是：

- Windows 上要花时间调环境
- 平台假设较强
- 某些实现细节还不够稳

### OpenHarness 更适合

- 想学习 Harness 结构
- 想在 Python 里理解 Claude Code 风格系统怎么实现
- 想更快跑通一个相对可控的最小闭环

但它的能力边界也更明显，功能范围不如 Hermes 宽。

## 6. 真正关键的判断：Harness 难在工程细节，不在概念

作者最终给出两个更重要的判断。

第一，`Harness` 真正难的不是架构图，而是工程细节。

文中提到的几个问题都很典型：

- token 已保存，但调用链不读取
- 工具描述写死环境假设
- bash 路径查找优先级错误

这些问题从代码量看都只是几行实现，但每一个都足以让 Agent 完全无法工作。

第二，Python 阵营终于开始出现值得参考的 Harness 实现。

作者认为：

- Hermes 的 Skill 自生成与 RL 训练管线值得研究
- OpenHarness 对 Claude Code 工作流的忠实翻译也值得拆解

框架本身已经不少，真正稀缺的不是“有没有框架”，而是知道在什么场景下应该怎么配置、怎么取舍、怎么调试的判断力。

作者强调，这种判断力不是单看源码就能获得的，而是必须在真实任务里踩过坑，才能建立起来。
