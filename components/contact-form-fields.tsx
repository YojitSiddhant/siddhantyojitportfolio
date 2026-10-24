import type { ChangeEvent, FocusEvent, FormEvent } from "react";
import {
  FormIcon,
  ReactAtomIcon,
  SendIcon,
  UserIcon,
  PhoneIcon,
  MailIcon,
} from "@/components/contact-form-icons";
import type {
  ContactErrors,
  ContactTouched,
  ContactValues,
  SubmissionState,
} from "@/components/contact-form-utils";

type ContactField = {
  label: string;
  name: "name" | "phone" | "email";
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
    placeholder: "Enter your email address",
    required: true,
    autoComplete: "email",
    inputMode: "email",
    minLength: 5,
    maxLength: 254,
    pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$",
  },
];

const inputClassName =
  "w-full rounded-xl border bg-background/60 px-4 py-3 text-[0.95rem] text-foreground outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-subtle focus:border-accent focus:shadow-[0_0_0_3px_var(--accent-soft)]";
const invalidClassName = "border-red-400/60";

type ContactFormFieldsProps = {
  values: ContactValues;
  errors: ContactErrors;
  touched: ContactTouched;
  status: SubmissionState;
  submissionError: string;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function ContactFormFields({
  values,
  errors,
  touched,
  status,
  submissionError,
  onChange,
  onBlur,
  onSubmit,
}: ContactFormFieldsProps) {
  return (
    <div className="card flex flex-col p-5 sm:p-8 lg:col-span-7">
      <div className="flex items-center justify-between gap-4 border-b border-border pb-5">
        <h2 className="text-2xl tracking-tight text-foreground">Send a message</h2>
        <FormIcon className="h-5 w-5 text-subtle" />
      </div>

      <form onSubmit={onSubmit} noValidate className="mt-6 flex flex-1 flex-col gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
        {contactFields.map((field) => {
          const fieldError = errors[field.name];
          const isInvalid = Boolean(fieldError && touched[field.name]);
          const errorId = `contact-${field.name}-error`;

          return (
            <label key={field.name} className={`grid gap-2 ${field.name === "email" ? "sm:col-span-2" : ""}`}>
              <span className="inline-flex items-center gap-2 text-sm text-muted">
                <field.icon className="h-4 w-4 text-subtle" />
                {field.label}
              </span>
              <input
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                value={values[field.name]}
                onChange={onChange}
                onBlur={onBlur}
                required={field.required}
                autoComplete={field.autoComplete}
                inputMode={field.inputMode}
                minLength={field.minLength}
                maxLength={field.maxLength}
                pattern={field.pattern}
                aria-invalid={isInvalid}
                aria-describedby={isInvalid ? errorId : undefined}
                className={`${inputClassName} ${isInvalid ? invalidClassName : "border-border"}`}
              />
              {isInvalid ? (
                <span id={errorId} className="text-xs text-red-300">
                  {fieldError}
                </span>
              ) : null}
            </label>
          );
        })}
        </div>

        <label className="flex flex-1 flex-col gap-2">
          <span className="inline-flex items-center gap-2 text-sm text-muted">
            <ReactAtomIcon className="h-4 w-4 text-subtle" />
            Message
          </span>
          <textarea
            name="message"
            placeholder="Tell me about the opportunity, project, or how I can help."
            value={values.message}
            onChange={onChange}
            onBlur={onBlur}
            required
            minLength={20}
            maxLength={1000}
            rows={5}
            aria-invalid={Boolean(errors.message && touched.message)}
            aria-describedby={errors.message && touched.message ? "contact-message-error" : undefined}
            className={`min-h-40 flex-1 resize-y ${inputClassName} ${
              errors.message && touched.message ? invalidClassName : "border-border"
            }`}
          />
          {errors.message && touched.message ? (
            <span id="contact-message-error" className="text-xs text-red-300">
              {errors.message}
            </span>
          ) : null}
        </label>

        <input
          type="checkbox"
          name="botcheck"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="sr-only"
        />

        <div className="grid gap-3 border-t border-border pt-5">
          <button
            type="submit"
            className={`send-button w-full sm:w-fit ${
              status === "submitting" ? "send-button--sending" : ""
            }`}
            aria-busy={status === "submitting"}
            disabled={status === "submitting"}
          >
            <span className="send-button__svg-wrapper-1" aria-hidden="true">
              <span className="send-button__svg-wrapper">
                <SendIcon className="send-button__icon" />
              </span>
            </span>
            <span className="send-button__text">
              {status === "submitting" ? "Sending" : status === "submitted" ? "Sent" : "Send"}
            </span>
          </button>

          {submissionError ? (
            <p className="text-sm text-red-300" role="alert">
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
  );
}
