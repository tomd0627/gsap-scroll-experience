import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function init() {
  const section = document.getElementById('hero');
  const cursorWrap = section.querySelector('.hero__cursor-wrap');
  const heading = section.querySelector('.hero__heading');
  const subtext = section.querySelector('.hero__subtext');

  // Entry animation — fires on load, not on scroll.
  // Uses fromTo() so the end state is explicit (opacity: 1) rather than read
  // from CSS, which starts at opacity: 0 to prevent FOUC.
  const entryTl = gsap.timeline({ defaults: { ease: 'power2.out' } });

  entryTl
    .fromTo(cursorWrap, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.8 })
    .fromTo(heading,    { opacity: 0, y: 30 },       { opacity: 1, y: 0, duration: 0.7 }, '-=0.3')
    .fromTo(subtext,    { opacity: 0, y: 20 },       { opacity: 1, y: 0, duration: 0.5 }, '-=0.3');

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
