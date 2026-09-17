import type { ComponentType, CSSProperties, SVGProps } from "react";
import { Container } from "../components/layout/Container";
import { PageHeader } from "../components/layout/PageHeader";
import { Section } from "../components/layout/Section";
import { SectionHeading } from "../components/ui/SectionHeading";
import { DataTable } from "../components/ui/DataTable";
import { CalloutPanel } from "../components/ui/CalloutPanel";
import { CountUp } from "../components/ui/CountUp";
import { IconChip } from "../components/ui/IconChip";
import { PillButton } from "../components/ui/PillButton";
import { LinkArrow } from "../components/ui/LinkArrow";
import { Tabs } from "../components/ui/Tabs";
import { RateBars } from "../components/widgets/RateBars";
import { RateFinder } from "../components/widgets/RateFinder";
import {
  CalendarIcon,
  ClockIcon,
  GlobeIcon,
  PercentIcon,
  ShieldIcon,
  UsersIcon,
} from "../assets/icons";
import { photoId, photos } from "../data/photos";
import {
  depositRateNotes,
  domesticRates,
  domesticRatesEffective,
  fcnrHeading,
  fcnrNote,
  fcnrRates,
  nreNotes,
  nreRates,
  nreRatesEffective,
  prematureWithdrawalNotes,
  staffRateNotes,
} from "../data/deposit-rates";

/** A rate, set large enough to read at a glance and in tabular figures. */
function Rate({ value }: { value: string }) {
  return <span className="font-medium tabular-nums">{value}</span>;
}

/**
 * A set of notes on a pale accent card: blue for how the rates apply, green for
 * what happens when a deposit ends early. Text is the fixed `ink`, because the
 * card does not invert in dark mode.
 */
