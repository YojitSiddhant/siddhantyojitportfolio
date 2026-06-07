/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { createCertificate, deleteCertificate, updateCertificate } from "@/app/admin/actions";
import { AdminToast } from "@/components/admin-toast";
import {
  AdminCard,
  AdminFileInput,
  AdminInput,
  AdminPageHeader,
  AdminSectionCard,
  AdminSubmitButton,
} from "@/components/admin-ui";
import { getAdminSnapshot } from "@/lib/cms";
import { getCmsMediaSrc } from "@/lib/cms-media";
import { requireAdminSession } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "Certificates | Siddhant Yojit",
  description: "Manage certificates shown in the portfolio.",
};

export default async function AdminCertificatesPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireAdminSession();

  const params = await searchParams;
  const toast = typeof params?.toast === "string" ? params.toast : null;
  const { certificates } = await getAdminSnapshot();

  return (
    <main className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(0,0,0,0.01),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(0,0,0,0.008),_transparent_28%),radial-gradient(circle_at_bottom,_rgba(0,0,0,0.004),_transparent_36%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[18rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.78)_0%,rgba(255,255,255,0.56)_70%,rgba(255,255,255,0.18)_100%)]" />

      <AdminToast key={toast ?? "idle"} message={toast} />

      <section className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-6">
        <AdminPageHeader
          title="Certificates"
          description="Manage certificate imagery, issuers, dates, and verification links."
          previewHref="/certificate"
        />

        <AdminSectionCard title="Add certificate" description="Create a new certificate entry with an optional image upload.">
          <form action={createCertificate} className="space-y-4 rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)] p-4">
            <div className="grid gap-4 lg:grid-cols-2">
              <AdminInput label="Title" name="title" />
              <AdminInput label="Issuer" name="issuer" />
              <AdminInput label="Issue date" name="issueDate" placeholder="Mar 2024" />
              <AdminInput label="Verification link" name="verificationLink" required={false} placeholder="https://..." />
              <AdminInput label="Image URL" name="image" required={false} placeholder="/certificates/example.png" />
              <AdminInput label="Order" name="order" type="number" defaultValue={0} />
            </div>
            <AdminFileInput label="Upload image" name="imageFile" />
            <div className="flex justify-end">
              <AdminSubmitButton label="Add Certificate" pendingLabel="Adding..." />
            </div>
          </form>
        </AdminSectionCard>

        <AdminCard>
          <div className="mb-5 border-b border-[var(--border)] pb-4">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--muted)]">Existing records</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[var(--foreground)]">Certificate list</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {certificates.map((item) => (
              <form
                key={item.id}
                action={updateCertificate.bind(null, item.id)}
                className="space-y-4 rounded-[1.75rem] border border-[var(--border)] bg-white p-4"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--muted)]">Record #{item.id}</p>
                    <h3 className="mt-1 text-lg font-bold text-[var(--foreground)]">{item.title}</h3>
                    <p className="text-sm text-[var(--muted)]">{item.issuer}</p>
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
                  <AdminInput label="Title" name="title" defaultValue={item.title} />
                  <AdminInput label="Issuer" name="issuer" defaultValue={item.issuer} />
                  <AdminInput label="Issue date" name="issueDate" defaultValue={item.issueDate} />
                  <AdminInput label="Verification link" name="verificationLink" defaultValue={item.verificationLink ?? ""} required={false} />
                  <AdminInput label="Image URL" name="image" defaultValue={item.image ?? ""} required={false} />
                  <AdminInput label="Order" name="order" type="number" defaultValue={item.order} />
                </div>

                {item.image ? (
                  <img
                    src={
                      getCmsMediaSrc({
                        collection: "certificate",
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
                  <AdminSubmitButton label="Save Certificate" pendingLabel="Saving..." />
                </div>
              </form>
            ))}
          </div>
        </AdminCard>
      </section>
    </main>
  );
}
