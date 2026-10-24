"use client";
/* eslint-disable @next/next/no-img-element */

import type { MouseEvent } from "react";
import type { AcademicProjectContent } from "@/components/projects/AcademicProjectContent";
import { GitHubIcon, PlusIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";

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
    <Reveal as="article" delay={index * 60} className="group border-t border-border py-8 sm:py-10">
      <div className="grid gap-5 md:grid-cols-12 md:gap-8">
        <div className="flex items-center gap-3 md:col-span-2 md:flex-col md:items-start">
          <span className="font-mono text-sm text-accent">{String(index + 1).padStart(2, "0")}</span>
          {project.badge ? <span className="font-mono text-xs text-subtle">{project.badge}</span> : null}
        </div>

        <div className="min-w-0 md:col-span-7">
          <h3 className="text-2xl tracking-tight text-foreground sm:text-3xl">
            <button type="button" onClick={openDetails} className="text-left transition-colors duration-200 hover:text-accent">
              {project.title}
            </button>
          </h3>
          <p className="mt-3 max-w-2xl text-[0.95rem] text-muted">{project.overview}</p>
          <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tech stack">
            {project.technologies.map((technology) => (
              <li key={technology.name} className="chip text-foreground/80">
                <img
                  src={technology.src}
                  alt=""
                  className="h-4 w-4 shrink-0 object-contain"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                {technology.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap items-start gap-2 md:col-span-3 md:justify-end">
          <button type="button" onClick={openDetails} className="btn btn-secondary btn-sm">
            <PlusIcon className="h-3.5 w-3.5" />
            Details
          </button>
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary btn-sm btn-icon"
              aria-label={`Open ${project.title} GitHub repository`}
            >
              <GitHubIcon className="h-3.5 w-3.5" />
            </a>
          ) : null}
        </div>
      </div>
    </Reveal>
  );
}
