/**
 * The bank's logo: the arch crest with the two figures, and the bank's name set
 * beneath it. Supplied as artwork, so it is placed rather than redrawn.
 *
 * Two things about the file drive how it is rendered:
 *
 * 1. It is opaque, with a white field. There is no transparency to key out, and
 *    keying white would punch holes through the dupatta, the dhoti and the
 *    interior of the arch. So wherever the surface behind it is not white — the
 *    footer's blue, and the whole page in dark mode — it sits on a white plate.
 *    On a white page the plate is invisible, which is why it is unconditional:
 *    one rendering that is correct on every surface beats a `dark:` branch.
 *
 * 2. It is portrait, 230x322. The name is part of the artwork, so there is no
 *    text lockup beside it; setting the name again in live type would print it
 *    twice. That also means the image is meaningful rather than decorative, and
 *    carries the accessible name unless the caller has already given one to a
 *    wrapping link.
 */

const LOGO_SRC = "/bmc-logo.png";
const LOGO_W = 230;
const LOGO_H = 322;

type LogoProps = {
  /**
   * Rendered height in pixels. Width follows the artwork's ratio. Below about
   * 56px the bank's name inside the crest stops being legible, so callers that
   * need a mark rather than a lockup should think again rather than shrink it.
   */
  height?: number;
  /**
   * Leave undefined when a wrapping link already names the destination, so the
   * name is not announced twice; pass a string when the logo stands alone.
   */
  alt?: string;
  className?: string;
};

export function Logo({ height = 72, alt, className = "" }: LogoProps) {
  const width = Math.round((LOGO_W / LOGO_H) * height);

  return (
    <span
      className={`inline-flex shrink-0 rounded-lg bg-white p-1.5 ${className}`}
      style={{ lineHeight: 0 }}
    >
      <img
        src={LOGO_SRC}
        alt={alt ?? ""}
        aria-hidden={alt === undefined ? true : undefined}
        width={width}
        height={height}
        // Intrinsic dimensions are set above so the box is reserved before the
        // image lands; these keep it exact if the CSS ever disagrees.
        style={{ width, height }}
        decoding="async"
      />
    </span>
  );
}
