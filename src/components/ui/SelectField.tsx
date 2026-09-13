import type { SelectHTMLAttributes } from "react";
import { ChevronDownIcon } from "../../assets/icons";
import { FieldShell, describedBy, fieldClasses } from "./Field";

type SelectFieldProps = {
  id: string;
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
} & Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "id" | "value" | "onChange" | "onBlur" | "className"
>;

/**
 * A native select, styled. The chevron sits in a lavender chip to match the
 * reference (image 5), but the control underneath is the platform's own, so it
 * keeps native keyboard behaviour and the correct picker on mobile.
 *
 * An empty value renders as the placeholder state, which is what keeps the
 * floating label in its resting position until a real choice is made.
 */
export function SelectField({
  id,
  label,
  value,
  options,
  onChange,
  onBlur,
  error,
  hint,
  required,
  className = "",
  ...rest
}: SelectFieldProps) {
  return (
    <FieldShell
      id={id}
      label={label}
      required={required}
      error={error}
      hint={hint}
      className={className}
      float={Boolean(value)}
    >
      <select
        id={id}
        name={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={`${fieldClasses(Boolean(error))} appearance-none pr-16 ${
          value ? "" : "text-transparent"
        }`}
        {...rest}
      >
        <option value="" />
        {options.map((option) => (
          <option key={option} value={option} className="text-fg">
            {option}
          </option>
        ))}
      </select>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-pill bg-lavender text-ink"
      >
        <ChevronDownIcon className="h-5 w-5" />
      </span>
    </FieldShell>
  );
}
