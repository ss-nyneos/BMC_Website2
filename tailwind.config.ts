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
        orange: { DEFAULT: "#EF5F2A", deep: "#D44E1E" },
        cream: { DEFAULT: "#F3EEE8", input: "#F7F3EE" },
        ink: { DEFAULT: "#140A2E", muted: "#6B6480" },

        page: rgb("--page"),
        surface: rgb("--surface"),
        field: rgb("--field"),
        fg: { DEFAULT: rgb("--fg"), muted: rgb("--fg-muted") },
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
      },
      borderRadius: { pill: "9999px", "2xl": "32px", xl: "24px", lg: "16px" },
      boxShadow: { menu: "0 12px 40px rgba(20,10,46,0.14)" },
      maxWidth: { container: "1280px", measure: "34ch", prose: "62ch" },
      borderColor: { line: rgb("--line") },
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
      },
      animation: {
        "rise-in": "rise-in 620ms cubic-bezier(0.22, 1, 0.36, 1) both",
        "pop-in": "pop-in 520ms cubic-bezier(0.22, 1, 0.36, 1) both",
        "scrim-in": "scrim-in 180ms ease-out both",
      },
    },
  },
  plugins: [],
} satisfies Config;
