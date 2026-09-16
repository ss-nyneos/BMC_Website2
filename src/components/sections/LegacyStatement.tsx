import { Container } from "../layout/Container";
import { TwoToneText } from "../ui/TwoToneText";

/**
 * Reference image 2: one long statement, the opening clause in full ink and the
 * rest muted, on a lavender field.
 *
 * This is the only place on the page where type alone carries a whole section.
 * Nothing else competes with it, which is what makes the scale read as
 * deliberate rather than loud.
 */
const STATEMENT =
  "Bombay Mercantile Co-operative Bank has helped India save, borrow and grow since 1939. From the first co-operative bank granted scheduled status by the Reserve Bank of India, to a network across ten states, our promise has never changed: modern banking, built on trust.";

export function LegacyStatement() {
  return (
    <section
      id="our-story"
      aria-labelledby="legacy-heading"
      className="scroll-mt-4 bg-page py-4 lg:py-6"
    >
      <Container>
        <div className="reveal-pop rounded-2xl bg-lavender px-6 py-16 text-ink shadow-inset sm:px-10 sm:py-20 lg:px-16 lg:py-30">
          <h2 id="legacy-heading" className="sr-only">
            Eighty-six years of co-operative banking
          </h2>
          <TwoToneText
            text={STATEMENT}
            split="From the first"
            scrollFill
            tone="ink"
            className="max-w-[26ch] sm:max-w-[34ch] lg:max-w-[30ch]"
          />
        </div>
      </Container>
    </section>
  );
}
