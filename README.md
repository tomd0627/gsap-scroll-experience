# GSAP Scroll Experience — Portfolio Demo

Two scroll-driven experiences built as a front-end portfolio showcase, demonstrating advanced GSAP ScrollTrigger techniques and accessible, responsive UI patterns.

## Experiences

### 1. The Scale of the Internet (`index.html`)

Six scroll-triggered sections, each using a distinct GSAP technique:

| Section           | Technique                                           |
| ----------------- | --------------------------------------------------- |
| Hero              | Typewriter cursor blink + entrance animation        |
| Parallax Building | Multi-layer parallax with ScrollTrigger scrub       |
| Count-Up Numbers  | Pinned section with animated number counting        |
| SVG Network Map   | `drawSVG` stroke animation on submarine cable paths |
| Parallax People   | Dot-grid parallax with fade                         |
| Terminal / CTA    | Sequential SVG draw + staggered entrance            |

### 2. Fieldnotes: A SaaS Story (`saas-story.html`)

A business narrative told through scroll — five sections following a startup from idea to launch:

| Section   | Technique                                            |
| --------- | ---------------------------------------------------- |
| Hero      | Entrance animation with staggered text reveal        |
| Timeline  | Pinned scrub — milestone cards animate in sequence   |
| Numbers   | Count-up stats on scroll entry                       |
| Terminal  | Sequential SVG draw + typed output                   |
| CTA       | Staggered entrance on scroll                         |

Page-footer navigation links between both experiences.

## Stack

- **GSAP 3** (ScrollTrigger, DrawSVGPlugin)
- **Vite** — dev server and multi-page build
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

## Features

- **"How I built this" accordion** — collapsible section on the landing page covering four key technical decisions
- **Mobile notice banner** — dismissible banner alerting mobile visitors that the experience is optimized for desktop (`role="status"` for screen reader compatibility)

## Accessibility

- Skip-to-content link
- All decorative SVGs and arrow characters marked `aria-hidden`
- `aria-live` regions on animated stat numbers
- `role="status"` on the dismissible mobile notice banner
- Full keyboard navigation, logical tab order, and focus-visible styles
- Respects `prefers-reduced-motion` (GSAP's built-in support)

---

Part of [Tom DeLuca's](https://github.com/tomd0627) front-end portfolio. Project #2 of 7.
