import type { Stage } from "../../types";
import { BulletList } from "./BulletList";

/**
 * Numbered capability cards that sit beside a coloured panel (reference image
 * 8). Numbers ride in sky-blue circles and, as with the timeline, they are only
 * here because the list is a real progression from first login outward.
 */
function NumberedStage({ stage }: { stage: Stage }) {
  return (
    <li className="rounded-2xl bg-surface p-7 shadow-card sm:p-9">
      <div className="flex items-center gap-4">
        <span
          aria-hidden="true"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-pill bg-purple text-label font-bold text-ink"
        >
          {stage.index}
        </span>
        <h3 className="text-h3">{stage.title}</h3>
      </div>

      <BulletList
        items={stage.bullets}
        variant="blue"
        className="mt-7 text-fg-muted"
      />
    </li>
  );
}

export function StageList({ stages, className = "" }: { stages: Stage[]; className?: string }) {
  return (
    <ol className={`reveal-stagger flex flex-col gap-4 sm:gap-5 ${className}`}>
      {stages.map((stage) => (
        <NumberedStage key={stage.index} stage={stage} />
      ))}
    </ol>
  );
}
