import { Container } from "../layout/Container";
import { TwoToneText } from "../ui/TwoToneText";

/**
 * Reference image 2: one long statement, the opening clause in full ink and the
 * rest muted, set straight on the page directly under the hero.
 *
 * This is the only place on the page where type alone carries a whole section.
 * Nothing else competes with it, which is what makes the scale read as
 * deliberate rather than loud. It runs the full width of the container, centred
 * from tablet up; on a phone the lines are too short to centre comfortably, so
 * it stays ranged left there.
 *
 * No bottom padding: the rate strip below brings its own top rhythm, and the two
 * together would open a gap wider than the one above.
 */
const STATEMENT =
  "Bombay Mercantile Co-operative Bank has helped India save, borrow and grow since 1939. From the first co-operative bank granted scheduled status by the Reserve Bank of India, to a network across ten states, our promise has never changed: modern banking, built on trust.";

export function LegacyStatement() {
  return (
    <section
      id="our-story"
      aria-labelledby="legacy-heading"
      className="scroll-mt-4 bg-page pt-14 text-fg md:pt-20 lg:pt-30"
    >
      <Container>
        <h2 id="legacy-heading" className="sr-only">
          Eighty-six years of co-operative banking
        </h2>
        <div className="reveal">
          <TwoToneText
            text={STATEMENT}
            split="From the first"
            scrollFill
            className="w-full text-pretty md:text-center"
          />
        </div>
      </Container>
    </section>
  );
}
