/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminToast } from "@/components/admin-toast";
import { AdminSubmitButton } from "@/components/admin-submit-button";
import {
  createCertificate,
  createEducation,
  createExperience,
  createProject,
  createSkill,
  createWorkItem,
  deleteCertificate,
  deleteEducation,
  deleteExperience,
  deleteProject,
  deleteSkill,
  deleteWorkItem,
  logoutAdmin,
  saveProfile,
  updateCertificate,
  updateEducation,
  updateExperience,
  updateProject,
  updateSkill,
  updateWorkItem,
} from "@/app/admin/actions";
import { getAdminSnapshot } from "@/lib/cms";
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/session";

export const metadata: Metadata = {
  title: "Admin Dashboard | Siddhant Yojit",
  description: "Portfolio CMS dashboard.",
};

const navSections = [
  { id: "home", label: "Home" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "my-work", label: "My Work" },
  { id: "certificate", label: "Certificate" },
  { id: "experience", label: "Experience" },
] as const;

type TextEntry =
  | string
  | {
      icon?: string;
      label?: string;
      title?: string;
      value?: string;
      description?: string;
      name?: string;
      src?: string;
      iconClassName?: string;
      url?: string;
    };

function toTextAreaValue(items: TextEntry[], kind: "notes" | "value-cards" | "working-style" | "stack" | "links" | "strings") {
  if (kind === "notes") {
    return items
      .map((item) =>
        typeof item === "string" ? item : `${item.icon ?? ""}|${item.label ?? ""}|${item.value ?? ""}`.trim(),
      )
      .join("\n");
  }
  if (kind === "value-cards") {
    return items
      .map((item) =>
        typeof item === "string" ? item : `${item.icon ?? ""}|${item.title ?? ""}|${item.description ?? ""}`.trim(),
      )
      .join("\n");
  }
  if (kind === "working-style") {
    return items
      .map((item) => (typeof item === "string" ? item : `${item.icon ?? ""}|${item.title ?? ""}`.trim()))
      .join("\n");
  }
  if (kind === "stack") {
    return items
      .map((item) =>
        typeof item === "string" ? item : `${item.name ?? ""}|${item.src ?? ""}|${item.iconClassName ?? ""}`.trim(),
      )
      .join("\n");
  }
  if (kind === "links") {
    return items
      .map((item) => (typeof item === "string" ? item : `${item.label ?? ""}|${item.url ?? ""}`.trim()))
      .join("\n");
  }
  return items
    .map((item) => (typeof item === "string" ? item : item.title ?? item.url ?? item.name ?? ""))
    .join("\n");
}

function Input({
  label,
  name,
  defaultValue,
  placeholder,
  type = "text",
  required = true,
}: {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  placeholder?: string;
  type?: "text" | "url" | "number";
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs font-black uppercase tracking-[0.18em] text-[var(--foreground)]">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
      />
    </label>
  );
}

function TextArea({
  label,
  name,
  defaultValue,
  placeholder,
  rows = 4,
  required = true,
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-black uppercase tracking-[0.18em] text-[var(--foreground)]">{label}</span>
      <textarea
        name={name}
        required={required}
        rows={rows}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
      />
      {hint ? <p className="mt-2 text-xs text-[var(--muted)]">{hint}</p> : null}
    </label>
  );
}

function SectionCard({
  id,
  title,
  description,
  previewHref,
  children,
}: {
  id: string;
  title: string;
  description: string;
  previewHref: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 rounded-[2rem] border border-[var(--border)] bg-white p-5 shadow-[0_16px_40px_rgba(0,0,0,0.06)] sm:p-6">
      <div className="mb-5 flex flex-col gap-3 border-b border-[var(--border)] pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--muted)]">{id}</p>
          <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">{title}</h2>
          <p className="max-w-2xl text-sm leading-6 text-[var(--muted)]">{description}</p>
        </div>
        <a
          href={previewHref}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-full border border-[var(--border)] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          Preview
        </a>
      </div>
      {children}
    </section>
  );
}

