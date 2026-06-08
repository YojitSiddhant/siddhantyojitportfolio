/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { createExperience, deleteExperience, updateExperience } from "@/app/admin/actions";
import { AdminToast } from "@/components/admin-toast";
import { AdminCard, AdminFileInput, AdminInput, AdminPageHeader, AdminSectionCard, AdminSubmitButton, AdminTextArea } from "@/components/admin-ui";
import { AdminSaveBar } from "@/components/admin/save-bar";
import { getAdminSnapshot } from "@/lib/cms";
import { getCmsMediaSrc } from "@/lib/cms-media";
import { requireAdminSession } from "@/lib/admin-auth";
import { toTextAreaValue } from "@/lib/admin-form";

export const metadata: Metadata = {
  title: "Experience | Siddhant Yojit",
  description: "Manage the work history section for the portfolio.",
};

export default async function AdminExperiencePage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireAdminSession();

  const params = await searchParams;
  const toast = typeof params?.toast === "string" ? params.toast : null;
  const { experience } = await getAdminSnapshot();

  return (
    <main className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.08),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(15,23,42,0.04),_transparent_28%),radial-gradient(circle_at_bottom,_rgba(255,255,255,0.72),_transparent_42%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[18rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.82)_0%,rgba(255,255,255,0.64)_70%,rgba(255,255,255,0.2)_100%)]" />

      <AdminToast key={toast ?? "idle"} message={toast} />

      <section className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-6">
        <AdminPageHeader
          title="Experience"
          description="Update work history, role descriptions, logos, and technology lists."
        />

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(22rem,0.85fr)]">
          <div className="space-y-6">
            <AdminSectionCard title="Add experience" description="Create a new work history entry with an optional logo upload.">
              <form id="experience-form" action={createExperience} className="space-y-4">
                <div className="grid gap-4 lg:grid-cols-2">
                  <AdminInput label="Company" name="company" />
                  <AdminInput label="Role" name="role" />
                  <AdminInput label="Duration" name="duration" placeholder="Jan 2026 - Present" />
                  <AdminInput label="Logo URL" name="logo" required={false} placeholder="/company-logos/example.png" />
                  <AdminInput label="Order" name="order" type="number" defaultValue={0} />
                </div>
                <AdminTextArea label="Description" name="description" rows={5} hint="Write one bullet per line." />
                <AdminTextArea label="Technologies" name="technologies" rows={4} hint="One technology per line." />
                <AdminFileInput label="Upload logo" name="logoFile" />
                <AdminSaveBar formId="experience-form" label="Add Experience" pendingLabel="Adding..." helper="Adding an entry refreshes the public experience page and cached admin preview." />
              </form>
            </AdminSectionCard>

            <AdminCard>
              <div className="mb-5 border-b border-black/5 pb-4">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--muted)]">Existing records</p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-[var(--foreground)]">Experience list</h2>
              </div>

              <div className="grid gap-4">
                {experience.map((item) => (
                  <form
                    key={item.id}
                    action={updateExperience.bind(null, item.id)}
                    className="space-y-4 rounded-[1.5rem] border border-black/5 bg-white p-4 shadow-[0_12px_24px_rgba(15,23,42,0.04)]"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--muted)]">Record #{item.id}</p>
                        <h3 className="mt-1 text-lg font-bold text-[var(--foreground)]">{item.role}</h3>
                        <p className="text-sm text-[var(--muted)]">{item.company}</p>
                      </div>
                      <button
                        type="submit"
                        formAction={deleteExperience.bind(null, item.id)}
                        className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-red-700 transition-colors hover:border-red-400"
                      >
                        Delete
                      </button>
                    </div>

                    <div className="grid gap-4 lg:grid-cols-2">
                      <AdminInput label="Company" name="company" defaultValue={item.company} />
                      <AdminInput label="Role" name="role" defaultValue={item.role} />
                      <AdminInput label="Duration" name="duration" defaultValue={item.duration} />
                      <AdminInput label="Logo URL" name="logo" defaultValue={item.logo ?? ""} required={false} />
                      <AdminInput label="Order" name="order" type="number" defaultValue={item.order} />
                    </div>

                    <AdminTextArea label="Description" name="description" defaultValue={item.description} rows={5} />
                    <AdminTextArea
                      label="Technologies"
                      name="technologies"
                      defaultValue={toTextAreaValue(item.technologies as string[], "strings")}
                      rows={4}
                    />

                    {item.logo ? (
                      <img
                        src={
                          getCmsMediaSrc({
                            collection: "experience",
                            id: item.id,
                            field: "logo",
                            src: item.logo,
                            updatedAt: item.updatedAt,
                          }) ?? item.logo
                        }
                        alt={item.company}
                        className="h-16 w-16 rounded-2xl border border-black/5 object-cover"
                      />
                    ) : null}

                    <AdminFileInput label="Replace logo" name="logoFile" />

                    <div className="flex justify-end border-t border-black/5 pt-4">
                      <AdminSubmitButton label="Save Experience" pendingLabel="Saving..." />
                    </div>
                  </form>
                ))}
              </div>
            </AdminCard>
          </div>

          <div className="space-y-6">
            <AdminCard>
              <div className="mb-5 border-b border-black/5 pb-4">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--muted)]">Preview panel</p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-[var(--foreground)]">Live experience snapshot</h2>
              </div>

              <div className="space-y-4">
                {experience.slice(0, 4).map((item) => (
                  <div key={item.id} className="rounded-[1.35rem] border border-black/5 bg-[var(--surface)] p-4">
                    <div className="flex items-start gap-3">
                      {item.logo ? (
                        <img
                          src={
                            getCmsMediaSrc({
                              collection: "experience",
                              id: item.id,
                              field: "logo",
                              src: item.logo,
                              updatedAt: item.updatedAt,
                            }) ?? item.logo
                          }
                          alt=""
                          className="h-12 w-12 rounded-2xl border border-black/5 object-cover p-1"
                        />
                      ) : null}
                      <div className="min-w-0">
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--muted)]">{item.duration}</p>
                        <p className="mt-1 text-base font-bold text-[var(--foreground)]">{item.role}</p>
                        <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{item.company}</p>
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{item.description}</p>
                  </div>
                ))}
              </div>
            </AdminCard>
          </div>
        </div>
      </section>
    </main>
  );
}
