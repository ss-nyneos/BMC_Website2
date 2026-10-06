import { Container } from "../components/layout/Container";
import { PageHeader } from "../components/layout/PageHeader";
import { Section } from "../components/layout/Section";
import { SectionHeading } from "../components/ui/SectionHeading";
import { DataTable } from "../components/ui/DataTable";
import { CalloutPanel } from "../components/ui/CalloutPanel";
import { PillButton } from "../components/ui/PillButton";
import { LinkArrow } from "../components/ui/LinkArrow";
import { primeLendingRate } from "../data/loans";
import { loanPhotos } from "../data/photos";
import { rates, ratesDisclaimer } from "../data/rates";

/**
 * Rate of interest on loans and advances.
 *
 * The live page is three lines: the revised PLR, the circular it came from, and
 * the filename of a PDF that is named in plain text and never linked. So the
 * page leads with the rate itself at display size, gives the headline product
 * rates the site already publishes, and is honest that the full schedule is in
 * a document the bank has not put online.
 */
export function InterestRatesPage() {
  return (
    <>
      <PageHeader
        title="Rate of interest on loans and advances"
        description="The bank's Prime Lending Rate, and the headline rates for the three products most people ask about."
        meta={primeLendingRate.circular}
        photo={loanPhotos.goldCircle}
        photoField="mint"
      />

      <Section bg="page" padY="lg" aria-labelledby="plr-heading">
        <Container>
          <h2 id="plr-heading" className="text-h2">
            Prime Lending Rate
          </h2>

          {/* The page's one number, given the display treatment on the brand
              sky-blue panel. Text here is the fixed ink / ink-at-80, the pairing
              every light accent uses. */}
          <div className="mt-9 flex flex-col gap-3 rounded-2xl bg-purple p-8 text-ink sm:p-10 lg:max-w-xl">
            <p className="text-display tabular-nums">{primeLendingRate.rate}</p>
            {/* Not lower-cased: "CAD/HO" is a departmental reference, and
                folding its case makes the circular harder to quote back. */}
            <p className="text-body-sm text-ink/80">
              With effect from {primeLendingRate.effectiveFrom}.
            </p>
          </div>

          <p className="mt-9 max-w-prose text-body-sm text-fg-muted">
            Individual lending rates are set against the Prime Lending Rate and vary by product,
            tenure and security. Your branch will quote the rate that applies to your case before
            you commit to anything.
          </p>
        </Container>
      </Section>

      <Section bg="white" padY="lg" aria-labelledby="headline-heading">
        <Container>
          <SectionHeading
            id="headline-heading"
            title="Headline product rates"
            description="Per annum. These are the rates the bank advertises; the rate you are offered depends on the security and the term."
          />

          <DataTable
            className="mt-10"
            caption="Headline lending rates by product"
            columns={[
              { header: "Product" },
              { header: "Rate (% p.a.)", align: "right" },
              { header: "Note", align: "right" },
            ]}
            rows={rates.map((rate) => [
              <span className="font-medium">{rate.product}</span>,
              <span className="font-medium tabular-nums">{rate.rate}</span>,
              <span className="text-fg-muted">{rate.note ?? "—"}</span>,
            ])}
          />

          <p className="mt-8 max-w-prose text-meta text-fg-muted">{ratesDisclaimer}</p>
        </Container>
      </Section>

      <Section bg="page" padY="md" aria-labelledby="schedule-heading">
        <Container>
          <CalloutPanel
            id="schedule-heading"
            tone="mint"
            title="The full schedule"
            actions={
              <>
                <PillButton href="tel:1800220854" variant="light">
                  Call 1800 220 854
                </PillButton>
                <LinkArrow href="/contact" tone="ink">
                  Find your branch
                </LinkArrow>
              </>
            }
          >
            The complete rate card is issued as{" "}
            <span className="font-medium text-ink">{primeLendingRate.circularDocument}</span>. The
            bank names the circular but has not published the file, so it cannot be linked here yet.
            Ask at any branch for a copy, or call customer care.
          </CalloutPanel>
        </Container>
      </Section>
    </>
  );
}
