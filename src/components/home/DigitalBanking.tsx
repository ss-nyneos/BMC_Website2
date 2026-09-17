import { useRef, useState, type CSSProperties } from "react";
import {
  CreditCard,
  FileText,
  PhoneMissed,
  ScrollText,
  Send,
  Store,
  type LucideIcon,
} from "../../assets/icons/lucide";
import { appStores, contactNumbers } from "../../data/home-sections";
import { progress, useScrub } from "../../hooks/useScrub";
import { Accent, SmartLink, cx } from "./primitives";

type Feature = {
  icon: LucideIcon;
  label: string;
  screen: { title: string; body: string; number?: string };
};

const features: Feature[] = [
  {
    icon: Send,
    label: "IMPS and UPI transfers",
    screen: { title: "Send money", body: "Transfer instantly with IMPS and UPI from the BMC Bank app." },
  },
  {
    icon: CreditCard,
    label: "Block your debit card by IVR",
    screen: {
      title: "Block your card",
      body: "Lost your debit card? Call the IVR line and block it straight away.",
      number: contactNumbers.ivrServices,
    },
  },
  {
    icon: ScrollText,
    label: "Mini statement on call",
    screen: { title: "Mini statement", body: "Hear your latest transactions on the IVR line.", number: contactNumbers.ivrServices },
  },
  {
    icon: PhoneMissed,
    label: "Balance by missed call",
    screen: {
      title: "Check your balance",
      body: "Give a missed call from your registered mobile number.",
      number: contactNumbers.missedCallBalance,
    },
  },
  {
    icon: FileText,
    label: "Request a cheque book",
    screen: {
      title: "Cheque book",
      body: "Request a new cheque book or stop payment of a cheque by IVR.",
      number: contactNumbers.ivrServices,
    },
  },
  {
    icon: Store,
    label: "Self-service kiosks",
    screen: {
      title: "Self-service kiosks",
      body: "Self-service kiosks and ATMs are part of the bank’s move towards full automation.",
    },
  },
];

/**
 * As the section passes, the phone drifts up and turns a few degrees, and the
 * pale halo behind it swells until the section is centred.
 */
const phoneOnScroll = (rect: DOMRect, viewport: number) => {
  const pass = progress(rect.top, viewport, -rect.height);
  const arrive = progress(rect.top, viewport, viewport / 2 - rect.height / 2);
  return {
    "--phone-y": `${(90 - 140 * pass).toFixed(1)}px`,
    "--phone-r": `${(-3 + 5 * pass).toFixed(2)}deg`,
    "--halo-s": (0.7 + 0.45 * arrive).toFixed(3),
    "--halo-o": (0.4 + 0.6 * arrive).toFixed(3),
  };
};

