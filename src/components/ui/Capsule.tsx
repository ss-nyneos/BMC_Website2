type CapsuleProps = {
  /** Tailwind height utilities; the shape is always fully rounded. */
  className?: string;
  tone?: "light" | "lighter";
};

/**
 * Ornamental rounded blob from the hero field (reference image 1).
 *
 * Purely decorative, so it is hidden from assistive technology. The tint is
 * expressed as ink at low opacity so a capsule keeps working if it is ever
 * placed on a different panel colour.
 */
export function Capsule({ className = "", tone = "light" }: CapsuleProps) {
  return (
    <div
      aria-hidden="true"
      className={`rounded-pill ${tone === "light" ? "bg-ink/[0.08]" : "bg-ink/[0.05]"} ${className}`}
    />
  );
}
