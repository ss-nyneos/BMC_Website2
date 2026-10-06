import { useEffect } from "react";

/**
 * Plays the one entrance animation the spec allows per element, via
 * IntersectionObserver rather than a scroll listener.
 *
 * `js-motion` is added to <html> only when motion is permitted, which is what
 * arms the hidden start state in globals.css. Without it (no JS, reduced
 * motion, headless render) every `.reveal` block stays plainly visible.
 *
 * Three variants are observed (`.reveal`, `.reveal-group`, `.reveal-split`;
 * see globals.css). A group's children are numbered here with `--i`, so a
 * component never has to thread an index through just to be staggered. The
 * count is capped so a long row never makes its last item wait.
 *
 * `key` re-runs the effect on navigation. It has to: `js-motion` hides every
 * `.reveal` block until the observer reaches it, so a page whose blocks were
 * never observed — because they mounted after this ran — would render blank.
 */
const MAX_STAGGER = 6;

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

    const targets = document.querySelectorAll<HTMLElement>(".reveal, .reveal-group, .reveal-split");
    targets.forEach((node) => {
      if (node.classList.contains("reveal-group")) {
        Array.from(node.children).forEach((child, index) => {
          (child as HTMLElement).style.setProperty("--i", String(Math.min(index, MAX_STAGGER)));
        });
      }
      observer.observe(node);
    });

    return () => {
      observer.disconnect();
      root.classList.remove("js-motion");
    };
  }, [key]);
}
