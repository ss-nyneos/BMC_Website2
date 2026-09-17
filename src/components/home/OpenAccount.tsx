import { useEffect, useRef, useState, type FormEvent, type ReactNode, type RefObject } from "react";
import { ArrowRight, Check, ChevronDown, CircleCheck } from "../../assets/icons/lucide";
import { branches } from "../../data/branches";
import {
  accountOptions,
  documentsFor,
  holderOptions,
  type AccountId,
  type HolderId,
} from "../../data/open-account";
import { ActionButton, Button, EyebrowBadge, GroundProvider, cx } from "./primitives";

/**
 * "Open your account": the page's application start, placed straight after the
 * loans card and straight before "What happens after you apply", whose first
 * step is this form.
 *
 * Three short steps rather than one long form: the account, who holds it, then
 * contact details. The checklist beside it fills in as the first two are
 * answered, so by the time someone leaves their number they already know what
 * to bring, and can tick off what they have.
 *
 * It asks only for what a branch needs to call back. It never asks for a PIN,
 * password, OTP or account number, and says so.
 */

const STEPS = ["Account", "Who it’s for", "Your details"];

type Details = { name: string; mobile: string; email: string; branch: string; consent: boolean };
type DetailErrors = Partial<Record<keyof Details, string>>;

const emptyDetails: Details = { name: "", mobile: "", email: "", branch: "", consent: false };

function validate(field: keyof Details, details: Details): string | undefined {
  switch (field) {
    case "name":
      return details.name.trim() ? undefined : "Enter your full name.";
    case "mobile": {
      const digits = details.mobile.replace(/[\s-]/g, "").replace(/^\+?91/, "");
      if (!digits) return "Enter your mobile number.";
      return /^[6-9]\d{9}$/.test(digits) ? undefined : "Enter a ten-digit Indian mobile number, starting 6 to 9.";
    }
    case "email": {
      const value = details.email.trim();
      if (!value) return undefined;
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) ? undefined : "That email address is missing an @ or a domain.";
    }
    case "branch":
      return details.branch ? undefined : "Choose the branch nearest to you.";
    case "consent":
      return details.consent ? undefined : "Tick the box so the branch can call you.";
  }
}

const DETAIL_FIELDS: (keyof Details)[] = ["name", "mobile", "email", "branch", "consent"];

