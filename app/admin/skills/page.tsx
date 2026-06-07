/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { createSkill, deleteSkill, updateSkill } from "@/app/admin/actions";
import { AdminToast } from "@/components/admin-toast";
import {
  AdminCard,
  AdminInput,
  AdminPageHeader,
  AdminSectionCard,
  AdminSubmitButton,
} from "@/components/admin-ui";
import { getAdminSnapshot } from "@/lib/cms";
import { requireAdminSession } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "Skills | Siddhant Yojit",
  description: "Manage the skills section for the portfolio.",
};

export default async function AdminSkillsPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireAdminSession();

  const params = await searchParams;
  const toast = typeof params?.toast === "string" ? params.toast : null;
  const { skills } = await getAdminSnapshot();

  return (
    <main className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(0,0,0,0.01),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(0,0,0,0.008),_transparent_28%),radial-gradient(circle_at_bottom,_rgba(0,0,0,0.004),_transparent_36%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[18rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.78)_0%,rgba(255,255,255,0.56)_70%,rgba(255,255,255,0.18)_100%)]" />

      <AdminToast key={toast ?? "idle"} message={toast} />

      <section className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-6">
        <AdminPageHeader
          title="Skills"
          description="Manage the skill badges, categories, URLs, and display order for the skills page."
          previewHref="/skills"
        />

        <AdminSectionCard title="Add skill" description="Create a new skill badge and place it in the list order.">
          <form action={createSkill} className="space-y-4 rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)] p-4">
            <div className="grid gap-4 lg:grid-cols-2">
              <AdminInput label="Name" name="name" />
              <AdminInput label="Category" name="category" />
              <AdminInput label="Icon URL" name="icon" placeholder="https://..." />
              <AdminInput label="Link" name="href" required={false} placeholder="https://..." />
              <AdminInput label="Order" name="order" type="number" defaultValue={0} />
            </div>
            <div className="flex justify-end">
              <AdminSubmitButton label="Add Skill" pendingLabel="Adding..." />
            </div>
          </form>
        </AdminSectionCard>

        <AdminCard>
          <div className="mb-5 border-b border-[var(--border)] pb-4">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--muted)]">Existing records</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[var(--foreground)]">Skill list</h2>
          </div>

          <div className="grid gap-4">
            {skills.map((item) => (
              <form
                key={item.id}
                action={updateSkill.bind(null, item.id)}
                className="space-y-4 rounded-[1.75rem] border border-[var(--border)] bg-white p-4"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.icon}
                      alt={`${item.name} icon`}
                      className="h-10 w-10 rounded-full border border-[var(--border)] object-contain p-1"
                    />
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--muted)]">Record #{item.id}</p>
                      <h3 className="mt-1 text-lg font-bold text-[var(--foreground)]">{item.name}</h3>
                      <p className="text-sm text-[var(--muted)]">{item.category}</p>
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
                  <AdminInput label="Name" name="name" defaultValue={item.name} />
                  <AdminInput label="Category" name="category" defaultValue={item.category} />
                  <AdminInput label="Icon URL" name="icon" defaultValue={item.icon} />
                  <AdminInput label="Link" name="href" defaultValue={item.href ?? ""} required={false} />
                  <AdminInput label="Order" name="order" type="number" defaultValue={item.order} />
                </div>

                <div className="flex justify-end border-t border-[var(--border)] pt-4">
                  <AdminSubmitButton label="Save Skill" pendingLabel="Saving..." />
                </div>
              </form>
            ))}
          </div>
        </AdminCard>
      </section>
    </main>
  );
}
