import { useRef, type CSSProperties } from "react";
import { ArrowRight, ArrowUpRight, ChevronRight, type LucideIcon } from "../../assets/icons/lucide";
import { progress, useScrub } from "../../hooks/useScrub";
import { Button, EyebrowBadge, GroundProvider, ParallaxImage, SmartLink, cx, type ButtonVariant } from "./primitives";

export type Link = { label: string; href: string };

export type OptionCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
};

export type SectionCardProps = {
  id: string;
  title: string;
  variant: "light" | "dark";
  eyebrow: { accent: string; text: string };
  queries: Link[];
  queriesCta: Link;
  image: { src: string; srcSet: string; alt: string; position?: string };
  inset: {
    heading: string;
    actions: (Link & { variant?: ButtonVariant })[];
    options: OptionCardProps[];
  };
};

const delay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

/** The card opens as its top edge rises from 98% to 45% of the viewport. */
const openOnScroll = (rect: DOMRect, viewport: number) => ({
  "--open": progress(rect.top, viewport * 0.98, viewport * 0.45).toFixed(4),
});

/**
 * bmc_website2's signature pattern: a 16px card, light or navy, with oversized
 * question links and a photograph on top, and an opposite-tone panel of product
 * choices pinned to its bottom edge. No shadow.
 *
 * Motion: the card opens from a slightly inset frame as it enters, the photo
 * pans, and the questions and options rise in turn.
 */
export function SectionCard({ id, title, variant, eyebrow, queries, queriesCta, image, inset }: SectionCardProps) {
  const dark = variant === "dark";
  const imageOnRight = !dark;
  const card = useRef<HTMLElement>(null);
  useScrub(card, openOnScroll);

  return (
    <GroundProvider ground={dark ? "dark" : "light"}>
      <section
        ref={card}
        id={id}
        aria-labelledby={`${id}-title`}
        data-ground={dark ? "dark" : "light"}
        className={cx(
          "bmc-card-open group/card relative isolate flex min-h-[550px] scroll-mt-6 flex-col overflow-hidden rounded-bmc-2xl",
          dark ? "bg-bmc-card-dark text-white" : "bg-bmc-surface text-bmc-ink",
        )}
      >
        {/* Content and a full-colour photo side by side; the panel below overlaps
            only a thin strip of the photo. Below 1024px the photo stacks on top. */}
        <div
          className={cx(
            "relative flex-1 lg:grid lg:items-stretch lg:gap-8 lg:px-8 lg:pt-8",
            imageOnRight ? "lg:grid-cols-[minmax(0,1fr)_46%]" : "lg:grid-cols-[46%_minmax(0,1fr)]",
          )}
        >
          <ParallaxImage
            src={image.src}
            srcSet={image.srcSet}
            alt={image.alt}
            position={image.position}
            sizes="(min-width: 1024px) 580px, 100vw"
            className={cx(
              "mx-4 mt-4 aspect-[16/10] rounded-bmc-xl md:mx-6 md:mt-6 lg:m-0 lg:-mb-10 lg:aspect-auto lg:min-h-[420px]",
              imageOnRight ? "lg:order-2" : "lg:order-1",
            )}
            imgClassName="group-hover/card:scale-[1.04]"
          />

          <div
            className={cx(
              "flex flex-col px-4 pt-8 md:px-6 lg:pt-6",
              imageOnRight ? "lg:order-1 lg:pl-4 lg:pr-0" : "lg:order-2 lg:pl-0 lg:pr-4",
            )}
          >
            <div className="reveal">
              <EyebrowBadge accent={eyebrow.accent}>{eyebrow.text}</EyebrowBadge>
            </div>
            <h2 id={`${id}-title`} className="sr-only">
              {title}
            </h2>

            <ul className="mt-6">
              {queries.map((query, index) => (
                <li key={query.href + query.label} className="reveal" style={delay((index + 1) * 90)}>
                  {index > 0 ? <div aria-hidden="true" className={dark ? "bmc-rule-fade-on-brand" : "bmc-rule-fade"} /> : null}
                  <SmartLink
                    href={query.href}
                    className={cx(
                      "group/q flex items-start justify-between gap-6 py-6 text-bmc-h3 font-medium decoration-1 underline-offset-[6px] transition-colors duration-300 hover:underline",
                      dark ? "text-white hover:text-bmc-accent-soft" : "text-bmc-ink hover:text-bmc-accent",
                    )}
                  >
                    <span>{query.label}</span>
                    <ArrowUpRight
                      strokeWidth={1.5}
                      className="mt-1 size-8 shrink-0 -translate-x-2 translate-y-2 opacity-0 transition-all duration-500 ease-out-expo group-hover/q:translate-x-0 group-hover/q:translate-y-0 group-hover/q:opacity-100"
                    />
                  </SmartLink>
                </li>
              ))}
            </ul>

            <div className="reveal mb-10 mt-2 lg:mb-16" style={delay((queries.length + 1) * 90)}>
              <SmartLink
                href={queriesCta.href}
                className={cx(
                  "group/more inline-flex min-h-11 items-center gap-3 text-bmc-body font-medium tracking-[0.02em] underline-offset-4 transition-colors duration-300 hover:underline",
                  dark ? "text-white hover:text-bmc-accent-soft" : "text-bmc-brand hover:text-bmc-accent",
                )}
              >
                {queriesCta.label}
                <ArrowRight className="size-6 transition-transform duration-300 ease-out-expo group-hover/more:translate-x-1.5" />
              </SmartLink>
            </div>
          </div>
        </div>

        <InsetPanel {...inset} tone={dark ? "light" : "brand"} />
      </section>
    </GroundProvider>
  );
}

