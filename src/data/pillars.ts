import type { Pillar } from "../types";
import { photos } from "./photos";

/** The three audiences the bank serves, as the trio in reference image 6. */
export const pillars: Pillar[] = [
  {
    title: "Personal banking",
    caption: "Savings, deposits, home and gold loans",
    href: "/accounts/savings",
    tone: "purple",
    photo: photos.personal,
  },
  {
    title: "Business banking",
    caption: "Current accounts, working capital, trade",
    href: "/loans/working-capital",
    tone: "mint",
    photo: photos.business,
  },
  {
    title: "NRI and foreign exchange",
    caption: "Remittance, forex cards, overseas transfers",
    href: "/services/forex",
    tone: "blue",
    photo: photos.overseas,
  },
];
