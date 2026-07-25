import { PageShell } from "@/components/page-shell";

export default function Loading() {
  return (
    <PageShell maxWidthClassName="max-w-7xl" animated={false}>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-1 py-4">
        <div className="h-4 w-44 rounded-full bg-accent-soft" />
        <div className="h-4 w-28 rounded-full bg-accent-soft" />
      </div>

      <section className="px-1 py-2">
        <div className="grid gap-5 md:grid-cols-2">
          {Array.from({ length: 2 }).map((_, index) => (
            <article
              key={index}
              className="flex h-full flex-col rounded-3xl border border-border bg-surface px-5 py-5 shadow-sm"
            >
              <div className="h-4 w-32 rounded-full bg-accent-soft" />
              <div className="mt-3 h-6 w-3/4 rounded-full bg-accent-soft" />
              <div className="mt-5 space-y-3">
                <div className="h-4 w-full rounded-full bg-accent-soft" />
                <div className="h-4 w-11/12 rounded-full bg-accent-soft" />
                <div className="h-4 w-10/12 rounded-full bg-accent-soft" />
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

