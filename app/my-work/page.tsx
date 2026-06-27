import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { workItems } from "@/data/work";

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

function ReactIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <ellipse cx="12" cy="12" rx="8.2" ry="3.2" stroke="currentColor" strokeWidth="1.6" />
      <ellipse cx="12" cy="12" rx="8.2" ry="3.2" stroke="currentColor" strokeWidth="1.6" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="8.2" ry="3.2" stroke="currentColor" strokeWidth="1.6" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="1.8" fill="currentColor" />
    </svg>
  );
}

const sortedWorkItems = [...workItems].sort((a, b) => a.order - b.order);

export default function MyWorkPage() {
  return (
    <main className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[var(--background)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[18rem] bg-[var(--background)]" />

      <section className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 pb-10 pt-5 sm:px-6 sm:pb-12 sm:pt-6 lg:px-8 lg:pt-8 motion-reveal">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)] px-1 py-4 motion-reveal" style={{ animationDelay: "80ms" }}>
          <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.24em] text-[var(--foreground)]">
            <WorkIcon className="h-4 w-4 text-[var(--accent)]" />
            My Work
          </div>
          <div className="text-sm font-black text-[var(--foreground)]">Featured work</div>
        </div>

        <section className="px-1 py-2 motion-reveal" style={{ animationDelay: "160ms" }}>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {sortedWorkItems.map((item, index) => (
              <article
                key={item.title}
                className="flex h-full flex-col items-center gap-4 motion-reveal"
                style={{ animationDelay: `${220 + index * 120}ms` }}
              >
                <div className="flex w-full flex-col items-center gap-3 text-center">
                  {item.logo ? (
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm">
                      <Image
                        src={item.logo}
                        alt={`${item.title} logo`}
                        width={48}
                        height={48}
                        className="h-full w-full object-cover"
                        priority={index === 0}
                      />
                    </div>
                  ) : (
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface)] text-[10px] font-black uppercase tracking-[0.18em] text-[var(--muted)] shadow-sm">
                      Photo
                    </div>
                  )}

                  <div className="min-w-0">
                    {item.links.length > 0 ? (
                      <Link
                        href={item.links[0].url}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-center gap-2 text-xl font-bold tracking-normal text-[var(--foreground)]"
                      >
                        <span className="text-[var(--foreground)] transition-colors duration-300 group-hover:text-[var(--accent)]">
                          {item.title}
                        </span>
                      </Link>
                    ) : (
                      <h2 className="text-xl font-bold tracking-normal text-[var(--foreground)]">{item.title}</h2>
                    )}
                  </div>
                </div>

                {item.summary ? <p className="text-sm leading-7 text-[var(--muted)]">{item.summary}</p> : null}

                {Array.isArray(item.screenshots) && item.screenshots.length > 0 ? (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {(item.screenshots as string[]).map((screenshot) => (
                      <div key={screenshot} className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--background)]">
                        <img src={screenshot} alt={`${item.title} screenshot`} className="h-44 w-full object-cover" loading="lazy" />
                      </div>
                    ))}
                  </div>
                ) : null}

                {Array.isArray(item.links) && item.links.length > 1 ? (
                  <div className="mt-auto flex w-full flex-wrap justify-center gap-2 pt-1">
                    {(item.links as Array<{ label: string; url: string }>).slice(1).map((link) => (
                      <a
                        key={`${item.title}-${link.label}`}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                      >
                        <ReactIcon className="h-3.5 w-3.5" />
                        {link.label}
                      </a>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
