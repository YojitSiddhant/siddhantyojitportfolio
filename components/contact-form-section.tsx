"use client";

import { useState, type ChangeEvent, type FormEvent, type FocusEvent } from "react";

type ContactFieldName = "name" | "phone" | "email" | "message";

type ContactValues = Record<ContactFieldName, string>;
type ContactErrors = Partial<Record<ContactFieldName, string>>;
type ContactTouched = Partial<Record<ContactFieldName, boolean>>;
type PopupError = {
  field: string;
  message: string;
};

type SubmissionState = "idle" | "submitting" | "submitted" | "invalid" | "error";

type ContactField = {
  label: string;
  name: Exclude<ContactFieldName, "message">;
  type: "text" | "tel" | "email";
  placeholder: string;
  required?: boolean;
  autoComplete: string;
  inputMode?: "text" | "email" | "tel";
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  icon: ({ className }: { className?: string }) => React.JSX.Element;
};

const contactFields: ContactField[] = [
  {
    label: "Name",
    name: "name",
    icon: UserIcon,
    type: "text",
    placeholder: "Your full name",
    required: true,
    autoComplete: "name",
    minLength: 2,
    maxLength: 60,
  },
  {
    label: "Phone Number",
    name: "phone",
    icon: PhoneIcon,
    type: "tel",
    placeholder: "+91 98765 43210",
    required: true,
    autoComplete: "tel",
    inputMode: "tel",
    minLength: 7,
    maxLength: 20,
  },
  {
    label: "Email",
    name: "email",
    icon: MailIcon,
    type: "email",
    placeholder: "you@example.com",
    required: true,
    autoComplete: "email",
    inputMode: "email",
    minLength: 5,
    maxLength: 254,
    pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$",
  },
];

const fieldLabels: Record<ContactFieldName, string> = {
  name: "Name",
  phone: "Phone Number",
  email: "Email",
  message: "Message",
};

type ContactLinks = {
  email: string;
  phone: string;
  whatsapp: string;
  linkedin: string;
  github: string;
};

type CardTone = "whatsapp" | "phone" | "linkedin" | "github";

const initialValues: ContactValues = {
  name: "",
  phone: "+91 ",
  email: "",
  message: "",
};

function trimValue(value: string) {
  return value.trim();
}

function FormIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M4 7.5A1.5 1.5 0 0 1 5.5 6h13A1.5 1.5 0 0 1 20 7.5v9A1.5 1.5 0 0 1 18.5 18h-13A1.5 1.5 0 0 1 4 16.5v-9Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="m5.5 7.5 6.5 5 6.5-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M12 12.1a3.6 3.6 0 1 0 0-7.2 3.6 3.6 0 0 0 0 7.2Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M5.8 19.2c.9-3.4 3.3-5.2 6.2-5.2s5.3 1.8 6.2 5.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M8 4.9h1.8c.7 0 1.2.4 1.4 1l.5 1.9a1.2 1.2 0 0 1-.4 1.2L10 10.5c1.1 2.2 2.8 3.9 5 5l1.5-1.3a1.2 1.2 0 0 1 1.2-.3l1.9.5c.6.1 1 .7 1 1.4v1.7a1.7 1.7 0 0 1-1.7 1.7C11.1 20.8 3.2 12.9 4 6.1c0-.9.7-1.2 1.5-1.2H8Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M4 7.5A1.5 1.5 0 0 1 5.5 6h13A1.5 1.5 0 0 1 20 7.5v9A1.5 1.5 0 0 1 18.5 18h-13A1.5 1.5 0 0 1 4 16.5v-9Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="m5.5 7.5 6.5 5 6.5-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.12" />
      <path
        d="M7.5 18.5 4 20l1.2-3.4A8.3 8.3 0 1 1 7.5 18.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M8.8 9.3c.2 2.2 1.9 4 4.1 4.1l1-1a.9.9 0 0 1 .8-.2l1.2.4c.4.1.6.5.6.9v.4c0 .6-.5 1.1-1.1 1.1C11 15 7.9 12 7.9 8.3c0-.6.5-1.1 1.1-1.1h.4c.4 0 .8.2.9.6l.4 1.2a.9.9 0 0 1-.2.8l-1.7 1.2Z"
        fill="currentColor"
        opacity="0.98"
      />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <rect x="4.5" y="4.5" width="15" height="15" rx="4" fill="currentColor" />
      <text
        x="12"
        y="16.2"
        textAnchor="middle"
        fill="#ffffff"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="9.6"
        fontWeight="700"
      >
        in
      </text>
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.08" />
      <path
        d="M12 4.2c-4.3 0-7.8 3.5-7.8 7.8 0 3.4 2.2 6.3 5.3 7.4.4.1.5-.1.5-.3v-1.3c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8 0 1.2.8 1.2.8.7 1.2 1.8.8 2.3.6.1-.5.3-.8.5-1-1.8-.2-3.7-.9-3.7-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.2.8 2.1 0 3.1-1.9 3.8-3.7 4 .3.3.5.7.5 1.4v2.1c0 .2.1.4.5.3 3.1-1.1 5.3-4 5.3-7.4 0-4.3-3.5-7.8-7.8-7.8Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ReactAtomIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <ellipse cx="12" cy="12" rx="8.5" ry="3.2" stroke="currentColor" strokeWidth="1.6" />
      <ellipse
        cx="12"
        cy="12"
        rx="8.5"
        ry="3.2"
        stroke="currentColor"
        strokeWidth="1.6"
        transform="rotate(60 12 12)"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="8.5"
        ry="3.2"
        stroke="currentColor"
        strokeWidth="1.6"
        transform="rotate(120 12 12)"
      />
      <circle cx="12" cy="12" r="1.7" fill="currentColor" />
    </svg>
  );
}

function SendIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path fill="none" d="M0 0h24v24H0z" />
      <path
        fill="currentColor"
        d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
      />
    </svg>
  );
}

const iconToneClassName: Record<CardTone, string> = {
  whatsapp: "text-foreground",
  phone: "text-foreground",
  linkedin: "text-foreground",
  github: "text-foreground",
};

const buttonToneClassName: Record<CardTone, string> = {
  whatsapp: "border-border bg-surface text-foreground hover:border-accent hover:bg-accent-soft",
  phone: "border-border bg-surface text-foreground hover:border-accent hover:bg-accent-soft",
  linkedin: "border-border bg-surface text-foreground hover:border-accent hover:bg-accent-soft",
  github: "border-border bg-surface text-foreground hover:border-accent hover:bg-accent-soft",
};

type QuickAction = {
  label: string;
  href: string;
  Icon: ({ className }: { className?: string }) => React.JSX.Element;
  iconClassName: string;
  tone: CardTone;
};

function validateName(value: string) {
  const trimmed = trimValue(value);

  if (!trimmed) return "Please enter your name.";
  if (trimmed.length < 2) return "Name must be at least 2 characters.";
  if (trimmed.length > 60) return "Name must be 60 characters or fewer.";
  if (!/^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ\s.'-]*$/.test(trimmed)) {
    return "Use letters, spaces, apostrophes, periods, or hyphens only.";
  }

  return "";
}

function validatePhone(value: string) {
  const trimmed = trimValue(value);
  const digits = trimmed.replace(/\D/g, "");
  const localDigits =
    digits.length === 12 && digits.startsWith("91")
      ? digits.slice(2)
      : digits.length === 10
        ? digits
        : "";

  if (!trimmed) return "Please enter your phone number.";
  if (!localDigits) {
    return "Indian mobile numbers must have exactly 10 digits, with optional +91.";
  }
  if (!/^[6-9][0-9]{9}$/.test(localDigits)) {
    return "Enter a valid Indian mobile number starting with 6, 7, 8, or 9.";
  }

  return "";
}

function normalizePhone(value: string) {
  const trimmed = trimValue(value);
  const digits = trimmed.replace(/\D/g, "");

  if (!digits) return "";

  const localDigits = digits.startsWith("91") ? digits.slice(2, 12) : digits.slice(0, 10);
  if (localDigits.length === 10) {
    return `+91 ${localDigits}`;
  }

  return trimmed;
}

function formatPhoneInput(value: string) {
  const digits = value.replace(/\D/g, "");
  const localDigits = digits.startsWith("91") ? digits.slice(2, 12) : digits.slice(0, 10);

  return localDigits ? `+91 ${localDigits}` : "+91 ";
}

