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

  const reversed = index % 2 === 1;

  return (
    <Reveal as="article" delay={index * 60} className="group border-b border-border py-10 last:border-b-0 sm:py-14">
      <div className={`grid items-center gap-8 md:grid-cols-12 md:gap-10 ${reversed ? "[&>*:first-child]:md:order-2" : ""}`}>
        <div className="md:col-span-7">
          <span className="font-mono text-sm text-accent">{String(index + 1).padStart(2, "0")}</span>
          {project.badge ? <span className="ml-2 font-mono text-xs text-subtle">{project.badge}</span> : null}

          <h3 className="mt-4 text-3xl tracking-tight text-foreground sm:text-4xl">
            <button type="button" onClick={openDetails} className="text-left transition-colors duration-200 hover:text-accent">
              {project.title}
            </button>
          </h3>
          <p className="mt-4 max-w-xl text-[0.98rem] text-muted">{project.overview}</p>
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

          <div className="mt-6 flex flex-wrap items-center gap-2">
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

        <div aria-hidden="true" className="overflow-hidden rounded-[1.5rem] border border-border bg-surface-strong md:col-span-5">
          <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-3">
            <span className="font-mono text-[0.7rem] text-subtle">{project.title.toLowerCase().replace(/\s+/g, "-")}</span>
            <span className="font-mono text-[0.7rem] text-accent">● completed</span>
          </div>
          <ul>
            {project.keyFeatures.slice(0, 4).map((feature, featureIndex) => (
              <li
                key={feature}
                className="flex items-center gap-3 border-b border-border px-5 py-3 text-[0.82rem] text-muted last:border-b-0"
              >
                <span className="font-mono text-[0.65rem] text-subtle">{String(featureIndex + 1).padStart(2, "0")}</span>
                <span className="truncate">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}
