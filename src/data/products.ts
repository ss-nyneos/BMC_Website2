import type { Product } from "../types";

/** The eight destinations that carry most of the site's traffic. */
export const products: Product[] = [
  { name: "Savings account", href: "/accounts/savings" },
  { name: "Current account", href: "/accounts/current" },
  { name: "Term deposits", href: "/accounts/term-deposits" },
  { name: "Home loan", href: "/loans/term-loans" },
  { name: "Gold loan", href: "/loans/gold" },
  { name: "Vehicle loan", href: "/loans/term-loans" },
  { name: "Working capital", href: "/loans/working-capital" },
  { name: "Foreign exchange", href: "/services/forex" },
];

/** Options offered in the enquiry form's product select. */
export const enquiryProducts = [
  "Savings account",
  "Current account",
  "Term deposit",
  "Home loan",
  "Gold loan",
  "Foreign exchange",
] as const;
