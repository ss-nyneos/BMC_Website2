import type { Config } from "tailwindcss";

/**
 * Token layer, per design spec section 9.
 *
 * Two families of colour live here and they behave differently in dark mode:
 *
 *  - Fixed tokens (purple / mint / lavender / orange / ink / cream):
 *    the literal palette from spec section 2. Accents never invert, so text
 *    sitting on an accent panel is always `ink` or always `white`.
 *
 *    The brand accent is sky blue, not purple. `purple` / `purple-deep` /
 *    `purple-950` are kept as spec role-names but now hold `#3FA9F6` and its
 *    shades; every panel that used them carries `ink` text, the same pairing
 *    `mint` and `lavender` already use. `purple-950` is LIGHTER than DEFAULT,
 *    not darker: at this hue, darkening costs the ink contrast the footer's
 *    small print needs. `forest` is the one dark tone in the family, for accent
 *    icons and links that sit on a light background.
 *    There is no longer a second, deeper royal blue: the old `blue` (#2E68F0)
 *    token is gone and every panel that used it now takes `purple`, so the site
 *    carries one blue. `blue` survives only as a tone ROLE-NAME in component
 *    props and data, the way `ColorCard`'s already did; it resolves to the
 *    brand sky blue and therefore to `ink` text, never `white`.
 *    `sage` is a second, lighter green used only on the third pillar card,
 *    alongside `mint` on the second — the trio reads gold / mint / pale mint.
 *
 *  - Semantic tokens (page / surface / field / fg / fg-muted / line):
 *    CSS-variable driven, defined in styles/globals.css. These carry the
 *    neutral inversion described in the dark-mode table, so a component
 *    written once reads correctly in both themes without `dark:` prefixes.
 */
