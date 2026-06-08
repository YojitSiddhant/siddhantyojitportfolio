import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/app/admin/login/login-form";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { adminRoutes } from "@/lib/admin-routes";

export const metadata: Metadata = {
  title: "Admin Login | Siddhant Yojit",
  description: "Admin login for the portfolio CMS.",
};

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) {
    redirect(adminRoutes.dashboard);
  }

  return (
    <main className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.04),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(36,21,15,0.03),_transparent_28%),radial-gradient(circle_at_bottom,_rgba(255,255,255,0.7),_transparent_36%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[18rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.86)_0%,rgba(255,255,255,0.64)_70%,rgba(255,255,255,0.18)_100%)]" />

      <section className="relative z-10 mx-auto flex min-h-[calc(100dvh-5rem)] w-full max-w-3xl items-center px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="w-full space-y-6">
          <div className="space-y-3 border-b border-[var(--border)] pb-5">
            <p className="text-[10px] font-black uppercase tracking-[0.32em] text-[var(--muted)]">Admin Access</p>
            <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl">Portfolio CMS</h1>
            <p className="max-w-xl text-base leading-7 text-[var(--muted)]">
              Sign in to update the site content, manage portfolio sections, and publish changes without touching code.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface-strong)] p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Focus</p>
              <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">Clean updates</p>
            </div>
            <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface-strong)] p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Style</p>
              <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">Matches the public site</p>
            </div>
            <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface-strong)] p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Space</p>
              <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">Nothing feels cramped</p>
            </div>
          </div>

          <AdminLoginForm />
        </div>
      </section>
    </main>
  );
}