function NoteCard({
  id,
  title,
  notes,
  icon,
  tone,
  sticky = false,
}: {
  id: string;
  title: string;
  notes: string[];
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  tone: "sky" | "mint";
  /** Holds the shorter card in view beside the longer one on wide screens. */
  sticky?: boolean;
}) {
  const surface = tone === "sky" ? "bg-lavender-soft" : "bg-sage";
  const dot = tone === "sky" ? "bg-purple" : "bg-mint-deep";

  return (
    <div
      className={`reveal-pop group spotlight rounded-2xl p-7 text-ink shadow-inset sm:p-9 ${surface} ${
        sticky ? "lg:sticky lg:top-8" : ""
      }`}
    >
      <div className="flex items-center gap-4">
        <IconChip icon={icon} tone={tone === "sky" ? "blue" : "green"} />
        <h3 id={id} className="text-h3">
          {title}
        </h3>
      </div>
      <ul aria-labelledby={id} className="mt-7 flex flex-col gap-5">
        {notes.map((note, index) => (
          <li key={index} className="flex gap-4 text-meta leading-relaxed text-ink/80">
            <span aria-hidden="true" className={`mt-2 h-2 w-2 shrink-0 rounded-pill ${dot}`} />
            <span>{note}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const nreTones = ["bg-purple", "bg-mint", "bg-lavender", "bg-sage"];

/**
 * Published term-deposit rates.
 *
 * Three separate schedules — domestic and NRO, NRE rupee, and FCNR(B) — each
 * with its own effective date. They are kept as three schedules rather than
 * merged into one filterable grid, because a depositor knows which of the three
 * they are before they arrive, and merging them would put a rate a customer is
 * not eligible for next to one they are.
 *
 * The domestic schedule leads with a finder (who, how long, which rate), then
 * the whole schedule as a chart with the exact table one tab away. Every figure
 * on the page is transcribed from the bank's tables; none is calculated.
 *
 * The effective date sits in the page header and again above each schedule. A
 * rate without its date is the single most dangerous thing this page could
 * publish.
 */
export function DepositRatesPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Accounts" }, { label: "Deposit rates" }]}
        title="Deposit rates"
        description="Interest rates on domestic, NRO, NRE and FCNR(B) deposits. Rates are per annum and are subject to change."
        meta={`Domestic, NRO and NRE rates effective ${domesticRatesEffective}`}
        photo={photos.rupeeCoins}
        photoId={photoId.rupeeCoins}
        photoField="mint"
        facts={[
          { icon: PercentIcon, value: "9 tenures", label: "7 days to 10 years" },
          { icon: ShieldIcon, value: "₹5 lakh", label: "DICGC insured" },
        ]}
      />

      <Section bg="page" padY="lg" aria-labelledby="finder-heading" className="!pt-4 md:!pt-6">
        <Container>
          <SectionHeading
            id="finder-heading"
            title="Find your rate"
            description="Choose who is depositing and for how long. The rate shown is the bank's published figure for that row."
          />
          <div className="mt-10">
            <RateFinder rows={domesticRates} effective={domesticRatesEffective} />
          </div>
        </Container>
      </Section>

      <Section bg="white" padY="lg" aria-labelledby="domestic-heading">
        <Container>
          <SectionHeading
            id="domestic-heading"
            title="Domestic deposits and NRO"
            description={`Revised with effect from ${domesticRatesEffective}. Where two figures are shown, the second is the non-callable rate for deposits of ₹1 crore and above.`}
          />

          <Tabs
            label="Domestic and NRO rates"
            className="mt-10"
            items={[
              {
                label: "Chart",
                panel: (
                  <RateBars
                    caption={`Domestic and NRO term deposit rates, effective ${domesticRatesEffective}`}
                    scaleMax={7.5}
                    series={[
                      { label: "General & co-op. societies", tone: "blue" },
                      { label: "Senior citizens", tone: "green" },
                    ]}
                    rows={domesticRates.map((row) => ({
                      label: row.period,
                      values: [row.general, row.senior],
                    }))}
                  />
                ),
              },
              {
                label: "Table",
                panel: (
                  <DataTable
                    caption={`Domestic and NRO term deposit rates, effective ${domesticRatesEffective}`}
                    columns={[
                      { header: "Period" },
                      { header: "General & co-op. societies (% p.a.)", align: "right" },
                      { header: "Senior citizens (% p.a.)", align: "right" },
                    ]}
                    rows={domesticRates.map((row) => [
                      <span className="font-medium">{row.period}</span>,
                      <Rate value={row.general} />,
                      <Rate value={row.senior} />,
                    ])}
                  />
                ),
              },
            ]}
          />

          <div className="mt-16 grid items-start gap-5 lg:grid-cols-2">
            <NoteCard
              id="rate-notes"
              title="How these rates apply"
              notes={depositRateNotes}
              icon={PercentIcon}
              tone="sky"
            />
            <NoteCard
              id="penalty-notes"
              title="Premature withdrawal and renewal"
              notes={prematureWithdrawalNotes}
              icon={ClockIcon}
              tone="mint"
              sticky
            />
          </div>
        </Container>
      </Section>

      <Section bg="page" padY="lg" aria-labelledby="nre-heading">
        <Container>
          <SectionHeading
            id="nre-heading"
            title="Non-Resident External (NRE) rupee term deposits"
            description={`Revised with effect from ${nreRatesEffective}. The same rate applies to all categories of depositor.`}
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
            <h3 className="sr-only">NRE rates by period</h3>
            <dl className="reveal-stagger grid gap-4 sm:grid-cols-2">
              {nreRates.map((row, index) => (
                <div
                  key={row.period}
                  className={`group spotlight flex flex-col justify-between gap-10 rounded-xl p-6 text-ink shadow-inset sm:p-7 ${
                    nreTones[index % nreTones.length]
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <dt className="text-label font-medium">{row.period}</dt>
                    <IconChip icon={CalendarIcon} tone="white" size="sm" />
                  </div>
                  <dd>
                    <CountUp value={`${row.rate}%`} className="block text-display" />
                    <span className="mt-1 block text-fine text-ink/80">per annum</span>
                  </dd>
                </div>
              ))}
            </dl>

            <div className="reveal-pop group spotlight spotlight-surface flex flex-col rounded-2xl bg-surface p-7 shadow-card sm:p-9">
              <IconChip icon={GlobeIcon} tone="blue" />
              <h3 className="mt-6 text-h3">Withdrawing early</h3>
              <ul className="mt-6 flex flex-col gap-5">
                {nreNotes.map((note, index) => (
                  <li key={index} className="flex gap-4 text-meta leading-relaxed text-fg-muted">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-2 w-2 shrink-0 rounded-pill bg-purple"
                    />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section bg="white" padY="lg" aria-labelledby="fcnr-heading">
        <Container>
          <SectionHeading id="fcnr-heading" title="FCNR(B) deposits" description={fcnrHeading} />

          <div className="reveal-stagger mt-10 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
            {fcnrRates.map((row) => (
              <div
                key={row.period}
                className="group spotlight relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-2xl bg-purple p-8 text-ink shadow-inset sm:p-10"
              >
                <span
                  aria-hidden="true"
                  className="absolute -bottom-24 -right-24 h-72 w-72 rounded-pill border-[36px] border-white/20 transition-transform duration-1000 ease-out-expo group-hover:scale-110"
                />
                <div className="relative flex items-center gap-4">
                  <IconChip icon={GlobeIcon} tone="white" />
                  <p className="text-label font-medium">FCNR(B), {row.period}</p>
                </div>
                <p className="relative">
                  <span className="block text-display tabular-nums">{row.rate}%</span>
                  <span className="mt-1 block text-meta text-ink/80">per annum</span>
                </p>
              </div>
            ))}

            <div className="group spotlight flex flex-col justify-between gap-8 rounded-2xl bg-mint p-8 text-ink shadow-inset sm:p-10">
              <div>
                <h3 className="text-h3">US Dollar and Euro deposits</h3>
                <p className="mt-4 max-w-prose text-body-sm text-ink/80">{fcnrNote}</p>
              </div>
              <ul className="flex flex-wrap gap-3" aria-label="Currencies">
                {["US Dollar", "Euro"].map((currency) => (
                  <li
                    key={currency}
                    className="inline-flex h-12 items-center gap-3 rounded-pill bg-white pl-2 pr-5 text-label text-ink shadow-pill transition-transform duration-500 ease-out-expo hover:-translate-y-1"
                  >
                    <span
                      aria-hidden="true"
                      className="grid h-8 w-8 place-items-center rounded-pill bg-mint text-fine font-bold"
                    >
                      {currency === "Euro" ? "€" : "$"}
                    </span>
                    {currency}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section bg="page" padY="lg" aria-labelledby="staff-heading">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
            <div className="reveal">
              <IconChip icon={UsersIcon} tone="green" />
              <h2 id="staff-heading" className="mt-5 text-h2">
                Staff and ex-staff deposits
              </h2>
              <ul className="mt-8 flex flex-col gap-3">
                {[
                  { value: "+1.00%", label: "above public rates, for staff", tone: "bg-purple" },
                  { value: "+0.50%", label: "further, from the age of 60", tone: "bg-mint" },
                ].map((item, index) => (
                  <li
                    key={item.value}
                    className={`chip-float flex items-center gap-4 self-start rounded-xl px-5 py-3.5 text-ink shadow-inset ${item.tone}`}
                    style={{ "--chip-delay": `${index * 160}ms` } as CSSProperties}
                  >
                    <span className="text-h3 tabular-nums">{item.value}</span>
                    <span className="text-meta text-ink/80">{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <ul className="reveal-stagger flex flex-col gap-4">
              {staffRateNotes.map((note, index) => (
                <li
                  key={index}
                  className="rounded-xl bg-surface p-6 text-meta leading-relaxed text-fg-muted shadow-card sm:p-7"
                >
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section bg="page" padY="md" aria-labelledby="deposit-help">
        <Container>
          <CalloutPanel
            id="deposit-help"
            tone="mint"
            title="Open a term deposit"
            actions={
              <>
                <PillButton href="/#open-an-account" variant="light">
                  Open an account
                </PillButton>
                <LinkArrow href="/contact" tone="ink">
                  Talk to your branch
                </LinkArrow>
              </>
            }
          >
            Rates are locked for the term on the day the deposit is booked. Senior-citizen and staff
            differentials, and the Tax Saving Scheme conditions, are set out in the notes above.
          </CalloutPanel>
        </Container>
      </Section>
    </>
  );
}
