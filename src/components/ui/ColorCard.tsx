import type { CardTone, Photo } from "../../types";
import { CirclePhoto } from "./CirclePhoto";
import { CircleArrow } from "./CircleArrow";

type ColorCardProps = {
  title: string;
  caption: string;
  href: string;
  tone: CardTone;
  photo: Photo;
  id?: string;
};

/**
 * A solid colour field with a circular photograph centred on it (reference
 * image 6). One of only three on the page, so they read as a deliberate trio
 * rather than a generic card grid.
 *
 * The `blue` role-name is kept, but the card itself is `sage`, a lighter green
 * than `mint` — the trio reads gold / mint / pale mint rather than a blue card.
 */
const tones = {
  purple: "bg-purple text-ink",
  blue: "bg-sage text-ink",
  mint: "bg-mint text-ink",
  lavender: "bg-lavender text-ink",
};

const arrowTone = {
  purple: "ink",
  blue: "ink",
  mint: "ink",
  lavender: "ink",
} as const;

export function ColorCard({ title, caption, href, tone, photo, id }: ColorCardProps) {
  return (
    <a
      href={href}
      className={`group flex flex-col gap-8 rounded-2xl p-7 transition-transform duration-300 ease-out-quint hover:-translate-y-1 sm:p-9 ${tones[tone]}`}
    >
      <div className="mx-auto w-full max-w-[280px] overflow-hidden">
        <CirclePhoto photo={photo} id={id} className="transition-transform duration-500 ease-out-quint group-hover:scale-[1.03]" />
      </div>

      <div className="flex items-end justify-between gap-5">
        <div>
          <h3 className="text-h3">{title}</h3>
          <p className="mt-2 text-meta text-current/85">{caption}</p>
        </div>
        <CircleArrow tone={arrowTone[tone]} className="group-hover:translate-x-0.5" />
      </div>
    </a>
  );
}
