import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function init() {
  const section = document.getElementById('timeline');
  const heading = section.querySelector('.timeline__heading');
  const milestones = section.querySelectorAll('.milestone');

  gsap.set(heading, { opacity: 0, y: 20 });
  gsap.set(milestones, { opacity: 0, y: 16 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: '+=400%',
      pin: true,
      scrub: 1,
    },
  });

  tl.to(heading, { opacity: 1, y: 0, duration: 0.15, ease: 'power2.out' });

  milestones.forEach((milestone) => {
    tl.to(
      milestone,
      { opacity: 1, y: 0, duration: 0.18, ease: 'power2.out' },
      '>-0.05'
    );
  });
}
