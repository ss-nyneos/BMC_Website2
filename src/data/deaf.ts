import type { DeafDocument } from "../types";

/**
 * Unclaimed deposit lists published under the Depositor Education and Awareness
 * Fund scheme. The links are the bank's own, reproduced exactly.
 *
 * NOTE FOR THE BANK: the live page ships these twelve spreadsheets with no
 * heading, no date and no explanation of what a visitor is looking at or what
 * to do next. `deafIntro` and `deafClaimSteps` below were written for this
 * revamp to fill that gap. They deliberately describe only the RBI scheme in
 * general terms and route the claimant to the branch, because the bank's own
 * claim procedure was not published anywhere on the live site. Both need the
 * bank's sign-off, and the claim steps should be replaced with the bank's
 * actual documented process before launch.
 */
export const deafIntro: string[] = [
  "Where a savings or current account has not been operated for ten years, or a term deposit has remained unclaimed for ten years from the date of maturity, the Reserve Bank of India requires the balance to be transferred to the Depositor Education and Awareness Fund.",
  "Transferring the money does not extinguish the claim. A depositor, or the legal heir of a depositor, keeps the right to claim the balance together with the interest the scheme carries, at any time, from the branch where the account was held.",
  "The lists below are the accounts the bank has published under that scheme. Each opens as a spreadsheet.",
];

export const deafClaimSteps: string[] = [
  "Find the account in the lists below, and note the name, the branch and the account details exactly as they appear.",
  "Visit the branch where the account was held, or write to it. Branch addresses and telephone numbers are on the contact page.",
  "Carry proof of identity and proof of address, the original deposit receipt or passbook if you still hold it, and — where you are claiming as a legal heir — proof of your entitlement to the balance.",
];

export const deafDocuments: DeafDocument[] = [
  {
    label: "38-DEAF",
    href: "https://docs.google.com/spreadsheets/d/14irsQAx6Qrcpwq2iSZou_RHfXIHzyjm5/edit?usp=drive_link&ouid=116775441336172832932&rtpof=true&sd=true",
  },
  {
    label: "39-DEAF",
    href: "https://docs.google.com/spreadsheets/d/13fZXZ1WeRWewLGXcmFKhGFSp774fUxTn/edit?usp=drive_link&ouid=116775441336172832932&rtpof=true&sd=true",
  },
  {
    label: "40-DEAF",
    href: "https://docs.google.com/spreadsheets/d/1oKO_bl61K2aqyr3KSPHxu_EvsBaulQQa/edit?usp=drive_link&ouid=116775441336172832932&rtpof=true&sd=true",
  },
  {
    label: "41-DEAF",
    href: "https://docs.google.com/spreadsheets/d/1m6mJnM1MP7Vst5Z30vNyDMWxTS14EGFd/edit?usp=drive_link&ouid=116775441336172832932&rtpof=true&sd=true",
  },
  {
    label: "42-DEAF",
    href: "https://docs.google.com/spreadsheets/d/195UkjbYTNztOmTRz1R9wZVIR61ReRh9N/edit?usp=sharing&ouid=116775441336172832932&rtpof=true&sd=true",
  },
  {
    label: "43-DEAF",
    href: "https://docs.google.com/spreadsheets/d/1PULZu_Aa3mRUImJWzrsJPG0wb9glevtL/edit?usp=drive_link&ouid=116775441336172832932&rtpof=true&sd=true",
  },
  {
    label: "44-DEAF",
    href: "https://docs.google.com/spreadsheets/d/1pDDb5IKZMMXKfk_DQJ7qwdWfyUa9vUie/edit?usp=drive_link&ouid=116775441336172832932&rtpof=true&sd=true",
  },
  {
    label: "45-DEAF",
    href: "https://docs.google.com/spreadsheets/d/1Apb0S27NsaYlHwwdkfFF_24ZNFZLl9NF/edit?usp=drive_link&ouid=116775441336172832932&rtpof=true&sd=true",
  },
  {
    label: "46-DEAF",
    href: "https://docs.google.com/spreadsheets/d/1xcokLS8D7M6CQKFUjuZ3d8ECAxMQ500E/edit?usp=drive_link&ouid=116775441336172832932&rtpof=true&sd=true",
  },
  {
    label: "47-DEAF",
    href: "https://docs.google.com/spreadsheets/d/1bWAwF6PJ6ZU0mpgaWhzRlZ1_frWXWrDW/edit?usp=drive_link&ouid=116775441336172832932&rtpof=true&sd=true",
  },
  {
    label: "48-DEAF",
    href: "https://docs.google.com/spreadsheets/d/17nRf12GVb0MBUF-2T3rk1qlTFI5d2Cx6/edit?usp=drive_link&ouid=116775441336172832932&rtpof=true&sd=true",
  },
  {
    label: "49-DEAF",
    href: "https://docs.google.com/spreadsheets/d/12dECzk-N06E5-8VUlyMFtUcYLPUW4duJ/edit?usp=drive_link&ouid=116775441336172832932&rtpof=true&sd=true",
  },
];
