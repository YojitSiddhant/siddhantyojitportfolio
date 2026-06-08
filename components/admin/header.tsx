"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNavItems, adminRoutes } from "@/lib/admin-routes";

type AdminHeaderProps = {
  title: string;
  description: string;
  onMenuToggle: () => void;
  onSidebarToggle: () => void;
  sidebarCollapsed: boolean;
};

export function AdminHeader({ title, description, onMenuToggle, onSidebarToggle, sidebarCollapsed }: AdminHeaderProps) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === adminRoutes.site ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[rgba(255,255,255,0.9)] backdrop-blur-xl">
      <div className="mx-auto w-full max-w-6xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-3 rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 shadow-[0_10px_28px_rgba(36,21,15,0.04)] backdrop-blur-sm">
          <button
            type="button"
            onClick={onMenuToggle}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-white text-[var(--foreground)] shadow-sm transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] lg:hidden"
            aria-label="Open admin menu"
          >
            <span className="flex flex-col gap-1.5">
              <span className="h-0.5 w-5 rounded-full bg-current" />
              <span className="h-0.5 w-5 rounded-full bg-current" />
              <span className="h-0.5 w-5 rounded-full bg-current" />
            </span>
          </button>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3">
              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--muted)]">Portfolio CMS</p>
                <div className="mt-0.5 flex items-center gap-3">
                  <h1 className="truncate text-lg font-bold tracking-tight text-[var(--foreground)] sm:text-xl">{title}</h1>
                  <span className="hidden rounded-full bg-[var(--accent-soft)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--accent)] sm:inline-flex">
                    Internal
                  </span>
                </div>
              </div>
              <div className="ml-auto hidden items-center gap-2 lg:flex">
                <Link
                  href={adminRoutes.site}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-full border border-[var(--border)] bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  View Site
                </Link>

                <button
                  type="button"
                  onClick={onSidebarToggle}
                  className="inline-flex rounded-full border border-[var(--border)] bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  {sidebarCollapsed ? "Expand" : "Collapse"}
                </button>
              </div>
            </div>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--muted)]">{description}</p>
          </div>

          <div className="ml-auto flex items-center gap-2 lg:hidden">
            <Link
              href={adminRoutes.site}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-full border border-[var(--border)] bg-white px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--foreground)]"
            >
              Site
            </Link>

            <button
              type="button"
              onClick={onSidebarToggle}
              className="inline-flex rounded-full border border-[var(--border)] bg-white px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--foreground)]"
            >
              {sidebarCollapsed ? "Expand" : "Collapse"}
            </button>
          </div>

          <nav className="flex w-full gap-2 overflow-x-auto pb-0.5 lg:hidden">
            {adminNavItems.slice(0, 5).map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`whitespace-nowrap rounded-full border px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] transition-colors ${
                    active
                      ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
                      : "border-[var(--border)] bg-white text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <nav className="hidden flex-1 items-center justify-center gap-2 overflow-x-auto lg:flex">
            {adminNavItems.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`whitespace-nowrap rounded-full border px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] transition-colors ${
                    active
                      ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
                      : "border-[var(--border)] bg-white text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

        </div>
      </div>
    </header>
  );
}
