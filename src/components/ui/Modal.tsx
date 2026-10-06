import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "../../assets/icons";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import { useLockBody } from "../../hooks/useLockBody";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  /** Rendered along the bottom edge, typically a PillButton. */
  footer?: ReactNode;
  labelledById?: string;
};

/**
 * Centred dialog with a scrim, focus trap and Esc to close.
 *
 * Rendered through a portal on document.body so it can never be clipped by an
 * ancestor with overflow hidden, and so its stacking order comes from the
 * semantic z-index scale rather than from wherever it happens to be mounted.
 *
 * It enters as a bottom sheet on phones, where it rises from the edge the thumb
 * is already near, and grows out of the centre from `sm` up. Closing plays a
 * shorter exit (exits run at roughly half the entrance) before the portal
 * unmounts; `mounted` holds the dialog on screen for that long. The scrim blurs
 * the page behind it, which is the one place blur means something here: the
 * page is still there, but not the thing to look at.
 */
const EXIT_MS = 220;

export function Modal({ open, onClose, title, children, footer, labelledById }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const headingId = labelledById ?? "modal-title";

  const [mounted, setMounted] = useState(open);

  useLockBody(open);
  useFocusTrap(panelRef, open, onClose);

  useEffect(() => {
    if (open) {
      setMounted(true);
      return;
    }
    const timer = window.setTimeout(() => setMounted(false), EXIT_MS);
    return () => window.clearTimeout(timer);
  }, [open]);

  const onScrimClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) onClose();
    },
    [onClose],
  );

  // Esc has to work even before focus lands inside the panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // `open` is checked as well as `mounted` so the dialog is in the DOM on the
  // very render that opens it. Waiting for `mounted` would leave the focus
  // trap's effect running against an empty ref, and focus would stay outside.
  if (!open && !mounted) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-modal flex items-end justify-center bg-ink/55 p-4 backdrop-blur-[3px] sm:items-center sm:p-6 ${
        open ? "animate-scrim-in" : "pointer-events-none animate-scrim-out"
      }`}
      onMouseDown={onScrimClick}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        tabIndex={-1}
        className={`max-h-[88vh] w-full max-w-[640px] overflow-y-auto rounded-xl bg-surface p-7 shadow-menu sm:p-9 ${
          open ? "animate-sheet-in sm:animate-modal-in" : "animate-sheet-out sm:animate-modal-out"
        }`}
      >
        <div className="flex items-start justify-between gap-6">
          <h2 id={headingId} className="text-h3">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="group grid h-11 w-11 shrink-0 place-items-center rounded-pill border border-line transition-[color,background-color,transform] duration-200 hover:bg-lavender-soft hover:text-ink active:scale-95"
          >
            <CloseIcon className="h-5 w-5 transition-transform duration-300 ease-out-quint group-hover:rotate-90" />
          </button>
        </div>

        <div className="mt-5 text-body-sm text-fg-muted">{children}</div>

        {footer ? <div className="mt-8 flex flex-wrap gap-3">{footer}</div> : null}
      </div>
    </div>,
    document.body,
  );
}
