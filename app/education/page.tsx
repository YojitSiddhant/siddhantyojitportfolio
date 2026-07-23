import Image from "next/image";
import type { Metadata } from "next";
import { PageSectionHeader } from "@/components/page-section-header";
import { PageShell } from "@/components/page-shell";
import { education } from "@/data/education";

export const metadata: Metadata = {
  title: "Education | Siddhant Yojit",
  description: "Education details for Siddhant Yojit.",
};

function BookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`h-5 w-5 ${className ?? ""}`}
      fill="none"
    >
      <path
        d="M6.5 4.5h11A1.5 1.5 0 0 1 19 6v13.5a.5.5 0 0 1-.8.4c-1-.7-2.3-1.1-3.7-1.1H6.5A1.5 1.5 0 0 1 5 17.3V6a1.5 1.5 0 0 1 1.5-1.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M8 8h6.5M8 11h6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function EducationPage() {
  return (
    <PageShell>
      <PageSectionHeader
        className="motion-reveal"
        style={{ animationDelay: "80ms" }}
        left={
          <div className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-foreground">
            <BookIcon className="text-accent" />
            Education
          </div>
        }
        right={<div className="text-sm font-black text-foreground">Academic background</div>}
      />

      <section className="px-1 py-2 motion-reveal" style={{ animationDelay: "160ms" }}>
        <div className="grid gap-5">
          {education.map((item, index) => (
            <article
              key={`${item.degree}-${item.institute}`}
              className="flex flex-col gap-2 border-b border-border pb-5 sm:flex-row sm:items-center sm:justify-between motion-reveal"
              style={{ animationDelay: `${220 + index * 120}ms` }}
            >
              <div className="min-w-0 flex-1">
                <p className="text-xs font-black uppercase tracking-widest text-foreground">
                  {item.degree}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  {item.logo ? (
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
                      <Image
                        src={item.logo}
                        alt={`${item.institute} logo`}
                        width={48}
                        height={48}
                        className="h-full w-full object-contain p-1"
                      />
                    </div>
                  ) : null}
                  <h2 className="text-xl font-bold tracking-normal text-foreground">
                    {item.institute}
                  </h2>
                </div>
              </div>

              <div className="flex flex-col gap-1 text-sm text-foreground sm:min-w-[8rem] sm:text-right">
                <p>{item.duration}</p>
                <p className="font-black text-foreground">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
