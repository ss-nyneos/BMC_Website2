import type { ComponentType, SVGProps } from "react";

export type IconChipTone = "ink" | "white" | "blue" | "green" | "sky" | "mint";

type IconChipProps = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  tone?: IconChipTone;
  size?: "sm" | "md" | "lg";
  className?: string;
};

/**
 * A round icon mark, the leading element of every card on the inner pages.
 *
 * Tones are chosen by the surface the chip sits on, not by taste: `white` and
 * `ink` on an accent card, `blue` and `green` on the page or a white card. Every
 * pairing is a fixed accent with fixed text, so none of them inverts in dark
 * mode.
 *
 * Under the nearest `group` hover the chip tips and grows a little, which is the
 * card's "pop". Always decorative: the card's heading carries the meaning.
 */
const tones: Record<IconChipTone, string> = {
  ink: "bg-ink text-white",
  white: "bg-white text-ink shadow-pill",
  blue: "bg-purple text-ink",
  green: "bg-mint text-ink",
  sky: "bg-lavender text-ink",
  mint: "bg-sage text-ink",
};

const sizes = {
  sm: "h-10 w-10 [&_svg]:h-5 [&_svg]:w-5",
  md: "h-12 w-12 [&_svg]:h-6 [&_svg]:w-6",
  lg: "h-14 w-14 [&_svg]:h-7 [&_svg]:w-7",
};

export function IconChip({
  icon: Icon,
  tone = "blue",
  size = "md",
  className = "",
}: IconChipProps) {
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-pill transition-transform duration-500 ease-out-expo group-hover:-rotate-[10deg] group-hover:scale-110 ${tones[tone]} ${sizes[size]} ${className}`}
    >
      <Icon />
    </span>
  );
}