function PhoneScreen({ feature, active }: { feature: Feature; active: boolean }) {
  const Icon = feature.icon;
  return (
    <div
      aria-hidden="true"
      className={cx(
        "absolute inset-0 flex flex-col px-5 pb-6 pt-10 transition-opacity duration-1000 ease-standard",
        active ? "opacity-100" : "opacity-0",
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-bmc-body-sm font-bold text-bmc-brand">BMC Bank</span>
        <span className="size-8 rounded-full bg-bmc-tint" />
      </div>
      <div className="bg-bmc-card-dark mt-6 rounded-bmc-2xl p-5 text-white">
        <span className="inline-flex size-12 items-center justify-center rounded-full bg-white/15">
          <Icon className="size-6" strokeWidth={1.5} />
        </span>
        <p className="mt-4 text-bmc-body font-bold">{feature.screen.title}</p>
      </div>
      <p className="mt-5 text-bmc-body-sm text-bmc-ink-muted">{feature.screen.body}</p>
      {feature.screen.number ? (
        <p className="mt-auto rounded-bmc-xl bg-bmc-tint px-4 py-3 text-center text-bmc-body font-bold tabular-nums text-bmc-brand">
          {feature.screen.number}
        </p>
      ) : (
        <div className="mt-auto space-y-2">
          <div className="h-3 w-3/4 rounded-full bg-bmc-surface" />
          <div className="h-3 w-1/2 rounded-full bg-bmc-surface" />
        </div>
      )}
    </div>
  );
}

function StoreBadges() {
  const badge =
    "inline-flex h-14 items-center gap-3 rounded-bmc-lg bg-bmc-ink px-4 text-white transition-colors duration-300 hover:bg-bmc-brand-deep dark:bg-black";
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <SmartLink href={appStores.play} className={badge}>
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-7" fill="currentColor">
          <path d="M3.6 1.8c-.3.3-.5.8-.5 1.4v17.6c0 .6.2 1.1.5 1.4l.1.1 9.9-9.9v-.2L3.7 1.7l-.1.1Zm13.3 13.4-3.3-3.3v-.2l3.3-3.3.1.1 3.9 2.2c1.1.6 1.1 1.7 0 2.3l-3.9 2.2h-.1Zm-.1 0L13.5 12l-9.9 9.9c.4.4 1 .4 1.7.1l11.5-6.8Zm0-6.4L5.3 2c-.7-.4-1.3-.3-1.7.1l9.9 9.9 3.3-3.2Z" />
        </svg>
        <span className="flex flex-col leading-none">
          <span className="text-bmc-caption">Get it on</span>
          <span className="text-bmc-body-sm font-medium">Google Play</span>
        </span>
      </SmartLink>
      <SmartLink href={appStores.appStore} className={badge}>
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-7" fill="currentColor">
          <path d="M16.4 12.7c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2.1-.9-3.4-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8s2 .8 3.4.8 2.2-1.3 3.1-2.5c1-1.4 1.4-2.8 1.4-2.9-.1 0-2.7-1-2.7-4.1ZM13.9 5.1c.7-.9 1.2-2 1-3.2-1 0-2.3.7-3 1.6-.7.8-1.2 2-1.1 3.1 1.2.1 2.3-.6 3.1-1.5Z" />
        </svg>
        <span className="flex flex-col leading-none">
          <span className="text-bmc-caption">Download on the</span>
          <span className="text-bmc-body-sm font-medium">App Store</span>
        </span>
      </SmartLink>
    </div>
  );
}

/**
 * Six self-service channels around a phone that previews whichever one is
 * hovered, focused or tapped.
 */
export function DigitalBanking() {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLElement>(null);
  useScrub(root, phoneOnScroll);

  const chip = (feature: Feature, index: number, side: "left" | "right", order: number) => (
    <li
      key={feature.label}
      className="reveal-x"
      style={{ "--reveal-x": side === "left" ? "-40px" : "40px", "--reveal-delay": `${order * 100}ms` } as CSSProperties}
    >
      <button
        type="button"
        onMouseEnter={() => setActive(index)}
        onFocus={() => setActive(index)}
        onClick={() => setActive(index)}
        aria-pressed={active === index}
        aria-controls="phone-preview"
        className={cx(
          "group/fc flex w-full items-center gap-5 rounded-bmc-2xl p-3 text-left transition-colors duration-300 hover:bg-bmc-surface",
          side === "right" && "lg:flex-row-reverse lg:text-right",
          active === index && "bg-bmc-surface",
        )}
      >
        <span
          aria-hidden="true"
          className={cx(
            "inline-flex size-14 shrink-0 items-center justify-center rounded-full transition-colors duration-300",
            active === index
              ? "bg-bmc-brand text-white"
              : "bg-bmc-tint text-bmc-accent group-hover/fc:bg-bmc-brand group-hover/fc:text-white",
          )}
        >
          <feature.icon className="size-7" strokeWidth={1.5} />
        </span>
        <span
          className={cx(
            "text-bmc-body transition-colors duration-300",
            active === index ? "text-bmc-ink" : "text-bmc-ink-muted group-hover/fc:text-bmc-ink",
          )}
        >
          {feature.label}
        </span>
      </button>
    </li>
  );

  return (
    <section ref={root} id="digital" aria-labelledby="digital-title" className="scroll-mt-6">
      <div className="reveal mx-auto max-w-4xl text-center">
        <h2 id="digital-title" className="text-bmc-display text-bmc-ink">
          The best of BMC banking is now <Accent>mobile</Accent>
        </h2>
        <p className="mt-4 text-bmc-body text-bmc-ink-muted">
          Get the BMC Bank app for transfers and account services, or use the missed-call and IVR lines from any
          phone.{" "}
          <SmartLink
            href="/services/digital-limits"
            className="text-bmc-brand underline underline-offset-4 hover:text-bmc-accent"
          >
            Limits and charges
          </SmartLink>
        </p>
      </div>

      <div className="mt-14 grid items-center gap-10 lg:grid-cols-12">
        <ul className="order-2 grid gap-3 sm:grid-cols-2 lg:order-1 lg:col-span-4 lg:grid-cols-1">
          {features.slice(0, 3).map((feature, i) => chip(feature, i, "left", i))}
        </ul>

        <div className="relative order-1 flex justify-center py-6 lg:order-2 lg:col-span-4">
          <div
            aria-hidden="true"
            className="bmc-halo absolute left-1/2 top-1/2 -z-10 size-[420px] rounded-full bg-[radial-gradient(circle,rgb(var(--bmc-tint))_0%,transparent_68%)]"
          />
          <div
            id="phone-preview"
            aria-live="polite"
            className="bmc-phone relative aspect-[9/18.5] w-[272px] overflow-hidden rounded-[44px] border-[10px] border-bmc-ink bg-bmc-page dark:border-black"
          >
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-bmc-ink dark:bg-black"
            />
            {features.map((feature, i) => (
              <PhoneScreen key={feature.label} feature={feature} active={i === active} />
            ))}
            <span className="sr-only">
              {features[active].screen.title}: {features[active].screen.body}
            </span>
          </div>
        </div>

        <ul className="order-3 grid gap-3 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
          {features.slice(3).map((feature, i) => chip(feature, i + 3, "right", i))}
        </ul>
      </div>

      <div className="reveal mt-10">
        <StoreBadges />
      </div>
    </section>
  );
}
