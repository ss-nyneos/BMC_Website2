import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

type CountUpProps = {
  /** The published figure, exactly as it should finally read, e.g. "8.50%". */
  value: string;
  className?: string;
};

/**
 * A figure that counts up from zero as it scrolls into view.
 *
 * The DOM starts, and ends, on the real value: the count only begins once the
 * figure is about to enter the viewport, so a crawler, a failed script or a
 * reduced-motion visitor always reads the published rate and never a zero.
 * The animated digits are hidden from assistive technology, which is given the
 * final value once instead of a stream of intermediate numbers.
 */
export function CountUp({ value, className = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    setDisplay(value);

    const match = value.match(/^(\D*)(\d[\d,]*(?:\.\d+)?)(.*)$/);
    const node = ref.current;
    if (reduced || !match || !node || typeof IntersectionObserver === "undefined") return;

    const [, prefix, digits, suffix] = match;
    const target = Number(digits.replace(/,/g, ""));
    const decimals = digits.split(".")[1]?.length ?? 0;
    // A figure published with Indian digit grouping ("2,25,481") keeps that
    // grouping while it counts, so the width does not jump when it lands.
    const grouped = digits.includes(",");
    const format = (n: number) =>
      `${prefix}${
        grouped
          ? n.toLocaleString("en-IN", {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            })
          : n.toFixed(decimals)
      }${suffix}`;

    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const duration = 1400;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 4);
          setDisplay(t === 1 ? value : format(target * eased));
          if (t < 1) raf = window.requestAnimationFrame(tick);
        };
        raf = window.requestAnimationFrame(tick);
      },
      // Start just before the figure is on screen, so the visitor never sees the
      // real value blink to zero.
      { rootMargin: "0px 0px 12% 0px" },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [value, reduced]);

  return (
    <span className={className}>
      <span ref={ref} aria-hidden="true" className="tabular-nums">
        {display}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
