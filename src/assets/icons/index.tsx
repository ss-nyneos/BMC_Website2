import type { SVGProps } from "react";

/**
 * One icon family, drawn in-house on a 24x24 grid with a 2px stroke so weight
 * stays even across the page. Everything inherits `currentColor`; nothing here
 * carries its own colour. Decorative instances are marked aria-hidden by the
 * component that renders them.
 */
type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
  ...props,
});

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 12h13" />
      <path d="m12.5 6 5.5 6-5.5 6" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m6 9.5 6 6 6-6" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
}

export function MinusIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 12h14" />
    </svg>
  );
}

export function SunIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

export function MoonIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M20 13.4A8.2 8.2 0 0 1 10.6 4a8.4 8.4 0 1 0 9.4 9.4Z" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6.5 3h3l1.5 4-2 1.4a12 12 0 0 0 5.6 5.6L16 12l4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3.5 5.2 2 2 0 0 1 5.5 3Z" />
    </svg>
  );
}

export function DownloadIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 4v10" />
      <path d="m8 10.5 4 4 4-4" />
      <path d="M5 19h14" />
    </svg>
  );
}

export function ExternalIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M14 5h5v5" />
      <path d="M19 5 11 13" />
      <path d="M18 14.5V18a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 5 18V8a1.5 1.5 0 0 1 1.5-1.5H10" />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3 5 5.6v5.6c0 4.2 2.9 7.6 7 9.2 4.1-1.6 7-5 7-9.2V5.6Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </svg>
  );
}

export function LockIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="4.5" y="10" width="15" height="10" rx="2.5" />
      <path d="M8.5 10V7.5a3.5 3.5 0 0 1 7 0V10" />
    </svg>
  );
}

/* --- Rate-strip product marks ------------------------------------------- */

export function HouseIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 10.5 12 4l8 6.5" />
      <path d="M6 10v9h12v-9" />
      <path d="M10 19v-5h4v5" />
    </svg>
  );
}

export function GoldIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3.5 15.5h8l-2-5h-4Z" />
      <path d="M12.5 15.5h8l-2-5h-4Z" />
      <path d="M8 9.5h8l-2-5h-4Z" />
      <path d="M2.5 19.5h19" />
    </svg>
  );
}

export function VehicleIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 15.5v-3l1.8-4A2 2 0 0 1 7.7 7h8.6a2 2 0 0 1 1.9 1.5l1.8 4v3" />
      <path d="M3.5 15.5h17V18h-3v-2.5" />
      <circle cx="7.5" cy="18" r="1.6" />
      <circle cx="16.5" cy="18" r="1.6" />
    </svg>
  );
}

/* --- Social ---------------------------------------------------------------- */

export function LinkedInIcon(props: IconProps) {
  return (
    <svg {...base(props)} fill="currentColor" stroke="none">
      <path d="M6.2 9.4H3.4V20h2.8V9.4ZM4.8 4a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4ZM20.6 13.7c0-2.9-1.6-4.5-3.9-4.5a3.4 3.4 0 0 0-3 1.6V9.4H11V20h2.8v-5.6c0-1.5.7-2.4 1.9-2.4s1.8.8 1.8 2.4V20h3.1Z" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg {...base(props)} fill="currentColor" stroke="none">
      <path d="M13.6 20v-7.3h2.5l.4-2.9h-2.9V8c0-.8.2-1.4 1.4-1.4h1.6V4.1c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.3H8v2.9h2.4V20Z" />
    </svg>
  );
}

export function XIcon(props: IconProps) {
  return (
    <svg {...base(props)} fill="currentColor" stroke="none">
      <path d="M17.2 4h2.9l-6.3 7.2L21 20h-5.6l-4.1-5.3L6.5 20H3.6l6.7-7.7L3.4 4H9l3.7 4.9Zm-1 14.2h1.6L8 5.6H6.3Z" />
    </svg>
  );
}

export function YouTubeIcon(props: IconProps) {
  return (
    <svg {...base(props)} fill="currentColor" stroke="none">
      <path d="M21.3 8.2a2.4 2.4 0 0 0-1.7-1.7C18.1 6.1 12 6.1 12 6.1s-6.1 0-7.6.4a2.4 2.4 0 0 0-1.7 1.7A25 25 0 0 0 2.3 12a25 25 0 0 0 .4 3.8 2.4 2.4 0 0 0 1.7 1.7c1.5.4 7.6.4 7.6.4s6.1 0 7.6-.4a2.4 2.4 0 0 0 1.7-1.7 25 25 0 0 0 .4-3.8 25 25 0 0 0-.4-3.8ZM10.1 14.9V9.1L15 12Z" />
    </svg>
  );
}

