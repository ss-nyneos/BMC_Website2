import type { ComponentType } from "react";
import { Logo } from "./assets/logo";
import { SideRail, RAIL_WIDTH } from "./components/nav/SideRail";
import { Footer } from "./components/sections/Footer";
import { NoticeModal } from "./components/ui/NoticeModal";
import { useReveal } from "./hooks/useReveal";
import { useParallax } from "./hooks/useParallax";
import { useLinkInterception, useRoute, useRouteChangeEffects } from "./router";
import { HomePage } from "./pages/HomePage";
import { ContactPage } from "./pages/ContactPage";
import { GstPage } from "./pages/GstPage";
import { FaqPage } from "./pages/FaqPage";
import { DepositRatesPage } from "./pages/DepositRatesPage";
import { DeaFundPage } from "./pages/DeaFundPage";
import { ShareholderPage } from "./pages/ShareholderPage";
import { InterestRatesPage } from "./pages/InterestRatesPage";
import { TermLoansPage } from "./pages/TermLoansPage";
import { OtherLoansPage } from "./pages/OtherLoansPage";
import { WorkingCapitalPage } from "./pages/WorkingCapitalPage";
import { NotFoundPage } from "./pages/NotFoundPage";

/**
 * Route table. Paths are the ones already written into `data/nav.ts`, so the
 * navigation strip, the drawer and the footer index all resolve without being
 * touched.
 */
const routes: Record<string, ComponentType> = {
  "/": HomePage,
  "/contact": ContactPage,
  "/resources/gst": GstPage,
  "/resources/faq": FaqPage,
  "/accounts/deposit-rates": DepositRatesPage,
  "/accounts/dea-fund": DeaFundPage,
  "/resources/shareholder": ShareholderPage,
  "/loans/interest-rates": InterestRatesPage,
  "/loans/term-loans": TermLoansPage,
  "/loans/other": OtherLoansPage,
  "/loans/working-capital": WorkingCapitalPage,
};

/**
 * Application shell.
 *
 * The chrome — skip link, logo, rail, footer — is rendered once and outlives
 * navigation; only the contents of `<main>` are swapped. The notice modal is
 * homepage-only: an interstitial about the AGM in front of somebody who
 * navigated deliberately to the unclaimed-deposits page is an obstacle, not an
 * announcement.
 *
 * There is no top header. Navigation lives entirely in the fixed right rail,
 * so the shell reserves the rail's width as padding rather than letting the
 * rail sit over the content: a fixed overlay would cover the last column of
 * every table on the site.
 *
 * `overflow-x-clip` on the main element contains any animation that briefly
 * exceeds the viewport, so no breakpoint can produce a horizontal scrollbar.
 */
export default function App() {
  const path = useRoute();

  useReveal(path);
  useParallax(path);
  useLinkInterception();
  useRouteChangeEffects(path);

  const Page = routes[path] ?? NotFoundPage;
  const isHome = path === "/";

  return (
    <div id="top" className="min-h-dvh bg-page">
      <a
        href="#main"
        className="sr-only rounded-pill bg-purple px-6 py-3 text-label text-ink focus:not-sr-only focus:absolute focus:left-6 focus:top-6 focus:z-toast"
      >
        Skip to main content
      </a>

      <SideRail />

      <div style={{ paddingRight: RAIL_WIDTH }}>
        {/* No rule under this: a hairline here would read as the header the
            rail replaced. The logo simply sits on the page. */}
        <div className="bg-page">
          <div className="mx-auto flex max-w-container items-center px-6 py-6 sm:px-8">
            <a
              href="/"
              className="inline-flex min-h-11 items-center rounded-lg"
              aria-label="Bombay Mercantile Co-operative Bank, home"
            >
              <Logo />
            </a>
          </div>
        </div>

        {/* Keyed on the path so React remounts the subtree: scroll reveals re-arm
            and no page inherits another page's component state. */}
        <main key={path} id="main" className="w-full max-w-full overflow-x-clip">
          <Page />
        </main>

        <Footer />
      </div>

      {isHome ? (
        <NoticeModal
          title="Notice of the Annual General Meeting"
          body="The Annual General Meeting of the shareholders will be held on 12 August 2026 at the registered office, Zain G. Rangoonwala Building, 78 Mohamedali Road, Mumbai 400 003. The agenda, the audited accounts and the board report are available in the notice."
          cta={{ label: "Read the notice", href: "/notices/agm" }}
        />
      ) : null}
    </div>
  );
}
