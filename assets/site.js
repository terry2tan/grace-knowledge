(function () {
  "use strict";
  var GK = window.GK || {};
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };

  // ---------- 偏好（主题 / 字号 / 字体） ----------
  var prefs = {};
  try { prefs = JSON.parse(localStorage.getItem("gk-prefs") || "{}"); } catch (e) {}
  function savePrefs() { try { localStorage.setItem("gk-prefs", JSON.stringify(prefs)); } catch (e) {} }
  function isDark() {
    var t = document.documentElement.dataset.theme;
    return t ? t === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-action]");
    if (!btn) return;
    var root = document.documentElement;
    switch (btn.dataset.action) {
      case "theme":
        prefs.theme = isDark() ? "light" : "dark";
        root.dataset.theme = prefs.theme;
        break;
      case "bigger":
      case "smaller":
        var size = prefs.size || 17;
        size = Math.min(22, Math.max(14, size + (btn.dataset.action === "bigger" ? 1 : -1)));
        prefs.size = size;
        root.style.setProperty("--reading-size", size + "px");
        break;
      case "font":
        prefs.font = root.dataset.font === "serif" ? "" : "serif";
        if (prefs.font) root.dataset.font = prefs.font; else delete root.dataset.font;
        break;
      case "ai-open": openAI(); return;
      case "ai-close": closeAI(); return;
      default: return;
    }
    savePrefs();
  });

  if (document.body.classList.contains("is-home")) initHome();
  if (document.body.classList.contains("is-article")) initArticle();

  // ---------- 首页：筛选、日期导航 ----------
  function initHome() {
    var q = $("#q"), info = $("#result-info"), empty = $("#empty");
    var cards = $$(".card"), days = $$(".day"), chips = $$(".chip[data-tag]");
    var navLinks = $$(".timeline a[data-date]");
    var activeTag = "";
    cards.forEach(function (c) { c._text = c.textContent.toLowerCase(); c._tags = (c.dataset.tags || "").split("|"); });

    function apply() {
      var term = q.value.trim().toLowerCase(), shown = 0;
      cards.forEach(function (c) {
        var ok = (!activeTag || c._tags.indexOf(activeTag) >= 0) && (!term || c._text.indexOf(term) >= 0);
        c.hidden = !ok;
        if (ok) shown++;
      });
      days.forEach(function (d) {
        var n = $$(".card:not([hidden])", d).length;
        d.hidden = n === 0;
        $(".day-count", d).textContent = n + " 篇";
        var link = $('.timeline a[data-date="' + d.dataset.date + '"]');
        if (link) link.classList.toggle("is-dim", n === 0);
      });
      var filtering = term || activeTag;
      info.hidden = !filtering;
      info.textContent = filtering ? "找到 " + shown + " 篇" + (activeTag ? "（标签：" + activeTag + "）" : "") : "";
      empty.hidden = shown > 0;
    }

    function setTag(tag) {
      activeTag = tag;
      chips.forEach(function (c) { c.classList.toggle("is-on", c.dataset.tag === tag); });
      apply();
    }

    q.addEventListener("input", apply);
    chips.forEach(function (c) {
      c.addEventListener("click", function () {
        var tag = c.dataset.tag === activeTag ? "" : c.dataset.tag;
        history.replaceState(null, "", tag ? "#tag=" + encodeURIComponent(tag) : location.pathname);
        setTag(tag);
      });
    });
    var m = location.hash.match(/^#tag=(.+)$/);
    if (m) setTag(decodeURIComponent(m[1]));

    // 今天 / 昨天 标记
    var today = new Date(), fmt = function (d) {
      return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
    };
    var y = new Date(today); y.setDate(today.getDate() - 1);
    var badges = {}; badges[fmt(today)] = "今天"; badges[fmt(y)] = "昨天";
    days.forEach(function (d) {
      if (!badges[d.dataset.date]) return;
      var b = document.createElement("span");
      b.className = "day-badge"; b.textContent = badges[d.dataset.date];
      $(".day-week", d).after(b);
    });

    // 滚动时高亮左侧对应日期
    if ("IntersectionObserver" in window && navLinks.length) {
      var byDate = {};
      navLinks.forEach(function (a) { byDate[a.dataset.date] = a; });
      var current;
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          var a = byDate[en.target.dataset.date];
          if (!a || a === current) return;
          if (current) current.classList.remove("is-active");
          current = a; a.classList.add("is-active");
          var month = a.closest("details");
          if (month && !month.open) month.open = true;
          var nav = a.closest(".timeline"), top = a.offsetTop - nav.offsetTop;
          if (top < nav.scrollTop || top > nav.scrollTop + nav.clientHeight - 40) nav.scrollTop = top - 80;
        });
      }, { rootMargin: "-200px 0px -60% 0px" });
      days.forEach(function (d) { io.observe(d); });
    }
  }

  // ---------- 文章页：排版增强 ----------
  function initArticle() {
    var body = $("#post-body");
    if (!body) return;

    // 外部链接新标签页打开
    $$("a[href]", body).forEach(function (a) {
      if (a.host && a.host !== location.host) { a.target = "_blank"; a.rel = "noopener"; }
    });
    // 宽表格横向滚动
    $$("table", body).forEach(function (t) {
      var w = document.createElement("div"); w.className = "table-scroll";
      t.parentNode.insertBefore(w, t); w.appendChild(t);
    });
    $$("img", body).forEach(function (img) { img.loading = "lazy"; img.referrerPolicy = "no-referrer"; });
    $$("h2", body).forEach(function (h) { if (h.textContent.trim() === "摘要") h.classList.add("sum-head"); });

    // 目录
    var heads = $$("h2, h3", body).filter(function (h) { return h.id && !h.classList.contains("sum-head"); });
    var toc = $("#toc"), tocLinks = [];
    if (heads.length >= 2) {
      heads.forEach(function (h) {
        var a = document.createElement("a");
        a.href = "#" + encodeURIComponent(h.id);
        a.textContent = h.textContent;
        a.className = h.tagName === "H3" ? "lv3" : "lv2";
        toc.appendChild(a); tocLinks.push(a);
      });
    }

    // 阅读进度 + 目录高亮
    var bar = $(".progress span"), ticking = false;
    function onScroll() {
      ticking = false;
      var rect = body.getBoundingClientRect();
      var total = rect.height - window.innerHeight + 160;
      var pct = Math.min(1, Math.max(0, (-rect.top + 120) / Math.max(total, 1)));
      if (bar) bar.style.width = (pct * 100).toFixed(1) + "%";
      var idx = -1;
      for (var i = 0; i < heads.length; i++) { if (heads[i].getBoundingClientRect().top < 100) idx = i; else break; }
      tocLinks.forEach(function (a, i) { a.classList.toggle("is-active", i === idx); });
    }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
    onScroll();

    initAI(body);
  }

  // ---------- 与 AI 讨论 ----------
  var ai; // 由 initAI 赋值
  function initAI(body) {
    var cfg = GK.ai || {};
    ai = {
      panel: $("#ai-panel"), fab: $(".ai-fab"), log: $("#ai-log"), input: $("#ai-input"),
      note: $("#ai-note"), endpoint: cfg.endpoint || "", providers: cfg.providers || [], history: [],
      articleText: function () {
        var text = body.innerText.replace(/\n{3,}/g, "\n\n").trim();
        return text.length > 60000 ? text.slice(0, 60000) + "\n…（后文已截断）" : text;
      }
    };
    var actions = $("#ai-actions");
    if (ai.endpoint) {
      addButton(actions, "发送", "", function () { askEndpoint(); });
      ai.note.textContent = "回答由你配置的 AI 接口生成。Ctrl/⌘ + Enter 发送。";
    } else {
      ai.providers.forEach(function (p, i) {
        addButton(actions, "复制并打开 " + p.name, i ? "ghost" : "", function () { copyAndOpen(p.url); });
      });
      addButton(actions, "仅复制", "ghost", function () { copyAndOpen(null); });
      ai.note.textContent = "会把「你的问题 + 文章全文」复制到剪贴板，在打开的 AI 页面里粘贴（Ctrl/⌘ + V）即可开始讨论。";
    }
    $$(".ai-presets button").forEach(function (b) {
      b.addEventListener("click", function () { ai.input.value = b.dataset.prompt; ai.input.focus(); });
    });
    $("#ai-form").addEventListener("submit", function (e) { e.preventDefault(); });
    ai.input.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); actions.querySelector("button").click(); }
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !ai.panel.hidden) closeAI(); });
  }

  function addButton(parent, label, cls, fn) {
    var b = document.createElement("button");
    b.type = "button"; b.textContent = label; if (cls) b.className = cls;
    b.addEventListener("click", fn); parent.appendChild(b);
  }
  function openAI() { if (!ai) return; ai.panel.hidden = false; ai.fab.hidden = true; ai.input.focus(); }
  function closeAI() { if (!ai) return; ai.panel.hidden = true; ai.fab.hidden = false; }

  function buildPrompt(question) {
    var a = GK.article || {};
    return [
      "我在读下面这篇文章，想和你讨论。",
      "",
      "【我的问题】",
      question || "先用几句话概括这篇文章，然后告诉我最值得深入讨论的点。",
      "",
      "【文章】《" + (a.title || document.title) + "》",
      a.source ? "原文：" + a.source : "",
      "",
      ai.articleText()
    ].join("\n");
  }

  function copyAndOpen(url) {
    var text = buildPrompt(ai.input.value.trim());
    var done = function (ok) {
      ai.note.textContent = ok ? "已复制（" + text.length + " 字）。在新页面粘贴后发送即可。" : "复制失败，请手动选择文章内容复制。";
      if (url) window.open(url, "_blank", "noopener");
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(fallbackCopy(text)); });
    } else {
      done(fallbackCopy(text));
    }
  }
  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    var ok = false; try { ok = document.execCommand("copy"); } catch (e) {}
    ta.remove(); return ok;
  }

  // 自建接口约定：POST JSON { article: {title, url, content}, messages: [{role, content}] }
  // 返回 JSON { reply: "..." }，或直接以纯文本流式返回。
  function askEndpoint() {
    var question = ai.input.value.trim();
    if (!question) return;
    ai.input.value = "";
    ai.history.push({ role: "user", content: question });
    appendMsg("user", question);
    var bot = appendMsg("bot", "思考中…");
    var a = GK.article || {};
    fetch(ai.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ article: { title: a.title, url: location.href, content: ai.articleText() }, messages: ai.history })
    }).then(function (res) {
      if (!res.ok) throw new Error("HTTP " + res.status);
      if ((res.headers.get("content-type") || "").indexOf("json") >= 0) {
        return res.json().then(function (j) { bot.textContent = j.reply || ""; return bot.textContent; });
      }
      var reader = res.body.getReader(), dec = new TextDecoder(), acc = "";
      bot.textContent = "";
      return (function pump() {
        return reader.read().then(function (r) {
          if (r.done) return acc;
          acc += dec.decode(r.value, { stream: true });
          bot.textContent = acc; ai.log.scrollTop = ai.log.scrollHeight;
          return pump();
        });
      })();
    }).then(function (reply) {
      ai.history.push({ role: "assistant", content: reply });
    }).catch(function (err) {
      bot.textContent = "请求失败：" + err.message;
      ai.history.pop();
    });
  }
  function appendMsg(role, text) {
    var p = document.createElement("div");
    p.className = "ai-msg " + role; p.textContent = text;
    ai.log.appendChild(p); ai.log.scrollTop = ai.log.scrollHeight;
    return p;
  }
})();
