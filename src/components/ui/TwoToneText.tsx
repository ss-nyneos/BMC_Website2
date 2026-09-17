import { useScrollProgress } from "../../hooks/useScrollProgress";

type TwoToneTextProps = {
  text: string;
  /** The substring that begins the muted half. Everything before it stays ink. */
  split: string;
  /** Opt in to the scroll-linked fill. Static two-tone is the default. */
  scrollFill?: boolean;
  /**
   * `page` follows the theme. `ink` is fixed dark, for the accent panels
   * (lavender, mint) whose colour does not invert in dark mode.
   */
  tone?: "page" | "ink";
  className?: string;
};

/**
 * The large statement paragraph from reference image 2: the opening clause in
 * full ink, the remainder muted.
 *
 * With `scrollFill`, the muted half warms toward ink word by word as the block
 * crosses the viewport. useScrollProgress reports a flat 1 under reduced
 * motion, so that path renders the finished, fully-legible state immediately
 * rather than a permanently half-faded paragraph.
 */
/**
 * Keeps hyphenated words such as "co-operative" on one line. Browsers treat the
 * hyphen as a break opportunity, and at display size a line ending in "co-"
 * reads as a typo.
 */
function unbreakable(text: string) {
  return text.split(/(\S+-\S+)/).map((part, index) =>
    index % 2 ? (
      <span key={index} className="whitespace-nowrap">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

const palettes = {
  page: { lead: "text-fg", trail: "text-fg-muted", from: "rgb(var(--fg-muted))", to: "rgb(var(--fg))" },
  ink: { lead: "text-ink", trail: "text-ink-muted", from: "#6B6480", to: "#140A2E" },
} as const;

export function TwoToneText({
  text,
  split,
  scrollFill = false,
  tone = "page",
  className = "",
}: TwoToneTextProps) {
  const palette = palettes[tone];
  const { ref, progress } = useScrollProgress<HTMLParagraphElement>();

  const at = text.indexOf(split);
  const lead = at === -1 ? text : text.slice(0, at);
  const trail = at === -1 ? "" : text.slice(at);
  const trailWords = trail.split(" ").filter(Boolean);

  // A short lead-in of extra progress means the first muted word starts filling
  // as soon as the block is properly in view, not only at the very end.
  const filled = progress * (trailWords.length + 6);

  return (
    <p ref={ref} className={`text-display ${className}`}>
      <span className={palette.lead}>{unbreakable(lead)}</span>
      {trailWords.map((word, index) => {
        const amount = scrollFill ? Math.min(1, Math.max(0, filled - index)) : 0;
        return (
          <span
            key={`${word}-${index}`}
            className={palette.trail}
            style={
              scrollFill
                ? {
                    color: `color-mix(in oklab, ${palette.from} ${(1 - amount) * 100}%, ${
                      palette.to
                    } ${amount * 100}%)`,
                  }
                : undefined
            }
          >
            {unbreakable(word)}
            {index < trailWords.length - 1 ? " " : ""}
          </span>
        );
      })}
    </p>
  );
}
