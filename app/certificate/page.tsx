import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certificate | Siddhant Yojit",
  description: "Certificates for Siddhant Yojit.",
};

function CertificateBadgeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M7 5.5A1.5 1.5 0 0 1 8.5 4h7A1.5 1.5 0 0 1 17 5.5v8A1.5 1.5 0 0 1 15.5 15h-7A1.5 1.5 0 0 1 7 13.5v-8Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M9 18.5 10.5 15l1.5 1 1.5-1 1.5 3.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9.5 7.5h5M9.5 10h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function CertificatePage() {
  return (
    <main className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(0,0,0,0.01),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(0,0,0,0.008),_transparent_28%),radial-gradient(circle_at_bottom,_rgba(0,0,0,0.004),_transparent_36%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[18rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.78)_0%,rgba(255,255,255,0.56)_70%,rgba(255,255,255,0.18)_100%)]" />

      <section className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 pb-10 pt-5 sm:px-6 sm:pb-12 sm:pt-6 lg:px-8 lg:pt-8 motion-reveal">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)] px-1 py-4 motion-reveal" style={{ animationDelay: "80ms" }}>
          <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.24em] text-[var(--foreground)]">
            <CertificateBadgeIcon className="h-4 w-4 text-[var(--accent)]" />
            Certificate
          </div>
          <div className="text-sm font-black text-[var(--foreground)]">Coming soon</div>
        </div>

        <section className="grid gap-5 px-1 py-2 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-5 motion-reveal" style={{ animationDelay: "160ms" }}>
            <h1 className="max-w-3xl text-[clamp(2.8rem,6.5vw,5.4rem)] font-semibold tracking-tight text-[var(--foreground)] text-balance leading-[0.96]">
              Certificates will be added here soon.
            </h1>
            <p className="max-w-2xl text-[1rem] leading-7 text-[var(--muted)] text-pretty sm:text-[1.05rem]">
              This page will showcase my certificates, training records, and achievement badges once they are ready to publish.
            </p>

            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-[var(--foreground)] shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
              Coming soon
            </div>
          </div>

          <div className="motion-reveal" style={{ animationDelay: "220ms" }}>
            <article className="flex min-h-[20rem] items-center justify-center rounded-[2rem] border border-[var(--border)] bg-[var(--surface-strong)] px-6 py-10 text-center shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
              <div className="max-w-md space-y-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[var(--border)] bg-white text-[var(--accent)]">
                  <CertificateBadgeIcon className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">Certificate gallery incoming</h2>
                <p className="text-base text-[var(--muted)]">
                  I&apos;m preparing a dedicated space for certificates so they can be displayed in a clean and organized way.
                </p>
              </div>
            </article>
          </div>
        </section>
      </section>
    </main>
  );
}
