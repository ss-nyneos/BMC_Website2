# BMC Bank website revamp

**Register:** brand. The homepage is a marketing surface; the visitor's
impression is the deliverable.

## What this is

A rebuild of the public site for Bombay Mercantile Co-operative Bank Ltd.
(founded Mumbai, 1939), India's first scheduled urban co-operative bank.

Brand line: *Zamana Naya. Bharosa Wohi.* ("New era. Same trust.") The line sets
the whole direction: a bold, modern shell carrying traditional banking trust.

## Who it is for

Three audiences, addressed in this order on the homepage:

1. **Rate shoppers.** Arriving from a comparison, wanting the housing, gold or
   vehicle loan rate before any narrative. They get it straight after the hero
   and the one-paragraph bank statement, which the client asked to lead
   (2026-09-17).
2. **Prospective account holders.** Deciding whether an 86-year-old
   co-operative bank is safe and modern enough. They get the product cards, an
   "Open your account" flow straight after the loans card, the published
   timeline of what happens after they apply directly below it, and the bank's
   heritage and firsts further down.
3. **Existing customers.** Returning for a form, a notice, an IFSC code or the
   complaint route. Those live in the second half of the page and in the footer,
   which mirrors the primary navigation in full.

## Constraints that are not negotiable

These come from the design brief and override any default preference:

- **Stack:** React, TypeScript, Tailwind. No other runtime dependency.
- **Type:** Helvetica Neue / Helvetica / Arial only. Never below 12px, never
  above 38px, at any breakpoint, with one exception the client asked for: the
  homepage hero headline, which runs to 96px.
- **Palette:** the brief's colours. Purple `#5A189A`, blue `#2E68F0`,
  mint `#8CE6A6`, lavender `#C6ABF7`, orange `#EF5F2A`, ink `#140A2E`.
  One deliberate departure from the brief: the page background is white, not
  cream `#F3EEE8`, at the client's request. Cream remains as the form-field
  fill. The site also opens in light mode whatever the operating system is set
  to; dark is opt-in through the toggle and is then remembered.
  A second departure, also at the client's request (2026-09-17): everything on
  the homepage below the lending rates is carried over from the bmc_website2
  design, in its deep blue `#0B4DA2` with white text, and the footer and the
  hero's brand block were recoloured to that blue so the site reads as one.
  Those sections keep bmc_website2's own shapes too: 16px card corners and
  rectangular buttons rather than pills.
- **Shape:** pill buttons with a circular arrow chip; photographs masked to
  perfect circles; 32px radius on large panels.
- **Structure:** colour-blocked panels. At the client's request, white cards
  rest on a layered shadow and accent panels carry an inner shadow; neither
  takes a visible outline. Borders survive only as hairline dividers.
- **Motion:** the client asked for a lively site: a scroll parallax on the
  hero, scroll reveals, and hover and pop-up feedback. All of it is native
  (no animation library), and all of it is off under reduced motion.

## What the site must never do

- Ask for, or appear to ask for, a PIN, password, CVV or one-time passcode.
- State a figure the bank has not published. Branch counts, customer numbers and
  balances are left out rather than invented.
- Attribute a quote or a photograph to a named individual at the bank without
  the real person's approval.
