import type { Metadata } from "next";
import { createWorkItem, deleteWorkItem, updateWorkItem } from "@/app/admin/actions";
import { AdminToast } from "@/components/admin-toast";
import { AdminCard, AdminInput, AdminPageHeader, AdminSectionCard, AdminSubmitButton, AdminTextArea } from "@/components/admin-ui";
import { AdminSaveBar } from "@/components/admin/save-bar";
import { getAdminSnapshot } from "@/lib/cms";
import { requireAdminSession } from "@/lib/admin-auth";
import { toTextAreaValue } from "@/lib/admin-form";

export const metadata: Metadata = {
  title: "My Work | Siddhant Yojit",
  description: "Manage the custom work showcase entries.",
};

export default async function AdminWorkPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireAdminSession();

  const params = await searchParams;
  const toast = typeof params?.toast === "string" ? params.toast : null;
  const { work } = await getAdminSnapshot();

  return (
    <main className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.08),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(15,23,42,0.04),_transparent_28%),radial-gradient(circle_at_bottom,_rgba(255,255,255,0.72),_transparent_42%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[18rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.82)_0%,rgba(255,255,255,0.64)_70%,rgba(255,255,255,0.2)_100%)]" />

      <AdminToast key={toast ?? "idle"} message={toast} />

      <section className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-6">
        <AdminPageHeader
          title="My Work"
          description="Manage the custom work showcase, screenshots, and links."
          previewHref="/my-work"
        />

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(22rem,0.85fr)]">
          <div className="space-y-6">
            <AdminSectionCard title="Add work item" description="Create a new showcase entry with screenshots and outbound links.">
              <form id="work-form" action={createWorkItem} className="space-y-4">
                <div className="grid gap-4 lg:grid-cols-2">
                  <AdminInput label="Title" name="title" />
                  <AdminInput label="Order" name="order" type="number" defaultValue={0} />
                </div>
                <AdminTextArea label="Summary" name="summary" rows={4} />
                <AdminTextArea label="Screenshots" name="screenshots" rows={4} hint="One screenshot URL per line." />
                <AdminTextArea label="Links" name="links" rows={4} hint="Format: label|url per line." />
                <AdminSaveBar formId="work-form" label="Add Work Item" pendingLabel="Adding..." helper="New work items appear on the public showcase and in the admin timeline." />
              </form>
            </AdminSectionCard>

            <AdminCard>
              <div className="mb-5 border-b border-black/5 pb-4">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--muted)]">Existing records</p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-[var(--foreground)]">Work showcase</h2>
              </div>

              <div className="grid gap-4">
                {work.map((item) => (
                  <form
                    key={item.id}
                    action={updateWorkItem.bind(null, item.id)}
                    className="space-y-4 rounded-[1.5rem] border border-black/5 bg-white p-4 shadow-[0_12px_24px_rgba(15,23,42,0.04)]"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--muted)]">Record #{item.id}</p>
                        <h3 className="mt-1 text-lg font-bold text-[var(--foreground)]">{item.title}</h3>
                        <p className="text-sm text-[var(--muted)]">Order {item.order}</p>
                      </div>
                      <button
                        type="submit"
                        formAction={deleteWorkItem.bind(null, item.id)}
                        className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-red-700 transition-colors hover:border-red-400"
                      >
                        Delete
                      </button>
                    </div>

                    <div className="grid gap-4 lg:grid-cols-2">
                      <AdminInput label="Title" name="title" defaultValue={item.title} />
                      <AdminInput label="Order" name="order" type="number" defaultValue={item.order} />
                    </div>

                    <AdminTextArea label="Summary" name="summary" defaultValue={item.summary} rows={4} />
                    <AdminTextArea
                      label="Screenshots"
                      name="screenshots"
                      defaultValue={toTextAreaValue(item.screenshots as string[], "strings")}
                      rows={4}
                    />
                    <AdminTextArea
                      label="Links"
                      name="links"
                      defaultValue={toTextAreaValue(item.links as Array<{ label: string; url: string }>, "links")}
                      rows={4}
                    />

                    <div className="flex justify-end border-t border-black/5 pt-4">
                      <AdminSubmitButton label="Save Work Item" pendingLabel="Saving..." />
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
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-[var(--foreground)]">Live work snapshot</h2>
              </div>

              <div className="space-y-4">
                {work.slice(0, 4).map((item) => (
                  <div key={item.id} className="rounded-[1.35rem] border border-black/5 bg-[var(--surface)] p-4">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--muted)]">Order {item.order}</p>
                    <p className="mt-2 text-base font-bold text-[var(--foreground)]">{item.title}</p>
                    <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{item.summary}</p>
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