/* --- Store glyphs ---------------------------------------------------------
   Simplified marks so the badge reads correctly in both themes. Swap these for
   the official Apple and Google badge artwork before production release.
--------------------------------------------------------------------------- */

export function AppleGlyph(props: IconProps) {
  return (
    <svg {...base(props)} fill="currentColor" stroke="none">
      <path d="M16.4 12.5c0-2.1 1.7-3.1 1.8-3.2-1-1.4-2.5-1.6-3-1.6-1.3-.1-2.6.8-3.2.8s-1.7-.8-2.8-.7c-1.4 0-2.7.8-3.4 2.1-1.5 2.6-.4 6.4 1 8.5.7 1 1.6 2.2 2.7 2.1 1.1 0 1.5-.7 2.8-.7s1.7.7 2.8.7 1.9-1 2.6-2a9 9 0 0 0 1.2-2.4c-.1 0-2.4-.9-2.5-3.6ZM14.3 6.3c.6-.7 1-1.7.9-2.7-.9 0-2 .6-2.6 1.3-.6.6-1.1 1.7-1 2.6 1 .1 2-.5 2.7-1.2Z" />
    </svg>
  );
}

export function PlayGlyph(props: IconProps) {
  return (
    <svg {...base(props)} fill="currentColor" stroke="none">
      <path d="M4.2 3.3a1 1 0 0 0-.5.9v15.6a1 1 0 0 0 .5.9l8.3-8.7Zm9.6 7.4 2.9-3-8.4-4.8a1.3 1.3 0 0 0-.5-.2Zm0 2.6-6 6.3c.2 0 .4-.1.5-.2l8.4-4.8Zm1.4-1.5 3-1.7c.7-.4.7-1.5 0-1.9l-3-1.7L12.6 12Z" />
    </svg>
  );
}

/** Account. Circle-and-shoulders, matching the 24x24 / 2px stroke family. */
export function UserIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="9.25" />
      <circle cx="12" cy="10" r="3.25" />
      <path d="M5.9 19.1a6.6 6.6 0 0 1 12.2 0" />
    </svg>
  );
}

/** Bell, for the notification rail. */
export function BellIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M18 9a6 6 0 1 0-12 0c0 4.5-1.6 6-1.6 6h15.2S18 13.5 18 9Z" />
      <path d="M13.7 19a2 2 0 0 1-3.4 0" />
    </svg>
  );
}

/* --- Inner pages ------------------------------------------------------------
   Marks for the product, facility and contact cards on the inner pages. Same
   24x24 grid and 2px stroke as the rest of the family, so a card's icon chip
   never looks borrowed from another set. */

export function CalendarIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="4" y="5.5" width="16" height="14.5" rx="2.5" />
      <path d="M4 10h16" />
      <path d="M8.5 3.5v4M15.5 3.5v4" />
      <path d="M8 14h2M12 14h2M8 17h2" />
    </svg>
  );
}

export function WalletIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M18 8V6.5A1.5 1.5 0 0 0 16.5 5H6a2 2 0 0 0 0 4h12.5A1.5 1.5 0 0 1 20 10.5v7a1.5 1.5 0 0 1-1.5 1.5H6a2 2 0 0 1-2-2V7" />
      <path d="M16 14h.01" />
    </svg>
  );
}

export function PercentIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M18.5 5.5 5.5 18.5" />
      <circle cx="7" cy="7" r="2.25" />
      <circle cx="17" cy="17" r="2.25" />
    </svg>
  );
}

export function UsersIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="9" cy="8.5" r="3.25" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <path d="M15.5 5.6a3.25 3.25 0 0 1 0 5.8" />
      <path d="M17.5 14.2a5.5 5.5 0 0 1 3 4.8" />
    </svg>
  );
}

export function GraduationIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m12 5 9.5 4.5L12 14 2.5 9.5Z" />
      <path d="M6.5 11.5v4c0 1.4 2.5 3 5.5 3s5.5-1.6 5.5-3v-4" />
      <path d="M21.5 9.5v5" />
    </svg>
  );
}

export function SofaIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5.5 11V8a2.5 2.5 0 0 1 2.5-2.5h8A2.5 2.5 0 0 1 18.5 8v3" />
      <path d="M3.5 12.5a2 2 0 0 1 4 0V14h9v-1.5a2 2 0 0 1 4 0V17a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 17Z" />
      <path d="M6 18.5V20M18 18.5V20" />
    </svg>
  );
}

export function DocumentIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M14 3.5H7.5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V8Z" />
      <path d="M14 3.5V8h4.5" />
      <path d="M9 12.5h6M9 16h4" />
    </svg>
  );
}

