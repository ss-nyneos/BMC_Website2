import { CirclePhoto } from "./CirclePhoto";
import { Capsule } from "./Capsule";
import { loanPhotos } from "../../data/photos";

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
 * The two photographs are the bank's own: a home loan consultation and a gold
 * loan valuation at the counter. They replaced four stock portraits of
 * strangers, so the extra slots on large screens are capsules, not repeats.
 * Below lg the capsules drop out, leaving the two-photo pair.
 *
 * The two columns drift in opposite directions as the page scrolls, so the
 * cluster reads as two layers rather than one flat grid. The drift stays well
 * inside the panel's crop, and both columns are on the panel colour, so no
 * edge is ever exposed.
 */
export function PhotoCluster() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:-mb-12 lg:-mt-28">
      <div data-parallax="0.05" className="flex flex-col gap-4 sm:gap-5 lg:pt-14">
        <Capsule className="hidden h-64 w-full lg:block" tone="lighter" />
        <CirclePhoto photo={loanPhotos.homeCircle} field="mint" priority />
        <Capsule className="hidden h-56 w-full lg:block" />
      </div>

      <div data-parallax="-0.04" className="flex flex-col gap-4 sm:gap-5">
        <CirclePhoto photo={loanPhotos.goldCircle} field="orange" priority />
        <Capsule className="hidden h-72 w-full lg:block" />
        <Capsule className="hidden h-48 w-full lg:block" tone="lighter" />
      </div>
    </div>
  );
}
