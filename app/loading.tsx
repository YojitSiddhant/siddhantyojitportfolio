export default function Loading() {
  return (
    <main className="relative isolate overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-background" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-background" />

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 pb-10 pt-5 sm:px-6 sm:pb-12 sm:pt-6 lg:px-8 lg:pt-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-1 py-4">
          <div className="h-4 w-28 animate-pulse rounded-full bg-accent-soft" />
          <div className="h-4 w-40 animate-pulse rounded-full bg-accent-soft" />
        </div>

        <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5 px-1 py-2">
            <div className="h-20 w-full max-w-4xl animate-pulse rounded-4xl bg-accent-soft sm:h-28" />
            <div className="h-6 w-full max-w-2xl animate-pulse rounded-full bg-accent-soft" />
            <div className="grid gap-3 border-t border-border pt-4 sm:grid-cols-2">
              <div className="h-20 animate-pulse rounded-3xl bg-accent-soft" />
              <div className="h-20 animate-pulse rounded-3xl bg-accent-soft" />
            </div>
            <div className="space-y-3 border-t border-border pt-4">
              <div className="h-4 w-28 animate-pulse rounded-full bg-accent-soft" />
              <div className="space-y-3">
                <div className="h-16 animate-pulse rounded-3xl bg-accent-soft" />
                <div className="h-16 animate-pulse rounded-3xl bg-accent-soft" />
                <div className="h-16 animate-pulse rounded-3xl bg-accent-soft" />
              </div>
            </div>
          </div>

          <div className="space-y-4 px-1 py-2">
            <div className="h-10 animate-pulse rounded-full border border-border bg-surface" />
            <div className="h-128 animate-pulse rounded-4xl border border-border bg-surface" />
          </div>
        </section>
      </section>
    </main>
  );
}
