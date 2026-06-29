"use client";

import { useState, type ChangeEvent, type FocusEvent, type FormEvent, type ReactElement } from "react";

type BookingFieldName = "name" | "phone" | "email" | "preferredDate" | "preferredTime" | "meetingMode" | "topic" | "message";

type BookingValues = Record<BookingFieldName, string>;
type BookingErrors = Partial<Record<BookingFieldName, string>>;
type BookingTouched = Partial<Record<BookingFieldName, boolean>>;
type PopupError = {
  field: string;
  message: string;
};

type SubmissionState = "idle" | "submitting" | "submitted" | "invalid" | "error";

type BookingLinks = {
  email: string;
  phone: string;
  whatsapp: string;
  admin: string;
};

type BookingResponse = {
  id: string;
  name: string;
  preferredDate: string;
  preferredTime: string;
  meetingMode: string;
  topic: string;
};

type BookingField = {
  label: string;
  name: Exclude<BookingFieldName, "message">;
  type: "text" | "tel" | "email" | "date" | "time" | "select";
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel" | "numeric" | "decimal";
  minLength?: number;
  maxLength?: number;
  icon: ({ className }: { className?: string }) => ReactElement;
};

const initialValues: BookingValues = {
  name: "",
  phone: "+91 ",
  email: "",
  preferredDate: "",
  preferredTime: "",
  meetingMode: "",
  topic: "",
  message: "",
};

const fieldLabels: Record<BookingFieldName, string> = {
  name: "Name",
  phone: "Phone Number",
  email: "Email",
  preferredDate: "Preferred date",
  preferredTime: "Preferred time",
  meetingMode: "Meeting mode",
  topic: "Discussion topic",
  message: "Agenda",
};

const meetingModeOptions = [
  { label: "Online call", value: "Online call" },
  { label: "Phone call", value: "Phone call" },
  { label: "In person", value: "In person" },
];

const topicOptions = [
  { label: "Project discussion", value: "Project discussion" },
  { label: "Portfolio review", value: "Portfolio review" },
  { label: "Freelance enquiry", value: "Freelance enquiry" },
  { label: "Hiring / internship", value: "Hiring / internship" },
  { label: "Other", value: "Other" },
];

const bookingFields: BookingField[] = [
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
  },
  {
    label: "Preferred date",
    name: "preferredDate",
    icon: CalendarIcon,
    type: "date",
    required: true,
  },
  {
    label: "Preferred time",
    name: "preferredTime",
    icon: ClockIcon,
    type: "time",
    required: true,
  },
];

function trimValue(value: string) {
  return value.trim();
}

function getTodayInputValue() {
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  return today.toISOString().slice(0, 10);
}

