"use client";

import { createPortal } from "react-dom";
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
  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <>
      {isPopupOpen ? (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center bg-slate-900/25 px-4 py-6 backdrop-blur-sm motion-reveal-fade sm:py-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-validation-title"
          aria-describedby="contact-validation-description"
          onClick={onClosePopup}
        >
          <div
            className="w-full max-w-104 max-h-screen overflow-hidden rounded-2xl border border-border-strong bg-surface-strong p-5 shadow-2xl motion-sheet sm:max-h-screen sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p
                  id="contact-validation-title"
                  className="text-lg tracking-tight text-foreground"
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
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-surface-hover"
                aria-label="Close validation popup"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <ul className="mt-4 grid gap-2">
              {popupErrors.map((error) => (
                <li
                  key={error.field}
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {error.field}: {error.message}
                </li>
              ))}
            </ul>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={onClosePopup}
                className="btn btn-primary btn-sm"
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {isSuccessOpen ? (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center bg-slate-900/25 px-4 py-6 backdrop-blur-sm motion-reveal-fade sm:py-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-success-title"
          aria-describedby="contact-success-description"
          onClick={onCloseSuccess}
        >
          <div
            className="w-full max-w-104 max-h-screen overflow-hidden rounded-2xl border border-border-strong bg-surface-strong p-5 shadow-2xl motion-sheet sm:max-h-screen sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p
                  id="contact-success-title"
                  className="text-lg tracking-tight text-foreground"
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
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-surface-hover"
                aria-label="Close success popup"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={onCloseSuccess}
                className="btn btn-primary btn-sm"
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>,
    document.body,
  );
}
