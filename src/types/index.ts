/** Shared contracts. Spec section 11. */

export type Tone = "purple" | "blue" | "mint" | "lavender" | "orange" | "cream" | "white";

/** Backgrounds a Section may commit to. Text colour is derived, never passed.
 *  `page` and `white` are the same colour in light mode and diverge in dark. */
export type SectionBg = "page" | "purple" | "blue" | "lavender" | "mint" | "white";

/** Coloured field a CirclePhoto sits on. */
export type PhotoField = "mint" | "orange" | "lavender" | "blue" | "purple";

export interface NavLink {
  label: string;
  href: string;
  /** Secondary line under the link inside a dropdown. */
  hint?: string;
  external?: boolean;
}

/**
 * One entry in the primary navigation strip.
 *
 * `links` is optional. Most entries in the bank's navigation are direct links;
 * only the two that carry a chevron open a dropdown.
 */
export interface NavItem {
  label: string;
  href: string;
  links?: NavLink[];
}

/**
 * A footer column. The navigation strip is deliberately shallow, so the footer
 * carries the grouped index of every destination on the site.
 */
export interface NavGroup {
  label: string;
  href?: string;
  links: NavLink[];
}

export interface RateItem {
  /** Key into the icon registry in assets/icons. */
  icon: "house" | "gold" | "vehicle";
  product: string;
  rate: string;
  note?: string;
  href: string;
  /** The card's background photograph, under a scrim, per spec section 6.4. */
  photo: { src: string; alt: string; width: number; height: number };
}

export interface Product {
  name: string;
  href: string;
}

export interface FirstItem {
  text: string;
  /** Substring of `text` the component renders in bold. */
  emphasis?: string;
}

export interface BulletItem {
  text: string;
}

export interface Photo {
  src: string;
  alt: string;
  /** Low-cost intrinsic ratio hint so nothing shifts while images load. */
  width: number;
  height: number;
}

/** Colour fields a ColorCard commits to. Narrower than PhotoField on purpose:
 *  orange is a marker colour and never a card surface. */
export type CardTone = "purple" | "blue" | "mint" | "lavender";

export interface Pillar {
  title: string;
  caption: string;
  href: string;
  tone: CardTone;
  photo: Photo;
}

export interface ProcessStep {
  title: string;
  date?: string;
  duration?: string;
  description: string;
}

export interface ProcessColumn {
  index: 1 | 2;
  head: string;
  tone: "orange" | "blue";
  steps: ProcessStep[];
}

export interface Stage {
  index: number;
  title: string;
  bullets: string[];
}

export type NoticeKind = "newsletter" | "notice" | "form";

export interface Notice {
  title: string;
  href: string;
  kind: NoticeKind;
  date?: string;
  /** Shown on download rows, e.g. "PDF · 1.2 MB". */
  meta?: string;
}

export interface Branch {
  state: string;
  count: number;
  cities: string[];
}

export interface Faq {
  question: string;
  answer: string;
}

/** One row of the bank's published branch directory. */
export interface BranchContact {
  name: string;
  /** The live site's "User Login Name" column. `null` where none is published. */
  email: string | null;
  address: string;
  phone: string;
}

export interface GstRegistration {
  sr: number;
  gstin: string;
  status: string;
  state: string;
}

/** A row of the domestic and NRO term-deposit table. */
export interface DepositRateRow {
  period: string;
  general: string;
  senior: string;
}

export interface NreRateRow {
  period: string;
  rate: string;
}

export interface DeafDocument {
  label: string;
  href: string;
}

/**
 * A long-form FAQ answer. The live site's answers run to sub-headed lists and
 * multi-paragraph rules, so an answer is modelled as blocks rather than a
 * single string; `Faq` above stays as-is for the short homepage entries.
 */
export type FaqBlock =
  | { kind: "para"; text: string }
  | { kind: "subhead"; text: string }
  | { kind: "list"; items: string[] };

export interface FaqEntry {
  question: string;
  blocks: FaqBlock[];
}

export interface FaqGroup {
  label: string;
  entries: FaqEntry[];
}

export interface EnquiryValues {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  city: string;
  branch: string;
  product: Product["name"] | "";
  message: string;
}

export type EnquiryErrors = Partial<Record<keyof EnquiryValues, string>>;

declare global {
  interface HTMLElement {
    /** Present in every current browser; not yet in React 18's DOM typings. */
    inert: boolean;
  }
}
