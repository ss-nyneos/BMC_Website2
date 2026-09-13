import { useEffect, useId, useRef, useState } from "react";
import { ChevronDownIcon, MenuIcon } from "../../assets/icons";
import { Logo } from "../../assets/logo";
import { Container } from "../layout/Container";
import { PillButton } from "../ui/PillButton";
import { primaryCta, primaryNav } from "../../data/nav";
import { useRoute } from "../../router";
import { NavDropdown } from "./NavDropdown";
import { MobileDrawer } from "./MobileDrawer";

/**
 * Sticky header, in two rows.
 *
 * Row one is the identity and the one persistent action. Row two is the bank's
 * nine navigation entries, given a full-width strip of their own.
 *
 * Nine entries will not share a row with a logo and a call to action at any
 * readable size, and shrinking the type to force them in would put the
 * navigation below the page's 12px floor. Splitting the rows is what lets the
 * navigation keep the 18px label size the rest of the interface uses.
 *
 * Below xl the strip is replaced by the drawer, which carries the same nine
 * entries in the same order.
 */
export function Navbar() {
  const path = useRoute();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const stripRef = useRef<HTMLDivElement>(null);
  const baseId = useId();

  // Navigation no longer unmounts the header, so anything left open has to be
  // closed explicitly: without this the drawer stays over the page you just
  // navigated to.
  useEffect(() => {
    setDrawerOpen(false);
    setOpenIndex(null);
  }, [path]);

  const cancelClose = () => window.clearTimeout(closeTimer.current);

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpenIndex(null), 140);
  };

  const closeAndRestore = (index: number) => {
    setOpenIndex(null);
    triggerRefs.current[index]?.focus();
  };

  // Dismiss on a click anywhere outside the strip.
  useEffect(() => {
    if (openIndex === null) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!stripRef.current?.contains(event.target as Node)) setOpenIndex(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [openIndex]);

  useEffect(() => () => cancelClose(), []);

  return (
    <>
      <header className="sticky top-0 z-sticky border-b border-line bg-surface/95 backdrop-blur">
        <Container>
          <div className="flex h-20 items-center justify-between gap-4">
            <a
              href="#top"
              className="flex min-h-11 items-center rounded-lg py-1"
              aria-label="Bombay Mercantile Co-operative Bank, home"
            >
              <Logo />
            </a>

            <div className="flex items-center gap-3">
              <PillButton
                href={primaryCta.href}
                variant="solid"
                size="sm"
                className="hidden sm:inline-flex"
              >
                {primaryCta.label}
              </PillButton>

              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                aria-label="Open navigation"
                aria-expanded={drawerOpen}
                className="grid h-12 w-12 place-items-center rounded-pill border border-line transition-colors duration-200 hover:bg-lavender-soft hover:text-ink xl:hidden"
              >
                <MenuIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </Container>

        <div className="hidden border-t border-line xl:block">
          <Container>
            <nav aria-label="Primary" ref={stripRef}>
              <ul className="flex items-stretch">
                {primaryNav.map((item, index) => {
                  const isOpen = openIndex === index;
                  const panelId = `${baseId}-menu-${index}`;
                  // Entries near the end of the strip drop their menu to the
                  // left so it cannot run past the container edge.
                  const alignEnd = index >= primaryNav.length - 3;

                  const frame =
                    "relative flex border-l border-line first:border-l-0 last:border-r last:border-line";

                  if (!item.links) {
                    // The current page is marked for assistive technology and
                    // underlined, not just recoloured: colour alone is not an
                    // indicator anyone is required to be able to perceive.
                    const isCurrent = item.href === path;
                    return (
                      <li key={item.label} className={frame}>
                        <a
                          href={item.href}
                          aria-current={isCurrent ? "page" : undefined}
                          className={`flex h-13 shrink-0 items-center whitespace-nowrap px-3 text-label underline-offset-[1.15rem] transition-colors duration-200 ease-out-quint hover:bg-lavender-soft hover:text-ink ${
                            isCurrent ? "font-medium underline decoration-2" : ""
                          }`}
                        >
                          {item.label}
                        </a>
                      </li>
                    );
                  }

                  return (
                    <li
                      key={item.label}
                      className={frame}
                      onMouseEnter={() => {
                        cancelClose();
                        setOpenIndex(index);
                      }}
                      onMouseLeave={scheduleClose}
                      onKeyDown={(event) => {
                        if (event.key === "Escape") closeAndRestore(index);
                      }}
                    >
                      <button
                        ref={(node) => {
                          triggerRefs.current[index] = node;
                        }}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={isOpen ? panelId : undefined}
                        onClick={() => setOpenIndex(isOpen ? null : index)}
                        onKeyDown={(event) => {
                          if (event.key === "ArrowDown") {
                            event.preventDefault();
                            setOpenIndex(index);
                            window.requestAnimationFrame(() => {
                              document
                                .getElementById(panelId)
                                ?.querySelector<HTMLAnchorElement>("a[href]")
                                ?.focus();
                            });
                          }
                        }}
                        className={`flex h-13 shrink-0 items-center gap-1.5 whitespace-nowrap px-3 text-label transition-colors duration-200 ease-out-quint ${
                          isOpen ? "bg-lavender-soft text-ink" : "hover:bg-lavender-soft hover:text-ink"
                        }`}
                      >
                        {item.label}
                        <ChevronDownIcon
                          className={`h-4 w-4 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <NavDropdown
                        links={item.links}
                        open={isOpen}
                        onClose={() => setOpenIndex(null)}
                        id={panelId}
                        alignEnd={alignEnd}
                      />
                    </li>
                  );
                })}
              </ul>
            </nav>
          </Container>
        </div>
      </header>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
