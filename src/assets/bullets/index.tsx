import type { SVGProps } from "react";

/**
 * The four bullet marks from the reference (images 3, 5 and 8). They cycle in
 * order down a list so a long list never reads as a column of identical dots.
 * Always decorative: BulletList renders a real <ul> and marks these aria-hidden.
 */
type BulletProps = SVGProps<SVGSVGElement>;

const shell = (props: BulletProps) => ({
  viewBox: "0 0 16 16",
  fill: "currentColor",
  "aria-hidden": true,
  focusable: false,
  ...props,
});

/** Speech mark, tail to the lower left. */
export function BulletQuote(props: BulletProps) {
  return (
    <svg {...shell(props)}>
      <path d="M12 1.5H4A2.5 2.5 0 0 0 1.5 4v5.5A2.5 2.5 0 0 0 4 12h1.2l-1 3.1a.3.3 0 0 0 .45.35L9.6 12H12a2.5 2.5 0 0 0 2.5-2.5V4A2.5 2.5 0 0 0 12 1.5Z" />
    </svg>
  );
}

/** Speech mark, tail to the lower right. */
export function BulletFlag(props: BulletProps) {
  return (
    <svg {...shell(props)}>
      <path d="M4 1.5h8A2.5 2.5 0 0 1 14.5 4v5.5A2.5 2.5 0 0 1 12 12h-1.2l1 3.1a.3.3 0 0 1-.45.35L6.4 12H4a2.5 2.5 0 0 1-2.5-2.5V4A2.5 2.5 0 0 1 4 1.5Z" />
    </svg>
  );
}

/** Squircle with one squared corner. */
export function BulletBlob(props: BulletProps) {
  return (
    <svg {...shell(props)}>
      <path d="M1.5 6.5A5 5 0 0 1 6.5 1.5h3a5 5 0 0 1 5 5v3a5 5 0 0 1-5 5h-8Z" />
    </svg>
  );
}

/** Plain rounded square. */
export function BulletSquare(props: BulletProps) {
  return (
    <svg {...shell(props)}>
      <rect x="1.5" y="1.5" width="13" height="13" rx="3.6" />
    </svg>
  );
}

export const BULLET_MARKS = [BulletQuote, BulletFlag, BulletBlob, BulletSquare] as const;
