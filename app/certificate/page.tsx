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
    <main className="relative isolate overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-background" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-background" />

      <section className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 pb-10 pt-5 sm:px-6 sm:pb-12 sm:pt-6 lg:px-8 lg:pt-8 motion-reveal">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-1 py-4 motion-reveal" style={{ animationDelay: "80ms" }}>
          <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.24em] text-foreground">
            <CertificateBadgeIcon className="h-4 w-4 text-accent" />
            Certificates
          </div>
          <div className="text-sm font-black text-foreground">Completed learning</div>
        </div>

        <section className="px-1 py-2 motion-reveal" style={{ animationDelay: "160ms" }}>
          <div className="grid gap-5">
            {orderedCertificates.map((certificate, index) => (
              <article
                key={certificate.title}
                className="flex flex-col gap-4 border-b border-border pb-5 motion-reveal"
                style={{ animationDelay: `${220 + index * 120}ms` }}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.24em] text-foreground">
                    <DocumentIcon className="h-4 w-4 text-accent" />
                    Certificate
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    {certificate.logo ? (
                      <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
                        <Image
                          src={certificate.logo}
                          alt={`${certificate.issuer} logo`}
                          width={48}
                          height={48}
                          className="h-full w-full object-contain p-2"
                        />
                      </div>
                    ) : null}
                    <div className="min-w-0">
                      <h2 className="text-xl font-bold tracking-normal text-foreground">
                        {certificate.title}
                      </h2>
                      <p className="mt-1 text-sm font-black text-foreground">{certificate.issuer}</p>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-col gap-1 text-sm text-foreground">
                    <p>{certificate.issueDate}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
