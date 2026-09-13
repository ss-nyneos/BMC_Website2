import type { TextareaHTMLAttributes } from "react";
import { FieldShell, describedBy, fieldClasses } from "./Field";

type TextAreaProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  hint?: string;
  required?: boolean;
  rows?: number;
  className?: string;
} & Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "id" | "value" | "onChange" | "onBlur" | "className" | "rows"
>;

export function TextArea({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  hint,
  required,
  rows = 4,
  className = "",
  ...rest
}: TextAreaProps) {
  return (
    <FieldShell id={id} label={label} required={required} error={error} hint={hint} className={className}>
      <textarea
        id={id}
        name={id}
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        placeholder=" "
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={`${fieldClasses(Boolean(error))} resize-y`}
        {...rest}
      />
    </FieldShell>
  );
}
