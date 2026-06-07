"use client";

import { useFormStatus } from "react-dom";

type AdminSubmitButtonProps = {
  label: string;
  pendingLabel?: string;
  className?: string;
};

export function AdminSubmitButton({ label, pendingLabel = "Saving...", className }: AdminSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={
        className ??
        "inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-white transition-colors hover:bg-[var(--accent-strong)] disabled:cursor-not-allowed disabled:opacity-60"
      }
    >
      {pending ? pendingLabel : label}
    </button>
  );
}
