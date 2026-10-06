import type { CSSProperties } from "react";
import type { RateItem } from "../../types";
import { GoldIcon, HouseIcon, VehicleIcon } from "../../assets/icons";
import { CircleArrow } from "./CircleArrow";

const marks = { house: HouseIcon, gold: GoldIcon, vehicle: VehicleIcon };

/**
 * Ink scrim between the photograph and the white text. Two layers: a deep wash
 * rising from the bottom edge behind the product, rate and note, and a lighter
 * one from the top behind the icon and the arrow chip. The middle stays clear
 * enough for the photograph to read. The text sits on the darkest part of each
 * layer, which is what keeps white at AA whatever the photo does behind it.
 * The top layer is as strong as it is because of the vehicle photo, whose
 * sunset sky sits right behind the icon; at 0.55 the icon fell to 2.3:1.
 */
const scrim: CSSProperties = {
  backgroundImage: [
    "linear-gradient(to top, rgb(20 10 46 / 0.92) 0%, rgb(20 10 46 / 0.78) 38%, rgb(20 10 46 / 0.18) 72%, rgb(20 10 46 / 0) 100%)",
    "linear-gradient(to bottom, rgb(20 10 46 / 0.72) 0%, rgb(20 10 46 / 0.4) 22%, rgb(20 10 46 / 0) 42%)",
  ].join(", "),
};

/**
 * A published lending rate, set in white over a photograph of the loan it
 * prices.
 *
 * The photograph is decorative here (`alt=""`): the card is a link, and its
 * name should be "Housing loan 8.50% onwards, per annum", not a description of
 * the picture. The ink fill behind it means the text is legible before the
 * image arrives. The whole card is the link, so the hit area is the card and
 * not just the product name. On hover the card lifts and the photograph zooms
 * inside it; there is still no shadow and, as a coloured card, no border.
 */
export function RateCard({ item }: { item: RateItem }) {
  const Mark = marks[item.icon];
  const { photo } = item;

  return (
    <a
      href={item.href}
      className="group relative isolate flex min-h-[300px] flex-col justify-between gap-8 overflow-hidden rounded-2xl bg-ink p-7 text-white transition-transform duration-500 ease-out-quint hover:-translate-y-1 active:translate-y-0 active:scale-[0.99] sm:min-h-[320px] sm:p-8"
    >
      <span aria-hidden="true" className="hover-zoom absolute inset-0 -z-10">
        <img
          src={photo.src}
          srcSet={photo.srcSet}
          sizes="(min-width: 1024px) 400px, 92vw"
          alt=""
          width={photo.width}
          height={photo.height}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </span>
      <span aria-hidden="true" className="absolute inset-0 -z-10" style={scrim} />

      <span className="flex items-start justify-between gap-4">
        <Mark className="h-8 w-8 text-white" />
        <CircleArrow tone="white" size="sm" className="group-hover:translate-x-0.5" />
      </span>

      <span>
        <span className="block text-label text-white/90">{item.product}</span>
        <span className="mt-2 flex items-baseline gap-2">
          <span className="text-display">{item.rate}</span>
        </span>
        {item.note ? <span className="mt-1 block text-fine text-white/85">{item.note}</span> : null}
      </span>
    </a>
  );
}
