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
