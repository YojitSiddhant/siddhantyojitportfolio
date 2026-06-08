import type { Metadata } from "next";
import Link from "next/link";
import { AdminCard, AdminPageHeader, AdminSectionCard } from "@/components/admin-ui";
import { adminRoutes } from "@/lib/admin-routes";
import { requireAdminSession } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "Settings | Siddhant Yojit",
  description: "Admin workspace settings and session controls.",
};

export default async function AdminSettingsPage() {
  await requireAdminSession();

  return (
    <main className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(0,0,0,0.01),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(0,0,0,0.008),_transparent_28%),radial-gradient(circle_at_bottom,_rgba(0,0,0,0.004),_transparent_36%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[18rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.78)_0%,rgba(255,255,255,0.56)_70%,rgba(255,255,255,0.18)_100%)]" />

      <section className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-6">
        <AdminPageHeader
          title="Settings"
          description="Workspace information, quick references, and a clean home for admin-level controls."
        />

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(22rem,0.8fr)]">
          <AdminSectionCard
            title="Workspace"
            description="The admin area stays separate from the public portfolio and keeps the CMS flow focused."
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.5rem] bg-[var(--surface)] p-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--muted)]">Shell</p>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground)]">Collapsible sidebar, sticky header, and mobile drawer.</p>
              </div>
              <div className="rounded-[1.5rem] bg-[var(--surface)] p-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--muted)]">Auth</p>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground)]">Cookie-based admin session with request-time protection.</p>
              </div>
              <div className="rounded-[1.5rem] bg-[var(--surface)] p-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--muted)]">Cache</p>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground)]">CMS updates revalidate the public pages and admin views.</p>
              </div>
              <div className="rounded-[1.5rem] bg-[var(--surface)] p-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--muted)]">Navigation</p>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground)]">Home, Education, Skills, Projects, My Work, Certificates, and Experience.</p>
              </div>
            </div>
          </AdminSectionCard>

          <AdminCard>
            <div className="mb-5 border-b border-black/5 pb-4">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--muted)]">Shortcuts</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-[var(--foreground)]">Fast access</h2>
            </div>

            <div className="space-y-3">
              <Link
                href={adminRoutes.dashboard}
                className="block rounded-[1.5rem] border border-black/5 bg-white px-4 py-3 text-sm font-semibold text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                Open dashboard
              </Link>
              <Link
                href={adminRoutes.home}
                className="block rounded-[1.5rem] border border-black/5 bg-white px-4 py-3 text-sm font-semibold text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                Edit home content
              </Link>
              <Link
                href={adminRoutes.projects}
                className="block rounded-[1.5rem] border border-black/5 bg-white px-4 py-3 text-sm font-semibold text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                Review projects
              </Link>
            </div>
          </AdminCard>
        </div>
      </section>
    </main>
  );
}
