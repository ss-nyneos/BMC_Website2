import type { ReactNode } from "react";

/** One- or two-up field layout. Two-up stacks below sm. Spec section 6.9. */
export function FormRow({ children, columns = 1 }: { children: ReactNode; columns?: 1 | 2 }) {
  return (
    <div className={`grid gap-4 ${columns === 2 ? "sm:grid-cols-2" : "grid-cols-1"}`}>{children}</div>
  );
}
