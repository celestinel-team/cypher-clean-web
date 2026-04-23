# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server at http://localhost:5173
npm run build     # Production build → dist/
npm run preview   # Serve the dist/ build locally
```

Always run `npm run build` after making changes to confirm no errors before reporting work as done.

## Stack

- **Vite 8 + React 19** — `@vitejs/plugin-react` for JSX transform
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin — no `tailwind.config.js`; theme tokens are defined inside `src/index.css` using `@theme {}`
- **lucide-react** for icons — note: `Github` and `Twitter` are not exported by this version; inline SVGs are used in `Footer.jsx` instead
- **framer-motion** is installed but not yet used

## Architecture

`App.jsx` is a single flat page — it imports and stacks all section components top to bottom with no routing:

```
Navbar → Hero → Stats → Features → HowItWorks → Preview → Pricing → Download → FAQ → Footer
```

### CSS approach

All global styles, custom utilities, animations, and Tailwind theme overrides live in `src/index.css`. Key custom classes defined there:

- `.glass` / `.glass-hover` — backdrop-blur card style used throughout
- `.btn-primary` — gradient CTA button with shimmer hover effect
- `.gradient-text` — animated blue→cyan→indigo gradient on text
- `.section-grid-bg` — subtle dot-grid background used on several sections
- `float-anim`, `glow-pulse`, `scan-line-anim` — keyframe animations

Tailwind utility classes are used directly in JSX for everything else. Avoid creating new CSS files.

### Assets

Product screenshots (`CL1.png`, `CL2.png`, `CL3.png`) live in `src/assets/` and are imported directly in components. `photos/` at the root contains the originals — do not import from there.

## Product context

This is the marketing website for **Cypher Clean** — a Windows-only desktop app for developers that scans project directories and safely deletes generated/cache folders.

Key facts to keep accurate across the site:
- **Windows only** — no Mac/Linux version exists yet
- **Pro is a monthly subscription** ($9/month), not a one-time payment
- **AI Project Analysis** (Pro feature) uses a **cloud AI model** — not local/Ollama
- Core scanning/deletion is local with zero telemetry; only Pro AI analysis makes network requests
- Free tier: 3 scans per 6-hour rolling window
- Scan time is ~10 seconds
