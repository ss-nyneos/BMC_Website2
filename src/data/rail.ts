import type { NavGroup, NavLink } from "../types";
import { footerGroups } from "./nav";
import { notices } from "./notices";

/**
 * Content for the full-screen menu. The file keeps its name from the side rail
 * the menu replaced; the rail's announcements now live in the menu too.
 *
 * The menu mirrors the reference layout: a short column of large, headline
 * destinations, then the rest of the site as titled groups with every link
 * visible, so nothing has to be expanded to be found.
 *
 * The split is by intent, not by hierarchy. `railPrimary` is the handful of
 * things people actually arrive wanting; everything else is grouped beside it,
 * reusing the footer index so there is exactly one definition of the site's
 * full structure rather than two that can drift apart.
 */
export const railPrimary: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Deposit rates", href: "/accounts/deposit-rates" },
  { label: "Loans & advances", href: "/loans/interest-rates" },
  { label: "Open an account", href: "/#open-an-account" },
  { label: "Contact us", href: "/contact" },
  { label: "Unclaimed deposits", href: "/accounts/dea-fund" },
];

/**
 * The grouped index. Order runs from "what can I open" to "where do I complain",
 * which is roughly the order a visitor needs them in, and lays out as the
 * reference does: two groups a row, the shortest last.
 */
export const railSecondary: NavGroup[] = [
  // The footer's "Resources" is replaced by the shorter group below. "Bank
  // Profile" is left out entirely: none of its pages exist yet, so the group
  // only led to 404s.
  ...footerGroups.filter(
    (group) => group.label !== "Resources" && group.label !== "Bank Profile",
  ),
  {
    label: "Resources",
    links: [
      { label: "Frequently asked questions", href: "/resources/faq" },
      { label: "GST numbers", href: "/resources/gst" },
      { label: "Shareholder", href: "/resources/shareholder" },
      { label: "Banking Ombudsman", href: "/resources/ombudsman" },
    ],
  },
];

/**
 * The standing line in the menu, above the latest notice.
 *
 * Deposit insurance is the single most reassuring fact the bank can put in
 * front of someone, and it is true on every page, so it earns the permanent
 * slot the reference gives to a shipping promise.
 */
export const railStandingNote = "DICGC insured to ₹5 lakh";

/** The most recent notice, which the menu shows as the live item. */
export const latestNotice = notices[0];