const rgb = (name: string) => `rgb(var(${name}) / <alpha-value>)`;

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: { DEFAULT: "#3FA9F6", deep: "#3998DD", 950: "#5AB5F7" },
        lavender: { DEFAULT: "#C2E3FC", soft: "#E0F1FE" },
        mint: { DEFAULT: "#8CE6A6", deep: "#57C97F" },
        sage: "#DFF6E4",
        forest: "#18405D",
        // The deep blue of the sections carried over from bmc_website2, as a fixed
        // colour for surfaces outside them that must match: the footer and the
        // hero's brand block. Takes white text; it does not invert in dark mode.
        navy: { DEFAULT: "#0B4DA2", mid: "#0A3D7C", deep: "#062B5B" },
        orange: { DEFAULT: "#EF5F2A", deep: "#D44E1E" },
        cream: { DEFAULT: "#F3EEE8", input: "#F7F3EE" },
        ink: { DEFAULT: "#140A2E", muted: "#6B6480" },

        page: rgb("--page"),
        surface: rgb("--surface"),
        field: rgb("--field"),
        fg: { DEFAULT: rgb("--fg"), muted: rgb("--fg-muted") },

        // The homepage sections carried over from bmc_website2 keep that
        // design's own palette: a deep navy brand, grey surfaces and a near-black
        // ink. Namespaced so none of it collides with the tokens above; values
        // live in globals.css and invert under `.dark`.
        bmc: {
          brand: rgb("--bmc-brand"),
          "brand-mid": rgb("--bmc-brand-mid"),
          "brand-deep": rgb("--bmc-brand-deep"),
          accent: rgb("--bmc-accent"),
          "accent-soft": rgb("--bmc-accent-soft"),
          page: rgb("--bmc-page"),
          card: rgb("--bmc-card"),
          surface: rgb("--bmc-surface"),
          "surface-alt": rgb("--bmc-surface-alt"),
          tint: rgb("--bmc-tint"),
          ink: rgb("--bmc-ink"),
          "ink-muted": rgb("--bmc-ink-muted"),
          "ink-subtle": rgb("--bmc-ink-subtle"),
          "ink-disabled": rgb("--bmc-ink-disabled"),
          line: rgb("--bmc-line"),
          "line-strong": rgb("--bmc-line-strong"),
          "on-brand-muted": rgb("--bmc-on-brand-muted"),
          danger: rgb("--bmc-danger"),
        },
      },
      fontFamily: {
        sans: ['"Helvetica Neue"', "Helvetica", "Arial", "sans-serif"],
      },
      fontSize: {
        // Spec section 3: hard bounds 12px min / 38px max at every breakpoint.
        // clamp() carries the "step down below md" rule without media queries;
        // every min/max below sits inside 12-38.
        display: ["clamp(30px, 3.7vw, 38px)", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "700" }],
        h2: ["clamp(26px, 3.1vw, 32px)", { lineHeight: "1.10", letterSpacing: "-0.01em", fontWeight: "700" }],
        h3: ["clamp(22px, 2.5vw, 28px)", { lineHeight: "1.15", letterSpacing: "-0.01em", fontWeight: "700" }],
        body: ["clamp(18px, 1.7vw, 24px)", { lineHeight: "1.45" }],
        "body-sm": ["clamp(17px, 1.4vw, 20px)", { lineHeight: "1.50" }],
        label: ["18px", { lineHeight: "1.40", fontWeight: "500" }],
        meta: ["16px", { lineHeight: "1.40" }],
        fine: ["14px", { lineHeight: "1.45" }],
        legal: ["12px", { lineHeight: "1.50", letterSpacing: "0.01em" }],
        // The one size outside the 12-38px bounds, at the client's request: the
        // homepage hero headline only. Capped at 96px so the page is loud once,
        // not shouting; the floor keeps "BHAROSA WOHI." on one line at 360px.
        hero: ["clamp(2rem, 6.6vw, 6rem)", { lineHeight: "0.92", letterSpacing: "-0.02em", fontWeight: "700" }],
        // bmc_website2's scale: fixed steps rather than clamps, body at 24px,
        // headings at weight 500. Display and h2 step down below 768px through
        // the variables in globals.css.
        "bmc-display": [
          "var(--bmc-display)",
          { lineHeight: "var(--bmc-display-lh)", letterSpacing: "-0.02em", fontWeight: "500" },
        ],
        "bmc-h2": ["var(--bmc-h2)", { lineHeight: "var(--bmc-h2-lh)", letterSpacing: "-0.01em", fontWeight: "500" }],
        "bmc-h3": ["1.75rem", { lineHeight: "2.375rem", fontWeight: "500" }],
        "bmc-body": ["1.5rem", { lineHeight: "var(--bmc-body-lh)" }],
        "bmc-body-sm": ["1.25rem", { lineHeight: "1.875rem" }],
        "bmc-data": ["1rem", { lineHeight: "1.5rem", letterSpacing: "0.01em" }],
        "bmc-caption": ["0.75rem", { lineHeight: "1.125rem", letterSpacing: "0.02em" }],
      },
      borderRadius: {
        pill: "9999px",
        "2xl": "32px",
        xl: "24px",
        lg: "16px",
        "bmc-lg": "0.5rem",
        "bmc-xl": "0.75rem",
        "bmc-2xl": "1rem",
        "bmc-3xl": "1.5rem",
      },
      // Depth is layered, never a single wide blur and never paired with a
      // border. Values live in globals.css so they can change per theme.
      //  card        white surface cards at rest
      //  card-hover  the same card lifted under the pointer
      //  inset       accent panels: an inner edge and a soft floor shadow
      //  inset-hover an accent card (a link) lifted under the pointer
      //  pill        white and sky pills that sit on colour
      boxShadow: {
        menu: "0 12px 40px rgba(20,10,46,0.14)",
        card: "var(--shadow-card)",
        "card-hover": "var(--shadow-card-hover)",
        inset: "var(--shadow-inset)",
        "inset-hover": "var(--shadow-inset-hover)",
        pill: "var(--shadow-pill)",
        "pill-hover": "var(--shadow-pill-hover)",
      },
      maxWidth: { container: "1280px", measure: "34ch", prose: "62ch" },
      // The alpha lives in the variable, not in <alpha-value>: through the rgb()
      // helper `border-line` rendered as solid ink, which is what drew the black
      // outline around every white card.
      borderColor: {
        line: "rgb(var(--line) / var(--line-alpha))",
        "line-strong": "rgb(var(--line) / var(--line-strong-alpha))",
      },
      spacing: { 13: "3.25rem", 18: "4.5rem", 30: "7.5rem" },
      zIndex: {
        // Semantic scale. No arbitrary 999s anywhere in the codebase.
        base: "0",
        raised: "10",
        sticky: "30",
        drawer: "40",
        scrim: "50",
        modal: "60",
        toast: "70",
      },
      transitionTimingFunction: {
        "out-quint": "cubic-bezier(0.22, 1, 0.36, 1)",
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        standard: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      keyframes: {
        "rise-in": {
          from: { opacity: "0", transform: "translate3d(0,14px,0)" },
          to: { opacity: "1", transform: "translate3d(0,0,0)" },
        },
        "pop-in": {
          from: { opacity: "0", transform: "scale(0.92)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "scrim-in": { from: { opacity: "0" }, to: { opacity: "1" } },
        "pop-spin": {
          from: { opacity: "0", transform: "scale(0.86) rotate(-8deg)" },
          to: { opacity: "1", transform: "scale(1) rotate(0deg)" },
        },
        "page-in": {
          from: { opacity: "0", transform: "translate3d(0,10px,0)" },
          to: { opacity: "1", transform: "translate3d(0,0,0)" },
        },
        bob: {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,5px,0)" },
        },
      },
      // Entrances fill `backwards`, not `both`: once they finish, the element
      // falls back to its own styles, so hover transforms still work on it.
      animation: {
        "rise-in": "rise-in 620ms cubic-bezier(0.22, 1, 0.36, 1) both",
        "pop-in": "pop-in 520ms cubic-bezier(0.22, 1, 0.36, 1) both",
        "scrim-in": "scrim-in 180ms ease-out both",
        "pop-spin": "pop-spin 900ms cubic-bezier(0.16, 1, 0.3, 1) backwards",
        "page-in": "page-in 420ms cubic-bezier(0.16, 1, 0.3, 1) backwards",
        bob: "bob 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
