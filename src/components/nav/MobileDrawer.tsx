import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDownIcon, CloseIcon, ExternalIcon, PhoneIcon } from "../../assets/icons";
import { PillButton } from "../ui/PillButton";
import { Logo } from "../../assets/logo";
import { primaryCta, primaryNav, utilityLinks } from "../../data/nav";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import { useLockBody } from "../../hooks/useLockBody";

/**
 * Full-height navigation below xl. It carries the same nine entries in the same
 * order as the desktop strip, so the structure a visitor learns on one does not
 * have to be relearned on the other.
 *
 * The list is written here rather than reusing Accordion because it mixes two
 * row types: seven direct links and two disclosures. Forcing that through a
 * disclosure-only component would mean wrapping seven single links in
 * collapsible panels, which is a worse target and a worse announcement.
 *
 * "Open an account" is pinned to the bottom edge, inside the safe area, where a
 * thumb can reach it without scrolling the list back up.
 */
export function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useLockBody(open);
  useFocusTrap(panelRef, open, onClose);

  if (!open) return null;

  const rowClass =
    "flex w-full items-center justify-between gap-6 rounded-lg px-3 py-4 text-left text-label transition-colors duration-200 hover:bg-lavender-soft hover:text-ink";

  return createPortal(
    <div
      className="fixed inset-0 z-drawer bg-ink/55 animate-scrim-in xl:hidden"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        tabIndex={-1}
        className="ml-auto flex h-full w-full max-w-[420px] flex-col bg-page"
      >
        <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-4">
          <Logo height={56} />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="grid h-11 w-11 place-items-center rounded-pill border border-line transition-colors duration-200 hover:bg-lavender-soft hover:text-ink"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <nav aria-label="Primary" className="flex-1 overflow-y-auto px-4 py-2">
          <ul className="flex flex-col">
            {primaryNav.map((item, index) => {
              const isOpen = openIndex === index;

              if (!item.links) {
                return (
                  <li key={item.label} className="border-b border-line">
                    <a href={item.href} onClick={onClose} className={rowClass}>
                      {item.label}
                    </a>
                  </li>
                );
              }

              return (
                <li key={item.label} className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={`drawer-panel-${index}`}
                    className={rowClass}
                  >
                    {item.label}
                    <ChevronDownIcon
                      aria-hidden="true"
                      className={`h-5 w-5 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    id={`drawer-panel-${index}`}
                    className={`grid transition-[grid-template-rows] duration-300 ease-out-quint ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <ul className="flex flex-col pb-2 pl-3">
                        {item.links.map((link) => (
                          <li key={link.href + link.label}>
                            <a
                              href={link.href}
                              onClick={onClose}
                              className="block rounded-lg px-3 py-3.5 text-body-sm transition-colors duration-200 hover:bg-lavender-soft hover:text-ink"
                            >
                              {link.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 flex flex-col gap-4 px-3">
            <a href={utilityLinks.careHref} className="flex min-h-11 items-center gap-3 text-fine text-fg-muted">
              <PhoneIcon className="h-4 w-4" />
              Customer care <span className="font-medium text-fg">{utilityLinks.careNumber}</span>
            </a>
            <a
              href={utilityLinks.complaint.href}
              target="_blank"
              rel="noreferrer noopener"
              className="flex min-h-11 items-center gap-2 text-fine text-fg-muted"
            >
              {utilityLinks.complaint.label}
              <ExternalIcon className="h-3.5 w-3.5" />
            </a>
          </div>
        </nav>

        <div className="border-t border-line bg-surface px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4">
          <PillButton href={primaryCta.href} variant="solid" onClick={onClose} className="w-full">
            {primaryCta.label}
          </PillButton>
        </div>
      </div>
    </div>,
    document.body,
  );
}
