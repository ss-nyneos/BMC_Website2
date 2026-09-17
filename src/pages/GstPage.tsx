import { useEffect, useRef, useState } from "react";
import { Container } from "../components/layout/Container";
import { PageHeader } from "../components/layout/PageHeader";
import { Section } from "../components/layout/Section";
import { SectionHeading } from "../components/ui/SectionHeading";
import { CalloutPanel } from "../components/ui/CalloutPanel";
import { IconChip } from "../components/ui/IconChip";
import { LinkArrow } from "../components/ui/LinkArrow";
import { CheckIcon, CopyIcon, DocumentIcon, SignalIcon } from "../assets/icons";
import { photoId, photos } from "../data/photos";
import { gstIssuer, gstRegistrations, smsChargeNote } from "../data/gst";

/**
 * The fifteen characters of a GSTIN, as the GST registration format defines
 * them. This explains the format; it states nothing about the bank beyond what
 * its own published numbers already show.
 */
const anatomy = [
  {
    part: "27",
    name: "State code",
    tone: "bg-purple",
    body: "The first two digits name the state. 27 is Maharashtra, and every registration below starts with its own state's code.",
  },
  {
    part: "AAAAB2359J",
    name: "The bank's PAN",
    tone: "bg-lavender",
    body: "Characters three to twelve are the bank's Permanent Account Number, so they are the same in every registration.",
  },
  {
    part: "1",
    name: "Registration in the state",
    tone: "bg-mint",
    body: "Counts the bank's registrations within one state. Maharashtra's second, for the Input Service Distributor, carries a 2.",
  },
  {
    part: "Z",
    name: "Default character",
    tone: "bg-sage",
    body: "Set to Z in every GSTIN.",
  },
  {
    part: "S",
    name: "Check character",
    tone: "bg-purple",
    body: "Worked out from the other fourteen, so a GSTIN copied with a wrong character fails validation.",
  },
];

/**
 * Click to explore the GSTIN. Each segment is a button: hovering or focusing it
 * previews its meaning, and a click keeps it. The explanation pops in beneath,
 * so nothing depends on hover alone and a phone gets the same thing by tapping.
 */
function GstinAnatomy() {
  const [active, setActive] = useState(0);
  const [preview, setPreview] = useState<number | null>(null);
  const shown = anatomy[preview ?? active];

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
      <div className="reveal-pop rounded-2xl bg-surface p-6 shadow-card sm:p-10">
        <p className="text-meta text-fg-muted">Maharashtra, taken apart</p>
        <div
          className="mt-6 flex flex-wrap gap-2.5"
          role="group"
          aria-label="Parts of a GSTIN"
          onMouseLeave={() => setPreview(null)}
        >
          {anatomy.map((segment, index) => {
            const isOn = (preview ?? active) === index;
            return (
              <button
                key={segment.part}
                type="button"
                aria-pressed={active === index}
                aria-controls="gstin-part"
                onClick={() => setActive(index)}
                onMouseEnter={() => setPreview(index)}
                onFocus={() => setPreview(index)}
                onBlur={() => setPreview(null)}
                className={`relative min-h-14 rounded-xl px-4 text-h3 font-bold uppercase tabular-nums tracking-[0.08em] text-ink transition-[transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 sm:px-5 ${segment.tone} ${
                  isOn ? "-translate-y-1 shadow-pill-hover" : "shadow-inset"
                }`}
              >
                <span className="sr-only">{segment.name}: </span>
                {segment.part}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-3 -bottom-2.5 h-1 origin-center rounded-pill bg-fg transition-transform duration-500 ease-out-expo ${
                    isOn ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </button>
            );
          })}
        </div>
        <p className="mt-9 text-meta text-fg-muted">
          Hover over a part, or select it, to see what it means.
        </p>
      </div>

      {/* The explanation takes the colour of the part it explains, so the card
          itself changes from blue to green as the parts are explored. */}
      <div
        id="gstin-part"
        aria-live="polite"
        className={`reveal-pop relative overflow-hidden rounded-2xl p-7 text-ink shadow-inset transition-colors duration-500 ease-out-expo [--reveal-delay:120ms] sm:p-10 ${shown.tone}`}
      >
        <span
          aria-hidden="true"
          className="absolute -bottom-16 -right-16 h-48 w-48 rounded-pill border-[28px] border-white/30"
        />
        <div key={shown.part} className="relative animate-pop-in">
          <p className="inline-flex rounded-pill bg-white px-4 py-1.5 text-label font-bold uppercase tabular-nums tracking-[0.08em] shadow-pill">
            {shown.part}
          </p>
          <h3 className="mt-6 text-h3">{shown.name}</h3>
          <p className="mt-3 text-body-sm text-ink/80">{shown.body}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * Copies a GSTIN and says so. The confirmation pops in on the button itself and
 * is announced once; it clears after two seconds. If the browser refuses the
 * clipboard, the button says to copy by hand instead of pretending it worked.
 */
function CopyButton({ value, label }: { value: string; label: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<number>();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setState("copied");
    } catch {
      setState("failed");
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState("idle"), 2000);
  };

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className="inline-flex h-11 items-center gap-2 rounded-pill bg-white px-4 text-meta font-medium text-ink shadow-pill transition-[transform,box-shadow] duration-300 ease-out-expo hover:-translate-y-0.5 hover:shadow-pill-hover active:scale-[0.96]"
      >
        {state === "copied" ? (
          <span key="done" className="inline-flex items-center gap-2 animate-pop-in">
            <CheckIcon className="h-4 w-4" />
            Copied
          </span>
        ) : (
          <span key="copy" className="inline-flex items-center gap-2">
            <CopyIcon className="h-4 w-4" />
            {state === "failed" ? "Select to copy" : "Copy"}
          </span>
        )}
        <span className="sr-only"> GSTIN for {label}</span>
      </button>
      <span className="sr-only" aria-live="polite">
        {state === "copied" ? `GSTIN for ${label} copied.` : ""}
      </span>
    </>
  );
}

