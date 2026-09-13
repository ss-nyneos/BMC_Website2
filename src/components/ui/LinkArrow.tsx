import { CircleArrow, type ArrowTone } from "./CircleArrow";

type LinkArrowProps = {
  href: string;
  children: string;
  tone?: ArrowTone;
  className?: string;
  external?: boolean;
};

/**
 * Text link with a small trailing arrow chip, for footers and inline calls to
 * action. The label is written to stand on its own out of context, since screen
 * readers can list links without their surrounding sentence.
 */
export function LinkArrow({ href, children, tone = "lavender", className = "", external }: LinkArrowProps) {
  return (
    <a
      href={href}
      className={`group inline-flex min-h-11 items-center gap-2.5 rounded-pill py-1.5 text-label font-medium transition-opacity duration-200 hover:opacity-80 ${className}`}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
    >
      <span className="underline decoration-transparent underline-offset-4 transition-colors duration-200 group-hover:decoration-current">
        {children}
      </span>
      <CircleArrow tone={tone} size="sm" className="group-hover:translate-x-0.5" />
    </a>
  );
}
