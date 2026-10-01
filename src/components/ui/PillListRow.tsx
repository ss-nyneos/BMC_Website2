import { CircleArrow } from "./CircleArrow";

type PillListRowProps = {
  label: string;
  href: string;
  className?: string;
};

/**
 * The hairline product row from reference image 4. The whole row is the link,
 * so the target is the full 68px band rather than the words alone.
 */
export function PillListRow({ label, href, className = "" }: PillListRowProps) {
  return (
    <a
      href={href}
      className={`group flex items-center justify-between gap-6 rounded-pill border border-line py-2.5 pl-7 pr-2.5 transition-colors duration-200 ease-out-quint hover:bg-lavender-soft hover:text-ink ${className}`}
    >
      <span className="text-body-sm font-medium">{label}</span>
      <CircleArrow tone="lavender" className="group-hover:translate-x-0.5" />
    </a>
  );
}
