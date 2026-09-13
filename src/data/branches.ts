import type { Branch } from "../types";

/**
 * Branch presence by state. Counts are omitted deliberately: the live site does
 * not publish a per-state total, and inventing one on a bank's homepage is not
 * a placeholder worth shipping. `count` stays 0 until the real figure is wired
 * in, and the UI reads `cities` instead.
 */
export const branches: Branch[] = [
  { state: "Mumbai", count: 0, cities: ["Fort", "Mohamedali Road", "Byculla", "Bandra", "Kurla", "Andheri"] },
  { state: "Maharashtra", count: 0, cities: ["Pune", "Nashik", "Aurangabad", "Solapur", "Nagpur"] },
  { state: "Gujarat", count: 0, cities: ["Ahmedabad", "Surat", "Vadodara", "Bharuch"] },
  { state: "Other states", count: 0, cities: ["Hyderabad", "Bengaluru", "Chennai", "Jaipur", "Lucknow", "Kolkata"] },
];

export const headOffice = {
  name: "Zain G. Rangoonwala Building",
  street: "78 Mohamedali Road",
  city: "Mumbai 400 003",
  country: "India",
};
