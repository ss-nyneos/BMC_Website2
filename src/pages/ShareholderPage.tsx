import type { CSSProperties } from "react";
import { Container } from "../components/layout/Container";
import { PageHeader } from "../components/layout/PageHeader";
import { Section } from "../components/layout/Section";
import { CalloutPanel } from "../components/ui/CalloutPanel";
import { CountUp } from "../components/ui/CountUp";
import { IconChip } from "../components/ui/IconChip";
import { LinkArrow } from "../components/ui/LinkArrow";
import { CalendarIcon, PercentIcon, ShieldIcon, UserIcon, UsersIcon } from "../assets/icons";
import { photoId, photos } from "../data/photos";
import {
  shareholderAsAt,
  shareholderFigures,
  shareholderNotes,
  shareholderPriorAsAt,
} from "../data/shareholder";

const toNumber = (value: string) => Number(value.replace(/[^\d.]/g, ""));

/**
 * Two published figures, one bar each, on the same scale. The bars are drawn
 * against the larger of the two, so the direction of travel is visible at a
 * glance; each carries its figure and its date as text, so the comparison reads
 * without the bars.
 */
function YearBars({
  current,
  prior,
  fill,
  track,
}: {
  current: string;
  prior: string;
  fill: string;
  track: string;
}) {
  const max = Math.max(toNumber(current), toNumber(prior)) || 1;
  const rows = [
    { label: shareholderAsAt, value: current },
    { label: shareholderPriorAsAt, value: prior },
  ];

  return (
    <ul className="reveal flex flex-col gap-3.5">
      {rows.map((row, index) => (
        <li key={row.label} className="grid gap-1.5">
          <span className="flex items-baseline justify-between gap-4 text-fine text-ink/80">
            <span>{row.label}</span>
            <span className="font-bold tabular-nums text-ink">{row.value}</span>
          </span>
          <span className={`relative h-2.5 overflow-hidden rounded-pill ${track}`}>
            <span
              aria-hidden="true"
              className={`bar-grow absolute inset-y-0 left-0 min-w-2.5 rounded-pill ${fill}`}
              style={
                { width: `${(toNumber(row.value) / max) * 100}%`, "--i": index } as CSSProperties
              }
            />
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Shareholder and membership figures.
 *
 * The bank publishes three numbers and three sentences, so the page leads with
 * the figures and shows the previous year beside each one as a pair of bars — a
 * membership count means very little without the direction of travel. The ratio
 * is drawn against the ceiling the bank itself cites, 20% of total membership,
 * which is what makes 0.12% legible as "well within". Nothing is extrapolated:
 * every number here is one the bank published.
 *
 * Blue for the headline count, green for nominal members, pale blue for the
 * ratio; text on all three is the fixed `ink`, so it holds in both themes.
 */
export function ShareholderPage() {
  const [total, nominal, ratio] = shareholderFigures;

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Resources" }, { label: "Shareholder information" }]}
        title="Shareholder information"
        description="Membership of the bank, as reported for the financial year."
        meta={`Figures as at ${shareholderAsAt}, compared with ${shareholderPriorAsAt}`}
        photo={photos.meetingHall}
        photoId={photoId.meetingHall}
        photoField="lavender"
        facts={[
          { icon: UsersIcon, value: total.value, label: "shareholders" },
          { icon: CalendarIcon, value: shareholderAsAt, label: "figures as at" },
        ]}
      />

      <Section bg="page" padY="lg" aria-labelledby="figures-heading" className="!pt-4 md:!pt-6">
        <Container>
          <h2 id="figures-heading" className="sr-only">
            Membership figures
          </h2>

          <ul className="reveal-stagger grid gap-5 lg:grid-cols-12">
            <li className="group spotlight relative flex flex-col gap-10 overflow-hidden rounded-2xl bg-purple p-8 text-ink shadow-inset sm:p-10 lg:col-span-7">
              <span
                aria-hidden="true"
                className="absolute -right-24 -top-24 h-72 w-72 rounded-pill border-[36px] border-white/20 transition-transform duration-1000 ease-out-expo group-hover:scale-110"
              />
              <div className="relative flex items-center gap-4">
                <IconChip icon={UsersIcon} tone="white" size="lg" />
                <h3 className="text-label font-medium">{total.label}</h3>
              </div>
              <div className="relative flex flex-col gap-8">
                <CountUp value={total.value} className="block text-display" />
                <YearBars
                  current={total.value}
                  prior={total.prior}
                  fill="bg-ink"
                  track="bg-white/40"
                />
              </div>
            </li>

            <li className="group spotlight flex flex-col gap-10 rounded-2xl bg-mint p-8 text-ink shadow-inset sm:p-10 lg:col-span-5">
              <div className="flex items-center gap-4">
                <IconChip icon={UserIcon} tone="white" size="lg" />
                <h3 className="text-label font-medium">{nominal.label}</h3>
              </div>
              <div className="flex flex-col gap-8">
                <CountUp value={nominal.value} className="block text-display" />
                <YearBars
                  current={nominal.value}
                  prior={nominal.prior}
                  fill="bg-ink"
                  track="bg-white/50"
                />
              </div>
            </li>

            <li className="group spotlight grid gap-8 rounded-2xl bg-lavender-soft p-8 text-ink shadow-inset sm:p-10 lg:col-span-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:items-center lg:gap-16">
              <div>
                <div className="flex items-center gap-4">
                  <IconChip icon={PercentIcon} tone="blue" size="lg" />
                  <h3 className="text-label font-medium">{ratio.label}</h3>
                </div>
                <div className="mt-6">
                  <CountUp value={ratio.value} className="block text-display" />
                  <span className="mt-1 block text-meta text-ink/80">{ratio.prior}</span>
                </div>
              </div>

              {/* The RBI ceiling the bank cites in its own note. The marker sits
                  at 0.12 / 20 of the track, and never narrower than itself. */}
              <div className="reveal">
                <div className="flex items-center justify-between gap-4 text-fine text-ink/80">
                  <span>0%</span>
                  <span className="inline-flex items-center gap-2">
                    <ShieldIcon className="h-4 w-4" />
                    20% of total membership, the most the RBI permits
                  </span>
                </div>
                <div className="relative mt-3 h-4 rounded-pill bg-white shadow-inset">
                  <span
                    aria-hidden="true"
                    className="bar-grow absolute inset-y-0 left-0 min-w-4 rounded-pill bg-purple"
                    style={{ width: `${(toNumber(ratio.value) / 20) * 100}%` }}
                  />
                  <span
                    aria-hidden="true"
                    className="pop-late absolute -top-2 left-0 grid h-8 min-w-8 place-items-center rounded-pill bg-ink px-2.5 text-fine font-bold text-white shadow-pill"
                  >
                    {ratio.value}
                  </span>
                </div>
                <p className="mt-6 max-w-prose text-meta text-ink/80">{shareholderNotes[2]}</p>
              </div>
            </li>
          </ul>

          <div className="mt-16 grid gap-5 md:grid-cols-2">
            {shareholderNotes.slice(0, 2).map((note, index) => (
              <p
                key={index}
                className="reveal-pop rounded-xl bg-surface p-6 text-body-sm text-fg-muted shadow-card sm:p-8"
              >
                {note}
              </p>
            ))}
          </div>
        </Container>
      </Section>

      <Section bg="page" padY="md" aria-labelledby="shareholder-more" className="!pt-0">
        <Container>
          <CalloutPanel
            id="shareholder-more"
            tone="mint"
            title="Annual report and board papers"
            actions={
              <>
                <LinkArrow href="/profile/annual-report" tone="ink">
                  Annual and board report
                </LinkArrow>
                <LinkArrow href="/profile/board-of-directors" tone="ink">
                  Board of Directors
                </LinkArrow>
              </>
            }
          >
            The audited accounts, the board of directors&rsquo; report and the notice of the annual
            general meeting are published with the bank&rsquo;s profile.
          </CalloutPanel>
        </Container>
      </Section>
    </>
  );
}
