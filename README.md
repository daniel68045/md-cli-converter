## md-to-html

A simple CLI tool that lets you generate static HTML files from Markdown. Supports custom styles (`.css`) and custom templates (`.ejs`)

## To Start

Install globally from [npm](https://www.npmjs.com/):

```
npm install -g static-site-cli
```

Default use - convert a Markdown file (.md) into an HTML file:

```
md-to-html notes.md --output site/
```

This will convert `notes.md` to `notes.html` and save the output in the `site/` folder and automatically apply the default `styles.css`

```
site/
│── notes.html
│── styles.css
```

## Custom Styling (`--css`) - You can use your own CSS file instead of the default `styles.css`:

```
md-to-html notes.md --output site/ --css styles/custom.css
```

Example Directory:

```
my-project/
│── notes.md
│── styles/
│   ├── custom.css
│── site/
│   ├── notes.html
│   ├── custom.css // Copied here automatically
```

## Custom Templates (`--template`) - For a custom HTML structure define your own EJS template:

```
md-to-html notes.md --output site/ --template templates/my-template.ejs
```

Example Directory:

```
my-project/
│── notes.md
│── templates/
│   ├── my-template.ejs
│── site/
│   ├── notes.html // Uses my-template.ejs
```

Example Markdown File (`notes.md`)

```
title: My First Blog Post
author: First Last
date: 2025-02-10
---

# Welcome to My Blog

This is an example Markdown file that will be converted into HTML

## Features:
- Converts Markdown to HTML
- Supports custom styles
- Works with custom templates
```

Generated HTML (`notes.html`)

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Blog Post</title>
    <meta name="author" content="First Last">
    <meta name="date" content="2025-02-10">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>My First Blog Post</h1>
        <p>By Jane Doe | 2025-02-10</p>
    </header>

    <main>
        <h1>Welcome to My Blog</h1>
        <p>This is an example Markdownfile that will be converted into HTML</p>

        <h2>Features:</h2>
        <ul>
            <li>Converts Markdown to HTML</li>
            <li>Supports custon styles</li>
            <li>Works with custon templates</li>
        </ul>
    </main>

    <footer>
        <p>Generated with <strong>Static Site CLI</strong></p>
    </footer>
</body>
</html>
```

## Command Reference

Converts a Markdown file to HTML

```
md-to-html <file>
```

Specifies the output directory

```
--output <dir>
```

Applies a custom CSS file

```
--css <file>
```

Uses a custom EJS template

```
--template <file>
```
