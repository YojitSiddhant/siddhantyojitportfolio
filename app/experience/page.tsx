import Image from "next/image";
import type { Metadata } from "next";
import { experience } from "@/data/experience";

export const metadata: Metadata = {
  title: "Experience | Siddhant Yojit",
  description: "Experience details for Siddhant Yojit.",
};

function TimelineIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path d="M5 6h14M5 12h9M5 18h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="18" cy="12" r="1.4" fill="currentColor" />
    </svg>
  );
}

function BriefcaseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M9 7V6a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3v1"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M4 9.5A1.5 1.5 0 0 1 5.5 8h13A1.5 1.5 0 0 1 20 9.5v8A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5v-8Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M4 13h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M12 21s6-5.1 6-10.2A6 6 0 1 0 6 10.8C6 15.9 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10.5" r="2.2" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function BulletIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <circle cx="12" cy="12" r="2.2" fill="currentColor" />
    </svg>
  );
}

export default function ExperiencePage() {
  return (
    <main className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(0,0,0,0.01),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(0,0,0,0.008),_transparent_28%),radial-gradient(circle_at_bottom,_rgba(0,0,0,0.004),_transparent_36%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[18rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.78)_0%,rgba(255,255,255,0.56)_70%,rgba(255,255,255,0.18)_100%)]" />

      <section className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 pb-10 pt-5 sm:px-6 sm:pb-12 sm:pt-6 lg:px-8 lg:pt-8 motion-reveal">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)] px-1 py-4 motion-reveal" style={{ animationDelay: "80ms" }}>
          <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.24em] text-[var(--foreground)]">
            <TimelineIcon className="h-4 w-4 text-[var(--accent)]" />
            Experience
          </div>
          <div className="text-sm font-black text-[var(--foreground)]">Work history</div>
        </div>

        <section className="px-1 py-2 motion-reveal" style={{ animationDelay: "160ms" }}>
          <div className="grid gap-5">
            {experience.map((item, index) => (
              <article
                key={`${item.role}-${item.company}`}
                className="flex flex-col gap-4 border-b border-[var(--border)] pb-5 motion-reveal"
                style={{ animationDelay: `${220 + index * 120}ms` }}
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.24em] text-[var(--foreground)]">
                      <BriefcaseIcon className="h-4 w-4 text-[var(--accent)]" />
                      {item.role}
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-3">
                      {item.logo ? (
                        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-sm">
                          <Image
                            src={item.logo}
                            alt={`${item.company} logo`}
                            width={48}
                            height={48}
                            className="h-full w-full object-cover"
                            priority
                          />
                        </div>
                      ) : null}
                      <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)]">
                        {item.company}
                      </h2>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 text-sm text-[var(--foreground)] sm:min-w-[10rem] sm:text-right">
                    <p>{item.duration}</p>
                    <p className="inline-flex items-center gap-2 font-black text-[var(--foreground)] sm:justify-end">
                      <MapPinIcon className="h-4 w-4 text-[var(--accent)]" />
                      Bengaluru, India
                    </p>
                  </div>
                </div>

                <div className="grid gap-3 border-t border-[var(--border)] pt-4">
                  {item.description
                    .split(/\r?\n/)
                    .map((highlight) => highlight.trim())
                    .filter(Boolean)
                    .map((highlight) => (
                    <div key={highlight} className="flex gap-3">
                      <BulletIcon className="mt-1 h-4 w-4 shrink-0 text-[var(--accent)]" />
                      <p className="text-sm leading-7 text-[var(--foreground)]">{highlight}</p>
                    </div>
                  ))}
                  {Array.isArray(item.technologies) && item.technologies.length > 0 ? (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {(item.technologies as string[]).map((technology) => (
                        <span
                          key={`${item.company}-${technology}`}
                          className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--foreground)]"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
