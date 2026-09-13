import type { FaqGroup } from "../types";

/**
 * The bank's published FAQ, from the live FAQ page.
 *
 * Every rule, figure, threshold and definition is carried across unchanged —
 * the 12-month FCNR minimum, the 14-day renewal window, the 4% overdue rate,
 * the USD 1 million NRO limit, the ten-year property holding period. What has
 * changed is the prose: the live answers run to unpunctuated single sentences
 * with several typos, and this site sets its copy to the standard in DESIGN.md.
 * Nothing has been added and nothing dropped.
 *
 * The two group headings are this revamp's; the live page is one flat list of
 * eleven questions, which is a hard thing to scan when seven of them turn out
 * to be about NRI accounts.
 */
export const faqGroups: FaqGroup[] = [
  {
    label: "Deposits and nomination",
    entries: [
      {
        question:
          "Can a large savings balance move into a fixed deposit automatically, and come back when I need it?",
        blocks: [
          {
            kind: "para",
            text: "Yes. The Flexi Deposit scheme does exactly that. A savings account holder can opt into it to earn the higher fixed-deposit rate on the surplus, while the money remains available to clear cheques and other withdrawals as they arise.",
          },
        ],
      },
      {
        question: "Which deposits can carry a nomination?",
        blocks: [
          {
            kind: "para",
            text: "The nomination facility is available on all types of deposit account, irrespective of the nomenclature used by different banks.",
          },
        ],
      },
      {
        question: "Can a joint deposit account name more than one nominee?",
        blocks: [
          {
            kind: "para",
            text: "No. There cannot be more than one nominee in the case of a joint deposit account.",
          },
        ],
      },
      {
        question: "Can articles held jointly in safe deposit custody carry a nomination?",
        blocks: [
          {
            kind: "para",
            text: "The nomination facility is available only in the case of an individual depositor, and not where persons jointly deposit articles for safe custody.",
          },
        ],
      },
    ],
  },
  {
    label: "NRI accounts",
    entries: [
      {
        question: "Who is a Non-Resident Indian?",
        blocks: [
          {
            kind: "para",
            text: "A Non-Resident Indian is a person resident outside India who is a citizen of India, that is:",
          },
          {
            kind: "list",
            items: [
              "Indian citizens who go abroad for employment, to carry on any business or vocation, or for any other purpose in circumstances indicating an indefinite period of stay outside India.",
              "Indian citizens working abroad on assignments with foreign governments, government agencies, or international and multinational agencies such as the United Nations Organisation (UNO), the International Monetary Fund (IMF) and the World Bank.",
              "Officials of central and state governments and public sector undertakings deputed abroad on assignments with foreign government agencies or organisations, or posted to their own offices, including Indian diplomatic missions abroad.",
            ],
          },
          {
            kind: "para",
            text: "It also means a person of Indian origin who is a citizen of any country other than Bangladesh or Pakistan, if:",
          },
          {
            kind: "list",
            items: [
              "he at any time held an Indian passport; or",
              "he, either of his parents, or any of his grandparents was a citizen of India by virtue of the Constitution of India or the Citizenship Act 1955 (57 of 1955); or",
              "the person is the spouse of an Indian citizen, or of a person referred to in either of the two clauses above.",
            ],
          },
        ],
      },
      {
        question: "How can an NRI open an account?",
        blocks: [
          {
            kind: "para",
            text: "The easiest way is to contact the nearest branch of Bombay Mercantile Co-operative Bank, which will help complete the formalities and open the account. If no branch is within reach, send the following to the branch where you want the account opened:",
          },
          {
            kind: "list",
            items: [
              "An introduction by an existing customer of the branch, or verification by your present banker or by embassy officials abroad.",
              "Copies of the important pages of your passport — name, signature, date of birth, place and date of issue, and expiry date — duly authenticated by a notary public or by officials of the Indian embassy.",
              "Two passport-size photographs, signed on the reverse.",
              "The remittance for opening the account.",
            ],
          },
        ],
      },
      {
        question: "Can an NRI grant power of attorney to a resident?",
        blocks: [
          {
            kind: "para",
            text: "An NRI is free to grant power of attorney to a resident, but such a power of attorney is restrictive. The holder can carry out local operations and give deposit renewal instructions. The holder cannot instruct the bank to transfer funds abroad.",
          },
        ],
      },
      {
        question: "What are the rules on premature payment of a deposit?",
        blocks: [
          {
            kind: "para",
            text: "The bank may permit payment of a deposit before maturity. The rules are broadly as follows.",
          },
          { kind: "subhead", text: "FCNR and NRE schemes" },
          {
            kind: "list",
            items: [
              "No interest is payable if the deposit is withdrawn before the minimum maturity of 12 months from the effective date of the deposit.",
              "In other cases, interest is payable at the rate applicable on the date of deposit for the period run, or the contracted rate, whichever is less, minus a 1% penalty for NRE deposits. For FCNR deposits, interest is payable at the rate applicable on the date of the deposit for the period run, minus a 1% penalty. Where the applicable rate is less than 1%, no deduction is made from the principal.",
            ],
          },
          { kind: "subhead", text: "NRO deposits" },
          {
            kind: "list",
            items: [
              "No interest is payable if a term deposit is withdrawn before 15 days have run.",
              "Interest is payable at the rate applicable on the date of deposit for the period run, or the contracted rate, whichever is less, minus a 1% penalty.",
            ],
          },
        ],
      },
      {
        question: "Is interest payable on an overdue deposit?",
        blocks: [
          { kind: "subhead", text: "FCNR and NRE deposit schemes" },
          {
            kind: "list",
            items: [
              "Where renewal instructions reach the branch holding the deposit within 14 days of the due date, renewal with retrospective effect from the due date is permitted. The rate payable on the renewed amount is the appropriate rate for the period of renewal prevailing on the date of maturity, or on the date the depositor seeks renewal, whichever is lower.",
              "Where renewal instructions arrive more than 14 days after the due date, retrospective renewal is not permitted. Simple interest for the overdue period is payable at 4% per annum, or at the minimum rate of interest for the currency prevailing on the date of renewal, whichever is lower.",
            ],
          },
          { kind: "subhead", text: "NRO deposits" },
          {
            kind: "list",
            items: [
              "An overdue deposit can be renewed with retrospective effect from the due date, provided it is renewed for a minimum of 15 days from the date of renewal.",
            ],
          },
        ],
      },
      {
        question: "What happens to my accounts when I become an NRI, and what is an NRO account?",
        blocks: [
          {
            kind: "para",
            text: "The accounts of an erstwhile resident Indian are designated Non-Resident Ordinary (NRO) accounts. An NRI can also open an NRO account to collect local accruals in India. The rates of interest on domestic deposits apply to these accounts, and income tax is deducted at source on the interest earned.",
          },
          {
            kind: "para",
            text: "Remittances of up to USD 1 million for any purpose per calendar year are permitted from the balances in NRO accounts, subject to payment of applicable taxes. That limit includes the sale proceeds of immovable property held by NRIs and persons of Indian origin for a period of ten years. Where a property is sold after being held for less than ten years, the remittance can be made once the proceeds have been held for the balance of that period.",
          },
        ],
      },
      {
        question: "What happens when an NRI becomes a resident again?",
        blocks: [
          {
            kind: "para",
            text: "Under prevailing exchange control regulations, an NRI must tell the bank about the change in residential status immediately on returning to India. Rupee accounts are redesignated as resident rupee accounts at once. Rupee term deposits continue at the contracted rate of interest until the due date, and FCNR deposits may also be continued at the contracted rates until the due date. Funds can instead be kept in US dollars by opting for a Resident Foreign Currency (RFC) account.",
          },
        ],
      },
    ],
  },
];
