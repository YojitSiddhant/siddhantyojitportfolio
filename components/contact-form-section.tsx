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
        d="M8.2 4.8h1.7c.7 0 1.3.5 1.5 1.2l.4 1.8a1.4 1.4 0 0 1-.4 1.3L10 10.5c1.1 2.4 2.9 4.2 5.3 5.3l1.4-1.4a1.4 1.4 0 0 1 1.3-.4l1.8.4c.7.2 1.2.8 1.2 1.5v1.7c0 1-.8 1.8-1.8 1.8C11.2 20.8 3.2 12.8 4 6c0-1 .8-1.8 1.8-1.8h2.4Z"
        fill="currentColor"
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
    <svg viewBox="0 0 448 512" aria-hidden="true" className={className} fill="none">
      <path
        fill="currentColor"
        d="M380.9 97.1C339 55.1 283.5 32 224.4 32 102 32 2.4 131.6 2.4 254c0 39.1 10.2 77.3 29.6 110.4L0 480l117.7-30.9c32.4 17.6 68.8 26.9 106.8 26.9h.1c122.3 0 222-99.6 222-222 0-59.1-23.1-114.6-65.1-156.9zM224.5 438.6h-.1c-34.6 0-68.5-9.3-98.1-26.9l-7-4.1-69.7 18.3 18.6-67.8-4.5-7.2c-19.5-31-29.9-66.7-29.9-103.4 0-107.4 87.5-194.9 195.1-194.9 52 0 100.8 20.3 137.4 57 36.7 36.7 57 85.4 57 137.4 0 107.5-87.5 195-195.1 195z"
      />
      <path
        fill="currentColor"
        d="M342.3 296.4c-5.8-2.9-34.3-16.9-39.7-18.8-5.3-1.9-9.2-2.9-13.1 2.9-3.9 5.8-15.1 18.8-18.5 22.6-3.4 3.9-6.8 4.4-12.6 1.5-5.8-2.9-24.5-9-46.7-29.8-17.3-15.4-29-34.4-32.3-40.2-3.4-5.8-.4-9 2.6-11.9 2.7-2.6 5.8-6.8 8.7-10.2 2.9-3.4 3.9-5.8 5.8-9.7 1.9-3.9 1-7.3-.5-10.2-1.5-2.9-13.1-31.7-17.9-43.4-4.7-11.4-9.6-9.9-13.1-10.1-3.3-.2-7.1-.2-10.9-.2s-10 1.4-15.2 6.8c-5.3 5.3-20.1 19.6-20.1 47.8s20.6 55.5 23.5 59.3c2.9 3.9 41 64.5 100 90.5 14 6 24.9 9.6 33.4 12.3 14 4.4 26.8 3.8 36.9 2.3 11.3-1.7 34.7-13.8 39.6-27.1 4.9-13.3 4.9-24.7 3.4-27.1-1.4-2.4-5.3-3.8-11.1-6.7z"
      />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path d="M7 8.5H5V19h2V8.5Z" fill="currentColor" />
      <circle cx="6" cy="5.5" r="1.15" fill="currentColor" />
      <path
        d="M12 10.6v1.1c.7-1 1.8-1.6 3.1-1.6 2.4 0 4.3 1.9 4.3 4.8V19h-2v-3.8c0-1.8-.9-2.9-2.4-2.9-1.4 0-2.6 1.1-3.1 2.1V19h-2V10.6h2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M12 4.5a7.5 7.5 0 0 0-2.4 14.6c.38.07.52-.16.52-.36v-1.27c-2.14.47-2.59-1.03-2.59-1.03-.35-.9-.86-1.14-.86-1.14-.7-.48.05-.47.05-.47.77.05 1.17.8 1.17.8.69 1.16 1.8.82 2.24.62.07-.5.27-.83.5-1.02-1.71-.2-3.51-.86-3.51-3.84 0-.85.3-1.55.8-2.09-.08-.2-.34-1 .08-2.08 0 0 .66-.21 2.15.8a7.5 7.5 0 0 1 3.9 0c1.49-1.01 2.15-.8 2.15-.8.42 1.08.16 1.88.08 2.08.5.54.8 1.24.8 2.09 0 2.99-1.8 3.64-3.52 3.84.28.24.53.7.53 1.41v2.09c0 .2.14.43.53.36A7.5 7.5 0 0 0 12 4.5Z"
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

