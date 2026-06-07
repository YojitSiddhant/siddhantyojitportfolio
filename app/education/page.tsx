import Image from "next/image";
import type { Metadata } from "next";
import { getCmsSnapshot } from "@/lib/cms";

export const dynamic = "force-dynamic";

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

export default async function EducationPage() {
  const { education } = await getCmsSnapshot();

  return (
    <main className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(0,0,0,0.01),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(0,0,0,0.008),_transparent_28%),radial-gradient(circle_at_bottom,_rgba(0,0,0,0.004),_transparent_36%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[18rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.78)_0%,rgba(255,255,255,0.56)_70%,rgba(255,255,255,0.18)_100%)]" />

      <section className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 pb-10 pt-5 sm:px-6 sm:pb-12 sm:pt-6 lg:px-8 lg:pt-8 motion-reveal">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)] px-1 py-4 motion-reveal" style={{ animationDelay: "80ms" }}>
          <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.24em] text-[var(--foreground)]">
            <BookIcon className="text-[var(--accent)]" />
            Education
          </div>
          <div className="text-sm font-black text-[var(--foreground)]">Academic background</div>
        </div>

        <section className="px-1 py-2 motion-reveal" style={{ animationDelay: "160ms" }}>
          <div className="grid gap-5">
            {education.map((item, index) => (
              <article
                key={`${item.degree}-${item.institute}`}
                className="flex flex-col gap-2 border-b border-[var(--border)] pb-5 sm:flex-row sm:items-center sm:justify-between motion-reveal"
                style={{ animationDelay: `${220 + index * 120}ms` }}
              >
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--foreground)]">
                    {item.degree}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    {item.logo ? (
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-sm">
                        <Image
                          src={item.logo}
                          alt={`${item.institute} logo`}
                          width={48}
                          height={48}
                          className="h-full w-full object-contain p-1"
                        />
                      </div>
                    ) : null}
                    <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)]">
                      {item.institute}
                    </h2>
                  </div>
                </div>

                <div className="flex flex-col gap-1 text-sm text-[var(--foreground)] sm:min-w-[8rem] sm:text-right">
                  <p>{item.duration}</p>
                  <p className="font-black text-[var(--foreground)]">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
