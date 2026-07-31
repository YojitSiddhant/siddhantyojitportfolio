"use client";

import type { MouseEvent } from "react";
import type { AcademicProjectContent } from "@/components/projects/AcademicProjectContent";
import { GitHubButton } from "@/components/project-github-button";

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
        <button
          type="button"
          onClick={openDetails}
          className="text-left text-xl font-bold tracking-normal text-foreground transition-colors hover:text-accent"
        >
          {project.title}
        </button>
      </div>

      <div className="flex min-w-0 flex-wrap gap-3 lg:justify-self-end lg:justify-end">
        {project.githubUrl?.trim() ? <GitHubButton href={project.githubUrl.trim()} label={project.title} /> : null}
        <button
          type="button"
          onClick={openDetails}
          className="view-detail-button sm:justify-self-end"
        >
          View Details
        </button>
      </div>
    </article>
  );
}
