import {
  BriefcaseBusiness,
  Landmark,
  PiggyBank,
  PlaneTakeoff,
  Repeat,
  type LucideIcon,
} from "../assets/icons/lucide";
import { nreTopRate, seniorTopDepositRate } from "./home-sections";

/**
 * The homepage "Open your account" flow: which accounts can be started online,
 * who each one can be held by, and the documents each combination needs.
 *
 * Rates are read from the published tables, never restated. The document lists
 * follow the RBI's KYC rules as a guide to what to have ready; the branch
 * confirms the exact list when it calls, and the section says so. Recurring
 * deposits carry no senior-citizen option because the bank's published notes
 * rule out the senior premium on them.
 */

export type AccountId = "savings" | "current" | "term" | "recurring" | "nri";
export type HolderId = "individual" | "joint" | "senior" | "proprietor" | "firm" | "nre" | "nro";

export type AccountOption = {
  id: AccountId;
  title: string;
  blurb: string;
  icon: LucideIcon;
  /** A published fact worth seeing before choosing, if there is one. */
  highlight?: string;
  holders: HolderId[];
};

export const accountOptions: AccountOption[] = [
  {
    id: "savings",
    title: "Savings Account",
    blurb: "For everyday banking",
    icon: PiggyBank,
    holders: ["individual", "joint"],
  },
  {
    id: "current",
    title: "Current Account",
    blurb: "For your business",
    icon: BriefcaseBusiness,
    holders: ["proprietor", "firm"],
  },
  {
    id: "term",
    title: "Term Deposit",
    blurb: "For assured growth",
    icon: Landmark,
    highlight: `Up to ${seniorTopDepositRate} p.a. for senior citizens`,
    holders: ["individual", "joint", "senior"],
  },
  {
    id: "recurring",
    title: "Recurring Deposit",
    blurb: "For a monthly habit",
    icon: Repeat,
    highlight: "Runs for 12 to 36 months",
    holders: ["individual", "joint"],
  },
  {
    id: "nri",
    title: "NRI Account",
    blurb: "NRE or NRO, for Indians living abroad",
    icon: PlaneTakeoff,
    highlight: `NRE term deposits up to ${nreTopRate} p.a.`,
    holders: ["nre", "nro"],
  },
];

export const holderOptions: Record<HolderId, { label: string; hint: string }> = {
  individual: { label: "Just me", hint: "A single account holder" },
  joint: { label: "Jointly", hint: "Two or more holders" },
  senior: { label: "Senior citizen", hint: "60 or over, named first on the account" },
  proprietor: { label: "Sole proprietor", hint: "A business you own yourself" },
  firm: { label: "Partnership or company", hint: "A registered firm or company" },
  nre: { label: "NRE", hint: "For income earned abroad, repatriable" },
  nro: { label: "NRO", hint: "For income earned in India" },
};

const personal = [
  "PAN card, or Form 60 if you do not have one",
  "Proof of identity and address: Aadhaar, passport, voter ID or driving licence",
  "A recent passport-size photograph",
];

export function documentsFor(holder: HolderId | null): string[] {
  switch (holder) {
    case null:
      return [];
    case "individual":
      return personal;
    case "joint":
      return [...personal, "The same documents for every joint holder"];
    case "senior":
      return [...personal, "Proof of age, for the senior citizen rate"];
    case "proprietor":
      return [...personal, "Proof of the business, such as a GST certificate or shop and establishment licence"];
    case "firm":
      return [
        "PAN of the firm or company",
        "Partnership deed, or certificate of incorporation with the memorandum and articles",
        "A resolution or letter naming who may sign for the account",
        "PAN, identity and address proof for each person who signs",
      ];
    case "nre":
    case "nro":
      return [
        "PAN card, or Form 60 if you do not have one",
        "Passport with a valid visa, or other proof of residence abroad",
        "Proof of your overseas address and your address in India",
        "A recent passport-size photograph",
      ];
  }
}
