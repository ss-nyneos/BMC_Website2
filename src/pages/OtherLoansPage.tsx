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
  BoxIcon,
  BriefcaseIcon,
  CertificateIcon,
  GoldIcon,
  LayersIcon,
  SofaIcon,
  StoreIcon,
  TruckIcon,
  UmbrellaIcon,
  UserIcon,
  UsersIcon,
} from "../assets/icons";
import { otherLoanProducts, otherLoansIntro, primeLendingRate } from "../data/loans";
import { photoId, photos } from "../data/photos";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

const icons: Record<string, Icon> = {
  "Personal loans for salaried people": BriefcaseIcon,
  "Personal loans for the purchase of domestic appliances": SofaIcon,
  "Personal loans, other purposes": UserIcon,
  "Loans against the pledge of gold ornaments": GoldIcon,
  "Loans against NSC, KVP and LIC policies": CertificateIcon,
  "Group loans for corporate employees": UsersIcon,
};

/** A checkerboard across two columns. */
const checker: FeatureTone[] = ["blue", "green", "mint", "sky", "sky", "mint"];

/** Everything the bank names as security for these schemes, in its own words. */
const securities: { label: string; icon: Icon }[] = [
  { label: "RBI Relief Bonds", icon: CertificateIcon },
  { label: "National Savings Certificates", icon: CertificateIcon },
  { label: "Kisan Vikas Patras", icon: CertificateIcon },
  { label: "LIC policies", icon: UmbrellaIcon },
  { label: "Gold ornaments", icon: GoldIcon },
];

/** Who the bank says the schemes serve. */
const audiences: { label: string; icon: Icon; tone: FeatureTone }[] = [
  { label: "Individuals", icon: UserIcon, tone: "blue" },
  { label: "Small businesses", icon: StoreIcon, tone: "green" },
  { label: "Traders", icon: BoxIcon, tone: "sky" },
  { label: "Transport operators", icon: TruckIcon, tone: "mint" },
];

/**
 * Other loans: the schemes that do not sit under term lending or working
 * capital — personal borrowing, and lending against securities and policies.
 *
 * The bank lists these schemes by name only, so they are shown as icon cards
 * without invented descriptions. The securities the bank accepts are pulled out
 * of its prose into chips, and the people it says the schemes serve into a row
 * of their own.
 *
 * As on the term loans page, the stale 2019 Prime Lending Rate the live site
 * prints here is not carried across.
 */
export function OtherLoansPage() {
  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Loans & advances", href: "/loans/interest-rates" },
          { label: "Other loans" },
        ]}
        title="Other loans"
        description="Personal borrowing, and lending against government securities and life policies."
        meta={`Prime Lending Rate ${primeLendingRate.rate}, with effect from ${primeLendingRate.effectiveFrom}`}
        photo={photos.goldBangles}
        photoId={photoId.goldBangles}
        photoField="mint"
        facts={[
          {
            icon: LayersIcon,
            value: `${otherLoanProducts.length} schemes`,
            label: "personal and secured",
          },
          { icon: CertificateIcon, value: "NSC, KVP, LIC", label: "accepted as security" },
        ]}
      />

      <Section bg="page" padY="lg" aria-labelledby="other-heading" className="!pt-4 md:!pt-6">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-16">
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

              <div className="reveal mt-10 rounded-2xl bg-surface p-6 shadow-card sm:p-8">
                <h3 className="text-label font-bold">Accepted as security</h3>
                <ul className="mt-5 flex flex-wrap gap-2.5">
                  {securities.map((item, index) => (
                    <li
                      key={item.label}
                      className={`group inline-flex min-h-12 items-center gap-2.5 rounded-pill py-1.5 pl-1.5 pr-4 text-meta font-medium text-ink transition-transform duration-500 ease-out-expo hover:-translate-y-1 ${
                        index % 2 === 0 ? "bg-lavender" : "bg-sage"
                      }`}
                    >
                      <IconChip
                        icon={item.icon}
                        tone="white"
                        size="sm"
                        className="!h-9 !w-9 [&_svg]:!h-4 [&_svg]:!w-4"
                      />
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-9">
                <LinkArrow href="/loans/interest-rates" tone="ink">
                  See the rate of interest
                </LinkArrow>
              </div>
            </div>

            <ul className="reveal-stagger grid content-start gap-4 sm:grid-cols-2 sm:gap-5">
              {otherLoanProducts.map((product, index) => (
                <li key={product.name}>
                  <FeatureCard
                    icon={icons[product.name] ?? LayersIcon}
                    tone={checker[index % checker.length]}
                    title={product.name}
                    className="min-h-[190px]"
                  />
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section bg="white" padY="lg" aria-labelledby="audience-heading">
        <Container>
          <SectionHeading
            id="audience-heading"
            title="Who the schemes are for"
            description="Loan schemes and credit facilities for individuals, small businesses, traders and transport operators."
          />
          <ul className="reveal-stagger mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {audiences.map((item) => (
              <li key={item.label}>
                <FeatureCard icon={item.icon} tone={item.tone} title={item.label} size="lg" />
              </li>
            ))}
          </ul>
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
            Rates on advances against government securities, NSCs, KVPs and assigned LIC policies
            are set case by case. Your branch will confirm the rate and the margin before anything
            is drawn.
          </CalloutPanel>
        </Container>
      </Section>
    </>
  );
}
