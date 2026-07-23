"use client";

import { useState, type ChangeEvent, type FocusEvent, type FormEvent } from "react";
import { ContactFormDialogs } from "@/components/contact-form-dialogs";
import { ContactFormFields } from "@/components/contact-form-fields";
import { ContactFormSidebar } from "@/components/contact-form-sidebar";
import {
  fieldLabels,
  formatPhoneInput,
  initialValues,
  normalizePhone,
  trimValue,
  validateValues,
  type ContactErrors,
  type ContactLinks,
  type ContactTouched,
  type ContactValues,
  type PopupError,
  type SubmissionState,
} from "@/components/contact-form-utils";

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

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const field = name as keyof ContactValues;
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
    const field = name as keyof ContactValues;
    const nextTouched = { ...touched, [field]: true };
    setTouched(nextTouched);

    const nextValues = field === "phone" ? { ...values, phone: formatPhoneInput(values.phone) } : values;
    if (field === "phone") {
      setValues(nextValues);
    }

    const nextErrors = validateValues(nextValues);
    setErrors((current) => ({ ...current, [field]: nextErrors[field] }));
  };

  const closePopup = () => setIsPopupOpen(false);
  const closeSuccess = () => {
    setIsSuccessOpen(false);
    setStatus("idle");
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
        (Object.keys(nextErrors) as Array<keyof ContactValues>)
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
    <section className="grid gap-5 lg:grid-cols-2 motion-reveal">
      <ContactFormFields
        values={values}
        errors={errors}
        touched={touched}
        status={status}
        submissionError={submissionError}
        onChange={handleChange}
        onBlur={handleBlur}
        onSubmit={handleSubmit}
      />
      <ContactFormSidebar links={links} />

      <ContactFormDialogs
        popupErrors={popupErrors}
        isPopupOpen={isPopupOpen}
        isSuccessOpen={isSuccessOpen}
        onClosePopup={closePopup}
        onCloseSuccess={closeSuccess}
      />
    </section>
  );
}
