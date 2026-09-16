import { useEffect, useRef } from "react";
import { Logo } from "../../assets/logo";
import { fluidSrcSet, photoId, photos, srcSet, unsplash } from "../../data/photos";
import { utilityLinks } from "../../data/nav";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { MenuTrigger } from "../nav/SiteMenu";
import { CircleArrow } from "../ui/CircleArrow";
import { PillButton } from "../ui/PillButton";

/**
 * Full-bleed photographic hero, composed on the client's reference: the brand
 * block cut into the top-left corner, the utility actions and the menu trigger
 * top-right, the brand line set large and right-aligned over the photograph,
 * and a pale-blue panel with an angled corner carrying the standfirst and the
 * two actions for new customers. A small framed card bottom-right leads to the
 * bank's story.
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
 *     drifts down, slower than the page; the headline lifts faster and fades;
 *     the story card lifts at its own rate. The panel stays anchored so the
 *     hero's bottom edge never opens a gap.
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
  const city = photos.heroCity;

  return (
    <section
      ref={ref}
      aria-labelledby="hero-heading"
      className="on-dark relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#2b2d31] text-white lg:min-h-[max(100svh,760px)]"
    >
      {/* Photograph. Taller than the hero so the parallax drift never exposes an
          edge; see the arithmetic in DESIGN.md. */}
      <div className="hero-photo pointer-events-none absolute inset-x-0 -top-[3%] -z-10 h-[116%]">
        {/* On a phone the panel covers the lower half of the hero, so the phone
            crop is cut from the bottom of the photograph: less sky, and the
            building rises into the half that stays visible. */}
        <picture>
          <source
            media="(max-width: 767px)"
            srcSet={fluidSrcSet(photoId.heroCity, 1.1, [900, 1400, 2000], "bottom")}
            sizes="100vw"
          />
          <img
            src={unsplash(photoId.heroCity, 1920, 1280)}
            srcSet={fluidSrcSet(photoId.heroCity, 1.5)}
            sizes="100vw"
            alt={city.alt}
            width={city.width}
            height={city.height}
            {...{ fetchpriority: "high" }}
            decoding="async"
            className="h-full w-full object-cover object-[40%_50%] md:object-[50%_58%]"
          />
        </picture>
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
      <div aria-hidden="true" className="hero-dim pointer-events-none absolute inset-0 -z-10 bg-[#0e0e12]" />

      {/* Top row */}
      <div className="relative flex items-start justify-between gap-4">
        <div className="hero-brand on-light relative">
          {/* The angled cut lives on this layer, not on the link, so it never
              clips the link's focus outline. Brand blue, so the text is ink:
              white does not clear 4.5:1 on #3FA9F6. */}
          <span aria-hidden="true" className="hero-brand-cut absolute inset-0 bg-purple" />
          <a
            href="/"
            aria-label="Bombay Mercantile Co-operative Bank, home"
            className="group relative flex items-center gap-4 focus-visible:outline-offset-[-8px] py-4 pl-5 pr-14 sm:gap-5 sm:py-6 sm:pl-10 sm:pr-20 lg:py-8 lg:pl-12 lg:pr-24"
          >
            <Logo
              height={64}
              className="transition-transform duration-500 ease-out-expo group-hover:-rotate-2 group-hover:scale-[1.04] lg:hidden"
            />
            <Logo
              height={76}
              className="hidden transition-transform duration-500 ease-out-expo group-hover:-rotate-2 group-hover:scale-[1.04] lg:inline-flex"
            />
            <span
              aria-hidden="true"
              className="hidden border-l border-ink/25 pl-5 text-fine font-bold uppercase leading-snug tracking-[0.18em] text-ink sm:block"
            >
              Bombay Mercantile
              <span className="block font-medium text-ink/80">Co-operative Bank</span>
            </span>
          </a>
        </div>

        <div
          className="hero-fade flex items-center gap-3 pr-5 pt-7 sm:pr-10 sm:pt-8 lg:pr-12 lg:pt-10"
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
      <div className="relative flex flex-1 items-end px-5 pb-9 pt-16 sm:px-10 lg:justify-end lg:px-12 lg:pb-12">
        <div className="hero-copy relative lg:text-right">
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
      <div className="relative grid items-end lg:grid-cols-[minmax(0,37rem)_1fr] xl:grid-cols-[minmax(0,38rem)_1fr_auto]">
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

        <div className="hero-story-wrap on-light hidden justify-self-end p-12 xl:block">
          <a
            href="#our-story"
            className="hero-fade group block w-80 bg-purple p-2 shadow-card-hover transition-transform duration-500 ease-out-expo hover:-translate-y-1.5"
            style={delay(1150)}
          >
            <span className="block overflow-hidden">
              <img
                src={photos.story.src}
                srcSet={srcSet(photoId.story, photos.story.width, photos.story.height)}
                alt=""
                width={photos.story.width}
                height={photos.story.height}
                decoding="async"
                className="aspect-[16/10] h-auto w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.08]"
              />
            </span>
            <span className="flex items-center justify-between gap-4 px-2 pb-1.5 pt-3 text-fine font-bold uppercase tracking-[0.18em] text-ink">
              Our story since 1939
              <CircleArrow tone="ink" size="sm" direction="down" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
