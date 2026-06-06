import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certificate | Siddhant Yojit",
  description: "Certificates for Siddhant Yojit.",
};

type CertificateItem = {
  title: string;
  issuer: string;
  period: string;
  note: string;
  image: string;
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
    issuer: "Great Learning Academy",
    period: "Mar 2024",
    note: "Practical AI-assisted spreadsheet workflow training.",
    image: "/certificates/chatgpt-for-excel.png",
  },
  {
    title: "Data Visualization With Power BI",
    issuer: "Great Learning Academy",
    period: "Mar 2024",
    note: "Dashboarding and business intelligence visualization work.",
    image: "/certificates/data-visualization-with-power-bi.png",
  },
  {
    title: "Google Bard for Microsoft Powerpoint",
    issuer: "Great Learning Academy",
    period: "Mar 2024",
    note: "Presentation workflow support using AI tools.",
    image: "/certificates/google-bard-for-microsoft-powerpoint.png",
  },
  {
    title: "Html In Hindi",
    issuer: "Great Learning Academy",
    period: "Mar 2024",
    note: "HTML fundamentals and front-end structure learning.",
    image: "/certificates/html-in-hindi.png",
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
          <div className="text-sm font-black text-[var(--foreground)]">Completed learning</div>
        </div>

        <section className="px-1 py-2 motion-reveal" style={{ animationDelay: "160ms" }}>
          <div className="grid gap-5 md:grid-cols-2">
            {certificates.map((certificate, index) => (
              <article
                key={certificate.title}
                className="flex flex-col gap-4 motion-reveal"
                style={{ animationDelay: `${220 + index * 120}ms` }}
              >
                <div className="overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-white">
                  <Image
                    src={certificate.image}
                    alt={`${certificate.title} certificate screenshot`}
                    width={842}
                    height={595}
                    className="h-auto w-full rounded-[1.75rem] object-cover"
                    priority={index < 2}
                  />
                </div>

                <div className="flex flex-col gap-3 px-1 pb-1">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.24em] text-[var(--foreground)]">
                      <DocumentIcon className="h-4 w-4 text-[var(--accent)]" />
                      Certificate
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)]">
                      {certificate.title}
                    </h2>
                    <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--muted)]">
                      {certificate.period}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 text-sm text-[var(--foreground)]">
                    <p className="font-black text-[var(--foreground)]">{certificate.issuer}</p>
                    <p className="text-[var(--muted)]">{certificate.note}</p>
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
