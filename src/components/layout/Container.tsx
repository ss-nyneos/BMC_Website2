import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  /** Drops the horizontal gutter so a child can run full-bleed inside it. */
  bleed?: boolean;
};

/** Centres content at 1280px with the 24px / 48px gutters from spec section 4. */
export function Container({ children, className = "", bleed = false }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-container ${bleed ? "" : "px-6 lg:px-12"} ${className}`}>
      {children}
    </div>
  );
}
