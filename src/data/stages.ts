import type { Stage } from "../types";

/** Digital banking, as three numbered capability groups. Spec section 7.12. */
export const digitalStages: Stage[] = [
  {
    index: 1,
    title: "Mobile banking",
    bullets: [
      "Balance and statements on any account you hold",
      "Fund transfer by NEFT, RTGS and IMPS",
      "Bill payments and standing instructions",
      "UPI, with your own per-transaction limit",
    ],
  },
  {
    index: 2,
    title: "Net banking",
    bullets: [
      "Two-factor login with device binding",
      "Add and manage beneficiaries",
      "View deposits, loan schedules and interest certificates",
    ],
  },
  {
    index: 3,
    title: "Cards and UPI",
    bullets: [
      "RuPay debit card on every savings account",
      "Card controls: freeze, set limits, enable overseas use",
      "UPI QR for collecting payments at your counter",
    ],
  },
];
