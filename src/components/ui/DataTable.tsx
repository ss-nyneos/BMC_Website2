import type { ReactNode } from "react";

export type Column = {
  header: string;
  /** Numeric columns align right so the digits form a column you can compare. */
  align?: "left" | "right";
  /** Tailwind width utility, where a column should not size to its content. */
  className?: string;
};

type DataTableProps = {
  caption: string;
  /** Set false to show the caption; it stays in the accessibility tree either way. */
  showCaption?: boolean;
  columns: Column[];
  rows: ReactNode[][];
  className?: string;
};

/**
 * A real `<table>`, in a scroll container of its own.
 *
 * The scroll container is the point: DESIGN.md forbids the page body from ever
 * scrolling sideways, and a rate table with four columns cannot fit 360px. The
 * wrapper is focusable and labelled so the region is reachable by keyboard,
 * which is the part usually missed — a mouse user can drag a table that a
 * keyboard user then cannot scroll at all.
 *
 * Numbers are set in tabular figures so the decimal points line up down the
 * column and a rate cannot be misread at a glance.
 */
export function DataTable({
  caption,
  showCaption = false,
  columns,
  rows,
  className = "",
}: DataTableProps) {
  return (
    <div
      role="region"
      aria-label={caption}
      tabIndex={0}
      className={`-mx-6 overflow-x-auto px-6 sm:mx-0 sm:px-0 ${className}`}
    >
      <table className="w-full min-w-[34rem] border-collapse text-left">
        <caption className={showCaption ? "mb-4 text-meta text-fg-muted" : "sr-only"}>
          {caption}
        </caption>

        <thead>
          <tr className="border-b border-line">
            {columns.map((column) => (
              <th
                key={column.header}
                scope="col"
                className={`py-4 pr-6 align-bottom text-meta font-medium text-fg-muted ${
                  column.align === "right" ? "text-right pr-0 sm:pr-6" : ""
                } ${column.className ?? ""}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-line transition-colors duration-200 last:border-b-0 hover:bg-fg/[0.035]"
            >
              {row.map((cell, cellIndex) => {
                const column = columns[cellIndex];
                const isNumeric = column?.align === "right";
                return (
                  <td
                    key={cellIndex}
                    className={`py-5 pr-6 align-top text-body-sm ${
                      isNumeric ? "pr-0 text-right tabular-nums sm:pr-6" : ""
                    }`}
                  >
                    {cell}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
