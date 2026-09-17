import type { CSSProperties } from "react";

export type BarSeries = { label: string; tone: "blue" | "green" };

export type BarRow = {
  label: string;
  /** One value per series, in series order, exactly as published ("6.15 / 6.40"). */
  values: string[];
};

type RateBarsProps = {
  caption: string;
  series: BarSeries[];
  rows: BarRow[];
  /** The rate the full bar stands for. Bars start at zero, so small gaps stay small. */
  scaleMax: number;
  className?: string;
};

const fills = { blue: "bg-purple", green: "bg-mint-deep" };
const swatches = { blue: "bg-purple", green: "bg-mint-deep" };

/**
 * Published rates as horizontal bars, one row per tenure, one bar per series.
 *
 * Every bar carries its figure as text beside it, so the chart reads without
 * colour and without the bars; the colour only groups the two series, and the
 * legend names them in words. Where a cell holds two published figures
 * ("6.15 / 6.40"), the bar is drawn to the first and the label keeps both.
 *
 * Bars grow from zero, row by row, when the chart scrolls into view, and a row
 * lights up under the pointer. With no motion the bars are simply drawn.
 */
export function RateBars({ caption, series, rows, scaleMax, className = "" }: RateBarsProps) {
  return (
    <figure className={`reveal ${className}`}>
      <figcaption className="sr-only">{caption}</figcaption>

      <ul className="flex flex-wrap gap-x-7 gap-y-2" aria-label="Legend">
        {series.map((item) => (
          <li key={item.label} className="flex items-center gap-2.5 text-meta text-fg-muted">
            <span aria-hidden="true" className={`h-3 w-7 rounded-pill ${swatches[item.tone]}`} />
            {item.label}
          </li>
        ))}
      </ul>

      <ul className="mt-6 flex flex-col border-t border-line">
        {rows.map((row, rowIndex) => (
          <li
            key={row.label}
            className="group grid gap-3 border-b border-line px-2 py-4 transition-colors duration-300 hover:bg-fg/[0.035] md:grid-cols-[minmax(0,16rem)_1fr] md:items-center md:gap-10 md:px-4"
          >
            <span className="text-meta font-medium">{row.label}</span>

            <span className="flex flex-col gap-2">
              {row.values.map((value, seriesIndex) => {
                const first = Number.parseFloat(value);
                const width = Number.isFinite(first) ? Math.min(100, (first / scaleMax) * 100) : 0;
                const tone = series[seriesIndex]?.tone ?? "blue";

                return (
                  <span key={seriesIndex} className="flex items-center gap-4">
                    <span className="relative h-3 flex-1 overflow-hidden rounded-pill bg-fg/[0.07]">
                      <span
                        aria-hidden="true"
                        className={`bar-grow absolute inset-y-0 left-0 rounded-pill transition-[filter] duration-300 group-hover:brightness-[0.92] ${fills[tone]}`}
                        style={{ width: `${width}%`, "--i": rowIndex } as CSSProperties}
                      />
                    </span>
                    <span className="w-28 shrink-0 text-right text-meta font-medium tabular-nums">
                      <span className="sr-only">{series[seriesIndex]?.label}: </span>
                      {value}%
                    </span>
                  </span>
                );
              })}
            </span>
          </li>
        ))}
      </ul>
    </figure>
  );
}
