import { useMemo, useState, type ComponentType, type SVGProps } from "react";
import { Container } from "../components/layout/Container";
import { PageHeader } from "../components/layout/PageHeader";
import { Section } from "../components/layout/Section";
import { SectionHeading } from "../components/ui/SectionHeading";
import { TextField } from "../components/ui/TextField";
import { CircleArrow } from "../components/ui/CircleArrow";
import { IconChip } from "../components/ui/IconChip";
import {
  ArrowRightIcon,
  BankIcon,
  ExternalIcon,
  HeadsetIcon,
  KeypadIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  SignalIcon,
} from "../assets/icons";
import { branchDirectory } from "../data/branch-directory";
import { nodalOfficer, registeredOffice, selfService } from "../data/contact";
import { utilityLinks } from "../data/nav";
import { photoId, photos } from "../data/photos";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

/** Strips punctuation and case so "A R Street" matches "ar street". */
function normalise(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/**
 * A dialable href from a number as the bank prints it. "(4 lines)" is a note,
 * not digits, and "0571 2400221 / 2702335" is two numbers, so only the first
 * is dialled; left in, both used to be run together into one wrong number.
 */
const telHref = (phone: string) =>
  `tel:${phone
    .replace(/\(\d+\s*lines?\)/gi, "")
    .split("/")[0]
    .replace(/[^\d+]/g, "")}`;

/** One mark per self-service line, in the order `selfService` lists them. */
const dialArt: { icon: Icon; card: string; chip: "white" | "blue" | "green" }[] = [
  { icon: SignalIcon, card: "bg-mint", chip: "white" },
  { icon: KeypadIcon, card: "bg-lavender-soft", chip: "blue" },
  { icon: HeadsetIcon, card: "bg-sage", chip: "green" },
];

/**
 * Quick searches: the towns with more than one branch, so one tap narrows the
 * directory to something readable. They fill the search field, so the result is
 * the same as typing it, and the field can be edited from there.
 */
const quickTowns = ["Mumbai", "Ahmedabad", "Aurangabad", "Navi Mumbai", "Srinagar"];

function BranchCard({
  name,
  address,
  phone,
  email,
  index,
}: {
  name: string;
  address: string;
  phone: string;
  email: string | null;
  index: number;
}) {
  const isHeadOffice = name === "HO";

  return (
    <li
      className={`group spotlight flex flex-col gap-4 rounded-xl p-6 sm:p-7 ${
        isHeadOffice
          ? "bg-lavender-soft text-ink shadow-inset"
          : "spotlight-surface bg-surface shadow-card"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-label font-bold">{isHeadOffice ? "Head office" : name}</h3>
        <IconChip
          icon={isHeadOffice ? BankIcon : MapPinIcon}
          tone={isHeadOffice ? "blue" : index % 2 === 0 ? "sky" : "mint"}
          size="sm"
        />
      </div>

      <address
        className={`not-italic text-meta leading-relaxed ${isHeadOffice ? "text-ink/80" : "text-fg-muted"}`}
      >
        {address}
      </address>

      <div className="mt-auto flex flex-col gap-1 pt-2">
        <a
          href={telHref(phone)}
          className={`-mx-2 inline-flex min-h-11 items-center gap-2.5 self-start rounded-lg px-2 text-meta font-medium transition-colors duration-200 ${
            isHeadOffice ? "hover:bg-white/60" : "hover:text-forest dark:hover:text-lavender"
          }`}
        >
          <PhoneIcon className="h-4 w-4 shrink-0" />
          {phone}
        </a>

        {email ? (
          <a
            href={`mailto:${email}`}
            className={`-mx-2 inline-flex min-h-11 items-center gap-2.5 self-start break-all rounded-lg px-2 text-meta underline decoration-transparent underline-offset-4 transition-colors duration-200 hover:decoration-current ${
              isHeadOffice ? "text-ink/80 hover:text-ink" : "text-fg-muted hover:text-fg"
            }`}
          >
            <MailIcon className="h-4 w-4 shrink-0" />
            {email}
          </a>
        ) : null}
      </div>
    </li>
  );
}

/**
 * Contact page.
 *
 * It opens on the three ways to reach the bank without visiting: the registered
 * office on the brand blue, and the self-service lines as cards a phone can dial
 * in one tap.
 *
 * The live page's 53-row branch table had no way to search it. The directory
 * here is filtered as you type, matching branch name, address and mailbox, with
 * the busiest towns one tap away, because the realistic task is "find the branch
 * I bank at", not "read every branch in Maharashtra". The filter is progressive:
 * with JavaScript unavailable the full directory is still rendered, unfiltered.
 *
 * The complaint route closes the page as the two steps it is: your branch, then
 * the nodal officer.
 */
export function ContactPage() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const needle = normalise(query);
    if (!needle) return branchDirectory;
    return branchDirectory.filter((branch) =>
      normalise(`${branch.name} ${branch.address} ${branch.email ?? ""}`).includes(needle),
    );
  }, [query]);

  const officeQuery = encodeURIComponent(
    `${registeredOffice.legalName}, ${registeredOffice.street}, ${registeredOffice.city}`,
  );

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Contact us" }]}
        title="Contact us"
        description="The registered office, the numbers that answer without a queue, and every branch the bank runs."
        photo={photos.rotaryPhone}
        photoId={photoId.rotaryPhone}
        photoField="lavender"
        facts={[
          { icon: HeadsetIcon, value: utilityLinks.careNumber, label: "toll-free customer care" },
          {
            icon: MapPinIcon,
            value: `${branchDirectory.length} addresses`,
            label: "in the branch directory",
          },
        ]}
      />

      <Section bg="page" padY="lg" aria-labelledby="office-heading" className="!pt-4 md:!pt-6">
        <Container>
          <div className="grid gap-5 lg:grid-cols-12">
            <div className="on-accent spotlight reveal-pop group relative flex flex-col overflow-hidden rounded-2xl bg-purple p-8 text-ink shadow-inset sm:p-10 lg:col-span-5">
              <span
                aria-hidden="true"
                className="absolute -right-24 -top-24 h-72 w-72 rounded-pill border-[36px] border-white/20 transition-transform duration-1000 ease-out-expo group-hover:scale-110"
              />
              <IconChip icon={BankIcon} tone="white" size="lg" className="relative" />
              <h2 id="office-heading" className="relative mt-8 text-h2">
                {registeredOffice.label}
              </h2>

              <address className="relative mt-5 not-italic text-body-sm leading-relaxed text-ink/80">
                {registeredOffice.legalName}
                <br />
                {registeredOffice.building}
                <br />
                {registeredOffice.street}
                <br />
                {registeredOffice.city}
              </address>

              <ul className="relative mt-8 flex flex-col gap-2.5">
                {registeredOffice.phones.map((phone) => (
                  <li key={phone}>
                    <a
                      href={telHref(phone)}
                      className="inline-flex min-h-12 items-center gap-3 rounded-pill bg-white py-1.5 pl-1.5 pr-5 text-meta font-medium text-ink shadow-pill transition-[transform,box-shadow] duration-300 ease-out-expo hover:-translate-y-0.5 hover:shadow-pill-hover"
                    >
                      <span
                        aria-hidden="true"
                        className="grid h-9 w-9 place-items-center rounded-pill bg-purple"
                      >
                        <PhoneIcon className="h-4 w-4" />
                      </span>
                      {phone}
                    </a>
                  </li>
                ))}
              </ul>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${officeQuery}`}
                target="_blank"
                rel="noreferrer noopener"
                className="relative mt-auto inline-flex min-h-11 items-center gap-2.5 self-start pt-8 text-label font-medium underline decoration-ink/30 underline-offset-[6px] transition-[text-decoration-color] duration-200 hover:decoration-ink"
              >
                Get directions
                <ExternalIcon className="h-4 w-4" />
                <span className="sr-only"> (opens Google Maps in a new tab)</span>
              </a>
            </div>

            <ul className="reveal-stagger grid gap-5 lg:col-span-7">
              {selfService.map((item, index) => {
                const art = dialArt[index % dialArt.length];
                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className={`group spotlight flex h-full flex-col gap-5 rounded-2xl p-6 text-ink shadow-inset transition-[transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-inset-hover sm:flex-row sm:items-center sm:gap-6 sm:p-7 ${art.card}`}
                    >
                      <IconChip icon={art.icon} tone={art.chip} size="lg" />
                      <span className="flex-1">
                        <span className="block text-label font-bold">{item.label}</span>
                        <span className="mt-1.5 block text-meta text-ink/80">{item.detail}</span>
                      </span>
                      <span className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                        <span className="whitespace-nowrap text-h3 tabular-nums">
                          {item.action}
                        </span>
                        <CircleArrow tone="ink" size="sm" />
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </Container>
      </Section>

      <Section bg="white" padY="lg" aria-labelledby="branches-heading">
        <Container>
          <SectionHeading
            id="branches-heading"
            title="Branch directory"
            description={`All ${branchDirectory.length} branches, including the head office and the Srinagar extension counter.`}
          />

          <div className="reveal-pop mt-10 rounded-2xl bg-lavender-soft p-6 text-ink shadow-inset sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,26rem)_1fr] lg:items-end lg:gap-10">
              {/* The field's tokens are semantic and the panel's are not, so
                  the field gets a surface plate that inverts with it. */}
              <div className="rounded-xl bg-surface p-4 text-fg shadow-card">
                <TextField
                  id="branch-search"
                  label="Search branches"
                  type="search"
                  autoComplete="off"
                  hint="By branch name, town or address."
                  value={query}
                  onChange={setQuery}
                />
              </div>

              <div>
                <p id="quick-towns" className="text-meta font-medium text-ink/80">
                  Or jump to a town
                </p>
                <ul aria-labelledby="quick-towns" className="mt-3 flex flex-wrap gap-2.5">
                  {quickTowns.map((town) => {
                    const active = normalise(query) === normalise(town);
                    return (
                      <li key={town}>
                        <button
                          type="button"
                          aria-pressed={active}
                          onClick={() => setQuery(active ? "" : town)}
                          className={`inline-flex h-11 items-center gap-2 rounded-pill px-4 text-meta font-medium transition-[background-color,box-shadow,transform] duration-300 ease-out-expo hover:-translate-y-0.5 active:scale-[0.97] ${
                            active
                              ? "bg-purple text-ink shadow-pill"
                              : "bg-white text-ink shadow-pill hover:shadow-pill-hover"
                          }`}
                        >
                          <MapPinIcon className="h-4 w-4" />
                          {town}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          <p aria-live="polite" className="mt-8 flex items-center gap-3 text-meta text-fg-muted">
            <span
              aria-hidden="true"
              className="grid h-8 min-w-8 place-items-center rounded-pill bg-mint px-2.5 text-fine font-bold tabular-nums text-ink"
            >
              {results.length}
            </span>
            {results.length === branchDirectory.length
              ? `Showing all ${branchDirectory.length} branches.`
              : `${results.length} ${results.length === 1 ? "branch" : "branches"} match “${query}”.`}
          </p>

          {results.length > 0 ? (
            <ul className="reveal-stagger mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
              {results.map((branch, index) => (
                <BranchCard
                  key={`${branch.name}-${branch.address}`}
                  name={branch.name}
                  address={branch.address}
                  phone={branch.phone}
                  email={branch.email}
                  index={index}
                />
              ))}
            </ul>
          ) : (
            <div className="mt-8 rounded-2xl bg-surface p-8 shadow-card animate-pop-in">
              <p className="text-body-sm">
                No branch matches “{query}”. Try the town instead of the branch name, or call
                customer care on{" "}
                <a href="tel:1800220854" className="font-medium underline underline-offset-4">
                  1800 220 854
                </a>
                .
              </p>
            </div>
          )}
        </Container>
      </Section>

      <Section bg="page" padY="lg" aria-labelledby="nodal-heading">
        <Container>
          <SectionHeading
            id="nodal-heading"
            title="If a complaint is not resolved"
            description="Raise it with your branch first. If it stays open, the bank's nodal officer is the next step."
          />

          <div className="mt-10 grid items-stretch gap-5 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.6fr)]">
            <div className="reveal-pop group spotlight flex flex-col rounded-2xl bg-mint p-8 text-ink shadow-inset sm:p-10">
              <IconChip icon={MapPinIcon} tone="white" size="lg" />
              <h3 className="mt-8 text-h3">Your branch</h3>
              <p className="mt-3 text-body-sm text-ink/80">
                Most complaints are settled where the account is held.
              </p>
              <a
                href="#branches-heading"
                className="mt-auto inline-flex min-h-11 items-center gap-2.5 self-start pt-8 text-label font-medium underline decoration-ink/30 underline-offset-[6px] transition-[text-decoration-color] duration-200 hover:decoration-ink"
              >
                Find your branch above
              </a>
            </div>

            <div aria-hidden="true" className="grid place-items-center">
              <span className="reveal-pop grid h-14 w-14 rotate-90 place-items-center rounded-pill bg-surface text-fg shadow-card [--reveal-delay:160ms] lg:rotate-0">
                <ArrowRightIcon className="h-6 w-6" />
              </span>
            </div>

            <div className="on-accent reveal-pop group spotlight relative overflow-hidden rounded-2xl bg-purple p-8 text-ink shadow-inset [--reveal-delay:240ms] sm:p-10">
              <span
                aria-hidden="true"
                className="absolute -right-20 -top-20 h-60 w-60 rounded-pill bg-white/15 transition-transform duration-1000 ease-out-expo group-hover:scale-125"
              />
              <div className="relative flex flex-wrap items-center gap-5">
                <IconChip icon={HeadsetIcon} tone="white" size="lg" />
                <div>
                  <p className="text-meta text-ink/80">{nodalOfficer.role}</p>
                  <h3 className="text-h3">{nodalOfficer.name}</h3>
                </div>
              </div>

              <div className="relative mt-8 grid gap-8 sm:grid-cols-2">
                <address className="not-italic text-body-sm leading-relaxed text-ink/80">
                  {nodalOfficer.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>

                <div className="flex flex-col gap-2">
                  <a
                    href={`mailto:${nodalOfficer.email}`}
                    className="inline-flex min-h-11 items-center gap-2.5 self-start rounded-pill bg-white py-1.5 pl-1.5 pr-5 text-meta font-medium text-ink shadow-pill transition-[transform,box-shadow] duration-300 ease-out-expo hover:-translate-y-0.5 hover:shadow-pill-hover"
                  >
                    <span
                      aria-hidden="true"
                      className="grid h-8 w-8 place-items-center rounded-pill bg-purple"
                    >
                      <MailIcon className="h-4 w-4" />
                    </span>
                    {nodalOfficer.email}
                  </a>
                  <ul className="flex flex-wrap gap-x-5">
                    {nodalOfficer.phones.map((phone) => (
                      <li key={phone}>
                        <a
                          href={telHref(phone)}
                          className="-mx-1 inline-flex min-h-11 items-center rounded-lg px-1 text-meta tabular-nums text-ink/80 underline decoration-transparent underline-offset-4 transition-colors duration-200 hover:text-ink hover:decoration-current"
                        >
                          {phone}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
