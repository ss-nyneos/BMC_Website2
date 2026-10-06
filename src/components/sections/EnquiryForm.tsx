import { useRef, useState } from "react";
import type { EnquiryErrors, EnquiryValues } from "../../types";
import { FormRow } from "../ui/FormRow";
import { PillButton } from "../ui/PillButton";
import { SelectField } from "../ui/SelectField";
import { TextArea } from "../ui/TextArea";
import { TextField } from "../ui/TextField";
import { enquiryProducts } from "../../data/products";
import { branches } from "../../data/branches";

/**
 * Account-opening enquiry.
 *
 * The spec bans a native <form> for the artifact preview only; this is a real
 * application, so the element stays. It buys implicit submit on Enter, correct
 * autofill grouping and the right announcement to screen readers, none of which
 * an onClick handler reproduces.
 *
 * Validation runs on blur rather than on every keystroke, so nobody is told
 * their email is invalid while they are still typing the domain. On submit, the
 * summary is announced and focus moves to the first field that needs fixing.
 */
const branchOptions = branches.flatMap((branch) => branch.cities);

const empty: EnquiryValues = {
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
  city: "",
  branch: "",
  product: "",
  message: "",
};

const labels: Record<keyof EnquiryValues, string> = {
  firstName: "First name",
  lastName: "Last name",
  email: "Email",
  mobile: "Mobile number",
  city: "City",
  branch: "Nearest branch",
  product: "Product you are interested in",
  message: "Message",
};

function validateField(name: keyof EnquiryValues, value: string): string | undefined {
  const trimmed = value.trim();

  switch (name) {
    case "firstName":
    case "lastName":
      if (!trimmed) return `Enter your ${labels[name].toLowerCase()}.`;
      return undefined;
    case "email":
      if (!trimmed) return "Enter your email address.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed))
        return "That email address is missing an @ or a domain.";
      return undefined;
    case "mobile": {
      if (!trimmed) return "Enter your mobile number.";
      const digits = trimmed.replace(/[\s-]/g, "").replace(/^\+?91/, "");
      if (!/^[6-9]\d{9}$/.test(digits))
        return "Enter a ten-digit Indian mobile number, starting 6 to 9.";
      return undefined;
    }
    case "city":
      if (!trimmed) return "Enter the city you live in.";
      return undefined;
    case "branch":
      if (!trimmed) return "Choose the branch nearest to you.";
      return undefined;
    case "product":
      if (!trimmed) return "Choose the product you are interested in.";
      return undefined;
    case "message":
      return undefined;
  }
}

const REQUIRED: (keyof EnquiryValues)[] = [
  "firstName",
  "lastName",
  "email",
  "mobile",
  "city",
  "branch",
  "product",
];

