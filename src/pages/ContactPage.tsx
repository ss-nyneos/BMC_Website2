import { useMemo, useState } from "react";
import { Container } from "../components/layout/Container";
import { PageHeader } from "../components/layout/PageHeader";
import { Section } from "../components/layout/Section";
import { SectionHeading } from "../components/ui/SectionHeading";
import { TextField } from "../components/ui/TextField";
import { PhoneIcon } from "../assets/icons";
import { branchDirectory } from "../data/branch-directory";
import { nodalOfficer, registeredOffice, selfService } from "../data/contact";
import { photoId, photos } from "../data/photos";

/** Strips punctuation and case so "A R Street" matches "ar street". */
function normalise(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function BranchCard({
  name,
  address,
  phone,
  email,
}: {
  name: string;
  address: string;
  phone: string;
  email: string | null;
}) {
  return (
    <li className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-6 sm:p-7">
      <h3 className="text-label font-medium">{name}</h3>

      <address className="not-italic text-meta leading-relaxed text-fg-muted">{address}</address>

      <div className="mt-auto flex flex-col gap-1 pt-2">
        <a
          href={`tel:${phone.replace(/[^\d+]/g, "")}`}
          className="-mx-2 inline-flex min-h-11 items-center gap-2.5 self-start rounded-lg px-2 text-meta font-medium transition-colors duration-200 hover:text-forest dark:hover:text-lavender"
        >
          <PhoneIcon className="h-4 w-4 shrink-0" />
          {phone}
        </a>

        {email ? (
          <a
            href={`mailto:${email}`}
            className="-mx-2 inline-flex min-h-11 items-center self-start break-all rounded-lg px-2 text-meta text-fg-muted underline decoration-transparent underline-offset-4 transition-colors duration-200 hover:text-fg hover:decoration-current"
          >
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
 * The live page opens with a 53-row table of branches and no way to search it.
 * The directory here is filtered as you type, matching branch name, address and
 * mailbox, because the realistic task is "find the branch I bank at", not "read
 * every branch in Maharashtra".
 *
 * The filter is progressive: with JavaScript unavailable the full directory is
 * still rendered, just unfiltered.
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

  return (
    <>
      <PageHeader
        title="Contact us"
        description="The registered office, the numbers that answer without a queue, and every branch the bank runs."
        photo={photos.overseas}
        photoId={photoId.overseas}
        photoField="lavender"
      />

      <Section bg="page" padY="lg" aria-labelledby="office-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
            <div>
              <h2 id="office-heading" className="text-h2">
                {registeredOffice.label}
              </h2>

              <address className="mt-7 not-italic text-body leading-relaxed">
                {registeredOffice.legalName}
                <br />
                {registeredOffice.building}
                <br />
                {registeredOffice.street}
                <br />
                {registeredOffice.city}
              </address>

              <ul className="mt-8 flex flex-col gap-1">
                {registeredOffice.phones.map((phone) => (
                  <li key={phone}>
                    <a
                      href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                      className="-mx-2 inline-flex min-h-11 items-center gap-2.5 rounded-lg px-2 text-body-sm font-medium transition-colors duration-200 hover:text-forest dark:hover:text-lavender"
                    >
                      <PhoneIcon className="h-4 w-4 shrink-0" />
                      {phone}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <ul className="flex flex-col gap-4">
              {selfService.map((item) => (
                <li
                  key={item.label}
                  className="rounded-2xl border border-line bg-lavender-soft p-6 text-ink sm:p-7"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                    <h3 className="text-label font-medium">{item.label}</h3>
                    <a
                      href={item.href}
                      className="inline-flex min-h-11 items-center text-label font-medium text-forest underline decoration-transparent underline-offset-4 transition-colors duration-200 hover:decoration-current"
                    >
                      {item.action}
                    </a>
                  </div>
                  {/* Fixed `ink/70` on the fixed `lavender-soft` panel, not a
                      semantic token that would invert away in dark mode. */}
                  <p className="mt-3 text-meta text-ink/70">{item.detail}</p>
                </li>
              ))}
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

          <div className="mt-10 max-w-md">
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

          <p aria-live="polite" className="mt-6 text-meta text-fg-muted">
            {results.length === branchDirectory.length
              ? `Showing all ${branchDirectory.length} branches.`
              : `${results.length} ${results.length === 1 ? "branch" : "branches"} match “${query}”.`}
          </p>

          {results.length > 0 ? (
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
              {results.map((branch) => (
                <BranchCard
                  key={`${branch.name}-${branch.address}`}
                  name={branch.name}
                  address={branch.address}
                  phone={branch.phone}
                  email={branch.email}
                />
              ))}
            </ul>
          ) : (
            <div className="mt-8 rounded-2xl border border-line bg-page p-8">
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
          <div className="max-w-prose">
            <h2 id="nodal-heading" className="text-h2">
              If a complaint is not resolved
            </h2>
            <p className="mt-5 text-body text-fg-muted">
              Raise it with your branch first. If it stays open, the bank&rsquo;s nodal officer is
              the next step.
            </p>

            <div className="mt-9 rounded-2xl border border-line bg-surface p-7 sm:p-8">
              <p className="text-meta text-fg-muted">{nodalOfficer.role}</p>
              <h3 className="mt-2 text-h3">{nodalOfficer.name}</h3>

              <address className="mt-6 not-italic text-body-sm leading-relaxed text-fg-muted">
                {nodalOfficer.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>

              <div className="mt-6 flex flex-col gap-1">
                <a
                  href={`mailto:${nodalOfficer.email}`}
                  className="-mx-2 inline-flex min-h-11 items-center self-start rounded-lg px-2 text-body-sm font-medium underline decoration-transparent underline-offset-4 transition-colors duration-200 hover:decoration-current"
                >
                  {nodalOfficer.email}
                </a>

                <ul className="flex flex-wrap gap-x-6">
                  {nodalOfficer.phones.map((phone) => (
                    <li key={phone}>
                      <a
                        href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                        className="-mx-2 inline-flex min-h-11 items-center rounded-lg px-2 text-body-sm tabular-nums text-fg-muted transition-colors duration-200 hover:text-fg"
                      >
                        {phone}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
