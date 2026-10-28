# 根据各篇文章的 front matter 生成按天分组的首页数据，
# 并给每篇文章补上阅读时长、上一篇/下一篇等信息。
# OpenClaw 只需照常写入 markdown 文件，首页会在构建时自动更新。
require "json"

module GraceKnowledge
  DATE_PREFIX = /\A(\d{4}-\d{2}-\d{2})-/
  WEEKDAYS = %w[周日 周一 周二 周三 周四 周五 周六].freeze

  class IndexGenerator < Jekyll::Generator
    safe true
    priority :low

    def generate(site)
      index_rows = parse_index(site)
      articles = site.pages.select { |p| article?(p) }.map { |p| build_entry(site, p, index_rows) }.compact
      articles.sort_by! { |a| [a["date"], a["sort_key"]] }.reverse!

      articles.each_with_index do |a, i|
        page = a.delete("page")
        newer = articles[i - 1] if i > 0
        older = articles[i + 1]
        page.data["reading_minutes"] = a["minutes"]
        page.data["display_date"] = a["date"]
        page.data["newer_article"] = newer && { "title" => newer["title"], "url" => newer["url"] }
        page.data["older_article"] = older && { "title" => older["title"], "url" => older["url"] }
        page.data["is_article"] = true
      end
      articles.each { |a| a.delete("sort_key") }

      days = articles.group_by { |a| a["date"] }.map do |date, items|
        d = Date.parse(date)
        { "date" => date, "month" => date[0, 7], "label" => "#{d.month}月#{d.day}日",
          "weekday" => WEEKDAYS[d.wday], "year" => d.year, "articles" => items }
      end
      months = days.group_by { |d| d["month"] }.map do |m, ds|
        { "month" => m, "label" => "#{m[0, 4]}年#{m[5, 2].to_i}月",
          "count" => ds.sum { |d| d["articles"].size }, "days" => ds }
      end
      tags = articles.flat_map { |a| a["tags"] }.tally.sort_by { |t, n| [-n, t] }.map { |t, n| { "name" => t, "count" => n } }

      site.data["kb"] = { "days" => days, "months" => months, "tags" => tags, "total" => articles.size }

      home = Jekyll::PageWithoutAFile.new(site, site.source, "", "index.html")
      home.data.merge!("layout" => "home", "title" => site.config["title"], "is_home" => true)
      site.pages << home

      # 供前端搜索和后续 AI 功能使用的文章清单
      json = Jekyll::PageWithoutAFile.new(site, site.source, "", "articles.json")
      json.content = JSON.generate(articles.map { |a| a.slice("date", "title", "url", "source", "tags", "type", "summary") })
      json.data["layout"] = nil
      site.pages << json
    end

    private

    def article?(page)
      return false unless page.ext == ".md" && page.dir == "/"
      return false if page.name == "INDEX.md"
      page.name.match?(DATE_PREFIX) || page.data.key?("title")
    end

    def build_entry(site, page, index_rows)
      date = page.name[DATE_PREFIX, 1] || normalize_date(page.data["date"]) || normalize_date(page.data["captured_at"])
      return nil unless date

      row = index_rows[page.name] || {}
      body = page.content.to_s
      # 早期部分文章没有 front matter，标题取正文第一个 # 标题，来源/标签取 INDEX.md
      page.data["title"] ||= body[/^#\s+(.+)$/, 1]&.strip || row["title"] || page.basename
      page.data["source"] ||= row["source"] if row["source"]
      tags = Array(page.data["tags"]).map(&:to_s)
      tags = row["tags"] if tags.empty? && row["tags"]
      page.data["tags"] = tags
      {
        "page" => page,
        "date" => date,
        # 同一天内沿用 INDEX.md 的顺序（新的在前）
        "sort_key" => -(row["position"] || 99_999),
        "title" => row["title"] || page.data["title"].to_s,
        "url" => "#{site.baseurl}#{page.url}",
        "source" => (page.data["source"] || row["source"]).to_s,
        "type" => page.data["type"].to_s,
        "tags" => tags,
        "summary" => row["summary"] || extract_summary(body),
        "minutes" => reading_minutes(body),
      }
    end

    def normalize_date(value)
      return nil if value.nil?
      return value.strftime("%Y-%m-%d") if value.respond_to?(:strftime)
      value.to_s[/\d{4}-\d{2}-\d{2}/]
    end

    # INDEX.md 里有 OpenClaw 写好的精简标题和一句话摘要，优先使用
    def parse_index(site)
      index = site.pages.find { |p| p.name == "INDEX.md" && p.dir == "/" }
      return {} unless index

      index.content.to_s.each_line.with_index.each_with_object({}) do |(line, pos), rows|
        m = line.match(/\A\|\s*\d{4}-\d{2}-\d{2}\s*\|\s*\[(.+?)\]\((.+?)\)\s*\|(.*)\|\s*\z/)
        next unless m

        cells = m[3].split("|").map(&:strip)
        rows[File.basename(m[2])] = {
          "title" => m[1].strip,
          "source" => cells[0],
          "tags" => cells[1].to_s.scan(/`([^`]+)`/).flatten,
          "summary" => cells[2..].to_a.join("|").strip,
          "position" => pos,
        }.reject { |_, v| v.respond_to?(:empty?) && v.empty? }
      end
    end

    def extract_summary(body)
      text = body[/^##\s*摘要\s*\n+(.+?)(?:\n\s*\n|\z)/m, 1] ||
             body.split(/\n\s*\n/).find { |para| para !~ /\A\s*(#|!\[|>|\||```|---)/ }
      return "" unless text

      plain = text.gsub(/!\[[^\]]*\]\([^)]*\)/, "").gsub(/\[([^\]]*)\]\([^)]*\)/, '\1').gsub(/[*_`>#]/, "").strip
      plain.length > 140 ? "#{plain[0, 140]}…" : plain
    end

    # 中文约 400 字/分钟，英文约 220 词/分钟
    def reading_minutes(body)
      cjk = body.scan(/\p{Han}/).size
      words = body.gsub(/\p{Han}/, " ").scan(/[A-Za-z0-9]+/).size
      [(cjk / 400.0 + words / 220.0).ceil, 1].max
    end
  end
end
