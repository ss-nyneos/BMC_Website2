import { Container } from "../components/layout/Container";
import { PageHeader } from "../components/layout/PageHeader";
import { Section } from "../components/layout/Section";
import { CalloutPanel } from "../components/ui/CalloutPanel";
import { MediaPanel } from "../components/ui/MediaPanel";
import { LoanProductList } from "../components/ui/LoanProductList";
import { PillButton } from "../components/ui/PillButton";
import { LinkArrow } from "../components/ui/LinkArrow";
import { primeLendingRate, workingCapitalIntro, workingCapitalProducts } from "../data/loans";
import { photoId, photos } from "../data/photos";

/**
 * Working capital: the overdraft facilities the bank extends to businesses.
 *
 * The stale 2019 Prime Lending Rate printed on the live page is not carried
 * across; the rate is stated once, on the rates page.
 */
export function WorkingCapitalPage() {
  return (
    <>
      <PageHeader
        title="Working capital facilities"
        description="Overdraft facilities for traders, manufacturers and businesses that need to fund a trading cycle."
        meta={`Prime Lending Rate ${primeLendingRate.rate}, with effect from ${primeLendingRate.effectiveFrom}`}
        photo={photos.counter}
        photoId={photoId.counter}
        photoField="lavender"
      />

      <Section bg="page" padY="lg" aria-labelledby="wc-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div className="flex flex-col">
              <h2 id="wc-heading" className="text-h2">
                Who it is for
              </h2>
              <div className="mt-7 flex flex-col gap-5">
                {workingCapitalIntro.map((paragraph, index) => (
                  <p key={index} className="max-w-prose text-body-sm text-fg-muted">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
                <LinkArrow href="/loans/interest-rates" tone="ink">
                  See the rate of interest
                </LinkArrow>
              </div>

              <MediaPanel
                className="mt-10 hidden lg:flex"
                tone="blue"
                photo={photos.business}
                id={photoId.business}
                maxWidth={320}
              />
            </div>

            <div>
              <h2 className="sr-only">Facilities</h2>
              <LoanProductList products={workingCapitalProducts} />
            </div>
          </div>
        </Container>
      </Section>

      <Section bg="page" padY="md" aria-labelledby="wc-help">
        <Container>
          <CalloutPanel
            id="wc-help"
            tone="sage"
            title="Fund the cycle, not the year"
            actions={
              <>
                <PillButton href="/contact" variant="light">
                  Talk to your branch
                </PillButton>
                <LinkArrow href="tel:1800220854" tone="white">
                  Call 1800 220 854
                </LinkArrow>
              </>
            }
          >
            The limit is set against your stock, book debts or a deposit you already hold, and drawn
            as you need it. Your branch will size the facility to the trading cycle it is meant to
            cover.
          </CalloutPanel>
        </Container>
      </Section>
    </>
  );
}
