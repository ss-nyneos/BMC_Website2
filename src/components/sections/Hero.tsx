import { useEffect, useRef } from "react";
import { Logo } from "../../assets/logo";
import { heroPhoto } from "../../data/photos";
import { utilityLinks } from "../../data/nav";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { MenuTrigger } from "../nav/SiteMenu";
import { CircleArrow } from "../ui/CircleArrow";
import { PillButton } from "../ui/PillButton";

/**
 * Full-bleed photographic hero, composed on the client's reference: the brand
 * block cut into the top-left corner, the utility actions and the menu trigger
 * top-right, the brand line set large and ranged left over the photograph,
 * and a pale-blue panel with an angled corner carrying the standfirst and the
 * two actions for new customers.
 *
 * On the homepage this replaces the shell's logo bar, so the logo link lives
 * here with the same accessible name.
 *
 * Motion, in two parts, both defined in globals.css:
 *
 *  1. Entrance. The photograph settles from a slow zoom, the brand block slides
 *     in, each headline line rises out of its own mask, and the panel wipes up
 *     from the bottom edge before its contents follow. Every step is a
 *     `backwards`-fill keyframe, so reduced motion collapses it to the finished
 *     state and nothing is ever gated on a class being added.
 *  2. Parallax. `--hero-p` runs 0 -> 1 as the hero scrolls away. The photograph
 *     drifts down, slower than the page; the headline lifts faster and fades.
 *     The panel stays anchored so the hero's bottom edge never opens a gap.
 */
function useHeroProgress() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (reduced) {
      node.style.removeProperty("--hero-p");
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height)));
      node.style.setProperty("--hero-p", progress.toFixed(4));
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [reduced]);

  return ref;
}

const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

