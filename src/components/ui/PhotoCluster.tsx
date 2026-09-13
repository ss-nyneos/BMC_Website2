import { CirclePhoto } from "./CirclePhoto";
import { Capsule } from "./Capsule";
import { photoId, photos } from "../../data/photos";

/**
 * The hero arrangement: circle photographs and decorative capsules interleaved
 * in two offset columns (reference image 1).
 *
 * Built as a grid rather than absolute positioning so it reflows instead of
 * overlapping at awkward widths.
 *
 * From lg the negative margins let the columns run past the panel's padding at
 * the top and bottom, where the panel's own overflow clip crops them. That crop
 * is what stops the cluster reading as a tidy inset grid, and it is how the
 * reference composes the same block.
 *
 * The bleed is deliberately asymmetric: deep at the top, shallow at the bottom.
 * An even bleed cut the last photograph in each column through the middle of a
 * face, which reads as a bug rather than a crop.
 *
 * Below lg the capsules and the two smaller photographs drop out, leaving the
 * two-photo stack the spec calls for.
 */
export function PhotoCluster() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:-mb-12 lg:-mt-28">
      <div className="flex flex-col gap-4 sm:gap-5 lg:pt-14">
        <Capsule className="hidden h-64 w-full lg:block" tone="lighter" />
        <CirclePhoto
          photo={photos.heroManGlasses}
          id={photoId.heroManGlasses}
          field="mint"
          priority
        />
        <CirclePhoto
          photo={photos.heroSmiling}
          id={photoId.heroSmiling}
          field="lavender"
          className="hidden lg:block"
        />
      </div>

      <div className="flex flex-col gap-4 sm:gap-5">
        <CirclePhoto photo={photos.heroWoman} id={photoId.heroWoman} field="mint" priority />
        <Capsule className="hidden h-72 w-full lg:block" />
        <CirclePhoto
          photo={photos.heroPortrait}
          id={photoId.heroPortrait}
          field="orange"
          className="hidden lg:block"
        />
      </div>
    </div>
  );
}
