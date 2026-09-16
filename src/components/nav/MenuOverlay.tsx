import { useEffect, useLayoutEffect, useRef, type CSSProperties, type MouseEvent } from "react";
import { ArrowRightIcon, CloseIcon, MoonIcon, SunIcon } from "../../assets/icons";
import { Logo } from "../../assets/logo";
import { useDarkMode } from "../../hooks/useDarkMode";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import { useLockBody } from "../../hooks/useLockBody";
import { utilityLinks } from "../../data/nav";
import { latestNotice, railPrimary, railSecondary, railStandingNote } from "../../data/rail";
import { useRoute } from "../../router";
import { PillButton } from "../ui/PillButton";

type MenuOverlayProps = {
  /** Matches the rail toggle's `aria-controls`. */
  id: string;
  open: boolean;
  onClose: () => void;
};

/** Stagger index for the entrance, read by `.menu-rise` and `.menu-fade`. */
const step = (index: number) => ({ "--i": index }) as CSSProperties;

/** Outline chip for the settings row, sized to the 48px target. */
const chip =
  "inline-flex h-12 items-center gap-3 rounded-pill border border-ink/30 px-5 text-label font-normal text-ink transition-[background-color,border-color,transform] duration-300 ease-out-expo hover:border-ink/60 hover:bg-white/50 active:scale-[0.98]";

/**
 * Theme switch. The label stays "Dark theme" and the switch carries the state,
 * so what is announced ("Dark theme, switch, on") matches what is shown. The
 * knob's position, not only its colour, says which way it is set.
 */
function ThemeSwitch() {
  const { isDark, toggle } = useDarkMode();

  return (
    <button type="button" role="switch" aria-checked={isDark} onClick={toggle} className={chip}>
      {/* Keyed so the new icon spins in each time the theme flips. */}
      {isDark ? (
        <MoonIcon key="moon" className="h-5 w-5 animate-pop-spin" />
      ) : (
        <SunIcon key="sun" className="h-5 w-5 animate-pop-spin" />
      )}
      Dark theme
      <span
        aria-hidden="true"
        className={`relative h-5 w-9 rounded-pill ring-[1.5px] ring-inset ring-ink/70 transition-colors duration-300 ${
          isDark ? "bg-ink" : ""
        }`}
      >
        <span
          className={`absolute left-[3px] top-[3px] h-3.5 w-3.5 rounded-pill transition-[transform,background-color] duration-300 ease-out-expo ${
            isDark ? "translate-x-4 bg-purple" : "bg-ink"
          }`}
        />
      </span>
    </button>
  );
}

/**
 * The menu the rail opens: a full-screen sheet in the brand blue that drops in
 * from the top like the page scrolling into place.
 *
 * Laid out as in the reference. The cut-corner logo block sits flush in the
 * top-left corner with the two actions opposite it; below, the headline
 * destinations run large down the left and the grouped index takes the right in
 * two columns, every link visible.
 *
 * Below the headline links sit the things the old side rail carried: the
 * deposit-insurance line and the latest notice, the helpline, and the theme and
 * language settings.
 *
 * The close button is a 56px ring pinned to the top-right corner, near where
 * the page's own trigger sits. It is outside the scrolling layer, so it stays
 * put however far down the index is read.
 *
 * The surface is a fixed accent, so it does not invert in dark mode and its
 * text is `ink` in both themes; `on-accent` keeps the focus ring ink as well.
 */
