import type { Pillar } from "../types";
import { photos } from "./photos";

/** The three audiences the bank serves, each a full-photograph card. */
export const pillars: Pillar[] = [
  {
    title: "Personal banking",
    caption: "Savings, deposits, home and gold loans",
    href: "/accounts/savings",
    photo: photos.neighbourhood,
  },
  {
    title: "Business banking",
    caption: "Current accounts, working capital, trade",
    href: "/loans/working-capital",
    photo: photos.business,
  },
  {
    title: "NRI and foreign exchange",
    caption: "Remittance, forex cards, overseas transfers",
    href: "/services/forex",
    photo: photos.overseas,
  },
];
