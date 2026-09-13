import type { ReactNode } from "react";

type SectionHeadingProps = {
  title: ReactNode;
  description?: ReactNode;
  /** Heading level. Pick for document structure, not for size. */
  as?: "h1" | "h2" | "h3";
  /** Visual size, chosen independently of the level above. */
  size?: "display" | "h2" | "h3";
  id?: string;
  className?: string;
  /** Muted description colour, for use on light panels only. */
  tone?: "default" | "on-colour";
};

/**
 * Heading plus optional standfirst, left aligned. Spec section 6.5.
 *
 * There is deliberately no eyebrow slot. A small tracked label above every
 * section heading is the scaffold the spec rules out, and leaving it out of the
 * API means it cannot creep back in section by section.
 */
export function SectionHeading({
  title,
  description,
  as: Tag = "h2",
  size = "h2",
  id,
  className = "",
  tone = "default",
}: SectionHeadingProps) {
  const sizes = { display: "text-display", h2: "text-h2", h3: "text-h3" };

  return (
    <div className={`max-w-prose ${className}`}>
      <Tag id={id} className={sizes[size]}>
        {title}
      </Tag>
      {description ? (
        <p
          className={`mt-5 text-body ${tone === "on-colour" ? "text-current/85" : "text-fg-muted"}`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
