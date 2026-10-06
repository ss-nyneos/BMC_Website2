import { Container } from "../components/layout/Container";
import { PageHeader } from "../components/layout/PageHeader";
import { Section } from "../components/layout/Section";
import { CalloutPanel } from "../components/ui/CalloutPanel";
import { MediaPanel } from "../components/ui/MediaPanel";
import { LoanProductList } from "../components/ui/LoanProductList";
import { PillButton } from "../components/ui/PillButton";
import { LinkArrow } from "../components/ui/LinkArrow";
import { otherLoanProducts, otherLoansIntro, primeLendingRate } from "../data/loans";
import { photos } from "../data/photos";

/**
 * Other loans: the schemes that do not sit under term lending or working
 * capital — personal borrowing, and lending against securities and policies.
 *
 * As on the term loans page, the stale 2019 Prime Lending Rate the live site
 * prints here is not carried across.
 */
export function OtherLoansPage() {
  return (
    <>
      <PageHeader
        title="Other loans"
        description="Personal borrowing, and lending against government securities and life policies."
        meta={`Prime Lending Rate ${primeLendingRate.rate}, with effect from ${primeLendingRate.effectiveFrom}`}
        photo={photos.business}
        photoField="mint"
      />

      <Section bg="page" padY="lg" aria-labelledby="other-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div className="flex flex-col">
              <h2 id="other-heading" className="text-h2">
                Schemes
              </h2>
              <div className="mt-7 flex flex-col gap-5">
                {otherLoansIntro.map((paragraph, index) => (
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
                photo={photos.heritage}
              />
            </div>

            <LoanProductList products={otherLoanProducts} />
          </div>
        </Container>
      </Section>

      <Section bg="page" padY="md" aria-labelledby="other-help">
        <Container>
          <CalloutPanel
            id="other-help"
            tone="mint"
            title="Bring the paperwork, leave with the terms"
            actions={
              <>
                <PillButton href="/contact" variant="light">
                  Find your branch
                </PillButton>
                <LinkArrow href="tel:1800220854" tone="ink">
                  Call 1800 220 854
                </LinkArrow>
              </>
            }
          >
            Rates on advances against government securities, NSCs, KVPs and assigned LIC policies are
            set case by case. Your branch will confirm the rate and the margin before anything is
            drawn.
          </CalloutPanel>
        </Container>
      </Section>
    </>
  );
}
