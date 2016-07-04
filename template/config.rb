patterns = resources.each_with_object({}) do |resource, result|
  next unless resource.path.start_with?('patterns/')

  resource.path =~ /^patterns\/(.+)\/(.+)\/.+$/
  foldername = $1.downcase.parameterize
  filename = $2.downcase.parameterize
  path = "#{foldername}/#{filename}".to_sym

  result[path] ||= []
  result[path] << OpenStruct.new(
    {
      category: foldername.capitalize,
      subcategory: filename.capitalize,
      link: "/patterns/#{path}.html",
      body: resource.render
    }.merge(resource.data)
  )
end

patterns.each do |path, patterns|
  proxy "/patterns/#{path}.html", '/template.html',
    locals: { patterns: patterns }
end

collection :patterns, patterns

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# With alternative layout
# page "/path/to/file.html", layout: :otherlayout

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", locals: {
#  which_fake_page: "Rendering a fake page with a local variable" }

# General configuration

# Middleman-Sprockets - https://github.com/middleman/middleman-sprockets
activate :sprockets

# Middleman-Syntax - https://github.com/middleman/middleman-syntax
set :markdown_engine, :redcarpet
set :markdown, fenced_code_blocks: true, smartypants: true, footnotes: true,
  link_attributes: { rel: 'nofollow' }, tables: true
activate :syntax

###
# Helpers
###

# Methods defined in the helpers block are available in templates
helpers do
  def navigation
    navigation = {}
    collection(:patterns).values.flatten.each do |pattern|
      key = pattern.category
      navigation[key] ||= []
      options = OpenStruct.new({
        name: pattern.subcategory,
        link: pattern.link
      })
      navigation[key] << options unless navigation[key].include?(options)
    end
    navigation
  end

  def page_title
    if current_page.data.title.present?
      current_page.data.title
    else
      current_page.locals[:patterns].first.subcategory
    end
  end
end

# Build-specific configuration
configure :build do
  # Minify CSS on build
  # activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript

  # Use relative URLs
  # activate :relative_assets
  # set :relative_links, true

  # Ignoring Files
  ignore '/template.html'
  ignore '/stylesheets/mpl/vendor/*'
end
