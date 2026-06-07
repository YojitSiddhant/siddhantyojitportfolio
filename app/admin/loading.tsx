export default function Loading() {
  return (
    <main className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(0,0,0,0.01),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(0,0,0,0.008),_transparent_28%),radial-gradient(circle_at_bottom,_rgba(0,0,0,0.004),_transparent_36%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[18rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.78)_0%,rgba(255,255,255,0.56)_70%,rgba(255,255,255,0.18)_100%)]" />

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pb-10 pt-5 sm:px-6 sm:pb-12 sm:pt-6 lg:px-8 lg:pt-8">
        <div className="rounded-[2rem] border border-[var(--border)] bg-white p-5 shadow-[0_16px_40px_rgba(0,0,0,0.06)] sm:p-6">
          <div className="h-4 w-32 animate-pulse rounded-full bg-[var(--accent-soft)]" />
          <div className="mt-3 h-8 w-56 animate-pulse rounded-full bg-[var(--accent-soft)]" />
          <div className="mt-4 h-4 w-full max-w-3xl animate-pulse rounded-full bg-[var(--accent-soft)]" />
          <div className="mt-6 flex flex-wrap gap-2">
            <div className="h-8 w-24 animate-pulse rounded-full bg-[var(--accent-soft)]" />
            <div className="h-8 w-20 animate-pulse rounded-full bg-[var(--accent-soft)]" />
            <div className="h-8 w-24 animate-pulse rounded-full bg-[var(--accent-soft)]" />
            <div className="h-8 w-28 animate-pulse rounded-full bg-[var(--accent-soft)]" />
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)]">
          <div className="rounded-[2rem] border border-[var(--border)] bg-white p-5 shadow-[0_16px_40px_rgba(0,0,0,0.06)] sm:p-6">
            <div className="h-6 w-44 animate-pulse rounded-full bg-[var(--accent-soft)]" />
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="h-32 animate-pulse rounded-[1.5rem] bg-[var(--accent-soft)]" />
              <div className="h-32 animate-pulse rounded-[1.5rem] bg-[var(--accent-soft)]" />
              <div className="h-32 animate-pulse rounded-[1.5rem] bg-[var(--accent-soft)]" />
              <div className="h-32 animate-pulse rounded-[1.5rem] bg-[var(--accent-soft)]" />
            </div>
          </div>

          <div className="rounded-[2rem] border border-[var(--border)] bg-white p-5 shadow-[0_16px_40px_rgba(0,0,0,0.06)] sm:p-6">
            <div className="h-6 w-40 animate-pulse rounded-full bg-[var(--accent-soft)]" />
            <div className="mt-4 space-y-3">
              <div className="h-20 animate-pulse rounded-[1.5rem] bg-[var(--accent-soft)]" />
              <div className="h-20 animate-pulse rounded-[1.5rem] bg-[var(--accent-soft)]" />
              <div className="h-20 animate-pulse rounded-[1.5rem] bg-[var(--accent-soft)]" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
