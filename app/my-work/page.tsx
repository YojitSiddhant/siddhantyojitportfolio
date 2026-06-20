import Image from "next/image";
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
          <div className="grid gap-5">
            {workItems.map((item, index) => (
              <article
                key={item.title}
                className="flex flex-col gap-4 border-b border-[var(--border)] pb-5 motion-reveal"
                style={{ animationDelay: `${220 + index * 120}ms` }}
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--foreground)]">My Work</p>
                    <div className="mt-2 flex flex-wrap items-center gap-3">
                      {item.logo ? (
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm">
                          <Image
                            src={item.logo}
                            alt={`${item.title} logo`}
                            width={48}
                            height={48}
                            className="h-full w-full object-cover"
                            priority
                          />
                        </div>
                      ) : null}
                      <h2 className="text-xl font-bold tracking-normal text-[var(--foreground)]">
                        {item.title}
                      </h2>
                    </div>
                  </div>
                </div>

                {item.summary ? <p className="max-w-3xl text-base leading-7 text-[var(--muted)]">{item.summary}</p> : null}

                {Array.isArray(item.screenshots) && item.screenshots.length > 0 ? (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {(item.screenshots as string[]).map((screenshot) => (
                      <div key={screenshot} className="overflow-hidden rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)]">
                        <img src={screenshot} alt={`${item.title} screenshot`} className="h-56 w-full object-cover" loading="lazy" />
                      </div>
                    ))}
                  </div>
                ) : null}

                {Array.isArray(item.links) && item.links.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {(item.links as Array<{ label: string; url: string }>).map((link) => (
                      <a
                        key={`${item.title}-${link.label}`}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-[var(--border)] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                      >
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