export function OpenAccount() {
  const [step, setStep] = useState(0);
  const [account, setAccount] = useState<AccountId | null>(null);
  const [holder, setHolder] = useState<HolderId | null>(null);
  const [details, setDetails] = useState<Details>(emptyDetails);
  const [errors, setErrors] = useState<DetailErrors>({});
  const [choiceError, setChoiceError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [ready, setReady] = useState<Record<string, boolean>>({});

  const legendRef = useRef<HTMLLegendElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const moved = useRef(false);

  const option = accountOptions.find((item) => item.id === account) ?? null;
  const documents = documentsFor(holder);

  // After a step change the visitor chose, focus the new step's question, so a
  // keyboard or screen-reader user lands where the page changed.
  useEffect(() => {
    if (!moved.current) return;
    legendRef.current?.focus({ preventScroll: true });
  }, [step]);

  useEffect(() => {
    if (status === "sent") successRef.current?.focus({ preventScroll: true });
  }, [status]);

  const chooseAccount = (id: AccountId) => {
    setAccount(id);
    setChoiceError(null);
    const allowed = accountOptions.find((item) => item.id === id)?.holders ?? [];
    // A single possible holder needs no question; an answer the new account
    // does not allow is cleared rather than silently kept.
    setHolder((current) => (allowed.length === 1 ? allowed[0] : current && allowed.includes(current) ? current : null));
  };

  const goTo = (next: number) => {
    moved.current = true;
    setChoiceError(null);
    setStep(next);
  };

  const next = () => {
    if (step === 0 && !account) return setChoiceError("Choose an account to continue.");
    if (step === 1 && !holder) return setChoiceError("Choose who the account is for to continue.");
    goTo(step + 1);
  };

  const update = <K extends keyof Details>(field: K, value: Details[K]) => {
    const nextDetails = { ...details, [field]: value };
    setDetails(nextDetails);
    // Clear an error as soon as the field is fixed; never add one mid-typing.
    if (errors[field] && !validate(field, nextDetails)) {
      setErrors(({ [field]: _removed, ...rest }) => rest);
    }
  };

  const blur = (field: keyof Details) => () => {
    const error = validate(field, details);
    setErrors(({ [field]: _removed, ...rest }) => (error ? { ...rest, [field]: error } : rest));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step < 2) return next();

    const found: DetailErrors = {};
    for (const field of DETAIL_FIELDS) {
      const error = validate(field, details);
      if (error) found[field] = error;
    }
    setErrors(found);
    const firstInvalid = DETAIL_FIELDS.find((field) => found[field]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`#open-${firstInvalid}`)?.focus();
      return;
    }

    setStatus("sending");
    // Wire to the bank's application endpoint here.
    await new Promise((resolve) => setTimeout(resolve, 700));
    setStatus("sent");
  };

  const startAgain = () => {
    moved.current = true;
    setAccount(null);
    setHolder(null);
    setDetails(emptyDetails);
    setErrors({});
    setReady({});
    setStatus("idle");
    setStep(0);
  };

  return (
    <section
      id="open-an-account"
      aria-labelledby="open-account-title"
      data-ground="light"
      className="scroll-mt-6 overflow-hidden rounded-bmc-2xl bg-bmc-surface text-bmc-ink"
    >
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,27rem)]">
        <div className="px-4 py-8 md:px-8 md:py-10 lg:p-12">
          <div className="reveal">
            <EyebrowBadge accent="Bharosa">in three steps</EyebrowBadge>
            <h2 id="open-account-title" className="mt-6 text-bmc-display">
              Open your account
            </h2>
            <p className="mt-3 max-w-[46ch] text-bmc-body text-bmc-ink-muted">
              Choose an account, tell us who it is for and leave your number. Your nearest branch calls you back to
              finish.
            </p>
          </div>

          {status === "sent" && option ? (
            <div
              ref={successRef}
              tabIndex={-1}
              role="status"
              className="mt-10 animate-rise-in rounded-bmc-xl bg-bmc-card p-6 outline-none md:p-8"
            >
              <span className="inline-flex size-14 items-center justify-center rounded-full bg-bmc-tint text-bmc-brand">
                <CircleCheck className="size-7" strokeWidth={1.5} />
              </span>
              <h3 className="mt-5 text-bmc-h3 font-medium">Thank you, {details.name.trim().split(/\s+/)[0]}</h3>
              <p className="mt-3 max-w-[52ch] text-bmc-body-sm text-bmc-ink-muted">
                An officer from the {details.branch} branch will call {details.mobile.trim()} within two working days
                to finish opening your {option.title.toLowerCase()}. Keep the documents on your checklist to hand.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="#after-you-apply" icon={ArrowRight}>
                  See what happens next
                </Button>
                <ActionButton variant="secondary" onClick={startAgain}>
                  Start again
                </ActionButton>
              </div>
            </div>
          ) : (
            <>
              <Stepper step={step} onBack={goTo} />

              <form ref={formRef} noValidate onSubmit={onSubmit} aria-labelledby="open-account-title" className="mt-8">
                <div key={step} className="animate-rise-in">
                  {step === 0 ? (
                    <fieldset aria-describedby={choiceError ? "open-choice-error" : undefined}>
                      <Legend legendRef={legendRef}>Which account would you like?</Legend>
                      <div className="mt-5 grid gap-3 md:grid-cols-2">
                        {accountOptions.map((item) => (
                          <Choice
                            key={item.id}
                            name="account"
                            checked={account === item.id}
                            onChange={() => chooseAccount(item.id)}
                            className={item.id === "nri" ? "md:col-span-2" : undefined}
                          >
                            {/* Icon above the name, as on the product cards, so
                                the name keeps the card's full width. */}
                            <span className="flex min-w-0 flex-1 flex-col items-start gap-3">
                              <span
                                aria-hidden="true"
                                className={cx(
                                  "inline-flex size-11 shrink-0 items-center justify-center rounded-full transition-colors duration-300",
                                  account === item.id ? "bg-bmc-brand text-white" : "bg-bmc-tint text-bmc-brand",
                                )}
                              >
                                <item.icon className="size-5" strokeWidth={1.5} />
                              </span>
                              <span className="block">
                                <span className="block text-bmc-body font-bold">{item.title}</span>
                                <span className="block text-bmc-body-sm text-bmc-ink-muted">{item.blurb}</span>
                                {item.highlight ? (
                                  <span className="mt-2 inline-block rounded-bmc-lg bg-bmc-tint px-2.5 py-1 text-bmc-data text-bmc-brand">
                                    {item.highlight}
                                  </span>
                                ) : null}
                              </span>
                            </span>
                          </Choice>
                        ))}
                      </div>
                    </fieldset>
                  ) : null}

                  {step === 1 && option ? (
                    <fieldset aria-describedby={choiceError ? "open-choice-error" : undefined}>
                      <Legend legendRef={legendRef}>Who is the {option.title.toLowerCase()} for?</Legend>
                      <div className="mt-5 grid gap-3 md:grid-cols-2">
                        {option.holders.map((id) => (
                          <Choice
                            key={id}
                            name="holder"
                            checked={holder === id}
                            onChange={() => {
                              setHolder(id);
                              setChoiceError(null);
                            }}
                          >
                            <span className="min-w-0 flex-1">
                              <span className="block text-bmc-body font-bold">{holderOptions[id].label}</span>
                              <span className="block text-bmc-body-sm text-bmc-ink-muted">{holderOptions[id].hint}</span>
                            </span>
                          </Choice>
                        ))}
                      </div>
                    </fieldset>
                  ) : null}

                  {step === 2 ? (
                    <fieldset>
                      <Legend legendRef={legendRef}>Where can the branch reach you?</Legend>
                      <div className="mt-5 grid gap-5 md:grid-cols-2">
                        <Field id="open-name" label="Full name" error={errors.name} className="md:col-span-2">
                          <input
                            id="open-name"
                            type="text"
                            autoComplete="name"
                            required
                            value={details.name}
                            onChange={(event) => update("name", event.target.value)}
                            onBlur={blur("name")}
                            aria-invalid={Boolean(errors.name)}
                            aria-describedby={errors.name ? "open-name-error" : undefined}
                            className={inputClass(errors.name)}
                          />
                        </Field>
                        <Field
                          id="open-mobile"
                          label="Mobile number"
                          hint="Ten digits. The branch calls this number."
                          error={errors.mobile}
                        >
                          <input
                            id="open-mobile"
                            type="tel"
                            inputMode="tel"
                            autoComplete="tel-national"
                            required
                            value={details.mobile}
                            onChange={(event) => update("mobile", event.target.value)}
                            onBlur={blur("mobile")}
                            aria-invalid={Boolean(errors.mobile)}
                            aria-describedby={errors.mobile ? "open-mobile-error" : "open-mobile-hint"}
                            className={inputClass(errors.mobile)}
                          />
                        </Field>
                        <Field id="open-email" label="Email" optional error={errors.email}>
                          <input
                            id="open-email"
                            type="email"
                            inputMode="email"
                            autoComplete="email"
                            value={details.email}
                            onChange={(event) => update("email", event.target.value)}
                            onBlur={blur("email")}
                            aria-invalid={Boolean(errors.email)}
                            aria-describedby={errors.email ? "open-email-error" : undefined}
                            className={inputClass(errors.email)}
                          />
                        </Field>
                        <Field id="open-branch" label="Nearest branch" error={errors.branch} className="md:col-span-2">
                          <div className="relative">
                            <select
                              id="open-branch"
                              required
                              value={details.branch}
                              onChange={(event) => update("branch", event.target.value)}
                              onBlur={blur("branch")}
                              aria-invalid={Boolean(errors.branch)}
                              aria-describedby={errors.branch ? "open-branch-error" : undefined}
                              className={cx(inputClass(errors.branch), "appearance-none pr-12")}
                            >
                              <option value="">Choose a branch</option>
                              {branches.map((group) => (
                                <optgroup key={group.state} label={group.state}>
                                  {group.cities.map((city) => (
                                    <option key={city} value={city}>
                                      {city}
                                    </option>
                                  ))}
                                </optgroup>
                              ))}
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-bmc-ink-muted" />
                          </div>
                        </Field>
                        <div className="md:col-span-2">
                          <label className="group/consent flex cursor-pointer items-start gap-3 rounded-bmc-lg py-1 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-bmc-accent">
                            <input
                              id="open-consent"
                              type="checkbox"
                              checked={details.consent}
                              onChange={(event) => update("consent", event.target.checked)}
                              aria-invalid={Boolean(errors.consent)}
                              aria-describedby={errors.consent ? "open-consent-error" : undefined}
                              className="sr-only"
                            />
                            <span
                              aria-hidden="true"
                              className={cx(
                                "mt-1 grid size-6 shrink-0 place-items-center rounded-md border-2 transition-colors duration-200",
                                details.consent
                                  ? "border-bmc-brand bg-bmc-brand text-white"
                                  : errors.consent
                                    ? "border-bmc-danger bg-bmc-card"
                                    : "border-bmc-line-strong bg-bmc-card group-hover/consent:border-bmc-brand",
                              )}
                            >
                              {details.consent ? <Check className="size-4" strokeWidth={3} /> : null}
                            </span>
                            <span className="text-bmc-body-sm">
                              I agree to BMC Bank calling me about this application.
                            </span>
                          </label>
                          {errors.consent ? <ErrorText id="open-consent-error">{errors.consent}</ErrorText> : null}
                        </div>
                      </div>
                    </fieldset>
                  ) : null}

                  {choiceError ? <ErrorText id="open-choice-error">{choiceError}</ErrorText> : null}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  {step > 0 ? (
                    <ActionButton variant="secondary" onClick={() => goTo(step - 1)}>
                      Back
                    </ActionButton>
                  ) : null}
                  {step < 2 ? (
                    <ActionButton onClick={next} icon={ArrowRight}>
                      Continue
                    </ActionButton>
                  ) : (
                    <ActionButton type="submit" busy={status === "sending"} icon={ArrowRight}>
                      {status === "sending" ? "Sending" : "Send application"}
                    </ActionButton>
                  )}
                </div>

                {step === 2 ? (
                  <p className="mt-5 text-bmc-data text-bmc-ink-muted">
                    We use these details only to call you about this account.
                  </p>
                ) : null}
              </form>
            </>
          )}
        </div>

        <Checklist
          accountTitle={option?.title ?? null}
          holderLabel={holder ? holderOptions[holder].label : null}
          documents={documents}
          ready={ready}
          onToggle={(doc) => setReady((current) => ({ ...current, [doc]: !current[doc] }))}
        />
      </div>
    </section>
  );
}

