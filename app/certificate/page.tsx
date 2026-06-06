import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certificate | Siddhant Yojit",
  description: "Certificates for Siddhant Yojit.",
};

type CertificateItem = {
  title: string;
  issuer: string;
  note: string;
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

function DocumentIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M8 4.5h6l4 4V19A1.5 1.5 0 0 1 16.5 20h-8A1.5 1.5 0 0 1 7 18.5v-13A1.5 1.5 0 0 1 8.5 4h-.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M14 4.5V9h4.5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 12h6M9 15h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

const certificates: CertificateItem[] = [
  {
    title: "ChatGPT for Excel",
    issuer: "Certificate",
    note: "Practical AI-assisted spreadsheet workflow training.",
  },
  {
    title: "Data Visualization With Power BI",
    issuer: "Certificate",
    note: "Dashboarding and business intelligence visualization work.",
  },
  {
    title: "Google Bard for Microsoft Powerpoint",
    issuer: "Certificate",
    note: "Presentation workflow support using AI tools.",
  },
  {
    title: "Html In Hindi",
    issuer: "Certificate",
    note: "HTML fundamentals and front-end structure learning.",
  },
];

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
          <div className="text-sm font-black text-[var(--foreground)]">Selected certificates</div>
        </div>

        <section className="grid gap-5 px-1 py-2 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-5 motion-reveal" style={{ animationDelay: "160ms" }}>
            <h1 className="max-w-3xl text-[clamp(2.8rem,6.5vw,5.4rem)] font-semibold tracking-tight text-[var(--foreground)] text-balance leading-[0.96]">
              Certificates I have completed.
            </h1>
            <p className="max-w-2xl text-[1rem] leading-7 text-[var(--muted)] text-pretty sm:text-[1.05rem]">
              This page showcases my learning certificates in the same clean, minimal style as the rest of the portfolio.
            </p>

            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-[var(--foreground)] shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
              Portfolio section
            </div>
          </div>

          <div className="motion-reveal" style={{ animationDelay: "220ms" }}>
            <div className="grid gap-4">
              {certificates.map((certificate, index) => (
                <article
                  key={certificate.title}
                  className="group flex items-start gap-4 rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface-strong)] px-5 py-5 shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-transform duration-300 hover:-translate-y-0.5"
                  style={{ animationDelay: `${220 + index * 90}ms` }}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[var(--border)] bg-white text-[var(--accent)]">
                    <DocumentIcon className="h-6 w-6" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg font-bold tracking-tight text-[var(--foreground)]">
                        {certificate.title}
                      </h2>
                      <span className="rounded-full border border-[var(--border)] bg-white px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--muted)]">
                        {certificate.issuer}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                      {certificate.note}
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--foreground)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                      Coming soon
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
