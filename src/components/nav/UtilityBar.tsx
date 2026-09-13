import { ExternalIcon, PhoneIcon } from "../../assets/icons";
import { Container } from "../layout/Container";
import { utilityLinks } from "../../data/nav";
import { DarkModeToggle } from "./DarkModeToggle";

/**
 * The slim strip above the navbar. Carries the four things a visitor in
 * difficulty needs first: the care number, the theme switch, the complaint
 * route, and the login.
 *
 * Below sm it keeps the phone number and the login and drops the rest, which
 * the navbar and footer both still carry.
 */
export function UtilityBar() {
  return (
    <div className="border-b border-line bg-page">
      <Container className="flex h-14 items-center justify-between gap-4">
        <a
          href={utilityLinks.careHref}
          className="flex min-h-11 items-center gap-2.5 rounded-pill py-3 text-fine text-fg-muted transition-colors duration-200 hover:text-fg"
        >
          <PhoneIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Customer care</span>
          <span className="font-medium text-fg">{utilityLinks.careNumber}</span>
        </a>

        <div className="flex items-center gap-2.5">
          <a
            href={utilityLinks.complaint.href}
            target="_blank"
            rel="noreferrer noopener"
            className="hidden min-h-11 items-center gap-2 rounded-pill px-3 py-3 text-fine text-fg-muted transition-colors duration-200 hover:text-fg sm:flex"
          >
            {utilityLinks.complaint.label}
            <ExternalIcon className="h-3.5 w-3.5" />
          </a>

          <DarkModeToggle />

          <a
            href={utilityLinks.netBanking.href}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex h-11 items-center gap-2 rounded-pill border border-line bg-purple px-5 text-fine font-medium text-ink transition-colors duration-200 ease-out-quint hover:bg-purple-deep"
          >
            {utilityLinks.netBanking.label}
            <ExternalIcon className="h-3.5 w-3.5" />
          </a>
        </div>
      </Container>
    </div>
  );
}