function Legend({ legendRef, children }: { legendRef: RefObject<HTMLLegendElement>; children: ReactNode }) {
  return (
    <legend ref={legendRef} tabIndex={-1} className="text-bmc-h3 font-medium outline-none">
      {children}
    </legend>
  );
}

/** Where the visitor is, and a way back to any step already done. */
function Stepper({ step, onBack }: { step: number; onBack: (index: number) => void }) {
  return (
    <>
      <ol className="mt-10 flex items-center gap-2 sm:gap-3" aria-label="Application steps">
        {STEPS.map((label, index) => {
          const done = index < step;
          const current = index === step;
          const marker = (
            <>
              <span
                className={cx(
                  "grid size-9 shrink-0 place-items-center rounded-full text-bmc-data font-bold transition-colors duration-300",
                  done && "bg-bmc-brand text-white",
                  current && "bg-bmc-card text-bmc-brand shadow-[inset_0_0_0_2px_rgb(var(--bmc-brand))]",
                  !done && !current && "bg-bmc-card text-bmc-ink-muted shadow-[inset_0_0_0_1px_rgb(var(--bmc-line-strong))]",
                )}
              >
                {done ? <Check className="size-4" strokeWidth={3} /> : index + 1}
              </span>
              <span
                className={cx(
                  "whitespace-nowrap text-bmc-body-sm",
                  current ? "text-bmc-ink" : "text-bmc-ink-muted",
                  !current && "max-sm:sr-only",
                )}
              >
                {label}
              </span>
            </>
          );

          return (
            <li key={label} className={cx("flex items-center gap-2 sm:gap-3", index < STEPS.length - 1 && "flex-1")}>
              {done ? (
                <button
                  type="button"
                  onClick={() => onBack(index)}
                  className="group/step flex min-h-11 items-center gap-3 rounded-bmc-lg hover:text-bmc-brand"
                >
                  {marker}
                  <span className="sr-only">, done. Go back to this step</span>
                </button>
              ) : (
                <span aria-current={current ? "step" : undefined} className="flex min-h-11 items-center gap-3">
                  {marker}
                </span>
              )}
              {index < STEPS.length - 1 ? (
                <span aria-hidden="true" className="h-0.5 min-w-6 flex-1 overflow-hidden rounded-full bg-bmc-line">
                  <span
                    className={cx(
                      "block h-full origin-left bg-bmc-brand transition-transform duration-500 ease-out-expo",
                      done ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
      <p className="sr-only" aria-live="polite">
        Step {step + 1} of {STEPS.length}: {STEPS[step]}
      </p>
    </>
  );
}

/** A radio drawn as a selectable card. The input stays real for keyboards. */
function Choice({
  name,
  checked,
  onChange,
  className,
  children,
}: {
  name: string;
  checked: boolean;
  onChange: () => void;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label
      className={cx(
        "group/choice relative flex cursor-pointer items-start gap-4 rounded-bmc-xl border bg-bmc-card p-5 transition-[border-color,box-shadow] duration-300",
        "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-bmc-accent",
        checked
          ? "border-bmc-brand shadow-[inset_0_0_0_1px_rgb(var(--bmc-brand))]"
          : "border-bmc-line hover:border-bmc-brand",
        className,
      )}
    >
      <input type="radio" name={name} checked={checked} onChange={onChange} className="sr-only" />
      {children}
      <span
        aria-hidden="true"
        className={cx(
          "mt-1 grid size-6 shrink-0 place-items-center rounded-full border-2 transition-colors duration-300",
          checked ? "border-bmc-brand" : "border-bmc-line-strong group-hover/choice:border-bmc-brand",
        )}
      >
        <span
          className={cx(
            "size-2.5 rounded-full bg-bmc-brand transition-transform duration-300 ease-out-expo",
            checked ? "scale-100" : "scale-0",
          )}
        />
      </span>
    </label>
  );
}

const inputClass = (error?: string) =>
  cx(
    "min-h-14 w-full rounded-bmc-lg border bg-bmc-card px-4 text-bmc-body-sm text-bmc-ink transition-colors duration-200 focus:border-bmc-brand",
    error ? "border-bmc-danger" : "border-bmc-line-strong hover:border-bmc-ink-subtle",
  );

function Field({
  id,
  label,
  hint,
  optional,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  optional?: boolean;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-bmc-body-sm font-medium">
        {label}
        {optional ? <span className="font-normal text-bmc-ink-muted"> (optional)</span> : null}
      </label>
      <div className="mt-2">{children}</div>
      {hint && !error ? (
        <p id={`${id}-hint`} className="mt-2 text-bmc-data text-bmc-ink-muted">
          {hint}
        </p>
      ) : null}
      {error ? <ErrorText id={`${id}-error`}>{error}</ErrorText> : null}
    </div>
  );
}

function ErrorText({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-2 text-bmc-data font-medium text-bmc-danger">
      {children}
    </p>
  );
}

/** The navy side panel: what was chosen, and what to bring. */
function Checklist({
  accountTitle,
  holderLabel,
  documents,
  ready,
  onToggle,
}: {
  accountTitle: string | null;
  holderLabel: string | null;
  documents: string[];
  ready: Record<string, boolean>;
  onToggle: (doc: string) => void;
}) {
  const readyCount = documents.filter((doc) => ready[doc]).length;

  return (
    <GroundProvider ground="dark">
      <aside
        aria-labelledby="checklist-title"
        data-ground="dark"
        className="bg-bmc-card-dark flex flex-col px-4 py-8 text-white md:px-8 md:py-10 lg:p-10"
      >
        <h3 id="checklist-title" className="text-bmc-h3 font-medium">
          Your checklist
        </h3>

        <div aria-live="polite" className="mt-6 rounded-bmc-xl border border-white/20 bg-white/10 p-5">
          {accountTitle ? (
            <>
              <p className="text-bmc-body font-bold">{accountTitle}</p>
              <p className="text-bmc-body-sm text-bmc-on-brand-muted">{holderLabel ?? "Holder not chosen yet"}</p>
            </>
          ) : (
            <p className="text-bmc-body-sm text-bmc-on-brand-muted">
              Choose an account, and the documents to keep ready appear here.
            </p>
          )}
        </div>

        {documents.length > 0 ? (
          <div className="mt-8">
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-bmc-body-sm font-medium">Documents to keep ready</p>
              <p className="text-bmc-data tabular-nums text-bmc-on-brand-muted">
                {readyCount} of {documents.length} ready
              </p>
            </div>
            <div aria-hidden="true" className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/15">
              <div
                className="h-full origin-left rounded-full bg-white transition-transform duration-500 ease-out-expo"
                style={{ transform: `scaleX(${readyCount / documents.length})` }}
              />
            </div>
            <ul className="mt-4 space-y-1">
              {documents.map((doc) => {
                const checked = Boolean(ready[doc]);
                return (
                  <li key={doc}>
                    <label className="flex cursor-pointer items-start gap-3 rounded-bmc-lg p-3 transition-colors duration-200 hover:bg-white/10 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-white">
                      <input type="checkbox" checked={checked} onChange={() => onToggle(doc)} className="sr-only" />
                      <span
                        aria-hidden="true"
                        className={cx(
                          "mt-0.5 grid size-6 shrink-0 place-items-center rounded-md border-2 transition-colors duration-200",
                          checked ? "border-white bg-white text-[#0b4da2]" : "border-white/60",
                        )}
                      >
                        {checked ? <Check className="size-4" strokeWidth={3} /> : null}
                      </span>
                      <span
                        className={cx(
                          "text-bmc-body-sm transition-colors duration-200",
                          checked ? "text-bmc-on-brand-muted line-through decoration-white/40" : "text-white",
                        )}
                      >
                        {doc}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}

        <p className="mt-auto pt-10 text-bmc-data text-bmc-on-brand-muted">
          The branch confirms the full list when it calls. BMC Bank never asks for your PIN, password or OTP.
        </p>
      </aside>
    </GroundProvider>
  );
}
