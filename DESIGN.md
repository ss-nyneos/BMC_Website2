# BMC Bank design system

The visual system as built. Tokens live in `tailwind.config.ts`; the neutral
inversion lives in `src/styles/globals.css`.

## Colour: two families

**Fixed accents.** purple, purple-deep, purple-950, lavender, lavender-soft,
mint, mint-deep, sage, forest, orange, orange-deep, ink, ink-muted, cream.
These are identical in light and dark mode. Text on an accent panel is
therefore always the fixed `ink` or literal `white`, never a semantic token.

`purple` / `purple-deep` / `purple-950` and `lavender` / `lavender-soft` are
kept as spec role-names but hold the brand sky blue, `#3FA9F6`, and its tints —
not a literal purple. `forest` is a dark shade of the same blue, for icons and
inline links that sit directly on white or cream rather than on a blue panel.
`sage` is a paler green used only on the third pillar card.

One blue, everywhere. `#3FA9F6` is the brand accent and always takes `ink`
text. The deeper royal blue that used to sit beside it (`#2E68F0`) has been
removed from the palette: the two were close enough in hue to read as an
inconsistency rather than a pair, and every panel that carried the royal blue
now draws `purple`. `blue` survives only as a tone role-name on component props
and in `src/data`, resolving to the brand sky blue — the same way `ColorCard`'s
`blue` role-name has always drawn `sage`.

`purple-950` is **lighter** than `purple`, not darker. At this hue, darkening
costs contrast faster than it gains depth, and the footer's 14px small print
needs the headroom: `ink/75` on the footer tone clears 4.5:1, on a darker blue
it does not.

**Semantic neutrals.** `page`, `surface`, `field`, `fg`, `fg-muted`, `line`.
CSS-variable driven, so they invert under `.dark` and a component written once
reads correctly in both themes with no `dark:` prefixes.

The page is white in light mode and `#0E0722` in dark. `page` and `surface` are
therefore the same colour in light mode and diverge in dark, which is why any
inset white panel carries a hairline: without it the panel would have no edge
against a white page. Cream survives in the palette as the form-field fill,
where it carries the brand's warmth without tinting the whole page.

The mistake this split prevents: using `text-fg` on a lavender panel. In dark
mode `fg` becomes cream and the text disappears against an accent that did not
invert. `TwoToneText` carries a `tone` prop for exactly this reason.

### Pairings

| Background | Text |
|---|---|
| purple, purple-950, mint, lavender, sage | `ink` (body copy at `ink/80`) |
| page, surface | `fg` |
| orange | markers only, never a text surface |
| ink | `white` (pill buttons only) |

No accent panel carries `white` body text any more. `#3FA9F6` does not clear
4.5:1 against white, so the removal of the royal blue took the `white`-on-accent
pairing with it. The `on-dark` utility — which swaps the focus ring to a white
halo where a page-coloured halo would be invisible — is consequently unused, and
stays in `globals.css` only for a future dark surface. Every accent panel carries
a `border border-line` hairline, because each sits close enough to white in
luminance that the panel edge needs drawing against the page — the same reasoning
that gives dark-mode white panels a hairline.

## Logo

`public/bmc-logo.png` (230x322) is the bank's supplied artwork: the arch crest
with the two figures, and the bank's name beneath it. It is placed, never
redrawn. The source upload was a screenshot with 26-51px of white margin; the
shipped file is cropped to the artwork and halved to 2x its largest rendered
size, which took it from 318KB to 86KB.

Two properties of the file drive how `Logo` renders it:

**It is opaque, on a white field.** Every sampled pixel is alpha 255. There is
no transparency to rely on, and keying white out would punch holes through the
dupatta, the dhoti and the interior of the arch. So the logo always sits on a
white plate. On the white page that plate is invisible; on the footer's blue and
on the dark-mode page it reads as a card, which is the ordinary way to place a
full-colour logo on a coloured surface. Unconditional on purpose: one rendering
that is correct everywhere beats a `dark:` branch.

