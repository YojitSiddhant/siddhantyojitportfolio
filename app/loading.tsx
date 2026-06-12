export default function Loading() {
  return (
    <main className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[var(--background)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[18rem] bg-[var(--background)]" />

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 pb-10 pt-5 sm:px-6 sm:pb-12 sm:pt-6 lg:px-8 lg:pt-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)] px-1 py-4">
          <div className="h-4 w-28 animate-pulse rounded-full bg-[var(--accent-soft)]" />
          <div className="h-4 w-40 animate-pulse rounded-full bg-[var(--accent-soft)]" />
        </div>

        <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5 px-1 py-2">
            <div className="h-20 w-full max-w-4xl animate-pulse rounded-[2rem] bg-[var(--accent-soft)] sm:h-28" />
            <div className="h-6 w-full max-w-2xl animate-pulse rounded-full bg-[var(--accent-soft)]" />
            <div className="grid gap-3 border-t border-[var(--border)] pt-4 sm:grid-cols-2">
              <div className="h-20 animate-pulse rounded-[1.5rem] bg-[var(--accent-soft)]" />
              <div className="h-20 animate-pulse rounded-[1.5rem] bg-[var(--accent-soft)]" />
            </div>
            <div className="space-y-3 border-t border-[var(--border)] pt-4">
              <div className="h-4 w-28 animate-pulse rounded-full bg-[var(--accent-soft)]" />
              <div className="space-y-3">
                <div className="h-16 animate-pulse rounded-[1.5rem] bg-[var(--accent-soft)]" />
                <div className="h-16 animate-pulse rounded-[1.5rem] bg-[var(--accent-soft)]" />
                <div className="h-16 animate-pulse rounded-[1.5rem] bg-[var(--accent-soft)]" />
              </div>
            </div>
          </div>

          <div className="space-y-4 px-1 py-2">
            <div className="h-10 animate-pulse rounded-full border border-[var(--border)] bg-[var(--surface)]" />
            <div className="h-[32rem] animate-pulse rounded-[2rem] border border-[var(--border)] bg-[var(--surface)]" />
          </div>
        </section>
      </section>
    </main>
  );
}
