import { AppleGlyph, PlayGlyph } from "../../assets/icons";

/**
 * Store links.
 *
 * These point at each store's search results for the bank, which are real,
 * working URLs. Swap them for the two direct listing URLs before launch, and
 * swap the marks for Apple's and Google's official badge artwork at the same
 * time; both companies require their own assets rather than a redrawn glyph.
 */
const stores = [
  {
    href: "https://play.google.com/store/search?q=Bombay%20Mercantile%20Co-operative%20Bank&c=apps",
    Glyph: PlayGlyph,
    lead: "Get it on",
    name: "Google Play",
  },
  {
    href: "https://apps.apple.com/in/search?term=Bombay%20Mercantile%20Co-operative%20Bank",
    Glyph: AppleGlyph,
    lead: "Download on the",
    name: "App Store",
  },
];

export function AppBadges({ tone = "light" }: { tone?: "light" | "dark" }) {
  const shell =
    tone === "light"
      ? "bg-white text-ink shadow-pill hover:shadow-pill-hover"
      : "border border-line-strong text-fg hover:border-transparent hover:bg-lavender-soft hover:text-ink";

  return (
    <ul className="flex flex-wrap gap-3">
      {stores.map((store) => (
        <li key={store.name}>
          <a
            href={store.href}
            target="_blank"
            rel="noreferrer noopener"
            className={`flex h-14 items-center gap-3 rounded-pill px-6 transition-[background-color,color,border-color,box-shadow,transform] duration-300 ease-out-expo hover:-translate-y-0.5 active:scale-[0.98] ${shell}`}
          >
            <store.Glyph className="h-6 w-6" />
            <span className="leading-tight">
              <span className="block text-legal">{store.lead}</span>
              <span className="block text-fine font-medium">{store.name}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
