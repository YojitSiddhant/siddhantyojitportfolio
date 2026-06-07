"use client";

import type { ReactNode } from "react";
import Link from "next/link";
export { AdminSubmitButton } from "@/components/admin-submit-button";

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

export function AdminCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <section className={`rounded-[2rem] border border-[var(--border)] bg-white p-5 shadow-[0_16px_40px_rgba(0,0,0,0.06)] sm:p-6 ${className}`}>{children}</section>;
}

export function AdminPageHeader({
  eyebrow = "Admin CMS",
  title,
  description,
  action,
  previewHref,
  previewLabel = "Preview site",
}: PageHeaderProps) {
  return (
    <AdminCard>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-3">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--muted)]">{eyebrow}</p>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">{title}</h1>
            <p className="max-w-3xl text-sm leading-7 text-[var(--muted)]">{description}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {action}
          {previewHref ? (
            <Link
              href={previewHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-[var(--border)] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {previewLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </AdminCard>
  );
}

export function AdminStatCard({
  label,
  value,
  description,
}: {
  label: string;
  value: string;
  description?: string;
}) {
  return (
    <div className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--accent-soft)] p-5">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--muted)]">{label}</p>
      <p className="mt-2 text-3xl font-bold tracking-tight text-[var(--foreground)]">{value}</p>
      {description ? <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{description}</p> : null}
    </div>
  );
}

export function AdminSectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <AdminCard className="p-5 sm:p-6">
      <div className="mb-5 space-y-1 border-b border-[var(--border)] pb-4">
        <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">{title}</h2>
        <p className="max-w-2xl text-sm leading-6 text-[var(--muted)]">{description}</p>
      </div>
      {children}
    </AdminCard>
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
        className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
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
        className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
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
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="h-4 w-4 rounded border-[var(--border)]" />
      <span className="text-sm font-semibold text-[var(--foreground)]">{label}</span>
    </label>
  );
}
