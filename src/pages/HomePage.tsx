import { Hero } from "../components/sections/Hero";
import { RateStrip } from "../components/sections/RateStrip";
import { LegacyStatement } from "../components/sections/LegacyStatement";
import { BankOfFirsts } from "../components/sections/BankOfFirsts";
import { ExploreProducts } from "../components/sections/ExploreProducts";
import { PillarCards } from "../components/sections/PillarCards";
import { EnquirySection } from "../components/sections/EnquirySection";
import { ProcessTimeline } from "../components/sections/ProcessTimeline";
import { DigitalJourney } from "../components/sections/DigitalJourney";
import { NewsNotices } from "../components/sections/NewsNotices";
import { AppDownload } from "../components/sections/AppDownload";
import { TrustStrip } from "../components/ui/TrustStrip";

/**
 * Homepage, in the order set out in spec section 7.
 *
 * The page reads in three movements: what the bank charges and what it has done
 * (hero through pillars), the ask (form, timeline), then the practical material
 * a customer returns for (digital, notices, app, compliance).
 */
export function HomePage() {
  return (
    <>
      <Hero />
      <RateStrip />
      <LegacyStatement />
      <BankOfFirsts />
      <ExploreProducts />
      <PillarCards />
      <EnquirySection />
      <ProcessTimeline />
      <DigitalJourney />
      <NewsNotices />
      <AppDownload />
      <TrustStrip />
    </>
  );
}
