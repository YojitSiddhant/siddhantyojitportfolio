"use client";

import type { MouseEvent } from "react";
import type { AcademicProjectContent } from "@/components/projects/AcademicProjectContent";

type AcademicProjectCardProps = {
  project: AcademicProjectContent;
  index: number;
  onOpen: (project: AcademicProjectContent, trigger: HTMLElement) => void;
};

export function AcademicProjectCard({ project, index, onOpen }: AcademicProjectCardProps) {
  const openDetails = (event: MouseEvent<HTMLElement>) => {
    onOpen(project, event.currentTarget);
  };

  return (
    <article
      className="grid gap-4 border-b border-border pb-5 motion-reveal lg:grid-cols-2 lg:items-start lg:gap-8"
      style={{ animationDelay: `${220 + index * 120}ms` }}
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-border bg-surface px-3 py-2 text-xs font-black uppercase tracking-widest text-foreground">
            {project.badge}
          </span>
          <button
            type="button"
            onClick={openDetails}
            className="mt-1 text-left text-xl font-bold tracking-normal text-foreground transition-colors hover:text-accent"
          >
            {project.title}
          </button>
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-1 text-sm text-foreground lg:justify-self-end lg:text-right">
        <button
          type="button"
          onClick={openDetails}
          className="inline-flex items-center justify-center rounded-full border border-border px-3 py-1 text-xs font-black uppercase tracking-widest text-foreground transition-colors hover:border-accent hover:text-accent sm:justify-self-end"
        >
          View Details
        </button>
      </div>
    </article>
  );
}
