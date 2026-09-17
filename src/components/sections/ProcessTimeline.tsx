import { Timeline } from "../ui/Timeline";
import { processColumns } from "../../data/process";

/**
 * Reference image 7: what actually happens after the form is sent, as two
 * ordered stages with real durations.
 *
 * People abandon bank applications because they cannot tell how long the rest
 * will take. Publishing the timings is the point of this section. It follows
 * "Open your account" directly, whose form is the first step it describes, and
 * sits inside the homepage's bmc_website2 sections, so it carries no section
 * padding or container of its own.
 */
export function ProcessTimeline() {
  return (
    <section id="after-you-apply" aria-labelledby="process-heading" className="scroll-mt-6 py-4 lg:py-8">
      <h2 id="process-heading" className="reveal text-bmc-display text-bmc-ink">
        What happens after you apply
      </h2>

      <div className="reveal mt-10 lg:mt-14">
        <Timeline columns={processColumns} />
      </div>
    </section>
  );
}
