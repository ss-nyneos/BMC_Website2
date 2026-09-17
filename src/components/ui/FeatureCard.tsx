import type { ComponentType, ReactNode, SVGProps } from "react";
import { CircleArrow } from "./CircleArrow";
import { IconChip, type IconChipTone } from "./IconChip";

/**
 * The card the inner pages are built from: an icon chip, a heading, a line or
 * two of copy, and optionally a destination.
 *
 * Two families of tone, matching the brief's blue and green:
 *
 *   blue   the brand sky blue, saturated     sky    its palest tint
 *   green  mint, saturated                   mint   its palest tint (sage)
 *   surface  a white card on its layered shadow, for long runs of cards where
 *            a wall of colour would stop the colour meaning anything
 *
 * Every accent tone takes the fixed `ink`, body copy at `ink/80`, so the card
 * reads the same in both themes. Only `surface` uses the semantic tokens,
 * because only `surface` inverts.
 *
 * Hover. A card that is a link lifts, deepens its shadow and sends its arrow
 * chip out; a card that is not a link never lifts, so it never promises a click
 * that does nothing. Both kinds tip their icon chip and carry the pointer
 * spotlight, so every card still answers the pointer.
 */
export type FeatureTone = "blue" | "sky" | "green" | "mint" | "surface";

const shells: Record<FeatureTone, { card: string; body: string; chip: IconChipTone }> = {
  blue: { card: "bg-purple text-ink shadow-inset", body: "text-ink/80", chip: "white" },
  sky: { card: "bg-lavender-soft text-ink shadow-inset", body: "text-ink/80", chip: "blue" },
  green: { card: "bg-mint text-ink shadow-inset", body: "text-ink/80", chip: "white" },
  mint: { card: "bg-sage text-ink shadow-inset", body: "text-ink/80", chip: "green" },
  surface: {
    card: "spotlight-surface bg-surface text-fg shadow-card",
    body: "text-fg-muted",
    chip: "blue",
  },
};

const lift: Record<FeatureTone, string> = {
  blue: "hover:-translate-y-1.5 hover:shadow-inset-hover",
  sky: "hover:-translate-y-1.5 hover:shadow-inset-hover",
  green: "hover:-translate-y-1.5 hover:shadow-inset-hover",
  mint: "hover:-translate-y-1.5 hover:shadow-inset-hover",
  surface: "hover:-translate-y-1.5 hover:shadow-card-hover",
};

type FeatureCardProps = {
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  title: ReactNode;
  children?: ReactNode;
  tone?: FeatureTone;
  /** Overrides the chip tone the card's surface would pick. */
  chipTone?: IconChipTone;
  href?: string;
  external?: boolean;
  /** Heading level; pick for the outline, not for size. */
  as?: "h2" | "h3" | "h4" | "p";
  /** Anything under the copy: a figure, a list of chips, a link row. */
  footer?: ReactNode;
  className?: string;
  size?: "md" | "lg";
};

export function FeatureCard({
  icon,
  title,
  children,
  tone = "sky",
  chipTone,
  href,
  external,
  as: Heading = "h3",
  footer,
  className = "",
  size = "md",
}: FeatureCardProps) {
  const shell = shells[tone];
  const base = `group spotlight flex h-full flex-col overflow-hidden rounded-xl transition-[transform,box-shadow,background-color] duration-500 ease-out-expo ${
    size === "lg" ? "gap-6 p-7 sm:p-9" : "gap-5 p-6 sm:p-7"
  } ${shell.card} ${className}`;

  const content = (
    <>
      {icon || href ? (
        <div className="flex items-start justify-between gap-4">
          {icon ? (
            <IconChip
              icon={icon}
              tone={chipTone ?? shell.chip}
              size={size === "lg" ? "lg" : "md"}
            />
          ) : (
            <span />
          )}
          {href ? <CircleArrow tone={tone === "surface" ? "blue" : "ink"} size="sm" /> : null}
        </div>
      ) : null}

      <div className="flex flex-1 flex-col">
        <Heading className={size === "lg" ? "text-h3" : "text-label font-bold"}>{title}</Heading>
        {children ? (
          <div className={`mt-2.5 ${size === "lg" ? "text-body-sm" : "text-meta"} ${shell.body}`}>
            {children}
          </div>
        ) : null}
      </div>

      {footer ? <div>{footer}</div> : null}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={`${base} ${lift[tone]}`}
        {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      >
        {content}
      </a>
    );
  }

  return <div className={base}>{content}</div>;
}
