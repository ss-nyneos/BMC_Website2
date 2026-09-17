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

Two blues, with separate jobs. `#3FA9F6` is the accent on inner pages and
always takes `ink` text. `navy` (`#0B4DA2`) is the deep blue of the homepage
sections carried over from bmc_website2; it also colours the footer and the
hero's brand block, always with `white` text, and does not invert in dark mode. The deeper royal blue that used to sit beside it (`#2E68F0`) has been
removed from the palette: the two were close enough in hue to read as an
inconsistency rather than a pair, and every panel that carried the royal blue
now draws `purple`. `blue` survives only as a tone role-name on component props
and in `src/data`, resolving to the brand sky blue — the same way `ColorCard`'s
`blue` role-name has always drawn `sage`.

`purple-950` is **lighter** than `purple`, not darker. At this hue, darkening
costs contrast faster than it gains depth, and the footer's 14px small print
needed the headroom back when the footer was sky blue. The footer is now
`navy`, where `white/75` clears 4.5:1 with room to spare.

**bmc_website2 tokens.** The homepage below the lending rates uses that
design's own palette and type, namespaced `bmc-` so nothing collides with the
tokens here: `bmc-brand`, `bmc-accent`, `bmc-surface`, `bmc-tint`, `bmc-ink`,
`bmc-line`, `bmc-danger` and the rest, driven by `--bmc-*` variables in
`globals.css` that invert under `.dark`; `text-bmc-display` to
`text-bmc-caption` for type (body 24px, headings weight 500); `rounded-bmc-lg`
to `rounded-bmc-3xl` (8 to 24px). `bg-bmc-card-dark` is the fixed navy gradient
of the dark cards.

**Semantic neutrals.** `page`, `surface`, `field`, `fg`, `fg-muted`, `line`.
CSS-variable driven, so they invert under `.dark` and a component written once
reads correctly in both themes with no `dark:` prefixes.

The page is white in light mode and `#0E0722` in dark. `page` and `surface` are
therefore the same colour in light mode and diverge in dark, which is why any
inset white panel needs an edge drawn for it. That edge is now the 1px ring
inside `shadow-card`, not a border.

`border-line` is a genuine hairline: ink at 12% in light, cream at 14% in dark.
It used to go through the `rgb(var(--line) / <alpha-value>)` helper, which
resolved to alpha 1 and drew a solid black outline round every card; the alpha
now lives in `--line-alpha`. `border-line-strong` (22% / 26%) is for outlines
that mark a control, such as outline pills, product rows and inactive tabs. Cream survives in the palette as the form-field fill,
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
| navy, bmc-card-dark, bmc-brand | `white` (muted copy at `bmc-on-brand-muted`) |

No accent panel carries `white` body text any more. `#3FA9F6` does not clear
4.5:1 against white, so the removal of the royal blue took the `white`-on-accent
pairing with it. The one dark surface is the homepage hero, a photograph under
a `forest` scrim, which takes `on-dark` so focus rings turn white; its pale
panel takes `on-light` to get the ink ring back. Every accent panel carries
`shadow-inset`, because each sits close enough to white in luminance that the
panel edge needs drawing against the page.

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

`hero` is the single exception to the 38px ceiling, used once: the homepage
brand line, uppercase, `clamp(2rem, 6.6vw, 6rem)`. It is capped at 96px, and
the 32px floor keeps "BHAROSA WOHI." on one line at 360px.

No all-caps eyebrows on sections. `SectionHeading` has no eyebrow slot at all,
so the pattern cannot creep back in section by section. The hero is the one
place with tracked uppercase labels (the deposit-insurance line, the brand
block), because the reference it follows is built on them. The headline carries
no label above it: the "Mumbai · Est. 1939 · Ten states" bar was removed at the
client's request.

## Shape and depth

Radius: `pill` 9999 · `2xl` 32 · `xl` 24 · `lg` 16.

Depth is layered and themed. Every value lives in a CSS variable in
`globals.css`, so dark mode can swap in heavier drops and a cream edge ring:

