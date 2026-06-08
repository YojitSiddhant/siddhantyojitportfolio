"use client";

import Link from "next/link";
import { adminRoutes } from "@/lib/admin-routes";

type AdminHeaderProps = {
  title: string;
  description: string;
  onMenuToggle: () => void;
  onSidebarToggle: () => void;
  sidebarCollapsed: boolean;
};

export function AdminHeader({ title, description, onMenuToggle, onSidebarToggle, sidebarCollapsed }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[rgba(255,255,255,0.88)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[1680px] flex-col gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
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
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--muted)]">Portfolio CMS</p>
            <div className="mt-0.5 flex items-center gap-3">
              <h1 className="truncate text-lg font-bold tracking-tight text-[var(--foreground)] sm:text-xl">{title}</h1>
              <span className="hidden rounded-full bg-[var(--accent-soft)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--accent)] sm:inline-flex">
                Internal
              </span>
            </div>
            <p className="hidden max-w-2xl text-sm leading-6 text-[var(--muted)] sm:block">{description}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:hidden">
          <Link
            href={adminRoutes.site}
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-full border border-[var(--border)] bg-white px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--foreground)]"
          >
            View Site
          </Link>

          <Link
            href={adminRoutes.settings}
            className="inline-flex rounded-full border border-[var(--border)] bg-white px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--foreground)]"
          >
            Settings
          </Link>

          <button
            type="button"
            onClick={onSidebarToggle}
            className="inline-flex rounded-full border border-[var(--border)] bg-white px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--foreground)]"
          >
            {sidebarCollapsed ? "Expand" : "Collapse"}
          </button>
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <Link
            href={adminRoutes.site}
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-full border border-[var(--border)] bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            View Site
          </Link>

          <Link
            href={adminRoutes.settings}
            className="inline-flex rounded-full border border-[var(--border)] bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            Settings
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
    </header>
  );
}
