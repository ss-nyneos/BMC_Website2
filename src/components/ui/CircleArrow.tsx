import { ArrowRightIcon } from "../../assets/icons";

export type ArrowTone = "lavender" | "ink" | "white" | "blue";

type CircleArrowProps = {
  tone?: ArrowTone;
  size?: "sm" | "md";
  /** Points the arrow down, for in-page cues such as "scroll". */
  direction?: "right" | "down";
  className?: string;
};

/**
 * The signature circular arrow. It appears inside pill buttons, at the end of
 * product rows and next to inline links, and it is the only arrow on the site:
 * the spec forbids typing a literal arrow glyph into copy.
 *
 * On hover of the nearest `group`, the arrow travels out through the far side
 * of the chip while a second one slides in behind it, so the chip reads as
 * "go" rather than just changing colour. The second arrow is the same icon;
 * the chip clips both.
 *
 * Always decorative. The label it sits beside carries the meaning.
 */
const tones: Record<ArrowTone, string> = {
  lavender: "bg-lavender text-ink",
  ink: "bg-ink text-white",
  white: "bg-white text-ink",
  blue: "bg-purple text-ink",
};

const sizes = {
  sm: "h-8 w-8 [&_svg]:h-4 [&_svg]:w-4",
  md: "h-11 w-11 [&_svg]:h-5 [&_svg]:w-5",
};

const travel = {
  right: {
    wrap: "",
    out: "group-hover:translate-x-[170%]",
    in: "-translate-x-[170%] group-hover:translate-x-0",
  },
  down: {
    wrap: "rotate-90",
    out: "group-hover:translate-x-[170%]",
    in: "-translate-x-[170%] group-hover:translate-x-0",
  },
};

export function CircleArrow({
  tone = "lavender",
  size = "md",
  direction = "right",
  className = "",
}: CircleArrowProps) {
  const motion = travel[direction];

  return (
    <span
      aria-hidden="true"
      className={`relative inline-grid shrink-0 place-items-center overflow-hidden rounded-pill transition-transform duration-300 ease-out-expo group-hover:scale-110 ${tones[tone]} ${sizes[size]} ${className}`}
    >
      <span className={`relative grid h-full w-full place-items-center ${motion.wrap}`}>
        <ArrowRightIcon
          className={`transition-transform duration-500 ease-out-expo ${motion.out}`}
        />
        <ArrowRightIcon
          className={`absolute inset-0 m-auto transition-transform duration-500 ease-out-expo ${motion.in}`}
        />
      </span>
    </span>
  );
}
