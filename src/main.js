import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Theme toggle — runs immediately to avoid flash of wrong theme
(function initTheme() {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved ?? (prefersDark ? 'dark' : 'light');

  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  }

  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  function updateIcon() {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    btn.querySelector('.theme-toggle__icon').textContent = isLight ? '●' : '◐';
    btn.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
  }

  updateIcon();

  btn.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (isLight) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
    updateIcon();
  });
}());

// iOS scroll normalization — must register before any ScrollTrigger instances
ScrollTrigger.normalizeScroll(true);

// Gate initialization on fonts being ready so scroll positions are calculated
// against the correct rendered layout, not a fallback font
document.fonts.ready.then(() => {
  initAnimations();
  ScrollTrigger.refresh();
});

function initAnimations() {
  const mm = gsap.matchMedia();

  // Reduced-motion: reveal all content statically, no animation
  mm.add('(prefers-reduced-motion: reduce)', () => {
    document.querySelectorAll('[data-animate]').forEach((el) => {
      el.style.opacity = '1';
      el.style.visibility = 'visible';
      el.style.transform = 'none';
    });

    // Make counter numbers static (they start visible via CSS for this branch)
    document.querySelectorAll('.stat-block__number').forEach((el) => {
      const target = parseInt(el.dataset.target, 10);
      el.textContent = new Intl.NumberFormat().format(target);
    });
  });

  // Full animation — all breakpoints with reduced-motion OFF
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const mmBreakpoints = gsap.matchMedia();

    mmBreakpoints.add(
      {
        isDesktop: '(min-width: 900px)',
        isTablet: '(min-width: 600px) and (max-width: 899px)',
        isMobile: '(max-width: 599px)',
      },
      (context) => {
        const { isDesktop, isTablet, isMobile } = context.conditions;

        // Load animation modules dynamically to allow tree-shaking
        Promise.all([
          import('./animations/hero.js'),
          import('./animations/countup.js'),
          import('./animations/svg-draw.js'),
          import('./animations/cta.js'),
          !isMobile ? import('./animations/parallax-building.js') : Promise.resolve(null),
          !isMobile ? import('./animations/parallax-people.js') : Promise.resolve(null),
          !isMobile ? import('./animations/terminal.js') : Promise.resolve(null),
        ]).then(([hero, countup, svgDraw, cta, parallaxBuilding, parallaxPeople, terminal]) => {
          hero.init();
          countup.init();

          const pathCount = isDesktop ? 10 : isTablet ? 6 : 4;
          svgDraw.init(pathCount);

          cta.init();

          if (parallaxBuilding) {
            const intensity = isTablet ? 0.5 : 1.0;
            parallaxBuilding.init(intensity);
          }

          if (parallaxPeople) {
            const intensity = isTablet ? 0.5 : 1.0;
            parallaxPeople.init(intensity);
          }

          if (terminal) {
            terminal.init();
          }

          // Refresh after all animations are registered
          ScrollTrigger.refresh();
        });

        // Cleanup function — runs when matchMedia condition changes (e.g. resize)
        return () => {
          ScrollTrigger.getAll().forEach((st) => st.kill());
        };
      }
    );
  });
}

// Debounced resize handler
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    ScrollTrigger.refresh(true);
  }, 250);
});
