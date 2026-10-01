import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { MinusIcon, PlusIcon } from "../../assets/icons";
import { Logo } from "../../assets/logo";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import { useLockBody } from "../../hooks/useLockBody";
import { utilityLinks } from "../../data/nav";
import { railPrimary, railPrimaryLabel, railSecondary } from "../../data/rail";
import { useRoute } from "../../router";
import { RAIL_WIDTH } from "./SideRail";

type SideDrawerProps = {
  /** Matches the rail toggle's `aria-controls`. */
  id: string;
  open: boolean;
  onClose: () => void;
};

/**
 * The panel the rail opens.
 *
 * Two registers, as in the reference: a handful of destinations set large
 * enough to be read across the room, then a hairline list of everything else,
 * where a group expands in place rather than pushing the visitor to a new page
 * to discover it has children.
 *
 * Layering runs scrim (50) then panel and rail (60). The panel and the rail do
 * not overlap — the panel is inset by the rail's width — so they share a level.
 *
 * The panel sits beside the rail rather than under it, so the close button is
 * exactly where the open button was — the same 48px target, in the same place,
 * which is what makes the control feel like one toggle rather than two.
 */
export function SideDrawer({ id, open, onClose }: SideDrawerProps) {
  const path = useRoute();
  const panelRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<number | null>(null);
  const baseId = useId();

  // Takes the closed panel out of the tab order and the accessibility tree.
  //
  // This was `visibility: hidden` via a class, which failed in a way worth
  // recording: the class flips a frame or more before the computed style does,
  // and `.focus()` on a still-hidden element is a silent no-op, so the drawer
  // opened with focus stranded on the rail toggle. `inert` has no such timing,
  // and unlike `visibility` it does not interfere with the slide-out.
  //
  // `useLayoutEffect`, not `useEffect`, so it runs before the focus trap below
  // and the panel is already interactive by the time the trap focuses it.
  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (panel) panel.inert = !open;
  }, [open]);

  useLockBody(open);
  useFocusTrap(panelRef, open, onClose);

  // Close on navigation: the drawer would otherwise outlive the page it linked
  // to. Safe to run on mount as well, because setting state to the value it
  // already holds does not re-render.
  useEffect(() => {
    onClose();
  }, [path, onClose]);

  return (
    <>
      {/* Scrim. Clicking it closes, but it is not the only way out: Escape and
          the toggle both work, so this is not a keyboard trap. */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 z-scrim bg-ink/40 transition-opacity duration-300 ease-out-quint ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        id={id}
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={!open}
        // Focusable so the dialog itself can take focus on open. Without it,
        // `useFocusTrap`'s `(first ?? container).focus()` fallback is a no-op on
        // a plain div and focus is left behind on the rail toggle.
        tabIndex={-1}
        className="fixed inset-y-0 z-modal flex max-w-[42rem] flex-col overflow-y-auto overscroll-contain bg-page transition-transform duration-[420ms] ease-out-quint"
        // Width is the viewport minus the rail, not `100%`: the panel is offset
        // from the right by the rail's width, so a full-viewport width pushes
        // its left edge off screen and clips the first characters of every line
        // on a phone.
        //
        // The closed transform is `100% + rail`, not Tailwind's `translate-x-full`.
        // `translate-x-full` moves the panel by its own width only, which parks
        // its left edge exactly at the rail's inner edge and leaves a rail-width
        // strip of drawer on screen.
        style={{
          right: RAIL_WIDTH,
          width: `calc(100% - ${RAIL_WIDTH})`,
          transform: open ? "translateX(0)" : `translateX(calc(100% + ${RAIL_WIDTH}))`,
        }}
      >
        <div className="flex min-h-full flex-col px-8 py-10 sm:px-12 sm:py-14">
          <a
            href="/"
            className="mb-12 inline-flex min-h-11 items-center self-start rounded-lg"
            aria-label="Bombay Mercantile Co-operative Bank, home"
          >
            <Logo height={64} />
          </a>

          <p className="text-fine font-medium uppercase tracking-[0.14em] text-fg-muted">
            {railPrimaryLabel}
          </p>

          <ul className="mt-7 flex flex-col gap-1">
            {railPrimary.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={link.href === path ? "page" : undefined}
                  className={`-mx-2 inline-flex min-h-11 items-center rounded-lg px-2 text-h3 underline-offset-[0.4em] transition-colors duration-200 ease-out-quint hover:text-forest dark:hover:text-lavender ${
                    link.href === path ? "underline decoration-2" : ""
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <ul className="mt-14 flex flex-col border-t border-line">
            {railSecondary.map((group, index) => {
              const hasChildren = group.links.length > 0;
              const isOpen = expanded === index;
              const panelId = `${baseId}-group-${index}`;

              return (
                <li key={group.label} className="border-b border-line">
                  {hasChildren ? (
                    <>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setExpanded(isOpen ? null : index)}
                        className="flex min-h-14 w-full items-center justify-between gap-6 py-4 text-left transition-colors duration-200 hover:text-forest dark:hover:text-lavender"
                      >
                        <span className="text-fine font-medium uppercase tracking-[0.12em]">
                          {group.label}
                        </span>
                        <span aria-hidden="true" className="shrink-0">
                          {isOpen ? (
                            <MinusIcon className="h-5 w-5" />
                          ) : (
                            <PlusIcon className="h-5 w-5" />
                          )}
                        </span>
                      </button>

                      <div
                        id={panelId}
                        className={`grid transition-[grid-template-rows] duration-300 ease-out-quint ${
                          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <ul className="flex flex-col pb-4">
                            {group.links.map((link) => (
                              <li key={link.href}>
                                <a
                                  href={link.href}
                                  aria-current={link.href === path ? "page" : undefined}
                                  className="-mx-2 flex min-h-11 items-center rounded-lg px-2 text-body-sm text-fg-muted transition-colors duration-200 hover:text-fg"
                                >
                                  {link.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </>
                  ) : (
                    <a
                      href={group.href ?? "/"}
                      aria-current={group.href === path ? "page" : undefined}
                      className="flex min-h-14 items-center py-4 text-fine font-medium uppercase tracking-[0.12em] transition-colors duration-200 hover:text-forest dark:hover:text-lavender"
                    >
                      {group.label}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="mt-auto flex flex-wrap items-center gap-x-8 gap-y-3 pt-14">
            <a
              href={utilityLinks.careHref}
              className="-mx-2 inline-flex min-h-11 items-center rounded-lg px-2 text-body-sm font-medium transition-colors duration-200 hover:text-forest dark:hover:text-lavender"
            >
              {utilityLinks.careNumber}
            </a>
            <a
              href={utilityLinks.complaint.href}
              target="_blank"
              rel="noreferrer noopener"
              className="-mx-2 inline-flex min-h-11 items-center rounded-lg px-2 text-body-sm text-fg-muted transition-colors duration-200 hover:text-fg"
            >
              {utilityLinks.complaint.label}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
