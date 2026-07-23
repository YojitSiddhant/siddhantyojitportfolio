import { PageShell } from "@/components/page-shell";

export default function Loading() {
  return (
    <PageShell animated={false}>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-1 py-4">
        <div className="h-4 w-40 animate-pulse rounded-full bg-accent-soft" />
        <div className="h-4 w-28 animate-pulse rounded-full bg-accent-soft" />
      </div>

      <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4 border-t border-border px-1 py-4">
          <div className="flex items-center gap-4">
            <div className="h-28 w-28 animate-pulse rounded-3xl bg-accent-soft" />
            <div className="flex-1 space-y-3">
              <div className="h-4 w-24 animate-pulse rounded-full bg-accent-soft" />
              <div className="h-16 w-full animate-pulse rounded-3xl bg-accent-soft" />
              <div className="h-4 w-28 animate-pulse rounded-full bg-accent-soft" />
              <div className="h-5 w-full max-w-md animate-pulse rounded-full bg-accent-soft" />
            </div>
          </div>
          <div className="h-12 w-56 animate-pulse rounded-full bg-accent-soft" />
        </div>

        <div className="space-y-4 border-t border-border px-1 py-4">
          <div className="h-4 w-40 animate-pulse rounded-full bg-accent-soft" />
          <div className="rounded-3xl border border-border bg-surface px-4 py-4">
            <div className="grid grid-flow-col grid-rows-7 gap-1.5">
              {Array.from({ length: 35 }).map((_, index) => (
                <div key={index} className="h-3.5 w-3.5 animate-pulse rounded-sm bg-accent-soft" />
              ))}
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="h-28 animate-pulse rounded-3xl bg-accent-soft" />
            <div className="h-28 animate-pulse rounded-3xl bg-accent-soft" />
            <div className="h-28 animate-pulse rounded-3xl bg-accent-soft" />
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-24 animate-pulse rounded-3xl border border-border bg-surface" />
        ))}
      </section>

      <section className="grid gap-5">
        <div className="h-4 w-48 animate-pulse rounded-full bg-accent-soft" />
        <div className="h-64 animate-pulse rounded-3xl border border-border bg-surface" />
        <div className="h-64 animate-pulse rounded-3xl border border-border bg-surface" />
      </section>
    </PageShell>
  );
}