/**
 * The bank's GST registration numbers.
 *
 * A customer arrives here for one reason: to copy the GSTIN for the state they
 * bank in, into a return. So each registration is a card with the state first,
 * the GSTIN large in tabular figures with wider tracking, and a copy button that
 * puts it on the clipboard exactly as published. Below them, the number is taken
 * apart, so a customer can check they have the right state before they paste it.
 *
 * Cards alternate pale blue and pale green; the Input Service Distributor
 * registration is the odd one out and sits on the saturated blue, spanning the
 * last row so the grid closes without a gap.
 */
export function GstPage() {
  const stateCount = new Set(
    gstRegistrations.filter((row) => !row.state.includes("ISD")).map((row) => row.state),
  ).size;

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Resources" }, { label: "GST registration numbers" }]}
        title="GST registration numbers"
        description="Bombay Mercantile Co-operative Bank is registered for GST in each state where it operates. Use the number for the state your branch is in."
        meta={gstIssuer}
        photo={photos.rubberStamp}
        photoId={photoId.rubberStamp}
        photoField="mint"
        facts={[
          {
            icon: DocumentIcon,
            value: `${gstRegistrations.length} GSTINs`,
            label: `across ${stateCount} states`,
          },
          { icon: CheckIcon, value: "All active", label: "as published" },
        ]}
      />

      <Section bg="page" padY="lg" aria-labelledby="gst-list" className="!pt-4 md:!pt-6">
        <Container>
          <SectionHeading
            id="gst-list"
            title="Registrations by state"
            description="Copy the GSTIN for the state your branch is in. Each is reproduced exactly as the accounts department publishes it."
          />

          <ul className="reveal-stagger mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {gstRegistrations.map((row, index) => {
              const isd = row.state.includes("ISD");
              const code = row.gstin.slice(0, 2);
              const surface = isd ? "bg-purple" : index % 2 === 0 ? "bg-lavender-soft" : "bg-sage";
              const badge = isd ? "bg-white" : index % 2 === 0 ? "bg-purple" : "bg-mint";

              return (
                <li
                  key={row.gstin}
                  className={`on-accent group spotlight flex flex-col gap-6 rounded-xl p-6 text-ink shadow-inset transition-[box-shadow] duration-500 ease-out-expo hover:shadow-inset-hover sm:p-7 ${surface} ${
                    isd ? "sm:col-span-2" : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      aria-hidden="true"
                      className={`grid h-12 w-12 shrink-0 place-items-center rounded-pill text-label font-bold tabular-nums transition-transform duration-500 ease-out-expo group-hover:-rotate-[10deg] group-hover:scale-110 ${badge}`}
                    >
                      {code}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-label font-bold">{row.state}</h3>
                      <p className="mt-0.5 flex items-center gap-2 text-fine text-ink/80">
                        <span aria-hidden="true" className="h-2 w-2 rounded-pill bg-mint-deep" />
                        {row.status}
                        {isd ? ", Input Service Distributor" : null}
                      </p>
                    </div>
                  </div>

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-t border-ink/10 pt-5">
                    <p className="whitespace-nowrap text-body font-bold tabular-nums tracking-[0.06em]">
                      <span className="sr-only">GSTIN </span>
                      {row.gstin}
                    </p>
                    <CopyButton value={row.gstin} label={row.state} />
                  </div>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      <Section bg="white" padY="lg" aria-labelledby="gstin-anatomy">
        <Container>
          <SectionHeading
            id="gstin-anatomy"
            title="Reading a GSTIN"
            description="Fifteen characters, five parts. Select a part to see what it means."
          />
          <div className="mt-10">
            <GstinAnatomy />
          </div>
        </Container>
      </Section>

      <Section bg="page" padY="md" aria-labelledby="gst-sms">
        <Container>
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
            <div className="reveal-pop group spotlight flex flex-col justify-between gap-10 rounded-2xl bg-purple p-8 text-ink shadow-inset sm:p-10">
              <IconChip icon={SignalIcon} tone="white" size="lg" />
              <p>
                <span className="block text-display tabular-nums">₹0.21</span>
                <span className="mt-1 block text-meta text-ink/80">per SMS, plus 18% GST</span>
              </p>
            </div>

            <CalloutPanel
              id="gst-sms"
              tone="sage"
              title="SMS charges"
              actions={
                <LinkArrow href="/contact" tone="ink">
                  Ask your branch
                </LinkArrow>
              }
            >
              {smsChargeNote}
            </CalloutPanel>
          </div>
        </Container>
      </Section>
    </>
  );
}
