"use client";

import { useId, useState } from "react";
import type { ReactNode } from "react";
import type { FullStackProject } from "@/data/full-stack-projects";

type FullStackProjectCardProps = {
  project: FullStackProject;
  index: number;
};

function Badge({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={[
        "inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-xs font-black uppercase tracking-widest text-foreground",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </span>
  );
}

function SectionHeader({ children }: { children: ReactNode }) {
  return <h3 className="text-xs font-black uppercase tracking-widest text-foreground">{children}</h3>;
}

function DetailList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 grid gap-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
          <p className="text-sm leading-7 text-foreground">{item}</p>
        </li>
      ))}
    </ul>
  );
}

function ActionButton({
  children,
  href,
  disabled = false,
}: {
  children: ReactNode;
  href?: string;
  disabled?: boolean;
}) {
  const baseClassName =
    "inline-flex items-center justify-center rounded-full border border-border px-4 py-2 text-xs font-black uppercase tracking-widest text-foreground transition-colors hover:border-accent hover:bg-accent-soft hover:text-foreground";

  if (href && !disabled) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={baseClassName}>
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled}
      className={`${baseClassName} ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
      aria-disabled={disabled}
    >
      {children}
    </button>
  );
}

export function FullStackProjectCard({ project, index }: FullStackProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const detailsId = useId();

  return (
    <article
      className="grid gap-4 border-b border-border pb-5 motion-reveal lg:grid-cols-2 lg:items-start lg:gap-8"
      style={{ animationDelay: `${220 + index * 120}ms` }}
    >
      <div className="min-w-0 flex-1">
        <h2 className="mt-1 text-xl font-bold tracking-normal text-foreground">{project.title}</h2>
        <p className="mt-2 text-xs font-black uppercase tracking-widest text-foreground">
          {project.category}
          <span className="mx-2 text-muted" aria-hidden="true">
            ·
          </span>
          {project.status}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.techStack.map((technology) => (
            <Badge key={`${project.title}-${technology}`}>{technology}</Badge>
          ))}
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-1 text-sm text-foreground lg:justify-self-end lg:text-right">
        <p>{project.summary}</p>
        <div className="mt-3 flex flex-wrap gap-2 sm:justify-end">
          <button
            type="button"
            className="rounded-full border border-border px-3 py-1 text-xs font-black uppercase tracking-widest text-foreground transition-colors hover:border-accent hover:text-accent"
            aria-expanded={isExpanded}
            aria-controls={detailsId}
            onClick={() => setIsExpanded((current) => !current)}
          >
            {isExpanded ? "Hide" : "More"}
          </button>
          {project.githubUrl ? (
            <ActionButton href={project.githubUrl}>GitHub</ActionButton>
          ) : (
            <ActionButton disabled>GitHub</ActionButton>
          )}
          {project.liveDemoUrl ? <ActionButton href={project.liveDemoUrl}>Live</ActionButton> : null}
        </div>
      </div>

      <div className="lg:col-span-2">
        <div
          id={detailsId}
          className="grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out"
          style={{
            gridTemplateRows: isExpanded ? "1fr" : "0fr",
            opacity: isExpanded ? 1 : 0,
          }}
          aria-hidden={!isExpanded}
        >
          <div className="min-h-0 overflow-hidden border-t border-border pt-4">
            <div className="grid gap-5 motion-reveal-fade md:grid-cols-2">
              <div>
                <SectionHeader>Key Features</SectionHeader>
                <DetailList items={project.keyFeatures} />
              </div>

              <div>
                <SectionHeader>Architecture Highlights</SectionHeader>
                <DetailList items={project.architectureHighlights} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