| Token | Used on |
|---|---|
| `shadow-card` / `card-hover` | White surface cards; the hover pair on the ones that are links |
| `shadow-inset` / `inset-hover` | Accent panels and cards: inner edge, top highlight, soft floor shade |
| `shadow-pill` / `pill-hover` | White and sky pills sitting on colour |
| `shadow-menu` | Dropdowns, modals |

No element pairs a border with a shadow. Cards that are not links (the stage
list, the enquiry form, contact cards) take `shadow-card` but no hover lift, so
they never suggest a click that does nothing.

The focus ring is an `outline`, not a box-shadow, because a shadow utility on a
card would otherwise replace the ring outright.

## Motion

No animation library: CSS keyframes, `IntersectionObserver` and one
rAF-throttled scroll listener per effect. One easing for everything that
enters, `ease-out-expo`. Nothing bounces.

**Hero.** An orchestrated entrance: the photograph settles from a slow zoom,
the brand block slides in, each headline line rises out of its own mask, and
the panel wipes up before its contents follow. Then a scroll parallax driven by
one custom property, `--hero-p` (0 → 1 as the hero leaves). The photograph
drifts down at 24% of its own height, the headline lifts and fades, and the
panel stays anchored so the bottom edge never opens a gap.
The photo layer is 116% of the hero's height from −3%, which is what keeps
both of its edges out of view across the whole drift.

**Hero contrast** is measured against the photograph's pixels, not a token
pair: the audit hides the text, screenshots the hero, and takes the
95th-percentile brightest pixel behind each label. The shade that makes it pass
is a radial pool attached to the headline block, so it follows the type at
every breakpoint instead of darkening the whole photograph.

**Scroll reveals**, chosen by what is revealed, never one reflex for every
section:

| Class | Effect | Used on |
|---|---|---|
| `reveal` | rise and fade | headings, text panels |
| `reveal-pop` | rise with slight scale | single panels, the form, callouts |
| `reveal-clip` | opens from a rounded inset | photo panels, the app band |
| `reveal-stagger` | children pop in 70ms apart | card grids, bullet lists, product rows |

The timeline draws itself (dots pop, rails grow down, in step order), and the
lending rates count up the first time they approach the viewport.

**Parallax elsewhere** is `data-parallax="<speed>"` on a wrapper, read by
`useParallax`: 0.05 to 0.08, so a photo drifts about 30px at most. Never put it
on an element that also runs a `transform` entrance.

**Hover and press.** Link cards lift and deepen their shadow; circle photos zoom
inside their ring; the arrow chip sends its arrow out through the far side as a
second one slides in; product rows fill with a sweep from the left; pills lift
and press in. A back-to-top
button pops up past the first screen, with a ring that fills with scroll
progress.

On the inner pages every card answers the pointer, at the client's request, but
only a card that is a link lifts. A card that is not a link tips its icon chip
and carries the pointer spotlight (`.spotlight`, fed `--mx` / `--my` by one
delegated listener in `useSpotlight`), so hover feedback never promises a click
that does nothing.

**Inner-page motion**, all in `globals.css`:

| Class | Effect | Used on |
|---|---|---|
| `chip-float` | pops in after the photo, then floats on a 7s loop | the header fact chips |
| `orbit` | one turn every 48s | the ring and dot round the header photo |
| `bar-grow` | grows from its baseline, row by row, inside a `.reveal` | rate and membership bars |
| `pop-late` | pops in once the bars have grown | the 0.12% marker on the RBI ceiling |
| `spotlight` | a soft light under the pointer | accent and white cards |

The two loops (`chip-float`, `orbit`) are cut to a single zero-length iteration
by the reduced-motion rule, so both sit still.

**Safety rules**, each learned from a failure mode:

- `js-motion` is added to `<html>` only when motion is permitted, and hides a
  block only `:not(.is-in)`. Without JS, under reduced motion, or in a headless
  render, everything ships visible.
- Entrances fill `backwards`, not `both`. A `both` fill holds the final
  keyframe's `transform` forever and silently kills the hover lift on any card
  that was revealed.
- `useReveal` re-runs per route and watches for blocks that mount later with a
  `MutationObserver`. A tab panel uses a keyed keyframe instead of a reveal.
