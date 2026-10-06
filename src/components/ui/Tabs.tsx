import { useId, useRef, useState, type ReactNode } from "react";

export type TabItem = {
  label: string;
  panel: ReactNode;
};

/**
 * Tab set with full keyboard support: arrow keys move between tabs, Home and
 * End jump to the ends, and only the selected tab is in the tab order, which is
 * the roving-tabindex pattern screen-reader users expect.
 *
 * The tabs themselves are pills, matching the shape language of the page. A
 * panel fades up as it is shown: CSS animations restart when an element leaves
 * `hidden`, so switching tabs replays it with no extra state.
 */
export function Tabs({ items, className = "" }: { items: TabItem[]; className?: string }) {
  const [selected, setSelected] = useState(0);
  const baseId = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusTab = (index: number) => {
    const next = (index + items.length) % items.length;
    setSelected(next);
    refs.current[next]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        focusTab(selected + 1);
        break;
      case "ArrowLeft":
        event.preventDefault();
        focusTab(selected - 1);
        break;
      case "Home":
        event.preventDefault();
        focusTab(0);
        break;
      case "End":
        event.preventDefault();
        focusTab(items.length - 1);
        break;
      default:
        break;
    }
  };

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label="News and notices"
        onKeyDown={onKeyDown}
        className="flex flex-wrap gap-2.5"
      >
        {items.map((item, index) => {
          const isSelected = index === selected;
          return (
            <button
              key={item.label}
              ref={(node) => {
                refs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${index}`}
              aria-selected={isSelected}
              aria-controls={`${baseId}-panel-${index}`}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => setSelected(index)}
              className={`h-12 rounded-pill px-6 text-label font-medium transition-[color,background-color,transform] duration-200 ease-out-quint ${
                isSelected
                  ? "bg-purple text-ink"
                  : "fill-wipe fill-wipe-x border border-line text-fg hover:text-ink active:scale-[0.97]"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {items.map((item, index) => (
        <div
          key={item.label}
          role="tabpanel"
          id={`${baseId}-panel-${index}`}
          aria-labelledby={`${baseId}-tab-${index}`}
          hidden={index !== selected}
          tabIndex={0}
          className="mt-9 animate-panel-in focus-visible:outline-none"
        >
          {item.panel}
        </div>
      ))}
    </div>
  );
}
