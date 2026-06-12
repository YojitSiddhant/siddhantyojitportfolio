import Image from "next/image";
import type { Metadata } from "next";
import { certificates } from "@/data/certificates";

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

const orderedCertificates = [...certificates].sort((a, b) => a.order - b.order);

export default function CertificatePage() {
  return (
    <main className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(0,0,0,0.01),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(0,0,0,0.008),_transparent_28%),radial-gradient(circle_at_bottom,_rgba(0,0,0,0.004),_transparent_36%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[18rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.78)_0%,rgba(255,255,255,0.56)_70%,rgba(255,255,255,0.18)_100%)]" />

      <section className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 pb-10 pt-5 sm:px-6 sm:pb-12 sm:pt-6 lg:px-8 lg:pt-8 motion-reveal">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)] px-1 py-4 motion-reveal" style={{ animationDelay: "80ms" }}>
          <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.24em] text-[var(--foreground)]">
            <CertificateBadgeIcon className="h-4 w-4 text-[var(--accent)]" />
            Certificates
          </div>
          <div className="text-sm font-black text-[var(--foreground)]">Completed learning</div>
        </div>

        <section className="px-1 py-2 motion-reveal" style={{ animationDelay: "160ms" }}>
          <div className="grid gap-4 sm:grid-cols-2">
            {orderedCertificates.map((certificate, index) => (
              <article
                key={certificate.title}
                className="flex h-full flex-col gap-3 rounded-[1.5rem] border border-[var(--border)] bg-white/80 p-4 shadow-sm transition-transform motion-reveal hover:-translate-y-0.5"
                style={{ animationDelay: `${220 + index * 120}ms` }}
              >
                <div className="flex items-start gap-3">
                  {certificate.logo ? (
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-sm">
                      <Image
                        src={certificate.logo}
                        alt={`${certificate.issuer} logo`}
                        width={48}
                        height={48}
                        className="h-full w-full object-contain p-2"
                      />
                    </div>
                  ) : null}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.24em] text-[var(--foreground)]">
                      <DocumentIcon className="h-4 w-4 text-[var(--accent)]" />
                      Certificate
                    </div>
                    <h2 className="mt-2 text-lg font-bold tracking-tight text-[var(--foreground)]">
                      {certificate.title}
                    </h2>
                  </div>
                </div>

                <div className="grid gap-1 border-t border-[var(--border)] pt-3 text-sm text-[var(--foreground)]">
                  <p className="font-black text-[var(--foreground)]">{certificate.issuer}</p>
                  <p>{certificate.issueDate}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