async function isAuthenticated() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    return false;
  }

  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) {
    return false;
  }

  return Boolean(await verifyAdminSessionToken(token, secret));
}

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }

  const params = await searchParams;
  const toast = typeof params?.toast === "string" ? params.toast : null;
  const data = await getAdminSnapshot();

  const profile = data.profile;

  return (
    <main className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(0,0,0,0.01),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(0,0,0,0.008),_transparent_28%),radial-gradient(circle_at_bottom,_rgba(0,0,0,0.004),_transparent_36%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[18rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.78)_0%,rgba(255,255,255,0.56)_70%,rgba(255,255,255,0.18)_100%)]" />

      <AdminToast key={toast ?? "idle"} message={toast} />

      <section className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pb-10 pt-5 sm:px-6 sm:pb-12 sm:pt-6 lg:px-8 lg:pt-8">
        <div className="flex flex-col gap-4 rounded-[2rem] border border-[var(--border)] bg-white p-5 shadow-[0_16px_40px_rgba(0,0,0,0.06)] sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--muted)]">Admin Dashboard</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--foreground)]">Portfolio CMS</h1>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-[var(--muted)]">
                Update the public site content without editing the codebase. Changes are saved in Prisma and published
                across the portfolio pages immediately.
              </p>
            </div>

            <form action={logoutAdmin}>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full border border-[var(--border)] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                Sign Out
              </button>
            </form>
          </div>

          <nav className="flex flex-wrap gap-2 border-t border-[var(--border)] pt-4">
            {navSections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="rounded-full border border-[var(--border)] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                {section.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="grid gap-6">
          <SectionCard
            id="home"
            title="Home"
            description="Editable hero copy, notes, cards, and the top of the portfolio landing page."
            previewHref="/"
          >
            <form action={saveProfile} className="space-y-5">
              <div className="grid gap-4 lg:grid-cols-2">
                <Input label="Hero title" name="heroTitle" defaultValue={profile.heroTitle} />
                <Input label="Current role" name="currentRole" defaultValue={profile.currentRole} />
                <Input label="Location" name="location" defaultValue={profile.location} />
                <Input label="Core focus" name="coreFocus" defaultValue={profile.coreFocus} />
                <Input label="Snapshot title" name="snapshotTitle" defaultValue={profile.snapshotTitle} />
                <Input label="Open badge" name="openToOpportunitiesBadge" defaultValue={profile.openToOpportunitiesBadge} />
              </div>

              <TextArea label="Intro text" name="introText" defaultValue={profile.introText} rows={5} />
              <TextArea label="What I care about" name="whatICareAbout" defaultValue={profile.whatICareAbout} rows={3} />

              <div className="grid gap-4 lg:grid-cols-2">
                <TextArea
                  label="Quick notes"
                  name="quickNotes"
                  defaultValue={toTextAreaValue(profile.quickNotes as Array<{ icon?: string; label: string; value: string }>, "notes")}
                  rows={6}
                  hint="Format: icon|label|value per line."
                />
                <TextArea
                  label="Header notes"
                  name="headerNotes"
                  defaultValue={toTextAreaValue(profile.headerNotes as Array<{ icon?: string; label: string; value: string }>, "notes")}
                  rows={6}
                  hint="Format: icon|label|value per line."
                />
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <TextArea
                  label="Value cards"
                  name="valueCards"
                  defaultValue={toTextAreaValue(profile.valueCards as Array<{ icon?: string; title: string; description: string }>, "value-cards")}
                  rows={7}
                  hint="Format: icon|title|description per line."
                />
                <TextArea
                  label="Working style"
                  name="workingStyle"
                  defaultValue={toTextAreaValue(profile.workingStyle as Array<{ icon?: string; title: string }>, "working-style")}
                  rows={7}
                  hint="Format: icon|sentence per line."
                />
              </div>

              <div className="flex justify-end border-t border-[var(--border)] pt-4">
                <AdminSubmitButton label="Save Home" pendingLabel="Saving home..." />
              </div>
            </form>
          </SectionCard>

          <SectionCard
            id="education"
            title="Education"
            description="Create, edit, and remove education rows from the public education page."
            previewHref="/education"
          >
            <form action={createEducation} className="space-y-4 rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)] p-4">
              <div className="grid gap-4 lg:grid-cols-2">
                <Input label="Institute" name="institute" />
                <Input label="Degree" name="degree" />
                <Input label="Duration" name="duration" placeholder="2024 - 2026" />
                <Input label="Logo URL" name="logo" required={false} placeholder="/company-logos/example.png" />
              </div>
              <TextArea label="Description" name="description" rows={3} placeholder="CGPA: 5.99/10" />
              <label className="block">
                <span className="text-xs font-black uppercase tracking-[0.18em] text-[var(--foreground)]">Upload logo</span>
                <input
                  type="file"
                  name="logoFile"
                  accept="image/*"
                  className="mt-2 block w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)]"
                />
              </label>
              <div className="flex justify-end">
                <AdminSubmitButton label="Add Education" pendingLabel="Adding..." />
              </div>
            </form>

            <div className="mt-6 grid gap-4">
              {data.education.map((item) => (
                <form key={item.id} action={updateEducation.bind(null, item.id)} className="space-y-4 rounded-[1.75rem] border border-[var(--border)] bg-white p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--muted)]">Record #{item.id}</p>
                      <h3 className="mt-1 text-lg font-bold text-[var(--foreground)]">{item.institute}</h3>
                    </div>
                    <button
                      type="submit"
                      formAction={deleteEducation.bind(null, item.id)}
                      className="rounded-full border border-red-200 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-red-700 transition-colors hover:border-red-400"
                    >
                      Delete
                    </button>
                  </div>
                  <div className="grid gap-4 lg:grid-cols-2">
                    <Input label="Institute" name="institute" defaultValue={item.institute} />
                    <Input label="Degree" name="degree" defaultValue={item.degree} />
                    <Input label="Duration" name="duration" defaultValue={item.duration} />
                    <Input label="Logo URL" name="logo" defaultValue={item.logo ?? ""} required={false} />
                  </div>
                  <TextArea label="Description" name="description" defaultValue={item.description} rows={3} />
                  {item.logo ? (
                    <img src={item.logo} alt={`${item.institute} logo`} className="h-16 w-16 rounded-2xl border border-[var(--border)] object-contain p-2" />
                  ) : null}
                  <label className="block">
                    <span className="text-xs font-black uppercase tracking-[0.18em] text-[var(--foreground)]">Replace logo</span>
                    <input
                      type="file"
                      name="logoFile"
                      accept="image/*"
                      className="mt-2 block w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)]"
                    />
                  </label>
                  <div className="flex justify-end">
                    <AdminSubmitButton label="Save Education" pendingLabel="Saving..." />
                  </div>
                </form>
              ))}
            </div>
          </SectionCard>

          <SectionCard
            id="skills"
            title="Skills"
            description="Manage the skill badges and their order on the skills page."
            previewHref="/skills"
          >
            <form action={createSkill} className="space-y-4 rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)] p-4">
              <div className="grid gap-4 lg:grid-cols-2">
                <Input label="Name" name="name" />
                <Input label="Category" name="category" />
                <Input label="Icon URL" name="icon" placeholder="https://..." />
                <Input label="Link" name="href" required={false} placeholder="https://..." />
                <Input label="Order" name="order" type="number" defaultValue={0} />
              </div>
              <div className="flex justify-end">
                <AdminSubmitButton label="Add Skill" pendingLabel="Adding..." />
              </div>
            </form>

            <div className="mt-6 grid gap-4">
              {data.skills.map((item) => (
                <form key={item.id} action={updateSkill.bind(null, item.id)} className="space-y-4 rounded-[1.75rem] border border-[var(--border)] bg-white p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img src={item.icon} alt={`${item.name} icon`} className="h-10 w-10 rounded-full border border-[var(--border)] object-contain p-1" />
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--muted)]">Record #{item.id}</p>
                        <h3 className="mt-1 text-lg font-bold text-[var(--foreground)]">{item.name}</h3>
                      </div>
                    </div>
                    <button
                      type="submit"
                      formAction={deleteSkill.bind(null, item.id)}
                      className="rounded-full border border-red-200 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-red-700 transition-colors hover:border-red-400"
                    >
                      Delete
                    </button>
                  </div>
                  <div className="grid gap-4 lg:grid-cols-2">
                    <Input label="Name" name="name" defaultValue={item.name} />
                    <Input label="Category" name="category" defaultValue={item.category} />
                    <Input label="Icon URL" name="icon" defaultValue={item.icon} />
                    <Input label="Link" name="href" defaultValue={item.href ?? ""} required={false} />
                    <Input label="Order" name="order" type="number" defaultValue={item.order} />
                  </div>
                  <div className="flex justify-end">
                    <AdminSubmitButton label="Save Skill" pendingLabel="Saving..." />
                  </div>
                </form>
              ))}
            </div>
          </SectionCard>

          <SectionCard
            id="projects"
            title="Projects"
            description="Update project titles, stack badges, links, feature flags, and images."
            previewHref="/projects"
          >
            <form action={createProject} className="space-y-4 rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)] p-4">
              <div className="grid gap-4 lg:grid-cols-2">
                <Input label="Title" name="title" />
                <Input label="GitHub" name="github" required={false} placeholder="https://github.com/..." />
                <Input label="Live link" name="liveLink" required={false} placeholder="https://..." />
                <Input label="Image URL" name="image" required={false} placeholder="data:..." />
                <Input label="Order" name="order" type="number" defaultValue={0} />
              </div>
              <TextArea label="Description" name="description" rows={4} />
              <TextArea
                label="Stack"
                name="stack"
                rows={5}
                placeholder="React|https://...|h-5 w-5"
                hint="Format: name|src|iconClassName per line."
              />
              <label className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-white px-4 py-3">
                <input type="checkbox" name="featured" className="h-4 w-4 rounded border-[var(--border)]" />
                <span className="text-sm font-semibold text-[var(--foreground)]">Featured project</span>
              </label>
              <label className="block">
                <span className="text-xs font-black uppercase tracking-[0.18em] text-[var(--foreground)]">Upload image</span>
                <input type="file" name="imageFile" accept="image/*" className="mt-2 block w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)]" />
              </label>
              <div className="flex justify-end">
                <AdminSubmitButton label="Add Project" pendingLabel="Adding..." />
              </div>
            </form>

            <div className="mt-6 grid gap-4">
              {data.projects.map((item) => (
                <form key={item.id} action={updateProject.bind(null, item.id)} className="space-y-4 rounded-[1.75rem] border border-[var(--border)] bg-white p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--muted)]">Record #{item.id}</p>
                      <h3 className="mt-1 text-lg font-bold text-[var(--foreground)]">{item.title}</h3>
                    </div>
                    <button
                      type="submit"
                      formAction={deleteProject.bind(null, item.id)}
                      className="rounded-full border border-red-200 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-red-700 transition-colors hover:border-red-400"
                    >
                      Delete
                    </button>
                  </div>
                  <div className="grid gap-4 lg:grid-cols-2">
                    <Input label="Title" name="title" defaultValue={item.title} />
                    <Input label="GitHub" name="github" defaultValue={item.github ?? ""} required={false} />
                    <Input label="Live link" name="liveLink" defaultValue={item.liveLink ?? ""} required={false} />
                    <Input label="Image URL" name="image" defaultValue={item.image ?? ""} required={false} />
                    <Input label="Order" name="order" type="number" defaultValue={item.order} />
                  </div>
                  <TextArea label="Description" name="description" defaultValue={item.description} rows={4} />
                  <TextArea label="Stack" name="stack" defaultValue={toTextAreaValue(item.stack as Array<{ name: string; src: string; iconClassName?: string }>, "stack")} rows={5} />
                  <label className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-white px-4 py-3">
                    <input type="checkbox" name="featured" defaultChecked={item.featured} className="h-4 w-4 rounded border-[var(--border)]" />
                    <span className="text-sm font-semibold text-[var(--foreground)]">Featured project</span>
                  </label>
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="h-48 w-full rounded-[1.25rem] border border-[var(--border)] object-cover" />
                  ) : null}
                  <label className="block">
                    <span className="text-xs font-black uppercase tracking-[0.18em] text-[var(--foreground)]">Replace image</span>
                    <input type="file" name="imageFile" accept="image/*" className="mt-2 block w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)]" />
                  </label>
                  <div className="flex justify-end">
                    <AdminSubmitButton label="Save Project" pendingLabel="Saving..." />
                  </div>
                </form>
              ))}
            </div>
          </SectionCard>

          <SectionCard
            id="my-work"
            title="My Work"
            description="Manage the custom work showcase, screenshots, and links."
            previewHref="/my-work"
          >
            <form action={createWorkItem} className="space-y-4 rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)] p-4">
              <div className="grid gap-4 lg:grid-cols-2">
                <Input label="Title" name="title" />
                <Input label="Order" name="order" type="number" defaultValue={0} />
              </div>
              <TextArea label="Summary" name="summary" rows={4} />
              <TextArea label="Screenshots" name="screenshots" rows={4} hint="One screenshot URL per line." />
              <TextArea label="Links" name="links" rows={4} hint="Format: label|url per line." />
              <div className="flex justify-end">
                <AdminSubmitButton label="Add Work Item" pendingLabel="Adding..." />
              </div>
            </form>

            <div className="mt-6 grid gap-4">
              {data.work.map((item) => (
                <form key={item.id} action={updateWorkItem.bind(null, item.id)} className="space-y-4 rounded-[1.75rem] border border-[var(--border)] bg-white p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--muted)]">Record #{item.id}</p>
                      <h3 className="mt-1 text-lg font-bold text-[var(--foreground)]">{item.title}</h3>
                    </div>
                    <button
                      type="submit"
                      formAction={deleteWorkItem.bind(null, item.id)}
                      className="rounded-full border border-red-200 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-red-700 transition-colors hover:border-red-400"
                    >
                      Delete
                    </button>
                  </div>
                  <div className="grid gap-4 lg:grid-cols-2">
                    <Input label="Title" name="title" defaultValue={item.title} />
                    <Input label="Order" name="order" type="number" defaultValue={item.order} />
                  </div>
                  <TextArea label="Summary" name="summary" defaultValue={item.summary} rows={4} />
                  <TextArea label="Screenshots" name="screenshots" defaultValue={toTextAreaValue(item.screenshots as string[], "strings")} rows={4} />
                  <TextArea label="Links" name="links" defaultValue={toTextAreaValue(item.links as Array<{ label: string; url: string }>, "links")} rows={4} />
                  <div className="flex justify-end">
                    <AdminSubmitButton label="Save Work Item" pendingLabel="Saving..." />
                  </div>
                </form>
              ))}
            </div>
          </SectionCard>

          <SectionCard
            id="certificate"
            title="Certificate"
            description="Manage certificate imagery, issuers, dates, and verification links."
            previewHref="/certificate"
          >
            <form action={createCertificate} className="space-y-4 rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)] p-4">
              <div className="grid gap-4 lg:grid-cols-2">
                <Input label="Title" name="title" />
                <Input label="Issuer" name="issuer" />
                <Input label="Issue date" name="issueDate" placeholder="Mar 2024" />
                <Input label="Verification link" name="verificationLink" required={false} placeholder="https://..." />
                <Input label="Image URL" name="image" required={false} placeholder="/certificates/example.png" />
                <Input label="Order" name="order" type="number" defaultValue={0} />
              </div>
              <label className="block">
                <span className="text-xs font-black uppercase tracking-[0.18em] text-[var(--foreground)]">Upload image</span>
                <input type="file" name="imageFile" accept="image/*" className="mt-2 block w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)]" />
              </label>
              <div className="flex justify-end">
                <AdminSubmitButton label="Add Certificate" pendingLabel="Adding..." />
              </div>
            </form>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {data.certificates.map((item) => (
                <form key={item.id} action={updateCertificate.bind(null, item.id)} className="space-y-4 rounded-[1.75rem] border border-[var(--border)] bg-white p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--muted)]">Record #{item.id}</p>
                      <h3 className="mt-1 text-lg font-bold text-[var(--foreground)]">{item.title}</h3>
                    </div>
                    <button
                      type="submit"
                      formAction={deleteCertificate.bind(null, item.id)}
                      className="rounded-full border border-red-200 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-red-700 transition-colors hover:border-red-400"
                    >
                      Delete
                    </button>
                  </div>
                  <div className="grid gap-4 lg:grid-cols-2">
                    <Input label="Title" name="title" defaultValue={item.title} />
                    <Input label="Issuer" name="issuer" defaultValue={item.issuer} />
                    <Input label="Issue date" name="issueDate" defaultValue={item.issueDate} />
                    <Input label="Verification link" name="verificationLink" defaultValue={item.verificationLink ?? ""} required={false} />
                    <Input label="Image URL" name="image" defaultValue={item.image ?? ""} required={false} />
                    <Input label="Order" name="order" type="number" defaultValue={item.order} />
                  </div>
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="h-48 w-full rounded-[1.25rem] border border-[var(--border)] object-cover" />
                  ) : null}
                  <label className="block">
                    <span className="text-xs font-black uppercase tracking-[0.18em] text-[var(--foreground)]">Replace image</span>
                    <input type="file" name="imageFile" accept="image/*" className="mt-2 block w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)]" />
                  </label>
                  <div className="flex justify-end">
                    <AdminSubmitButton label="Save Certificate" pendingLabel="Saving..." />
                  </div>
                </form>
              ))}
            </div>
          </SectionCard>

          <SectionCard
            id="experience"
            title="Experience"
            description="Manage work history, descriptions, logos, and technology lists."
            previewHref="/experience"
          >
            <form action={createExperience} className="space-y-4 rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)] p-4">
              <div className="grid gap-4 lg:grid-cols-2">
                <Input label="Company" name="company" />
                <Input label="Role" name="role" />
                <Input label="Duration" name="duration" placeholder="Jan 2026 - Present" />
                <Input label="Logo URL" name="logo" required={false} placeholder="/company-logos/example.png" />
                <Input label="Order" name="order" type="number" defaultValue={0} />
              </div>
              <TextArea label="Description" name="description" rows={5} hint="Write one bullet per line." />
              <TextArea label="Technologies" name="technologies" rows={4} hint="One technology per line." />
              <label className="block">
                <span className="text-xs font-black uppercase tracking-[0.18em] text-[var(--foreground)]">Upload logo</span>
                <input type="file" name="logoFile" accept="image/*" className="mt-2 block w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)]" />
              </label>
              <div className="flex justify-end">
                <AdminSubmitButton label="Add Experience" pendingLabel="Adding..." />
              </div>
            </form>

            <div className="mt-6 grid gap-4">
              {data.experience.map((item) => (
                <form key={item.id} action={updateExperience.bind(null, item.id)} className="space-y-4 rounded-[1.75rem] border border-[var(--border)] bg-white p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--muted)]">Record #{item.id}</p>
                      <h3 className="mt-1 text-lg font-bold text-[var(--foreground)]">{item.role}</h3>
                    </div>
                    <button
                      type="submit"
                      formAction={deleteExperience.bind(null, item.id)}
                      className="rounded-full border border-red-200 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-red-700 transition-colors hover:border-red-400"
                    >
                      Delete
                    </button>
                  </div>
                  <div className="grid gap-4 lg:grid-cols-2">
                    <Input label="Company" name="company" defaultValue={item.company} />
                    <Input label="Role" name="role" defaultValue={item.role} />
                    <Input label="Duration" name="duration" defaultValue={item.duration} />
                    <Input label="Logo URL" name="logo" defaultValue={item.logo ?? ""} required={false} />
                    <Input label="Order" name="order" type="number" defaultValue={item.order} />
                  </div>
                  <TextArea label="Description" name="description" defaultValue={item.description} rows={5} />
                  <TextArea label="Technologies" name="technologies" defaultValue={toTextAreaValue(item.technologies as string[], "strings")} rows={4} />
                  {item.logo ? (
                    <img src={item.logo} alt={item.company} className="h-16 w-16 rounded-2xl border border-[var(--border)] object-cover" />
                  ) : null}
                  <label className="block">
                    <span className="text-xs font-black uppercase tracking-[0.18em] text-[var(--foreground)]">Replace logo</span>
                    <input type="file" name="logoFile" accept="image/*" className="mt-2 block w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)]" />
                  </label>
                  <div className="flex justify-end">
                    <AdminSubmitButton label="Save Experience" pendingLabel="Saving..." />
                  </div>
                </form>
              ))}
            </div>
          </SectionCard>
        </div>
      </section>
    </main>
  );
}
