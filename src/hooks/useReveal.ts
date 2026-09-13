import { useEffect } from "react";

/**
 * Plays the one entrance animation the spec allows per element, via
 * IntersectionObserver rather than a scroll listener.
 *
 * `js-motion` is added to <html> only when motion is permitted, which is what
 * arms the hidden start state in globals.css. Without it (no JS, reduced
 * motion, headless render) every `.reveal` block stays plainly visible.
 *
 * `key` re-runs the effect on navigation. It has to: `js-motion` hides every
 * `.reveal` block until the observer reaches it, so a page whose blocks were
 * never observed — because they mounted after this ran — would render blank.
 */
export function useReveal(key?: unknown) {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || typeof IntersectionObserver === "undefined") {
      root.classList.remove("js-motion");
      return;
    }

    root.classList.add("js-motion");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    const targets = document.querySelectorAll<HTMLElement>(".reveal");
    targets.forEach((node) => observer.observe(node));

    return () => {
      observer.disconnect();
      root.classList.remove("js-motion");
    };
  }, [key]);
}
