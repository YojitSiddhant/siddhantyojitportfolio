/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { createEducation, deleteEducation, updateEducation } from "@/app/admin/actions";
import { AdminToast } from "@/components/admin-toast";
import {
  AdminCard,
  AdminFileInput,
  AdminInput,
  AdminPageHeader,
  AdminSectionCard,
  AdminSubmitButton,
  AdminTextArea,
} from "@/components/admin-ui";
import { getAdminSnapshot } from "@/lib/cms";
import { getCmsMediaSrc } from "@/lib/cms-media";
import { requireAdminSession } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "Education | Siddhant Yojit",
  description: "Manage education records for the portfolio.",
};

export default async function AdminEducationPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireAdminSession();

  const params = await searchParams;
  const toast = typeof params?.toast === "string" ? params.toast : null;
  const { education } = await getAdminSnapshot();

  return (
    <main className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(0,0,0,0.01),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(0,0,0,0.008),_transparent_28%),radial-gradient(circle_at_bottom,_rgba(0,0,0,0.004),_transparent_36%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[18rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.78)_0%,rgba(255,255,255,0.56)_70%,rgba(255,255,255,0.18)_100%)]" />

      <AdminToast key={toast ?? "idle"} message={toast} />

      <section className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-6">
        <AdminPageHeader
          title="Education"
          description="Create, edit, and remove education rows from the public education page."
          previewHref="/education"
        />

        <AdminSectionCard title="Add education" description="Create a new education entry with an optional logo upload.">
          <form action={createEducation} className="space-y-4 rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)] p-4">
            <div className="grid gap-4 lg:grid-cols-2">
              <AdminInput label="Institute" name="institute" />
              <AdminInput label="Degree" name="degree" />
              <AdminInput label="Duration" name="duration" placeholder="2024 - 2026" />
              <AdminInput label="Logo URL" name="logo" required={false} placeholder="/company-logos/example.png" />
            </div>
            <AdminTextArea label="Description" name="description" rows={3} placeholder="CGPA: 5.99/10" />
            <AdminFileInput label="Upload logo" name="logoFile" />
            <div className="flex justify-end">
              <AdminSubmitButton label="Add Education" pendingLabel="Adding..." />
            </div>
          </form>
        </AdminSectionCard>

        <AdminCard>
          <div className="mb-5 border-b border-[var(--border)] pb-4">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--muted)]">Existing records</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[var(--foreground)]">Education list</h2>
          </div>

          <div className="grid gap-4">
            {education.map((item) => (
              <form
                key={item.id}
                action={updateEducation.bind(null, item.id)}
                className="space-y-4 rounded-[1.75rem] border border-[var(--border)] bg-white p-4"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--muted)]">Record #{item.id}</p>
                    <h3 className="mt-1 text-lg font-bold text-[var(--foreground)]">{item.institute}</h3>
                    <p className="text-sm text-[var(--muted)]">{item.degree}</p>
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
                  <AdminInput label="Institute" name="institute" defaultValue={item.institute} />
                  <AdminInput label="Degree" name="degree" defaultValue={item.degree} />
                  <AdminInput label="Duration" name="duration" defaultValue={item.duration} />
                  <AdminInput label="Logo URL" name="logo" defaultValue={item.logo ?? ""} required={false} />
                </div>

                <AdminTextArea label="Description" name="description" defaultValue={item.description} rows={3} />

                {item.logo ? (
                  <img
                    src={getCmsMediaSrc({
                      collection: "education",
                      id: item.id,
                      field: "logo",
                      src: item.logo,
                      updatedAt: item.updatedAt,
                    }) ?? item.logo}
                    alt={`${item.institute} logo`}
                    className="h-16 w-16 rounded-2xl border border-[var(--border)] object-contain p-2"
                  />
                ) : null}

                <AdminFileInput label="Replace logo" name="logoFile" />

                <div className="flex justify-end border-t border-[var(--border)] pt-4">
                  <AdminSubmitButton label="Save Education" pendingLabel="Saving..." />
                </div>
              </form>
            ))}
          </div>
        </AdminCard>
      </section>
    </main>
  );
}
