/**
 * The Loans and advances section, from the bank's four published pages.
 *
 * THE PRIME LENDING RATE CONTRADICTS ITSELF ON THE LIVE SITE. `interest-rates.php`
 * carries "REVISED PLR : 8.50% with effect from 11th June, 2025", citing circular
 * 85-88/CAD/HO/514 of 10 June 2025. `termloan.php`, `other-loans.php` and
 * `working-capital-facilities.php` all still print 14% with effect from 1 May
 * 2019 — three pages that were never updated when the rate changed.
 *
 * This site states the PLR once, here, at the newer figure, and every page
 * reads it from this constant. The stale 14% is not reproduced anywhere: a bank
 * publishing two different lending rates is worse than a bank publishing one
 * that needs checking. Confirm against the circular before launch.
 */
export const primeLendingRate = {
  rate: "8.50%",
  effectiveFrom: "11 June 2025",
  circular: "Circular 85-88/CAD/HO/514, dated 10 June 2025",
  /**
   * The live page names this file in plain text but never links it, so there is
   * no URL to point at. Wire it up when the bank supplies the document.
   */
  circularDocument: "Circular no. 514 dt. 10.06.2025 — Revision of Interest Rates (PDF)",
};

export type LoanProduct = {
  name: string;
  description?: string;
  /** Set where the live site has a dedicated page for the product. */
  href?: string;
};

/**
 * Products on the term loans page. Descriptions are the bank's own, with the
 * typography tidied ("r epayment", "fixed deposits end with BMC Bank"); no
 * claim, rate or condition has been altered.
 */
export const termLoanProducts: LoanProduct[] = [
  {
    name: "Overdraft and cash credit",
    description: "Both overdraft and cash credit are forms of borrowing against a limit the bank sets for you.",
  },
  {
    name: "Term loans",
    description: "A term loan is a loan repaid in regular instalments over a set period.",
  },
  {
    name: "Gold loans",
    description: "Flexible schemes of gold loans and loans against ornaments.",
  },
  {
    name: "Housing loans",
    description: "The bank's housing finance scheme, for buying or building a home.",
  },
  {
    name: "Vehicle loans",
    description: "A vehicle loan at a competitive rate of interest, with straightforward repayment terms.",
  },
  {
    name: "Personal loans",
    description: "Quick, competitively priced and transparent.",
  },
  {
    name: "Loans against domestic articles",
    description: "Borrow against assets you already own.",
  },
  {
    name: "Education loans",
    description: "For a place on a course, so the cost of the course is not what decides it.",
  },
  {
    name: "Loans against term deposits",
    description: "Loan and overdraft against your domestic, NRO, NRE and FCNR fixed deposits held with the bank.",
  },
];

/** Products on the other loans page. The live page lists these without descriptions. */
export const otherLoanProducts: LoanProduct[] = [
  { name: "Personal loans for salaried people" },
  { name: "Personal loans for the purchase of domestic appliances" },
  { name: "Personal loans, other purposes" },
  { name: "Loans against the pledge of gold ornaments" },
  { name: "Loans against NSC, KVP and LIC policies" },
  { name: "Group loans for corporate employees" },
];

export const otherLoansIntro: string[] = [
  "The bank runs a range of loan schemes and credit facilities for individuals, small businesses, traders and transport operators.",
  "Rates are competitive on loans and advances against the pledge of government securities — RBI Relief Bonds, National Savings Certificates, Kisan Vikas Patras and the like — and against the assignment of LIC policies.",
];

/** Facilities on the working capital page. */
export const workingCapitalProducts: LoanProduct[] = [
  { name: "Overdraft accounts for working capital" },
  { name: "Overdraft against hypothecation of stock" },
  { name: "Overdraft against hypothecation of book debts" },
  { name: "Overdraft against a term deposit with the bank" },
  { name: "Overdraft against the pledge of goods" },
];

export const workingCapitalIntro: string[] = [
  "The bank considers overdraft facilities for retail traders, small-scale industrial units, medium and large units, manufacturers and businesses operating at scale.",
  "Rates are competitive on loans and advances against the pledge of government securities — RBI Relief Bonds, National Savings Certificates, Kisan Vikas Patras and the like — and against the assignment of LIC policies.",
];
