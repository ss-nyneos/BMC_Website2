import type { ComponentType, SVGProps } from "react";
import { Container } from "../components/layout/Container";
import { PageHeader } from "../components/layout/PageHeader";
import { Section } from "../components/layout/Section";
import { SectionHeading } from "../components/ui/SectionHeading";
import { CalloutPanel } from "../components/ui/CalloutPanel";
import { FeatureCard, type FeatureTone } from "../components/ui/FeatureCard";
import { IconChip } from "../components/ui/IconChip";
import { PillButton } from "../components/ui/PillButton";
import { LinkArrow } from "../components/ui/LinkArrow";
import {
  BankIcon,
  BoxIcon,
  BriefcaseIcon,
  ClockIcon,
  FactoryIcon,
  LayersIcon,
  LockIcon,
  ReceiptIcon,
  StoreIcon,
  WalletIcon,
} from "../assets/icons";
import { primeLendingRate, workingCapitalIntro, workingCapitalProducts } from "../data/loans";
import { photoId, photos } from "../data/photos";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

/** The businesses the bank names, in the order it names them. */
const segments: { label: string; icon: Icon }[] = [
  { label: "Retail traders", icon: StoreIcon },
  { label: "Small-scale industrial units", icon: FactoryIcon },
  { label: "Medium and large units", icon: BankIcon },
  { label: "Manufacturers", icon: LayersIcon },
  { label: "Businesses operating at scale", icon: BriefcaseIcon },
];

const facilityArt: Record<string, { icon: Icon; security?: string }> = {
  "Overdraft accounts for working capital": { icon: WalletIcon },
  "Overdraft against hypothecation of stock": { icon: BoxIcon, security: "Your stock" },
  "Overdraft against hypothecation of book debts": {
    icon: ReceiptIcon,
    security: "Money owed to you",
  },
  "Overdraft against a term deposit with the bank": {
    icon: LockIcon,
    security: "A deposit you hold",
  },
  "Overdraft against the pledge of goods": { icon: LayersIcon, security: "Goods pledged" },
};

/**
 * The first facility spans two columns on the brand blue; the other four fill
 * the row beneath, so a three-column grid closes with no empty cell.
 */
const facilityTones: FeatureTone[] = ["blue", "green", "sky", "mint", "sky"];

/**
 * Working capital: the overdraft facilities the bank extends to businesses.
 *
 * The page names who it is for as a row of segments, then lays the five
 * facilities out as a bento: the general overdraft first and widest, carrying
 * the one sentence the bank gives on how a limit works, then one card per kind
 * of security.
 *
 * The stale 2019 Prime Lending Rate printed on the live page is not carried
 * across; the rate is stated once, on the rates page.
 */
export function WorkingCapitalPage() {
  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Loans & advances", href: "/loans/interest-rates" },
          { label: "Working capital" },
        ]}
        title="Working capital facilities"
        description="Overdraft facilities for traders, manufacturers and businesses that need to fund a trading cycle."
        meta={`Prime Lending Rate ${primeLendingRate.rate}, with effect from ${primeLendingRate.effectiveFrom}`}
        photo={photos.bangleShop}
        photoId={photoId.bangleShop}
        photoField="lavender"
        facts={[
          {
            icon: WalletIcon,
            value: `${workingCapitalProducts.length} facilities`,
            label: "overdraft limits",
          },
          { icon: ClockIcon, value: "Drawn as needed", label: "within your limit" },
        ]}
      />

      <Section bg="page" padY="lg" aria-labelledby="wc-heading" className="!pt-4 md:!pt-6">
        <Container>
          <SectionHeading
            id="wc-heading"
            title="Who it is for"
            description={workingCapitalIntro[0]}
          />

          <ul className="reveal-stagger mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
            {segments.map((segment, index) => (
              <li
                key={segment.label}
                className={`group spotlight flex h-full flex-col gap-6 rounded-xl p-5 text-ink shadow-inset sm:p-6 ${
                  index % 2 === 0 ? "bg-lavender-soft" : "bg-sage"
                } ${index === segments.length - 1 ? "col-span-2 lg:col-span-1" : ""}`}
              >
                <IconChip icon={segment.icon} tone={index % 2 === 0 ? "blue" : "green"} />
                <span className="text-label font-bold">{segment.label}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section bg="white" padY="lg" aria-labelledby="facilities-heading">
        <Container>
          <SectionHeading
            id="facilities-heading"
            title="Facilities"
            description="Each is an overdraft limit, set against a different kind of security."
          />

          <ul className="reveal-stagger mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {workingCapitalProducts.map((product, index) => {
              const art = facilityArt[product.name] ?? { icon: WalletIcon };
              const lead = index === 0;
              return (
                <li key={product.name} className={lead ? "sm:col-span-2" : ""}>
                  <FeatureCard
                    icon={art.icon}
                    tone={facilityTones[index % facilityTones.length]}
                    title={product.name}
                    size={lead ? "lg" : "md"}
                    className={lead ? "min-h-[260px]" : "min-h-[220px]"}
                    footer={
                      art.security ? (
                        <span className="inline-flex items-center gap-2 rounded-pill bg-white/70 px-3.5 py-1.5 text-fine font-medium text-ink">
                          <span aria-hidden="true" className="h-2 w-2 rounded-pill bg-ink/70" />
                          Secured by: {art.security}
                        </span>
                      ) : null
                    }
                  >
                    {lead
                      ? "The limit is set against your stock, book debts or a deposit you already hold, and drawn as you need it."
                      : null}
                  </FeatureCard>
                </li>
              );
            })}
          </ul>

          <p className="mt-10 max-w-prose text-body-sm text-fg-muted">{workingCapitalIntro[1]}</p>
          <div className="mt-6">
            <LinkArrow href="/loans/interest-rates" tone="ink">
              See the rate of interest
            </LinkArrow>
          </div>
        </Container>
      </Section>

      <Section bg="page" padY="md" aria-labelledby="wc-help">
        <Container>
          <CalloutPanel
            id="wc-help"
            tone="sage"
            title="Size the limit to your trading cycle"
            actions={
              <>
                <PillButton href="/contact" variant="light">
                  Talk to your branch
                </PillButton>
                <LinkArrow href="tel:1800220854" tone="ink">
                  Call 1800 220 854
                </LinkArrow>
              </>
            }
          >
            Your branch will size the facility to the trading cycle it is meant to cover, and
            confirm the security it will be set against.
          </CalloutPanel>
        </Container>
      </Section>
    </>
  );
}
