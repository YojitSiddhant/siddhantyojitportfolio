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
      className="grid gap-4 rounded-2xl border border-border bg-surface p-5 shadow-card sm:p-6 motion-reveal lg:grid-cols-2 lg:items-start lg:gap-8"
      style={{ animationDelay: `${220 + index * 120}ms` }}
    >
      <div className="min-w-0 flex-1">
        <button
          type="button"
          onClick={openDetails}
          className="w-full text-center text-xl font-bold tracking-normal text-foreground transition-colors hover:text-accent lg:text-left"
        >
          {project.title}
        </button>
      </div>

      <div className="flex min-w-0 justify-center lg:justify-self-end lg:justify-end">
        <button type="button" onClick={openDetails} className="view-detail-button sm:justify-self-end">
          View Details
        </button>
      </div>
    </article>
  );
}
