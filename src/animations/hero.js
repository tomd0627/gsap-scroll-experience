import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function init() {
  const section = document.getElementById('hero');
  const cursorWrap = section.querySelector('.hero__cursor-wrap');
  const heading = section.querySelector('.hero__heading');
  const subtext = section.querySelector('.hero__subtext');

  // Entry animation — fires on load, not on scroll
  const entryTl = gsap.timeline({ defaults: { ease: 'power2.out' } });

  entryTl
    .from(cursorWrap, { opacity: 0, scale: 0.5, duration: 0.8 })
    .from(heading, { opacity: 0, y: 30, duration: 0.7 }, '-=0.3')
    .from(subtext, { opacity: 0, y: 20, duration: 0.5 }, '-=0.3');

  // Scroll-driven cursor scale-up — pins the hero section while cursor scales
  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: '+=150%',
    pin: true,
    scrub: 1,
    animation: gsap.fromTo(cursorWrap,
      { scale: 1, opacity: 1 },
      { scale: 60, opacity: 0, ease: 'power2.in', immediateRender: false }
    ),
  });

  // Fade out heading text as cursor scales
  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: '+=80%',
    scrub: 1,
    animation: gsap.fromTo([heading, subtext],
      { opacity: 1, y: 0 },
      { opacity: 0, y: -30, ease: 'power1.in', immediateRender: false }
    ),
  });
}
