import { Container } from "../layout/Container";
import { SplitPanel } from "../layout/SplitPanel";
import { CirclePhoto } from "../ui/CirclePhoto";
import { PillListRow } from "../ui/PillListRow";
import { products } from "../../data/products";
import { photoId, photos } from "../../data/photos";

/**
 * Reference image 4: the product list as hairline pill rows beside a saturated
 * photo panel.
 *
 * These eight rows replace the old site's mega-nav as the main way into the
 * catalogue. Each row is a full-width link, which is the largest target the
 * layout allows.
 */
export function ExploreProducts() {
  return (
    <section aria-labelledby="products-heading" className="bg-page py-4 lg:py-6">
      <Container>
        <SplitPanel
          className="reveal"
          media={
            <div className="flex w-full items-center justify-center rounded-2xl bg-purple p-8 sm:p-12 lg:p-16">
              <CirclePhoto
                photo={photos.counter}
                id={photoId.counter}
                className="w-full max-w-[420px]"
              />
            </div>
          }
          body={
            <div className="flex w-full flex-col justify-center rounded-2xl border border-line bg-surface p-8 sm:p-12 lg:p-14">
              <h2 id="products-heading" className="max-w-[16ch] text-h2">
                Everything you need to bank
              </h2>
              <p className="mt-5 max-w-prose text-body-sm text-fg-muted">
                Accounts, loans and foreign exchange, with the terms and charges published in full
                before you apply.
              </p>

              <ul className="mt-10 flex flex-col gap-3">
                {products.map((product) => (
                  <li key={product.name}>
                    <PillListRow label={product.name} href={product.href} />
                  </li>
                ))}
              </ul>
            </div>
          }
        />
      </Container>
    </section>
  );
}
