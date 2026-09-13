import type { RateItem } from "../../types";
import { GoldIcon, HouseIcon, VehicleIcon } from "../../assets/icons";
import { CircleArrow } from "./CircleArrow";

const marks = { house: HouseIcon, gold: GoldIcon, vehicle: VehicleIcon };

/**
 * A published lending rate. Flat by design: structure comes from the field
 * colour and the hairline, never from a drop shadow.
 *
 * The whole card is the link, so the hit area is the card and not just the
 * product name.
 */
export function RateCard({ item }: { item: RateItem }) {
  const Mark = marks[item.icon];

  return (
    <a
      href={item.href}
      className="group flex flex-col justify-between gap-8 rounded-2xl border border-line bg-surface p-7 transition-colors duration-200 ease-out-quint hover:bg-lavender-soft hover:text-ink sm:p-8"
    >
      <span className="flex items-start justify-between gap-4">
        <Mark className="h-8 w-8 text-forest transition-colors group-hover:text-ink dark:text-lavender" />
        <CircleArrow tone="lavender" size="sm" className="group-hover:translate-x-0.5" />
      </span>

      <span>
        <span className="block text-label text-fg-muted transition-colors group-hover:text-ink/70">
          {item.product}
        </span>
        <span className="mt-2 flex items-baseline gap-2">
          <span className="text-display">{item.rate}</span>
        </span>
        {item.note ? (
          <span className="mt-1 block text-fine text-fg-muted transition-colors group-hover:text-ink/70">
            {item.note}
          </span>
        ) : null}
      </span>
    </a>
  );
}