- Under reduced motion the global rule zeroes animation *delays* as well as
  durations; with `backwards` fill, a delay alone would hold an element hidden
  and then snap it in. No parallax listener attaches.
- `CountUp` keeps the real rate in the DOM from first render and only counts
  once the figure approaches the viewport, so a crawler never reads "0.00%".

## Navigation

There is no header bar and no side rail; the page runs edge to edge. Each
page's top row carries Net Banking, "Contact us" and, to the right of them, the
menu trigger: in the homepage hero's own top row, and in the logo row the shell
renders on every other page. Below `lg` on the homepage and below `sm`
elsewhere the pills drop and the trigger stays. The logo row has no rule under
it, so it never reads as a header bar.

The trigger is three bars. On a page it sits in a thin sky-blue ring, drawn off
centre as in the reference, with the bars up and to the left overhanging the
ring and settling into its middle under the pointer. Over the hero photograph
it has no ring, only white bars with a faint white wash on hover, because a ring
muddied the photograph.

Nothing in the navigation is sticky. The trigger scrolls away with the page,
and there is no floating copy once it has gone: the client removed it. A
visitor deep in the page returns to the top (the back-to-top button does it in
one tap) to reach the menu. `SiteMenu` holds the open state, because the trigger
lives inside the page while the sheet is rendered once at the shell.

The menu (`MenuOverlay`) is a full-screen sheet in the brand blue, laid out after
the client's reference: the cut-corner logo block flush top-left, "Open an
account" and Net Banking opposite it, six headline destinations in uppercase
`h2` down the left, and the grouped index (Accounts, Loans, Services, Branches,
Resources) in two columns on the right with every link visible. Under the
headline links sit what the old rail carried: the deposit-insurance line and the
latest notice, the helpline and complaint link, a "Dark theme" switch and the
language switch, named in its own script. Group titles
are labels, not headings, because the sheet precedes the page's h1 in the
document. It reuses `footerGroups`, so the site's full structure is defined
once. Being a fixed accent it stays blue with `ink` text in both themes, and
`on-accent` keeps its focus ring ink in dark mode.

Motion: the sheet drops in from the top (760ms, `ease-out-expo`), the headline
links rise out of their own masks as the hero's lines do, and the groups fade
up after them. It leaves faster (460ms) and its contents hold still until it
has gone. These are transitions, not keyframes, so a toggle mid-flight reverses
from where it is; under reduced motion their delays are zeroed as well.

Things in it worth not re-deriving:

- The close button is a 56px ring pinned top-right, outside the scrolling layer.
  The sheet is `z-modal`. Close is first in the DOM, so opening the menu puts
  focus on it.
- The closed sheet is taken out of the tab order with `inert`, set in a
  `useLayoutEffect` so it lands before the focus trap runs. It used to use
  `visibility: hidden`, which broke focus: the class flips a frame or more
  before the computed style does, and `.focus()` on a still-hidden element is a
  silent no-op, so the menu opened with focus stranded on the toggle.
- Any followed link closes the sheet. A route change would close it anyway, but
  `/#open-an-account` from the homepage is not a route change: `navigate` stays
  silent for a same-page hash, so the sheet scrolls to the target itself.

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
still no full coloured panel above a rate table — and carries, on the right, the
page's photograph in a circle, inside a slowly turning sky-blue ring, with two
fact chips floating over it: the first on `purple`, the second on `mint`. Below
`md` the chips drop into a row under the photo. Above the title sits a
breadcrumb, because there is no header bar to say where the page is.

The header photograph is always the page's own subject, an object or a place,
never a person: rupee coins for deposit rates, a calculator for interest rates, a
model house, gold bangles, a bangle shop's stock, a rotary phone, an old ledger,
a rubber stamp, a painted question mark, a meeting hall. A stranger's portrait
above a rate table read as stock photography and suggested a customer the bank
does not have. The bank's own loan photographs (`public/loans/`) show people, so
they stay on the homepage (the hero backdrop and the rate strip) and are not
used on inner pages. The hero headline is ranged left over the banner side of
the housing loan photograph, so it never crosses the couple's faces.

