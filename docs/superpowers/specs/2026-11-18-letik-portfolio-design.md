# Letik — Roblox Scripter Portfolio Design

**Date:** 2026-11-18  
**Target Directory:** `/home/letikgg/.gemini/antigravity/scratch/letik-portfolio`

## Intent & Audience
Single-page English developer portfolio for **Letik** (`Full-Stack Roblox Scripter`, 4 years experience, 25M+ contributed visits, GMT+3, Commissions Open). Optimized for freelance / one-off Roblox commission clients arriving via Discord (`@letikgg`) and hosted on free static hosting (GitHub Pages / Cloudflare Pages / Vercel).

## Approaches Considered
1. **Vite + React + TypeScript + Tailwind CSS (Recommended & Selected):** Static bundle (`dist/`) with typed project catalog (`src/data/projects.ts`), interactive category filtering, viewport-aware muted video loops, keyboard-accessible Theater Modal, and zero-cost static hosting.
2. **Vanilla HTML + CSS + JS:** Zero build step, simpler drag-and-drop, but harder to maintain typed project schemas, modal focus management, and automated UI tests.

## Design System
- **Palette:** `#07080A` canvas, `#0D0F13` surface, `#13161D` elevated, `#1D212B` hairline borders, `#F3F5F8` primary text, `#9CA3B2` secondary text, `#38BDF8` accent, `#22C55E` live commission status indicator.
- **Typography:** `Plus Jakarta Sans` (headings/body) + `IBM Plex Mono` (stats, durations, module tags).
- **Layout & Sections:**
  1. **Sticky Header:** `letik` mark, `Work` / `Stack` / `Terms` nav links, `Copy @letikgg` action.
  2. **Hero:** Open status (`GMT+3`), identity headline, focused summary mentioning 4 years & 25M+ contributed visits, inline metric strip.
  3. **Selected Work:** Category filter (`All`, `Gameplay & Combat`, `Systems & UI`, `Tech Demos`), full-width lead showcase + 2-column grid of cropped Studio-free `.mp4` demos, Theater Modal for full playback & system breakdown.
  4. **Technical Stack:** 3-column layout (`Core & Paradigms`, `Frameworks & Modules`, `Production Tooling`).
  5. **Commissions & Contact:** Accepted payments (`USD`, `Robux`, `%` only for revenue-generating games), clear scope boundaries (`No vehicles`, `No advanced guns — simple guns OK`), Discord `@letikgg` DM checklist + 1-click brief template copy button.

## Video Assets (Cropped & Compressed via `ffmpeg`)
All 5 clips cropped strictly to the Roblox game viewport (Studio chrome, Output, Windows taskbar, and OBS overlays trimmed out), encoded as H.264 `yuv420p` MP4 with `+faststart`:
- `katana-combat.mp4` (`NcZzNkj4pD4`, 10.5s–42.2s, crop `1350:532:2:230`)
- `tycoon-engine.mp4` (`ILJHE28cgd0`, 11.5s–63.0s, crop `1224:716:356:232`)
- `simulator-economy.mp4` (`SimulatorUI Fully done.mp4`, 1.5s–48.2s, crop `1016:458:2:120`)
- `raycast-renderer.mp4` (`Simple tiktok stuff.mp4`, 0.5s–19.8s, crop `988:400:2:120`)
- `drawing-canvas.mp4` (`Drawings.mp4`, 1.5s–35.0s, crop `988:416:2:120`)
