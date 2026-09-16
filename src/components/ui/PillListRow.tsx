import { CircleArrow } from "./CircleArrow";

type PillListRowProps = {
  label: string;
  href: string;
  className?: string;
};

/**
 * The hairline product row from reference image 4. The whole row is the link,
 * so the target is the full 68px band rather than the words alone.
 *
 * On hover a pale-blue fill sweeps in from the left behind the label, the label
 * steps right, and the arrow chip plays its travel. The sweep is a scaled
 * pseudo-element, so nothing reflows.
 */
export function PillListRow({ label, href, className = "" }: PillListRowProps) {
  return (
    <a
      href={href}
      className={`group relative isolate flex items-center justify-between gap-6 overflow-hidden rounded-pill border border-line-strong py-2.5 pl-7 pr-2.5 transition-[color,border-color] duration-500 ease-out-expo before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:rounded-pill before:bg-lavender-soft before:transition-transform before:duration-500 before:ease-out-expo hover:border-transparent hover:text-ink hover:before:scale-x-100 ${className}`}
    >
      <span className="text-body-sm font-medium transition-transform duration-500 ease-out-expo group-hover:translate-x-1.5">
        {label}
      </span>
      <CircleArrow tone="lavender" />
    </a>
  );
}
