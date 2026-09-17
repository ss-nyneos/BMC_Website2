import { FacebookIcon, LinkedInIcon, XIcon, YouTubeIcon } from "../../assets/icons";

const channels = [
  { name: "LinkedIn", href: "https://www.linkedin.com/company/bombay-mercantile-co-operative-bank", Icon: LinkedInIcon },
  { name: "Facebook", href: "https://www.facebook.com/bmcbankltd", Icon: FacebookIcon },
  { name: "X", href: "https://x.com/bmcbankltd", Icon: XIcon },
  { name: "YouTube", href: "https://www.youtube.com/@bmcbankltd", Icon: YouTubeIcon },
];

/** Each link is named for a screen reader; the glyph alone is not the label. */
export function SocialLinks() {
  return (
    <ul className="flex flex-wrap gap-2.5">
      {channels.map((channel) => (
        <li key={channel.name}>
          <a
            href={channel.href}
            target="_blank"
            rel="noreferrer noopener"
            className="grid h-11 w-11 place-items-center rounded-pill border border-white/30 text-white transition-[background-color,color,transform] duration-300 ease-out-expo hover:-translate-y-0.5 hover:bg-white hover:text-navy"
          >
            <channel.Icon className="h-5 w-5" />
            <span className="sr-only">{channel.name}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
