import { Container } from "../layout/Container";
import { Section } from "../layout/Section";
import { ColorCard } from "../ui/ColorCard";
import { pillars } from "../../data/pillars";
import { photoId } from "../../data/photos";

/**
 * Reference image 6: three solid colour fields, each with a circular photograph.
 *
 * Three, not six. The page already routes to individual products through the
 * pill rows above, so this block only has to answer "which of these am I?".
 */
const ids = [photoId.personal, photoId.business, photoId.overseas];

export function PillarCards() {
  return (
    <Section bg="page" padY="lg" aria-labelledby="pillars-heading">
      <Container>
        <h2 id="pillars-heading" className="max-w-[20ch] text-h2">
          Find your way in
        </h2>

        <div className="reveal mt-12 grid gap-4 sm:gap-5 lg:grid-cols-3">
          {pillars.map((pillar, index) => (
            <ColorCard
              key={pillar.title}
              title={pillar.title}
              caption={pillar.caption}
              href={pillar.href}
              tone={pillar.tone}
              photo={pillar.photo}
              id={ids[index]}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
