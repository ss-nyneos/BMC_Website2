import type { CSSProperties } from "react";
import { Container } from "../components/layout/Container";
import { PageHeader } from "../components/layout/PageHeader";
import { Section } from "../components/layout/Section";
import { Accordion } from "../components/ui/Accordion";
import { CalloutPanel } from "../components/ui/CalloutPanel";
import { CircleArrow } from "../components/ui/CircleArrow";
import { IconChip } from "../components/ui/IconChip";
import { PillButton } from "../components/ui/PillButton";
import { LinkArrow } from "../components/ui/LinkArrow";
import { GlobeIcon, HeadsetIcon, HelpIcon, LockIcon } from "../assets/icons";
import { photoId, photos } from "../data/photos";
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
                    className="mt-2.5 h-2 w-2 shrink-0 rounded-pill bg-purple"
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

/** Each group's colour and mark, in `faqGroups` order: blue, then green. */
const groupArt = [
  { icon: LockIcon, card: "bg-purple", chip: "white" as const, aside: "blue" as const },
  { icon: GlobeIcon, card: "bg-mint", chip: "white" as const, aside: "green" as const },
];

/**
 * The bank's published FAQ.
 *
 * Grouped into two headed sets rather than the live site's single flat list.
 * Seven of the eleven questions are about NRI accounts, and a resident customer
 * looking for the nomination rules should not have to read past them.
 *
 * The page opens on the two groups as cards, blue and green, each previewing
 * its first questions and jumping to its answers. Each group then keeps its
 * title, count and a way to ask in a column that stays in view on wide screens
 * while its questions scroll past as cards.
 */
export function FaqPage() {
  const total = faqGroups.reduce((sum, group) => sum + group.entries.length, 0);

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Resources" }, { label: "Frequently asked questions" }]}
        title="Frequently asked questions"
        description="Deposits, nomination, and the rules that apply to NRI accounts. If your question is not answered here, customer care is on 1800 220 854."
        photo={photos.questionMark}
        photoId={photoId.questionMark}
        photoField="lavender"
        facts={[
          { icon: HelpIcon, value: `${total} answers`, label: `in ${faqGroups.length} groups` },
          { icon: HeadsetIcon, value: "1800 220 854", label: "for anything else" },
        ]}
      />

      <Section bg="page" padY="md" aria-label="Topics" className="!pt-4 md:!pt-6">
        <Container>
          <ul className="reveal-stagger grid gap-5 md:grid-cols-2">
            {faqGroups.map((group, groupIndex) => {
              const art = groupArt[groupIndex % groupArt.length];
              return (
                <li key={group.label}>
                  <a
                    href={`#faq-group-${groupIndex}`}
                    className={`group spotlight relative flex h-full flex-col overflow-hidden rounded-2xl p-7 text-ink shadow-inset transition-[transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-2 hover:shadow-inset-hover sm:p-9 ${art.card}`}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute -right-16 -top-16 h-52 w-52 rounded-pill border-[28px] border-white/25 transition-transform duration-1000 ease-out-expo group-hover:scale-110"
                    />
                    <span className="relative flex items-start justify-between gap-4">
                      <IconChip icon={art.icon} tone={art.chip} size="lg" />
                      <span className="rounded-pill bg-white px-3.5 py-1.5 text-fine font-bold tabular-nums shadow-pill">
                        {group.entries.length} questions
                      </span>
                    </span>

                    <span className="relative mt-10 block text-h2">{group.label}</span>
                    <span className="relative mt-5 flex flex-col gap-2.5">
                      {group.entries.slice(0, 3).map((entry, index) => (
                        <span
                          key={entry.question}
                          className="flex gap-3 text-meta text-ink/80 transition-transform duration-500 ease-out-expo group-hover:translate-x-1"
                          style={{ transitionDelay: `${index * 40}ms` } as CSSProperties}
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-pill bg-ink/60"
                          />
                          {entry.question}
                        </span>
                      ))}
                    </span>

                    <span className="relative mt-auto flex items-center justify-between gap-4 pt-9">
                      <span className="text-label font-medium">Read the answers</span>
                      <CircleArrow tone="ink" direction="down" />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      {faqGroups.map((group, groupIndex) => {
        const art = groupArt[groupIndex % groupArt.length];
        return (
          <Section
            key={group.label}
            bg={groupIndex % 2 === 0 ? "white" : "page"}
            padY="lg"
            aria-labelledby={`faq-group-${groupIndex}`}
          >
            <Container>
              <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
                <div className="reveal lg:sticky lg:top-10">
                  <IconChip icon={art.icon} tone={art.aside} size="lg" />
                  <h2 id={`faq-group-${groupIndex}`} className="mt-6 scroll-mt-10 text-h2">
                    {group.label}
                  </h2>
                  <p className="mt-3 text-body-sm text-fg-muted">
                    {group.entries.length} questions, answered from the bank&rsquo;s published
                    rules.
                  </p>
                  <div className="mt-7">
                    <LinkArrow
                      href="tel:1800220854"
                      tone={art.aside === "blue" ? "blue" : "lavender"}
                    >
                      Ask customer care
                    </LinkArrow>
                  </div>
                </div>

                <Accordion
                  variant="cards"
                  className="reveal-stagger flex flex-col gap-3"
                  defaultOpen={groupIndex === 0 ? 0 : undefined}
                  items={group.entries.map((entry) => ({
                    title: entry.question,
                    content: <Answer blocks={entry.blocks} />,
                  }))}
                />
              </div>
            </Container>
          </Section>
        );
      })}

      <Section bg="white" padY="md" aria-labelledby="faq-help">
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
