import type { ReactNode } from "react";

type SplitPanelProps = {
  /** The photograph or coloured panel. */
  media: ReactNode;
  /** The heading, copy and controls. */
  body: ReactNode;
  /** Places the media column first on large screens. */
  reverse?: boolean;
  className?: string;
};

/**
 * The alternating two-panel split from reference images 3, 4 and 8: equal
 * columns from lg, stacked below.
 *
 * `body` is always first in the DOM, so on a phone the heading is read before
 * the photograph regardless of which side the photograph takes on desktop. The
 * desktop arrangement is done with `order`, which does not affect reading order
 * for assistive technology.
 *
 * Every split carries its own scroll entrance (`.reveal-split` in globals.css):
 * the media panel wipes up from its bottom edge, its photograph settles, and
 * the text half rises a beat behind. Callers no longer add `.reveal`.
 */
export function SplitPanel({ media, body, reverse = false, className = "" }: SplitPanelProps) {
  return (
    <div className={`reveal-split grid gap-4 sm:gap-5 lg:grid-cols-2 ${className}`}>
      <div className={`split-body flex ${reverse ? "lg:order-2" : "lg:order-1"}`}>{body}</div>
      <div className={`split-media flex ${reverse ? "lg:order-1" : "lg:order-2"}`}>{media}</div>
    </div>
  );
}
