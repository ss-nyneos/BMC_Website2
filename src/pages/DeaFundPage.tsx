import type { CSSProperties } from "react";
import { Container } from "../components/layout/Container";
import { PageHeader } from "../components/layout/PageHeader";
import { Section } from "../components/layout/Section";
import { SectionHeading } from "../components/ui/SectionHeading";
import { CalloutPanel } from "../components/ui/CalloutPanel";
import { FeatureCard } from "../components/ui/FeatureCard";
import { IconChip } from "../components/ui/IconChip";
import { PillButton } from "../components/ui/PillButton";
import { LinkArrow } from "../components/ui/LinkArrow";
import {
  ArrowRightIcon,
  BankIcon,
  ClockIcon,
  DocumentIcon,
  ExternalIcon,
  SearchIcon,
  SheetIcon,
  ShieldIcon,
} from "../assets/icons";
import { photoId, photos } from "../data/photos";
import { deafClaimSteps, deafDocuments, deafIntro } from "../data/deaf";

/**
 * The fund in three steps, each drawn from `deafIntro`: what triggers the
 * transfer, where the money goes, and that it can still be claimed. They are a
 * genuine sequence, so they are joined by arrows, not numbered as scaffolding.
 */
const journey = [
  {
    icon: ClockIcon,
    tone: "sky" as const,
    title: "Ten years inoperative",
    body: "A savings or current account not operated for ten years, or a term deposit unclaimed ten years after maturity.",
  },
  {
    icon: BankIcon,
    tone: "blue" as const,
    title: "Moved to the RBI's fund",
    body: "The Reserve Bank requires the balance to be transferred to the Depositor Education and Awareness Fund.",
  },
  {
    icon: ShieldIcon,
    tone: "green" as const,
    title: "Still yours to claim",
    body: "The depositor or a legal heir can claim the balance, with the interest the scheme carries, at any time.",
  },
];

/** A mark for each claim step, in `deafClaimSteps` order. */
const stepIcons = [SearchIcon, BankIcon, DocumentIcon];

/**
 * Unclaimed deposits under the Depositor Education and Awareness Fund scheme.
 *
 * The live page is twelve bare spreadsheet links under no heading. Someone
 * reaching it is usually looking for a relative's forgotten account, so the
 * page now says what the fund is, as three joined cards, that the money is
 * still claimable, and what to do next — with the lists themselves kept exactly
 * as published.
 *
 * The lists open on Google Sheets, an external host, so each link is marked as
 * leaving the site rather than opening silently in a new tab.
 */
