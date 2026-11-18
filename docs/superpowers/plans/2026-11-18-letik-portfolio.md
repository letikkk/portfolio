# Letik Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and verify a deploy-ready static English portfolio website for Letik (Full-Stack Roblox Scripter) with cropped/compressed local `.mp4` showcases.

**Architecture:** Vite + React + TypeScript + Tailwind CSS v4 single-page static app with typed project/stack/terms data modules, an IntersectionObserver-controlled looping video stage, and an accessible Theater Modal lightbox. Automated verification via TypeScript check, Vitest unit/DOM tests, production `vite build`, and Chromium headless viewport screenshots.

**Tech Stack:** Vite, React 19, TypeScript, Tailwind CSS v4, Lucide React, Vitest + Testing Library, `ffmpeg` (asset pipeline).

**Spec:** `docs/superpowers/specs/2026-11-18-letik-portfolio-design.md`

## Global Constraints
- All portfolio copy in natural English; key facts exact: `Letik`, `Full-Stack Roblox Scripter`, `4 Years`, `25M+`, `GMT+3`, Discord `@letikgg`, `USD / Robux` (`%` only if already making decent revenue), scope limits (`Vehicles`, `Advanced guns` — simple guns OK).
- Stack items strictly curated from old portfolio tooling/systems only.
- Static build (`dist/`) must work on free static hosts (relative `./` base path support for GitHub Pages / Cloudflare Pages / Vercel).
- Cropped `.mp4` videos must contain zero Studio ribbon/Output/taskbar/OBS windows and weigh under 4 MB per clip.

## Review Focus
- Filtering `projects` by category returns exact matching items and handles empty/all states cleanly.
- Modal lightbox opens from any project card, switches prev/next clips, closes on `Escape` or backdrop click, and restores scroll.
- Copying `@letikgg` or the Discord brief template handles clipboard API failure gracefully and displays clear confirmation feedback.
- Videos pause automatically outside viewport or when the Theater Modal opens to avoid overlapping playback.
- Responsive layout renders cleanly on desktop (1440px) and mobile (390px) without horizontal overflow.

---

### Task 1: Process and Verify Cropped `.mp4` Assets
**Files:**
- Create: `public/videos/katana-combat.mp4`
- Create: `public/videos/tycoon-engine.mp4`
- Create: `public/videos/simulator-economy.mp4`
- Create: `public/videos/raycast-renderer.mp4`
- Create: `public/videos/drawing-canvas.mp4`
- [ ] Run `ffmpeg` crop/trim/H.264 encode pipeline into `public/videos/*.mp4`
- [ ] Verify video dimensions, durations, file sizes (< 4 MB each), and extract mid-frame thumbnails to visually confirm zero Studio UI / OBS artifacts

### Task 2: Initialize Vite + React + TypeScript + Tailwind + Vitest Project
**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, `src/index.css`
- [ ] Configure `base: './'` in `vite.config.ts` for free static deployment anywhere (GitHub Pages subpath or root domain)
- [ ] Install dependencies (`react`, `react-dom`, `lucide-react`, `tailwindcss`, `@tailwindcss/vite`, `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`, `@playwright/test` or verification via system chromium)
- [ ] Add Google Fonts (`Plus Jakarta Sans`, `IBM Plex Mono`) and dark meta tags in `index.html`

### Task 3: Portfolio Data & Utility Logic (TDD)
**Files:**
- Create: `src/data/portfolio.ts`
- Create: `src/utils/clipboard.ts`
- Create: `src/data/portfolio.test.ts`
- [ ] Write failing Vitest tests covering project catalog integrity, category filter helper, stack categories, and clipboard helper
- [ ] Implement `src/data/portfolio.ts` and `src/utils/clipboard.ts`
- [ ] Run `npm test` and confirm PASS

### Task 4: Build UI Components & App
**Files:**
- Create: `src/components/Navbar.tsx`
- Create: `src/components/Hero.tsx`
- Create: `src/components/VideoCard.tsx`
- Create: `src/components/ProjectShowcase.tsx`
- Create: `src/components/VideoModal.tsx`
- Create: `src/components/StackSection.tsx`
- Create: `src/components/CommissionSection.tsx`
- Create: `src/App.tsx`, `src/main.tsx`
- Create: `src/App.test.tsx`
- [ ] Write interactive tests for category filtering, modal open/next/close (`Escape`), and Discord/template copy states
- [ ] Implement modular, accessible dark-minimalist UI components
- [ ] Run `npm test` and confirm PASS

### Task 5: Production Build, Static Asset Verification & Visual Inspection
**Files:**
- Create: `README.md` (short deployment guide for GitHub Pages / Cloudflare Pages / Vercel + instructions for adding new projects)
- [ ] Run `npx tsc --noEmit`, `npm test`, and `npm run build`
- [ ] Serve `dist/` locally and capture desktop (`1440x900`) and mobile (`390x844`) screenshots + check console errors & video playback via headless `/usr/bin/chromium`
- [ ] Inspect screenshots visually and fix any spacing/contrast/overflow issues
- [ ] Commit final work to git
