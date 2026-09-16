import { useEffect, useRef, type ComponentType } from "react";
import { Logo } from "./assets/logo";
import { MenuProvider, MenuTrigger } from "./components/nav/SiteMenu";
import { Footer } from "./components/sections/Footer";
import { PillButton } from "./components/ui/PillButton";
import { utilityLinks } from "./data/nav";
import { NoticeModal } from "./components/ui/NoticeModal";
import { BackToTop } from "./components/ui/BackToTop";
import { useParallax } from "./hooks/useParallax";
import { useReveal } from "./hooks/useReveal";
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
 * The chrome — skip link, logo row, menu, footer — is rendered once and outlives
 * navigation; only the contents of `<main>` are swapped. The notice modal is
 * homepage-only: an interstitial about the AGM in front of somebody who
 * navigated deliberately to the unclaimed-deposits page is an obstacle, not an
 * announcement.
 *
 * There is no header bar and no side rail. Each page's top row carries Net
 * Banking, "Contact us" and the menu trigger; the full-screen menu holds
 * everything else. Nothing is sticky: the trigger scrolls away with the page.
 *
 * `overflow-x-clip` on the main element contains any animation that briefly
 * exceeds the viewport, so no breakpoint can produce a horizontal scrollbar.
 *
 * On the homepage the logo row is not rendered: the hero carries the logo and
 * the same three actions in its own top row. After the first page, each route
 * change fades the new page in; the first load does not, so the hero's own
 * entrance is not delayed.
 */
export default function App() {
  const path = useRoute();

  useReveal(path);
  useParallax(path);
  useLinkInterception();
  useRouteChangeEffects(path);

  const hasMounted = useRef(false);
  const animateIn = hasMounted.current;
  useEffect(() => {
    hasMounted.current = true;
  }, []);

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

      <MenuProvider>
        {/* No rule under this: a hairline here would read as a header bar. The
            logo and the actions simply sit on the page. */}
        {isHome ? null : (
          <div className="bg-page">
            <div className="mx-auto flex max-w-container items-center justify-between gap-4 px-6 py-6 sm:px-8">
              <a
                href="/"
                className="group inline-flex min-h-11 items-center rounded-lg"
                aria-label="Bombay Mercantile Co-operative Bank, home"
              >
                <Logo className="transition-transform duration-500 ease-out-expo group-hover:-rotate-2 group-hover:scale-[1.04]" />
              </a>

              <div className="flex items-center gap-3">
                <PillButton
                  href={utilityLinks.netBanking.href}
                  external
                  variant="purple"
                  size="sm"
                  showArrow={false}
                  className="hidden sm:inline-flex"
                >
                  Net Banking<span className="sr-only"> (opens in a new tab)</span>
                </PillButton>
                <PillButton
                  href="/contact"
                  variant="outline"
                  size="sm"
                  showArrow={false}
                  className="hidden sm:inline-flex"
                >
                  Contact us
                </PillButton>
                <MenuTrigger />
              </div>
            </div>
          </div>
        )}

        {/* Keyed on the path so React remounts the subtree: scroll reveals re-arm
            and no page inherits another page's component state. */}
        <main
          key={path}
          id="main"
          className={`w-full max-w-full overflow-x-clip ${animateIn ? "animate-page-in" : ""}`}
        >
          <Page />
        </main>

        <Footer />

        <BackToTop />
      </MenuProvider>

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
