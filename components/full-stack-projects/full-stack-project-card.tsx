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
      className="flex h-full flex-col rounded-3xl border border-border bg-surface px-5 py-5 shadow-sm motion-reveal"
      style={{ animationDelay: `${220 + index * 120}ms` }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-foreground">
            <span className="inline-flex h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
            {project.category}
          </div>
          <h2 className="mt-2 text-xl font-bold tracking-normal text-foreground">{project.title}</h2>
        </div>

        <Badge className="bg-accent-soft text-accent-strong">{project.status}</Badge>
      </div>

      <p className="mt-4 text-sm leading-7 text-foreground">{project.summary}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.techStack.map((technology) => (
          <Badge key={`${project.title}-${technology}`}>{technology}</Badge>
        ))}
      </div>

      <div className="mt-5 border-t border-border pt-4">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-black uppercase tracking-widest text-foreground transition-colors hover:border-accent hover:bg-accent-soft"
          aria-expanded={isExpanded}
          aria-controls={detailsId}
          onClick={() => setIsExpanded((current) => !current)}
        >
          {isExpanded ? "Hide Details" : "View Details"}
        </button>

        <div
          id={detailsId}
          className="grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out"
          style={{
            gridTemplateRows: isExpanded ? "1fr" : "0fr",
            opacity: isExpanded ? 1 : 0,
          }}
          aria-hidden={!isExpanded}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="mt-5 grid gap-5 motion-reveal-fade">
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

      <div className="mt-auto flex flex-wrap gap-2 pt-5">
        <ActionButton disabled>GitHub</ActionButton>
        {project.liveDemoUrl ? <ActionButton href={project.liveDemoUrl}>Live Demo</ActionButton> : null}
      </div>
    </article>
  );
}
