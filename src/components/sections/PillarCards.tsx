import { Container } from "../layout/Container";
import { Section } from "../layout/Section";
import { PhotoCard } from "../ui/PhotoCard";
import { pillars } from "../../data/pillars";

/**
 * Reference image 6, reworked: three cards that are all photograph, the title
 * set in white on each.
 *
 * Three, not six. The page already routes to individual products through the
 * pill rows above, so this block only has to answer "which of these am I?".
 */
export function PillarCards() {
  return (
    <Section bg="page" padY="lg" aria-labelledby="pillars-heading">
      <Container>
        <h2 id="pillars-heading" className="max-w-[20ch] text-h2">
          Find your way in
        </h2>

        <div className="reveal-group mt-12 grid gap-4 sm:gap-5 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <PhotoCard
              key={pillar.title}
              title={pillar.title}
              caption={pillar.caption}
              href={pillar.href}
              photo={pillar.photo}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