/** A spreadsheet: the grid is the difference from `DocumentIcon`. */
export function SheetIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="4" y="4" width="16" height="16" rx="2.5" />
      <path d="M4 9.5h16M4 14.75h16M10 9.5V20" />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

export function CopyIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="8.5" y="8.5" width="11.5" height="11.5" rx="2.5" />
      <path d="M15.5 8.5V6.5A2.5 2.5 0 0 0 13 4H6.5A2.5 2.5 0 0 0 4 6.5V13a2.5 2.5 0 0 0 2.5 2.5h2" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

/** A bank or public institution: pediment, columns, plinth. */
export function BankIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3.5 9 12 4l8.5 5Z" />
      <path d="M6 12v5M10 12v5M14 12v5M18 12v5" />
      <path d="M3.5 20h17" />
    </svg>
  );
}

export function GlobeIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17" />
      <path d="M12 3.5c2.3 2.4 3.4 5.2 3.4 8.5s-1.1 6.1-3.4 8.5c-2.3-2.4-3.4-5.2-3.4-8.5S9.7 5.9 12 3.5Z" />
    </svg>
  );
}

export function StoreIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4.5 4.5h15l1.5 4.5a2.75 2.75 0 0 1-5.5 0 2.75 2.75 0 0 1-5.5 0A2.75 2.75 0 0 1 4.5 9 2.5 2.5 0 0 1 3 9Z" />
      <path d="M5 12v8h14v-8" />
      <path d="M10 20v-4.5h4V20" />
    </svg>
  );
}

export function FactoryIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3.5 20V10l5 3v-3l5 3v-3l5 3V4.5h2V20Z" />
      <path d="M3.5 20h17" />
      <path d="M8 16.5h1.5M12 16.5h1.5M16 16.5h1.5" />
    </svg>
  );
}

export function BoxIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m12 3.5 8 4v9l-8 4-8-4v-9Z" />
      <path d="m4 7.5 8 4 8-4" />
      <path d="M12 11.5v9" />
    </svg>
  );
}

export function LayersIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m12 4 8.5 4.5L12 13 3.5 8.5Z" />
      <path d="m3.5 12.5 8.5 4.5 8.5-4.5" />
      <path d="m3.5 16.5 8.5 4.5 8.5-4.5" />
    </svg>
  );
}

export function ReceiptIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6 3.5h12v17l-2.5-1.5-2 1.5-1.5-1.5-1.5 1.5-2-1.5L6 20.5Z" />
      <path d="M9 8h6M9 11.5h6M9 15h3.5" />
    </svg>
  );
}

export function TruckIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 6.5h11v10H3Z" />
      <path d="M14 10h3.5l3 3.5v3H14" />
      <circle cx="7" cy="17.5" r="1.75" />
      <circle cx="17" cy="17.5" r="1.75" />
    </svg>
  );
}

export function BriefcaseIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3.5" y="7" width="17" height="12.5" rx="2.5" />
      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7" />
      <path d="M3.5 12.5h17" />
    </svg>
  );
}

/** A certificate with a seal, for savings certificates and bonds. */
export function CertificateIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M13 17.5H5.5a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v4" />
      <path d="M7 8.5h8M7 12h4" />
      <circle cx="17.5" cy="14.5" r="2.75" />
      <path d="m16 17 -.75 3.5 2.25-1 2.25 1L19 17" />
    </svg>
  );
}

export function UmbrellaIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 12a9 9 0 0 1 18 0Z" />
      <path d="M12 12v6a2 2 0 0 1-4 0" />
    </svg>
  );
}

export function HeadsetIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4.5 14v-2a7.5 7.5 0 0 1 15 0v2" />
      <rect x="3.5" y="13" width="4" height="6" rx="1.5" />
      <rect x="16.5" y="13" width="4" height="6" rx="1.5" />
      <path d="M18.5 19a3 3 0 0 1-3 2.5H13" />
    </svg>
  );
}

/** A phone keypad, for the IVR line. */
export function KeypadIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M7 5h.01M12 5h.01M17 5h.01M7 10h.01M12 10h.01M17 10h.01M7 15h.01M12 15h.01M17 15h.01M12 20h.01" strokeWidth={3} />
    </svg>
  );
}

export function HelpIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M9.6 9.4a2.5 2.5 0 0 1 4.8 1c0 1.7-2.4 2.1-2.4 3.6" />
      <path d="M12 17h.01" />
    </svg>
  );
}

export function SignalIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6 18v-3M10 18v-6M14 18V9M18 18V6" />
    </svg>
  );
}
