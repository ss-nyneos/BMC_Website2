import { ArrowRightIcon } from "../../assets/icons";

export type ArrowTone = "lavender" | "ink" | "white" | "blue";

type CircleArrowProps = {
  tone?: ArrowTone;
  size?: "sm" | "md";
  className?: string;
};

/**
 * The signature circular arrow. It appears inside pill buttons, at the end of
 * product rows and next to inline links, and it is the only arrow on the site:
 * the spec forbids typing a literal arrow glyph into copy.
 *
 * Always decorative. The label it sits beside carries the meaning.
 *
 * It carries two arrows in one grid cell. When the parent `group` is hovered,
 * the first slides out through the right edge and the second slides in from
 * the left (`.arrow-swap` in globals.css), so the chip appears to move forward
 * a step without moving at all.
 */
const tones: Record<ArrowTone, string> = {
  lavender: "bg-lavender text-ink",
  ink: "bg-ink text-white",
  white: "bg-white text-ink",
  blue: "bg-purple text-ink",
};

const sizes = {
  sm: "h-8 w-8 [&>svg]:h-4 [&>svg]:w-4",
  md: "h-11 w-11 [&>svg]:h-5 [&>svg]:w-5",
};

export function CircleArrow({ tone = "lavender", size = "md", className = "" }: CircleArrowProps) {
  return (
    <span
      aria-hidden="true"
      className={`arrow-swap inline-grid shrink-0 place-items-center overflow-hidden rounded-pill transition-transform duration-200 ease-out-quint ${tones[tone]} ${sizes[size]} ${className}`}
    >
      <ArrowRightIcon />
      <ArrowRightIcon />
    </span>
  );
}
