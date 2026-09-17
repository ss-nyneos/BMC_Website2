import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CreditCard,
  FileSignature,
  FileText,
  IdCard,
  Landmark,
  LayoutGrid,
  ReceiptText,
  Smartphone,
  type LucideIcon,
} from "../../assets/icons/lucide";
import {
  documents,
  forexCardUsd,
  formatFileSize,
  photoSources,
  primeLendingRate,
  seniorTopDepositRate,
} from "../../data/home-sections";
import { Button, GroundProvider, SmartLink, cx, inertWhen } from "./primitives";

type Tile = { icon: LucideIcon; label: string; href: string; bytes?: number };

const tiles: Tile[] = [
  { icon: FileSignature, label: "Account Opening Form", ...documents.accountOpening },
  { icon: IdCard, label: "Nomination Form DA1", ...documents.nomination },
  { icon: CreditCard, label: "ATM Dispute Form", ...documents.atmDispute },
  { icon: FileText, label: "Form No. 121", ...documents.form121 },
  { icon: Smartphone, label: "Mobile Banking Form", ...documents.mobileBanking },
  { icon: Landmark, label: "IFSC Codes", href: "/branches/find" },
  { icon: ReceiptText, label: "RuPay Declaration", ...documents.rupay },
  { icon: LayoutGrid, label: "All downloads", href: "/resources/forms" },
];

const slides = [
  {
    title: "Deposit Rates",
    value: `Up to ${seniorTopDepositRate} p.a.`,
    body: "For senior citizens on 2 to 3 year term deposits.",
    link: { label: "View rates", href: "/accounts/deposit-rates" },
    photo: "sunset",
  },
  {
    title: "Prime Lending Rate",
    value: primeLendingRate.rate,
    body: `Effective ${primeLendingRate.effectiveFrom}.`,
    link: { label: "Lending rates", href: "/loans/interest-rates" },
    photo: "cst",
  },
  {
    title: "Forex Card Rate",
    value: `USD ₹${forexCardUsd.rate}`,
    body: `Telegraphic transfer, selling. Card rate as on ${forexCardUsd.date}.`,
    link: { label: "Card rates", href: "/services/forex-card-rate" },
    photo: "wing",
  },
];

/**
 * A download inverts to brand on hover. Colour only: the label never changes
 * weight, so nothing reflows.
 */
function QuickActionTile({ icon: Icon, label, href, bytes }: Tile) {
  const isFile = bytes !== undefined;
  const className =
    "group/tile flex h-full min-h-[160px] flex-col items-center justify-center gap-4 p-6 text-center transition-colors duration-300 hover:bg-bmc-brand focus-visible:bg-bmc-brand";
  const inner = (
    <>
      <span
        aria-hidden="true"
        className="inline-flex size-11 items-center justify-center rounded-bmc-lg bg-bmc-surface text-bmc-accent transition-colors duration-300 group-hover/tile:bg-white group-hover/tile:text-[#0b4da2]"
      >
        <Icon className="size-6" strokeWidth={1.5} />
      </span>
      <span className="text-bmc-body-sm text-bmc-ink-muted transition-colors duration-300 group-hover/tile:text-white">
        {label}
        {bytes !== undefined ? (
          <span className="block text-bmc-caption text-bmc-ink-muted transition-colors duration-300 group-hover/tile:text-bmc-on-brand-muted">
            PDF, {formatFileSize(bytes)}
          </span>
        ) : null}
      </span>
    </>
  );

  return isFile ? (
    <SmartLink href={href} external className={className}>
      {inner}
    </SmartLink>
  ) : (
    <SmartLink href={href} className={className}>
      {inner}
    </SmartLink>
  );
}

