import type { NavGroup, NavItem, NavLink } from "../types";
import { newsletters } from "./notices";

/**
 * Primary navigation: the bank's own nine destinations, in the bank's own
 * order. Two of them carry a dropdown, matching the chevrons on the live site.
 *
 * Labels are set in sentence case to match the rest of the type system, with
 * acronyms preserved. The live site sets them in capitals; switching back is a
 * single `uppercase` class on the strip if that is wanted.
 */
export const primaryNav: NavItem[] = [
  { label: "Contact us", href: "/contact" },
  { label: "GST", href: "/resources/gst" },
  { label: "FAQ", href: "/resources/faq" },
  { label: "Deposit rates", href: "/accounts/deposit-rates" },
  { label: "DEA Fund", href: "/accounts/dea-fund" },
  {
    label: "Loans & advances",
    href: "/loans",
    links: [
      { label: "Interest Rates", href: "/loans/interest-rates" },
      // "Terms Loans" is reproduced exactly as it appears on the live site.
      // It reads like a typo for "Term Loans"; corrected on the bank's word.
      { label: "Terms Loans", href: "/loans/term-loans" },
      { label: "Loans", href: "/loans/other" },
      { label: "Working Capital Facilities", href: "/loans/working-capital" },
      { label: "Gold Loans", href: "/loans/gold" },
    ],
  },
  { label: "Shareholder", href: "/resources/shareholder" },
  {
    label: "Newsletter",
    href: "/resources/newsletters",
    // The live site's newsletter chevron opens the archive. Its exact contents
    // were not supplied, so the four most recent issues stand in; they come
    // from the same source the news section reads.
    links: [
      ...newsletters.slice(0, 4).map(
        (issue): NavLink => ({
          label: issue.title.replace("BMC Newsletter, ", ""),
          href: issue.href,
        }),
      ),
      { label: "View all newsletters", href: "/resources/newsletters" },
    ],
  },
  { label: "Banking Ombudsman", href: "/resources/ombudsman" },
];

/**
 * Footer index. The navigation strip above is shallow by design, so this is the
 * only place every destination is reachable in one view. Nothing from the old
 * site is dropped; it is grouped here instead.
 */
export const footerGroups: NavGroup[] = [
  {
    label: "Bank Profile",
    links: [
      { label: "History of the bank", href: "/profile/history" },
      { label: "Annual and board report", href: "/profile/annual-report" },
      { label: "Board of Directors", href: "/profile/board-of-directors" },
      { label: "Board of Management", href: "/profile/board-of-management" },
      { label: "Executives", href: "/profile/executives" },
    ],
  },
  {
    label: "Accounts",
    links: [
      { label: "Savings account", href: "/accounts/savings" },
      { label: "Current account", href: "/accounts/current" },
      { label: "Term deposits", href: "/accounts/term-deposits" },
      { label: "Deposit rates", href: "/accounts/deposit-rates" },
      { label: "DEA Fund", href: "/accounts/dea-fund" },
    ],
  },
  {
    label: "Loans",
    links: [
      { label: "Interest rates", href: "/loans/interest-rates" },
      { label: "Term loans", href: "/loans/term-loans" },
      { label: "Gold loans", href: "/loans/gold" },
      { label: "Working capital facilities", href: "/loans/working-capital" },
      { label: "Other loans", href: "/loans/other" },
    ],
  },
  {
    label: "Services",
    links: [
      { label: "Remittance", href: "/services/remittance" },
      { label: "Foreign exchange", href: "/services/forex" },
      { label: "Forex card rate", href: "/services/forex-card-rate" },
      { label: "ATM services", href: "/services/atm" },
      { label: "Safe deposit locker", href: "/services/locker" },
      { label: "Digital banking limits and charges", href: "/services/digital-limits" },
      { label: "Service charges", href: "/services/charges" },
      { label: "Other services", href: "/services/other" },
    ],
  },
  {
    label: "Branches",
    links: [
      { label: "Mumbai", href: "/branches/mumbai" },
      { label: "Maharashtra", href: "/branches/maharashtra" },
      { label: "Gujarat", href: "/branches/gujarat" },
      { label: "Other states", href: "/branches/other-states" },
      { label: "Find a branch and IFSC", href: "/branches/find" },
    ],
  },
  {
    label: "Resources",
    links: [
      { label: "Frequently asked questions", href: "/resources/faq" },
      { label: "Newsletter archive", href: "/resources/newsletters" },
      { label: "Shareholder information", href: "/resources/shareholder" },
      { label: "GST details", href: "/resources/gst" },
      { label: "Cyber awareness", href: "/resources/cyber-awareness" },
      { label: "Forms and downloads", href: "/resources/forms" },
      { label: "Banking Ombudsman", href: "/resources/ombudsman" },
    ],
  },
];

export const utilityLinks = {
  careNumber: "1800 220 854",
  careHref: "tel:1800220854",
  complaint: { label: "Lodge a complaint", href: "https://complaints.bmc.bank.in", external: true },
  netBanking: { label: "Net Banking", href: "https://netbanking.bmc.bank.in", external: true },
} satisfies Record<string, unknown>;

export const primaryCta: NavLink = { label: "Open an account", href: "#open-an-account" };
