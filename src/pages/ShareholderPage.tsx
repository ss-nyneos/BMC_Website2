import { Container } from "../components/layout/Container";
import { PageHeader } from "../components/layout/PageHeader";
import { Section } from "../components/layout/Section";
import { CalloutPanel } from "../components/ui/CalloutPanel";
import { LinkArrow } from "../components/ui/LinkArrow";
import { photoId, photos } from "../data/photos";
import {
  shareholderAsAt,
  shareholderFigures,
  shareholderNotes,
  shareholderPriorAsAt,
} from "../data/shareholder";

/**
 * Shareholder and membership figures.
 *
 * The bank publishes three numbers and two paragraphs, so the page leads with
 * the figures and shows the previous year beside each one — a membership count
 * means very little without the direction of travel. Nothing is extrapolated:
 * every number here is one the bank published for 31 March 2024.
 *
 * The three figure cards take the homepage's gold / mint / pale-mint trio, with
 * text at the fixed `ink` (85% for the supporting line) so it holds in both
 * themes — the same pairing `ColorCard` uses.
 */
const figureTones = [
  "border border-line bg-purple",
  "border border-line bg-mint",
  "border border-line bg-sage",
];

export function ShareholderPage() {
  return (
    <>
      <PageHeader
        title="Shareholder information"
        description="Membership of the bank, as reported for the financial year."
        meta={`Figures as at ${shareholderAsAt}, compared with ${shareholderPriorAsAt}`}
        photo={photos.heritage}
        photoId={photoId.heritage}
        photoField="lavender"
      />

      <Section bg="page" padY="lg" aria-labelledby="figures-heading">
        <Container>
          <h2 id="figures-heading" className="sr-only">
            Membership figures
          </h2>

          <dl className="grid gap-4 sm:gap-5 lg:grid-cols-3">
            {shareholderFigures.map((figure, index) => (
              <div
                key={figure.label}
                className={`flex flex-col gap-3 rounded-2xl p-7 text-ink sm:p-8 ${
                  figureTones[index % figureTones.length]
                }`}
              >
                <dt className="text-label text-ink/85">{figure.label}</dt>
                <dd className="text-h2 tabular-nums">{figure.value}</dd>
                <p className="text-meta text-ink/85">
                  {figure.isRatio
                    ? figure.prior
                    : `${figure.prior} as at ${shareholderPriorAsAt}`}
                </p>
              </div>
            ))}
          </dl>

          <div className="mt-14 flex max-w-prose flex-col gap-5">
            {shareholderNotes.map((note, index) => (
              <p key={index} className="text-body-sm text-fg-muted">
                {note}
              </p>
            ))}
          </div>
        </Container>
      </Section>

      <Section bg="page" padY="md" aria-labelledby="shareholder-more">
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
