/**
 * Shareholder and membership figures, from the live shareholder page.
 *
 * The live page carries these two paragraphs and nothing else — no share
 * transfer form, no dividend history, no AGM papers. The figures are as at
 * 31 March 2024, which is what the bank publishes; they are labelled with that
 * date here rather than presented as current.
 */
export const shareholderAsAt = "31 March 2024";
export const shareholderPriorAsAt = "31 March 2023";

export const shareholderFigures = [
  {
    label: "Total shareholders",
    value: "2,25,481",
    prior: "2,25,566",
  },
  {
    label: "Nominal members",
    value: "276",
    prior: "2,775",
  },
  {
    label: "Nominal membership",
    value: "0.12%",
    prior: "of regular membership",
    isRatio: true,
  },
];

export const shareholderNotes: string[] = [
  "The total number of shareholders of the bank stood at 2,25,481 as on 31 March 2024, as against 2,25,566 as on 31 March 2023.",
  "The number of nominal members as on 31 March 2024 stood at 276, as against 2,775 as on 31 March 2023. The bank has kept the door open to nominal members to facilitate banking transactions.",
  "Nominal membership stood at 0.12% of regular membership, well within the 20% of total membership permitted by the Reserve Bank of India.",
];
