import { useEffect } from "react";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Gentle scroll parallax for any element marked `data-parallax="<speed>"`.
 *
 * The element drifts against the scroll by `speed` times its distance from the
 * middle of the viewport, so it sits exactly where the layout put it when it is
 * centred on screen and never drifts far from its own slot. Speeds around 0.05
 * to 0.1 read as depth; anything larger starts to look like a layout bug.
 *
 * One rAF-throttled listener serves the whole page. Elements well outside the
 * viewport are skipped, and only `transform` is written, so nothing reflows.
 * Mark a wrapper, not an element that also runs a CSS entrance on `transform`.
 *
 * Under reduced motion no listener is attached and any offset is cleared.
 */
export function useParallax(key?: unknown) {
  const reduced = useReducedMotion();

  useEffect(() => {
    const nodes = () => document.querySelectorAll<HTMLElement>("[data-parallax]");

    if (reduced) {
      nodes().forEach((node) => node.style.removeProperty("transform"));
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;
      const viewport = window.innerHeight;
      nodes().forEach((node) => {
        const rect = node.getBoundingClientRect();
        if (rect.bottom < -viewport * 0.5 || rect.top > viewport * 1.5) return;
        const speed = Number(node.dataset.parallax) || 0.06;
        const offset = (rect.top + rect.height / 2 - viewport / 2) * speed;
        node.style.transform = `translate3d(0, ${(-offset).toFixed(1)}px, 0)`;
      });
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
  }, [reduced, key]);
}
