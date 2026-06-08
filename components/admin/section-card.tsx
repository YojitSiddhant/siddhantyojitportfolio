import type { ReactNode } from "react";

export function AdminCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface-strong)] p-5 shadow-[0_10px_28px_rgba(36,21,15,0.04)] backdrop-blur-sm sm:p-6 ${className}`}
    >
      {children}
    </section>
  );
}

type AdminSectionCardProps = {
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
};

export function AdminSectionCard({ title, description, children, className = "" }: AdminSectionCardProps) {
  return (
    <AdminCard className={className}>
      <div className="mb-5 space-y-2 border-b border-[var(--border)] pb-4">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--muted)]">Section</p>
        <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">{title}</h2>
        <p className="max-w-2xl text-sm leading-7 text-[var(--muted)]">{description}</p>
      </div>
      {children}
    </AdminCard>
  );
}
