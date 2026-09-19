"use client";

import type { MouseEvent } from "react";
import type { FullStackProjectContent } from "@/components/full-stack-projects/FullStackProjectContent";
import { GitHubButton } from "@/components/project-github-button";

type FullStackProjectCardProps = {
  project: FullStackProjectContent;
  index: number;
  onOpen: (project: FullStackProjectContent, trigger: HTMLElement) => void;
};

export function FullStackProjectCard({ project, index, onOpen }: FullStackProjectCardProps) {
  const openDetails = (event: MouseEvent<HTMLElement>) => {
    onOpen(project, event.currentTarget);
  };

  const githubHref =
    project.githubUrl?.trim() ||
    `https://github.com/search?q=${encodeURIComponent(`${project.title} user:YojitSiddhant`)}&type=repositories`;

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

      <div className="flex min-w-0 w-full flex-wrap justify-center gap-3 lg:w-auto lg:justify-self-end lg:justify-end">
        <GitHubButton href={githubHref} label={project.title} />
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
