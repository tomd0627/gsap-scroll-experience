import { gsap } from 'gsap';

/**
 * Initializes the SVG path draw-on animation using stroke-dashoffset technique.
 * Only animates compositor-safe properties (stroke-dashoffset, opacity).
 *
 * @param {number} pathCount - number of cable paths to animate (4 mobile, 6 tablet, 10 desktop)
 */
export function init(pathCount = 10) {
  const section = document.getElementById('network');
  const allCables = Array.from(section.querySelectorAll('.cable'));

  // Limit the cables to the active path count
  const activeCables = allCables.slice(0, pathCount);
  const inactiveCables = allCables.slice(pathCount);

  // Hide cables that exceed the path count
  if (inactiveCables.length) {
    gsap.set(inactiveCables, { opacity: 0 });
  }

  // Initialize each path: measure its length, set dash array/offset to "hidden"
  activeCables.forEach((path) => {
    const length = path.getTotalLength();
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
      opacity: 1,
    });
  });

  // Build the timeline: pin the section, draw cables in sequence
  // 300% = 3 viewport heights of scroll to draw all cables at a cinematic pace
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: '+=300%',
      pin: true,
      scrub: 1,
      anticipatePin: 1,
    },
  });

  // First: fade in the section heading
  const heading = section.querySelector('.network__heading');
  gsap.set(heading, { opacity: 0, y: 20 });
  tl.to(heading, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' });

  // Draw each cable with a short stagger
  activeCables.forEach((path) => {
    tl.to(
      path,
      {
        strokeDashoffset: 0,
        duration: 0.4,
        ease: 'power1.inOut',
      },
      '<0.1' // each cable starts slightly after the previous begins
    );
  });

  // Fade in the caption after all cables are drawn
  const caption = section.querySelector('.network__caption');
  gsap.set(caption, { opacity: 0 });
  tl.to(caption, { opacity: 1, duration: 0.3 }, '+=0.1');
}
