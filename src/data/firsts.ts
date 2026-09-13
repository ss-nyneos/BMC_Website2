import type { BulletItem, FirstItem } from "../types";

/**
 * The five firsts claimed on the live site. Emphasis is carried by <strong>
 * inside the rendered string, so the data stays plain text here and the markup
 * decision stays in the component.
 */
export const firsts: FirstItem[] = [
  {
    text: "First co-operative bank granted scheduled status by the Reserve Bank of India, in 1988",
    emphasis: "scheduled status by the Reserve Bank of India, in 1988",
  },
  {
    text: "First with an RBI A Category Authorised Dealer licence for foreign exchange",
    emphasis: "A Category Authorised Dealer licence",
  },
  {
    text: "First authorised to operate in more than one state",
    emphasis: "more than one state",
  },
  {
    text: "First to introduce taxi and auto financing schemes",
    emphasis: "taxi and auto financing",
  },
  {
    text: "First scheduled urban co-operative bank to launch micro-financing for women artisans",
    emphasis: "micro-financing for women artisans",
  },
];

/** Reasons listed beside the enquiry form. */
export const whyBmc: BulletItem[] = [
  { text: "Deposits insured by DICGC up to ₹5 lakh per depositor" },
  { text: "Eighty-six years of continuous operation" },
  { text: "Net banking and mobile banking on every account" },
  { text: "RuPay debit card issued with your account" },
  { text: "Branches across ten states" },
];

/**
 * Attributed to the office rather than to a named individual. Replace `name`
 * with the real spokesperson and their photograph before launch; inventing a
 * person for a working bank's site is not a placeholder we should ship.
 */
export const leadershipQuote = {
  quote:
    "A co-operative bank answers to the people who bank with it. That is why we publish our rates in full, and why a branch manager still knows the businesses on their own street by name.",
  name: "Office of the Chief Human Resources Officer",
  role: "Bombay Mercantile Co-operative Bank",
};
