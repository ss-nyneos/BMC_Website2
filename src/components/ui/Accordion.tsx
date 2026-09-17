import { useId, useState, type ReactNode } from "react";
import { MinusIcon, PlusIcon } from "../../assets/icons";

export type AccordionItemData = {
  title: string;
  content: ReactNode;
};

/**
 * `rules` separates items with hairlines, for dense lists such as navigation.
 * `cards` sets each item on its own white card with a blue and green toggle, for
 * long-form answers where each question should read as a unit.
 */
export type AccordionVariant = "rules" | "cards";

type AccordionProps = {
  variant?: AccordionVariant;
  items: AccordionItemData[];
  /** Index open on first render. Leave undefined for all closed. */
  defaultOpen?: number;
  className?: string;
};

/**
 * Disclosure list for the FAQ and the mobile navigation groups.
 *
 * Height is animated with the 0fr to 1fr grid-rows technique, which is the one
 * place a layout property is worth animating: the alternative is measuring the
 * panel in JavaScript on every resize. Under reduced motion the transition
 * duration collapses to nothing via the global rule in globals.css.
 */
export function AccordionItem({
  item,
  isOpen,
  onToggle,
  id,
  variant = "rules",
}: {
  item: AccordionItemData;
  isOpen: boolean;
  onToggle: () => void;
  id: string;
  variant?: AccordionVariant;
}) {
  const cards = variant === "cards";

  return (
    <div
      className={
        cards
          ? `group spotlight spotlight-surface rounded-xl bg-surface px-5 transition-[box-shadow] duration-500 ease-out-expo sm:px-7 ${
              isOpen ? "shadow-card-hover" : "shadow-card hover:shadow-card-hover"
            }`
          : "border-b border-line"
      }
    >
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`${id}-panel`}
          id={`${id}-trigger`}
          className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors duration-200 hover:text-forest dark:hover:text-lavender"
        >
          <span className="text-body-sm font-medium">{item.title}</span>
          <span
            aria-hidden="true"
            className={
              cards
                ? `grid h-10 w-10 shrink-0 place-items-center rounded-pill text-ink transition-[background-color,transform] duration-500 ease-out-expo ${
                    isOpen
                      ? "rotate-180 bg-purple"
                      : "bg-sage group-hover:-rotate-[10deg] group-hover:scale-110"
                  }`
                : `grid h-9 w-9 shrink-0 place-items-center rounded-pill border transition-colors duration-200 ${
                    isOpen
                      ? "border-forest bg-forest text-white"
                      : "border-line bg-lavender-soft text-forest"
                  }`
            }
          >
            {isOpen ? <MinusIcon className="h-4 w-4" /> : <PlusIcon className="h-4 w-4" />}
          </span>
        </button>
      </h3>

      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-trigger`}
        className={`grid transition-[grid-template-rows] duration-300 ease-out-quint ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="max-w-prose pb-7 text-body-sm text-fg-muted">{item.content}</div>
        </div>
      </div>
    </div>
  );
}

export function Accordion({
  items,
  defaultOpen,
  className = "",
  variant = "rules",
}: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen ?? null);
  const baseId = useId();

  return (
    <div className={className}>
      {items.map((item, index) => (
        <AccordionItem
          key={item.title}
          id={`${baseId}-${index}`}
          item={item}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          variant={variant}
        />
      ))}
    </div>
  );
}
