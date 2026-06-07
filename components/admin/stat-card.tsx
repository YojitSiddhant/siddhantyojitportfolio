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
      className={`rounded-[1.75rem] border border-black/5 p-5 shadow-[0_14px_36px_rgba(15,23,42,0.05)] ${
        tone === "accent" ? "bg-[var(--accent-soft)]" : "bg-white/90"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-[0.26em] text-[var(--muted)]">{label}</p>
          <p className="text-3xl font-bold tracking-tight text-[var(--foreground)]">{value}</p>
        </div>
        {icon ? <div className="rounded-2xl bg-white/80 p-3 text-[var(--accent)] shadow-sm">{icon}</div> : null}
      </div>
      {description ? <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{description}</p> : null}
    </div>
  );
}
