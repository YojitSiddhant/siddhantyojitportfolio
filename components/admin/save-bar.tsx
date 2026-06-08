"use client";

import { useEffect, useState } from "react";
import { AdminSubmitButton } from "@/components/admin-submit-button";

type AdminSaveBarProps = {
  formId: string;
  label: string;
  pendingLabel?: string;
  helper?: string;
};

export function AdminSaveBar({ formId, label, pendingLabel = "Saving...", helper = "Changes are saved when you submit." }: AdminSaveBarProps) {
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    const form = document.getElementById(formId) as HTMLFormElement | null;
    if (!form) {
      return;
    }

    const markDirty = () => setDirty(true);
    const clearDirty = () => setDirty(false);

    form.addEventListener("input", markDirty);
    form.addEventListener("change", markDirty);
    form.addEventListener("reset", clearDirty);
    form.addEventListener("submit", clearDirty);

    return () => {
      form.removeEventListener("input", markDirty);
      form.removeEventListener("change", markDirty);
      form.removeEventListener("reset", clearDirty);
      form.removeEventListener("submit", clearDirty);
    };
  }, [formId]);

  return (
    <div className="sticky bottom-4 z-20 mt-6 rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 shadow-none backdrop-blur-xl">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div className="space-y-1">
          <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[var(--muted)]">Editing state</p>
          <p className="text-sm font-semibold text-[var(--foreground)]">{dirty ? "Unsaved changes" : "No unsaved changes"}</p>
          <p className="text-xs leading-5 text-[var(--muted)]">{helper}</p>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`inline-flex items-center rounded-full px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] ${
              dirty ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-[var(--muted)]"
            }`}
          >
            {dirty ? "Unsaved" : "Saved"}
          </span>
          <AdminSubmitButton label={label} pendingLabel={pendingLabel} />
        </div>
      </div>
    </div>
  );
}
