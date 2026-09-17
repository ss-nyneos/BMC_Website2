import type { CSSProperties } from "react";
import { Container } from "../components/layout/Container";
import { PageHeader } from "../components/layout/PageHeader";
import { Section } from "../components/layout/Section";
import { SectionHeading } from "../components/ui/SectionHeading";
import { CalloutPanel } from "../components/ui/CalloutPanel";
import { CountUp } from "../components/ui/CountUp";
import { FeatureCard } from "../components/ui/FeatureCard";
import { IconChip } from "../components/ui/IconChip";
import { PillButton } from "../components/ui/PillButton";
import { LinkArrow } from "../components/ui/LinkArrow";
import { ProductRateCard } from "../components/widgets/ProductRateCard";
import {
  CalendarIcon,
  DocumentIcon,
  GoldIcon,
  HouseIcon,
  LayersIcon,
  PercentIcon,
  ShieldIcon,
  VehicleIcon,
  WalletIcon,
} from "../assets/icons";
import { primeLendingRate } from "../data/loans";
import { photoId, photos, type PhotoKey } from "../data/photos";
import { rates, ratesDisclaimer } from "../data/rates";

/**
 * The three headline products, each with its own object photograph and the
 * page it is best explained on. Gold lending lives on the other loans page,
 * under loans against the pledge of gold ornaments.
 */
const productArt: Record<
  string,
  { photo: PhotoKey; icon: typeof HouseIcon; href: string; tone: "blue" | "green" | "sky" }
> = {
  house: { photo: "modelHouse", icon: HouseIcon, href: "/loans/term-loans", tone: "blue" },
  gold: { photo: "goldBangles", icon: GoldIcon, href: "/loans/other", tone: "green" },
  vehicle: { photo: "carKey", icon: VehicleIcon, href: "/loans/term-loans", tone: "sky" },
};

/** The three things the bank says an individual lending rate depends on. */
const rateFactors = [
  {
    icon: LayersIcon,
    title: "The product",
    body: "A housing loan and a gold loan are priced differently.",
  },
  { icon: CalendarIcon, title: "The tenure", body: "How long you borrow for." },
  { icon: ShieldIcon, title: "The security", body: "What the loan is secured against." },
];

/**
 * Rate of interest on loans and advances.
 *
 * The live page is three lines: the revised PLR, the circular it came from, and
 * the filename of a PDF that is named in plain text and never linked. So the
 * page leads with the rate itself on the brand blue, beside the three things
 * that move an individual rate away from it, then the headline product rates the
 * site already publishes, and is honest that the full schedule is in a document
 * the bank has not put online.
 */
