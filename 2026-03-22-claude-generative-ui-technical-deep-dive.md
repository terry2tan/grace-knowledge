# Claude 生成式 UI 技术原理深度解析

> 来源：基于 Michael Livs 对 claude.ai 生成式 UI 的逆向工程分析
> 参考：https://michaellivs.com/blog/reverse-engineering-claude-generative-ui/

---

## 一、什么是生成式 UI

Claude 的生成式 UI（Generative UI）是 Artifacts 功能的升级形态。区别在于：

| 对比项 | 传统 Artifacts | 生成式 UI |
|--------|----------------|-----------|
| 渲染时机 | 生成完成后展示 | 边生成边渲染 |
| 渲染位置 | 独立预览窗口 | 内嵌在对话流中 |
| 交互性 | 静态/有限 | 实时双向 |
| 视觉效果 | 一次性出现 | 内容"长出来" |

核心思想：**不是生成代码，而是生成活的界面**。滑块、图表、动画在 Claude 还没写完时就已经出现在屏幕上。

---

## 二、整体数据流

```
用户发消息
  ↓
Claude 调用 visualize_read_me 工具（加载设计规范文档）
  ↓
Claude 调用 show_widget 工具（携带 HTML 代码作为参数）
  ↓
客户端拦截流式 token → partial JSON parser 提取 widget_code 字段
  ↓
每收到新 token → 调用 _setContent(html) → morphdom 最小化 DOM patch
  ↓
新节点触发 fadeIn 动画 → 用户看到内容"长出来"
  ↓
HTML 全部到达 → _runScripts() 激活所有 <script>
```

---

## 三、工具调用结构

Claude 通过两个工具协作完成渲染，这是整个机制的入口。

### 第一步：`visualize_read_me`（强制先调用）

```json
{
  "modules": ["interactive", "chart", "diagram", "mockup", "art"]
}
```

这是一个**编译时约束**：Claude 必须先"读文档"才能使用 `show_widget`。按需加载设计规范，避免把所有规范塞进 system prompt 浪费 token。

### 第二步：`show_widget`（实际渲染）

```typescript
{
  "i_have_seen_read_me": true,          // 证明已读过文档
  "title": "budget_tracker",            // snake_case 标识符
  "loading_messages": ["Building...", "Almost there"],  // 加载提示文字
  "widget_code": "<div>...html...</div>"  // 核心：原始 HTML 片段（不含 DOCTYPE/body）
}
```

`widget_code` 就是随着 LLM 生成 token **逐字符流式到达**客户端的 HTML 内容。

---

## 四、HTML 流式渲染机制

**关键点**：不等 HTML 写完，边收 token 边渲染。

```
LLM 生成 token
  ↓
widget_code 参数以 JSON 字符串碎片方式到达（partial JSON）
  ↓
客户端做增量 JSON 解析，提取出当前已有的不完整 HTML
  ↓
塞进 DOM（_setContent 调用）
  ↓
CSS 变量立即生效（同一 document，直接继承）
  ↓
<script> 标签等全部到达后统一执行（_runScripts）
```

**HTML 内部结构约定**（streaming-first 设计）：
```
style（短）→ 内容 HTML → script（最后）
```
这样用户能最早看到样式和内容，JS 逻辑最后才执行，不阻塞视觉呈现。

---

## 五、morphdom DOM 差分更新

### 为什么需要它

每次收到新 token 就直接 `root.innerHTML = newHTML`，会导致整个区域**全量重绘**，产生闪烁，且已渲染的交互状态（比如输入框内容）会丢失。

### 实现代码

```javascript
window._setContent = function(html) {
  var root = document.getElementById('root');
  var target = document.createElement('div');
  target.innerHTML = html;  // 先在内存中构建新 DOM 树

  morphdom(root, target, {
    onBeforeElUpdated: function(from, to) {
      // 节点没变就跳过，不触发任何 DOM 操作
      if (from.isEqualNode(to)) return false;
      return true;
    },
    onNodeAdded: function(node) {
      // 新增节点加淡入动画，用户看到内容"长出来"
      node.style.animation = '_fadeIn 0.3s ease both';
    }
  });
};
```

```css
@keyframes _fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

**morphdom 的工作原理**：对比 `root`（当前 DOM）和 `target`（新 DOM），只更新差异节点，其他节点原地保留。`isEqualNode()` 是关键——相同节点直接跳过，不碰 DOM。

---

## 六、Script 标签的特殊处理

`innerHTML` 插入的 `<script>` 标签不会自动执行（浏览器安全限制）。解决方案：

```javascript
window._runScripts = function() {
  document.querySelectorAll('#root script').forEach(function(old) {
    var s = document.createElement('script');
    if (old.src) {
      s.src = old.src;                    // 外部脚本
    } else {
      s.textContent = old.textContent;    // 内联脚本
    }
    old.parentNode.replaceChild(s, old);  // 替换节点 → 触发浏览器执行
  });
};
```

等 HTML streaming 全部结束后调用一次 `_runScripts()`，所有脚本统一激活。

---

## 七、宿主容器（Shell HTML）

Widget **不在 iframe 里**，而是直接注入到宿主页面的 `<div id="root">` 中。

```html
<!DOCTYPE html>
<html>
<body style="margin:0;background:var(--color-background)">
  <div id="root"></div>

  <style>
    @keyframes _fadeIn {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }
  </style>

  <!-- 异步加载 morphdom -->
  <script src="https://cdn.jsdelivr.net/npm/morphdom@2.6.1"></script>
  <script>
    window._morphReady = false;
    window._pending = null;

    window._setContent = function(html) {
      // morphdom 还没加载好时，先缓冲
      if (!window._morphReady) { window._pending = html; return; }

      var target = document.createElement('div');
      target.innerHTML = html;
      morphdom(document.getElementById('root'), target, {
        onBeforeElUpdated: (from, to) => !from.isEqualNode(to),
        onNodeAdded: (node) => node.style.animation = '_fadeIn 0.3s ease both'
      });
    };
  </script>
  <script onload="
    window._morphReady = true;
    if (window._pending) {
      window._setContent(window._pending);
      window._pending = null;
    }
  "></script>
