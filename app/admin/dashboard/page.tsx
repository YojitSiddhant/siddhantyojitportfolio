import type { Metadata } from "next";
import Link from "next/link";
import { AdminToast } from "@/components/admin-toast";
import { AdminCard, AdminPageHeader, AdminStatCard } from "@/components/admin-ui";
import { getAdminSnapshot, getEmptyAdminSnapshot, type AdminSnapshot } from "@/lib/cms";
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

const sectionCards = [
  {
    title: "Home",
    href: adminRoutes.home,
    previewHref: adminRoutes.site,
    description: "Update the hero copy, intro text, value cards, and top-level profile content.",
  },
  {
    title: "Education",
    href: adminRoutes.education,
    previewHref: "/education",
    description: "Manage education rows, logos, and descriptive copy.",
  },
  {
    title: "Skills",
    href: adminRoutes.skills,
    previewHref: "/skills",
    description: "Edit skill badges, categories, URLs, and ordering.",
  },
  {
    title: "Projects",
    href: adminRoutes.projects,
    previewHref: "/projects",
    description: "Update project cards, featured status, tech stacks, and screenshots.",
  },
  {
    title: "My Work",
    href: adminRoutes.myWork,
    previewHref: "/my-work",
    description: "Manage the work showcase, screenshots, and outbound links.",
  },
  {
    title: "Certificates",
    href: adminRoutes.certificates,
    previewHref: "/certificate",
    description: "Edit certificate imagery, issuer details, dates, and verification links.",
  },
  {
    title: "Experience",
    href: adminRoutes.experience,
    previewHref: "/experience",
    description: "Update work history, descriptions, technologies, and logos.",
  },
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

function buildRecentUpdates(snapshot: AdminSnapshot) {
  const items: RecentItem[] = [
    {
      label: "Home profile",
      href: adminRoutes.home,
      updatedAt: snapshot.profile.updatedAt.toISOString(),
      description: snapshot.profile.heroTitle,
    },
    ...snapshot.education.map((item) => ({
      label: item.institute,
      href: adminRoutes.education,
      updatedAt: item.updatedAt.toISOString(),
      description: item.degree,
    })),
    ...snapshot.skills.map((item) => ({
      label: item.name,
      href: adminRoutes.skills,
      updatedAt: item.updatedAt.toISOString(),
      description: item.category,
    })),
    ...snapshot.projects.map((item) => ({
      label: item.title,
      href: adminRoutes.projects,
      updatedAt: item.updatedAt.toISOString(),
      description: item.featured ? "Featured project" : item.description,
    })),
    ...snapshot.work.map((item) => ({
      label: item.title,
      href: adminRoutes.myWork,
      updatedAt: item.updatedAt.toISOString(),
      description: item.summary,
    })),
    ...snapshot.certificates.map((item) => ({
      label: item.title,
      href: adminRoutes.certificates,
      updatedAt: item.updatedAt.toISOString(),
      description: item.issuer,
    })),
    ...snapshot.experience.map((item) => ({
      label: item.role,
      href: adminRoutes.experience,
      updatedAt: item.updatedAt.toISOString(),
      description: item.company,
    })),
  ];

  return items.sort((left, right) => new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime()).slice(0, 6);
}

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireAdminSession();

  const params = await searchParams;
  const toast = typeof params?.toast === "string" ? params.toast : null;
  let data: AdminSnapshot;
  let loadError: string | null = null;

  try {
    data = await getAdminSnapshot();
  } catch {
    data = getEmptyAdminSnapshot();
    loadError = "The CMS snapshot could not be loaded, so the dashboard is showing fallback content.";
  }

  const recentUpdates = buildRecentUpdates(data);
  const totalItems = data.education.length + data.skills.length + data.projects.length + data.work.length + data.certificates.length + data.experience.length;
  const latestUpdate = recentUpdates[0];

  return (
    <main className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(0,0,0,0.01),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(0,0,0,0.008),_transparent_28%),radial-gradient(circle_at_bottom,_rgba(0,0,0,0.004),_transparent_36%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[18rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.78)_0%,rgba(255,255,255,0.56)_70%,rgba(255,255,255,0.18)_100%)]" />

      <AdminToast key={toast ?? "idle"} message={toast} />

      <section className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-6">
        <AdminPageHeader
          title="Dashboard"
          description="This is the overview for the CMS. Use the section pages to make edits without carrying all the forms at once."
          action={
            <Link
              href={adminRoutes.home}
              className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white transition-colors hover:bg-[var(--accent-strong)]"
            >
              Edit Home
            </Link>
          }
        />

        {loadError ? (
          <div className="rounded-[1.5rem] border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
            {loadError} You can still navigate to the section pages and edit content.
          </div>
        ) : null}

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <AdminStatCard label="Content records" value={String(totalItems)} description="Education, skills, projects, work, certificates, and experience." />
          <AdminStatCard label="Freshest update" value={latestUpdate ? formatRelativeTime(latestUpdate.updatedAt) : "No updates"} description={latestUpdate ? latestUpdate.label : "Nothing has been edited yet."} />
          <AdminStatCard label="Public sections" value="7" description="Each section is now isolated on its own admin page." />
          <AdminStatCard label="Dashboard status" value="Overview" description="No forms here, just shortcuts and recent activity." />
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(20rem,0.8fr)]">
          <AdminCard>
            <div className="mb-5 flex items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--muted)]">Quick Links</p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-[var(--foreground)]">Edit a section</h2>
              </div>
              <Link
                href={adminRoutes.site}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[var(--border)] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                View Site
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {sectionCards.map((section) => (
                <Link
                  key={section.title}
                  href={section.href}
                  className="group rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)] p-5 transition-all hover:-translate-y-0.5 hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--muted)]">Section</p>
                      <h3 className="text-xl font-bold tracking-tight text-[var(--foreground)]">{section.title}</h3>
                      <p className="text-sm leading-6 text-[var(--muted)]">{section.description}</p>
                    </div>
                    <span className="rounded-full border border-[var(--border)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--muted)] transition-colors group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]">
                      Open
                    </span>
                  </div>
                  <p className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-[var(--accent)]">
                    Preview: {section.previewHref}
                  </p>
                </Link>
              ))}
            </div>
          </AdminCard>

          <AdminCard>
            <div className="mb-5 border-b border-[var(--border)] pb-4">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--muted)]">Recent Activity</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-[var(--foreground)]">Latest updates</h2>
            </div>

            <div className="space-y-3">
              {recentUpdates.length ? (
                recentUpdates.map((item) => (
                  <Link
                    key={`${item.label}-${item.updatedAt}`}
                    href={item.href}
                    className="block rounded-[1.5rem] border border-[var(--border)] bg-white p-4 transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]"
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
                <div className="rounded-[1.5rem] border border-dashed border-[var(--border)] bg-[var(--surface)] p-5 text-sm leading-6 text-[var(--muted)]">
                  No activity yet. Start with Home or any section page to see edits appear here.
                </div>
              )}
            </div>
          </AdminCard>
        </div>
      </section>
    </main>
  );
}
