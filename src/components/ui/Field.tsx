import type { ReactNode } from "react";

/**
 * Shared chrome for every form control: the cream fill, the 16px radius, the
 * floating label and the error message slot.
 *
 * The reference labels its fields with placeholders alone. That loses the label
 * the moment someone starts typing, so this uses a floating label instead: the
 * same uncluttered resting state, but the field still says what it is once it
 * has a value.
 */
export type FieldShellProps = {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
  /** Forces the label into its floated position. Used by SelectField, where
   *  :placeholder-shown does not apply. */
  float?: boolean;
};

export function fieldClasses(hasError: boolean) {
  return [
    "peer w-full rounded-lg bg-field px-5 pb-2.5 pt-7 text-body-sm text-fg",
    "border transition-colors duration-200 ease-out-quint",
    hasError ? "border-orange" : "border-transparent hover:border-line",
    "placeholder:text-transparent",
  ].join(" ");
}

export function FieldShell({
  id,
  label,
  required,
  error,
  hint,
  children,
  className = "",
  float = false,
}: FieldShellProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        {children}
        <label
          htmlFor={id}
          className={`pointer-events-none absolute left-5 origin-left text-fg-muted transition-all duration-200 ease-out-quint peer-focus:top-2.5 peer-focus:text-fine peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:text-fine ${
            float ? "top-2.5 text-fine" : "top-5 text-body-sm"
          }`}
        >
          {label}
          {required ? (
            <>
              <span aria-hidden="true"> *</span>
              <span className="sr-only"> (required)</span>
            </>
          ) : null}
        </label>
      </div>

      {hint && !error ? (
        <p id={`${id}-hint`} className="mt-2 pl-1 text-fine text-fg-muted">
          {hint}
        </p>
      ) : null}

      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-2 pl-1 text-fine text-orange-deep dark:text-orange">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function describedBy(id: string, error?: string, hint?: string) {
  const parts = [error ? `${id}-error` : null, hint && !error ? `${id}-hint` : null].filter(Boolean);
  return parts.length ? parts.join(" ") : undefined;
}
