import type { InputHTMLAttributes } from "react";
import { FieldShell, describedBy, fieldClasses } from "./Field";

type TextFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "value" | "onChange" | "onBlur" | "className">;

/**
 * `type` and `autoComplete` are passed through by every caller so mobile shows
 * the right keyboard and the browser can autofill.
 */
export function TextField({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  hint,
  required,
  className = "",
  ...rest
}: TextFieldProps) {
  return (
    <FieldShell id={id} label={label} required={required} error={error} hint={hint} className={className}>
      <input
        id={id}
        name={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        placeholder=" "
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={fieldClasses(Boolean(error))}
        {...rest}
      />
    </FieldShell>
  );
}