export function MenuOverlay({ id, open, onClose }: MenuOverlayProps) {
  const path = useRoute();
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Takes the closed sheet out of the tab order and the accessibility tree.
  // `inert`, not `visibility: hidden`: the class flips a frame or more before
  // the computed style does, and `.focus()` on a still-hidden element is a
  // silent no-op. `useLayoutEffect` so it lands before the focus trap runs.
  // Each opening also starts at the top, not wherever the last visit left off.
  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (panel) panel.inert = !open;
    if (open && scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [open]);

  useLockBody(open);
  useFocusTrap(panelRef, open, onClose);

  // Close on navigation: the sheet would otherwise outlive the page it linked
  // to. Safe to run on mount as well, because setting state to the value it
  // already holds does not re-render.
  useEffect(() => {
    onClose();
  }, [path, onClose]);

  // Any followed link closes the sheet. The route effect above already covers
  // a change of page, but a hash on the page that is already open
  // (`/#open-an-account` from the homepage) is not one: `navigate` stays silent
  // for it and nothing scrolls, so both jobs are done here.
  const onLinkClick = (event: MouseEvent<HTMLElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const anchor = (event.target as HTMLElement).closest("a");
    if (!anchor) return;

    onClose();

    const url = new URL(anchor.href);
    if (url.hash && url.origin === window.location.origin && url.pathname === window.location.pathname) {
      document.querySelector(url.hash)?.scrollIntoView();
    }
  };

  return (
    <div
      id={id}
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      // Focusable so the dialog itself can take focus if it ever has nothing
      // else to offer; `useFocusTrap` falls back to it.
      tabIndex={-1}
      className={`menu-panel on-accent fixed inset-0 z-modal bg-purple text-ink ${open ? "is-open" : ""}`}
    >
      {/* First in the DOM, so opening the menu puts focus on the way out. */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close menu"
        className="group absolute right-5 top-5 z-raised grid h-14 w-14 place-items-center rounded-pill bg-purple transition-transform duration-300 ease-out-expo active:scale-95 sm:right-8 sm:top-8"
      >
        <span
          aria-hidden="true"
          className="absolute inset-1.5 rounded-pill border-[1.5px] border-ink/70 transition-transform duration-500 ease-out-expo group-hover:scale-110"
        />
        <CloseIcon className="relative h-6 w-6 transition-transform duration-500 ease-out-expo group-hover:rotate-90" />
      </button>

      <div ref={scrollRef} onClick={onLinkClick} className="h-full overflow-y-auto overscroll-contain">
        <div className="flex min-h-full flex-col pb-14 lg:pb-20">
          <div className="flex flex-wrap items-start gap-y-8">
            {/* Brand block, as on the hero: the cut lives on its own layer so it
                never clips the link's focus outline. A lighter blue than the
                sheet, so it reads as a block without a border. */}
            <div className="menu-fade relative" style={step(0)}>
              <span aria-hidden="true" className="hero-brand-cut absolute inset-0 bg-purple-950" />
              <a
                href="/"
                aria-label="Bombay Mercantile Co-operative Bank, home"
                className="group relative flex items-center gap-4 py-4 pl-6 pr-14 focus-visible:outline-offset-[-8px] sm:gap-5 sm:py-5 sm:pl-10 sm:pr-20 lg:pl-12 lg:pr-24"
              >
                <Logo
                  height={64}
                  className="transition-transform duration-500 ease-out-expo group-hover:-rotate-2 group-hover:scale-[1.04]"
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

            {/* Beside the logo from `md`, clearing the close button's column;
                below it on a phone, where the row has no room for both. */}
            <div
              className="menu-fade order-last flex w-full flex-wrap items-center gap-3 px-6 sm:px-10 md:order-none md:ml-auto md:mr-28 md:w-auto md:px-0 md:pt-9"
              style={step(1)}
            >
              <PillButton href="/#open-an-account" variant="ink" size="sm">
                Open an account
              </PillButton>
              <PillButton href={utilityLinks.netBanking.href} external variant="ghost-ink" size="sm">
                {utilityLinks.netBanking.label}
              </PillButton>
            </div>
          </div>

          <div className="grid flex-1 gap-14 px-6 pt-12 sm:px-10 md:pt-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:pl-12 lg:pr-30">
            <div className="flex flex-col">
              <nav aria-label="Main">
                <ul className="flex flex-col">
                  {railPrimary.map((link, index) => (
                    <li key={link.href}>
                      {/* The mask is inside the link, so it clips the rising
                          label but never the link's own focus outline. */}
                      <a
                        href={link.href}
                        aria-current={link.href === path ? "page" : undefined}
                        className="group block rounded-lg py-2 text-h2 uppercase"
                      >
                        <span className="menu-line">
                          <span className="menu-rise" style={step(index)}>
                            <span
                              aria-hidden="true"
                              className="absolute left-0 top-1/2 h-[3px] w-7 origin-left -translate-y-1/2 scale-x-0 bg-ink transition-transform duration-500 ease-out-expo group-hover:scale-x-100 group-aria-[current=page]:scale-x-100"
                            />
                            <span className="inline-block transition-transform duration-500 ease-out-expo group-hover:translate-x-11 group-aria-[current=page]:translate-x-11">
                              {link.label}
                            </span>
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div
                className="menu-fade mt-12 flex flex-col gap-8 border-t border-ink/25 pt-8"
                style={step(railPrimary.length)}
              >
                <section aria-label="Announcements">
                  <p className="text-fine font-medium uppercase tracking-[0.16em] text-ink/80">
                    {railStandingNote}
                  </p>
                  <a
                    href={latestNotice.href}
                    className="group -mx-2 mt-1 inline-flex min-h-11 items-center gap-3 rounded-lg px-2 text-label font-normal text-ink underline decoration-ink/30 underline-offset-[6px] transition-[text-decoration-color] duration-200 hover:decoration-ink"
                  >
                    <span>
                      <span className="sr-only">Latest notice: </span>
                      {latestNotice.title}
                    </span>
                    <ArrowRightIcon className="h-5 w-5 shrink-0 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
                  </a>
                </section>

                <div className="flex flex-wrap items-center gap-x-8">
                  <a
                    href={utilityLinks.careHref}
                    className="-mx-2 inline-flex min-h-11 items-center gap-2.5 rounded-lg px-2 text-label"
                  >
                    <span className="font-normal text-ink/80">Customer care</span>
                    {utilityLinks.careNumber}
                  </a>
                  <a
                    href={utilityLinks.complaint.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="-mx-2 inline-flex min-h-11 items-center rounded-lg px-2 text-label font-normal text-ink underline decoration-ink/30 underline-offset-[6px] transition-[text-decoration-color] duration-200 hover:decoration-ink"
                  >
                    {utilityLinks.complaint.label}
                  </a>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <ThemeSwitch />
                  {/* The language is named in its own script, so a Hindi reader
                      finds it without reading English first. */}
                  <button type="button" className={chip}>
                    <span lang="hi">हिन्दी</span>
                  </button>
                </div>
              </div>
            </div>

            <nav aria-label="All pages" className="grid content-start gap-x-12 gap-y-12 sm:grid-cols-2 lg:gap-y-14">
              {railSecondary.map((group, index) => {
                const labelId = `${id}-group-${index}`;

                return (
                  <div key={group.label} className="menu-fade" style={step(index + 2)}>
                    {/* A label, not a heading: the sheet comes before the page's
                        h1 in the document, and h2s ahead of it would read as an
                        outline that starts in the wrong place. */}
                    <p
                      id={labelId}
                      className="border-b border-ink/25 pb-3 text-fine font-medium uppercase tracking-[0.16em] text-ink/80"
                    >
                      {group.label}
                    </p>
                    <ul aria-labelledby={labelId} className="mt-3 flex flex-col">
                      {group.links.map((link) => (
                        <li key={link.href}>
                          <a
                            href={link.href}
                            aria-current={link.href === path ? "page" : undefined}
                            className="-mx-2 flex min-h-11 items-center rounded-lg px-2 text-label font-normal text-ink underline decoration-transparent underline-offset-[6px] transition-[text-decoration-color] duration-200 hover:decoration-ink/60 aria-[current=page]:font-medium aria-[current=page]:decoration-ink"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
