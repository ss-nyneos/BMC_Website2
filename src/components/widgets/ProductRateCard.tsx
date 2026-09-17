import type { ComponentType, SVGProps } from "react";
import { CircleArrow } from "../ui/CircleArrow";
import { CirclePhoto } from "../ui/CirclePhoto";
import { CountUp } from "../ui/CountUp";
import { IconChip } from "../ui/IconChip";
import type { Photo } from "../../types";

type ProductRateCardProps = {
  title: string;
  description?: string;
  /** The published headline rate, e.g. "8.50%". */
  rate?: string;
  rateNote?: string;
  href: string;
  photo: Photo;
  photoId?: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  tone: "blue" | "green" | "sky";
};

const tones = {
  blue: "bg-purple",
  green: "bg-mint",
  sky: "bg-lavender",
};

/**
 * A loan product on colour: its photograph in a circle, its name, the bank's
 * headline rate and a way on.
 *
 * The photograph is the product's own object (a model house, gold bangles, a
 * car key), never a person. It sits in the top corner, partly off the card, and
 * zooms inside its circle when the card is hovered while the card lifts and the
 * arrow chip runs. The rate counts up the first time the card nears the
 * viewport, and the real figure is in the DOM throughout.
 *
 * Text is the fixed `ink` on every tone, so it holds in dark mode.
 */
export function ProductRateCard({
  title,
  description,
  rate,
  rateNote,
  href,
  photo,
  photoId,
  icon,
  tone,
}: ProductRateCardProps) {
  return (
    <a
      href={href}
      className={`group spotlight relative flex h-full min-h-[340px] flex-col overflow-hidden rounded-2xl p-7 text-ink shadow-inset transition-[transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-2 hover:shadow-inset-hover sm:p-8 ${tones[tone]}`}
    >
      <div
        aria-hidden="true"
        className="absolute -right-10 -top-10 w-44 rounded-pill bg-white p-2 shadow-pill transition-transform duration-700 ease-out-expo group-hover:-rotate-6 group-hover:scale-105 sm:w-48 sm:p-2.5"
      >
        <CirclePhoto photo={{ ...photo, alt: "" }} id={photoId} />
      </div>

      <IconChip icon={icon} tone="white" className="relative" />

      <div className="relative mt-auto pt-20">
        <h3 className="text-h3">{title}</h3>
        {description ? (
          <p className="mt-2 max-w-[34ch] text-meta text-ink/80">{description}</p>
        ) : null}

        <div className="mt-6 flex items-end justify-between gap-4 border-t border-ink/15 pt-5">
          {rate ? (
            <p>
              <CountUp value={rate} className="block text-display" />
              {rateNote ? <span className="block text-fine text-ink/80">{rateNote}</span> : null}
            </p>
          ) : (
            <p className="text-label font-medium">Ask your branch for the rate</p>
          )}
          <CircleArrow tone="ink" />
        </div>
      </div>
    </a>
  );
}
