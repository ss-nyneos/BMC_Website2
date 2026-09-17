import type { ComponentType, SVGProps } from "react";
import { Container } from "../components/layout/Container";
import { PageHeader } from "../components/layout/PageHeader";
import { Section } from "../components/layout/Section";
import { FeatureCard, type FeatureTone } from "../components/ui/FeatureCard";
import {
  CalendarIcon,
  DocumentIcon,
  HelpIcon,
  HouseIcon,
  MapPinIcon,
  PercentIcon,
  SheetIcon,
  UsersIcon,
  WalletIcon,
  GoldIcon,
} from "../assets/icons";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

/**
 * Shown for any path without a page.
 *
 * Most of the destinations in the navigation and the footer index are not built
 * yet, and they land here. The page therefore does the one useful thing it can:
 * name the sections that do exist, as cards a visitor can take in at a glance,
 * rather than apologise and dead-end.
 */
const built: { label: string; href: string; icon: Icon }[] = [
  { label: "Contact us and branch directory", href: "/contact", icon: MapPinIcon },
  { label: "Deposit rates", href: "/accounts/deposit-rates", icon: PercentIcon },
  { label: "Rate of interest on loans", href: "/loans/interest-rates", icon: PercentIcon },
  { label: "Term loans", href: "/loans/term-loans", icon: CalendarIcon },
  { label: "Working capital facilities", href: "/loans/working-capital", icon: WalletIcon },
  { label: "Other loans", href: "/loans/other", icon: GoldIcon },
  { label: "DEA Fund: unclaimed deposits", href: "/accounts/dea-fund", icon: SheetIcon },
  { label: "Frequently asked questions", href: "/resources/faq", icon: HelpIcon },
  { label: "GST registration numbers", href: "/resources/gst", icon: DocumentIcon },
  { label: "Shareholder information", href: "/resources/shareholder", icon: UsersIcon },
  { label: "Home", href: "/", icon: HouseIcon },
];

/** Checkerboard across three columns, with the last card spanning the gap. */
const tones: FeatureTone[] = ["sky", "mint"];

export function NotFoundPage() {
  return (
    <>
      <PageHeader
        title="We could not find that page"
        description="The address may be mistyped, or the page may not have moved across to the new site yet."
      />

      <Section bg="page" padY="lg" aria-labelledby="available-heading" className="!pt-4 md:!pt-6">
        <Container>
          <h2 id="available-heading" className="text-h3">
            Pages you can reach from here
          </h2>

          <ul className="reveal-stagger mt-9 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {built.map((page, index) => (
              <li
                key={page.href}
                className={index === built.length - 1 ? "sm:col-span-2 lg:col-span-2" : ""}
              >
                <FeatureCard
                  icon={page.icon}
                  tone={index === built.length - 1 ? "blue" : tones[index % tones.length]}
                  title={page.label}
                  href={page.href}
                />
              </li>
            ))}
          </ul>

          <p className="mt-10 max-w-prose text-body-sm text-fg-muted">
            If you were looking for something else, customer care is on{" "}
            <a href="tel:1800220854" className="font-medium underline underline-offset-4">
              1800 220 854
            </a>
            .
          </p>
        </Container>
      </Section>
    </>
  );
}
