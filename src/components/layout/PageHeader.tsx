import type { ComponentType, CSSProperties, ReactNode, SVGProps } from "react";
import { Container } from "./Container";
import { CirclePhoto } from "../ui/CirclePhoto";
import type { Photo, PhotoField } from "../../types";

/**
 * A fact pinned beside the header photograph: the one or two things a visitor
 * to this page most wants at a glance (a rate, a count, a date). Every value
 * must be one the bank publishes; nothing here is computed into a new claim.
 */
export type HeaderFact = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  value: ReactNode;
  label: ReactNode;
};

export type Crumb = { label: string; href?: string };

type PageHeaderProps = {
  title: ReactNode;
  description?: ReactNode;
  /** Small print under the standfirst: an effective date, a source, an as-at. */
  meta?: ReactNode;
  id?: string;
  /**
   * The page's photograph, masked to a circle. It shows the page's subject, an
   * object or a place, never a stranger's portrait.
   */
  photo?: Photo;
  /** Unsplash id for the photo's 2x source set. */
  photoId?: string;
  /** Colour of the ring behind the photo. */
  photoField?: PhotoField;
  /**
   * Up to two facts. The first sits on a sky-blue chip, the second on mint, so
   * every page header carries the brand's blue and green together.
   */
  facts?: [HeaderFact] | [HeaderFact, HeaderFact];
  /** Where this page sits. The last crumb is the current page. */
  crumbs?: Crumb[];
};

const chipTones = ["bg-purple", "bg-mint"];

/**
 * Inner-page header.
 *
 * Text on the left; on the right, the page's photograph inside a thin sky-blue
 * ring that turns slowly, with a single dot riding on it, over a pale blue disc.
 * The facts float beside it from `md`: each pops in after the photograph, then
 * drifts on a slow float. Below `md` there is no room to overlap the photo, so
 * the same two chips sit in a row under it instead; one render, two layouts.
 *
 * The header stays on the page background. Colour arrives in the chips and the
 * ring, not as a full panel above every rate table.
 */
export function PageHeader({
  title,
  description,
  meta,
  id = "page-heading",
  photo,
  photoId,
  photoField = "lavender",
  facts,
  crumbs,
}: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden bg-page pb-12 pt-6 md:pb-16 md:pt-10">
      <Container>
        {crumbs?.length ? (
          <nav aria-label="Breadcrumb" className="animate-rise-in">
            <ol className="flex flex-wrap items-center gap-x-2 text-meta text-fg-muted">
              <li className="flex items-center gap-2">
                <a
                  href="/"
                  className="-mx-1 inline-flex min-h-11 items-center rounded-lg px-1 underline decoration-transparent underline-offset-4 transition-colors duration-200 hover:text-fg hover:decoration-current"
                >
                  Home
                </a>
              </li>
              {crumbs.map((crumb, index) => {
                const current = index === crumbs.length - 1;
                return (
                  <li key={crumb.label} className="flex items-center gap-2">
                    <span aria-hidden="true" className="h-1 w-1 rounded-pill bg-fg-muted/60" />
                    {crumb.href && !current ? (
                      <a
                        href={crumb.href}
                        className="-mx-1 inline-flex min-h-11 items-center rounded-lg px-1 underline decoration-transparent underline-offset-4 transition-colors duration-200 hover:text-fg hover:decoration-current"
                      >
                        {crumb.label}
                      </a>
                    ) : (
                      <span
                        aria-current={current ? "page" : undefined}
                        className={`inline-flex min-h-11 items-center ${current ? "font-medium text-fg" : ""}`}
                      >
                        {crumb.label}
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        ) : null}

        <div
          className={
            photo
              ? "mt-4 grid items-center gap-10 md:mt-6 md:grid-cols-[minmax(0,1fr)_auto] md:gap-16 lg:gap-24"
              : "mt-4 md:mt-6"
          }
        >
          <div>
            <h1 id={id} className="max-w-[22ch] text-display animate-rise-in">
              {title}
            </h1>

            {description ? (
              <p
                className="mt-6 max-w-prose text-body text-fg-muted animate-rise-in"
                style={{ animationDelay: "90ms" }}
              >
                {description}
              </p>
            ) : null}

            {meta ? (
              <p
                className="mt-6 inline-flex items-center gap-2.5 rounded-xl bg-fg/[0.05] px-4 py-2 text-fine text-fg-muted animate-rise-in"
                style={{ animationDelay: "160ms" }}
              >
                <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-pill bg-mint-deep" />
                {meta}
              </p>
            ) : null}
          </div>

          {photo ? (
            <div className="relative w-full md:w-[300px] lg:w-[340px]" data-parallax="0.05">
              <div className="relative mx-auto w-[220px] sm:w-[260px] md:w-full">
                {/* A pale disc offset behind the photograph, and the ring that
                    turns round it. Both decorative, both clear of the photo. */}
                <span
                  aria-hidden="true"
                  className="absolute -right-6 -top-6 h-[70%] w-[70%] rounded-pill bg-purple/15 animate-pop-in"
                />
                <span
                  aria-hidden="true"
                  className="orbit absolute -inset-4 rounded-pill border border-purple/45"
                >
                  <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-pill bg-purple" />
                </span>

                <div className="group relative">
                  <CirclePhoto
                    photo={photo}
                    id={photoId}
                    field={photoField}
                    priority
                    className="animate-pop-spin [animation-delay:120ms]"
                  />
                </div>
              </div>

              {facts?.length ? (
                <ul className="mt-10 grid gap-3 sm:grid-cols-2 md:mt-0 md:block">
                  {facts.map((fact, index) => {
                    const Icon = fact.icon;
                    return (
                      <li
                        key={index}
                        className={
                          index === 0
                            ? "md:absolute md:-left-16 md:top-2 lg:-left-20"
                            : "md:absolute md:-right-2 md:bottom-0 lg:-right-4"
                        }
                      >
                        <div
                          className={`chip-float flex items-center gap-3 rounded-xl py-2.5 pl-2.5 pr-5 text-ink shadow-inset md:shadow-pill-hover ${chipTones[index]}`}
                          style={{ "--chip-delay": `${520 + index * 180}ms` } as CSSProperties}
                        >
                          <span
                            aria-hidden="true"
                            className="grid h-10 w-10 shrink-0 place-items-center rounded-pill bg-white text-ink [&_svg]:h-5 [&_svg]:w-5"
                          >
                            <Icon />
                          </span>
                          <span className="flex flex-col">
                            <span className="whitespace-nowrap text-label font-bold leading-tight tabular-nums">
                              {fact.value}
                            </span>
                            <span className="whitespace-nowrap text-fine leading-tight text-ink/80">
                              {fact.label}
                            </span>
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </div>
          ) : null}
        </div>
      </Container>
    </header>
  );
}
