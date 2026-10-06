import { useEffect } from "react";

/**
 * Scroll-linked depth for every `[data-parallax]` element on the page.
 *
 * The attribute's value is how far the element drifts, as a fraction of its own
 * height, when its container sits one full viewport away from the centre of the
 * screen. Positive values lag behind the scroll, negative values run ahead of
 * it. Sizing the drift to the element rather than in pixels is what keeps a
 * photograph's edge hidden inside its mask at every breakpoint: `.parallax-img`
 * oversizes the image by 16%, and no drift below 0.08 can expose it.
 *
 * Positions are measured on the parent, never on the element itself, so the
 * transform being written cannot feed back into the next measurement. Only
 * elements near the viewport are updated, reads are batched before writes, and
 * work is throttled to one pass per animation frame.
 *
 * Under reduced motion the hook does nothing, so `--parallax-y` is never set
 * and the CSS falls back to no offset. On narrow screens the drift is halved.
 */
export function useParallax(key?: unknown) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;

    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    if (nodes.length === 0) return;

    const visible = new Set<HTMLElement>();
    let frame = 0;

    const update = () => {
      frame = 0;
      const viewport = window.innerHeight;
      const damping = window.innerWidth < 768 ? 0.5 : 1;

      const measured = Array.from(visible, (node) => {
        const box = (node.parentElement ?? node).getBoundingClientRect();
        const offset = (box.top + box.height / 2 - viewport / 2) / viewport;
        const progress = Math.max(-1, Math.min(1, offset));
        const strength = Number(node.dataset.parallax) || 0;
        return { node, y: progress * strength * node.offsetHeight * damping };
      });

      for (const { node, y } of measured) {
        node.style.setProperty("--parallax-y", `${y.toFixed(1)}px`);
      }
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const node = entry.target as HTMLElement;
          if (entry.isIntersecting) visible.add(node);
          else visible.delete(node);
        }
        schedule();
      },
      { rootMargin: "25% 0px" },
    );

    nodes.forEach((node) => observer.observe(node));
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      nodes.forEach((node) => node.style.removeProperty("--parallax-y"));
    };
  }, [key]);
}
