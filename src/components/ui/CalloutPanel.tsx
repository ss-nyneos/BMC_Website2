import type { ReactNode } from "react";

type CalloutTone = "purple" | "mint" | "sage" | "lavender" | "blue";

type CalloutPanelProps = {
  /** Heading id, for the wrapping section's `aria-labelledby`. */
  id?: string;
  title: ReactNode;
  children?: ReactNode;
  /** Pill buttons or LinkArrows. */
  actions?: ReactNode;
  tone?: CalloutTone;
  className?: string;
};

/**
 * The colour-blocked panel that closes an inner page: a heading, a line of
 * copy, and the way onward.
 *
 * It replaces the hairline-bordered white boxes the inner pages used to end on.
 * Structure is the colour block and the pill. Every tone carries the inner
 * shadow rather than an outline: they all sit close to white in luminance, so
 * the panel edge needs drawing against the page, and an inset edge does that
 * without the hard line. It pops in as it scrolls into view.
 *
 * Body copy sits at `ink/80` on every tone, never a semantic `fg` token: those
 * invert in dark mode against an accent that does not. `blue` is a role-name
 * that now draws the same sky-blue panel as `purple`.
 */
const tones: Record<CalloutTone, { panel: string; body: string }> = {
  purple: { panel: "bg-purple text-ink", body: "text-ink/80" },
  mint: { panel: "bg-mint text-ink", body: "text-ink/80" },
  sage: { panel: "bg-sage text-ink", body: "text-ink/80" },
  lavender: { panel: "bg-lavender text-ink", body: "text-ink/80" },
  blue: { panel: "bg-purple text-ink", body: "text-ink/80" },
};

export function CalloutPanel({
  id,
  title,
  children,
  actions,
  tone = "purple",
  className = "",
}: CalloutPanelProps) {
  const t = tones[tone];

  return (
    <div
      className={`reveal-pop overflow-hidden rounded-2xl p-8 shadow-inset sm:p-10 lg:p-12 ${t.panel} ${className}`}
    >
      <div className="max-w-prose">
        <h2 id={id} className="text-h3">
          {title}
        </h2>
        {children ? <div className={`mt-4 text-body-sm ${t.body}`}>{children}</div> : null}
      </div>

      {actions ? (
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">{actions}</div>
      ) : null}
    </div>
  );
}