**The name is part of the artwork, not live text.** Those three lines only
resolve at roughly 150px of height. The logo is rendered at 64-96px, so at the
sizes actually used the name is decorative and the crest does the identifying.
That is a deliberate choice: the header stays compact, and the accessible name
is carried by `alt` when the logo stands alone, or by the wrapping link's
`aria-label` when it does not, so it is never announced twice.

There is no text lockup beside the logo, because the artwork already contains
the name and setting it again would print it twice.

## Type

One family: Helvetica Neue, Helvetica, Arial. Nine tokens, all inside the
12 to 38px bounds. Headings use `clamp()` so they step down on small screens
without media queries and without leaving the bounds at any width.

`display` 38 · `h2` 32 · `h3` 28 · `body` 24 · `body-sm` 20 · `label` 18 ·
`meta` 16 · `fine` 14 · `legal` 12.

No all-caps eyebrows. `SectionHeading` has no eyebrow slot at all, so the
pattern cannot creep back in section by section.

## Shape and depth

Radius: `pill` 9999 · `2xl` 32 · `xl` 24 · `lg` 16.

Flat by default. `shadow-menu` exists for dropdowns, the drawer and modals.
Nothing else takes a shadow. Structure comes from colour blocks and hairlines.

## Motion

- Hero: one orchestrated entrance, staggered by `animation-delay`.
- Marquee: continuous, pauses on hover and focus-within, static under reduced
  motion.
- `TwoToneText`: optional scroll-linked fill, static two-tone otherwise.
- Everything else: interaction motion only.

`useReveal` adds `js-motion` to `<html>` only when motion is permitted, and that
class is what arms the hidden start state. Without JS, under reduced motion, or
in a headless render, every `.reveal` block ships plainly visible.

## Navigation

There is no top header. Navigation is a fixed rail on the right edge plus the
drawer it opens; the former utility bar and two-row header are gone, and the
logo simply sits on the page with no rule under it.

The rail (`SideRail`, 4.5rem) always carries the menu toggle, the announcement
ticker, Net Banking, contact, the theme toggle and the language switch. The
shell reserves the rail's width as padding rather than letting it overlay the
page: a fixed overlay would cover the last column of every table on the site.

The ticker is real text in `writing-mode: vertical-rl`, not an image and not a
rotate transform, so it stays selectable, translatable and correctly ordered for
a screen reader. Its strings are kept short on purpose — in a vertical writing
mode a string longer than the viewport is tall wraps into a second column and
strands its last word. Below `md` the ticker drops and the controls remain.

The drawer (`SideDrawer`) has two registers: five destinations set at `h3`, then
a hairline list where groups expand in place. It reuses `footerGroups`, so the
site's full structure is defined once.

Three things in it are worth not re-deriving:

- Layering runs scrim (50) below panel and rail (both 60). The rail must sit
  above the scrim because the control that closes the drawer lives in it.
- The closed panel is taken out of the tab order with `inert`, set in a
  `useLayoutEffect` so it lands before the focus trap runs. It used to use
  `visibility: hidden`, which broke focus: the class flips a frame or more
  before the computed style does, and `.focus()` on a still-hidden element is a
  silent no-op, so the drawer opened with focus stranded on the toggle.
- The closed transform is `translateX(100% + rail)`, not `translate-x-full`.
  Tailwind's utility moves the panel by its own width only, which parks its left
  edge at the rail's inner edge and leaves a rail-width strip of drawer on
  screen. Its width is `calc(100% - rail)` for the same reason.

`useFocusTrap`'s escape handler is a dependency of its own effect, and its
teardown restores focus to the trigger, so the handler passed in must be
`useCallback`-stable or the trap re-runs on every render and bounces focus out.

## Numbers

Numbered markers appear in exactly two places, both genuine sequences: the
account-opening timeline and the digital banking stages. They are not used as
section scaffolding anywhere else.

## Pages and routing

