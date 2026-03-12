import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * @param {number} intensity - 0.5 for tablet, 1.0 for desktop
 */
export function init(intensity = 1.0) {
  const section = document.getElementById('people');
  const bg = section.querySelector('.people__bg');
  const content = section.querySelector('.people__content');

  gsap.set([bg, content], { willChange: 'transform' });

  const scrollConfig = {
    trigger: section,
    start: 'top bottom',
    end: 'bottom top',
    scrub: 2, // Slightly higher scrub for a more cinematic, floating feel
  };

  // Background moves right (opposite direction to scroll) — creates depth
  ScrollTrigger.create({
    ...scrollConfig,
    animation: gsap.fromTo(bg, { xPercent: -8 * intensity }, { xPercent: 8 * intensity }),
  });

  // Content drifts left more slowly than natural scroll
  ScrollTrigger.create({
    ...scrollConfig,
    animation: gsap.fromTo(content, { xPercent: 3 * intensity }, { xPercent: -3 * intensity }),
  });

  // Clean up will-change
  ScrollTrigger.create({
    trigger: section,
    start: 'bottom top',
    once: true,
    onEnter: () => {
      gsap.set([bg, content], { willChange: 'auto' });
    },
  });
}
