import type { LoanProduct } from "../../data/loans";
import { CircleArrow } from "./CircleArrow";

/**
 * The product list the three loan pages share.
 *
 * A product with a description gets a card; a bare name gets a hairline row.
 * The bank publishes both shapes and they are not interchangeable — padding out
 * the bare names with invented blurb would be writing product copy on a bank's
 * behalf, and leaving the described ones as bare rows would throw the
 * descriptions away.
 */
export function LoanProductList({ products }: { products: LoanProduct[] }) {
  const described = products.some((product) => product.description);

  if (!described) {
    return (
      <ul className="reveal-stagger flex flex-col border-t border-line">
        {products.map((product) => (
          <li key={product.name} className="border-b border-line">
            {product.href ? (
              <a
                href={product.href}
                className="group flex min-h-16 items-center justify-between gap-6 py-4 text-body-sm font-medium transition-colors duration-300 hover:text-forest dark:hover:text-lavender"
              >
                <span className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1.5">
                  {product.name}
                </span>
                <CircleArrow tone="lavender" size="sm" />
              </a>
            ) : (
              <p className="flex min-h-16 items-center py-4 text-body-sm font-medium">
                {product.name}
              </p>
            )}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="reveal-stagger grid gap-4 sm:gap-5 lg:grid-cols-2">
      {products.map((product) => {
        // The card sits on the fixed `lavender-soft` accent, so its text is the
        // fixed `ink` (at 70% for the description), never a semantic token that
        // would invert away from the panel in dark mode.
        const body = (
          <>
            <h3 className="text-label font-medium text-ink">{product.name}</h3>
            {product.description ? (
              <p className="mt-3 text-meta text-ink/70">{product.description}</p>
            ) : null}
          </>
        );

        return (
          <li key={product.name}>
            {product.href ? (
              <a
                href={product.href}
                className="group flex h-full flex-col rounded-2xl bg-lavender-soft p-6 text-ink shadow-inset transition-[transform,box-shadow,background-color] duration-500 ease-out-expo hover:-translate-y-1 hover:bg-lavender hover:shadow-inset-hover sm:p-7"
              >
                {body}
              </a>
            ) : (
              <div className="flex h-full flex-col rounded-2xl bg-lavender-soft p-6 text-ink shadow-inset sm:p-7">
                {body}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