</body>
</html>
```

**不用 iframe 的关键原因**：CSS 变量（`--color-text-primary` 等）从父页面直接继承，设计系统变量无需额外传递，样式天然统一。

允许的外部 CDN：`cdnjs.cloudflare.com`、`cdn.jsdelivr.net`、`unpkg.com`、`esm.sh`

---

## 八、客户端流式拦截实现

客户端如何在 streaming 过程中实时拿到不完整的 HTML：

```typescript
// 监听每个流式 delta 事件
client.on("message_update", async (event) => {
  const raw = event.assistantMessageEvent;

  if (raw.type === "toolcall_delta") {
    const block = raw.partial.content[raw.contentIndex];
    // partial JSON parser 已经解析出当前积累的完整字段值
    const html = block.arguments?.widget_code;

    if (html && html.length > 20) {  // 有足够内容才开始渲染
      if (!streaming.window) {
        streaming.window = open(shellHTML());  // 首次：创建宿主窗口
      }
      // 把当前已有的 HTML 发给 window，触发 morphdom 更新
      streaming.window.send(`_setContent('${escapeJS(html)}')`);
    }
  }
});
```

**关键**：partial JSON parser 在每个 delta 到达时，都能输出当前已积累的完整字段值（而不是损坏的 JSON）。这是流式渲染的基础能力。

### JS 字符串转义

传入 `_setContent` 时需要转义，防止注入：

```typescript
function escapeJS(s: string): string {
  return s
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/<\/script>/gi, '<\\/script>');
}
```

---

## 九、设计系统的懒加载架构

### 问题
把所有设计规范塞进 system prompt 太浪费 token（5 个模块共约 136KB）。

### 解法：按需组合 + 去重

```typescript
// 5 个模块，10 个唯一规范章节，共享复用
const MODULE_SECTIONS = {
  interactive: ["core", "ui-components", "colors"],
  chart:       ["core", "ui-components", "colors", "charts"],
  mockup:      ["core", "ui-components", "colors"],
  art:         ["core", "svg-setup", "art-rules"],
  diagram:     ["core", "colors", "svg-setup", "diagram-types"],
};

export function getGuidelines(modules: string[]): string {
  let content = CORE;
  const seen = new Set<string>();

  for (const mod of modules) {
    const sections = MODULE_SECTIONS[mod];
    for (const section of sections) {
      if (!seen.has(section)) {       // 多个模块共享的章节只加一次
        seen.add(section);
        content += "\n\n" + SECTIONS[section];
      }
    }
  }
  return content;
}
```

### 设计规范核心约束

- **颜色**：必须用 CSS 变量（`--color-text-primary` 等），禁止硬编码
- **深色模式**：所有颜色必须同时支持
- **字体**：只用两个字重（400、500）
- **大小写**：全部 Sentence case
- **渐变/阴影/模糊**：禁用（影响 streaming 性能）
- **代码结构**：`style → HTML → script`（streaming-first 顺序）

### 颜色系统示例

```
Purple: #EEEDFE → #CECBF6 → #AFA9EC → #7F77DD → #534AB7 → #3C3489 → #26215C
Teal:   #E1F5EE → #9FE1CB → #5DCAA5 → #1D9E75 → #0F6E56 → #085041 → #04342C
```

规则：彩色背景上的文字必须使用同色系的 800/900 色阶。

---

## 十、完整技术栈总结

```
┌─────────────────────────────────────────────┐
│  LLM token stream (SSE)                     │
│    ↓ widget_code 字段逐字符到达              │
│  Partial JSON Parser                        │
│    ↓ 提取当前完整的 HTML 字符串              │
│  escapeJS 转义                              │
│    ↓                                        │
│  window.send(`_setContent('...')`)          │
│    ↓ 发给 WebView                           │
│  morphdom(root, newDOM)                     │
│    ├── 已有节点：isEqualNode → 跳过          │
│    └── 新节点：fadeIn 动画 → 出现            │
│    ↓ streaming 结束                         │
│  _runScripts()                              │
│    ↓ 替换 script 节点 → 激活 JS             │
│  完整可交互 Widget ✓                         │
└─────────────────────────────────────────────┘
```

**核心技术选型**：
- 流式传输：SSE (Server-Sent Events)
- JSON 解析：Partial/incremental JSON parser
- DOM 更新：morphdom（最小化 patch）
- 安全过滤：DOMPurify
- 原生窗口（第三方实现）：WKWebView（macOS）

---

## 十一、参考资料

- [Reverse-engineering Claude's generative UI](https://michaellivs.com/blog/reverse-engineering-claude-generative-ui/)
- [GitHub - pi-generative-ui](https://github.com/Michaelliv/pi-generative-ui)
- [What Is Claude's On-Demand Generative UI?](https://www.mindstudio.ai/blog/claude-on-demand-generative-ui-vs-canvas-artifacts)
- [Show HN: Generative UI OSS](https://news.ycombinator.com/item?id=45685635)
