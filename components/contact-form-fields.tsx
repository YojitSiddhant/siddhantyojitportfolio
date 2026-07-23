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
    placeholder: "you@example.com",
    required: true,
    autoComplete: "email",
    inputMode: "email",
    minLength: 5,
    maxLength: 254,
    pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$",
  },
];

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
    <div className="px-1 py-2 motion-reveal" style={{ animationDelay: "80ms" }}>
      <div className="border-b border-border pb-4">
        <p className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-foreground">
          <FormIcon className="h-4 w-4 text-accent" />
          Send a message
        </p>
      </div>

      <form onSubmit={onSubmit} noValidate className="mt-4 grid gap-3">
        {contactFields.map((field) => {
          const fieldError = errors[field.name];
          const isInvalid = Boolean(fieldError && touched[field.name]);

          return (
            <label key={field.name} className="grid gap-1.5">
              <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-foreground">
                <field.icon className="h-4 w-4 text-accent" />
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
                className={`w-full rounded-2xl border bg-surface-strong px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent ${
                  isInvalid ? "border-accent focus:border-accent-strong" : "border-border"
                }`}
              />
            </label>
          );
        })}

        <label className="grid gap-1.5">
          <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-foreground">
            <ReactAtomIcon className="h-4 w-4 text-accent" />
            Message
          </span>
          <textarea
            name="message"
            placeholder="Tell me what you need help with..."
            value={values.message}
            onChange={onChange}
            onBlur={onBlur}
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
  );
}
