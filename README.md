# Letik — Full-Stack Roblox Scripter Portfolio

Static dark-minimalist portfolio built with Vite, React, TypeScript, and Tailwind CSS.

## Commands

```bash
npm install
npm run dev      # Local dev server
npm test         # Run unit & component tests
npm run build    # Type-check + build static output to dist/
```

## Adding New Showcase Clips

1. Crop and compress your `.mp4` clip into `public/videos/<slug>.mp4` (H.264, `+faststart`).
2. Add an entry to `PROJECTS` inside `src/data/portfolio.ts`.

## Free Static Hosting

Because `vite.config.ts` uses `base: './'`, the built `dist/` folder works anywhere with zero paid hosting:

- **Cloudflare Pages / Netlify Drop / Vercel:** Connect the repo (build command `npm run build`, output directory `dist`) or upload `dist/`.
- **GitHub Pages:** Push the repo to GitHub and deploy `dist/` via GitHub Actions or `gh-pages`.