export function InterestRatesPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Loans & advances" }, { label: "Interest rates" }]}
        title="Rate of interest on loans and advances"
        description="The bank's Prime Lending Rate, and the headline rates for the three products most people ask about."
        meta={primeLendingRate.circular}
        photo={photos.calculator}
        photoId={photoId.calculator}
        photoField="mint"
        facts={[
          { icon: PercentIcon, value: primeLendingRate.rate, label: "Prime Lending Rate" },
          { icon: CalendarIcon, value: primeLendingRate.effectiveFrom, label: "with effect from" },
        ]}
      />

      <Section bg="page" padY="lg" aria-labelledby="plr-heading" className="!pt-4 md:!pt-6">
        <Container>
          <div className="grid gap-5 lg:grid-cols-12">
            {/* The page's one number, on the brand sky blue. Text is the fixed
                ink / ink-at-80, the pairing every light accent uses. */}
            <div className="on-accent spotlight reveal-pop group relative flex flex-col gap-0 overflow-hidden rounded-2xl bg-purple p-8 text-ink shadow-inset sm:p-10 lg:col-span-7">
              <span
                aria-hidden="true"
                className="absolute -bottom-28 -right-28 h-80 w-80 rounded-pill border-[40px] border-white/20 transition-transform duration-1000 ease-out-expo group-hover:scale-110"
              />
              <span
                aria-hidden="true"
                className="absolute -bottom-6 -right-6 h-40 w-40 rounded-pill bg-white/15 transition-transform duration-1000 ease-out-expo group-hover:scale-125"
              />

              <div className="relative flex items-center gap-4">
                <IconChip icon={PercentIcon} tone="white" />
                <h2 id="plr-heading" className="text-h3">
                  Prime Lending Rate
                </h2>
              </div>

              <div className="relative mt-10 grid gap-10 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-end sm:gap-12">
                <div>
                  <CountUp value={primeLendingRate.rate} className="block text-display" />
                  {/* Not lower-cased: "CAD/HO" is a departmental reference, and
                      folding its case makes the circular harder to quote back. */}
                  <p className="mt-2 text-body-sm text-ink/80">
                    With effect from {primeLendingRate.effectiveFrom}.
                  </p>
                </div>

                {/* The headline rates the bank publishes, drawn against the PLR
                    on one 0-10% scale. Each row carries its figure as text. */}
                <figure className="reveal">
                  <figcaption className="text-fine text-ink/80">
                    Headline rates beside the PLR, % per annum
                  </figcaption>
                  <ul className="mt-4 flex flex-col gap-3">
                    {[{ product: "Prime Lending Rate", rate: primeLendingRate.rate }, ...rates].map(
                      (row, index) => (
                        <li
                          key={row.product}
                          className="grid grid-cols-[8.5rem_minmax(0,1fr)_3.5rem] items-center gap-3"
                        >
                          <span className="truncate text-fine">{row.product}</span>
                          <span className="relative h-2.5 overflow-hidden rounded-pill bg-white/35">
                            <span
                              aria-hidden="true"
                              className={`bar-grow absolute inset-y-0 left-0 rounded-pill ${
                                index === 0 ? "bg-ink" : "bg-white"
                              }`}
                              style={
                                {
                                  width: `${Number.parseFloat(row.rate) * 10}%`,
                                  "--i": index,
                                } as CSSProperties
                              }
                            />
                          </span>
                          <span className="text-right text-fine font-bold tabular-nums">
                            {row.rate}
                          </span>
                        </li>
                      ),
                    )}
                  </ul>
                </figure>
              </div>

              <div className="relative mt-auto pt-10">
                <p className="inline-flex items-center gap-2.5 rounded-pill bg-white px-4 py-2 text-fine text-ink shadow-pill">
                  <DocumentIcon className="h-4 w-4 shrink-0" />
                  {primeLendingRate.circular}
                </p>
              </div>
            </div>

            <div className="spotlight reveal-pop group flex flex-col rounded-2xl bg-mint p-8 text-ink shadow-inset [--reveal-delay:120ms] sm:p-10 lg:col-span-5">
              <h3 className="text-h3">What sets your rate</h3>
              <p className="mt-3 text-meta text-ink/80">
                Individual lending rates are set against the Prime Lending Rate and vary by:
              </p>
              <ul className="mt-7 flex flex-col gap-3">
                {rateFactors.map((factor) => (
                  <li
                    key={factor.title}
                    className="group/row flex items-center gap-4 rounded-xl bg-white/55 p-3 pr-5 transition-[background-color,transform] duration-500 ease-out-expo hover:translate-x-1 hover:bg-white/80"
                  >
                    <span
                      aria-hidden="true"
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-pill bg-white text-ink transition-transform duration-500 ease-out-expo group-hover/row:-rotate-[10deg] group-hover/row:scale-110 [&_svg]:h-5 [&_svg]:w-5"
                    >
                      <factor.icon />
                    </span>
                    <span>
                      <span className="block text-label font-bold">{factor.title}</span>
                      <span className="block text-fine text-ink/80">{factor.body}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-7 text-meta text-ink/80">
                Your branch will quote the rate that applies to your case before you commit to
                anything.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section bg="white" padY="lg" aria-labelledby="headline-heading">
        <Container>
          <SectionHeading
            id="headline-heading"
            title="Headline product rates"
            description="Per annum. These are the rates the bank advertises; the rate you are offered depends on the security and the term."
          />

          <ul className="reveal-stagger mt-12 grid gap-5 md:grid-cols-3">
            {rates.map((rate) => {
              const art = productArt[rate.icon];
              return (
                <li key={rate.product}>
                  <ProductRateCard
                    title={rate.product}
                    rate={rate.rate}
                    rateNote={rate.note}
                    href={art.href}
                    photo={photos[art.photo]}
                    photoId={photoId[art.photo]}
                    icon={art.icon}
                    tone={art.tone}
                  />
                </li>
              );
            })}
          </ul>

          <p className="mt-8 max-w-prose text-meta text-fg-muted">{ratesDisclaimer}</p>
        </Container>
      </Section>

      <Section bg="page" padY="lg" aria-labelledby="explore-heading">
        <Container>
          <SectionHeading id="explore-heading" title="Explore the lending range" />
          <ul className="reveal-stagger mt-10 grid gap-4 sm:gap-5 md:grid-cols-3">
            <li>
              <FeatureCard
                icon={CalendarIcon}
                tone="sky"
                title="Term loans"
                href="/loans/term-loans"
              >
                The full borrowing range, from a housing loan to a loan against a fixed deposit.
              </FeatureCard>
            </li>
            <li>
              <FeatureCard icon={GoldIcon} tone="mint" title="Other loans" href="/loans/other">
                Personal borrowing, and lending against gold, NSCs, KVPs and LIC policies.
              </FeatureCard>
            </li>
            <li>
              <FeatureCard
                icon={WalletIcon}
                tone="surface"
                title="Working capital"
                href="/loans/working-capital"
              >
                Overdraft facilities for traders, manufacturers and industrial units.
              </FeatureCard>
            </li>
          </ul>
        </Container>
      </Section>

      <Section bg="page" padY="md" aria-labelledby="schedule-heading" className="!pt-0">
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
