import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Work | Siddhant Yojit",
  description: "My work page for Siddhant Yojit.",
};

function WorkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M9 7V6a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3v1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M4 9.5A1.5 1.5 0 0 1 5.5 8h13A1.5 1.5 0 0 1 20 9.5v8A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5v-8Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M4 13h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9.5 13.5V15h5v-1.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function MyWorkPage() {
  return (
    <main className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(0,0,0,0.01),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(0,0,0,0.008),_transparent_28%),radial-gradient(circle_at_bottom,_rgba(0,0,0,0.004),_transparent_36%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[18rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.78)_0%,rgba(255,255,255,0.56)_70%,rgba(255,255,255,0.18)_100%)]" />

      <section className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 pb-10 pt-5 sm:px-6 sm:pb-12 sm:pt-6 lg:px-8 lg:pt-8 motion-reveal">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)] px-1 py-4 motion-reveal" style={{ animationDelay: "80ms" }}>
          <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.24em] text-[var(--foreground)]">
            <WorkIcon className="h-4 w-4 text-[var(--accent)]" />
            My Work
          </div>
          <div className="text-sm font-black text-[var(--foreground)]">Coming soon</div>
        </div>

        <section className="px-1 py-2 motion-reveal" style={{ animationDelay: "160ms" }}>
          <div className="grid gap-5">
            <article className="flex flex-col gap-2 border-b border-[var(--border)] pb-5 motion-reveal" style={{ animationDelay: "220ms" }}>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--foreground)]">Portfolio Section</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl">
                My Work is coming soon.
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg sm:leading-8">
                I&apos;m preparing this space to showcase selected work, experiments, and future portfolio pieces in the same clean style as the rest of the site.
              </p>
            </article>
          </div>
        </section>
      </section>
    </main>
  );
}
