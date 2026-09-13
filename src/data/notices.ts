import type { Notice } from "../types";

/**
 * News, notices and downloadable forms. Titles and dates below stand in for the
 * live archive; the shapes match what the current site publishes so the tabs can
 * be wired to a real feed without changing any component.
 */
export const newsletters: Notice[] = [
  { title: "BMC Newsletter, July 2026", href: "/newsletters/2026-07.pdf", kind: "newsletter", date: "31 July 2026", meta: "PDF · 2.1 MB" },
  { title: "BMC Newsletter, April 2026", href: "/newsletters/2026-04.pdf", kind: "newsletter", date: "30 April 2026", meta: "PDF · 1.8 MB" },
  { title: "BMC Newsletter, January 2026", href: "/newsletters/2026-01.pdf", kind: "newsletter", date: "31 January 2026", meta: "PDF · 2.4 MB" },
  { title: "BMC Newsletter, October 2025", href: "/newsletters/2025-10.pdf", kind: "newsletter", date: "31 October 2025", meta: "PDF · 1.9 MB" },
];

export const notices: Notice[] = [
  { title: "Notice of the Annual General Meeting", href: "/notices/agm", kind: "notice", date: "12 August 2026" },
  { title: "Auction of pledged gold ornaments", href: "/notices/gold-auction", kind: "notice", date: "28 July 2026" },
  { title: "Result of the board election", href: "/notices/election-result", kind: "notice", date: "9 July 2026" },
  { title: "Vacancies: Branch Manager and Clerk", href: "/notices/vacancies", kind: "notice", date: "1 July 2026" },
];

export const forms: Notice[] = [
  { title: "RuPay debit card application", href: "/forms/rupay-application.pdf", kind: "form", meta: "PDF · 240 KB" },
  { title: "Mobile banking registration", href: "/forms/mobile-banking.pdf", kind: "form", meta: "PDF · 180 KB" },
  { title: "ATM transaction dispute", href: "/forms/atm-dispute.pdf", kind: "form", meta: "PDF · 160 KB" },
  { title: "Form 121, nomination", href: "/forms/form-121.pdf", kind: "form", meta: "PDF · 120 KB" },
  { title: "Branch IFSC list", href: "/forms/ifsc-list.pdf", kind: "form", meta: "PDF · 310 KB" },
];
