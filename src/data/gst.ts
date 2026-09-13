import type { GstRegistration } from "../types";

/**
 * The bank's GST registrations, exactly as the accounts department publishes
 * them. GSTINs are reproduced character for character: a transposed digit here
 * is a customer's input-tax credit rejected, so nothing in this table is
 * reformatted, prettified or re-cased.
 */
export const gstRegistrations: GstRegistration[] = [
  { sr: 1, gstin: "27AAAAB2359J1ZS", status: "Active", state: "Maharashtra" },
  { sr: 2, gstin: "23AAAAB2359J1Z0", status: "Active", state: "Madhya Pradesh" },
  { sr: 3, gstin: "19AAAAB2359J1ZP", status: "Active", state: "West Bengal" },
  { sr: 4, gstin: "10AAAAB2359J1Z7", status: "Active", state: "Bihar" },
  { sr: 5, gstin: "24AAAAB2359J1ZY", status: "Active", state: "Gujarat" },
  { sr: 6, gstin: "09AAAAB2359J1ZQ", status: "Active", state: "Uttar Pradesh" },
  { sr: 7, gstin: "07AAAAB2359J1ZU", status: "Active", state: "Delhi" },
  { sr: 8, gstin: "36AAAAB2359J1ZT", status: "Active", state: "Telangana" },
  { sr: 9, gstin: "08AAAAB2359J1ZS", status: "Active", state: "Rajasthan" },
  { sr: 10, gstin: "01AAAAB2359J1Z6", status: "Active", state: "Jammu and Kashmir" },
  { sr: 11, gstin: "27AAAAB2359J2ZR", status: "Active", state: "Maharashtra (ISD No.)" },
];

export const gstIssuer = "Bombay Mercantile Co-operative Bank Ltd., Accounts Department";

/** Carried on the live GST page directly under the table. */
export const smsChargeNote =
  "SMS charges are charged on a pro-rata basis, i.e. actual usage — the number of SMS on the basis of transactions carried out by the customer — at ₹0.21 paise plus 18% GST on a quarterly basis, with effect from 1 April 2025.";
