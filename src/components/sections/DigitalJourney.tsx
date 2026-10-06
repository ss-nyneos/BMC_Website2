import { Container } from "../layout/Container";
import { Section } from "../layout/Section";
import { SplitPanel } from "../layout/SplitPanel";
import { MediaPanel } from "../ui/MediaPanel";
import { StageList } from "../ui/StageList";
import { digitalStages } from "../../data/stages";
import { photos } from "../../data/photos";

/**
 * Reference image 8: a full-bleed photograph carrying the section title in
 * white, beside the numbered capability cards. The title sits on the panel's
 * ink scrim, so it holds contrast whatever the photograph does behind it.
 */
export function DigitalJourney() {
  return (
    <Section bg="page" padY="lg" aria-labelledby="digital-heading">
      <Container>
        <SplitPanel
          reverse
          media={
            <MediaPanel photo={photos.mobile}>
              <h2 id="digital-heading" className="text-display">
                Digital banking
              </h2>
            </MediaPanel>
          }
          body={<StageList stages={digitalStages} className="w-full" />}
        />
      </Container>
    </Section>
  );
}
