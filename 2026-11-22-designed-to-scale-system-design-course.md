---
title: System Design — an interactive course（designed-to-scale.vercel.app）
date: 2026-11-22
source: Dilum Sanjaya（个人项目，Vercel 部署）
url: https://designed-to-scale.vercel.app/
type: repo
tags: [工具, 技术, 方法论]
---

## 摘要

一个纯前端的交互式系统设计课程（作者 Dilum Sanjaya），把「从一台服务器到百万用户」拆成 **9 个模块 / 41 节课 / 445 个可逐步播放的动画步骤**。它不写长文章，而是每节课用一张**会动的架构图**来教一个概念：每一步都有旁白式说明文字，配合实体（服务器、负载均衡器、数据库、队列、用户群）的高亮、失败、变热、变红等状态变化，按方向键一步步推演，让「一致性哈希迁移一个弧」「brain split 两个 leader」「重试风暴」这类抽象机制变成看得见的画面。每节课结构高度统一：**问题（problem）→ 技术（technique）→ 解法（solution）→ 权衡（tradeoff）→ 洞见（insight）→ 小结（recap）**，即 445 步里 120 步在讲「哪里疼」、106 步讲「怎么办」、97 步讲「所以这样修」、20 步明确讲取舍。

信息抓手：全站可离线阅读（内容全在单个 JS bundle 里），支持深浅主题、本地进度记忆（localStorage）、`prefers-reduced-motion` 适配，还有浏览器语音合成朗读（speechSynthesis，可点读）。

## 课程结构（9 模块 41 课）

### 01 Foundations
How a Request Travels（DNS→连接→请求→查库→响应，逐步拆延迟）· Latency & Throughput · Napkin Math（日活→QPS、存储、带宽、缓存大小的量级估算）

### 02 Scaling
Vertical vs Horizontal · Load Balancing（轮询/最少连接/健康检查/备用 LB 与故障切换/按路径路由）· Stateless Services（sticky session 的坑→共享存储→token）· Caching（命中率/失效/淘汰/击穿/布隆过滤器）· Content Delivery（边缘副本/版本化/私有不缓存/origin shield）

### 03 Data & Storage
SQL vs NoSQL（文档型/KV/各自放弃什么）· Indexes（B-tree 为什么浅/写变慢/复合索引列序/EXPLAIN/覆盖索引）· Storage Engines（WAL/checkpoint/B-tree 原地更新 vs LSM-tree/compaction/行列存）· Replication（leader-follower/读副本/复制延迟/read-your-writes/故障切换/三种复制风格）· Sharding（范围 vs 哈希/热点/跨分片查询/加机器搬数据）· Consistent Hashing（环/虚拟节点/顺时针副本）· Unique IDs at Scale（票号服务/号段/UUID/时间前缀/Snowflake/时钟回拨/ID 泄露信息）· CAP & Consistency（分区时选 C 还是 A/时钟问题/quorum/按操作定级别）· Consensus & Leaders（多数派/选举/提交/僵尸 leader 与 fencing token/代价）· Transactions & Isolation（竞态/行锁/原子语句/乐观版本/隔离级别/幻读/死锁/约束/预占-支付-确认）· Files & Media（对象存储/预签名直传/分片上传/转码/CDN/视频自适应/生命周期/公开桶事故）

### 04 Communication
REST, RPC & GraphQL（资源与动词/移动端过载与欠取/RPC/分页/字段改名兼容性）· Message Queues（削峰/加 worker/ack/毒消息与死信/分区内有序/背压）· Pub/Sub & Events（发布订阅解耦/队列 vs 主题/Outbox 模式/历史重放）· Real-time Updates（轮询/长轮询/SSE/WebSocket/多机找到 Alice/离线/presence）

### 05 Reliability
Redundancy & Failover（几个 9/SPOF/两套/可用区/RTO & RPO/混沌工程/坏部署与金丝雀）· Rate Limiting（令牌桶/窗口 vs 桶/多网关共享预算/429 与退避/多租户/过载丢弃）· Timeouts & Retries（超时与兜底/重试风暴/指数退避+抖动/熔断器三态/幂等/截止时间传递/舱壁）· Observability（指标/告警对用户感受/日志/trace 串起一个请求/复盘 post-mortem）

### 06 Architecture
Monolith vs Microservices（按业务能力拆/各自拥有数据/网络成为中间层/分布式单体/联表怎么办/契约测试/绞杀者迁移）· Service Discovery（注册中心/client vs server 端负载/健康就绪与慢启动/注册中心挂了怎么办/service mesh sidecar/API 网关）· Sagas & Distributed Tx（2PC 与其阻塞/saga 分步提交与回滚/编排 vs 协同/无隔离的代价/崩溃恢复/补偿失败/超时即未知）· Batch & Stream Processing（批处理/map-shuffle-reduce/数据倾斜与 combiner/流处理/窗口/迟到与重复事件/分区扩容/去重计数 unique/批流一体）

### 07 Security
Authentication（慢哈希加盐/会话/忘记密码流程/撞库/第二因素/passkey/用身份提供商/令牌被盗）· Authorization（登录≠有权限/每次请求校验归属/批量赋值 role:admin/行级租户隔离/角色/共享关系/策略集中）· Encryption & Secrets（TLS/证书过期/内网也加密/静态加密与密钥异地/密钥轮换/代码里的密钥/密钥管理器/卡号 tokenize/端到端）

### 08 Shipping
Testing（单测/测试替身/集成/契约/端到端/测试金字塔/flaky 测试/负载与故障测试）· CI/CD & Deployments（构建一次逐级晋级/蓝绿/金丝雀/破坏旧版本的迁移/功能开关：部署≠发布/度量交付本身）

### 09 Whole Systems
HLD & LLD（两级视角/高层是 trade-off/低层看状态与 schema 与边界/契约在哪相接/在错的层级设计）· Design a URL Shortener（哈希 vs 计数编码/可猜的短码/读多缓存/301 还是 302/3TB 键分散存储/不拖慢的点击统计/防滥用）· Design a News Feed（拉模式→推模式→只存 id→大 V 混合→僵尸用户/cursor 分页/缓存被清空）· Design a Chat System（单机两 socket→百机找 Bob 的注册表→先落库再转发→离线补发→重复消息去重→群聊存一份投多份→presence 单独规则→网关挂掉）

## 为什么值得存

- **形态本身就是答案**：这套课是「解释复杂系统」的一个很硬的范式——不用文字堆叠，用一个能暂停、能重放的动态图，把「失败」和「状态变化」直接演给你看。做投研仪表盘、Agent 架构讲解、内部技术分享时都可以借这个壳。
- **课程骨架可以直接当 checklist 用**：9 模块 41 课刚好覆盖系统设计面试与生产落地的全部主干，每课又有统一的「问题→技术→解法→取舍→洞见」走法，比读三本 DDIA 摘要更省时间。
- **可抓取性**：所有文字与场景定义都在前端 bundle 里（`/assets/index-*.js`），无需浏览器即可批量提取——如果你想把内容转成 markdown 知识库、或者喂给模型做 RAG，路径是通的。
- 作者是 Dilum Sanjaya；纯静态 SPA，无后端、无登录、无追踪。

## 链接

- https://designed-to-scale.vercel.app/