function getDateLabel(dateValue: string) {
  const parsed = new Date(`${dateValue}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) {
    return dateValue;
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parsed);
}

function formatTimeLabel(value: string) {
  if (!value) return value;
  const [hoursText, minutesText] = value.split(":");
  const hours = Number(hoursText);
  const minutes = Number(minutesText);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return value;

  const period = hours >= 12 ? "PM" : "AM";
  const normalizedHours = hours % 12 || 12;
  return `${normalizedHours}:${minutesText} ${period}`;
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

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M7 4.5v2M17 4.5v2M5 8.5h14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M6.5 6.5h11A2.5 2.5 0 0 1 20 9v9A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5V9a2.5 2.5 0 0 1 2.5-2.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7.8V12l3 1.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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

function LinkArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path d="M7 17 17 7M10 7h7v7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SubmitIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        fill="currentColor"
        d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
      />
    </svg>
  );
}

function BookingConfirmationIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M12 3.5 19 6v5.2c0 4.6-3.1 8.5-7 9.8-3.9-1.3-7-5.2-7-9.8V6l7-2.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="m9.5 12.2 1.8 1.8 3.3-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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

function validatePreferredDate(value: string) {
  if (!value) return "Please choose a preferred date.";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return "Please enter a valid date.";

  const selected = new Date(`${value}T00:00:00`);
  if (Number.isNaN(selected.getTime())) return "Please enter a valid date.";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selected < today) return "Choose today or a future date.";

  return "";
}

function validatePreferredTime(value: string) {
  if (!value) return "Please choose a preferred time.";
  if (!/^\d{2}:\d{2}$/.test(value)) return "Please enter a valid time.";

  const [hoursText, minutesText] = value.split(":");
  const hours = Number(hoursText);
  const minutes = Number(minutesText);

  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return "Please enter a valid time.";
  }

  const totalMinutes = hours * 60 + minutes;
  const openingMinutes = 9 * 60;
  const closingMinutes = 19 * 60 + 30;

  if (totalMinutes < openingMinutes || totalMinutes > closingMinutes) {
    return "Select a time between 09:00 and 19:30.";
  }

  return "";
}

function validateMeetingMode(value: string) {
  if (!value) return "Please select a meeting mode.";
  if (!meetingModeOptions.some((option) => option.value === value)) return "Please select a valid meeting mode.";
  return "";
}

function validateTopic(value: string) {
  if (!value) return "Please choose a discussion topic.";
  if (!topicOptions.some((option) => option.value === value)) return "Please choose a valid topic.";
  return "";
}

function validateMessage(value: string) {
  const trimmed = trimValue(value);

  if (!trimmed) return "Please add a short agenda for the meeting.";
  if (trimmed.length < 20) return "Agenda should be at least 20 characters.";
  if (trimmed.length > 1000) return "Agenda must be 1000 characters or fewer.";

  return "";
}

function validateValues(values: BookingValues) {
  return {
    name: validateName(values.name),
    phone: validatePhone(values.phone),
    email: validateEmail(values.email),
    preferredDate: validatePreferredDate(values.preferredDate),
    preferredTime: validatePreferredTime(values.preferredTime),
    meetingMode: validateMeetingMode(values.meetingMode),
    topic: validateTopic(values.topic),
    message: validateMessage(values.message),
  } satisfies Record<BookingFieldName, string>;
}

function DetailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path d="M7 12h10M7 8h10M7 16h7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="5" cy="8" r="1" fill="currentColor" />
      <circle cx="5" cy="12" r="1" fill="currentColor" />
      <circle cx="5" cy="16" r="1" fill="currentColor" />
    </svg>
  );
}

function MeetingIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M7 7.5A1.5 1.5 0 0 1 8.5 6h7A1.5 1.5 0 0 1 17 7.5v5A1.5 1.5 0 0 1 15.5 14h-3.1L9 17v-3H8.5A1.5 1.5 0 0 1 7 12.5v-5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AdminIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M12 3.5 19 6v5.2c0 4.6-3.1 8.5-7 9.8-3.9-1.3-7-5.2-7-9.8V6l7-2.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M9.5 12 11 13.5 14.8 9.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ContactFormSection({ links, adminHref }: { links: BookingLinks; adminHref: string }) {
  const [values, setValues] = useState<BookingValues>(initialValues);
  const [errors, setErrors] = useState<BookingErrors>({});
  const [touched, setTouched] = useState<BookingTouched>({});
  const [status, setStatus] = useState<SubmissionState>("idle");
  const [popupErrors, setPopupErrors] = useState<PopupError[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [confirmedBooking, setConfirmedBooking] = useState<BookingResponse | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    const field = name as BookingFieldName;
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

  const handleBlur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = event.target;
    const field = name as BookingFieldName;
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
    setConfirmedBooking(null);

    const nextErrors = validateValues(values);
    const hasErrors = Object.values(nextErrors).some(Boolean);

    setTouched({
      name: true,
      phone: true,
      email: true,
      preferredDate: true,
      preferredTime: true,
      meetingMode: true,
      topic: true,
      message: true,
    });
    setErrors(nextErrors);

    if (hasErrors) {
      setStatus("invalid");
      setSubmissionError("");
      setPopupErrors(
        (Object.keys(nextErrors) as BookingFieldName[])
          .map((fieldName) => ({
            field: fieldLabels[fieldName],
            message: nextErrors[fieldName],
          }))
          .filter((item): item is PopupError => Boolean(item.message)),
      );
      setIsPopupOpen(true);
      return;
    }

    const normalizedValues: BookingValues = {
      ...values,
      phone: normalizePhone(values.phone),
      name: trimValue(values.name),
      email: trimValue(values.email),
      preferredDate: values.preferredDate,
      preferredTime: values.preferredTime,
      meetingMode: values.meetingMode,
      topic: values.topic,
      message: trimValue(values.message),
    };

    setStatus("submitting");
    setSubmissionError("");

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(normalizedValues),
      });

      const data = (await response.json().catch(() => null)) as
        | { success?: boolean; message?: string; booking?: BookingResponse }
        | null;

      if (!response.ok || !data?.success || !data.booking) {
        throw new Error(data?.message || "We could not save your booking request right now.");
      }

      setStatus("submitted");
      setConfirmedBooking(data.booking);
      setValues(initialValues);
      setErrors({});
      setTouched({});
      setIsSuccessOpen(true);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "We could not save your booking request right now.";
      setStatus("error");
      setSubmissionError(message);
    }
  };

  return (
    <>
      {isPopupOpen ? (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/40 px-4 py-6 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-validation-title"
          aria-describedby="booking-validation-description"
          onClick={() => setIsPopupOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-3xl border border-[var(--border)] bg-[var(--surface-strong)] p-5 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p
                  id="booking-validation-title"
                  className="text-sm font-black uppercase tracking-[0.22em] text-[var(--accent)]"
                >
                  Check the slot details
                </p>
                <p id="booking-validation-description" className="mt-2 text-sm text-[var(--muted)]">
                  Please fix the highlighted booking fields before sending the request.
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
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--accent)]"
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
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/40 px-4 py-6 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-success-title"
          aria-describedby="booking-success-description"
          onClick={() => {
            setIsSuccessOpen(false);
            setStatus("idle");
          }}
        >
          <div
            className="w-full max-w-md rounded-3xl border border-[var(--border)] bg-[var(--surface-strong)] p-5 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p
                  id="booking-success-title"
                  className="text-sm font-black uppercase tracking-[0.22em] text-[var(--accent)]"
                >
                  Booking request sent
                </p>
                <p id="booking-success-description" className="mt-2 text-sm text-[var(--muted)]">
                  The slot request has been saved and will appear on the admin page.
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

            <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
              <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.22em] text-[var(--foreground)]">
                <BookingConfirmationIcon className="h-4 w-4 text-[var(--accent)]" />
                Confirmation
              </div>
              {confirmedBooking ? (
                <div className="mt-3 grid gap-2 text-sm text-[var(--muted)]">
                  <p>
                    Reference: <span className="font-black text-[var(--foreground)]">{confirmedBooking.id.slice(-6).toUpperCase()}</span>
                  </p>
                  <p>
                    Slot:{" "}
                    <span className="font-black text-[var(--foreground)]">
                      {getDateLabel(confirmedBooking.preferredDate)} at {formatTimeLabel(confirmedBooking.preferredTime)}
                    </span>
                  </p>
                  <p>
                    Mode: <span className="font-black text-[var(--foreground)]">{confirmedBooking.meetingMode}</span>
                  </p>
                  <p>
                    Topic: <span className="font-black text-[var(--foreground)]">{confirmedBooking.topic}</span>
                  </p>
                </div>
              ) : null}
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

      <section className="grid gap-5 lg:grid-cols-[1.06fr_0.94fr] motion-reveal">
        <div className="px-1 py-2 motion-reveal" style={{ animationDelay: "80ms" }}>
          <div className="border-b border-[var(--border)] pb-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.24em] text-[var(--foreground)]">
                <FormIcon className="h-4 w-4 text-[var(--accent)]" />
                Book a slot
              </p>
              <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.2em] text-[var(--accent-strong)]">
                Requests go to admin
              </span>
            </div>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">
              Pick a time, share what you want to discuss, and I will review the request from the admin page.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="mt-4 grid gap-3">
            {bookingFields.map((field) => {
              const fieldError = errors[field.name];
              const isInvalid = Boolean(fieldError && touched[field.name]);
              const commonClasses = `w-full rounded-2xl border bg-[var(--surface-strong)] px-4 py-2.5 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)] ${
                isInvalid ? "border-[var(--accent)] focus:border-[var(--accent-strong)]" : "border-[var(--border)]"
              }`;

              return (
                <label key={field.name} className="grid gap-1.5">
                  <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-[var(--foreground)]">
                    <field.icon className="h-4 w-4 text-[var(--accent)]" />
                    {field.label}
                  </span>

                  {field.type === "date" || field.type === "time" ? (
                    <input
                      name={field.name}
                      type={field.type}
                      value={values[field.name]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required={field.required}
                      aria-invalid={isInvalid}
                      min={field.type === "date" ? getTodayInputValue() : "09:00"}
                      max={field.type === "time" ? "19:30" : undefined}
                      step={field.type === "time" ? 1800 : undefined}
                      className={commonClasses}
                    />
                  ) : null}

                  {field.type === "select" ? null : field.type !== "date" && field.type !== "time" ? (
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
                      aria-invalid={isInvalid}
                      className={commonClasses}
                    />
                  ) : null}
                </label>
              );
            })}

            <label className="grid gap-1.5">
              <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-[var(--foreground)]">
                <MeetingIcon className="h-4 w-4 text-[var(--accent)]" />
                Meeting mode
              </span>
              <select
                name="meetingMode"
                value={values.meetingMode}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                aria-invalid={Boolean(errors.meetingMode && touched.meetingMode)}
                className={`w-full rounded-2xl border bg-[var(--surface-strong)] px-4 py-2.5 text-sm text-[var(--foreground)] outline-none transition-colors focus:border-[var(--accent)] ${
                  errors.meetingMode && touched.meetingMode
                    ? "border-[var(--accent)] focus:border-[var(--accent-strong)]"
                    : "border-[var(--border)]"
                }`}
              >
                <option value="">Choose a meeting mode</option>
                {meetingModeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-1.5">
              <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-[var(--foreground)]">
                <DetailIcon className="h-4 w-4 text-[var(--accent)]" />
                Discussion topic
              </span>
              <select
                name="topic"
                value={values.topic}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                aria-invalid={Boolean(errors.topic && touched.topic)}
                className={`w-full rounded-2xl border bg-[var(--surface-strong)] px-4 py-2.5 text-sm text-[var(--foreground)] outline-none transition-colors focus:border-[var(--accent)] ${
                  errors.topic && touched.topic ? "border-[var(--accent)] focus:border-[var(--accent-strong)]" : "border-[var(--border)]"
                }`}
              >
                <option value="">Choose a topic</option>
                {topicOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-1.5">
              <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-[var(--foreground)]">
                <MeetingIcon className="h-4 w-4 text-[var(--accent)]" />
                Agenda
              </span>
              <textarea
                name="message"
                placeholder="Tell me what you would like to cover in the meeting..."
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                minLength={20}
                maxLength={1000}
                rows={5}
                aria-invalid={Boolean(errors.message && touched.message)}
                className={`w-full resize-y rounded-2xl border bg-[var(--surface-strong)] px-4 py-2.5 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)] ${
                  errors.message && touched.message ? "border-[var(--accent)] focus:border-[var(--accent-strong)]" : "border-[var(--border)]"
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
                    <SubmitIcon className="send-button__icon h-6 w-6" />
                  </span>
                </span>
                <span className="send-button__text">
                  {status === "submitting" ? "Saving" : status === "submitted" ? "Saved" : "Request slot"}
                </span>
              </button>

              {submissionError ? (
                <p className="text-sm text-[var(--accent)]" role="alert">
                  {submissionError}
                </p>
              ) : null}

              {status === "submitted" ? (
                <p className="text-sm text-[var(--muted)]">
                  Your slot request is saved. You can share this page with the admin so they can review it.
                </p>
              ) : null}
            </div>
          </form>
        </div>

        <div className="px-1 py-2 motion-reveal" style={{ animationDelay: "160ms" }}>
          <div className="flex justify-end xl:translate-x-10 xl:translate-y-2">
            <div className="flex h-full w-full max-w-full flex-col xl:max-w-[420px]">
              <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface-strong)] p-4 shadow-sm motion-reveal sm:p-5">
                <div className="flex items-center justify-between gap-3 border-b border-[var(--border)] pb-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--foreground)]">How booking works</p>
                    <h2 className="mt-2 text-2xl font-bold tracking-normal text-[var(--foreground)]">
                      A simple slot request flow
                    </h2>
                  </div>
                  <div className="rounded-full border border-[var(--border)] bg-[var(--accent-soft)] px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.2em] text-[var(--accent-strong)]">
                    Admin ready
                  </div>
                </div>

                <div className="mt-4 grid gap-3">
                  <div className="flex gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3">
                    <CalendarIcon className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" />
                    <div>
                      <p className="text-sm font-black uppercase tracking-[0.2em] text-[var(--foreground)]">Pick a slot</p>
                      <p className="mt-1 text-sm text-[var(--muted)]">
                        Choose a date and time that works for you. The request is saved for admin review.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3">
                    <DetailIcon className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" />
                    <div>
                      <p className="text-sm font-black uppercase tracking-[0.2em] text-[var(--foreground)]">Share context</p>
                      <p className="mt-1 text-sm text-[var(--muted)]">
                        Add the agenda and the best way to meet so the admin can prepare before the call.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3">
                    <AdminIcon className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" />
                    <div>
                      <p className="text-sm font-black uppercase tracking-[0.2em] text-[var(--foreground)]">Admin reviews</p>
                      <p className="mt-1 text-sm text-[var(--muted)]">
                        The booking appears on the admin page in newest-first order.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--accent-soft)] p-3">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.24em] text-[var(--foreground)]">
                    <ClockIcon className="h-4 w-4 text-[var(--accent)]" />
                    Availability window
                  </div>
                  <div className="mt-3 grid gap-2 text-sm text-[var(--muted)] sm:grid-cols-3">
                    <p>Morning: 9:00 - 11:30</p>
                    <p>Afternoon: 1:00 - 4:30</p>
                    <p>Evening: 5:00 - 7:30</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <a
                  href={links.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 rounded-3xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 shadow-sm transition-all duration-200 hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]"
                >
                  <WhatsAppIcon className="h-6 w-6 text-[var(--foreground)] transition-transform duration-200 group-hover:scale-110" />
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.22em] text-[var(--foreground)]">WhatsApp</p>
                    <p className="mt-1 text-xs text-[var(--muted)]">Start a quick conversation</p>
                  </div>
                </a>
                <a
                  href={`tel:${links.phone.replace(/\s+/g, "")}`}
                  className="group flex items-center gap-3 rounded-3xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 shadow-sm transition-all duration-200 hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]"
                >
                  <PhoneIcon className="h-6 w-6 text-[var(--foreground)] transition-transform duration-200 group-hover:scale-110" />
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.22em] text-[var(--foreground)]">Call</p>
                    <p className="mt-1 text-xs text-[var(--muted)]">{links.phone}</p>
                  </div>
                </a>
                <a
                  href={`mailto:${links.email}`}
                  className="group flex items-center gap-3 rounded-3xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 shadow-sm transition-all duration-200 hover:border-[var(--accent)] hover:bg-[var(--accent-soft)] sm:col-span-2"
                >
                  <MailIcon className="h-6 w-6 text-[var(--foreground)] transition-transform duration-200 group-hover:scale-110" />
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.22em] text-[var(--foreground)]">Email</p>
                    <p className="mt-1 text-xs text-[var(--muted)]">{links.email}</p>
                  </div>
                </a>
                <a
                  href={adminHref}
                  className="group flex items-center gap-3 rounded-3xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 shadow-sm transition-all duration-200 hover:border-[var(--accent)] hover:bg-[var(--accent-soft)] sm:col-span-2"
                >
                  <AdminIcon className="h-6 w-6 text-[var(--foreground)] transition-transform duration-200 group-hover:scale-110" />
                  <div className="min-w-0">
                    <p className="text-sm font-black uppercase tracking-[0.22em] text-[var(--foreground)]">Admin page</p>
                    <p className="mt-1 inline-flex items-center gap-1 text-xs text-[var(--muted)]">
                      Open the booking dashboard
                      <LinkArrowIcon className="h-3.5 w-3.5 text-[var(--accent)]" />
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
