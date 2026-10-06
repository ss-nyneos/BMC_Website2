import type { Photo, PhotoField } from "../../types";
import { srcSet } from "../../data/photos";

type CirclePhotoProps = {
  photo: Photo;
  /** Coloured disc behind the image. `none` inside an already-coloured panel. */
  field?: PhotoField | "none";
  /** Above-the-fold images opt out of lazy loading. */
  priority?: boolean;
  /**
   * Unsplash id, for a 1x/2x set when the photo carries no `srcSet` of its
   * own. Every photo in `data/photos` now does, so this is a fallback.
   */
  id?: string;
  /** Rendered width hint for a self-hosted `photo.srcSet`. */
  sizes?: string;
  /**
   * Scroll drift of the image inside its circle, as a fraction of its height
   * (see useParallax). Keep it at or under 0.08 so the edge never shows.
   */
  parallax?: number;
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
 * The inner mask is what lets the photograph move without the circle moving:
 * parallax and the hover zoom transform the image, and the mask crops it.
 * `isolate` keeps Safari clipping a transformed child to the rounded edge.
 */
const fields: Record<PhotoField | "none", string> = {
  mint: "bg-mint p-2 sm:p-3",
  orange: "bg-orange p-2 sm:p-3",
  lavender: "bg-lavender p-2 sm:p-3",
  blue: "bg-purple p-2 sm:p-3",
  purple: "bg-purple p-2 sm:p-3",
  none: "p-0",
};

export function CirclePhoto({
  photo,
  field = "none",
  priority = false,
  id,
  parallax,
  sizes = "(min-width: 1024px) 280px, 45vw",
  className = "",
}: CirclePhotoProps) {
  return (
    <div className={`circle-photo rounded-pill ${fields[field]} ${className}`}>
      <div className="isolate overflow-hidden rounded-pill">
        <img
          src={photo.src}
          srcSet={photo.srcSet ?? (id ? srcSet(id, photo.width, photo.height) : undefined)}
          sizes={photo.srcSet ? sizes : undefined}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          fetchPriority={priority ? "high" : "auto"}
          data-parallax={parallax}
          className={`block aspect-square h-auto w-full rounded-pill object-cover ${
            parallax ? "parallax-img" : ""
          }`}
        />
      </div>
    </div>
  );
}
