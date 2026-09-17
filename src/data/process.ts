import type { ProcessColumn } from "../types";

/**
 * Account opening, as two ordered stages. Spec section 7.11.
 *
 * Numbers appear here because this genuinely is a sequence: step two cannot
 * happen before step one. They are not used as section decoration anywhere else
 * on the page.
 */
export const processColumns: ProcessColumn[] = [
  {
    index: 1,
    head: "Apply and verify",
    tone: "accent",
    steps: [
      {
        title: "Fill in the form",
        date: "Any day",
        duration: "10 min",
        description:
          "Name, contact details, the branch nearest you and the account you want. You can stop and come back to it.",
      },
      {
        title: "Submit your KYC documents",
        date: "Same day",
        duration: "15 min",
        description:
          "PAN, Aadhaar and one address proof, uploaded or handed in at the branch counter, whichever suits you.",
      },
      {
        title: "Complete video KYC",
        date: "Within 2 working days",
        duration: "8 min",
        description:
          "A short scheduled video call with a bank officer to confirm your identity against the documents you sent.",
      },
    ],
  },
  {
    index: 2,
    head: "Activate and bank",
    tone: "brand",
    steps: [
      {
        title: "Account activated",
        date: "Within 1 working day of KYC",
        duration: "Same day",
        description:
          "Your account number and IFSC arrive by SMS and email. You can fund the account straight away.",
      },
      {
        title: "Collect your RuPay card",
        date: "5 to 7 working days",
        duration: "By post or branch",
        description:
          "The debit card is despatched to your registered address, or held at your branch if you prefer to collect it.",
      },
      {
        title: "Start banking",
        date: "From day one",
        duration: "Ongoing",
        description:
          "Register for net banking and the mobile app, add beneficiaries, and set your own transaction limits.",
      },
    ],
  },
];
