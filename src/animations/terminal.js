import { gsap } from 'gsap';

export function init() {
  const section = document.getElementById('terminal');
  const codeEl = document.getElementById('terminal-code');
  const heading = section.querySelector('.terminal__heading');
  const portraitPaths = section.querySelectorAll('.portrait-path');

  // --- Character split for typewriter effect ---
  // Preserve whitespace by splitting text node by node
  const originalText = codeEl.textContent;
  const chars = [];

  // Clear and re-populate with individual character spans.
  // Use a DocumentFragment so all spans are inserted in one DOM operation
  // instead of triggering a reflow on every appendChild.
  codeEl.textContent = '';
  const fragment = document.createDocumentFragment();
  for (const char of originalText) {
    const span = document.createElement('span');
    span.className = 'char';
    // Preserve spaces and newlines
    if (char === '\n') {
      span.textContent = '\n';
    } else if (char === ' ') {
      span.innerHTML = '&nbsp;';
      span.style.letterSpacing = '-0.05em';
    } else {
      span.textContent = char;
    }
    fragment.appendChild(span);
    chars.push(span);
  }
  codeEl.appendChild(fragment);

  // --- Portrait SVG: initialize for draw-on ---
  portraitPaths.forEach((path) => {
    let length;
    try {
      length = path.getTotalLength();
    } catch {
      // Fallback for elements like <line> in some browsers
      length = 200;
    }
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
      opacity: 0.6, // restore from CSS opacity: 0 (FOUC guard)
    });
  });

  // --- Set initial states ---
  gsap.set(chars, { visibility: 'hidden' });
  gsap.set(heading, { opacity: 0, y: 20 });

  // --- Build pinned timeline ---
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: '+=200%',
      pin: true,
      scrub: 1,
      anticipatePin: 1,
    },
  });

  // Heading fades in first
  tl.to(heading, { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' });

  // Portrait SVG draws in simultaneously with the typewriter
  tl.to(
    portraitPaths,
    {
      strokeDashoffset: 0,
      duration: 0.8,
      stagger: 0.06,
      ease: 'power1.inOut',
    },
    '<'
  );

  // Typewriter: reveal characters with stagger
  tl.to(
    chars,
    {
      visibility: 'visible',
      duration: 0.01, // Near-instant per char; overall speed controlled by stagger total
      stagger: {
        each: 0.008,
        ease: 'none',
      },
    },
    '<0.1'
  );
}
