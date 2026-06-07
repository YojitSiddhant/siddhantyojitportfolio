import type { ReactNode } from "react";

export function AdminCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <section className={`rounded-[2rem] border border-black/5 bg-white/90 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.05)] sm:p-6 ${className}`}>{children}</section>;
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
      <div className="mb-5 space-y-1 border-b border-black/5 pb-4">
        <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">{title}</h2>
        <p className="max-w-2xl text-sm leading-6 text-[var(--muted)]">{description}</p>
      </div>
      {children}
    </AdminCard>
  );
}
