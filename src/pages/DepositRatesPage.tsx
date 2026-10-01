import { Container } from "../components/layout/Container";
import { PageHeader } from "../components/layout/PageHeader";
import { Section } from "../components/layout/Section";
import { SectionHeading } from "../components/ui/SectionHeading";
import { DataTable } from "../components/ui/DataTable";
import { CalloutPanel } from "../components/ui/CalloutPanel";
import { MediaPanel } from "../components/ui/MediaPanel";
import { PillButton } from "../components/ui/PillButton";
import { LinkArrow } from "../components/ui/LinkArrow";
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

function NoteList({ title, notes, id }: { title: string; notes: string[]; id: string }) {
  return (
    <div>
      <h3 id={id} className="text-h3">
        {title}
      </h3>
      <ul aria-labelledby={id} className="mt-6 flex flex-col gap-5">
        {notes.map((note, index) => (
          <li key={index} className="flex gap-4 text-body-sm text-fg-muted">
            <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-pill bg-forest" />
            <span>{note}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Published term-deposit rates.
 *
 * Three separate schedules — domestic and NRO, NRE rupee, and FCNR(B) — each
 * with its own effective date. They are kept as three tables rather than merged
 * into one filterable grid, because a depositor knows which of the three they
 * are before they arrive, and merging them would put a rate a customer is not
 * eligible for next to one they are.
 *
 * The effective date sits in the page header and again above each table. A rate
 * without its date is the single most dangerous thing this page could publish.
 */
export function DepositRatesPage() {
  return (
    <>
      <PageHeader
        title="Deposit rates"
        description="Interest rates on domestic, NRO, NRE and FCNR(B) deposits. Rates are per annum and are subject to change."
        meta={`Domestic, NRO and NRE rates effective ${domesticRatesEffective}`}
        photo={photos.heroSmiling}
        photoId={photoId.heroSmiling}
        photoField="mint"
      />

      <Section bg="page" padY="lg" aria-labelledby="domestic-heading">
        <Container>
          <SectionHeading
            id="domestic-heading"
            title="Domestic deposits and NRO"
            description={`Revised with effect from ${domesticRatesEffective}. Where two figures are shown, the second is the non-callable rate for deposits of ₹1 crore and above.`}
          />

          <DataTable
            className="mt-10"
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

          <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
            <NoteList id="rate-notes" title="How these rates apply" notes={depositRateNotes} />
            <NoteList
              id="penalty-notes"
              title="Premature withdrawal and renewal"
              notes={prematureWithdrawalNotes}
            />
          </div>
        </Container>
      </Section>

      <Section bg="white" padY="lg" aria-labelledby="nre-heading">
        <Container>
          <SectionHeading
            id="nre-heading"
            title="Non-Resident External (NRE) rupee term deposits"
            description={`Revised with effect from ${nreRatesEffective}. The same rate applies to all categories of depositor.`}
          />

          <div className="mt-10 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <DataTable
              caption={`NRE rupee term deposit rates, effective ${nreRatesEffective}`}
              columns={[
                { header: "Period" },
                { header: "Rate (% p.a.), all categories", align: "right" },
              ]}
              rows={nreRates.map((row) => [
                <span className="font-medium">{row.period}</span>,
                <Rate value={row.rate} />,
              ])}
            />

            <ul className="flex flex-col gap-5">
              {nreNotes.map((note, index) => (
                <li key={index} className="flex gap-4 text-body-sm text-fg-muted">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-pill bg-forest"
                  />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section bg="page" padY="lg" aria-labelledby="fcnr-heading">
        <Container>
          <SectionHeading id="fcnr-heading" title="FCNR(B) deposits" description={fcnrHeading} />

          <div className="mt-10 grid items-start gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <DataTable
              caption={fcnrHeading}
              columns={[{ header: "Maturity" }, { header: "Rate of interest", align: "right" }]}
              rows={fcnrRates.map((row) => [
                <span className="font-medium">{row.period}</span>,
                <Rate value={row.rate} />,
              ])}
            />

            <div className="flex flex-col gap-8">
              <p className="text-body-sm text-fg-muted">{fcnrNote}</p>
              <MediaPanel
                className="hidden sm:flex"
                tone="blue"
                photo={photos.overseas}
                id={photoId.overseas}
                maxWidth={280}
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section bg="white" padY="lg" aria-labelledby="staff-heading">
        <Container>
          <NoteList id="staff-heading" title="Staff and ex-staff deposits" notes={staffRateNotes} />
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
            Rates are locked for the term on the day the deposit is booked. Senior-citizen and
            staff differentials, and the Tax Saving Scheme conditions, are set out in the notes
            above.
          </CalloutPanel>
        </Container>
      </Section>
    </>
  );
}
