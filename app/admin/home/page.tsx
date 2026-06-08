import type { Metadata } from "next";
import { AdminToast } from "@/components/admin-toast";
import { AdminCard, AdminInput, AdminPageHeader, AdminSectionCard, AdminTextArea } from "@/components/admin-ui";
import { AdminSaveBar } from "@/components/admin/save-bar";
import { saveProfile } from "@/app/admin/actions";
import { getAdminSnapshot } from "@/lib/cms";
import { requireAdminSession } from "@/lib/admin-auth";
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
  const headerNotes = profile.headerNotes as Array<{ label: string; value: string }>;
  const valueCards = profile.valueCards as Array<{ title: string; description: string }>;
  const workingStyle = profile.workingStyle as Array<{ title: string }>;

  return (
    <main className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.08),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(15,23,42,0.04),_transparent_28%),radial-gradient(circle_at_bottom,_rgba(255,255,255,0.72),_transparent_42%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[18rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.82)_0%,rgba(255,255,255,0.64)_70%,rgba(255,255,255,0.2)_100%)]" />

      <AdminToast key={toast ?? "idle"} message={toast} />

      <section className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-6">
        <AdminPageHeader
          title="Home"
          description="Edit the homepage copy, notes, cards, and the top-most portfolio voice. This content feeds the public landing page."
        />

        <div className="space-y-6">
          <AdminSectionCard
            title="Edit home content"
            description="Keep the homepage copy focused and concise while the layout stays simple and clean."
          >
            <form id="home-form" action={saveProfile} className="space-y-5">
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

              <AdminSaveBar formId="home-form" label="Save Home" pendingLabel="Saving home..." helper="This updates the public homepage and refreshes cached content." />
            </form>
          </AdminSectionCard>

          <AdminCard>
            <div className="mb-5 border-b border-[var(--border)] pb-4">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--muted)]">Current values</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-[var(--foreground)]">Live content outline</h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {quickNotes.slice(0, 3).map((item) => (
                <div key={`${item.label}-${item.value}`} className="rounded-[1.25rem] border border-[var(--border)] bg-white/80 p-4">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--muted)]">{item.label}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground)]">{item.value}</p>
                </div>
              ))}
              {headerNotes.slice(0, 2).map((item) => (
                <div key={`${item.label}-${item.value}`} className="rounded-[1.25rem] border border-[var(--border)] bg-white/80 p-4">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--muted)]">{item.label}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground)]">{item.value}</p>
                </div>
              ))}
              {valueCards.slice(0, 3).map((item) => (
                <div key={item.title} className="rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface)] p-4">
                  <p className="text-sm font-bold text-[var(--foreground)]">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{item.description}</p>
                </div>
              ))}
              {workingStyle.slice(0, 2).map((item) => (
                <div key={item.title} className="rounded-[1.25rem] border border-[var(--border)] bg-white/80 p-4">
                  <p className="text-sm font-bold text-[var(--foreground)]">{item.title}</p>
                </div>
              ))}
            </div>
          </AdminCard>
        </div>
      </section>
    </main>
  );
}
