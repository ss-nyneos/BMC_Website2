import { Container } from "../layout/Container";
import { Section } from "../layout/Section";
import { PillButton } from "../ui/PillButton";
import { RateCard } from "../ui/RateCard";
import { rates, ratesDisclaimer } from "../../data/rates";

/**
 * Published lending rates, directly under the hero.
 *
 * A visitor arriving from a rate comparison wants the number before the
 * narrative, so the three headline rates come before anything about the bank's
 * history.
 */
export function RateStrip() {
  return (
    <Section bg="page" padY="md" id="rates" aria-labelledby="rates-heading" className="scroll-mt-4">
      <Container>
        <div className="reveal flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h2 id="rates-heading" className="max-w-[18ch] text-h2">
            Today&rsquo;s lending rates
          </h2>
          <PillButton href="/loans/interest-rates" variant="outline">
            See all interest rates
          </PillButton>
        </div>

        <div className="reveal-stagger on-dark mt-10 grid gap-4 sm:gap-5 lg:grid-cols-3">
          {rates.map((item) => (
            <RateCard key={item.product} item={item} />
          ))}
        </div>

        <p className="mt-6 text-legal text-fg-muted">{ratesDisclaimer}</p>
      </Container>
    </Section>
  );
}
