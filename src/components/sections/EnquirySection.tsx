import { Container } from "../layout/Container";
import { Section } from "../layout/Section";
import { BulletList } from "../ui/BulletList";
import { EnquiryForm } from "./EnquiryForm";
import { leadershipQuote, whyBmc } from "../../data/firsts";

/**
 * Reference image 5: reasons and a quote on the left, the form on the right.
 *
 * The form is the page's single conversion point, so everything beside it is
 * there to answer the last question before someone commits: deposit insurance,
 * how long the bank has been here, and what they get on day one.
 */
export function EnquirySection() {
  return (
    <Section bg="page" padY="lg" id="open-an-account" aria-labelledby="enquiry-heading">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 id="enquiry-heading" className="text-h2">
              Open an account
            </h2>
            <p className="mt-5 max-w-prose text-body text-fg-muted">
              Tell us where you are and what you need. An officer from your nearest branch will call
              you back within two working days.
            </p>

            <h3 className="mt-12 text-h3">Why bank with BMC</h3>
            <BulletList
              variant="orange"
              className="mt-7"
              items={whyBmc.map((item) => item.text)}
            />

            <figure className="mt-12 border-t border-line pt-9">
              <blockquote className="max-w-prose text-body-sm text-fg">
                <p>&ldquo;{leadershipQuote.quote}&rdquo;</p>
              </blockquote>
              <figcaption className="mt-5 text-fine text-fg-muted">
                <span className="font-medium text-fg">{leadershipQuote.name}</span>
                <span className="mt-1 block">{leadershipQuote.role}</span>
              </figcaption>
            </figure>
          </div>

          <div className="reveal">
            <EnquiryForm />
          </div>
        </div>
      </Container>
    </Section>
  );
}
