import type { CSSProperties } from "react";
import type { ProcessColumn, ProcessStep } from "../../types";

/**
 * The two-column numbered sequence from reference image 7.
 *
 * Numbers are used here because the content is genuinely ordered: you cannot
 * collect a card before the account exists. Marked up as nested ordered lists
 * so that order is announced, not just drawn.
 *
 * It sits among the homepage sections carried over from bmc_website2, so it is
 * drawn in their tokens: the brighter accent blue for the first stage, the deep
 * brand blue for the second.
 */
const heads = {
  accent: "bg-bmc-tint text-bmc-brand",
  brand: "bg-bmc-brand text-white",
};

const dots = {
  accent: "bg-bmc-accent",
  brand: "bg-bmc-brand",
};

const rails = {
  accent: "from-bmc-accent/70 to-bmc-accent/5",
  brand: "from-bmc-brand to-bmc-brand/10",
};

function TimelineStep({
  step,
  tone,
  index,
  isLast,
}: {
  step: ProcessStep;
  tone: ProcessColumn["tone"];
  index: number;
  isLast: boolean;
}) {
  // `--i` sequences the draw-in in globals.css: each dot pops, then the rail
  // below it grows down to the next step.
  const order = { "--i": index } as CSSProperties;

  return (
    <li className="relative pb-11 pl-10 last:pb-0">
      <span
        aria-hidden="true"
        style={order}
        className={`timeline-dot absolute left-[5px] top-[11px] h-3.5 w-3.5 rounded-full ${dots[tone]}`}
      />
      {!isLast ? (
        <span
          aria-hidden="true"
          style={order}
          className={`timeline-rail absolute bottom-2 left-[11px] top-[34px] w-0.5 rounded-full bg-gradient-to-b ${rails[tone]}`}
        />
      ) : null}

      <h4 className="text-bmc-body font-medium text-bmc-ink">{step.title}</h4>

      {step.date || step.duration ? (
        <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-bmc-data text-bmc-ink-muted">
          {step.date ? <span>{step.date}</span> : null}
          {step.date && step.duration ? (
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-current" />
          ) : null}
          {step.duration ? <span>{step.duration}</span> : null}
        </p>
      ) : null}

      <p className="mt-3 max-w-prose text-bmc-body-sm text-bmc-ink-muted">{step.description}</p>
    </li>
  );
}

export function Timeline({ columns }: { columns: ProcessColumn[] }) {
  return (
    <ol className="grid gap-14 lg:grid-cols-2 lg:gap-12">
      {columns.map((column) => (
        <li key={column.index}>
          <div className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className={`grid h-11 w-11 shrink-0 place-items-center rounded-full text-bmc-body-sm font-bold ${heads[column.tone]}`}
            >
              {column.index}
            </span>
            <h3 className="text-bmc-h3 font-medium text-bmc-ink">{column.head}</h3>
          </div>

          <ol className="mt-9">
            {column.steps.map((step, index) => (
              <TimelineStep
                key={step.title}
                step={step}
                tone={column.tone}
                index={index}
                isLast={index === column.steps.length - 1}
              />
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
