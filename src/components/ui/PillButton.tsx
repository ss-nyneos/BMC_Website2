import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { CircleArrow, type ArrowTone } from "./CircleArrow";

export type PillVariant = "light" | "purple" | "outline" | "solid";

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
  // For the gold accent panels: white pill with a hairline so it reads
  // against a light background, ink arrow chip.
  light: {
    shell: "border border-line bg-white text-ink hover:bg-lavender-soft",
    arrow: "ink",
  },
  // For light backgrounds: gold-tinted pill, ink arrow chip.
  purple: {
    shell: "bg-lavender text-ink hover:bg-lavender-soft",
    arrow: "ink",
  },
  // Hairline row; the fill sweeps in from the left on hover.
  outline: {
    shell: "fill-wipe fill-wipe-x border border-line bg-transparent text-fg hover:text-ink",
    arrow: "lavender",
  },
  // Highest-emphasis action on a light page: gold pill, hairline, ink label.
  solid: {
    shell: "border border-line bg-purple text-ink hover:bg-purple-deep",
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
    "font-medium leading-none transition-[color,background-color,border-color,transform] duration-200 ease-out-quint",
    // Press feedback: the pill settles slightly under the pointer.
    "active:scale-[0.97]",
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
        <CircleArrow
          tone={tokens.arrow}
          size={size === "sm" ? "sm" : "md"}
          className="group-hover:translate-x-0.5"
        />
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
