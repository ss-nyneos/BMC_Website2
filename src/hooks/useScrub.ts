import { useEffect, type RefObject } from "react";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Scroll-scrubbed custom properties, the native stand-in for GSAP's
 * `scrollTrigger: { scrub }` in the sections carried over from bmc_website2.
 *
 * `compute` receives the element's bounding rect and the viewport height on
 * every animation frame the page scrolls, and returns the custom properties to
 * write on the element (`{ "--open": "0.4" }`). Nothing re-renders; CSS reads
 * the properties. Under reduced motion nothing is written and any earlier
 * values are removed, so the stylesheet's resting defaults apply.
 */
export function useScrub<T extends HTMLElement>(
  ref: RefObject<T>,
  compute: (rect: DOMRect, viewport: number) => Record<string, string>,
) {
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (reduced) return;

    const written = new Set<string>();

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight;
      if (rect.bottom < -viewport || rect.top > viewport * 2) return;
      for (const [name, value] of Object.entries(compute(rect, viewport))) {
        node.style.setProperty(name, value);
        written.add(name);
      }
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
      written.forEach((name) => node.style.removeProperty(name));
    };
    // `compute` is expected to be a module-level function, so it is left out:
    // re-subscribing on every render would be wasted work.
  }, [ref, reduced]);
}

/** Progress 0 -> 1 as `value` travels from `from` to `to`, clamped. */
export function progress(value: number, from: number, to: number) {
  return Math.min(1, Math.max(0, (value - from) / (to - from)));
}
