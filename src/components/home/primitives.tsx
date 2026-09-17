import { createContext, useContext, type AnchorHTMLAttributes, type ReactNode } from "react";
import type { LucideIcon } from "../../assets/icons/lucide";

/**
 * The small building blocks of the homepage sections carried over from
 * bmc_website2: its ground context, accent, eyebrow badge, button and link.
 * Kept together and apart from this site's own `ui/` components, because they
 * belong to that design, not this one.
 */

/** Joins the truthy class names. There is no tailwind-merge here, so callers
 *  never pass two classes that set the same property. */
export function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/** React 18 has no `inert` prop; an empty string sets the attribute. */
export function inertWhen(flag: boolean) {
  return (flag ? { inert: "" } : {}) as object;
}

// Ground ----------------------------------------------------------------------

export type Ground = "light" | "dark";

const GroundContext = createContext<Ground>("light");

/**
 * Buttons, links and badges flip their variants on a navy ground without each
 * caller passing a tone. `data-ground` also picks the focus ring in CSS.
 */
export function GroundProvider({ ground, children }: { ground: Ground; children: ReactNode }) {
  return <GroundContext.Provider value={ground}>{children}</GroundContext.Provider>;
}

export const useGround = () => useContext(GroundContext);

// Links -----------------------------------------------------------------------

type SmartLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  external?: boolean;
  children: ReactNode;
};

const isOutbound = (href: string) => /^https?:/.test(href);

/**
 * Internal paths are plain anchors: the router's document-level click handler
 * turns them into client-side navigations. Outbound links open a new tab and
 * say so to screen readers.
 */
export function SmartLink({ href, external, children, ...rest }: SmartLinkProps) {
  if (external ?? isOutbound(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
        <span className="sr-only">, opens in a new tab</span>
      </a>
    );
  }
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}

// Accent ----------------------------------------------------------------------

/** The one accent treatment: bold oblique, in brand, once per headline. */
export function Accent({ children }: { children: ReactNode }) {
  const ground = useGround();
  return <em className={cx("font-bold italic", ground === "dark" ? "text-white" : "text-bmc-brand")}>{children}</em>;
}

/** The filled badge above a section card's questions; inverts with its ground. */
export function EyebrowBadge({ accent, children }: { accent: string; children: ReactNode }) {
  const ground = useGround();
  return (
    <span
      className={cx(
        "inline-flex items-center gap-[0.35em] rounded-bmc-lg px-5 py-2 text-bmc-body-sm",
        ground === "dark" ? "bg-white text-bmc-brand-deep" : "bg-bmc-brand text-white",
      )}
    >
      <span className="font-bold italic">{accent}</span> {children}
    </span>
  );
}

// Button ----------------------------------------------------------------------

export type ButtonVariant = "primary" | "secondary" | "tertiary";

const VARIANTS: Record<Ground, Record<ButtonVariant, string>> = {
  light: {
    // Filled buttons darken on hover so the label gains contrast.
    primary: "bg-bmc-brand text-white hover:bg-bmc-brand-mid dark:hover:bg-bmc-brand-deep",
    secondary: "border border-bmc-brand bg-bmc-card text-bmc-brand hover:bg-bmc-tint",
    tertiary: "text-bmc-brand underline-offset-4 hover:underline",
  },
  dark: {
    primary: "bg-white text-bmc-brand-deep hover:bg-bmc-tint",
    secondary: "border border-white/40 bg-transparent text-white hover:border-white hover:bg-white/10",
    tertiary: "text-white underline-offset-4 hover:underline",
  },
};

type ButtonProps = {
  href: string;
  variant?: ButtonVariant;
  external?: boolean;
  icon?: LucideIcon;
  children: ReactNode;
};

function useButtonClass(variant: ButtonVariant) {
  const ground = useGround();
  return cx(
    "group/btn inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-bmc-lg text-bmc-body-sm font-medium transition-colors duration-300 ease-standard active:scale-[0.98]",
    variant === "tertiary" ? "min-h-11 py-2" : "min-h-[54px] px-6 py-3",
    VARIANTS[ground][variant],
  );
}

function ButtonContent({ icon: Icon, children }: { icon?: LucideIcon; children: ReactNode }) {
  return (
    <>
      <span>{children}</span>
      {Icon ? (
        <Icon
          className="size-6 shrink-0 transition-transform duration-300 ease-out-expo group-hover/btn:translate-x-1"
          strokeWidth={2}
        />
      ) : null}
    </>
  );
}

/** A link that looks like a button: it goes somewhere. */
export function Button({ href, variant = "primary", external, icon, children }: ButtonProps) {
  return (
    <SmartLink href={href} external={external} className={useButtonClass(variant)}>
      <ButtonContent icon={icon}>{children}</ButtonContent>
    </SmartLink>
  );
}

type ActionButtonProps = {
  variant?: ButtonVariant;
  type?: "button" | "submit";
  onClick?: () => void;
  busy?: boolean;
  icon?: LucideIcon;
  children: ReactNode;
};

/** The same look on a real <button>: it does something on this page. */
export function ActionButton({ variant = "primary", type = "button", onClick, busy, icon, children }: ActionButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={busy}
      aria-busy={busy || undefined}
      className={cx(useButtonClass(variant), "disabled:cursor-wait disabled:opacity-70")}
    >
      <ButtonContent icon={icon}>{children}</ButtonContent>
    </button>
  );
}

// Photo -------------------------------------------------------------------------

type ParallaxImageProps = {
  src: string;
  srcSet?: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  /** CSS object-position, to keep the subject in frame when cropped. */
  position?: string;
};

/**
 * An oversized photograph that pans inside its frame as the frame scrolls past.
 * The pan runs on the wrapper through the site-wide `data-parallax` hook, so the
 * image itself stays free for its hover zoom.
 */
export function ParallaxImage({ src, srcSet, alt, className, imgClassName, sizes, position }: ParallaxImageProps) {
  return (
    <div className={cx("relative isolate overflow-hidden bg-bmc-surface", className)}>
      <div data-parallax="0.05" className="absolute inset-x-0 -top-[12%] h-[124%]">
        <img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          loading="lazy"
          decoding="async"
          style={position ? { objectPosition: position } : undefined}
          className={cx("h-full w-full object-cover transition-transform duration-700 ease-out-expo", imgClassName)}
        />
      </div>
    </div>
  );
}
