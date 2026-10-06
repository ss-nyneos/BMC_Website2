import type { Photo } from "../../types";
import { CircleArrow } from "./CircleArrow";
import { MediaPanel } from "./MediaPanel";

type PhotoCardProps = {
  title: string;
  caption: string;
  href: string;
  photo: Photo;
};

/**
 * A link card that is all photograph: the picture fills the card and the title
 * and caption sit on it in white, over MediaPanel's ink scrim (reference image
 * 6, reworked). It replaced the colour-field cards with a circle photo in the
 * middle; there is no field colour, ring or border left.
 *
 * The photo is decorative inside the link, so the link is announced by its
 * title and caption alone. On hover the card lifts and the photograph zooms
 * inside it; the zoom uses the independent `scale` property, so it composes
 * with the parallax drift on the same image.
 */
export function PhotoCard({ title, caption, href, photo }: PhotoCardProps) {
  return (
    <a
      href={href}
      className="group block rounded-2xl transition-transform duration-500 ease-out-quint hover:-translate-y-1.5 active:translate-y-0 active:scale-[0.99]"
    >
      <MediaPanel
        photo={photo}
        decorative
        sizes="(min-width: 1024px) 400px, 100vw"
        height="min-h-[380px] sm:min-h-[440px] lg:min-h-[480px]"
        className="hover-zoom"
      >
        <span className="flex items-end justify-between gap-5">
          <span>
            <span className="block text-h3">{title}</span>
            <span className="mt-2 block text-meta text-white/85">{caption}</span>
          </span>
          <CircleArrow tone="white" className="group-hover:translate-x-0.5" />
        </span>
      </MediaPanel>
    </a>
  );
}