export function Hero() {
  const ref = useHeroProgress();
  return (
    <section
      ref={ref}
      aria-labelledby="hero-heading"
      className="on-dark relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#2b2d31] text-white lg:min-h-[max(100svh,760px)]"
    >
      {/* Photograph. Taller than the hero so the parallax drift never exposes an
          edge; see the arithmetic in DESIGN.md. On a portrait screen the cover
          crop keeps a slice about a third of the frame wide, so `sizes` asks
          for more than the viewport width there. */}
      <div className="hero-photo pointer-events-none absolute -top-[3%] left-0 -z-10 h-[116%] w-full lg:w-[116%] min-[1440px]:w-full">
        <img
          src={heroPhoto.src}
          srcSet={heroPhoto.srcSet}
          sizes="(orientation: portrait) 250vw, 100vw"
          alt={heroPhoto.alt}
          width={heroPhoto.width}
          height={heroPhoto.height}
          {...{ fetchpriority: "high" }}
          decoding="async"
          className="h-full w-full object-cover object-[62%_30%] md:object-[50%_30%] lg:object-[20%_30%] min-[1440px]:object-[50%_30%]"
        />
      </div>

      {/* Scrims, kept light so the photograph stays sunny: a neutral shade at the
          top edge for the actions and at the bottom for the scroll cue, and
          almost nothing through the middle. Neutral rather than navy, so the
          sky keeps its own colour. The last layer deepens as the hero scrolls
          away. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(14_14_18/0.42)_0%,rgb(14_14_18/0.06)_24%,rgb(14_14_18/0.06)_58%,rgb(14_14_18/0.66)_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(14_14_18/0.5)_0%,rgb(14_14_18/0.32)_32%,transparent_58%)]"
      />
      <div aria-hidden="true" className="hero-dim pointer-events-none absolute inset-0 -z-10 bg-[#0e0e12]" />

      {/* Top row */}
      <div className="relative flex items-center justify-between gap-4">
        <div className="hero-brand relative">
          {/* The angled cut lives on this layer, not on the link, so it never
              clips the link's focus outline. The same deep blue as the sections
              further down the page, so the text is white and the focus ring
              stays the hero's white one. */}
          <span aria-hidden="true" className="hero-brand-cut absolute inset-0 bg-navy" />
          <a
            href="/"
            aria-label="Bombay Mercantile Co-operative Bank, home"
            className="group relative flex items-center gap-3 py-3 pl-4 pr-9 focus-visible:outline-offset-[-6px] sm:gap-4 sm:pl-6 sm:pr-11 lg:py-4 lg:pl-8 lg:pr-12"
          >
            <Logo
              height={56}
              className="transition-transform duration-500 ease-out-expo group-hover:-rotate-2 group-hover:scale-[1.04] lg:hidden"
            />
            <Logo
              height={64}
              className="hidden transition-transform duration-500 ease-out-expo group-hover:-rotate-2 group-hover:scale-[1.04] lg:inline-flex"
            />
            <span
              aria-hidden="true"
              className="hidden border-l border-white/30 pl-4 text-fine font-bold uppercase leading-snug tracking-[0.18em] text-white sm:block"
            >
              Bombay Mercantile
              <span className="block font-medium text-white/80">Co-operative Bank</span>
            </span>
          </a>
        </div>

        <div
          className="hero-fade flex items-center gap-3 pr-5 sm:pr-10 lg:pr-12"
          style={delay(650)}
        >
          <PillButton
            href={utilityLinks.netBanking.href}
            external
            variant="light"
            size="sm"
            showArrow={false}
            className="hidden sm:inline-flex"
          >
            Net Banking<span className="sr-only"> (opens in a new tab)</span>
          </PillButton>
          <PillButton
            href="/contact"
            variant="ghost-light"
            size="sm"
            showArrow={false}
            className="hidden lg:inline-flex"
          >
            Contact us
          </PillButton>
          <MenuTrigger onPhoto />
        </div>
      </div>

      {/* Headline */}
      <div className="relative flex flex-1 items-end px-5 pb-9 pt-16 sm:px-10 lg:px-12 lg:pb-12">
        <div className="hero-copy relative">
          {/* A pool of shade that travels with the headline, so the type holds
              its contrast over bright sky at every breakpoint without darkening
              the whole photograph. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-[28%] -inset-y-[75%] -z-10 bg-[radial-gradient(closest-side,rgb(14_14_18/0.48),rgb(14_14_18/0.36)_50%,rgb(14_14_18/0.14)_78%,transparent)]"
          />
          <h1 id="hero-heading" lang="hi-Latn" className="hero-halo text-hero uppercase text-white">
            <span className="hero-line">
              <span style={delay(160)}>Zamana Naya.</span>
            </span>{" "}
            <span className="hero-line">
              <span style={delay(290)}>Bharosa Wohi.</span>
            </span>
          </h1>
        </div>
      </div>

      {/* Bottom row */}
      <div className="relative grid items-end lg:grid-cols-[minmax(0,37rem)_1fr] xl:grid-cols-[minmax(0,38rem)_1fr]">
        <div className="hero-panel on-light bg-lavender px-5 pb-10 pt-14 text-ink sm:px-10 sm:pb-12 lg:px-12 lg:pb-14 lg:pt-16">
          <p className="hero-fade max-w-[24ch] text-h2" style={delay(820)}>
            Savings, deposits and loans from India&rsquo;s first scheduled urban{" "}
            <span className="whitespace-nowrap">co-operative bank.</span>
          </p>

          <p
            className="hero-fade mt-5 text-fine font-medium uppercase tracking-[0.16em] text-ink/80"
            style={delay(900)}
          >
            Deposits insured by DICGC up to ₹5 lakh
          </p>

          <div className="hero-fade mt-8 flex flex-wrap items-center gap-3 sm:gap-4" style={delay(980)}>
            <PillButton href="#open-an-account" variant="ink">
              Open an account
            </PillButton>
            <PillButton href="/loans/interest-rates" variant="ghost-ink">
              Explore loans
            </PillButton>
          </div>
        </div>

        <a
          href="#rates"
          className="hero-fade hero-halo group mb-12 hidden flex-col items-center gap-3 justify-self-center text-fine font-bold uppercase tracking-[0.24em] text-white transition-colors duration-300 xl:flex"
          style={delay(1400)}
        >
          <span data-audit="scroll-label">Scroll</span>
          <span className="sr-only"> to today&rsquo;s lending rates</span>
          <span className="animate-bob">
            <CircleArrow tone="white" size="sm" direction="down" />
          </span>
        </a>
      </div>
    </section>
  );
}