const cardToneClassName: Record<CardTone, string> = {
  whatsapp: "hover:bg-[#4cd137]",
  phone: "hover:bg-[#25D366]",
  linkedin: "hover:bg-[#24a0ed]",
  github: "hover:bg-[#f7b733]",
};

const cardIconSizeClassName = "h-10 w-10 transition-colors duration-200";
const hoverIconClassName = "group-hover:text-white group-hover:fill-white";

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
      iconClassName: "text-[#25D366]",
      tone: "whatsapp",
    },
    {
      label: "Call",
      href: `tel:${links.phone.replace(/\s+/g, "")}`,
      Icon: PhoneIcon,
      iconClassName: "text-[#25D366]",
      tone: "phone",
    },
    {
      label: "LinkedIn",
      href: links.linkedin,
      Icon: LinkedInIcon,
      iconClassName: "text-[#0A66C2]",
      tone: "linkedin",
    },
    {
      label: "GitHub",
      href: links.github,
      Icon: GitHubIcon,
      iconClassName: "text-[#181717]",
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
    payload.set("botcheck", "false");

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
          className="fixed inset-0 z-[120] flex items-center justify-center bg-white/55 px-4 py-6 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-validation-title"
          aria-describedby="contact-validation-description"
          onClick={() => setIsPopupOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-3xl border border-red-200 bg-white p-5 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p
                  id="contact-validation-title"
                  className="text-sm font-black uppercase tracking-[0.22em] text-red-600"
                >
                  Validation error
                </p>
                <p id="contact-validation-description" className="mt-2 text-sm text-[var(--muted)]">
                  Please fix the following fields before sending the message.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsPopupOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--foreground)] transition-colors hover:bg-[var(--accent-soft)]"
                aria-label="Close validation popup"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <ul className="mt-4 grid gap-2">
              {popupErrors.map((error) => (
                <li
                  key={error.field}
                  className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {error.field}: {error.message}
                </li>
              ))}
            </ul>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setIsPopupOpen(false)}
                className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-white transition-colors hover:bg-[var(--accent-strong)]"
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {isSuccessOpen ? (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-white/55 px-4 py-6 backdrop-blur-[2px]"
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
            className="w-full max-w-md rounded-3xl border border-green-200 bg-white p-5 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p
                  id="contact-success-title"
                  className="text-sm font-black uppercase tracking-[0.22em] text-green-600"
                >
                  Message sent successfully
                </p>
                <p id="contact-success-description" className="mt-2 text-sm text-[var(--muted)]">
                  The form has been reset and is ready for a new message.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsSuccessOpen(false);
                  setStatus("idle");
                }}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--foreground)] transition-colors hover:bg-[var(--accent-soft)]"
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
                className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-white transition-colors hover:bg-[var(--accent-strong)]"
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <section className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr] motion-reveal">
        <div className="px-1 py-2 motion-reveal" style={{ animationDelay: "80ms" }}>
          <div className="border-b border-[var(--border)] pb-4">
            <p className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.24em] text-[var(--foreground)]">
              <FormIcon className="h-4 w-4 text-[var(--accent)]" />
              Send a message
            </p>
            <p className="mt-2 max-w-2xl text-[1rem] leading-7 text-[var(--muted)] text-pretty sm:text-[1.05rem]">
              Fill in your details and submit the form. Validation runs locally, then the message
              is sent through Web3Forms.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="mt-4 grid gap-3">
            {contactFields.map((field) => {
              const fieldError = errors[field.name];
              const isInvalid = Boolean(fieldError && touched[field.name]);

              return (
                <label key={field.name} className="grid gap-1.5">
                  <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-[var(--foreground)]">
                    <field.icon className="h-4 w-4 text-[var(--accent)]" />
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
                    className={`w-full rounded-2xl border bg-white px-4 py-2.5 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)] ${
                      isInvalid ? "border-red-400 focus:border-red-500" : "border-[var(--border)]"
                    }`}
                  />
                </label>
              );
            })}

            <label className="grid gap-1.5">
              <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-[var(--foreground)]">
                <ReactAtomIcon className="h-4 w-4 text-[var(--accent)]" />
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
                className={`w-full resize-y rounded-2xl border bg-white px-4 py-2.5 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)] ${
                  errors.message && touched.message ? "border-red-400 focus:border-red-500" : "border-[var(--border)]"
                }`}
              />
            </label>

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
                <p className="text-sm text-red-600" role="alert">
                  {submissionError}
                </p>
              ) : null}

              {status === "submitted" ? (
                <p className="text-sm text-[var(--muted)]">
                  Message sent successfully. I’ll get back to you as soon as I can.
                </p>
              ) : null}
            </div>
          </form>
        </div>

        <div className="px-1 py-2 motion-reveal" style={{ animationDelay: "160ms" }}>
          <div className="flex justify-end xl:translate-x-10 xl:translate-y-2">
            <div className="flex h-full w-full max-w-[420px] flex-col">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {quickActions.map(({ label, href, Icon, iconClassName, tone }, index) => {
                  const isExternal = href.startsWith("http");
                  return (
                    <a
                      key={label}
                      href={href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noreferrer" : undefined}
                      aria-label={label}
                      className={`group flex h-[68px] w-full items-center justify-between rounded-[5px] border-[3px] border-[#2d2d2d] bg-white px-4 shadow-[6px_6px_0px_#2d2d2d] transition-all duration-200 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] hover:-translate-x-1.5 hover:-translate-y-1.5 hover:shadow-[12px_12px_0px_#2d2d2d] motion-reveal ${cardToneClassName[tone]}`}
                      style={{ animationDelay: `${220 + index * 90}ms` }}
                    >
                      <span className="flex items-center gap-3">
                        <Icon
                          className={`${cardIconSizeClassName} ${iconClassName} transition-transform duration-200 group-hover:scale-105 ${hoverIconClassName}`}
                        />
                      </span>
                      <span className="text-left">
                        <span className="block text-xs font-black uppercase tracking-[0.18em] text-[var(--foreground)] transition-colors group-hover:text-white">
                          {label}
                        </span>
                        <span className="block text-[0.65rem] uppercase tracking-[0.18em] text-[var(--muted)] transition-colors group-hover:text-white/80">
                          Open
                        </span>
                      </span>
                    </a>
                  );
                })}
              </div>

              <div
                className="mx-auto mt-5 w-full max-w-[380px] rounded-3xl border border-[var(--border)] bg-white px-4 py-3 shadow-sm motion-reveal"
                style={{ animationDelay: "420ms" }}
              >
                <p className="text-sm font-black uppercase tracking-[0.24em] text-[var(--foreground)]">
                  Quick details
                </p>
                <p className="mt-1.5 text-xs leading-5 text-[var(--muted)]">
                  Share these details in your message so I can reply quickly and clearly.
                </p>
                <div className="mt-3 grid gap-2.5">
                  <div className="flex items-center justify-between gap-3 border-b border-[var(--border)] pb-2.5">
                    <p className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-[var(--foreground)]">
                      Project type
                    </p>
                    <p className="max-w-[12rem] text-right text-xs text-[var(--muted)] sm:max-w-[13rem]">
                      Website, UI redesign, portfolio, or freelance work.
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-3 border-b border-[var(--border)] pb-2.5">
                    <p className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-[var(--foreground)]">
                      Timeline
                    </p>
                    <p className="max-w-[12rem] text-right text-xs text-[var(--muted)] sm:max-w-[13rem]">
                      Let me know your expected deadline or urgency.
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-[var(--foreground)]">
                      Best contact time
                    </p>
                    <p className="max-w-[12rem] text-right text-xs text-[var(--muted)] sm:max-w-[13rem]">
                      Mention the time window that works for you.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-4">
                <div
                  className="mx-auto flex w-full max-w-[380px] items-center justify-between gap-3 rounded-3xl border border-[var(--border)] bg-white px-4 py-3 shadow-sm motion-reveal"
                  style={{ animationDelay: "500ms" }}
                >
                  <div className="rounded-2xl bg-[var(--accent-soft)] px-3 py-2 text-[0.65rem] font-black uppercase tracking-[0.2em] text-[var(--accent)]">
                    Reply fast
                  </div>
                  <div className="flex-1 text-right">
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--foreground)]">
                      Quick reply
                    </p>
                    <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
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
