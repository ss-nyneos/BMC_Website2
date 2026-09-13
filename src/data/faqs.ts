import type { Faq } from "../types";

/** Used by the Accordion on the resources page and available to the homepage. */
export const faqs: Faq[] = [
  {
    question: "Are my deposits insured?",
    answer:
      "Yes. Bombay Mercantile Co-operative Bank is registered with the Deposit Insurance and Credit Guarantee Corporation. DICGC insures deposits up to ₹5 lakh per depositor per bank, covering principal and interest together.",
  },
  {
    question: "What do I need to open an account?",
    answer:
      "Your PAN, Aadhaar and one proof of current address. If you are opening a current account for a business, bring the registration certificate and the partnership deed or memorandum as well.",
  },
  {
    question: "Can I open an account without visiting a branch?",
    answer:
      "You can complete the form and upload documents online, then finish identity verification over a scheduled video call. You only need to visit a branch if you would rather hand over documents in person.",
  },
  {
    question: "How do I report an unauthorised transaction?",
    answer:
      "Call customer care on 1800 220 854 as soon as you notice it, and freeze your card from the mobile app in the meantime. Report it in writing within three working days to limit your liability under RBI rules.",
  },
  {
    question: "Where do I escalate a complaint the branch has not resolved?",
    answer:
      "Use the online complaint form first, which gives you a reference number. If the matter is unresolved after thirty days, you may approach the RBI Integrated Ombudsman Scheme.",
  },
];
