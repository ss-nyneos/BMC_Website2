import type { Photo, PhotoField } from "../../types";
import { srcSet } from "../../data/photos";

type CirclePhotoProps = {
  photo: Photo;
  /** Coloured disc behind the image. `none` inside an already-coloured panel. */
  field?: PhotoField | "none";
  /** Above-the-fold images opt out of lazy loading. */
  priority?: boolean;
  /** Unsplash id, when a 2x source set is wanted. */
  id?: string;
  className?: string;
};

/**
 * A photograph masked to a perfect circle on a coloured field, per spec 6.4.
 *
 * The field is drawn as a ring a few pixels wider than the photo so the colour
 * still reads once a rectangular photograph is cropped into the circle. In the
 * reference the subjects are cut out and the colour fills the whole disc; a rim
 * is the honest equivalent for uncut photography.
 *
 * Width and height are always emitted so the circle reserves its own space and
 * nothing on the page shifts while the image downloads.
 *
 * The photograph sits in its own clipped circle so it can zoom slightly when
 * the nearest `group` (a card, a photo panel) is hovered without the image
 * spilling past the ring. `isolate` keeps Safari clipping a transformed child
 * to the rounded edge.
 */
const fields: Record<PhotoField | "none", string> = {
  mint: "bg-mint p-2 sm:p-3",
  orange: "bg-orange p-2 sm:p-3",
  lavender: "bg-lavender p-2 sm:p-3",
  blue: "bg-purple p-2 sm:p-3",
  purple: "bg-purple p-2 sm:p-3",
  none: "p-0",
};

export function CirclePhoto({ photo, field = "none", priority = false, id, className = "" }: CirclePhotoProps) {
  return (
    <div className={`rounded-pill ${fields[field]} ${className}`}>
      <div className="isolate overflow-hidden rounded-pill">
        <img
          src={photo.src}
          srcSet={id ? srcSet(id, photo.width, photo.height) : undefined}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          {...{ fetchpriority: priority ? "high" : "auto" }}
          className="aspect-square h-auto w-full rounded-pill object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.07]"
        />
      </div>
    </div>
  );
}
