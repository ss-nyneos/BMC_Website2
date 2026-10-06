import { Container } from "../components/layout/Container";
import { PageHeader } from "../components/layout/PageHeader";
import { Section } from "../components/layout/Section";
import { CalloutPanel } from "../components/ui/CalloutPanel";
import { LoanProductList } from "../components/ui/LoanProductList";
import { PillButton } from "../components/ui/PillButton";
import { LinkArrow } from "../components/ui/LinkArrow";
import { primeLendingRate, termLoanProducts } from "../data/loans";
import { loanPhotos } from "../data/photos";

/**
 * Term loans: the bank's full borrowing range in one view.
 *
 * The live page repeats a Prime Lending Rate that has not been updated since
 * 2019 and now contradicts the rates page. It is not reproduced; the rate is
 * stated once, on the rates page, and linked from here.
 */
export function TermLoansPage() {
  return (
    <>
      <PageHeader
        title="Term loans"
        description="What the bank lends against, from a housing loan to an overdraft on a fixed deposit you already hold."
        meta={`Prime Lending Rate ${primeLendingRate.rate}, with effect from ${primeLendingRate.effectiveFrom}`}
        photo={loanPhotos.homeCircle}
        photoField="lavender"
      />

      <Section bg="page" padY="lg" aria-labelledby="products-heading">
        <Container>
          <h2 id="products-heading" className="text-h2">
            What you can borrow against
          </h2>

          <div className="mt-10">
            <LoanProductList products={termLoanProducts} />
          </div>
        </Container>
      </Section>

      <Section bg="page" padY="md" aria-labelledby="term-help">
        <Container>
          <CalloutPanel
            id="term-help"
            tone="mint"
            title="Not sure which one fits?"
            actions={
              <>
                <PillButton href="/loans/interest-rates" variant="light">
                  See the rate of interest
                </PillButton>
                <LinkArrow href="/contact" tone="ink">
                  Talk to your branch
                </LinkArrow>
              </>
            }
          >
            Your branch will look at what you are borrowing for, the security you can offer and the
            term you need, then quote the rate that applies before you commit to anything.
          </CalloutPanel>
        </Container>
      </Section>
    </>
  );
}
