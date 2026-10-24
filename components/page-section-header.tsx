import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

type PageSectionHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  aside?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function PageSectionHeader({ eyebrow, title, description, aside, className = "", style }: PageSectionHeaderProps) {
  return (
    <header className={["grid gap-8 lg:grid-cols-12 lg:items-end", className].filter(Boolean).join(" ")} style={style}>
      <div className="lg:col-span-8">
        <nav aria-label="Breadcrumb" className="eyebrow">
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-accent">{eyebrow}</span>
        </nav>
        <h1 className="mt-6 text-[2.6rem] text-foreground sm:text-6xl lg:text-7xl">{title}</h1>
        {description ? <p className="mt-6 max-w-2xl text-base text-muted sm:text-lg">{description}</p> : null}
      </div>
      {aside ? <div className="lg:col-span-4 lg:justify-self-end">{aside}</div> : null}
    </header>
  );
}

export function HeaderStat({ value, label }: { value: ReactNode; label: string }) {
  return (
    <div className="flex items-baseline gap-3 border-t border-border pt-4 lg:min-w-56">
      <span className="text-4xl tracking-tight text-foreground">{value}</span>
      <span className="text-sm text-muted">{label}</span>
    </div>
  );
}
