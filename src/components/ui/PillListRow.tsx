import { CircleArrow } from "./CircleArrow";

type PillListRowProps = {
  label: string;
  href: string;
  className?: string;
};

/**
 * The hairline product row from reference image 4. The whole row is the link,
 * so the target is the full 68px band rather than the words alone. On hover the
 * fill sweeps in from the left, in the direction the arrow points.
 */
export function PillListRow({ label, href, className = "" }: PillListRowProps) {
  return (
    <a
      href={href}
      className={`fill-wipe fill-wipe-x group flex items-center justify-between gap-6 rounded-pill border border-hairline py-2.5 pl-7 pr-2.5 transition-[color,transform] duration-200 ease-out-quint hover:text-ink active:scale-[0.99] ${className}`}
    >
      <span className="text-body-sm font-medium transition-transform duration-300 ease-out-quint group-hover:translate-x-1">
        {label}
      </span>
      <CircleArrow tone="lavender" className="group-hover:translate-x-0.5" />
    </a>
  );
}
