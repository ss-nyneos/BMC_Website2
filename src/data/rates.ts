import type { RateItem } from "../types";

/** Headline lending rates carried over from the live site. */
export const rates: RateItem[] = [
  {
    icon: "house",
    product: "Housing loan",
    rate: "8.50%",
    note: "onwards, per annum",
    href: "/loans/interest-rates",
  },
  {
    icon: "gold",
    product: "Gold loan",
    rate: "8.75%",
    note: "per annum",
    href: "/loans/gold",
  },
  {
    icon: "vehicle",
    product: "Vehicle loan",
    rate: "9.50%",
    note: "per annum",
    href: "/loans/term-loans",
  },
];

export const ratesDisclaimer =
  "Rates shown are indicative and subject to change. Terms and conditions apply.";
