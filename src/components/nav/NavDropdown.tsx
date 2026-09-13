import { useEffect, useRef } from "react";
import type { NavLink } from "../../types";

type NavDropdownProps = {
  links: NavLink[];
  open: boolean;
  onClose: () => void;
  id: string;
  /** Anchors to the right edge, for triggers near the end of the strip. */
  alignEnd?: boolean;
};

/**
 * The dropdown under a navigation entry that carries a chevron.
 *
 * Sized to its contents rather than the full container width: these menus hold
 * five short links, and a full-bleed panel for five links is decoration, not
 * navigation.
 *
 * Keyboard model: the trigger owns open and close (Enter, Space, Down, Esc);
 * inside, Up and Down walk the links and Esc returns focus to the trigger.
 * Hover opens it for pointer users but is never the only way in, so it works on
 * touch and by keyboard alike.
 */
export function NavDropdown({ links, open, onClose, id, alignEnd = false }: NavDropdownProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
      const items = Array.from(panel.querySelectorAll<HTMLAnchorElement>("a[href]"));
      if (items.length === 0) return;

      event.preventDefault();
      const current = items.indexOf(document.activeElement as HTMLAnchorElement);
      const step = event.key === "ArrowDown" ? 1 : -1;
      items[(current + step + items.length) % items.length].focus();
    };

    panel.addEventListener("keydown", onKeyDown);
    return () => panel.removeEventListener("keydown", onKeyDown);
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={panelRef}
      id={id}
      className={`absolute top-full z-raised pt-2 ${alignEnd ? "right-0" : "left-0"}`}
      onMouseLeave={onClose}
    >
      <ul className="min-w-[264px] overflow-hidden rounded-xl border border-line bg-surface p-2 shadow-menu animate-pop-in">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <a
              href={link.href}
              className="block whitespace-nowrap rounded-lg px-4 py-3 text-label transition-colors duration-200 ease-out-quint hover:bg-lavender-soft hover:text-ink"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
