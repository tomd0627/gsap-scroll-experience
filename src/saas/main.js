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

// Mobile notice — show on small screens, allow persistent dismiss
(function initMobileNotice() {
  const notice = document.getElementById('mobileNotice');
  if (!notice) return;
  if (localStorage.getItem('mobileNoticeDismissed')) {
    notice.classList.add('mobile-notice--hidden');
    return;
  }
  notice.querySelector('.mobile-notice__dismiss').addEventListener('click', () => {
    localStorage.setItem('mobileNoticeDismissed', '1');
    notice.classList.add('mobile-notice--hidden');
  });
}());

// iOS scroll normalization — must register before any ScrollTrigger instances
ScrollTrigger.normalizeScroll(true);

// Hero entry animation — start before fonts.ready for LCP
if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  import('../animations/hero.js').then(({ init }) => init());
}

// All scroll-triggered animations wait for fonts so pin positions are accurate
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

    document.querySelectorAll('.stat-block').forEach((el) => {
      el.style.opacity = '1';
      el.style.visibility = 'visible';
    });

    document.querySelectorAll('.stat-block__number').forEach((el) => {
      const target = parseInt(el.dataset.target, 10);
      el.textContent = new Intl.NumberFormat().format(target);
    });

    document.querySelectorAll('.milestone').forEach((el) => {
      el.style.opacity = '1';
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
        const { isMobile } = context.conditions;

        Promise.all([
          import('./timeline.js'),
          import('../animations/countup.js'),
          import('../animations/cta.js'),
          !isMobile ? import('../animations/terminal.js') : Promise.resolve(null),
        ]).then(([timeline, countup, cta, terminal]) => {
          timeline.init();
          countup.init();
          cta.init();
          if (terminal) terminal.init();
          ScrollTrigger.refresh();
        });

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