function validateEmail(value: string) {
  const trimmed = trimValue(value);

  if (!trimmed) return "Please enter your email address.";
  if (trimmed.length > 254) return "Email address is too long.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) {
    return "Enter a valid email address.";
  }

  return "";
}

function validateMessage(value: string) {
  const trimmed = trimValue(value);

  if (!trimmed) return "Please add a message.";
  if (trimmed.length < 20) return "Message should be at least 20 characters.";
  if (trimmed.length > 1000) return "Message must be 1000 characters or fewer.";

  return "";
}

function validateValues(values: ContactValues) {
  return {
    name: validateName(values.name),
    phone: validatePhone(values.phone),
    email: validateEmail(values.email),
    message: validateMessage(values.message),
  } satisfies Record<ContactFieldName, string>;
}

export function ContactFormSection({ links }: { links: ContactLinks }) {
  const [values, setValues] = useState<ContactValues>(initialValues);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<ContactTouched>({});
  const [status, setStatus] = useState<SubmissionState>("idle");
  const [popupErrors, setPopupErrors] = useState<PopupError[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const web3formsAccessKey =
    process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "2cc1e983-2754-448b-91d0-e027f0a9b727";

  const quickActions: QuickAction[] = [
    {
      label: "WhatsApp",
      href: links.whatsapp,
      Icon: WhatsAppIcon,
      iconClassName: iconToneClassName.whatsapp,
      tone: "whatsapp",
    },
    {
      label: "Call",
      href: `tel:${links.phone.replace(/\s+/g, "")}`,
      Icon: PhoneIcon,
      iconClassName: iconToneClassName.phone,
      tone: "phone",
    },
    {
      label: "LinkedIn",
      href: links.linkedin,
      Icon: LinkedInIcon,
      iconClassName: iconToneClassName.linkedin,
      tone: "linkedin",
    },
    {
      label: "GitHub",
      href: links.github,
      Icon: GitHubIcon,
      iconClassName: iconToneClassName.github,
      tone: "github",
    },
  ];

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const field = name as ContactFieldName;
    const nextValue = field === "phone" ? formatPhoneInput(value) : value;

    setValues((current) => ({ ...current, [field]: nextValue }));

    if (touched[field]) {
      const nextErrors = validateValues({ ...values, [field]: nextValue });
      setErrors((current) => ({ ...current, [field]: nextErrors[field] }));
    }

    if (status !== "idle") {
      setStatus("idle");
      setSubmissionError("");
    }
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = event.target;
    const field = name as ContactFieldName;
    const nextTouched = { ...touched, [field]: true };
    setTouched(nextTouched);

    const nextValues = field === "phone" ? { ...values, phone: formatPhoneInput(values.phone) } : values;
    if (field === "phone") {
      setValues(nextValues);
    }

    const nextErrors = validateValues(nextValues);
    setErrors((current) => ({ ...current, [field]: nextErrors[field] }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (status === "submitting") {
      return;
    }

    setIsSuccessOpen(false);

    const nextErrors = validateValues(values);
    const hasErrors = Object.values(nextErrors).some(Boolean);

    setTouched({
      name: true,
      phone: true,
      email: true,
      message: true,
    });
    setErrors(nextErrors);

    if (hasErrors) {
      setStatus("invalid");
      setSubmissionError("");
      setPopupErrors(
        (Object.keys(nextErrors) as ContactFieldName[])
          .map((fieldName) => ({
            field: fieldLabels[fieldName],
            message: nextErrors[fieldName],
          }))
          .filter((item): item is PopupError => Boolean(item.message)),
      );
      setIsPopupOpen(true);
      return;
    }

    if (!web3formsAccessKey) {
      setStatus("error");
      setSubmissionError("Missing Web3Forms access key. Add NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY in Vercel or .env.local.");
      return;
    }

    const normalizedValues: ContactValues = {
      ...values,
      phone: normalizePhone(values.phone),
      name: trimValue(values.name),
      email: trimValue(values.email),
      message: trimValue(values.message),
    };

    setStatus("submitting");
    setSubmissionError("");

    const payload = new FormData();
    payload.set("access_key", web3formsAccessKey);
    payload.set("subject", "New contact form submission");
    payload.set("from_name", "Siddhant Yojit Portfolio");
    payload.set("replyto", normalizedValues.email);
    payload.set("name", normalizedValues.name);
    payload.set("phone", normalizedValues.phone);
    payload.set("email", normalizedValues.email);
    payload.set("message", normalizedValues.message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: payload,
      });
      const data = (await response.json().catch(() => null)) as
        | { success?: boolean; message?: string }
        | null;

      if (!response.ok || !data?.success) {
        throw new Error(data?.message || "We could not send your message right now.");
      }

      setStatus("submitted");
      setValues(initialValues);
      setErrors({});
      setTouched({});
      setIsSuccessOpen(true);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "We could not send your message right now.";
      setStatus("error");
      setSubmissionError(message);
    }
  };

  return (
    <>
      {isPopupOpen ? (
        <div
          className="fixed inset-0 z-120 flex items-center justify-center bg-black/40 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-validation-title"
          aria-describedby="contact-validation-description"
          onClick={() => setIsPopupOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-3xl border border-border bg-surface-strong p-5 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p
                  id="contact-validation-title"
                  className="text-sm font-black uppercase tracking-[0.22em] text-accent"
                >
                  Validation error
                </p>
                <p id="contact-validation-description" className="mt-2 text-sm text-muted">
                  Please fix the following fields before sending the message.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsPopupOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-accent-soft"
                aria-label="Close validation popup"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <ul className="mt-4 grid gap-2">
              {popupErrors.map((error) => (
                <li
                  key={error.field}
                  className="rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-accent"
                >
                  {error.field}: {error.message}
                </li>
              ))}
            </ul>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setIsPopupOpen(false)}
                className="rounded-full bg-accent px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-white transition-colors hover:bg-accent-strong"
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {isSuccessOpen ? (
        <div
          className="fixed inset-0 z-120 flex items-center justify-center bg-black/40 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-success-title"
          aria-describedby="contact-success-description"
          onClick={() => {
            setIsSuccessOpen(false);
            setStatus("idle");
          }}
        >
          <div
            className="w-full max-w-md rounded-3xl border border-border bg-surface-strong p-5 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p
                  id="contact-success-title"
                  className="text-sm font-black uppercase tracking-[0.22em] text-accent"
                >
                  Message sent successfully
                </p>
                <p id="contact-success-description" className="mt-2 text-sm text-muted">
                  The form has been reset and is ready for a new message.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsSuccessOpen(false);
                  setStatus("idle");
                }}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-accent-soft"
                aria-label="Close success popup"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setIsSuccessOpen(false);
                  setStatus("idle");
                }}
                className="rounded-full bg-accent px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-white transition-colors hover:bg-accent-strong"
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <section className="grid gap-5 lg:grid-cols-2 motion-reveal">
        <div className="px-1 py-2 motion-reveal" style={{ animationDelay: "80ms" }}>
          <div className="border-b border-border pb-4">
            <p className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.24em] text-foreground">
              <FormIcon className="h-4 w-4 text-accent" />
              Send a message
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="mt-4 grid gap-3">
            {contactFields.map((field) => {
              const fieldError = errors[field.name];
              const isInvalid = Boolean(fieldError && touched[field.name]);

              return (
                <label key={field.name} className="grid gap-1.5">
                  <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-foreground">
                    <field.icon className="h-4 w-4 text-accent" />
                    {field.label}
                  </span>
                  <input
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={values[field.name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required={field.required}
                    autoComplete={field.autoComplete}
                    inputMode={field.inputMode}
                    minLength={field.minLength}
                    maxLength={field.maxLength}
                    pattern={field.pattern}
                    aria-invalid={isInvalid}
                    className={`w-full rounded-2xl border bg-surface-strong px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent ${
                      isInvalid ? "border-accent focus:border-accent-strong" : "border-border"
                    }`}
                  />
                </label>
              );
            })}

            <label className="grid gap-1.5">
              <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-foreground">
                <ReactAtomIcon className="h-4 w-4 text-accent" />
                Message
              </span>
              <textarea
                name="message"
                placeholder="Tell me what you need help with..."
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                minLength={20}
                maxLength={1000}
                rows={5}
                aria-invalid={Boolean(errors.message && touched.message)}
                className={`w-full resize-y rounded-2xl border bg-surface-strong px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent ${
                  errors.message && touched.message ? "border-accent focus:border-accent-strong" : "border-border"
                }`}
              />
            </label>

            <input
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="sr-only"
            />

            <div className="grid gap-3">
              <button
                type="submit"
                className={`send-button w-full justify-center sm:w-fit ${
                  status === "submitting" ? "send-button--sending" : ""
                }`}
                aria-busy={status === "submitting"}
                disabled={status === "submitting"}
              >
                <span className="send-button__svg-wrapper-1" aria-hidden="true">
                  <span className="send-button__svg-wrapper">
                    <SendIcon className="send-button__icon h-6 w-6" />
                  </span>
                </span>
                <span className="send-button__text">
                  {status === "submitting" ? "Sending" : status === "submitted" ? "Sent" : "Send"}
                </span>
              </button>

              {submissionError ? (
                <p className="text-sm text-accent" role="alert">
                  {submissionError}
                </p>
              ) : null}

              {status === "submitted" ? (
                <p className="text-sm text-muted">
                  Message sent successfully. I’ll get back to you as soon as I can.
                </p>
              ) : null}
            </div>
          </form>
        </div>

        <div className="px-1 py-2 motion-reveal" style={{ animationDelay: "160ms" }}>
          <div className="flex justify-end xl:translate-x-10 xl:translate-y-2">
            <div className="flex h-full w-full max-w-full flex-col xl:max-w-105">
              <div className="flex flex-wrap items-center justify-center gap-3">
                {quickActions.map(({ label, href, Icon, iconClassName, tone }, index) => {
                  const isExternal = href.startsWith("http");
                  return (
                    <a
                      key={label}
                      href={href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noreferrer" : undefined}
                      aria-label={label}
                      className={`group inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border shadow-lg transition-all duration-200 ease-out hover:scale-105 hover:shadow-xl motion-reveal sm:h-14 sm:w-14 ${buttonToneClassName[tone]}`}
                      style={{ animationDelay: `${220 + index * 90}ms` }}
                    >
                      <Icon className={`h-6 w-6 transition-transform duration-200 group-hover:scale-110 sm:h-7 sm:w-7 ${iconClassName}`} />
                    </a>
                  );
                })}
              </div>

              <div
                className="mx-auto mt-5 w-full max-w-full rounded-3xl border border-border bg-surface-strong px-4 py-3 shadow-sm motion-reveal sm:max-w-95"
                style={{ animationDelay: "420ms" }}
              >
                <p className="text-sm font-black uppercase tracking-[0.24em] text-foreground">
                  Quick details
                </p>
                <p className="mt-1.5 text-xs leading-5 text-muted">
                  Share these details in your message so I can reply quickly and clearly.
                </p>
                <div className="mt-3 grid gap-2.5">
                  <div className="flex flex-col gap-1 border-b border-border pb-2.5 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                    <p className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-foreground">
                      Project type
                    </p>
                    <p className="max-w-none text-left text-xs text-muted sm:max-w-52 sm:text-right">
                      Website, UI redesign, portfolio, or freelance work.
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 border-b border-border pb-2.5 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                    <p className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-foreground">
                      Timeline
                    </p>
                    <p className="max-w-none text-left text-xs text-muted sm:max-w-52 sm:text-right">
                      Let me know your expected deadline or urgency.
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                    <p className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-foreground">
                      Best contact time
                    </p>
                    <p className="max-w-none text-left text-xs text-muted sm:max-w-52 sm:text-right">
                      Mention the time window that works for you.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-4">
                <div
                  className="mx-auto flex w-full max-w-full flex-col gap-3 rounded-3xl border border-border bg-surface-strong px-4 py-3 shadow-sm motion-reveal sm:max-w-95 sm:flex-row sm:items-center sm:justify-between"
                  style={{ animationDelay: "500ms" }}
                >
                  <div className="rounded-2xl bg-accent-soft px-3 py-2 text-[0.65rem] font-black uppercase tracking-[0.2em] text-accent">
                    Reply fast
                  </div>
                  <div className="flex-1 text-left sm:text-right">
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-foreground">
                      Quick reply
                    </p>
                    <p className="mt-1 text-xs leading-5 text-muted">
                      Usually within 1 business day.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
