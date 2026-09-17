import { useId, useState } from "react";
import { PillButton } from "../ui/PillButton";
import type { DepositRateRow } from "../../types";

type Category = "general" | "senior";

const categories: { value: Category; label: string }[] = [
  { value: "general", label: "General & co-op. societies" },
  { value: "senior", label: "Senior citizens" },
];

/** "6.15 / 6.40" is a standard rate and a non-callable rate, in that order. */
function split(value: string) {
  const [standard, nonCallable] = value.split("/").map((part) => part.trim());
  return { standard, nonCallable };
}

/** The tax-saving row's period runs to a sentence; the option needs a name. */
function optionLabel(period: string) {
  return period.startsWith("Tax saving") ? "Tax saving, 5 years" : period;
}

const option =
  "flex min-h-12 cursor-pointer items-center rounded-lg px-4 py-2.5 text-meta font-medium transition-[background-color,color,box-shadow,transform] duration-300 ease-out-expo peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-fg/70";

/**
 * Pick who is depositing and for how long; read the published rate.
 *
 * Nothing is calculated. The panel shows the figure from the bank's own table
 * for the chosen row, and where that row carries a second, non-callable figure
 * it shows that too, labelled. The comparison chip is the other column of the
 * same row, so a senior citizen sees both rates without a claim about the gap
 * between them (which the published table does not keep constant).
 *
 * The controls are native radio groups, so arrow keys, labels and form
 * semantics all come for free; only their look is custom. The figure pops in
 * afresh each time it changes, and a polite live region reads the new rate.
 */
export function RateFinder({ rows, effective }: { rows: DepositRateRow[]; effective: string }) {
  const id = useId();
  const [category, setCategory] = useState<Category>("general");
  const [index, setIndex] = useState(Math.min(4, rows.length - 1));

  const row = rows[index];
  const { standard, nonCallable } = split(row[category]);
  const other = split(row[category === "general" ? "senior" : "general"]).standard;
  const otherLabel = category === "general" ? "Senior citizens" : "General rate";
  const period = optionLabel(row.period);

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
      <div className="reveal-pop rounded-2xl bg-surface p-6 shadow-card sm:p-8">
        <fieldset>
          <legend className="text-label font-bold">Who is depositing</legend>
          <div className="mt-4 grid gap-2 rounded-xl bg-fg/[0.05] p-1.5 sm:grid-cols-2">
            {categories.map((item) => (
              <label key={item.value} className="block">
                <input
                  type="radio"
                  name={`${id}-category`}
                  value={item.value}
                  checked={category === item.value}
                  onChange={() => setCategory(item.value)}
                  className="peer sr-only"
                />
                <span
                  className={`${option} justify-center text-center ${
                    category === item.value
                      ? "bg-purple text-ink shadow-pill"
                      : "text-fg hover:bg-lavender-soft hover:text-ink"
                  }`}
                >
                  {item.label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-8">
          <legend className="text-label font-bold">For how long</legend>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {rows.map((item, rowIndex) => (
              <label key={item.period} className="block">
                <input
                  type="radio"
                  name={`${id}-period`}
                  value={rowIndex}
                  checked={index === rowIndex}
                  onChange={() => setIndex(rowIndex)}
                  className="peer sr-only"
                />
                <span
                  className={`${option} ${
                    index === rowIndex
                      ? "bg-mint text-ink shadow-pill"
                      : "border border-line-strong text-fg hover:-translate-y-0.5 hover:border-transparent hover:bg-sage hover:text-ink"
                  }`}
                >
                  {optionLabel(item.period)}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="on-accent spotlight reveal-pop relative flex flex-col overflow-hidden rounded-2xl bg-purple p-7 text-ink shadow-inset [--reveal-delay:120ms] sm:p-9">
        <span
          aria-hidden="true"
          className="absolute -right-20 -top-20 h-64 w-64 rounded-pill border-[28px] border-white/25"
        />

        <p className="relative text-label text-ink/80">
          {categories.find((item) => item.value === category)?.label}
        </p>
        <p className="relative mt-1 text-label font-bold">{period}</p>

        <p key={`${category}-${index}`} className="relative mt-8 animate-pop-in">
          <span className="block text-display tabular-nums">{standard}%</span>
          <span className="mt-1 block text-meta text-ink/80">per annum</span>
        </p>

        {nonCallable ? (
          <p
            key={`nc-${category}-${index}`}
            className="relative mt-6 border-t border-ink/15 pt-5 animate-rise-in"
          >
            <span className="block text-h3 tabular-nums">{nonCallable}%</span>
            <span className="mt-1 block text-meta text-ink/80">
              Non-callable deposits of ₹1 crore and above
            </span>
          </p>
        ) : null}

        <div className="relative mt-auto flex flex-col gap-5 pt-9">
          <p className="inline-flex items-center gap-2.5 self-start rounded-pill bg-white px-4 py-2 text-fine text-ink shadow-pill">
            <span aria-hidden="true" className="h-2 w-2 rounded-pill bg-mint-deep" />
            {otherLabel}: <span className="font-bold tabular-nums">{other}%</span>
          </p>
          <p className="text-fine text-ink/80">Published rates, effective {effective}.</p>
          <div>
            <PillButton href="/#open-an-account" variant="ink" size="sm">
              Open a term deposit
            </PillButton>
          </div>
        </div>

        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {`${period}: ${standard}% per annum${nonCallable ? `, or ${nonCallable}% non-callable` : ""}.`}
        </p>
      </div>
    </div>
  );
}
