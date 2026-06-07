/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { createProject, deleteProject, updateProject } from "@/app/admin/actions";
import { AdminToast } from "@/components/admin-toast";
import {
  AdminCard,
  AdminFileInput,
  AdminInput,
  AdminPageHeader,
  AdminSectionCard,
  AdminSubmitButton,
  AdminTextArea,
  AdminToggle,
} from "@/components/admin-ui";
import { getAdminSnapshot } from "@/lib/cms";
import { getCmsMediaSrc } from "@/lib/cms-media";
import { requireAdminSession } from "@/lib/admin-auth";
import { toTextAreaValue } from "@/lib/admin-form";

export const metadata: Metadata = {
  title: "Projects | Siddhant Yojit",
  description: "Manage project cards and featured projects.",
};

export default async function AdminProjectsPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireAdminSession();

  const params = await searchParams;
  const toast = typeof params?.toast === "string" ? params.toast : null;
  const { projects } = await getAdminSnapshot();

  return (
    <main className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(0,0,0,0.01),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(0,0,0,0.008),_transparent_28%),radial-gradient(circle_at_bottom,_rgba(0,0,0,0.004),_transparent_36%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[18rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.78)_0%,rgba(255,255,255,0.56)_70%,rgba(255,255,255,0.18)_100%)]" />

      <AdminToast key={toast ?? "idle"} message={toast} />

      <section className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-6">
        <AdminPageHeader
          title="Projects"
          description="Update project titles, stack badges, links, feature flags, and images."
          previewHref="/projects"
        />

        <AdminSectionCard title="Add project" description="Create a new project card and decide whether it should be featured.">
          <form action={createProject} className="space-y-4 rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)] p-4">
            <div className="grid gap-4 lg:grid-cols-2">
              <AdminInput label="Title" name="title" />
              <AdminInput label="GitHub" name="github" required={false} placeholder="https://github.com/..." />
              <AdminInput label="Live link" name="liveLink" required={false} placeholder="https://..." />
              <AdminInput label="Image URL" name="image" required={false} placeholder="data:..." />
              <AdminInput label="Order" name="order" type="number" defaultValue={0} />
            </div>
            <AdminTextArea label="Description" name="description" rows={4} />
            <AdminTextArea
              label="Stack"
              name="stack"
              rows={5}
              placeholder="React|https://...|h-5 w-5"
              hint="Format: name|src|iconClassName per line."
            />
            <AdminToggle label="Featured project" name="featured" />
            <AdminFileInput label="Upload image" name="imageFile" />
            <div className="flex justify-end">
              <AdminSubmitButton label="Add Project" pendingLabel="Adding..." />
            </div>
          </form>
        </AdminSectionCard>

        <AdminCard>
          <div className="mb-5 border-b border-[var(--border)] pb-4">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--muted)]">Existing records</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[var(--foreground)]">Project list</h2>
          </div>

          <div className="grid gap-4">
            {projects.map((item) => (
              <form
                key={item.id}
                action={updateProject.bind(null, item.id)}
                className="space-y-4 rounded-[1.75rem] border border-[var(--border)] bg-white p-4"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--muted)]">Record #{item.id}</p>
                    <h3 className="mt-1 text-lg font-bold text-[var(--foreground)]">{item.title}</h3>
                    <p className="text-sm text-[var(--muted)]">{item.featured ? "Featured" : "Standard project"}</p>
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
                  <AdminInput label="Title" name="title" defaultValue={item.title} />
                  <AdminInput label="GitHub" name="github" defaultValue={item.github ?? ""} required={false} />
                  <AdminInput label="Live link" name="liveLink" defaultValue={item.liveLink ?? ""} required={false} />
                  <AdminInput label="Image URL" name="image" defaultValue={item.image ?? ""} required={false} />
                  <AdminInput label="Order" name="order" type="number" defaultValue={item.order} />
                </div>

                <AdminTextArea label="Description" name="description" defaultValue={item.description} rows={4} />
                <AdminTextArea
                  label="Stack"
                  name="stack"
                  defaultValue={toTextAreaValue(item.stack as Array<{ name: string; src: string; iconClassName?: string }>, "stack")}
                  rows={5}
                />
                <AdminToggle label="Featured project" name="featured" defaultChecked={item.featured} />

                {item.image ? (
                  <img
                    src={
                      getCmsMediaSrc({
                        collection: "project",
                        id: item.id,
                        field: "image",
                        src: item.image,
                        updatedAt: item.updatedAt,
                      }) ?? item.image
                    }
                    alt={item.title}
                    className="h-48 w-full rounded-[1.25rem] border border-[var(--border)] object-cover"
                  />
                ) : null}

                <AdminFileInput label="Replace image" name="imageFile" />

                <div className="flex justify-end border-t border-[var(--border)] pt-4">
                  <AdminSubmitButton label="Save Project" pendingLabel="Saving..." />
                </div>
              </form>
            ))}
          </div>
        </AdminCard>
      </section>
    </main>
  );
}
