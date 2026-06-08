import type { ReactNode } from "react";
export { AdminSubmitButton } from "@/components/admin-submit-button";
export { AdminCard } from "@/components/admin/section-card";
export { AdminSectionCard } from "@/components/admin/section-card";
export { AdminStatCard } from "@/components/admin/stat-card";

type FieldProps = {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  placeholder?: string;
  type?: "text" | "url" | "number" | "password";
  required?: boolean;
};

type TextAreaProps = {
  label: string;
  name: string;
  defaultValue?: string | null;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  hint?: string;
};

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description: string;
  action?: ReactNode;
  previewHref?: string;
  previewLabel?: string;
};

export function AdminPageHeader({
  eyebrow = "Admin CMS",
  title,
  description,
  action,
}: PageHeaderProps) {
  return (
    <section className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface-strong)] p-5 shadow-[0_10px_28px_rgba(36,21,15,0.04)] backdrop-blur-sm sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-3">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--muted)]">{eyebrow}</p>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">{title}</h1>
            <p className="max-w-3xl text-sm leading-7 text-[var(--muted)]">{description}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {action}
        </div>
      </div>
    </section>
  );
}

export function AdminInput({
  label,
  name,
  defaultValue,
  placeholder,
  type = "text",
  required = true,
}: FieldProps) {
  return (
    <label className="block">
      <span className="text-xs font-black uppercase tracking-[0.18em] text-[var(--foreground)]">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)]"
      />
    </label>
  );
}

export function AdminTextArea({
  label,
  name,
  defaultValue,
  placeholder,
  rows = 4,
  required = true,
  hint,
}: TextAreaProps) {
  return (
    <label className="block">
      <span className="text-xs font-black uppercase tracking-[0.18em] text-[var(--foreground)]">{label}</span>
      <textarea
        name={name}
        required={required}
        rows={rows}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)]"
      />
      {hint ? <p className="mt-2 text-xs text-[var(--muted)]">{hint}</p> : null}
    </label>
  );
}

export function AdminFileInput({ label, name, accept = "image/*" }: { label: string; name: string; accept?: string }) {
  return (
    <label className="block">
      <span className="text-xs font-black uppercase tracking-[0.18em] text-[var(--foreground)]">{label}</span>
      <input
        type="file"
        name={name}
        accept={accept}
        className="mt-2 block w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)]"
      />
    </label>
  );
}

export function AdminToggle({
  label,
  name,
  defaultChecked,
}: {
  label: string;
  name: string;
  defaultChecked?: boolean;
  }) {
  return (
    <label className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-white px-4 py-3">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="h-4 w-4 rounded border-black/10" />
      <span className="text-sm font-semibold text-[var(--foreground)]">{label}</span>
    </label>
  );
}
