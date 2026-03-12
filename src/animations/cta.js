import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function init() {
  const section = document.getElementById('cta');
  const animatedEls = section.querySelectorAll('[data-animate]');
  const links = section.querySelector('.cta__links');

  // Set initial hidden state (prevents invisible elements being focusable)
  gsap.set(animatedEls, { opacity: 0, y: 30, visibility: 'hidden' });

  // One-shot entrance animation — no scrub, fires once when section enters viewport
  ScrollTrigger.create({
    trigger: section,
    start: 'top 70%',
    once: true,
    onEnter: () => {
      gsap.to(animatedEls, {
        opacity: 1,
        y: 0,
        visibility: 'visible',
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.15,
      });
    },
  });
}
