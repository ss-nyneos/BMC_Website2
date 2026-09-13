import { Container } from "../components/layout/Container";
import { PageHeader } from "../components/layout/PageHeader";
import { Section } from "../components/layout/Section";
import { PillListRow } from "../components/ui/PillListRow";

/**
 * Shown for any path without a page.
 *
 * Most of the destinations in the navigation and the footer index are not built
 * yet, and they land here. The page therefore does the one useful thing it can:
 * name the sections that do exist, rather than apologise and dead-end.
 */
const built = [
  { label: "Contact us and branch directory", href: "/contact" },
  { label: "Deposit rates", href: "/accounts/deposit-rates" },
  { label: "Rate of interest on loans", href: "/loans/interest-rates" },
  { label: "Term loans", href: "/loans/term-loans" },
  { label: "Working capital facilities", href: "/loans/working-capital" },
  { label: "Other loans", href: "/loans/other" },
  { label: "DEA Fund: unclaimed deposits", href: "/accounts/dea-fund" },
  { label: "Frequently asked questions", href: "/resources/faq" },
  { label: "GST registration numbers", href: "/resources/gst" },
  { label: "Shareholder information", href: "/resources/shareholder" },
  { label: "Home", href: "/" },
];

export function NotFoundPage() {
  return (
    <>
      <PageHeader
        title="We could not find that page"
        description="The address may be mistyped, or the page may not have moved across to the new site yet."
      />

      <Section bg="page" padY="lg" aria-labelledby="available-heading">
        <Container>
          <h2 id="available-heading" className="text-h3">
            Pages you can reach from here
          </h2>

          <ul className="mt-9 flex max-w-prose flex-col gap-3">
            {built.map((page) => (
              <li key={page.href}>
                <PillListRow href={page.href} label={page.label} />
              </li>
            ))}
          </ul>

          <p className="mt-10 max-w-prose text-body-sm text-fg-muted">
            If you were looking for something else, customer care is on{" "}
            <a href="tel:1800220854" className="font-medium underline underline-offset-4">
              1800 220 854
            </a>
            .
          </p>
        </Container>
      </Section>
    </>
  );
}
