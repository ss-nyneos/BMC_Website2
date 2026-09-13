import { Container } from "../components/layout/Container";
import { PageHeader } from "../components/layout/PageHeader";
import { Section } from "../components/layout/Section";
import { DataTable } from "../components/ui/DataTable";
import { CalloutPanel } from "../components/ui/CalloutPanel";
import { LinkArrow } from "../components/ui/LinkArrow";
import { photoId, photos } from "../data/photos";
import { gstIssuer, gstRegistrations, smsChargeNote } from "../data/gst";

/**
 * The bank's GST registration numbers.
 *
 * A customer arrives here for one reason: to copy the GSTIN for the state they
 * bank in, into a return. So the state is the first column and the thing you
 * search by, the GSTIN is set in a monospaced face at a size that survives a
 * photograph, and nothing else competes for the page.
 */
export function GstPage() {
  return (
    <>
      <PageHeader
        title="GST registration numbers"
        description="Bombay Mercantile Co-operative Bank is registered for GST in each state where it operates. Use the number for the state your branch is in."
        meta={gstIssuer}
        photo={photos.business}
        photoId={photoId.business}
        photoField="mint"
      />

      <Section bg="page" padY="lg" aria-labelledby="page-heading">
        <Container>
          <DataTable
            caption="GST registration numbers by state"
            columns={[
              { header: "Sr. no.", className: "w-20" },
              { header: "State" },
              { header: "GSTIN" },
              { header: "Status", align: "right" },
            ]}
            rows={gstRegistrations.map((row) => [
              <span className="tabular-nums text-fg-muted">{row.sr}</span>,
              <span className="font-medium">{row.state}</span>,
              // One type family, per DESIGN.md, so the GSTIN gets its legibility
              // from tabular figures and wider tracking rather than a mono face.
              <span className="whitespace-nowrap font-medium tabular-nums tracking-[0.06em]">
                {row.gstin}
              </span>,
              <span className="text-fg-muted">{row.status}</span>,
            ])}
          />
        </Container>
      </Section>

      <Section bg="page" padY="md" aria-labelledby="gst-sms">
        <Container>
          <CalloutPanel
            id="gst-sms"
            tone="sage"
            title="SMS charges"
            actions={
              <LinkArrow href="/contact" tone="ink">
                Ask your branch
              </LinkArrow>
            }
          >
            {smsChargeNote}
          </CalloutPanel>
        </Container>
      </Section>
    </>
  );
}
