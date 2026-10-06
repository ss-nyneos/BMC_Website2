import { useEffect, useRef } from "react";

/**
 * A hairline on the rail's inner edge that fills top to bottom as the page is
 * read, so a long page says how much of it is left.
 *
 * The transform is written straight to the element once per animation frame
 * rather than through React state, so scrolling never re-renders the rail. It
 * is decorative (the scrollbar carries the same information), so it is hidden
 * from assistive technology, and it tracks the scroll position directly rather
 * than animating, so it stays on under reduced motion.
 */
export function ScrollMeter() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const node = ref.current;
      if (!node) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      node.style.transform = `scaleY(${progress.toFixed(4)})`;
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute -left-px top-0 h-full w-0.5 origin-top bg-purple"
      style={{ transform: "scaleY(0)" }}
    />
  );
}