Seven routes, resolved by `src/router.tsx` — a history subscription plus one
document-level click handler, and no routing dependency. The click handler is
why the navbar, drawer and footer index were not rewritten: every `<a href="/…">`
already in them becomes a client-side navigation, while external hosts, `tel:`,
`mailto:`, in-page hashes, downloads and modified clicks fall through to the
browser untouched.

| Route | Page |
|---|---|
| `/` | Homepage |
| `/contact` | Contact and the 53-branch directory |
| `/accounts/deposit-rates` | Domestic, NRO, NRE and FCNR(B) rates |
| `/accounts/dea-fund` | Unclaimed deposits under the DEAF scheme |
| `/resources/faq` | Frequently asked questions |
| `/resources/gst` | GST registration numbers |
| `/resources/shareholder` | Shareholder and membership figures |
| `/loans/interest-rates` | Prime Lending Rate and headline product rates |
| `/loans/term-loans` | The full borrowing range |
| `/loans/other` | Personal loans and lending against securities |
| `/loans/working-capital` | Overdraft facilities for businesses |

Anything else renders `NotFoundPage`, which lists the routes that do exist —
most of the footer index is not built yet and lands there.

Inner pages open with `PageHeader`. The header stays on the page background —
still no full coloured panel above a rate table — but it carries an optional
circular photograph (`photo` / `photoField`), so every inner page has a face and
a spot of accent without spending the gold twice. `<main>` is keyed on the path
so each page mounts clean, and `useReveal` re-runs per route — without that,
`js-motion` would leave a newly-mounted page's `.reveal` blocks hidden.

Colour on the inner pages then comes from three shared blocks, all built from the
same tokens as the homepage's split panels and never a semantic `fg` token on a
fixed accent:

- `MediaPanel` — a circular photo on a `purple` / `mint` / `sage` field, the
  media half of `SplitPanel` lifted out. Used in the loan and deposit pages'
  two-column sections where a text column would otherwise leave dead space.
- `CalloutPanel` — the colour-blocked closing block (heading, one line, a pill),
  replacing the hairline-bordered white boxes the pages used to end on. Tones
  rotate `mint` / `sage` so the closing panel never merges with the sky-blue
  footer; body copy is `ink/80` on every tone.
- One saturated feature panel per page where it earns it: the Prime Lending Rate
  and the DEA-fund claim steps on `purple`, the shareholder figures on the
  homepage's gold / mint / pale-mint trio, the loan-product and self-service
  cards on `lavender-soft`.

These are deliberately not on `Section bg=` — the accent lives in panels whose
text tokens are controlled, not in a full-bleed section where an inherited
`fg-muted` would invert away from the panel in dark mode.

Data tables live in `DataTable`, which puts every table in its own labelled,
focusable scroll container. The page body never scrolls sideways; a four-column
rate table at 360px does.

## The Prime Lending Rate

The live site publishes two different Prime Lending Rates. `interest-rates.php`
carries 8.50% with effect from 11 June 2025, citing circular 85-88/CAD/HO/514.
`termloan.php`, `other-loans.php` and `working-capital-facilities.php` all still
print 14% with effect from 1 May 2019 — three pages that were never revisited
when the rate moved.

This site states the rate once, in `primeLendingRate` in `data/loans.ts`, at the
newer figure, and every loans page reads it from there. The 2019 figure is not
reproduced anywhere. A bank publishing one lending rate that needs verifying is
recoverable; a bank publishing two is not.

The full rate card is issued as a circular that the live page names in plain
text and never links, so there is no document to point at. The rates page says
so plainly rather than implying the schedule is online.

## Accessibility floor

Verified in-browser in both themes at 360, 390, 768, 1280 and 1440:

- Zero text/background pairs below WCAG AA.
- No interactive target under 44px.
- No type outside 12 to 38px.
- Single h1, no heading-level skips.
- Every image has alt text and intrinsic dimensions.
- Visible focus ring on every focusable element.
- No horizontal overflow at any tested width.
