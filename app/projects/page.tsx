/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { PageSectionHeader } from "@/components/page-section-header";
import { PageShell } from "@/components/page-shell";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects | Siddhant Yojit",
  description: "Projects for Siddhant Yojit.",
};

function ProjectsIcon({ className }: { className?: string }) {
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
    </svg>
  );
}

function TechIcon({ src, name, className }: { src: string; name: string; className?: string }) {
  return (
    <img
      src={src}
      alt={`${name} logo`}
      className={`shrink-0 object-contain ${className ?? "h-5 w-5"}`}
      loading="lazy"
      referrerPolicy="no-referrer"
    />
  );
}

export default function ProjectsPage() {
  return (
    <PageShell>
      <PageSectionHeader
        className="motion-reveal"
        style={{ animationDelay: "80ms" }}
        left={
          <div className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-foreground">
            <ProjectsIcon className="h-4 w-4 text-accent" />
            Projects
          </div>
        }
        right={<div className="text-sm font-black text-foreground">Resume projects</div>}
      />

      <section className="px-1 py-2 motion-reveal" style={{ animationDelay: "160ms" }}>
        <div className="grid gap-5">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className="grid gap-4 border-b border-border pb-5 motion-reveal lg:grid-cols-2 lg:items-start lg:gap-8"
              style={{ animationDelay: `${220 + index * 120}ms` }}
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="mt-1 text-xl font-bold tracking-normal text-foreground">
                    {project.title}
                  </h2>
                  {project.featured ? (
                    <span className="rounded-full border border-border bg-accent-soft px-3 py-1 text-xs font-black uppercase tracking-widest text-accent-strong">
                      Featured
                    </span>
                  ) : null}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(project.stack as Array<{ name: string; src: string; iconClassName?: string }>).map(({ name, src, iconClassName }) => (
                    <span
                      key={name}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-2 text-xs font-black uppercase tracking-widest text-foreground"
                    >
                      <TechIcon src={src} name={name} className={iconClassName} />
                      <span>{name}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex min-w-0 flex-col gap-1 text-sm text-foreground lg:justify-self-end lg:text-right">
                <p>{project.description}</p>
                <div className="mt-3 flex flex-wrap gap-2 sm:justify-end">
                  {project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-border px-3 py-1 text-xs font-black uppercase tracking-widest text-foreground transition-colors hover:border-accent hover:text-accent"
                    >
                      GitHub
                    </a>
                  ) : null}
                  {project.liveLink ? (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-border px-3 py-1 text-xs font-black uppercase tracking-widest text-foreground transition-colors hover:border-accent hover:text-accent"
                    >
                      Live
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
