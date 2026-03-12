import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function init() {
  const section = document.getElementById('numbers');
  const statBlocks = section.querySelectorAll('.stat-block');
  const numberEls = section.querySelectorAll('.stat-block__number');
  const fmt = new Intl.NumberFormat();

  // Initialize display to "0" and hide blocks for entrance animation
  numberEls.forEach((el) => {
    el.textContent = '0';
  });
  gsap.set(statBlocks, { opacity: 0, y: 40, visibility: 'hidden' });

  // Pin the section and drive the count-up via scroll position
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: '+=200%',
      pin: true,
      scrub: 1,
    },
  });

  // Stagger in the stat blocks as the timeline progresses
  tl.to(statBlocks, {
    opacity: 1,
    y: 0,
    visibility: 'visible',
    duration: 0.3,
    stagger: 0.1,
    ease: 'power2.out',
  });

  // Count up each number sequentially
  numberEls.forEach((el, i) => {
    const target = parseInt(el.dataset.target, 10);
    const counter = { val: 0 };
    let announced = false;

    tl.to(
      counter,
      {
        val: target,
        duration: 0.4,
        ease: 'power2.out',
        onUpdate() {
          el.textContent = fmt.format(Math.round(counter.val));
        },
        onComplete() {
          // Only announce final value to screen readers once
          if (!announced) {
            announced = true;
            el.textContent = fmt.format(target);
          }
        },
      },
      i === 0 ? '>' : `-=0.1` // overlap slightly for natural feel
    );
  });
}
