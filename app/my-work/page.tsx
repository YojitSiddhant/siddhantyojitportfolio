import Image from "next/image";
import type { Metadata } from "next";
import { PageSectionHeader } from "@/components/page-section-header";
import { PageShell } from "@/components/page-shell";
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

function VisitSiteButton({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="work-visit-button"
      aria-label="Visit site"
    >
      Visit Site
      <span aria-hidden="true" />
    </a>
  );
}

const sortedWorkItems = [...workItems].sort((a, b) => a.order - b.order);

export default function MyWorkPage() {
  return (
    <PageShell maxWidthClassName="max-w-none">
      <PageSectionHeader
        className="motion-reveal"
        style={{ animationDelay: "80ms" }}
        left={
          <div className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-foreground">
            <WorkIcon className="h-4 w-4 text-accent" />
            My Work
          </div>
        }
        right={<div className="text-sm font-black text-foreground sm:text-right">Featured work</div>}
      />

      <section className="motion-reveal" style={{ animationDelay: "160ms" }}>
        <div className="flex flex-wrap gap-4">
          {sortedWorkItems.map((item, index) => (
            <article
              key={item.title}
              className="flex w-full grow basis-full flex-col items-center justify-center gap-5 rounded-2xl border border-border bg-surface p-6 shadow-card motion-reveal md:basis-[calc(50%-0.5rem)] lg:basis-[calc(25%-0.75rem)]"
              style={{ animationDelay: `${220 + index * 120}ms` }}
            >
              <div className="flex w-full flex-col items-center gap-4 text-center">
                {item.logo ? (
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
                    <Image
                      src={item.logo}
                      alt={`${item.title} logo`}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover"
                      priority={index === 0}
                    />
                  </div>
                ) : (
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-dashed border-border bg-surface text-xs font-black uppercase tracking-widest text-muted shadow-sm">
                    Photo
                  </div>
                )}

                <h2 className="text-lg font-bold tracking-normal text-foreground">{item.title}</h2>

                {item.links.length > 0 ? <VisitSiteButton href={item.links[0].url} /> : null}
              </div>

              {Array.isArray(item.links) && item.links.length > 1 ? (
                <div className="mt-auto flex w-full flex-wrap justify-center gap-2 pt-1">
                  {(item.links as Array<{ label: string; url: string }>).slice(1).map((link) => (
                    <a
                      key={`${item.title}-${link.label}`}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-black uppercase tracking-widest text-foreground transition-colors hover:border-accent hover:text-accent"
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
    </PageShell>
  );
}
