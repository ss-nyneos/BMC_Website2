import { Container } from "../layout/Container";
import { Section } from "../layout/Section";
import { SplitPanel } from "../layout/SplitPanel";
import { CirclePhoto } from "../ui/CirclePhoto";
import { StageList } from "../ui/StageList";
import { digitalStages } from "../../data/stages";
import { photoId, photos } from "../../data/photos";

/**
 * Reference image 8: a saturated panel with the title stacked above and below a
 * circular photograph, beside the numbered capability cards.
 *
 * The panel title is split across the photograph exactly as in the reference.
 * It is one heading in the markup, so it is announced as one phrase.
 */
export function DigitalJourney() {
  return (
    <Section bg="page" padY="lg" aria-labelledby="digital-heading">
      <Container>
        <SplitPanel
          reverse
          media={
            <div className="reveal-clip group flex w-full flex-col items-center justify-center rounded-2xl bg-purple px-6 py-14 text-ink shadow-inset sm:px-10 lg:py-16">
              <h2 id="digital-heading" className="w-full text-center text-display">
                <span className="block">Digital</span>
                <span className="my-6 block px-4 sm:my-8">
                  <span className="mx-auto block w-full max-w-[300px]" data-parallax="0.05">
                    <CirclePhoto photo={photos.mobile} id={photoId.mobile} />
                  </span>
                </span>
                <span className="block">banking</span>
              </h2>
            </div>
          }
          body={<StageList stages={digitalStages} className="w-full" />}
        />
      </Container>
    </Section>
  );
}
