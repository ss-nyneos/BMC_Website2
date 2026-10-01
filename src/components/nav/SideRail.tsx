import { useCallback, useId, useState } from "react";
import { CloseIcon, ExternalIcon, MenuIcon, UserIcon } from "../../assets/icons";
import { utilityLinks } from "../../data/nav";
import { latestNotice, railStandingNote } from "../../data/rail";
import { DarkModeToggle } from "./DarkModeToggle";
import { SideDrawer } from "./SideDrawer";

/**
 * The site's whole navigation: a fixed rail on the right edge, and the drawer
 * it opens.
 *
 * The rail is always on screen, so it carries the three things that must never
 * be more than one click away on a bank site — the notice ticker, the login,
 * and the way into everything else. It replaces the former utility bar and
 * two-row header entirely.
 *
 * The rail sits at `z-modal`, above the drawer's scrim, because the control
 * that closes the drawer lives in it: at scrim level the scrim would swallow
 * the click that dismisses it.
 *
 * The rotated text is real text in a `vertical-rl` writing mode, not an image
 * and not a transform, so it is selectable, translatable and read in order by a
 * screen reader. Below `md` the rail keeps its controls but drops the rotated
 * notice, which needs more vertical run than a phone screen has.
 */
export const RAIL_WIDTH = "4.5rem";



export function SideRail() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  // Stable identity matters here. `useFocusTrap` lists its escape handler as a
  // dependency and restores focus to the trigger when it tears down, so an
  // inline arrow would re-run the trap on every render and bounce focus back
  // out of the drawer the moment it was moved in.
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <div
        className="fixed inset-y-0 right-0 z-modal flex w-18 flex-col items-center justify-between border-l border-line bg-page py-5"
        style={{ width: RAIL_WIDTH }}
      >
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls={panelId}
          className="grid h-12 w-12 place-items-center rounded-pill text-fg transition-colors duration-200 ease-out-quint hover:bg-lavender-soft hover:text-ink"
        >
          {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>

        {/* The ticker. `vertical-rl` keeps it as text; `min-h-0` lets it shrink
            rather than push the icons off the bottom on a short viewport. */}
        <div
          aria-label="Announcements"
          className="hidden min-h-0 flex-1 items-center justify-center py-6 md:flex"
        >
          <div
            className="flex max-h-full items-start gap-5 overflow-hidden"
            style={{ writingMode: "vertical-rl" }}
          >
            <span className="text-fine font-medium text-fg">{railStandingNote}</span>
            <a
              href={latestNotice.href}
              className="text-fine text-fg-muted underline decoration-transparent underline-offset-4 transition-colors duration-200 hover:text-fg hover:decoration-current"
            >
              <span className="sr-only">Latest notice: </span>
              {latestNotice.title}
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center gap-1">
          <a
            href={utilityLinks.netBanking.href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${utilityLinks.netBanking.label} (opens in a new tab)`}
            className="grid h-12 w-12 place-items-center rounded-pill text-fg transition-colors duration-200 ease-out-quint hover:bg-lavender-soft hover:text-ink"
          >
            <ExternalIcon className="h-5 w-5" />
          </a>

          <a
            href="/contact"
            aria-label="Your branch and contact details"
            className="grid h-12 w-12 place-items-center rounded-pill text-fg transition-colors duration-200 ease-out-quint hover:bg-lavender-soft hover:text-ink"
          >
            <UserIcon className="h-6 w-6" />
          </a>

          <DarkModeToggle />

          <button
            type="button"
            aria-label="Switch language to Hindi"
            className="grid h-12 w-12 place-items-center rounded-pill text-fine font-medium tracking-[0.08em] text-fg transition-colors duration-200 ease-out-quint hover:bg-lavender-soft hover:text-ink"
          >
            HI
          </button>
        </div>
      </div>

      <SideDrawer id={panelId} open={open} onClose={close} />
    </>
  );
}
