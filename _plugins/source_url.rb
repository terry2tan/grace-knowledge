# Jekyll 会用页面自身地址覆盖 front matter 里的 url 字段，
# 所以在读取后把原文链接另存为 source_url，供布局显示。
Jekyll::Hooks.register :pages, :post_init do |page|
  data = page.data
  data["has_meta"] = data.key?("title")
  data["source_url"] ||= data["url"] || data["article_url"] || data["original_url"]
end
