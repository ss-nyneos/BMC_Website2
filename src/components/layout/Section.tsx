import type { ReactNode } from "react";
import type { SectionBg } from "../../types";

type SectionProps = {
  children: ReactNode;
  bg?: SectionBg;
  /** `lg` is the standard section rhythm; `md` is for tighter strips. */
  padY?: "lg" | "md" | "none";
  id?: string;
  className?: string;
  /** Renders as <div> instead of <section> when the parent already is one. */
  as?: "section" | "div";
  "aria-labelledby"?: string;
};

/**
 * Vertical rhythm plus the one colour decision a section is allowed to make.
 *
 * Text colour is derived from the background here and never passed in, which is
 * what keeps the contrast pairings in spec section 2 true everywhere. Every
 * accent here is now light enough to keep the default dark focus ring, so no
 * surface takes `on-dark`; `blue` is a role-name that resolves to the brand
 * sky blue, the same panel `purple` draws.
 */
const surfaces: Record<SectionBg, string> = {
  page: "bg-page text-fg",
  white: "bg-surface text-fg",
  purple: "bg-purple text-ink",
  blue: "bg-purple text-ink",
  lavender: "bg-lavender text-ink",
  mint: "bg-mint text-ink",
};

const rhythm: Record<NonNullable<SectionProps["padY"]>, string> = {
  lg: "py-14 md:py-20 lg:py-30",
  md: "py-12 md:py-16 lg:py-20",
  none: "",
};

export function Section({
  children,
  bg = "page",
  padY = "lg",
  id,
  className = "",
  as: Tag = "section",
  ...rest
}: SectionProps) {
  return (
    <Tag id={id} className={`${surfaces[bg]} ${rhythm[padY]} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