export function EnquiryForm() {
  const [values, setValues] = useState<EnquiryValues>(empty);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const set = (name: keyof EnquiryValues) => (value: string) => {
    setValues((current) => ({ ...current, [name]: value }));
    // Clear an existing error as soon as the field becomes valid again.
    setErrors((current) => {
      if (!current[name]) return current;
      if (validateField(name, value)) return current;
      const { [name]: _removed, ...rest } = current;
      return rest;
    });
  };

  const blur = (name: keyof EnquiryValues) => () => {
    const error = validateField(name, values[name]);
    setErrors((current) => {
      if (!error) {
        const { [name]: _removed, ...rest } = current;
        return rest;
      }
      return { ...current, [name]: error };
    });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const found: EnquiryErrors = {};
    for (const name of REQUIRED) {
      const error = validateField(name, values[name]);
      if (error) found[name] = error;
    }
    setErrors(found);

    const firstInvalid = REQUIRED.find((name) => found[name]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`#enquiry-${firstInvalid}`)?.focus();
      return;
    }

    setStatus("submitting");
    // Wire to the bank's enquiry endpoint here.
    await new Promise((resolve) => setTimeout(resolve, 700));
    setStatus("sent");
  };

  if (status === "sent") {
    return (
      <div
        role="status"
        className="flex h-full flex-col justify-center rounded-2xl border border-hairline bg-surface p-8 sm:p-10"
      >
        <h3 className="text-h3">Thank you, we have your enquiry</h3>
        <p className="mt-5 max-w-prose text-body-sm text-fg-muted">
          An officer from the {values.branch} branch will call {values.mobile} within two working
          days. Keep your PAN and address proof to hand for the call.
        </p>
        <PillButton
          variant="outline"
          showArrow={false}
          className="mt-8 self-start"
          onClick={() => {
            setValues(empty);
            setStatus("idle");
          }}
        >
          Send another enquiry
        </PillButton>
      </div>
    );
  }

  const errorCount = Object.keys(errors).length;

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      aria-labelledby="enquiry-heading"
      className="rounded-2xl border border-hairline bg-surface p-6 sm:p-8"
    >
      <div aria-live="polite">
        {errorCount > 0 ? (
          <div className="mb-6 rounded-lg border border-orange bg-orange/10 p-5">
            <p className="text-label font-medium text-fg">
              {errorCount === 1
                ? "One field needs your attention"
                : `${errorCount} fields need your attention`}
            </p>
            <ul className="mt-3 flex flex-col gap-1.5">
              {(Object.keys(errors) as (keyof EnquiryValues)[]).map((name) => (
                <li key={name}>
                  <a href={`#enquiry-${name}`} className="text-fine text-fg-muted underline underline-offset-4">
                    {labels[name]}: {errors[name]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <div className="flex flex-col gap-4">
        <FormRow columns={2}>
          <TextField
            id="enquiry-firstName"
            label={labels.firstName}
            required
            autoComplete="given-name"
            value={values.firstName}
            onChange={set("firstName")}
            onBlur={blur("firstName")}
            error={errors.firstName}
          />
          <TextField
            id="enquiry-lastName"
            label={labels.lastName}
            required
            autoComplete="family-name"
            value={values.lastName}
            onChange={set("lastName")}
            onBlur={blur("lastName")}
            error={errors.lastName}
          />
        </FormRow>

        <TextField
          id="enquiry-email"
          label={labels.email}
          type="email"
          inputMode="email"
          required
          autoComplete="email"
          value={values.email}
          onChange={set("email")}
          onBlur={blur("email")}
          error={errors.email}
        />

        <TextField
          id="enquiry-mobile"
          label={labels.mobile}
          type="tel"
          inputMode="tel"
          required
          autoComplete="tel-national"
          hint="Ten digits, or with the +91 country code."
          value={values.mobile}
          onChange={set("mobile")}
          onBlur={blur("mobile")}
          error={errors.mobile}
        />

        <TextField
          id="enquiry-city"
          label={labels.city}
          required
          autoComplete="address-level2"
          value={values.city}
          onChange={set("city")}
          onBlur={blur("city")}
          error={errors.city}
        />

        <SelectField
          id="enquiry-branch"
          label={labels.branch}
          required
          options={branchOptions}
          value={values.branch}
          onChange={set("branch")}
          onBlur={blur("branch")}
          error={errors.branch}
        />

        <SelectField
          id="enquiry-product"
          label={labels.product}
          required
          options={enquiryProducts}
          value={values.product}
          onChange={set("product")}
          onBlur={blur("product")}
          error={errors.product}
        />

        <TextArea
          id="enquiry-message"
          label={labels.message}
          rows={4}
          value={values.message}
          onChange={set("message")}
          onBlur={blur("message")}
          error={errors.message}
        />
      </div>

      <PillButton
        type="submit"
        variant="purple"
        className="mt-8 w-full sm:w-auto"
        disabled={status === "submitting"}
        aria-busy={status === "submitting"}
      >
        {status === "submitting" ? "Sending enquiry" : "Submit enquiry"}
      </PillButton>

      <p className="mt-5 text-legal text-fg-muted">
        We use these details only to answer your enquiry. We never ask for your PIN, password or
        one-time passcode.
      </p>
    </form>
  );
}
