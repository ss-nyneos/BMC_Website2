import type { CSSProperties, ReactNode } from "react";
import type { Photo } from "../../types";

type MediaPanelProps = {
  photo: Photo;
  /** Rendered width hint for the photo's width-described source set. */
  sizes?: string;
  /**
   * Optional overlay, set in white. Supplying it also lays the ink scrim over
   * the lower part of the photograph so the text holds AA contrast.
   */
  children?: ReactNode;
  /** Above-the-fold panels opt out of lazy loading. */
  priority?: boolean;
  /**
   * Inside a link card the overlay text already names the destination, so the
   * picture is marked decorative rather than read out ahead of it.
   */
  decorative?: boolean;
  /** Minimum-height utilities. In a split the card takes the text's height. */
  height?: string;
  className?: string;
};

/**
 * Bottom-weighted ink scrim for text set over a photograph. It is darkest where
 * the overlay sits and clear across the top half, so the picture still reads.
 */
const scrim: CSSProperties = {
  backgroundImage:
    "linear-gradient(to top, rgb(20 10 46 / 0.9) 0%, rgb(20 10 46 / 0.7) 30%, rgb(20 10 46 / 0.12) 62%, rgb(20 10 46 / 0) 100%)",
};

/**
 * A photograph that fills its whole card: no coloured field, no ring, no
 * border. It replaced the earlier circle-photo-on-a-blue-panel treatment on the
 * homepage splits and the inner pages' media columns.
 *
 * In a `SplitPanel` the card stretches to the height of the text beside it, so
 * the minimum height only governs the stacked layout on small screens.
 * `object-cover` crops to whatever shape that leaves.
 *
 * The image drifts inside the card as the page scrolls (`useParallax`); the
 * card's own overflow clip is the mask. `bg-ink` is the placeholder while the
 * file downloads, so an overlay is legible before the photograph arrives.
 */
export function MediaPanel({
  photo,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  children,
  priority = false,
  decorative = false,
  height = "min-h-[320px] sm:min-h-[420px]",
  className = "",
}: MediaPanelProps) {
  return (
    <div
      className={`photo-panel relative isolate flex w-full overflow-hidden rounded-2xl bg-ink ${height} ${className}`}
    >
      <img
        src={photo.src}
        srcSet={photo.srcSet}
        sizes={photo.srcSet ? sizes : undefined}
        alt={decorative ? "" : photo.alt}
        width={photo.width}
        height={photo.height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        data-parallax={0.06}
        className="parallax-img absolute inset-0 -z-10 h-full w-full object-cover"
      />

      {children ? (
        <>
          <span aria-hidden="true" className="absolute inset-0 -z-10" style={scrim} />
          <div className="mt-auto w-full p-7 text-white sm:p-10 lg:p-12">{children}</div>
        </>
      ) : null}
    </div>
  );
}
