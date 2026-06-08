"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { adminNavItems, adminRoutes } from "@/lib/admin-routes";

type AdminShellProps = {
  children: ReactNode;
  logoutAction: () => Promise<void>;
};

export function AdminShell({ children, logoutAction }: AdminShellProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoginPage = pathname === adminRoutes.login;

  const isActive = (href: string) =>
    href === adminRoutes.site ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  if (isLoginPage) {
    return (
      <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-5rem)] w-full max-w-2xl items-center px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="w-full">{children}</div>
      </div>
    );
  }

  return (
    <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-10 pt-4 sm:px-6 sm:pb-12 sm:pt-6 lg:px-8 lg:pt-8">
      <div className="mb-4 flex items-center justify-between rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 shadow-[0_10px_28px_rgba(36,21,15,0.05)] backdrop-blur-md lg:hidden">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[var(--muted)]">Admin Area</p>
          <h2 className="text-lg font-bold tracking-tight text-[var(--foreground)]">Portfolio CMS</h2>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={adminRoutes.site}
            className="inline-flex items-center justify-center rounded-full border border-[var(--border)] px-3 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            View Site
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-white text-[var(--foreground)] shadow-sm"
            aria-expanded={menuOpen}
            aria-label="Toggle admin navigation"
          >
            <span className="flex flex-col gap-1.5">
              <span className="h-0.5 w-5 rounded-full bg-current" />
              <span className="h-0.5 w-5 rounded-full bg-current" />
              <span className="h-0.5 w-5 rounded-full bg-current" />
            </span>
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[18rem_minmax(0,1fr)]">
        <aside className="sticky top-24 hidden h-[calc(100dvh-8rem)] overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface-strong)] p-4 shadow-[0_12px_32px_rgba(36,21,15,0.05)] backdrop-blur-md lg:flex lg:flex-col">
          <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--accent-soft)] px-4 py-4">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--muted)]">Admin Area</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[var(--foreground)]">Portfolio CMS</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              Manage portfolio content, images, and publishing from one place.
            </p>
          </div>

          <nav className="mt-4 grid gap-2">
            {adminNavItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition-colors ${
                    active
                      ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
                      : "border-[var(--border)] bg-white/40 text-[var(--foreground)] hover:border-[var(--accent)] hover:bg-white hover:text-[var(--accent)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <form action={logoutAction} className="mt-auto pt-4">
            <button
              type="submit"
            className="inline-flex w-full items-center justify-center rounded-full border border-[var(--border)] bg-white/50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            Logout
          </button>
        </form>
        </aside>

        <div className="min-w-0 flex-1">
          {menuOpen ? (
            <div className="mb-4 rounded-[2rem] border border-[var(--border)] bg-white p-4 shadow-[0_16px_40px_rgba(0,0,0,0.08)] lg:hidden">
              <nav className="grid gap-2">
                {adminNavItems.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition-colors ${
                        active
                          ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
                          : "border-[var(--border)] text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <form action={logoutAction} className="mt-4">
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-full border border-[var(--border)] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  Logout
                </button>
              </form>
            </div>
          ) : null}

          {children}
        </div>
      </div>
    </div>
  );
}
