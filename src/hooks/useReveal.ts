import { useEffect } from "react";

const REVEAL_SELECTOR = ".reveal, .reveal-pop, .reveal-clip, .reveal-stagger";

/**
 * Plays each block's entrance animation once, via IntersectionObserver rather
 * than a scroll listener. The variants are defined in globals.css.
 *
 * `js-motion` is added to <html> only when motion is permitted, which is what
 * arms the hidden start state. Without it (no JS, reduced motion, headless
 * render) every reveal block stays plainly visible.
 *
 * `key` re-runs the effect on navigation, and a MutationObserver picks up
 * blocks that mount later (a tab panel, a filtered list). Both matter for the
 * same reason: `js-motion` hides every unobserved block, so a block the
 * observer never saw would stay blank.
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
      { rootMargin: "0px 0px -10% 0px", threshold: 0.06 },
    );

    const watch = (scope: ParentNode) => {
      scope.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((node) => {
        if (!node.classList.contains("is-in")) observer.observe(node);
      });
    };

    watch(document);

    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches(REVEAL_SELECTOR) && !node.classList.contains("is-in")) {
            observer.observe(node);
          }
          watch(node);
        });
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      observer.disconnect();
      root.classList.remove("js-motion");
    };
  }, [key]);
}
