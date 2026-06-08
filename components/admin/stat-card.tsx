import type { ReactNode } from "react";

type AdminStatCardProps = {
  label: string;
  value: string;
  description?: string;
  tone?: "default" | "accent";
  icon?: ReactNode;
};

export function AdminStatCard({ label, value, description, tone = "default", icon }: AdminStatCardProps) {
  return (
    <div
      className={`rounded-[1.75rem] border border-[var(--border)] p-5 shadow-[0_10px_28px_rgba(36,21,15,0.04)] ${
        tone === "accent" ? "bg-[var(--accent-soft)]" : "bg-[var(--surface-strong)]"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-[0.26em] text-[var(--muted)]">{label}</p>
          <p className="text-[2rem] font-bold tracking-tight text-[var(--foreground)]">{value}</p>
        </div>
        {icon ? <div className="rounded-2xl bg-white/80 p-3 text-[var(--accent)] shadow-sm">{icon}</div> : null}
      </div>
      {description ? <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{description}</p> : null}
    </div>
  );
}