/** Pinned to the card's bottom edge, rounded on top only, in the opposite tone. */
function InsetPanel({ heading, actions, options, tone }: SectionCardProps["inset"] & { tone: "brand" | "light" }) {
  const onBrand = tone === "brand";

  return (
    <GroundProvider ground={onBrand ? "dark" : "light"}>
      <div
        data-ground={onBrand ? "dark" : "light"}
        className={cx(
          "relative z-10 mx-4 mt-auto rounded-t-bmc-xl px-4 py-8 md:mx-6 md:px-8 lg:mx-8",
          onBrand ? "bg-bmc-brand text-white dark:bg-bmc-brand-deep" : "bg-bmc-surface text-bmc-ink",
        )}
      >
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-6">
          <p className="text-bmc-h3 font-medium">{heading}</p>
          <div className="flex flex-wrap gap-3">
            {actions.map((action) => (
              <Button key={action.href + action.label} href={action.href} variant={action.variant ?? "primary"}>
                {action.label}
              </Button>
            ))}
          </div>
        </div>

        {/* 4 across, then 2, then a horizontal snap row on a phone. */}
        <ul className="reveal-stagger scrollbar-none -mr-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 pr-4 md:mr-0 md:grid md:grid-cols-2 md:overflow-visible md:pr-0 xl:grid-cols-4">
          {options.map((option) => (
            <li key={option.title} className="min-w-[280px] snap-start md:min-w-0">
              <OptionCard {...option} onBrand={onBrand} />
            </li>
          ))}
        </ul>
      </div>
    </GroundProvider>
  );
}

/**
 * Hover by inversion, not elevation: the whole card swaps scheme in one 300ms
 * move. On a brand panel it turns white, so the colours it takes on hover are
 * fixed rather than theme tokens, which would go dark on white in dark mode.
 */
function OptionCard({ icon: Icon, title, description, href, onBrand }: OptionCardProps & { onBrand: boolean }) {
  return (
    <SmartLink
      href={href}
      className={cx(
        "group/opt flex h-full min-h-[104px] flex-col gap-3 rounded-bmc-xl border p-5 transition-colors duration-300 ease-standard",
        onBrand
          ? "border-white/20 bg-white/10 hover:border-white hover:bg-white"
          : "border-bmc-line bg-bmc-card hover:border-bmc-brand hover:bg-bmc-brand",
      )}
    >
      <span className="flex items-center justify-between">
        <span
          aria-hidden="true"
          className={cx(
            "inline-flex size-10 shrink-0 items-center justify-center rounded-full transition-colors duration-300",
            onBrand
              ? "bg-white/15 text-white group-hover/opt:bg-[#dceafb] group-hover/opt:text-[#0b4da2]"
              : "bg-bmc-tint text-bmc-brand group-hover/opt:bg-white group-hover/opt:text-[#0b4da2]",
          )}
        >
          <Icon className="size-5" strokeWidth={1.5} />
        </span>
        <ChevronRight
          strokeWidth={2}
          className={cx(
            "size-6 shrink-0 transition-[color,transform] duration-300 ease-out-expo group-hover/opt:translate-x-1",
            onBrand ? "text-white/70 group-hover/opt:text-[#1e7af0]" : "text-bmc-ink-subtle group-hover/opt:text-white",
          )}
        />
      </span>
      <span className="min-w-0">
        <span
          className={cx(
            "block text-bmc-body font-bold transition-colors duration-300",
            onBrand ? "text-white group-hover/opt:text-[#062b5b]" : "text-bmc-ink group-hover/opt:text-white",
          )}
        >
          {title}
        </span>
        <span
          className={cx(
            "block text-bmc-body-sm transition-colors duration-300",
            onBrand ? "text-bmc-on-brand-muted group-hover/opt:text-[#5b6670]" : "text-bmc-ink-muted group-hover/opt:text-white",
          )}
        >
          {description}
        </span>
      </span>
    </SmartLink>
  );
}
