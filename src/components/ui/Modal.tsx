import { useCallback, useEffect, useRef, type ReactNode } from "react";
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
 */
export function Modal({ open, onClose, title, children, footer, labelledById }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const headingId = labelledById ?? "modal-title";

  useLockBody(open);
  useFocusTrap(panelRef, open, onClose);

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

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-modal flex items-end justify-center bg-ink/55 p-4 animate-scrim-in sm:items-center sm:p-6"
      onMouseDown={onScrimClick}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        tabIndex={-1}
        className="max-h-[88vh] w-full max-w-[640px] overflow-y-auto rounded-xl bg-surface p-7 shadow-menu animate-pop-in sm:p-9"
      >
        <div className="flex items-start justify-between gap-6">
          <h2 id={headingId} className="text-h3">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-pill border border-line-strong transition-[background-color,color,transform] duration-300 ease-out-expo hover:rotate-90 hover:bg-lavender-soft hover:text-ink"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 text-body-sm text-fg-muted">{children}</div>

        {footer ? <div className="mt-8 flex flex-wrap gap-3">{footer}</div> : null}
      </div>
    </div>,
    document.body,
  );
}
