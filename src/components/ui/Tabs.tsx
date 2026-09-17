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
 * The tabs themselves are pills, matching the shape language of the page.
 */
export function Tabs({
  items,
  className = "",
  label = "News and notices",
}: {
  items: TabItem[];
  className?: string;
  /** Accessible name for the tab list. */
  label?: string;
}) {
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
        aria-label={label}
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
              className={`h-12 rounded-pill px-6 text-label font-medium transition-[background-color,color,border-color,box-shadow,transform] duration-300 ease-out-expo active:scale-[0.97] ${
                isSelected
                  ? "bg-purple text-ink shadow-pill"
                  : "border border-line-strong text-fg hover:-translate-y-0.5 hover:border-transparent hover:bg-lavender-soft hover:text-ink"
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
          className="mt-9 rounded-xl"
        >
          {/* Keyed on selection so the incoming panel plays its entrance each
              time; a CSS keyframe rather than a scroll reveal, because a
              reveal inside a panel that mounts later is exactly the kind of
              block an observer can miss. */}
          {index === selected ? (
            <div key={`shown-${selected}`} className="animate-rise-in">
              {item.panel}
            </div>
          ) : (
            item.panel
          )}
        </div>
      ))}
    </div>
  );
}
