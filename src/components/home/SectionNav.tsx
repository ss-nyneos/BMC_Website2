import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { cx } from "./primitives";

type SectionNavProps = {
  items: { label: string; anchor: string }[];
};

/** The id of the section currently in the upper third of the viewport. */
function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join("|");

  useEffect(() => {
    const elements = key
      .split("|")
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    if (elements.length === 0 || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [key]);

  return active;
}

/**
 * A row of in-page jump links, from bmc_website2. Deliberately not sticky, and
 * presentation only: every target is also reachable from the menu. The row
 * scrolls sideways on a phone and keeps the active pill in view.
 */
export function SectionNav({ items }: SectionNavProps) {
  const active = useScrollSpy(items.map((item) => item.anchor));
  const row = useRef<HTMLUListElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!active || !row.current) return;
    const pill = row.current.querySelector<HTMLElement>(`[data-anchor="${active}"]`);
    if (!pill) return;
    const { offsetLeft, offsetWidth } = pill;
    const { scrollLeft, clientWidth } = row.current;
    if (offsetLeft < scrollLeft || offsetLeft + offsetWidth > scrollLeft + clientWidth) {
      row.current.scrollTo({ left: offsetLeft - 16, behavior: reduced ? "auto" : "smooth" });
    }
  }, [active, reduced]);

  return (
    <nav aria-label="Page sections">
      <ul ref={row} className="scrollbar-none -mx-1 flex gap-2 overflow-x-auto px-1 py-1 lg:justify-center">
        {items.map((item) => {
          const isActive = active === item.anchor;
          return (
            <li key={item.anchor} className="shrink-0">
              <a
                href={`#${item.anchor}`}
                data-anchor={item.anchor}
                aria-current={isActive ? "true" : undefined}
                className={cx(
                  "inline-flex min-h-12 items-center rounded-full border px-6 py-2 text-bmc-body-sm transition-colors duration-300",
                  isActive
                    ? "border-bmc-brand bg-bmc-brand text-white"
                    : "border-bmc-line bg-bmc-card text-bmc-ink hover:border-bmc-brand hover:text-bmc-brand",
                )}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
