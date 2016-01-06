---
title: Overview
---

<center>
  ![Icon](images/favicon.png)
</center>

<center>
  [**middleman-pattern-library**](https://github.com/danielbayerlein/middleman-pattern-library)
  is a [Middleman 4.x](http://middlemanapp.com) project template for creating
  and managing your front-end pattern library.
</center>

---

### Introduction

#### Folder structure

Your patterns are located in the `source/patterns` folder.

**For example:**

```
source/patterns/
  components/
    alerts/
      default.html
      link-color.html
    progress/
      contextual-alternatives.html
        default.html
        striped.html
  elements/
    buttons/
      default.html
      disabled.html
      outline.html
      sizes.html
    colors/
      color-palette.html
    typography/
      blockquotes.html
      customizing-headings.html
      headings.html
      inline-text-elements.html
      lead.html
```

**Explanation:**

```
elements/         <= Category
  typography/     <= Subcategory
    headings.html <= Pattern
```

#### Pattern format

Each pattern has a `title`. The `description`, `show_code` and `use_source` is
optional.

**For example `headings.html`:**

```html
---
title: Headings
description: All HTML headings, &lt;h1&gt; through &lt;h6&gt;, are available. .h1 through .h6 classes are also available, for when you want to match the font styling of a heading but still want your text to be displayed inline.
---

<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>
```

#### Frontmatter

Frontmatter allows page-specific variables to be included at the top of a
template using the JSON format.

**For example:**

```
---
title: Lorem ipsum
description: Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
iusmod tempor incididunt ut labore et dolore magna aliqua.
show_code: false
use_source: false
---
```

**title:** The title of the page.

**description:** The description of the page.

**show_code:** If you set the value to `false`, the code is not displayed.

**use_source:** If you set the value to `false`, your CSS will not load.


#### Assets

Your JS is located at `source/javascripts/`

```
source/javascripts
  mpl/    <= JS for the middleman-pattern-library
  base.js <= JS for your patterns
```

and your CSS is located at `source/stylesheets/`

```
source/stylesheets/
  mpl/      <= CSS for the middleman-pattern-library
  base.css  <= CSS for your patterns, you can also use Sass.
```

### Building the site with `middleman build`

Finally, when you are ready to deliver static code, you will need to build the
site. Using the command-line, from the project folder, run `middleman build`:

```bash
$ cd my_pattern_library
$ bundle exec middleman build
```

This will create a static file for each file located in your source folder.

### OMG, I don't know what I should do!

For help, see the official [Middleman](http://middlemanapp.com) website.
No success? Then create an [Issue](https://github.com/danielbayerlein/middleman-pattern-library/issues/new).

### License

[**middleman-pattern-library**](https://github.com/danielbayerlein/middleman-pattern-library)
is free and open source! The code is licensed under
[MIT](https://github.com/danielbayerlein/middleman-pattern-library/blob/master/LICENSE.md).
