import type { Metadata } from "next";
import { AdminToast } from "@/components/admin-toast";
import { AdminCard, AdminInput, AdminPageHeader, AdminSectionCard, AdminSubmitButton, AdminTextArea } from "@/components/admin-ui";
import { saveProfile } from "@/app/admin/actions";
import { getAdminSnapshot } from "@/lib/cms";
import { requireAdminSession } from "@/lib/admin-auth";
import { adminRoutes } from "@/lib/admin-routes";
import { toTextAreaValue } from "@/lib/admin-form";

export const metadata: Metadata = {
  title: "Home Content | Siddhant Yojit",
  description: "Edit the homepage content used by the portfolio landing page.",
};

export default async function AdminHomePage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireAdminSession();

  const params = await searchParams;
  const toast = typeof params?.toast === "string" ? params.toast : null;
  const profile = (await getAdminSnapshot()).profile;
  const quickNotes = profile.quickNotes as Array<{ label: string; value: string }>;

  return (
    <main className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(0,0,0,0.01),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(0,0,0,0.008),_transparent_28%),radial-gradient(circle_at_bottom,_rgba(0,0,0,0.004),_transparent_36%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[18rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.78)_0%,rgba(255,255,255,0.56)_70%,rgba(255,255,255,0.18)_100%)]" />

      <AdminToast key={toast ?? "idle"} message={toast} />

      <section className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-6">
        <AdminPageHeader
          title="Home"
          description="Edit the homepage copy, notes, cards, and the top-most portfolio voice. This content feeds the public landing page."
          previewHref={adminRoutes.site}
        />

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)]">
          <AdminSectionCard
            title="Edit home content"
            description="Use the same visual style as the public site, but keep the content isolated to this page."
          >
            <form action={saveProfile} className="space-y-5">
              <div className="grid gap-4 lg:grid-cols-2">
                <AdminInput label="Hero title" name="heroTitle" defaultValue={profile.heroTitle} />
                <AdminInput label="Current role" name="currentRole" defaultValue={profile.currentRole} />
                <AdminInput label="Location" name="location" defaultValue={profile.location} />
                <AdminInput label="Core focus" name="coreFocus" defaultValue={profile.coreFocus} />
                <AdminInput label="Snapshot title" name="snapshotTitle" defaultValue={profile.snapshotTitle} />
                <AdminInput label="Open badge" name="openToOpportunitiesBadge" defaultValue={profile.openToOpportunitiesBadge} />
              </div>

              <AdminTextArea label="Intro text" name="introText" defaultValue={profile.introText} rows={5} />
              <AdminTextArea label="What I care about" name="whatICareAbout" defaultValue={profile.whatICareAbout} rows={3} />

              <div className="grid gap-4 lg:grid-cols-2">
                <AdminTextArea
                  label="Quick notes"
                  name="quickNotes"
                  defaultValue={toTextAreaValue(profile.quickNotes as Array<{ icon?: string; label: string; value: string }>, "notes")}
                  rows={6}
                  hint="Format: icon|label|value per line."
                />
                <AdminTextArea
                  label="Header notes"
                  name="headerNotes"
                  defaultValue={toTextAreaValue(profile.headerNotes as Array<{ icon?: string; label: string; value: string }>, "notes")}
                  rows={6}
                  hint="Format: icon|label|value per line."
                />
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <AdminTextArea
                  label="Value cards"
                  name="valueCards"
                  defaultValue={toTextAreaValue(
                    profile.valueCards as Array<{ icon?: string; title: string; description: string }>,
                    "value-cards",
                  )}
                  rows={7}
                  hint="Format: icon|title|description per line."
                />
                <AdminTextArea
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
          </AdminSectionCard>

          <AdminCard>
            <div className="mb-5 border-b border-[var(--border)] pb-4">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--muted)]">Current snapshot</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-[var(--foreground)]">Homepage summary</h2>
            </div>

            <div className="space-y-4 text-sm leading-6 text-[var(--muted)]">
              <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--muted)]">Hero</p>
                <p className="mt-2 font-semibold text-[var(--foreground)]">{profile.heroTitle}</p>
                <p className="mt-2">{profile.introText}</p>
              </div>

              <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--muted)]">Role</p>
                <p className="mt-2 font-semibold text-[var(--foreground)]">{profile.currentRole}</p>
                <p className="mt-2">{profile.location}</p>
              </div>

              <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--muted)]">Notes</p>
                <ul className="mt-3 space-y-2">
                  {quickNotes.slice(0, 3).map((item) => (
                    <li key={`${item.label}-${item.value}`} className="rounded-2xl bg-white px-3 py-2 text-[var(--foreground)]">
                      <span className="font-semibold">{item.label}:</span> {item.value}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AdminCard>
        </div>
      </section>
    </main>
  );
}
