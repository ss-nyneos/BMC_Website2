import type { RateItem } from "../../types";
import { GoldIcon, HouseIcon, VehicleIcon } from "../../assets/icons";
import { CircleArrow } from "./CircleArrow";
import { CountUp } from "./CountUp";

const marks = { house: HouseIcon, gold: GoldIcon, vehicle: VehicleIcon };

/**
 * A published lending rate, on the bank's own branch photograph.
 *
 * The photo fills the card; a scrim graduated from clear at the top to nearly
 * opaque ink at the bottom seats the white text at the foot without hiding the
 * photograph at the icon end. `hero-halo` gives the white type the same tight
 * shadow the hero's headline uses, so it holds over whichever part of the
 * photograph sits behind it.
 *
 * The grid wrapping every card in `RateStrip` carries `on-dark`, which keeps
 * each card's own focus ring white — the same trade the hero photograph
 * makes, since the ink ring the rest of the page uses would all but disappear
 * against the scrim. It has to sit on that ancestor rather than on the card
 * itself: the rule it triggers is a descendant selector, so it does nothing on
 * the focusable element it is written on.
 *
 * The whole card is the link, so the hit area is the card and not just the
 * product name. It still rests on a layered shadow and lifts under the
 * pointer, matching every other card on the page; only its own face changed.
 */
export function RateCard({ item }: { item: RateItem }) {
  const Mark = marks[item.icon];

  return (
    <a
      href={item.href}
      className="group relative isolate flex h-full flex-col justify-between gap-16 overflow-hidden rounded-2xl p-7 text-white shadow-card transition-[transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-card-hover sm:gap-20 sm:p-8"
    >
      <img
        src={item.photo.src}
        alt={item.photo.alt}
        width={item.photo.width}
        height={item.photo.height}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.06]"
      />
      {/* The scrim: near-clear behind the icon, near-opaque behind the type, so
          one photograph serves both a legible mark and legible white text
          without a flat wash hiding it end to end. */}
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/22 via-ink/62 to-ink/90 transition-colors duration-500 ease-out-expo group-hover:from-ink/34 group-hover:to-ink/93"
      />

      <span className="relative flex items-start justify-between gap-4">
        {/* The mark keeps its own small opaque backing, independent of the
            scrim: the scrim is tuned for the text block it sits above, and a
            bright patch of photograph (paper, a window) behind a bare white
            icon can still wash it out. The chip is opaque enough to hold the
            icon clear of whatever the photograph is doing underneath it. */}
        <span className="grid h-11 w-11 place-items-center rounded-pill bg-ink/70 transition-[background-color,transform] duration-500 ease-out-expo group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-ink/80">
          <Mark className="h-5 w-5 text-white" />
        </span>
        <CircleArrow tone="white" size="sm" />
      </span>

      <span className="hero-halo relative">
        <span className="block text-label text-white/85">{item.product}</span>
        <span className="mt-2 flex items-baseline gap-2">
          <CountUp value={item.rate} className="text-display" />
        </span>
        {item.note ? <span className="mt-1 block text-fine text-white/80">{item.note}</span> : null}
      </span>
    </a>
  );
}
