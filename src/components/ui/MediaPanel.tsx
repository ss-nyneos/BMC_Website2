import type { Photo } from "../../types";
import { CirclePhoto } from "./CirclePhoto";

type MediaTone = "blue" | "purple" | "mint" | "sage";

type MediaPanelProps = {
  photo: Photo;
  /** Unsplash id, for the 2x source set. */
  id?: string;
  tone?: MediaTone;
  /** Largest the circle is allowed to grow inside the panel, in px. */
  maxWidth?: number;
  className?: string;
};

/**
 * A circular photograph centred on a saturated field — the media half of the
 * homepage's split panels (`BankOfFirsts`, `ExploreProducts`, `DigitalJourney`),
 * lifted into a component so the inner pages can carry the same picture-on-colour
 * block without repeating the wrapper.
 *
 * `blue` is a role-name that draws the same sky-blue field as `purple`; every
 * tone is light enough to keep the default focus ring. Text is never placed on
 * this panel, so there is no contrast pairing to hold beyond the photo's own
 * ring.
 */
const tones: Record<MediaTone, string> = {
  blue: "bg-purple",
  purple: "bg-purple",
  mint: "bg-mint",
  sage: "bg-sage",
};

export function MediaPanel({
  photo,
  id,
  tone = "blue",
  maxWidth = 380,
  className = "",
}: MediaPanelProps) {
  return (
    <div
      className={`flex w-full items-center justify-center rounded-2xl p-8 sm:p-12 lg:p-16 ${tones[tone]} ${className}`}
    >
      <div className="w-full" style={{ maxWidth }}>
        <CirclePhoto photo={photo} id={id} />
      </div>
    </div>
  );
}
