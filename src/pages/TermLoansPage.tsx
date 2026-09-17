import type { ComponentType, SVGProps } from "react";
import { Container } from "../components/layout/Container";
import { PageHeader } from "../components/layout/PageHeader";
import { Section } from "../components/layout/Section";
import { SectionHeading } from "../components/ui/SectionHeading";
import { CalloutPanel } from "../components/ui/CalloutPanel";
import { FeatureCard, type FeatureTone } from "../components/ui/FeatureCard";
import { PillButton } from "../components/ui/PillButton";
import { LinkArrow } from "../components/ui/LinkArrow";
import { ProductRateCard } from "../components/widgets/ProductRateCard";
import {
  BriefcaseIcon,
  CalendarIcon,
  ClockIcon,
  GoldIcon,
  GraduationIcon,
  HouseIcon,
  LayersIcon,
  LockIcon,
  PercentIcon,
  ShieldIcon,
  SofaIcon,
  UserIcon,
  VehicleIcon,
  WalletIcon,
} from "../assets/icons";
import { primeLendingRate, termLoanProducts } from "../data/loans";
import { photoId, photos, type PhotoKey } from "../data/photos";
import { rates } from "../data/rates";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

/**
 * The three products with a published headline rate lead the page as photo
 * cards. Each is matched to its rate by name, so a product the rates file does
 * not list simply shows no figure rather than a borrowed one.
 */
const featured: {
  name: string;
  rateProduct: string;
  photo: PhotoKey;
  icon: Icon;
  href: string;
  tone: "blue" | "green" | "sky";
}[] = [
  {
    name: "Housing loans",
    rateProduct: "Housing loan",
    photo: "modelHouse",
    icon: HouseIcon,
    href: "/loans/interest-rates",
    tone: "blue",
  },
  {
    name: "Gold loans",
    rateProduct: "Gold loan",
    photo: "goldBangles",
    icon: GoldIcon,
    href: "/loans/other",
    tone: "green",
  },
  {
    name: "Vehicle loans",
    rateProduct: "Vehicle loan",
    photo: "carKey",
    icon: VehicleIcon,
    href: "/loans/interest-rates",
    tone: "sky",
  },
];

const icons: Record<string, Icon> = {
  "Overdraft and cash credit": WalletIcon,
  "Term loans": CalendarIcon,
  "Personal loans": UserIcon,
  "Loans against domestic articles": SofaIcon,
  "Education loans": GraduationIcon,
  "Loans against term deposits": LockIcon,
};

/** A checkerboard across three columns: blue and green never sit side by side twice. */
const checker: FeatureTone[] = ["sky", "mint", "sky", "mint", "sky", "mint"];

/** What the branch weighs, from the bank's own description of the process. */
const considerations = [
  { icon: BriefcaseIcon, title: "What you are borrowing for", tone: "blue" as const },
  { icon: ShieldIcon, title: "The security you can offer", tone: "green" as const },
  { icon: ClockIcon, title: "The term you need", tone: "sky" as const },
];

/**
 * Term loans: the bank's full borrowing range in one view.
 *
 * The three products with a published rate lead as photo cards; the rest follow
 * as icon cards on a blue and green checkerboard. The bank's own descriptions
 * are used unaltered, and no product gets a rate the bank has not published.
 *
 * The live page repeats a Prime Lending Rate that has not been updated since
 * 2019 and now contradicts the rates page. It is not reproduced; the rate is
 * stated once, on the rates page, and linked from here.
 */
export function TermLoansPage() {
  const rest = termLoanProducts.filter(
    (product) => !featured.some((item) => item.name === product.name),
  );

  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Loans & advances", href: "/loans/interest-rates" },
          { label: "Term loans" },
        ]}
        title="Term loans"
        description="What the bank lends against, from a housing loan to an overdraft on a fixed deposit you already hold."
        meta={`Prime Lending Rate ${primeLendingRate.rate}, with effect from ${primeLendingRate.effectiveFrom}`}
        photo={photos.modelHouse}
        photoId={photoId.modelHouse}
        photoField="lavender"
        facts={[
          {
            icon: LayersIcon,
            value: `${termLoanProducts.length} products`,
            label: "to borrow against",
          },
          { icon: PercentIcon, value: primeLendingRate.rate, label: "Prime Lending Rate" },
        ]}
      />

      <Section bg="page" padY="lg" aria-labelledby="products-heading" className="!pt-4 md:!pt-6">
        <Container>
          <SectionHeading
            id="products-heading"
            title="What you can borrow against"
            description="Start with the three loans people ask about most."
          />

          <ul className="reveal-stagger mt-12 grid gap-5 md:grid-cols-3">
            {featured.map((item) => {
              const product = termLoanProducts.find((entry) => entry.name === item.name);
              const rate = rates.find((entry) => entry.product === item.rateProduct);
              return (
                <li key={item.name}>
                  <ProductRateCard
                    title={item.name}
                    description={product?.description}
                    rate={rate?.rate}
                    rateNote={rate?.note}
                    href={item.href}
                    photo={photos[item.photo]}
                    photoId={photoId[item.photo]}
                    icon={item.icon}
                    tone={item.tone}
                  />
                </li>
              );
            })}
          </ul>

          <h3 className="mt-20 text-h3">More ways to borrow</h3>
          <ul className="reveal-stagger mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {rest.map((product, index) => (
              <li key={product.name}>
                <FeatureCard
                  icon={icons[product.name] ?? LayersIcon}
                  tone={checker[index % checker.length]}
                  title={product.name}
                  as="h4"
                >
                  {product.description}
                </FeatureCard>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section bg="white" padY="lg" aria-labelledby="branch-heading">
        <Container>
          <SectionHeading
            id="branch-heading"
            title="What your branch will look at"
            description="Before quoting a rate, your branch looks at three things."
          />
          <ul className="reveal-stagger mt-10 grid gap-4 sm:gap-5 md:grid-cols-3">
            {considerations.map((item) => (
              <li key={item.title}>
                <FeatureCard icon={item.icon} tone={item.tone} title={item.title} size="lg" />
              </li>
            ))}
          </ul>
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
            Your branch will quote the rate that applies before you commit to anything.
          </CalloutPanel>
        </Container>
      </Section>
    </>
  );
}
