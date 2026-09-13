import type { DepositRateRow, NreRateRow } from "../types";

/**
 * Published term-deposit rates, reproduced from the live rates page.
 *
 * Every figure here is a number the bank is contractually held to, so the
 * tables are transcribed as published rather than rounded, re-ordered or
 * merged. Where the live page prints two rates in one cell ("6.15 / 6.40") the
 * pair is kept intact: the second figure is the non-callable rate explained in
 * `depositRateNotes`.
 */
export const domesticRatesEffective = "18 June 2025";

export const domesticRates: DepositRateRow[] = [
  { period: "7 days to 45 days", general: "3.00", senior: "3.50" },
  { period: "46 days to 179 days", general: "4.40", senior: "4.90" },
  { period: "180 days to 210 days", general: "5.00", senior: "5.50" },
  { period: "211 days to less than 1 year", general: "5.00", senior: "5.50" },
  { period: "1 year to less than 2 years", general: "6.15 / 6.40", senior: "6.65 / 6.90" },
  { period: "2 years to less than 3 years", general: "6.35 / 6.60", senior: "6.85 / 7.10" },
  { period: "3 years to less than 5 years", general: "6.20", senior: "6.70" },
  { period: "5 years and up to 10 years", general: "6.00", senior: "6.50" },
  {
    period: "Tax saving (5 years), subject to the conditions of the Tax Saving Scheme",
    general: "6.20",
    senior: "6.50",
  },
];

export const depositRateNotes: string[] = [
  "The second figure shown for the one-to-two year and two-to-three year rows is for “non-callable” term deposits of ₹1 crore and above — deposits that cannot be withdrawn before maturity — which earn 25 basis points more than the normal rates in return for giving up the premature withdrawal option.",
  "The interest rate payable to BMC Bank staff will be 1.00% above the applicable rate for the public. The rate applicable to all Resident Indian senior citizens will be 0.50% above the rate payable for all tenors. BMC Bank ex-staff who are Resident Indian senior citizens will get the benefit of the 1% applicable to staff and the 0.50% applicable to Resident Indian senior citizens, above the applicable rate for the public. However, NRO and NRE deposits of staff are not eligible for the additional 1% otherwise applicable to staff domestic retail deposits.",
  "Before issuing a non-callable deposit, the branch must obtain a separate form or declaration from the customer.",
  "Deposits under the Recurring Deposit scheme will be accepted for a period of 12 months and above, up to 36 months.",
  "Additional interest is not applicable on recurring deposits for senior citizens.",
  "Because the differential interest rate premium on senior citizen deposits is high, valid age proof must be obtained while accepting deposits from senior citizens. The depositor should be 60 years of age or above, and the senior citizen's name should appear as the first name in the respective account.",
];

export const prematureWithdrawalNotes: string[] = [
  "In case of payment before maturity, interest up to 30 days will be nil. Above 30 days, interest is 1% less than the applicable rate of interest for the actual period for which the deposit is kept with the bank.",
  "Penal interest of 1% will be charged on all deposits which are prematurely closed and reinvested, regardless of the residual period of the deposit.",
  "A term deposit receipt should be renewed within 14 days of the date of maturity. If the overdue period exceeds 14 days and the depositor renews the entire amount of the overdue deposit, or part of it, as a fresh term deposit, interest for the overdue period will be paid at the rate applicable to savings deposits.",
];

/** Staff and ex-staff entitlement, as set out in full on the live page. */
export const staffRateNotes: string[] = [
  "As per existing practice, all permanent staff members, retired staff, or staff retired under the Early Severance Scheme of the bank — either singly or jointly with any other member of his or her family, or the spouse of a deceased staff member, or the spouse of deceased retired staff, or the spouse of a deceased staff member retired under the Early Severance Scheme — are entitled to interest rates at a premium of 1% above the rates specified for the general public, provided the first name in the account is that of the employee, except in the case of the spouse of deceased staff. Retired staff does not include staff who have resigned or whose services have been terminated by the bank.",
  "The same group would be entitled to that 1% premium plus interest at 0.50% per annum, being the rate offered to senior citizens, for those who have attained the age of 60 years and above, provided the first name in the account is that of the employee, except in the case of the spouse of deceased staff.",
];

export const nreRatesEffective = "18 June 2025";

export const nreRates: NreRateRow[] = [
  { period: "1 year to less than 2 years", rate: "6.15" },
  { period: "2 years to less than 3 years", rate: "6.35" },
  { period: "3 years to less than 5 years", rate: "6.20" },
  { period: "For 5 years", rate: "6.00" },
];

export const nreNotes: string[] = [
  "No interest will be paid if the deposit is withdrawn before 1 year.",
  "On premature withdrawal of the deposit after completion of 1 year, interest will be paid at the applicable rate for the period the deposit has actually remained with the bank, or the contracted rate less a premature penalty of 1%, whichever is lower.",
];

export const fcnrHeading =
  "Interest rates on the FCNR(B) deposit scheme for the month of June 2025";

export const fcnrRates: NreRateRow[] = [{ period: "1 year", rate: "USD 5.10" }];

export const fcnrNote =
  "FCNR(B) deposits in US Dollar and Euro currency. Foreign exchange remittance facility is available for all permitted purposes at any of the authorised branches.";
