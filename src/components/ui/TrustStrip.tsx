import { LockIcon, ShieldIcon } from "../../assets/icons";
import { Container } from "../layout/Container";
import { LinkArrow } from "./LinkArrow";

/**
 * The quiet compliance strip: deposit insurance, the ombudsman route, and the
 * security caution every Indian bank is expected to carry.
 *
 * Deliberately the least decorated block on the page. This is the section
 * people read when something has gone wrong, so it stays plain and legible.
 */
export function TrustStrip() {
  return (
    <section aria-labelledby="trust-heading" className="border-y border-line bg-surface py-12">
      <Container>
        <h2 id="trust-heading" className="sr-only">
          Deposit insurance, complaints and security
        </h2>

        <div className="reveal-stagger grid gap-9 lg:grid-cols-3 lg:gap-12">
          <div className="flex items-start gap-4">
            <ShieldIcon className="mt-0.5 h-7 w-7 shrink-0 text-forest dark:text-lavender" />
            <div>
              <p className="text-label font-medium">Registered with DICGC</p>
              <p className="mt-2 text-fine text-fg-muted">
                Deposits are insured by the Deposit Insurance and Credit Guarantee Corporation up to
                ₹5 lakh per depositor, covering principal and interest together.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <LockIcon className="mt-0.5 h-7 w-7 shrink-0 text-forest dark:text-lavender" />
            <div>
              <p className="text-label font-medium">Never share your PIN or OTP</p>
              <p className="mt-2 text-fine text-fg-muted">
                No BMC employee will ever ask for your PIN, password, CVV or one-time passcode by
                call, SMS or email. Report any such request to customer care immediately.
              </p>
            </div>
          </div>

          <div>
            <p className="text-label font-medium">Unresolved complaint?</p>
            <p className="mt-2 text-fine text-fg-muted">
              If your complaint is open after thirty days, you may escalate it to the Reserve Bank of
              India.
            </p>
            <LinkArrow
              href="https://cms.rbi.org.in"
              external
              className="mt-4 text-fine"
              tone="lavender"
            >
              Read the RBI Integrated Ombudsman Scheme
            </LinkArrow>
          </div>
        </div>
      </Container>
    </section>
  );
}
