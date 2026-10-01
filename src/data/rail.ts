import type { NavGroup, NavLink } from "../types";
import { footerGroups } from "./nav";
import { notices } from "./notices";

/**
 * Content for the right-hand rail and its drawer.
 *
 * The drawer mirrors the reference layout: a short list of large, headline
 * destinations under one small label, then a hairline-separated list of
 * secondary rows, some of which expand.
 *
 * The split is by intent, not by hierarchy. `railPrimary` is the handful of
 * things people actually arrive wanting; everything else is grouped below,
 * reusing the footer index so there is exactly one definition of the site's
 * full structure rather than two that can drift apart.
 */
export const railPrimaryLabel = "Banking";

export const railPrimary: NavLink[] = [
  { label: "Deposit rates", href: "/accounts/deposit-rates" },
  { label: "Loans & advances", href: "/loans/interest-rates" },
  { label: "Open an account", href: "/#open-an-account" },
  { label: "Contact us", href: "/contact" },
  { label: "Unclaimed deposits", href: "/accounts/dea-fund" },
];

/**
 * Secondary rows. Groups carry a `+` and expand in place; the rest are single
 * links. Order runs from "who are you" to "how do I complain", which is roughly
 * the order a visitor needs them in.
 */
export const railSecondary: NavGroup[] = [
  // "Resources" is re-expanded as individual rows below. "Bank Profile" is left
  // out entirely: none of its pages exist yet, so the group only led to 404s.
  ...footerGroups.filter(
    (group) => group.label !== "Resources" && group.label !== "Bank Profile",
  ),
  {
    label: "Frequently asked questions",
    href: "/resources/faq",
    links: [],
  },
  {
    label: "GST numbers",
    href: "/resources/gst",
    links: [],
  },
  {
    label: "Shareholder",
    href: "/resources/shareholder",
    links: [],
  },
  {
    label: "Banking Ombudsman",
    href: "/resources/ombudsman",
    links: [],
  },
];

/**
 * The standing line in the rail, alongside the latest notice.
 *
 * Deposit insurance is the single most reassuring fact the bank can put in
 * front of someone, and it is true on every page, so it earns the permanent
 * slot the reference gives to a shipping promise.
 *
 * Kept short on purpose: the rail sets it in a vertical writing mode, where a
 * string longer than the viewport is tall wraps into a second column and
 * strands its last word on its own.
 */
export const railStandingNote = "DICGC insured to ₹5 lakh";

/** The most recent notice, which the rail shows as the live item. */
export const latestNotice = notices[0];
