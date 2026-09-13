import type { ReactNode } from "react";
import { BULLET_MARKS } from "../../assets/bullets";

type BulletListProps = {
  items: ReactNode[];
  variant?: "blue" | "orange" | "current";
  /** Text size of the rows. */
  size?: "label" | "body-sm";
  className?: string;
};

/**
 * A real list with the reference's four alternating bullet marks (images 3, 5
 * and 8). The marks cycle so a six-item list never reads as six identical dots.
 *
 * The marks are decorative SVG; the list semantics carry the meaning, which is
 * what a screen reader announces.
 */
const tones = {
  blue: "text-forest dark:text-lavender",
  orange: "text-orange",
  current: "text-current",
};

const sizes = {
  label: "text-label",
  "body-sm": "text-body-sm",
};

export function BulletList({ items, variant = "blue", size = "label", className = "" }: BulletListProps) {
  return (
    <ul className={`flex flex-col gap-4 ${className}`}>
      {items.map((item, index) => {
        const Mark = BULLET_MARKS[index % BULLET_MARKS.length];
        return (
          <li key={index} className="flex items-start gap-4">
            <Mark className={`mt-1 h-4 w-4 shrink-0 ${tones[variant]}`} />
            <span className={sizes[size]}>{item}</span>
          </li>
        );
      })}
    </ul>
  );
}
