import type { RateItem } from "../types";

/**
 * Headline lending rates carried over from the live site.
 *
 * Each card carries a background photograph under a dark scrim, per the
 * client's own branch photography — empty `alt`, because the photograph is
 * decorative background for text (product name, rate) that already says the
 * same thing in words.
 */
export const rates: RateItem[] = [
  {
    icon: "house",
    product: "Housing loan",
    rate: "8.50%",
    note: "onwards, per annum",
    href: "/loans/interest-rates",
    photo: { src: "/loans/home-loan.jpg", alt: "", width: 1000, height: 667 },
  },
  {
    icon: "gold",
    product: "Gold loan",
    rate: "8.75%",
    note: "per annum",
    href: "/loans/gold",
    photo: { src: "/loans/gold-loan.jpg", alt: "", width: 1000, height: 667 },
  },
  {
    icon: "vehicle",
    product: "Vehicle loan",
    rate: "9.50%",
    note: "per annum",
    href: "/loans/term-loans",
    photo: { src: "/loans/vehicle-loan.jpg", alt: "", width: 1000, height: 667 },
  },
];

export const ratesDisclaimer =
  "Rates shown are indicative and subject to change. Terms and conditions apply.";
