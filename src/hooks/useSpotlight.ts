import { useEffect } from "react";

/**
 * Feeds the pointer position to any `.spotlight` card under it, as `--mx` and
 * `--my`, so the card's soft light follows the pointer (see globals.css).
 *
 * One delegated listener serves every card on every page, and it writes only
 * two custom properties, so nothing reflows. Touch input is ignored: there is
 * no hover to light, and a tap should not leave a glow behind. Under reduced
 * motion the light still shows, it just does not animate in.
 */
export function useSpotlight() {
  useEffect(() => {
    let frame = 0;
    let last: PointerEvent | null = null;

    const update = () => {
      frame = 0;
      if (!last) return;
      const target = (last.target as Element | null)?.closest?.<HTMLElement>(".spotlight");
      if (!target) return;
      const rect = target.getBoundingClientRect();
      target.style.setProperty("--mx", `${last.clientX - rect.left}px`);
      target.style.setProperty("--my", `${last.clientY - rect.top}px`);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      last = event;
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
}
