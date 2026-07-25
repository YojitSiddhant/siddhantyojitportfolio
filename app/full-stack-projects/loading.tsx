import { PageShell } from "@/components/page-shell";

export default function Loading() {
  return (
    <PageShell animated={false}>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-1 py-4">
        <div className="h-4 w-44 rounded-full bg-accent-soft" />
        <div className="h-4 w-28 rounded-full bg-accent-soft" />
      </div>

      <section className="px-1 py-2">
        <div className="grid gap-5">
          {Array.from({ length: 2 }).map((_, index) => (
            <article key={index} className="grid gap-4 border-b border-border pb-5 lg:grid-cols-2 lg:items-start lg:gap-8">
              <div className="min-w-0 flex-1">
                <div className="h-4 w-40 rounded-full bg-accent-soft" />
                <div className="mt-4 flex flex-wrap gap-2">
                  <div className="h-8 w-20 rounded-full bg-accent-soft" />
                  <div className="h-8 w-24 rounded-full bg-accent-soft" />
                  <div className="h-8 w-20 rounded-full bg-accent-soft" />
                </div>
              </div>

              <div className="flex min-w-0 flex-col gap-2 text-sm">
                <div className="h-4 w-full rounded-full bg-accent-soft" />
                <div className="h-4 w-11/12 rounded-full bg-accent-soft" />
                <div className="mt-3 h-8 w-28 rounded-full bg-accent-soft" />
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