/** Three rate highlights over photographs, crossfading, driven by dots and arrows. */
function RateSlider() {
  const [index, setIndex] = useState(0);
  const go = (next: number) => setIndex((next + slides.length) % slides.length);

  return (
    <GroundProvider ground="dark">
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Rate highlights"
        data-ground="dark"
        className="relative isolate flex h-full min-h-[440px] flex-col overflow-hidden rounded-bmc-3xl bg-bmc-brand-deep text-white"
      >
        {slides.map((slide, i) => {
          const photo = photoSources(slide.photo);
          return (
            <div
              key={slide.title}
              aria-hidden="true"
              className={cx(
                "absolute inset-0 -z-10 transition-opacity duration-1000 ease-standard",
                i === index ? "opacity-100" : "opacity-0",
              )}
            >
              <img
                src={photo.src}
                srcSet={photo.srcSet}
                sizes="(min-width: 1024px) 420px, 100vw"
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
              {/* Neutral scrim, darkest behind the copy, so white text holds over any photo. */}
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(10_14_20/0.78)_0%,rgb(10_14_20/0.45)_48%,rgb(10_14_20/0.7)_100%)]" />
            </div>
          );
        })}

        <div className="grid flex-1 p-8">
          {slides.map((slide, i) => (
            <div
              key={slide.title}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
              aria-hidden={i !== index}
              {...inertWhen(i !== index)}
              className={cx(
                "col-start-1 row-start-1 flex max-w-full flex-col items-start gap-3 transition-[opacity,transform] duration-700 ease-out-expo",
                i === index ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
              )}
            >
              <h3 className="text-bmc-h3 font-medium">{slide.title}</h3>
              <p className="text-bmc-display font-bold tabular-nums">{slide.value}</p>
              <p className="text-bmc-body-sm text-bmc-on-brand-muted">{slide.body}</p>
              <SmartLink
                href={slide.link.href}
                className="group/sl mt-2 inline-flex min-h-11 items-center gap-2 text-bmc-body-sm font-medium uppercase tracking-[0.06em] text-white underline-offset-4 hover:underline"
              >
                {slide.link.label}
                <ArrowRight className="size-5 transition-transform duration-300 group-hover/sl:translate-x-1" />
              </SmartLink>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between gap-4 px-8 pb-8">
          <div className="flex items-center gap-2">
            {slides.map((slide, i) => (
              <button
                key={slide.title}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show ${slide.title}`}
                aria-current={i === index}
                className="group/dot inline-flex h-11 items-center"
              >
                <span
                  className={cx(
                    "block h-1.5 rounded-full transition-all duration-300",
                    i === index ? "w-4 bg-bmc-accent-soft" : "w-1.5 bg-white/40 group-hover/dot:bg-white/70",
                  )}
                />
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            {[
              { label: "Previous rate", icon: ArrowLeft, step: -1 },
              { label: "Next rate", icon: ArrowRight, step: 1 },
            ].map(({ label, icon: Icon, step }) => (
              <button
                key={label}
                type="button"
                onClick={() => go(index + step)}
                aria-label={label}
                className="inline-flex size-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-300 hover:bg-white hover:text-bmc-brand-deep"
              >
                <Icon className="size-5" strokeWidth={2} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </GroundProvider>
  );
}

export function FormsAndRates() {
  return (
    <section id="forms" aria-labelledby="forms-title" className="scroll-mt-6">
      <div className="reveal mb-8 flex flex-wrap items-end justify-between gap-4">
        <h2 id="forms-title" className="text-bmc-display text-bmc-ink">
          Forms and rates, in one place
        </h2>
        <Button variant="tertiary" href="/resources/forms" icon={ArrowRight}>
          Every form
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="overflow-hidden rounded-bmc-3xl border border-bmc-line bg-bmc-line lg:col-span-8">
          <ul className="reveal-stagger grid h-full auto-rows-fr grid-cols-2 gap-px sm:grid-cols-4">
            {tiles.map((tile) => (
              <li key={tile.label} className="h-full bg-bmc-card">
                <QuickActionTile {...tile} />
              </li>
            ))}
          </ul>
        </div>
        <div className="reveal lg:col-span-4">
          <RateSlider />
        </div>
      </div>
    </section>
  );
}
