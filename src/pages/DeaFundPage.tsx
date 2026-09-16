import { Container } from "../components/layout/Container";
import { PageHeader } from "../components/layout/PageHeader";
import { Section } from "../components/layout/Section";
import { SectionHeading } from "../components/ui/SectionHeading";
import { CalloutPanel } from "../components/ui/CalloutPanel";
import { PillButton } from "../components/ui/PillButton";
import { LinkArrow } from "../components/ui/LinkArrow";
import { ExternalIcon } from "../assets/icons";
import { photoId, photos } from "../data/photos";
import { deafClaimSteps, deafDocuments, deafIntro } from "../data/deaf";

/**
 * Unclaimed deposits under the Depositor Education and Awareness Fund scheme.
 *
 * The live page is twelve bare spreadsheet links under no heading. Someone
 * reaching it is usually looking for a relative's forgotten account, so the
 * page now says what the fund is, that the money is still claimable, and what
 * to do next — with the lists themselves kept exactly as published.
 *
 * The lists open on Google Sheets, an external host, so each link is marked as
 * leaving the site rather than opening silently in a new tab.
 */
export function DeaFundPage() {
  return (
    <>
      <PageHeader
        title="DEA Fund: unclaimed deposits"
        description="Accounts and deposits left inoperative for ten years are transferred to the Reserve Bank's Depositor Education and Awareness Fund. The money remains claimable."
        photo={photos.heritage}
        photoId={photoId.heritage}
        photoField="lavender"
      />

      <Section bg="page" padY="lg" aria-labelledby="deaf-about">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <h2 id="deaf-about" className="text-h2">
                What this means
              </h2>
              <div className="mt-7 flex flex-col gap-5">
                {deafIntro.map((paragraph, index) => (
                  <p key={index} className="max-w-prose text-body-sm text-fg-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* The action a claimant needs, on the brand sky-blue panel so it
                reads as the thing to do rather than one more block of prose. */}
            <div className="rounded-2xl bg-purple p-7 text-ink sm:p-9">
              <h2 className="text-h3">How to claim</h2>
              <ol className="mt-7 flex flex-col gap-6">
                {deafClaimSteps.map((step, index) => (
                  <li key={index} className="flex gap-5">
                    <span
                      aria-hidden="true"
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-pill bg-white text-label font-bold text-ink"
                    >
                      {index + 1}
                    </span>
                    <span className="pt-2 text-body-sm text-ink/80">{step}</span>
                  </li>
                ))}
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

          <ul className="reveal-stagger mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {deafDocuments.map((document) => (
              <li key={document.label}>
                <a
                  href={document.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex min-h-[4.5rem] items-center justify-between gap-5 rounded-2xl bg-lavender-soft p-6 text-ink shadow-inset transition-[transform,box-shadow,background-color] duration-500 ease-out-expo hover:-translate-y-1 hover:bg-lavender hover:shadow-inset-hover"
                >
                  <span className="text-body-sm font-medium">
                    {document.label}
                    <span className="sr-only"> (opens on Google Sheets)</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-pill bg-purple text-ink transition-transform duration-200 group-hover:-translate-y-0.5"
                  >
                    <ExternalIcon className="h-4 w-4" />
                  </span>
                </a>
              </li>
            ))}
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
            address, the passbook or deposit receipt if you have it, and proof of your entitlement to
            the balance where you are claiming as a legal heir.
          </CalloutPanel>
        </Container>
      </Section>
    </>
  );
}
