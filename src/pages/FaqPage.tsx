import { Container } from "../components/layout/Container";
import { PageHeader } from "../components/layout/PageHeader";
import { Section } from "../components/layout/Section";
import { Accordion } from "../components/ui/Accordion";
import { CalloutPanel } from "../components/ui/CalloutPanel";
import { PillButton } from "../components/ui/PillButton";
import { LinkArrow } from "../components/ui/LinkArrow";
import { photos } from "../data/photos";
import { faqGroups } from "../data/faq-page";
import type { FaqBlock } from "../types";

/** Renders one answer's blocks: paragraphs, sub-headings and lists. */
function Answer({ blocks }: { blocks: FaqBlock[] }) {
  return (
    <div className="flex flex-col gap-5">
      {blocks.map((block, index) => {
        if (block.kind === "subhead") {
          return (
            <h4 key={index} className="text-label font-medium text-fg">
              {block.text}
            </h4>
          );
        }

        if (block.kind === "list") {
          return (
            <ul key={index} className="flex flex-col gap-4">
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-pill bg-forest"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }

        return <p key={index}>{block.text}</p>;
      })}
    </div>
  );
}

/**
 * The bank's published FAQ.
 *
 * Grouped into two headed sets rather than the live site's single flat list.
 * Seven of the eleven questions are about NRI accounts, and a resident customer
 * looking for the nomination rules should not have to read past them.
 */
export function FaqPage() {
  return (
    <>
      <PageHeader
        title="Frequently asked questions"
        description="Deposits, nomination, and the rules that apply to NRI accounts. If your question is not answered here, customer care is on 1800 220 854."
        photo={photos.mobile}
        photoField="lavender"
      />

      {faqGroups.map((group, groupIndex) => (
        <Section
          key={group.label}
          bg={groupIndex % 2 === 0 ? "page" : "white"}
          padY="lg"
          aria-labelledby={`faq-group-${groupIndex}`}
        >
          <Container>
            <h2 id={`faq-group-${groupIndex}`} className="text-h2">
              {group.label}
            </h2>

            <Accordion
              className="mt-10 border-t border-line"
              defaultOpen={groupIndex === 0 ? 0 : undefined}
              items={group.entries.map((entry) => ({
                title: entry.question,
                content: <Answer blocks={entry.blocks} />,
              }))}
            />
          </Container>
        </Section>
      ))}

      <Section bg="page" padY="md" aria-labelledby="faq-help">
        <Container>
          <CalloutPanel
            id="faq-help"
            tone="mint"
            title="Still need an answer?"
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
            Your branch can answer anything specific to your account. Branch telephone numbers and
            addresses are on the contact page.
          </CalloutPanel>
        </Container>
      </Section>
    </>
  );
}
