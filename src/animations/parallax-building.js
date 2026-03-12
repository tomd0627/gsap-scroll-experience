import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * @param {number} intensity - 0.5 for tablet, 1.0 for desktop
 */
export function init(intensity = 1.0) {
  const section = document.getElementById('building');
  const bgLayer = section.querySelector('.building__layer--bg');
  const midLayer = section.querySelector('.building__layer--mid');

  // Promote parallax layers to GPU compositor layers before animation starts
  gsap.set([bgLayer, midLayer], { willChange: 'transform' });

  const scrollConfig = {
    trigger: section,
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1,
  };

  // Background layer: slowest (30% of scroll distance)
  ScrollTrigger.create({
    ...scrollConfig,
    animation: gsap.fromTo(bgLayer, { yPercent: -15 * intensity }, { yPercent: 15 * intensity }),
  });

  // Midground layer: medium speed (60%)
  ScrollTrigger.create({
    ...scrollConfig,
    animation: gsap.fromTo(midLayer, { yPercent: -20 * intensity }, { yPercent: 20 * intensity }),
  });

  // Clean up will-change after the section leaves the viewport
  ScrollTrigger.create({
    trigger: section,
    start: 'bottom top',
    once: true,
    onEnter: () => {
      gsap.set([bgLayer, midLayer], { willChange: 'auto' });
    },
  });
}
