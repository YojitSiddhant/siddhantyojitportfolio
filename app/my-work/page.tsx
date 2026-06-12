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
  const buildingNotes = [
    "Expanding full-stack portfolio",
    "Improving backend skills",
    "Exploring testing workflows",
    "Building practical business-oriented interfaces",
  ];

  const placeholderCards = [
    "Expanding full-stack portfolio",
    "Improving backend skills",
    "Exploring testing workflows",
    "Building practical business-oriented interfaces",
  ];

  return (
    <main className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(0,0,0,0.01),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(0,0,0,0.008),_transparent_28%),radial-gradient(circle_at_bottom,_rgba(0,0,0,0.004),_transparent_36%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[18rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.78)_0%,rgba(255,255,255,0.56)_70%,rgba(255,255,255,0.18)_100%)]" />

      <section className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 pb-10 pt-5 sm:px-6 sm:pb-12 sm:pt-6 lg:px-8 lg:pt-8 motion-reveal">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)] px-1 py-4 motion-reveal" style={{ animationDelay: "80ms" }}>
          <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.24em] text-[var(--foreground)]">
            <WorkIcon className="h-4 w-4 text-[var(--accent)]" />
            Currently Building
          </div>
          <div className="text-sm font-black text-[var(--foreground)]">More coming soon</div>
        </div>

        <section className="px-1 py-2 motion-reveal" style={{ animationDelay: "160ms" }}>
          <div className="grid gap-5">
            <article className="border-b border-[var(--border)] pb-5 motion-reveal" style={{ animationDelay: "240ms" }}>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--foreground)]">Focus areas</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {buildingNotes.map((note) => (
                  <div key={note} className="flex items-start gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-4">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
                    <p className="text-sm leading-7 text-[var(--foreground)]">{note}</p>
                  </div>
                ))}
              </div>
            </article>

            <div className="grid gap-4 sm:grid-cols-2">
              {placeholderCards.map((item, index) => (
                <article
                  key={`${item}-${index}`}
                  className="flex h-full flex-col gap-3 rounded-[1.5rem] border border-[var(--border)] bg-white/80 p-4 shadow-sm motion-reveal"
                  style={{ animationDelay: `${280 + index * 100}ms` }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--foreground)]">More coming soon</p>
                    <span className="rounded-full border border-[var(--border)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--accent-strong)]">
                      Draft
                    </span>
                  </div>
                  <h2 className="text-lg font-bold tracking-tight text-[var(--foreground)]">More coming soon</h2>
                  <p className="text-sm leading-7 text-[var(--muted)]">{item}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
