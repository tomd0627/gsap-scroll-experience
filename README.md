# The Scale of the Internet — GSAP Scroll Experience

An interactive scroll-driven experience visualizing the staggering scale of the internet. Built as a portfolio showcase demonstrating advanced GSAP ScrollTrigger techniques.

## What's in it

Six scroll-triggered sections, each using a distinct GSAP technique:

| Section           | Technique                                           |
| ----------------- | --------------------------------------------------- |
| Hero              | Typewriter cursor blink + entrance animation        |
| Parallax Building | Multi-layer parallax with ScrollTrigger scrub       |
| Count-Up Numbers  | Pinned section with animated number counting        |
| SVG Network Map   | `drawSVG` stroke animation on submarine cable paths |
| Parallax People   | Dot-grid parallax with fade                         |
| Terminal / CTA    | Sequential SVG draw + staggered entrance            |

## Stack

- **GSAP 3** (ScrollTrigger, DrawSVGPlugin)
- **Vite** — dev server and build
- **Vanilla JS** — no framework
- **CSS custom properties** — warm obsidian/amber palette with dark/light theme toggle

## Getting started

```bash
npm install
npm run dev
```

Runs at `http://localhost:5173`.

```bash
npm run build    # production build → dist/
npm run preview  # preview the build locally
```

## Accessibility

- Skip-to-content link
- All decorative SVGs marked `aria-hidden`
- `aria-live` regions on animated stat numbers
- Full keyboard navigation and focus-visible styles
- Respects `prefers-reduced-motion` (GSAP's built-in support)

---

Part of [Tom DeLuca's](https://github.com/tomd0627) front-end portfolio. Project #2 of 7.
