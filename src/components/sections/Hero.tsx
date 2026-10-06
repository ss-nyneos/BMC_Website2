import { Container } from "../layout/Container";
import { PhotoCluster } from "../ui/PhotoCluster";
import { PillButton } from "../ui/PillButton";
import { LinkArrow } from "../ui/LinkArrow";

/**
 * Reference image 1, in BMC's colours.
 *
 * The brand line is the headline. It runs to two lines at every width, which is
 * what the display size and the panel width are tuned around.
 *
 * One orchestrated entrance plays here and nowhere else above the fold: each
 * word of the brand line rises out of its own clipped line box, then the
 * standfirst and buttons follow while the photo cluster settles. The stagger is
 * carried by animation-delay, so the reduced-motion rule in globals.css
 * collapses all of it to an instant, fully-visible state.
 *
 * The words are separate spans, but they sit inside one h1 with real spaces
 * between them, so the heading is still announced as one phrase.
 */
const HEADLINE = ["Zamana", "Naya.", "Bharosa", "Wohi."];
const WORD_STAGGER = 70;

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="bg-page pt-4 lg:pt-6">
      <Container>
        <div className="relative overflow-hidden rounded-2xl bg-purple px-6 py-14 text-ink sm:px-10 sm:py-16 lg:px-16 lg:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
            <div>
              <h1 id="hero-heading" className="max-w-[15ch] text-display" lang="hi-Latn">
                {HEADLINE.map((word, index) => (
                  <span key={word}>
                    {/* The padding and matching negative margin give descenders
                        room inside the clip without changing the line height. */}
                    <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
                      <span
                        className="inline-block animate-word-rise"
                        style={{ animationDelay: `${index * WORD_STAGGER}ms` }}
                      >
                        {word}
                      </span>
                    </span>
                    {index < HEADLINE.length - 1 ? " " : null}
                  </span>
                ))}
              </h1>

              <p
                className="mt-7 max-w-[46ch] text-body text-ink/80 animate-rise-in"
                style={{ animationDelay: "320ms" }}
              >
                India&rsquo;s first scheduled urban co-operative bank, serving families and
                businesses since 1939.
              </p>

              <div
                className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5 animate-rise-in"
                style={{ animationDelay: "420ms" }}
              >
                <PillButton href="#open-an-account" variant="light" size="lg">
                  Open an account
                </PillButton>
                <LinkArrow href="/loans/interest-rates" tone="ink">
                  Explore loans
                </LinkArrow>
              </div>
            </div>

            <div className="animate-pop-in" style={{ animationDelay: "120ms" }}>
              <PhotoCluster />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