export function DeaFundPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Accounts" }, { label: "DEA Fund" }]}
        title="DEA Fund: unclaimed deposits"
        description="Accounts and deposits left inoperative for ten years are transferred to the Reserve Bank's Depositor Education and Awareness Fund. The money remains claimable."
        photo={photos.oldLedger}
        photoId={photoId.oldLedger}
        photoField="lavender"
        facts={[
          {
            icon: SheetIcon,
            value: `${deafDocuments.length} published lists`,
            label: "open on Google Sheets",
          },
          { icon: ShieldIcon, value: "Still claimable", label: "by depositors and heirs" },
        ]}
      />

      <Section bg="page" padY="lg" aria-labelledby="deaf-about" className="!pt-4 md:!pt-6">
        <Container>
          <SectionHeading id="deaf-about" title="What this means" />

          <ol className="reveal-stagger mt-10 grid gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-stretch lg:gap-3">
            {journey.flatMap((step, index) => {
              const card = (
                <li key={step.title}>
                  <FeatureCard icon={step.icon} tone={step.tone} title={step.title} size="lg">
                    {step.body}
                  </FeatureCard>
                </li>
              );
              if (index === journey.length - 1) return [card];
              return [
                card,
                <li
                  key={`${step.title}-arrow`}
                  aria-hidden="true"
                  className="grid place-items-center"
                >
                  <span className="grid h-12 w-12 rotate-90 place-items-center rounded-pill bg-surface text-fg shadow-card lg:rotate-0">
                    <ArrowRightIcon className="h-5 w-5" />
                  </span>
                </li>,
              ];
            })}
          </ol>

          <div className="mt-16 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
            <div className="reveal flex flex-col gap-5">
              {deafIntro.map((paragraph, index) => (
                <p key={index} className="max-w-prose text-body-sm text-fg-muted">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* The action a claimant needs, on the brand sky blue so it reads as
                the thing to do rather than one more block of prose. The steps
                are a real sequence, so they keep their numbers. */}
            <div className="on-accent spotlight reveal-pop group relative overflow-hidden rounded-2xl bg-purple p-7 text-ink shadow-inset sm:p-10">
              <span
                aria-hidden="true"
                className="absolute -right-24 -top-24 h-72 w-72 rounded-pill border-[36px] border-white/20 transition-transform duration-1000 ease-out-expo group-hover:scale-110"
              />
              <h2 className="relative text-h3">How to claim</h2>
              <ol className="reveal relative mt-8 flex flex-col">
                {deafClaimSteps.map((step, index) => {
                  const Icon = stepIcons[index] ?? DocumentIcon;
                  const last = index === deafClaimSteps.length - 1;
                  return (
                    <li
                      key={index}
                      className="relative flex gap-5 pb-8 last:pb-0"
                      style={{ "--i": index } as CSSProperties}
                    >
                      {last ? null : (
                        <span
                          aria-hidden="true"
                          className="timeline-rail absolute bottom-0 left-[1.375rem] top-12 w-0.5 rounded-pill bg-white/60"
                        />
                      )}
                      <span
                        aria-hidden="true"
                        className="timeline-dot relative grid h-11 w-11 shrink-0 place-items-center rounded-pill bg-white text-label font-bold text-ink shadow-pill"
                      >
                        {index + 1}
                      </span>
                      <span className="flex-1 rounded-xl bg-white/35 p-4 transition-colors duration-500 hover:bg-white/55 sm:p-5">
                        <Icon aria-hidden="true" className="mb-2 h-5 w-5" />
                        <span className="block text-meta leading-relaxed text-ink/85">{step}</span>
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </Container>
      </Section>

      <Section bg="white" padY="lg" aria-labelledby="deaf-lists">
        <Container>
          <SectionHeading
            id="deaf-lists"
            title="Published lists"
            description="Each list opens as a spreadsheet on Google Sheets."
          />

          <ul className="reveal-stagger mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {deafDocuments.map((document, index) => {
              const blue = index % 2 === 0;
              return (
                <li key={document.label}>
                  <a
                    href={document.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={`group spotlight flex h-full flex-col gap-8 rounded-xl p-6 text-ink shadow-inset transition-[transform,box-shadow,background-color] duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-inset-hover ${
                      blue ? "bg-lavender-soft hover:bg-lavender" : "bg-sage hover:bg-mint"
                    }`}
                  >
                    <span className="flex items-start justify-between gap-4">
                      <IconChip icon={SheetIcon} tone={blue ? "blue" : "green"} />
                      <span
                        aria-hidden="true"
                        className="grid h-9 w-9 place-items-center rounded-pill bg-white text-ink transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      >
                        <ExternalIcon className="h-4 w-4" />
                      </span>
                    </span>
                    <span>
                      <span className="block text-h3 tabular-nums">{document.label}</span>
                      <span className="mt-1 block text-fine text-ink/80">
                        Spreadsheet
                        <span className="sr-only">, opens on Google Sheets</span>
                      </span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      <Section bg="page" padY="md" aria-labelledby="deaf-help">
        <Container>
          <CalloutPanel
            id="deaf-help"
            tone="sage"
            title="Claiming for a relative?"
            actions={
              <>
                <PillButton href="/contact" variant="light">
                  Find the branch
                </PillButton>
                <LinkArrow href="tel:1800220854" tone="ink">
                  Call 1800 220 854
                </LinkArrow>
              </>
            }
          >
            The claim is made at the branch where the account was held. Carry proof of identity and
            address, the passbook or deposit receipt if you have it, and proof of your entitlement
            to the balance where you are claiming as a legal heir.
          </CalloutPanel>
        </Container>
      </Section>
    </>
  );
}
