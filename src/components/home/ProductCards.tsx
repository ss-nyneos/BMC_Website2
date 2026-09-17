import {
  BriefcaseBusiness,
  Building2,
  CarTaxiFront,
  CreditCard,
  Gem,
  Globe,
  House,
  Landmark,
  PiggyBank,
  PlaneTakeoff,
  Repeat,
  Send,
  Vault,
  Wallet,
} from "../../assets/icons/lucide";
import { goldRate, housingRate, nreTopRate, photoSources } from "../../data/home-sections";
import { SectionCard, type SectionCardProps } from "./SectionCard";

/**
 * The four product cards from bmc_website2, alternating light and navy. Copy
 * and order are as that site had them; links are this site's own paths.
 */
const cards: SectionCardProps[] = [
  {
    id: "deposits",
    title: "Deposit accounts",
    variant: "light",
    eyebrow: { accent: "Bharosa", text: "that compounds" },
    queries: [
      { label: "How do I open a savings account with BMC Bank?", href: "/accounts/savings" },
      { label: "What does a senior citizen earn on a term deposit?", href: "/accounts/deposit-rates" },
    ],
    queriesCta: { label: "Learn more", href: "/accounts/savings" },
    image: {
      ...photoSources("skyline"),
      alt: "The Mumbai skyline on a clear day, with tree-lined neighbourhoods below",
      position: "62% 60%",
    },
    inset: {
      heading: "Open a deposit that fits how you save",
      actions: [
        { label: "View rates", href: "/accounts/deposit-rates" },
        { label: "Explore all", href: "/accounts/term-deposits", variant: "secondary" },
      ],
      options: [
        { icon: PiggyBank, title: "Savings Account", description: "For everyday banking", href: "/accounts/savings" },
        { icon: BriefcaseBusiness, title: "Current Account", description: "For your business", href: "/accounts/current" },
        { icon: Landmark, title: "Term Deposit", description: "For assured growth", href: "/accounts/term-deposits" },
        { icon: Repeat, title: "Recurring Deposit", description: "For a monthly habit", href: "/accounts/term-deposits" },
      ],
    },
  },
  {
    id: "loans",
    title: "Loans and advances",
    variant: "dark",
    eyebrow: { accent: "Bharosa", text: `at ${housingRate}` },
    queries: [
      { label: "What can I borrow against gold ornaments?", href: "/loans/gold" },
      { label: "How does BMC finance a taxi or auto rickshaw?", href: "/loans/term-loans" },
    ],
    queriesCta: { label: "Learn more", href: "/loans/interest-rates" },
    image: {
      ...photoSources("taxi"),
      alt: "A black-and-yellow Premier Padmini taxi on a Mumbai street",
      position: "45% 62%",
    },
    inset: {
      heading: "Borrow for what’s next",
      actions: [
        { label: "See all rates", href: "/loans/interest-rates" },
        { label: "Explore more", href: "/loans/other", variant: "secondary" },
      ],
      options: [
        { icon: House, title: "Housing Loan", description: `From ${housingRate} p.a.`, href: "/loans/interest-rates" },
        { icon: Gem, title: "Gold Loan", description: `${goldRate} p.a., against ornaments`, href: "/loans/gold" },
        { icon: CarTaxiFront, title: "Vehicle Loan", description: "Cars, taxis and autos", href: "/loans/term-loans" },
        { icon: Building2, title: "Working Capital", description: "For your business", href: "/loans/working-capital" },
      ],
    },
  },
  {
    id: "services",
    title: "Services and remittance",
    variant: "light",
    eyebrow: { accent: "Bharosa", text: "across 10 states" },
    queries: [
      { label: "How do I send money abroad through BMC Bank?", href: "/services/forex" },
      { label: "What does a demand draft cost?", href: "/services/remittance" },
    ],
    queriesCta: { label: "Learn more", href: "/services/other" },
    image: {
      ...photoSources("note"),
      alt: "A ₹200 note held up beside the Sanchi Stupa gateway it depicts",
      position: "30% 55%",
    },
    inset: {
      heading: "Move and keep your money safely",
      actions: [{ label: "Service charges", href: "/services/charges" }],
      options: [
        { icon: Send, title: "Remittance", description: "Drafts and transfers", href: "/services/remittance" },
        { icon: Globe, title: "Foreign Exchange", description: "“A Category” AD licence", href: "/services/forex" },
        { icon: CreditCard, title: "ATM Services", description: "Ten onsite ATMs", href: "/services/atm" },
        { icon: Vault, title: "Safe Deposit Locker", description: "Keep valuables safe", href: "/services/locker" },
      ],
    },
  },
  {
    id: "nri",
    title: "NRI banking",
    variant: "dark",
    eyebrow: { accent: "Bharosa", text: "across borders" },
    queries: [
      { label: "What is the difference between an NRE and an NRO account?", href: "/accounts/deposit-rates#nre-heading" },
      { label: "What does an FCNR(B) deposit earn?", href: "/accounts/deposit-rates#fcnr-heading" },
    ],
    queriesCta: { label: "Learn more", href: "/accounts/deposit-rates" },
    image: { ...photoSources("window"), alt: "A traveller looking out of an aeroplane window at the clouds" },
    inset: {
      heading: "Bank at home, from anywhere",
      actions: [{ label: "NRI rates", href: "/accounts/deposit-rates#nre-heading" }],
      options: [
        { icon: Wallet, title: "NRE Savings", description: "Repatriable", href: "/accounts/deposit-rates#nre-heading" },
        { icon: PiggyBank, title: "NRO Savings", description: "For income earned in India", href: "/accounts/deposit-rates" },
        { icon: PlaneTakeoff, title: "NRE Term Deposit", description: `Up to ${nreTopRate} p.a.`, href: "/accounts/deposit-rates#nre-heading" },
        { icon: Globe, title: "FCNR(B)", description: "In foreign currency", href: "/accounts/deposit-rates#fcnr-heading" },
      ],
    },
  },
];

/** Renders the named cards, in the order given. */
export function ProductCards({ ids }: { ids: string[] }) {
  return (
    <>
      {ids.map((id) => {
        const card = cards.find((item) => item.id === id);
        return card ? <SectionCard key={id} {...card} /> : null;
      })}
    </>
  );
}
