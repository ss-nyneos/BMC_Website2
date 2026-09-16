import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { CircleArrow, type ArrowTone } from "./CircleArrow";

export type PillVariant =
  | "light"
  | "purple"
  | "outline"
  | "solid"
  | "ink"
  | "ghost-light"
  | "ghost-ink";

type Shared = {
  children: ReactNode;
  variant?: PillVariant;
  size?: "sm" | "md" | "lg";
  className?: string;
  /** Set false for a pill that is not a navigation or submit affordance. */
  showArrow?: boolean;
};

type AsAnchor = Shared & { href: string; external?: boolean } & Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    keyof Shared | "href"
  >;

type AsButton = Shared & { href?: undefined } & Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    keyof Shared
  >;

type PillButtonProps = AsAnchor | AsButton;

/**
 * Fully rounded button with the trailing circular arrow, per spec section 6.3.
 *
 * Variant naming follows the spec rather than the resulting colour: `purple` is
 * the gold-tinted pill used on light panels, because that is the pill the
 * accent sections of the reference use.
 */
const variants: Record<PillVariant, { shell: string; arrow: ArrowTone }> = {
  // For the accent panels: a white pill lifted off the colour by a soft
  // layered shadow rather than an outline, ink arrow chip.
  light: {
    shell: "bg-white text-ink shadow-pill hover:shadow-pill-hover",
    arrow: "ink",
  },
  // For light backgrounds: pale sky pill, ink arrow chip.
  purple: {
    shell: "bg-lavender text-ink hover:bg-lavender-soft hover:shadow-pill-hover",
    arrow: "ink",
  },
  // Hairline pill, fills on hover.
  outline: {
    shell:
      "border border-line-strong bg-transparent text-fg hover:border-transparent hover:bg-lavender-soft hover:text-ink hover:shadow-pill",
    arrow: "lavender",
  },
  // Highest-emphasis action on a light page: sky pill, ink label.
  solid: {
    shell: "bg-purple text-ink shadow-pill hover:bg-purple-deep hover:shadow-pill-hover",
    arrow: "ink",
  },
  // Highest-emphasis action on a pale accent panel, where a sky pill would
  // barely separate from the field.
  ink: {
    shell: "bg-ink text-white hover:bg-ink/85 hover:shadow-pill-hover",
    arrow: "white",
  },
  // Secondary action over a photograph. The white hairline brightens and the
  // pill fills on hover.
  "ghost-light": {
    shell: "border border-white/70 bg-[rgb(14_14_18/0.34)] text-white hover:border-white hover:bg-white hover:text-ink",
    arrow: "white",
  },
  // Secondary action on a pale accent panel.
  "ghost-ink": {
    shell: "border border-ink/30 text-ink hover:border-ink/60 hover:bg-white/60",
    arrow: "ink",
  },
};

const sizes = {
  sm: "h-12 pl-6 pr-1.5 gap-3 text-label",
  md: "h-14 pl-7 pr-2 gap-4 text-label",
  lg: "h-16 pl-8 pr-2 gap-4 text-body",
};

export function PillButton(props: PillButtonProps) {
  const {
    children,
    variant = "purple",
    size = "md",
    className = "",
    showArrow = true,
    ...rest
  } = props;

  const tokens = variants[variant];
  const shell = [
    "group inline-flex select-none items-center justify-between whitespace-nowrap rounded-pill",
    "font-medium leading-none",
    "transition-[color,background-color,border-color,box-shadow,transform] duration-300 ease-out-expo",
    "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
    "disabled:pointer-events-none disabled:opacity-50",
    sizes[size],
    tokens.shell,
    showArrow ? "" : "pr-7",
    className,
  ].join(" ");

  const inner = (
    <>
      <span>{children}</span>
      {showArrow ? (
        <CircleArrow tone={tokens.arrow} size={size === "sm" ? "sm" : "md"} />
      ) : null}
    </>
  );

  if ("href" in props && props.href !== undefined) {
    const { href, external, ...anchorRest } = rest as AsAnchor;
    return (
      <a
        href={href}
        className={shell}
        {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
        {...anchorRest}
      >
        {inner}
      </a>
    );
  }

  const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type="button" className={shell} {...buttonRest}>
      {inner}
    </button>
  );
}
