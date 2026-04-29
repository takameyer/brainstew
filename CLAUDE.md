# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Brain Stew is a Green Day tribute band based in Germany. This repo contains their website and raw assets (logos, photos, a concert video). The website is a Jekyll static site with German/English bilingual support, deployed to GitHub Pages at brainstew.de.

## Development Commands

**Install dependencies (first time):**
```bash
bundle install
npm install
```

**Start dev server with live reload:**
```bash
bundle exec jekyll serve --livereload
# Available at http://localhost:4000
```

**Build for production:**
```bash
bundle exec jekyll build
# Output goes to _site/
```

**Fix Ruby version issues:**
```bash
asdf install  # uses .tool-versions (Ruby 3.4.4, Bundler 2.6.9)
```

**Clear cache when Jekyll won't start:**
```bash
bundle exec jekyll clean && bundle exec jekyll serve
```

## Architecture

### Content Data Files (`_data/`)
All site content is data-driven — edit these YAML files rather than touching HTML templates:

- `_data/config.yml` — **Feature flags**: toggle `show_donate`, `show_gigs`, `show_gallery`, `show_contact`, `show_about` to show/hide entire sections without touching templates.
- `_data/gigs.yml` — Upcoming gig listings (date, venue, address, optional link). Empty file = "no upcoming gigs" message shown automatically.
- `_data/gallery.yml` — Gallery items with type (`video`/`photo`), `featured` flag, `featured_artwork` flag, `youtube_id`/`vimeo_id` for videos, and `show_caption`. Items with `featured_artwork: true` get special display treatment in the hero of the gallery section.
- `_data/navigation.yml` — Nav menu items with bilingual labels.

### Internationalization (`_i18n/`)
All user-facing strings live in `_i18n/de.yml` (German, default) and `_i18n/en.yml` (English). Templates reference these via `{% translate section.key %}`. The default language is German (`default_lang: "de"` in `_config.yml`). When adding new copy, add keys to both files.

### Templates
- `_layouts/default.html` — Single shared layout wrapping all pages (nav, footer, social links, Font Awesome CDN).
- `index.html` — Single-page app structure: hero → about → donate → gigs → gallery → contact. Each section is conditionally rendered via feature flags from `_data/config.yml`.
- `gallery.html` — Standalone gallery page (linked from the "View More" button on the homepage).
- `imprint.html` — Legal/Impressum page required for German sites.

### Contact Form
Uses [FormSubmit.co](https://formsubmit.co) — no backend needed. Form posts to `andrew.meyer@hey.com`. Includes a honeypot field (`_honey`) for spam protection.

### Assets
- `css/styles.css` — All site styles (single file).
- `js/main.js` — All site JavaScript.
- `img/` — Favicons and logo variants only.
- `assets/images/gallery/` — Gallery photos (served by Jekyll, not excluded from localization).
- `raw/` — Unprocessed source photos (not served).

## Content Workflows

**Add a gig:** Add an entry to `_data/gigs.yml` following the commented template.

**Add gallery media:** Add an entry to `_data/gallery.yml`. Set `featured: true` to show on homepage. For YouTube videos use `youtube_id`, for Vimeo use `vimeo_id` + `vimeo_hash`.

**Toggle a section on/off:** Flip the relevant flag in `_data/config.yml`.

**Add/edit translations:** Edit both `_i18n/de.yml` and `_i18n/en.yml` with matching keys.

## Deployment

Pushing to `main` triggers a GitHub Actions workflow that builds and deploys to GitHub Pages automatically. The custom domain is configured in `CNAME` (brainstew.de).
