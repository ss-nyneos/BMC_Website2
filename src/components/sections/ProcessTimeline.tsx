import { Container } from "../layout/Container";
import { Section } from "../layout/Section";
import { Timeline } from "../ui/Timeline";
import { processColumns } from "../../data/process";

/**
 * Reference image 7: what actually happens after the form is sent, as two
 * ordered stages with real durations.
 *
 * People abandon bank applications because they cannot tell how long the rest
 * will take. Publishing the timings is the point of this section.
 */
export function ProcessTimeline() {
  return (
    <Section bg="white" padY="lg" aria-labelledby="process-heading">
      <Container>
        <h2 id="process-heading" className="reveal max-w-[20ch] text-h2">
          What happens after you apply
        </h2>

        <div className="reveal mt-14">
          <Timeline columns={processColumns} />
        </div>
      </Container>
    </Section>
  );
}
