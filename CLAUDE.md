# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a VitePress-based blog and knowledge base for new parents ("BeginnerParents"). The site is built with Chinese content and includes:

- **Knowledge Base** (01 知识库): Articles on childcare, insurance, health, and parenting
- **Resource Library** (02 资料库): Curated books, videos, and music recommendations
- **Podcast Episodes** (03 新手爸妈播客): Documented episodes covering pregnancy, birth, and early parenting

## Common Commands

```bash
# Development server
pnpm run docs:dev

# Build for production
pnpm run docs:build  

# Preview production build
pnpm run docs:preview
```

## Architecture

### Core Structure
- **VitePress** framework with custom configuration in `.vitepress/config.mts`
- **Markdown-first** content with enhanced features via plugins
- **Chinese localization** with custom labels and navigation
- **Nolebase plugins** for enhanced readability and features

### Key Features
- **Bi-directional linking** between articles using `@nolebase/markdown-it-bi-directional-links`
- **Task checkboxes** in markdown via `markdown-it-task-checkbox`
- **Footnote support** with `markdown-it-footnote`
- **Mermaid diagrams** through `vitepress-plugin-mermaid`
- **Mark highlighting** for emphasized text
- **Enhanced readability** with Nolebase plugins

### Content Organization
- Content is organized in numbered directories (01, 02, 03) for clear hierarchy
- Each section has an `index.md` file serving as a landing page
- Podcast episodes follow a consistent naming pattern (EP1, EP2, etc.)

### Configuration Structure
- Main config split into modules (nav, search, sidebar, vite) imported from `./configs`
- Tailwind CSS for styling with PostCSS processing
- Dark mode enabled by default with Chinese labels
- Local search functionality with tag support

### Content Features
- Image lazy loading enabled
- Clean URLs without `.html` extensions
- Sitemap generation for SEO
- Social links to podcast platform (Xiaoyuzhoufm)
- Last updated timestamps via Git

## Development Notes

- Uses `pnpm` as package manager (version 10.10.0+)
- Content is primarily in Chinese with some English technical terms
- Site hostname configured as `https://blog.beginnerparents.com`
- No linting or testing commands currently configured