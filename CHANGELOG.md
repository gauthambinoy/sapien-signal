# Changelog

All notable changes to **Global Signals** are documented here.
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html)
and [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [2.0.0] — 2026-04-21

### 🎨 Editorial redesign — Claude.ai-inspired warm aesthetic
- New **paper-cream + cocoa** palette replaces the previous mint/cyan neon scheme.
- New **terracotta accent** (`#C96442` / `#D97757`) for emphasis, links, and focus rings.
- New **Source Serif 4** display typeface for headings, paired with **Inter** body and **JetBrains Mono** numerics.
- All glow effects re-toned to warm amber; aurora gradient now sunset (terracotta → amber → gold → peach → dusty rose).
- Selection highlight, scrollbar, focus rings, and chart palettes updated to match.

### ⚡ Performance & SEO
- Switched from Google Fonts CDN `@import` to **`next/font`** with `display: swap` and CSS variables — eliminates render-blocking and external request.
- Expanded `<head>` metadata: `metadataBase`, OpenGraph, Twitter Card, theme-color (light + dark), structured `applicationName` and `authors`.
- Added `Viewport` export with adaptive `themeColor`.

### 🧹 Repo consolidation
- Merged `luma-earth-pulse` into this repo. `global-signals-dashboard` is now the single canonical project.
- Updated all in-repo URLs and CI badges to `gauthambinoy/global-signals-dashboard`.
- Old repo will be archived on GitHub with a redirect notice.

### 🛠 Polish
- `.env.example` documents Cesium, NASA, NewsAPI keys.
- `.gitignore` confirmed to exclude all `.env*` variants.
- `suppressHydrationWarning` on `<html>` for theme-class hydration safety.

## [1.x] — pre-2.0
- See git history. Foundational features: 200+ APIs, 16 interactive tabs, 3D Earth, AI chat, fullscreen satellite map, energy panel, real-time counters, command palette.
