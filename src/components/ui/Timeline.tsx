import type { ProcessColumn, ProcessStep } from "../../types";

/**
 * The two-column numbered sequence from reference image 7.
 *
 * Numbers are used here because the content is genuinely ordered: you cannot
 * collect a card before the account exists. Marked up as nested ordered lists
 * so that order is announced, not just drawn.
 */
const heads = {
  orange: "bg-orange text-ink",
  blue: "bg-purple text-ink",
};

const dots = {
  orange: "bg-orange",
  blue: "bg-purple",
};

const rails = {
  orange: "from-orange/70 to-orange/5",
  blue: "from-purple to-purple/10",
};

function TimelineStep({
  step,
  tone,
  isLast,
}: {
  step: ProcessStep;
  tone: "orange" | "blue";
  isLast: boolean;
}) {
  return (
    <li className="relative pb-11 pl-10 last:pb-0">
      <span
        aria-hidden="true"
        className={`absolute left-[5px] top-2 h-3.5 w-3.5 rounded-pill ${dots[tone]}`}
      />
      {!isLast ? (
        <span
          aria-hidden="true"
          className={`absolute bottom-2 left-[11px] top-7 w-0.5 rounded-pill bg-gradient-to-b ${rails[tone]}`}
        />
      ) : null}

      <h4 className="text-h3">{step.title}</h4>

      {step.date || step.duration ? (
        <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-meta text-fg-muted">
          {step.date ? <span>{step.date}</span> : null}
          {step.date && step.duration ? (
            <span aria-hidden="true" className="h-1 w-1 rounded-pill bg-current" />
          ) : null}
          {step.duration ? <span>{step.duration}</span> : null}
        </p>
      ) : null}

      <p className="mt-4 max-w-prose text-body-sm text-fg-muted">{step.description}</p>
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
              className={`grid h-11 w-11 shrink-0 place-items-center rounded-pill text-label font-bold ${heads[column.tone]}`}
            >
              {column.index}
            </span>
            <h3 className="text-h3">{column.head}</h3>
          </div>

          <ol className="mt-9">
            {column.steps.map((step, index) => (
              <TimelineStep
                key={step.title}
                step={step}
                tone={column.tone}
                isLast={index === column.steps.length - 1}
              />
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
