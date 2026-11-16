export type ContactFieldName = "name" | "phone" | "email" | "message";

export type ContactValues = Record<ContactFieldName, string>;
export type ContactErrors = Partial<Record<ContactFieldName, string>>;
export type ContactTouched = Partial<Record<ContactFieldName, boolean>>;

export type PopupError = {
  field: string;
  message: string;
};

export type SubmissionState = "idle" | "submitting" | "submitted" | "invalid" | "error";

export type ContactLinks = {
  email: string;
  phone: string;
  whatsapp: string;
  linkedin: string;
  github: string;
};

export const fieldLabels: Record<ContactFieldName, string> = {
  name: "Name",
  phone: "Phone Number",
  email: "Email",
  message: "Message",
};

export const initialValues: ContactValues = {
  name: "",
  phone: "+91 ",
  email: "",
  message: "",
};

export function trimValue(value: string) {
  return value.trim();
}

export function validateName(value: string) {
  const trimmed = trimValue(value);

  if (!trimmed) return "Please enter your name.";
  if (trimmed.length < 2) return "Name must be at least 2 characters.";
  if (trimmed.length > 60) return "Name must be 60 characters or fewer.";
  if (!/^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ\s.'-]*$/.test(trimmed)) {
    return "Use letters, spaces, apostrophes, periods, or hyphens only.";
  }

  return "";
}

export function validatePhone(value: string) {
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

export function normalizePhone(value: string) {
  const trimmed = trimValue(value);
  const digits = trimmed.replace(/\D/g, "");

  if (!digits) return "";

  const localDigits = digits.startsWith("91") ? digits.slice(2, 12) : digits.slice(0, 10);
  if (localDigits.length === 10) {
    return `+91 ${localDigits}`;
  }

  return trimmed;
}

export function formatPhoneInput(value: string) {
  const digits = value.replace(/\D/g, "");
  const localDigits = digits.startsWith("91") ? digits.slice(2, 12) : digits.slice(0, 10);

  return localDigits ? `+91 ${localDigits}` : "+91 ";
}

export function validateEmail(value: string) {
  const trimmed = trimValue(value);

  if (!trimmed) return "Please enter your email address.";
  if (trimmed.length > 254) return "Email address is too long.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) {
    return "Enter a valid email address.";
  }

  return "";
}

export function validateMessage(value: string) {
  const trimmed = trimValue(value);

  if (!trimmed) return "Please add a message.";
  if (trimmed.length < 20) return "Message should be at least 20 characters.";
  if (trimmed.length > 1000) return "Message must be 1000 characters or fewer.";

  return "";
}

export function validateValues(values: ContactValues) {
  return {
    name: validateName(values.name),
    phone: validatePhone(values.phone),
    email: validateEmail(values.email),
    message: validateMessage(values.message),
  } satisfies Record<ContactFieldName, string>;
}
