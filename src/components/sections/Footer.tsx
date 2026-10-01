import { Logo } from "../../assets/logo";
import { PhoneIcon } from "../../assets/icons";
import { Container } from "../layout/Container";
import { AppBadges } from "../ui/AppBadges";
import { SocialLinks } from "../ui/SocialLinks";
import { branches, headOffice } from "../../data/branches";
import { footerGroups, utilityLinks } from "../../data/nav";

/**
 * Full footer on the footer tone of the brand blue (the `purple-950` role token).
 *
 * The navigation strip is deliberately shallow, so this is the only place every
 * destination on the site is reachable in one view. It sits on a fixed light
 * blue panel in both themes, which is why the text tokens here are literal
 * `ink` rather than the semantic foreground. Faint text runs at `/75`, not the
 * `/70` used elsewhere, because the blue footer tone is light
 * and needs the extra opacity to hold 4.5:1 at 14px.
 */
function FooterColumn({ label, links }: { label: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-fine font-bold text-ink">{label}</h3>
      {/* Padding, not gaps: each row is a 44px target, which a 14px line of
          text plus a 12px gap is not. */}
      <ul className="mt-3 flex flex-col">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="-mx-2 block rounded-lg px-2 py-4 text-fine leading-none text-ink/75 underline decoration-transparent underline-offset-4 transition-colors duration-200 hover:text-ink hover:decoration-ink/40"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-purple-950 text-ink">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_2.4fr] lg:gap-16">
          <div>
            {/* Stands alone rather than inside a link, so the artwork carries
                the accessible name itself. */}
            <Logo height={96} alt="Bombay Mercantile Co-operative Bank Ltd." />

            <address className="mt-8 not-italic text-fine leading-relaxed text-ink/75">
              {headOffice.name}
              <br />
              {headOffice.street}
              <br />
              {headOffice.city}
            </address>

            <a
              href={utilityLinks.careHref}
              className="mt-6 inline-flex min-h-11 items-center gap-2.5 rounded-pill py-2 text-fine text-ink/75 transition-colors duration-200 hover:text-ink"
            >
              <PhoneIcon className="h-4 w-4" />
              Customer care <span className="font-medium text-ink">{utilityLinks.careNumber}</span>
            </a>

            <div className="mt-8">
              <SocialLinks />
            </div>
          </div>

          <nav aria-label="Footer" className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {footerGroups.map((group) => (
              <FooterColumn key={group.label} label={group.label} links={group.links} />
            ))}
          </nav>
        </div>

        <div className="mt-16 grid gap-10 border-t border-ink/20 pt-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <h3 className="text-fine font-bold">Get the mobile app</h3>
            <div className="mt-5">
              <AppBadges tone="light" />
            </div>
          </div>

          <div>
            <h3 className="text-fine font-bold">Branch network</h3>
            <p className="mt-5 max-w-prose text-fine text-ink/75">
              {branches.map((branch) => branch.state).join(" · ")}. Full addresses and IFSC codes are
              in the branch list.
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-ink/20 pt-10">
          <p className="max-w-[92ch] text-legal text-ink/75">
            Bombay Mercantile Co-operative Bank Ltd. is registered with the Deposit Insurance and
            Credit Guarantee Corporation. Deposits are insured up to ₹5 lakh per depositor. SMS and
            data charges may be levied by your mobile operator for alerts and app use. The bank never
            asks for your PIN, password, CVV or one-time passcode; do not share them with anyone,
            including anyone claiming to be a bank employee.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-legal text-ink/75">
              © {year} Bombay Mercantile Co-operative Bank Ltd. All rights reserved.
            </p>
            <ul className="-my-3 flex flex-wrap gap-x-6">
              <li>
                <a
                  href="/privacy-policy"
                  className="-mx-2 block rounded-lg px-2 py-4 text-legal leading-none text-ink/75 underline decoration-transparent underline-offset-4 transition-colors duration-200 hover:text-ink hover:decoration-ink/40"
                >
                  Privacy policy
                </a>
              </li>
              <li>
                <a
                  href="/terms-of-use"
                  className="-mx-2 block rounded-lg px-2 py-4 text-legal leading-none text-ink/75 underline decoration-transparent underline-offset-4 transition-colors duration-200 hover:text-ink hover:decoration-ink/40"
                >
                  Terms of use
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}
