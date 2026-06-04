# 用 Python + Claude 替代 $32,000/年的 Bloomberg Terminal

**来源**: X Article / @heygurisingh（Guri Singh）
**链接**: https://x.com/i/article/2030319235759828992
**日期**: 2026-03-08
**标签**: #投资 #量化 #Python #Claude #自动化 #股票筛选

---

## 核心观点

Bloomberg Terminal 每年 $31,980（约22万人民币）。AI 让其中 80% 的功能可以免费实现。

本文构建一个每天早市前自动运行的 AI 股票筛选器：
- 拉取实时数据 → 多因子筛选 → Claude AI 情绪分析 → 发送邮件日报
- **总成本：$0~$20/月**（Bloomberg 的 0.06%）

---

## 技术栈（全部免费）

| 工具 | 用途 | 费用 |
|------|------|------|
| Python 3.10+ | 核心语言 | 免费 |
| yfinance | Yahoo Finance 市场数据 | 免费开源 |
| pandas | 数据处理和筛选 | 免费 |
| Claude API (Haiku) | AI 情绪分析 | 免费层 / ~$0.25/天 |
| smtplib | Gmail 邮件推送 | 免费 |
| cron / Task Scheduler | 定时自动化 | 免费内置 |
| GitHub Actions | 云端运行（无需开机） | 免费（2000分钟/月） |

---

## 五步搭建指南

### Step 1：安装依赖

```bash
mkdir ai-stock-screener && cd ai-stock-screener
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install yfinance pandas anthropic schedule python-dotenv
```

`.env` 文件：
```
ANTHROPIC_API_KEY=your_claude_api_key_here
EMAIL_ADDRESS=your_email@gmail.com
EMAIL_PASSWORD=your_app_password_here  # Gmail App Password，不是普通密码
```

### Step 2：多因子筛选（机构级标准）

| 筛选条件 | 逻辑 |
|----------|------|
| P/E 5~25 | 排除高估值炒作股和无盈利公司 |
| RSI 30~70 | 避免超买超卖极端，捕捉动能甜蜜点 |
| 成交量 > 均量 1.5x | 机构资金流入信号，聪明钱总先出现在成交量 |
| 价格 > 50日均线 | 确认上升趋势，不接下跌刀 |
| 金叉（20日SMA > 50日SMA）| 最可靠的看涨信号之一 |

### Step 3：Claude AI 情绪分析层

- 对通过技术筛选的股票，用 Claude Haiku 分析近期新闻标题情绪
- 每天约 10 次 API 调用，成本几乎为零
- 提供彭博内置工具也无法如此低价复制的定性优势

### Step 4：HTML 邮件报告

- 彩色编码的情绪得分
- 价格走势迷你图
- 关键指标汇总表
- 每天 8:30 AM ET（开市前 60 分钟）自动发送到邮箱

### Step 5：自动化（三种方式）

**方案 A：Cron（Mac/Linux）**
```
30 8 * * 1-5 cd /path/to/ai-stock-screener && /path/to/venv/bin/python screener.py >> logs/screener.log 2>&1
```

**方案 B：Windows 任务计划程序**
设置每天工作日 8:30 AM 触发，指向 Python 执行文件 + screener.py

**方案 C：GitHub Actions（推荐，无需电脑开机）**
- 创建 `.github/workflows/screener.yml`
- GitHub Actions cron 使用 UTC 时间：8:30 AM ET = 12:30 PM UTC（EDT）/ 1:30 PM UTC（EST）
- 每月 2000 分钟免费额度，每次运行 3~5 分钟，完全够用

---

## 进阶筛选策略

- **财报临近过滤器**：临近财报日的股票波动性更大
- **内部人买入检测**：`stock.insider_transactions` 中检测 Purchase 记录，高管买自家股票值得关注
- **板块轮动追踪**：识别哪个板块资金流入最多，当资金从科技转向医疗时第一时间捕捉

---

## 常见问题排查

| 问题 | 解决方法 |
|------|---------|
| yfinance 返回空数据 | 加 `time.sleep(0.5)` 间隔 + 重试逻辑 |
| Gmail SMTP 认证失败 | 必须用 App Password，不是普通密码（Google账号 > 安全 > 2FA > 应用专用密码） |
| Cron 不运行 | 所有路径用绝对路径；用 `crontab -l` 验证 |
| Claude API 返回格式错误 | JSON 解析加 try/except，strip 掉 markdown 反引号 |
| GitHub Actions 时间不对 | 注意 UTC vs ET 时区换算 |

---

## Bloomberg vs 自建筛选器

| 维度 | Bloomberg | 自建 AI 筛选器 |
|------|-----------|--------------|
| 年费用 | $31,980 | $0~$240 |
| 实时毫秒级数据 | ✅ | ❌ |
| 固定收益覆盖 | ✅ | ❌ |
| 专业人士聊天网络 | ✅（32.5万用户）| ❌ |
| 股票筛选能力 | ✅ | ✅（80%对等）|
| 定制化 | 有限 | 完全自由 |
| 适合人群 | 大型机构、高频交易 | 零售投资者、独立交易者、小型基金 |

> **结论**：如果你是机构高频交易员，仍需要 Bloomberg。如果你是散户、独立交易者或小型基金，你刚用 $0~$20/月构建了 Bloomberg 80% 的股票筛选能力。

---

*免责声明：本文仅供教育目的，不构成投资建议。*
