import { useRef, type CSSProperties } from "react";
import { ArrowRight, ChevronRight, ShieldCheck } from "../../assets/icons/lucide";
import { complaintsUrl, heritageFirsts, heritageStats, photoSources } from "../../data/home-sections";
import { progress, useScrub } from "../../hooks/useScrub";
import { CountUp } from "../ui/CountUp";
import { Accent, Button, GroundProvider, ParallaxImage } from "./primitives";

const firstsWords = heritageFirsts.map((first) => first.split(" "));
const wordCount = firstsWords.reduce((sum, words) => sum + words.length, 0);

/** The list brightens from when its top reaches 80% of the viewport until its
 *  bottom reaches 55%. */
const firstsOnScroll = (rect: DOMRect, viewport: number) => ({
  "--p": progress(rect.top, viewport * 0.8, viewport * 0.55 - rect.height).toFixed(4),
});

/** The bank's founding story, its figures and its five firsts, on a navy card. */
export function Heritage() {
  const firsts = useRef<HTMLOListElement>(null);
  useScrub(firsts, firstsOnScroll);

  let wordIndex = 0;

  return (
    <GroundProvider ground="dark">
      <section
        aria-labelledby="heritage-title"
        data-ground="dark"
        className="bg-bmc-card-dark relative isolate overflow-hidden rounded-bmc-2xl text-white"
      >
        <ParallaxImage
          {...photoSources("cst")}
          alt="Chhatrapati Shivaji Terminus in Mumbai, with black-and-yellow taxis in the foreground"
          sizes="(min-width: 1024px) 520px, 100vw"
          position="50% 70%"
          className="mx-4 mt-4 aspect-[16/10] rounded-bmc-xl md:mx-8 md:mt-8 lg:absolute lg:right-12 lg:top-14 lg:m-0 lg:aspect-auto lg:h-[340px] lg:w-[40%]"
        />

        <div className="relative px-4 py-10 md:px-8 lg:px-12 lg:py-14">
          <div className="reveal max-w-[40rem] lg:max-w-[52%]">
            <h2 id="heritage-title" className="text-bmc-display">
              <Accent>Bharosa</Accent>, since 1939
            </h2>
            <p className="mt-4 text-bmc-body text-bmc-on-brand-muted">
              Founded by Shaikh Mohammedally Allabaux with Padmashri Zain G. Rangoonwala to protect small borrowers from
              moneylenders, a bank that grew to become the largest co-operative bank in India and in Asia.
            </p>
            <div className="mt-8">
              <Button href="/profile/history" icon={ArrowRight}>
                Know more
              </Button>
            </div>
          </div>

          <ul className="reveal-stagger mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:mt-24 xl:grid-cols-6">
            {heritageStats.map((stat) => (
              <li key={stat.label}>
                <div className="h-full rounded-bmc-2xl border border-white/25 bg-white/10 p-6 text-center backdrop-blur-[2px] transition-colors duration-300 hover:border-white/60 hover:bg-white/15">
                  <p className="text-bmc-display font-bold tabular-nums text-white">
                    {stat.count ? <CountUp value={stat.value} /> : stat.value}
                  </p>
                  <p className="mt-2 text-bmc-body-sm text-bmc-on-brand-muted">{stat.label}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-14 grid gap-6 lg:grid-cols-12">
            <h3 className="text-bmc-h3 lg:col-span-3">Five firsts</h3>
            <ol
              ref={firsts}
              className="space-y-5 lg:col-span-9"
              style={{ "--n": wordCount } as CSSProperties}
            >
              {firstsWords.map((words, i) => (
                <li key={heritageFirsts[i]} className="flex gap-5 border-t border-white/15 pt-5 text-bmc-body">
                  <span aria-hidden="true" className="w-8 shrink-0 tabular-nums text-bmc-on-brand-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    {words.map((word) => {
                      const index = wordIndex++;
                      return (
                        <span key={index} className="bmc-word" style={{ "--i": index } as CSSProperties}>
                          {word}{" "}
                        </span>
                      );
                    })}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </GroundProvider>
  );
}

/** The fraud warning and the three places to take a problem. */
export function SafeBanking() {
  return (
    <section
      aria-labelledby="safe-title"
      className="reveal relative isolate overflow-hidden rounded-bmc-2xl bg-bmc-surface-alt px-6 py-10 md:px-16 md:py-12"
    >
      <ShieldCheck
        strokeWidth={1}
        className="pointer-events-none absolute -bottom-16 -right-10 -z-10 size-72 text-bmc-tint"
      />
      <h2 id="safe-title" className="text-bmc-h2 text-bmc-ink">
        Bank safely
      </h2>
      <p className="mt-4 max-w-[68ch] text-bmc-body text-bmc-ink">
        BMC Bank will <Accent>never</Accent> ask for your card number, expiry date, CVV, PIN or OTP. Do not click links
        in unexpected emails or SMS.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/resources/cyber-awareness" icon={ChevronRight}>
          Cyber awareness
        </Button>
        <Button variant="secondary" href="/resources/ombudsman">
          RBI Ombudsman Scheme
        </Button>
        <Button variant="tertiary" href={complaintsUrl} external>
          Lodge a complaint
        </Button>
      </div>
    </section>
  );
}