Every fact chip carries a figure the bank publishes, or a count of its own
published rows (tenures, GSTINs, branches). Nothing is derived into a new claim.

`<main>` is keyed on the path so each page mounts clean, and `useReveal` re-runs
per route — without that, `js-motion` would leave a newly-mounted page's
`.reveal` blocks hidden.

Colour on the inner pages comes from blue and green cards, all built from fixed
accents with `ink` text and never a semantic `fg` token on an accent:

- `FeatureCard` — icon chip, heading, copy, optional link. Tones `blue`
  (`purple`), `sky` (`lavender-soft`), `green` (`mint`), `mint` (`sage`), and
  `surface` for long runs where solid colour would stop meaning anything. Grids
  of them run as a blue/green checkerboard, and bento rows are sized so no grid
  ends on an empty cell.
- `IconChip` — the round mark that leads every card. Its tone is picked by the
  surface under it: `white` on an accent, `blue` / `green` on the page.
- `ProductRateCard` — a loan product on colour, its object photo in a circle
  half off the top corner, and its published headline rate counting up.
- `CalloutPanel` — the colour-blocked closing block (heading, one line, a pill).
  Tones rotate `mint` / `sage` so the closing panel never merges with the
  navy footer; body copy is `ink/80` on every tone.

## Homepage below the lending rates

Carried over from bmc_website2 at the client's request, in
`src/components/home/`, in this order: the jump-link row, the Deposits and
Loans cards, "Open your account", "What happens after you apply", the Services
and NRI cards, forms and rates, digital banking, heritage and "Bank safely",
then the photo credits the Wikimedia licences require. bmc_website2's floating
care bar and rates tab were removed at the client's request.

bmc_website2 animated with GSAP; here the same effects are native.
`useScrub` writes scroll-linked custom properties (`--open`, `--p`,
`--phone-y` and so on) that CSS turns into the card clip-path opening, the
word-by-word brightening of the five firsts, and the phone's drift. Photos pan
through the site-wide `data-parallax`, and entrances use the existing `.reveal`
classes plus `.reveal-x` for sideways chips. Every property has a resting
default, so without JS or under reduced motion each block renders finished.

**Open your account** is three steps: the account, who holds it, then name,
mobile, optional email, nearest branch and consent. The navy checklist beside
it lists the documents for that account and holder (from
`src/data/open-account.ts`) and lets the visitor tick off what they have.
Errors show on blur and on submit, focus moves to the first invalid field, and
each step change moves focus to the new question. Submission is simulated
until the bank's endpoint exists. It never asks for a PIN, password or OTP.

Widgets, one or two per page, each working only from published figures:

- `RateFinder` (deposit rates) — native radio groups for depositor and tenure;
  the blue panel shows that row's published rate, its non-callable figure where
  there is one, and the other column of the same row. It calculates nothing.
- `RateBars` (deposit rates) — the domestic schedule as horizontal bars from
  zero, with the exact table one tab away.
- The GSTIN cards (GST) — each with a copy button that confirms in place and
  through a live region, and a "Reading a GSTIN" explainer whose card turns the
  colour of the part selected.
- The branch search (contact) — typed filter plus one-tap town chips.
- Year-on-year bars and the 0.12% marker against the 20% RBI ceiling
  (shareholder); the PLR beside the three headline rates (interest rates).

These are deliberately not on `Section bg=` — the accent lives in panels whose
text tokens are controlled, not in a full-bleed section where an inherited
`fg-muted` would invert away from the panel in dark mode. A panel that holds
focusable controls on an accent carries `on-accent`, so its focus ring stays ink
in dark mode.

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

Verified in-browser in both themes at 360, 390, 768, 1024, 1280, 1440 and 1920,
on every route:

- Zero text/background pairs below WCAG AA.
- No interactive target under 44px.
- No type outside 12 to 38px, except the hero headline.
- Single h1, no heading-level skips.
- Every image has alt text and intrinsic dimensions.
- Visible focus ring on every focusable element.
- No horizontal overflow at any tested width.
