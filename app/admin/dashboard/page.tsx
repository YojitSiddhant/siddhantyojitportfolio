import type { Metadata } from "next";
import Link from "next/link";
import { AdminToast } from "@/components/admin-toast";
import { AdminCard, AdminPageHeader, AdminStatCard } from "@/components/admin-ui";
import { getAdminSnapshot, type AdminSnapshot } from "@/lib/cms";
import { requireAdminSession } from "@/lib/admin-auth";
import { adminRoutes } from "@/lib/admin-routes";

export const metadata: Metadata = {
  title: "Admin Dashboard | Siddhant Yojit",
  description: "Portfolio CMS dashboard overview.",
};

type RecentItem = {
  label: string;
  href: string;
  updatedAt: string;
  description: string;
};

const quickActions = [
  { label: "Edit Home", href: adminRoutes.home, description: "Update the hero, notes, and snapshot content." },
  { label: "Open Projects", href: adminRoutes.projects, description: "Refine featured projects and showcase details." },
  { label: "Check Settings", href: adminRoutes.settings, description: "Review the admin workspace shortcuts." },
] as const;

function formatRelativeTime(value: string) {
  const deltaMs = Date.now() - new Date(value).getTime();
  const deltaHours = Math.max(1, Math.round(deltaMs / (1000 * 60 * 60)));

  if (deltaHours < 24) {
    return `${deltaHours}h ago`;
  }

  const deltaDays = Math.round(deltaHours / 24);
  if (deltaDays < 7) {
    return `${deltaDays}d ago`;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function toIsoString(value: Date | string) {
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString();
}

function buildRecentUpdates(snapshot: AdminSnapshot) {
  const items: RecentItem[] = [
    {
      label: "Home profile",
      href: adminRoutes.home,
      updatedAt: toIsoString(snapshot.profile.updatedAt),
      description: snapshot.profile.heroTitle,
    },
    ...snapshot.education.map((item) => ({
      label: item.institute,
      href: adminRoutes.education,
      updatedAt: toIsoString(item.updatedAt),
      description: item.degree,
    })),
    ...snapshot.skills.map((item) => ({
      label: item.name,
      href: adminRoutes.skills,
      updatedAt: toIsoString(item.updatedAt),
      description: item.category,
    })),
    ...snapshot.projects.map((item) => ({
      label: item.title,
      href: adminRoutes.projects,
      updatedAt: toIsoString(item.updatedAt),
      description: item.featured ? "Featured project" : item.description,
    })),
    ...snapshot.work.map((item) => ({
      label: item.title,
      href: adminRoutes.myWork,
      updatedAt: toIsoString(item.updatedAt),
      description: item.summary,
    })),
    ...snapshot.certificates.map((item) => ({
      label: item.title,
      href: adminRoutes.certificates,
      updatedAt: toIsoString(item.updatedAt),
      description: item.issuer,
    })),
    ...snapshot.experience.map((item) => ({
      label: item.role,
      href: adminRoutes.experience,
      updatedAt: toIsoString(item.updatedAt),
      description: item.company,
    })),
  ];

  return items.sort((left, right) => new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime()).slice(0, 8);
}

function buildTimeline(snapshot: AdminSnapshot) {
  return [
    { label: "Home snapshot", detail: snapshot.profile.heroTitle, updatedAt: toIsoString(snapshot.profile.updatedAt) },
    ...snapshot.projects.slice(0, 2).map((item) => ({
      label: item.featured ? "Featured project" : "Project update",
      detail: item.title,
      updatedAt: toIsoString(item.updatedAt),
    })),
    ...snapshot.experience.slice(0, 2).map((item) => ({
      label: "Experience",
      detail: `${item.role} at ${item.company}`,
      updatedAt: toIsoString(item.updatedAt),
    })),
  ].sort((left, right) => new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime());
}

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireAdminSession();

  const params = await searchParams;
  const toast = typeof params?.toast === "string" ? params.toast : null;
  const data = await getAdminSnapshot();
  const recentUpdates = buildRecentUpdates(data);
  const timeline = buildTimeline(data);
  const totalItems = data.education.length + data.skills.length + data.projects.length + data.work.length + data.certificates.length + data.experience.length;
  const latestUpdate = recentUpdates[0];
  const lastPublished = latestUpdate ? formatRelativeTime(latestUpdate.updatedAt) : "No updates yet";

  return (
    <main className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.08),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(15,23,42,0.04),_transparent_28%),radial-gradient(circle_at_bottom,_rgba(255,255,255,0.72),_transparent_42%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[18rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.82)_0%,rgba(255,255,255,0.64)_70%,rgba(255,255,255,0.2)_100%)]" />

      <AdminToast key={toast ?? "idle"} message={toast} />

      <section className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-6">
        <AdminPageHeader
          title="Dashboard"
          description="A focused overview of the CMS, recent changes, and fast paths into each section."
          previewHref={adminRoutes.site}
        />

        <AdminCard className="overflow-hidden">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)]">
            <div className="rounded-[1.75rem] bg-[linear-gradient(180deg,rgba(239,246,255,0.95)_0%,rgba(255,255,255,0.9)_100%)] p-5 sm:p-6">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--muted)]">Welcome back</p>
              <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-3">
                  <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">Portfolio CMS dashboard</h2>
                  <p className="max-w-3xl text-sm leading-7 text-[var(--muted)]">
                    The admin shell stays compact and calm, while the editing flow lives on the dedicated section pages.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Link
                    href={adminRoutes.home}
                    className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white transition-colors hover:bg-[var(--accent-strong)]"
                  >
                    Edit Home
                  </Link>
                  <Link
                    href={adminRoutes.projects}
                    className="inline-flex items-center justify-center rounded-full border border-black/5 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    Open Projects
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid gap-4 rounded-[1.75rem] bg-white/80 p-5 sm:p-6">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--muted)]">Last published</p>
              <p className="text-3xl font-bold tracking-tight text-[var(--foreground)]">{lastPublished}</p>
              <p className="text-sm leading-6 text-[var(--muted)]">
                {latestUpdate ? latestUpdate.label : "No recent activity has been recorded yet."}
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--accent)]">
                  Dynamic admin
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--muted)]">
                  Cookie auth
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--muted)]">
                  Cache invalidation
                </span>
              </div>
            </div>
          </div>
        </AdminCard>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <AdminStatCard
            label="Content records"
            value={String(totalItems)}
            description="Education, skills, projects, work, certificates, and experience."
          />
          <AdminStatCard
            label="Freshest update"
            value={latestUpdate ? formatRelativeTime(latestUpdate.updatedAt) : "No updates"}
            description={latestUpdate ? latestUpdate.label : "Nothing has been edited yet."}
            tone="accent"
          />
          <AdminStatCard label="Public sections" value="7" description="Each section is isolated on its own page." />
          <AdminStatCard label="Dashboard state" value="Overview" description="No big form here, only shortcuts and activity." />
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
          <AdminCard>
            <div className="mb-5 flex items-center justify-between gap-4 border-b border-black/5 pb-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--muted)]">Quick actions</p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-[var(--foreground)]">Jump into editing</h2>
              </div>
              <Link
                href={adminRoutes.settings}
                className="rounded-full border border-black/5 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                Settings
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {quickActions.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="group rounded-[1.5rem] border border-black/5 bg-white px-4 py-4 transition-all hover:-translate-y-0.5 hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]"
                >
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--muted)]">Open</p>
                  <h3 className="mt-2 text-lg font-bold tracking-tight text-[var(--foreground)]">{action.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{action.description}</p>
                </Link>
              ))}
            </div>
          </AdminCard>

          <AdminCard>
            <div className="mb-5 border-b border-black/5 pb-4">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--muted)]">Activity timeline</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-[var(--foreground)]">Recent updates</h2>
            </div>

            <div className="space-y-3">
              {recentUpdates.length ? (
                recentUpdates.map((item) => (
                  <Link
                    key={`${item.label}-${item.updatedAt}`}
                    href={item.href}
                    className="block rounded-[1.25rem] border border-black/5 bg-white px-4 py-4 transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <h3 className="font-bold text-[var(--foreground)]">{item.label}</h3>
                        <p className="text-sm leading-6 text-[var(--muted)]">{item.description}</p>
                      </div>
                      <span className="shrink-0 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--muted)]">
                        {formatRelativeTime(item.updatedAt)}
                      </span>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="rounded-[1.5rem] border border-dashed border-black/10 bg-slate-50 p-5 text-sm leading-6 text-[var(--muted)]">
                  No activity yet. Start with Home or any section page to see edits appear here.
                </div>
              )}
            </div>
          </AdminCard>
        </div>

        <AdminCard>
          <div className="mb-5 flex items-center justify-between gap-4 border-b border-black/5 pb-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--muted)]">Last published</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-[var(--foreground)]">Latest story</h2>
            </div>
            <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--accent)]">
              {latestUpdate ? latestUpdate.href : "No content"}
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <div className="rounded-[1.5rem] bg-[var(--surface)] p-4">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--muted)]">Latest item</p>
              <p className="mt-2 text-lg font-bold text-[var(--foreground)]">{latestUpdate ? latestUpdate.label : "Nothing yet"}</p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{latestUpdate ? latestUpdate.description : "Edit any section to generate a new update."}</p>
            </div>
            <div className="rounded-[1.5rem] bg-[var(--surface)] p-4">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--muted)]">Published</p>
              <p className="mt-2 text-lg font-bold text-[var(--foreground)]">{lastPublished}</p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Snapshot timing is derived from the latest content update.</p>
            </div>
            <div className="rounded-[1.5rem] bg-[var(--surface)] p-4">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--muted)]">Workspace</p>
              <p className="mt-2 text-lg font-bold text-[var(--foreground)]">Admin only</p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">No public navbar, no extra noise, and no schema changes.</p>
            </div>
          </div>
        </AdminCard>

        <AdminCard>
          <div className="mb-5 border-b border-black/5 pb-4">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--muted)]">Activity timeline</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[var(--foreground)]">Recent CMS events</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {timeline.map((item) => (
              <div key={`${item.label}-${item.updatedAt}`} className="rounded-[1.35rem] border border-black/5 bg-[var(--surface)] p-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--muted)]">{item.label}</p>
                <p className="mt-2 text-base font-bold text-[var(--foreground)]">{item.detail}</p>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{formatRelativeTime(item.updatedAt)}</p>
              </div>
            ))}
          </div>
        </AdminCard>
      </section>
    </main>
  );
}
