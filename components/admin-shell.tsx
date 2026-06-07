"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type AdminShellProps = {
  children: ReactNode;
  logoutAction: () => Promise<void>;
};

const contentSections = [
  { label: "Home", href: "/admin/dashboard#home" },
  { label: "Education", href: "/admin/dashboard#education" },
  { label: "Skills", href: "/admin/dashboard#skills" },
  { label: "Projects", href: "/admin/dashboard#projects" },
  { label: "My Work", href: "/admin/dashboard#my-work" },
  { label: "Certificate", href: "/admin/dashboard#certificate" },
  { label: "Experience", href: "/admin/dashboard#experience" },
] as const;

export function AdminShell({ children, logoutAction }: AdminShellProps) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return (
      <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-5rem)] w-full max-w-2xl items-center px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="w-full">{children}</div>
      </div>
    );
  }

  return (
    <div className="relative z-10 mx-auto flex w-full max-w-7xl gap-6 px-4 pb-10 pt-5 sm:px-6 sm:pb-12 sm:pt-6 lg:px-8 lg:pt-8">
      <aside className="sticky top-24 hidden h-[calc(100dvh-8rem)] w-72 shrink-0 overflow-hidden rounded-[2rem] border border-[var(--border)] bg-white/95 p-4 shadow-[0_16px_40px_rgba(0,0,0,0.08)] backdrop-blur-md lg:flex lg:flex-col">
        <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--accent-soft)] px-4 py-4">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--muted)]">Admin Area</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-[var(--foreground)]">Portfolio CMS</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
            Manage portfolio content, images, and publishing from one place.
          </p>
        </div>

        <nav className="mt-4 flex flex-col gap-2">
          <Link
            href="/admin/dashboard"
            className="rounded-2xl border border-[var(--border)] px-4 py-3 text-sm font-semibold text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            Dashboard
          </Link>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3">
            <p className="px-1 pb-2 text-xs font-black uppercase tracking-[0.22em] text-[var(--muted)]">Content</p>
            <div className="grid gap-1">
              {contentSections.map((section) => (
                <Link
                  key={section.label}
                  href={section.href}
                  className="rounded-xl px-3 py-2 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-white hover:text-[var(--accent)]"
                >
                  {section.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <form action={logoutAction} className="mt-auto pt-4">
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-full border border-[var(--border)] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            Logout
          </button>
        </form>
      </aside>

      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
