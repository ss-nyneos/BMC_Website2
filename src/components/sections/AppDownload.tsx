import { Container } from "../layout/Container";
import { AppBadges } from "../ui/AppBadges";
import { BulletList } from "../ui/BulletList";
import { photoId, photos } from "../../data/photos";
import { srcSet } from "../../data/photos";

/**
 * The mobile app, on a brand-gold panel to bookend the hero.
 *
 * The QR is generated at request time by a third-party service so the link in
 * it always matches the URL below. Generate and self-host it before launch: a
 * bank should not depend on an outside host for an image its customers scan.
 */
const QR_TARGET = "https://bmc.bank.in/";
const QR_SRC = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=0&data=${encodeURIComponent(
  QR_TARGET,
)}`;

export function AppDownload() {
  return (
    <section aria-labelledby="app-heading" className="bg-page py-4 lg:py-6">
      <Container>
        <div className="reveal-clip group overflow-hidden rounded-2xl bg-purple px-6 py-14 text-ink shadow-inset sm:px-10 sm:py-16 lg:px-16">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div>
              <h2 id="app-heading" className="max-w-[16ch] text-h2">
                Bank from your phone
              </h2>
              <p className="mt-5 max-w-prose text-body-sm text-ink/80">
                Check balances, move money, pay bills and freeze a lost card, on the same account you
                opened at the branch.
              </p>

              <BulletList
                variant="current"
                size="body-sm"
                className="reveal-stagger mt-9 text-ink/80"
                items={[
                  "Works on Android and iOS",
                  "UPI, NEFT, RTGS and IMPS in one place",
                  "Set your own daily transaction limits",
                ]}
              />

              <div className="mt-10 flex flex-wrap items-center gap-6">
                <AppBadges tone="light" />

                <div className="flex items-center gap-4">
                  <img
                    src={QR_SRC}
                    alt={`QR code linking to ${QR_TARGET}`}
                    width={104}
                    height={104}
                    loading="lazy"
                    decoding="async"
                    className="rounded-lg bg-white p-2"
                    style={{ height: 104, width: 104 }}
                  />
                  <p className="max-w-[16ch] text-fine text-ink/75">
                    Scan to open the download page
                  </p>
                </div>
              </div>
            </div>

            <div className="mx-auto w-full max-w-[380px]" data-parallax="0.08">
              <div className="overflow-hidden rounded-xl shadow-card-hover">
                <img
                  src={photos.devices.src}
                  srcSet={srcSet(photoId.devices, photos.devices.width, photos.devices.height)}
                  alt={photos.devices.alt}
                  width={photos.devices.width}
                  height={photos.devices.height}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
