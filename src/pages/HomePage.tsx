import { Hero } from "../components/sections/Hero";
import { LegacyStatement } from "../components/sections/LegacyStatement";
import { RateStrip } from "../components/sections/RateStrip";
import { Container } from "../components/layout/Container";
import { SectionNav } from "../components/home/SectionNav";
import { ProductCards } from "../components/home/ProductCards";
import { OpenAccount } from "../components/home/OpenAccount";
import { ProcessTimeline } from "../components/sections/ProcessTimeline";
import { FormsAndRates } from "../components/home/FormsAndRates";
import { DigitalBanking } from "../components/home/DigitalBanking";
import { Heritage, SafeBanking } from "../components/home/Heritage";
import { photoCredits } from "../data/home-sections";

const SECTIONS = [
  { label: "Deposits", anchor: "deposits" },
  { label: "Loans", anchor: "loans" },
  { label: "Open account", anchor: "open-an-account" },
  { label: "Services", anchor: "services" },
  { label: "NRI", anchor: "nri" },
  { label: "Forms", anchor: "forms" },
  { label: "Digital", anchor: "digital" },
];

/**
 * Homepage.
 *
 * The first three sections are this site's own: the hero, the bank statement
 * and today's lending rates. Everything after them is carried over from
 * bmc_website2 at the client's request (2026-09-17), in that site's order and
 * visual language: the jump-link row, the product cards, forms and rates,
 * digital banking, heritage and the fraud warning. Those sections draw on the
 * `bmc-` tokens and live in `components/home/`.
 *
 * Two sections are set in among them: "Open your account", after the loans
 * card, and this site's "What happens after you apply" straight after it, since
 * the form is the first step that timeline describes.
 */
export function HomePage() {
  return (
    <>
      <Hero />
      <LegacyStatement />
      <RateStrip />

      <div className="bmc-sections pb-20 pt-12 text-bmc-body text-bmc-ink lg:pb-30 lg:pt-16">
        <Container>
          <SectionNav items={SECTIONS} />

          <div className="mt-10 space-y-10 lg:mt-16 lg:space-y-16">
            <ProductCards ids={["deposits", "loans"]} />
            <OpenAccount />
            <ProcessTimeline />
            <ProductCards ids={["services", "nri"]} />
            <FormsAndRates />
          </div>

          <div className="mt-20 lg:mt-32">
            <DigitalBanking />
          </div>

          <div className="mt-20 space-y-16 lg:mt-32 lg:space-y-24">
            <Heritage />
            <SafeBanking />
          </div>

          <p className="mt-10 text-bmc-caption text-bmc-ink-muted">
            Photographs, from Wikimedia Commons:{" "}
            {photoCredits.map((credit, index) => (
              <span key={credit.subject}>
                {credit.subject} by {credit.author} (
                <a
                  href={credit.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-bmc-brand"
                >
                  {credit.license}
                  <span className="sr-only">, opens in a new tab</span>
                </a>
                ){index < photoCredits.length - 1 ? "; " : "."}
              </span>
            ))}
          </p>
        </Container>
      </div>
    </>
  );
}
