import { domesticRates, nreRates } from "./deposit-rates";
import { primeLendingRate } from "./loans";
import { utilityLinks } from "./nav";
import { rates } from "./rates";

/**
 * Content for the homepage sections carried over from bmc_website2.
 *
 * Wherever this site already publishes a figure, it is read from that source
 * rather than copied from bmc_website2, so the homepage can never disagree with
 * the rates pages: the housing and gold rates come from `rates.ts`, the PLR from
 * `loans.ts`, the deposit and NRE rates from `deposit-rates.ts`. Figures only
 * bmc_website2 carried (the forex card rate, the document sizes, the heritage
 * numbers) are reproduced as it published them, with their dates.
 *
 * Links point at this site's own paths, as listed in `nav.ts`, not at
 * bmc_website2's route names.
 */

const rateOf = (product: string) => rates.find((item) => item.product === product)?.rate ?? "";

/** "6.85 / 7.10" -> 6.85: the first figure is the normal rate. */
const firstFigure = (value: string) => Number.parseFloat(value.split("/")[0]);

export const housingRate = rateOf("Housing loan");
export const goldRate = rateOf("Gold loan");

export const nreTopRate = `${Math.max(...nreRates.map((row) => firstFigure(row.rate))).toFixed(2)}%`;

const seniorTwoToThree = domesticRates.find((row) => row.period.startsWith("2 years"));
export const seniorTopDepositRate = seniorTwoToThree ? `${firstFigure(seniorTwoToThree.senior).toFixed(2)}%` : "";
export { primeLendingRate };

export const contactNumbers = {
  missedCallBalance: "09512 004406",
  ivrServices: "09512 004407",
};

export const complaintsUrl = utilityLinks.complaint.href;

export const appStores = {
  play: "https://play.google.com/store/apps/details?id=com.finacus.bmcbank",
  appStore: "https://apps.apple.com/in/app/bmc-bank/id1602195930",
};

/** Forms on the bank's existing server, with their real sizes in bytes. */
const DOCS_ORIGIN = "https://bmc.bank.in/";

export const documents = {
  accountOpening: { href: `${DOCS_ORIGIN}images/savings-account/Individual-Account-Opening-Form.pdf`, bytes: 662702 },
  nomination: { href: `${DOCS_ORIGIN}images/savings-account/Individual-Account-Nomination-Form.pdf`, bytes: 96574 },
  atmDispute: { href: `${DOCS_ORIGIN}images/ATM-Transaction-Dispute-Form.pdf`, bytes: 207052 },
  form121: { href: `${DOCS_ORIGIN}updates/FORM-NO.121.pdf`, bytes: 673211 },
  mobileBanking: { href: `${DOCS_ORIGIN}images/Mobile%20Banking%20Application%20Form.pdf`, bytes: 153037 },
  rupay: { href: `${DOCS_ORIGIN}images/RuPay_Declaration-Form-Mandate.pdf`, bytes: 204859 },
};

/** Bytes -> "240 KB" / "1.2 MB". */
export function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Card rate from bmc.bank.in/Card-rate.php, telegraphic transfer selling. */
export const forexCardUsd = { rate: "92.92", date: "9 March 2026" };

/** Mid-2020s figures as bmc_website2 published them. */
export const heritageStats = [
  { value: "1939", label: "Founded in Mumbai" },
  { value: "1988", label: "Scheduled status from the RBI" },
  { value: "52", label: "Branches, including head office", count: true },
  { value: "10", label: "States", count: true },
  { value: "1M+", label: "Patrons served" },
  { value: "2.25L", label: "Shareholders (31 March 2024)" },
];

export const heritageFirsts = [
  "First co-operative bank granted scheduled status by the Reserve Bank of India, in 1988.",
  "First co-operative bank to receive an RBI “A Category” Authorised Dealer licence for foreign exchange.",
  "First co-operative bank authorised to operate in more than one state.",
  "First co-operative bank to introduce taxi and auto rickshaw financing schemes.",
  "First scheduled urban co-operative bank to launch micro-financing for women artisans from weaker sections.",
];

/**
 * Attribution the licences require, shown under the sections. Every photograph
 * comes from Wikimedia Commons by way of bmc_website2.
 */
export const photoCredits = [
  { subject: "Mumbai skyline", author: "Vidur Malhotra", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Mumbai_Skyline_Wide.jpg" },
  { subject: "Taxi", author: "Vikramdeep Sidhu", license: "CC BY 2.0", source: "https://commons.wikimedia.org/wiki/File:A_taxi_in_Mumbai_(18378638329).jpg" },
  { subject: "₹200 note", author: "WISDOMurali", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:200_rupee_note.jpg" },
  { subject: "Aeroplane window", author: "Tim Gouw", license: "CC0", source: "https://commons.wikimedia.org/wiki/File:Bright_skies_seen_from_a_plane_(Unsplash).jpg" },
  { subject: "Mumbai at sunset", author: "Vyacheslav Argenberg", license: "CC BY 4.0", source: "https://commons.wikimedia.org/wiki/File:Mumbai,_India,_Bombay,_Mumbai_skyline_at_sunset.jpg" },
  { subject: "Chhatrapati Shivaji Terminus", author: "Ondřej Žváček", license: "CC BY 2.5", source: "https://commons.wikimedia.org/wiki/File:Chhatrapati_Shivaji_Terminus.jpg" },
  { subject: "Aircraft wing", author: "Tobias1984", license: "CC BY-SA 3.0", source: "https://commons.wikimedia.org/wiki/File:Airplane_wing_sky_and_clouds.jpg" },
];

/** Photos ship as name-800/1400/2200.webp in /public/images. */
export function photoSources(name: string) {
  return {
    src: `/images/${name}-1400.webp`,
    srcSet: [800, 1400, 2200].map((width) => `/images/${name}-${width}.webp ${width}w`).join(", "),
  };
}
