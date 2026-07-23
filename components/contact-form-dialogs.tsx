import type { PopupError } from "@/components/contact-form-utils";

type ContactFormDialogsProps = {
  popupErrors: PopupError[];
  isPopupOpen: boolean;
  isSuccessOpen: boolean;
  onClosePopup: () => void;
  onCloseSuccess: () => void;
};

export function ContactFormDialogs({
  popupErrors,
  isPopupOpen,
  isSuccessOpen,
  onClosePopup,
  onCloseSuccess,
}: ContactFormDialogsProps) {
  return (
    <>
      {isPopupOpen ? (
        <div
          className="fixed inset-0 z-120 flex items-center justify-center bg-black/40 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-validation-title"
          aria-describedby="contact-validation-description"
          onClick={onClosePopup}
        >
          <div
            className="w-full max-w-md rounded-3xl border border-border bg-surface-strong p-5 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p
                  id="contact-validation-title"
                  className="text-sm font-black uppercase tracking-wider text-accent"
                >
                  Validation error
                </p>
                <p id="contact-validation-description" className="mt-2 text-sm text-muted">
                  Please fix the following fields before sending the message.
                </p>
              </div>
              <button
                type="button"
                onClick={onClosePopup}
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
                onClick={onClosePopup}
                className="rounded-full bg-accent px-4 py-2 text-sm font-black uppercase tracking-wide text-white transition-colors hover:bg-accent-strong"
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
          onClick={onCloseSuccess}
        >
          <div
            className="w-full max-w-md rounded-3xl border border-border bg-surface-strong p-5 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p
                  id="contact-success-title"
                  className="text-sm font-black uppercase tracking-wider text-accent"
                >
                  Message sent successfully
                </p>
                <p id="contact-success-description" className="mt-2 text-sm text-muted">
                  The form has been reset and is ready for a new message.
                </p>
              </div>
              <button
                type="button"
                onClick={onCloseSuccess}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-accent-soft"
                aria-label="Close success popup"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={onCloseSuccess}
                className="rounded-full bg-accent px-4 py-2 text-sm font-black uppercase tracking-wide text-white transition-colors hover:bg-accent-strong"
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
