"use client";

import type { MouseEvent } from "react";
import type { FullStackProjectContent } from "@/components/full-stack-projects/FullStackProjectContent";
import { ArrowUpRightIcon, GitHubIcon, PlusIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";

type FullStackProjectCardProps = {
  project: FullStackProjectContent;
  index: number;
  featured?: boolean;
  onOpen: (project: FullStackProjectContent, trigger: HTMLElement) => void;
};

function repoPath(url?: string) {
  const match = url?.match(/github\.com\/([^/]+\/[^/?#]+)/);
  return match ? match[1] : null;
}

function SpecPanel({ project, featured }: { project: FullStackProjectContent; featured: boolean }) {
  const path = repoPath(project.githubUrl);
  const features = project.keyFeatures.slice(0, featured ? 6 : 3);
  const flow = featured ? project.architectureWorkflow ?? [] : [];

  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden rounded-xl border border-border bg-background/60 transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover/card:-translate-y-1"
    >
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-2.5">
        <span className="truncate font-mono text-[0.7rem] text-subtle">{path ?? project.title.toLowerCase()}</span>
        <span className="shrink-0 font-mono text-[0.7rem] text-accent">● completed</span>
      </div>
      <ul className={`grid ${featured ? "sm:grid-cols-2" : ""}`}>
        {features.map((feature, featureIndex) => (
          <li
            key={feature}
            className={`flex items-center gap-3 border-b border-border px-4 py-2.5 text-[0.8rem] text-muted last:border-b-0 ${
              featured ? "sm:nth-last-2:border-b-0" : ""
            }`}
          >
            <span className="font-mono text-[0.65rem] text-subtle">{String(featureIndex + 1).padStart(2, "0")}</span>
            <span className="truncate">{feature}</span>
          </li>
        ))}
      </ul>
      {flow.length > 0 ? (
        <ol className="grid gap-px border-t border-border bg-border sm:grid-cols-3">
          {flow.map((step, stepIndex) => (
            <li key={step} className="bg-surface px-4 py-3 text-[0.72rem] leading-snug text-subtle">
              <span className="mb-1 block font-mono text-accent">→ {stepIndex + 1}</span>
              {step}
            </li>
          ))}
        </ol>
      ) : null}
    </div>
  );
}

export function FullStackProjectCard({ project, index, featured = false, onOpen }: FullStackProjectCardProps) {
  const openDetails = (event: MouseEvent<HTMLElement>) => {
    onOpen(project, event.currentTarget);
  };

  const githubHref =
    project.githubUrl?.trim() ||
    `https://github.com/search?q=${encodeURIComponent(`${project.title} user:YojitSiddhant`)}&type=repositories`;

  return (
    <Reveal
      as="article"
      delay={(index % 2) * 80}
      className={`group/card card card-interactive flex flex-col gap-8 p-5 sm:p-7 ${
        featured ? "md:col-span-2 lg:grid lg:grid-cols-12 lg:items-center lg:gap-10 lg:p-10" : ""
      }`}
    >
      <div className={`flex flex-col ${featured ? "lg:col-span-5" : "flex-1"}`}>
        <div className="flex items-center justify-between gap-4">
          <span className="font-mono text-xs text-subtle">
            <span className="text-accent">{String(index + 1).padStart(2, "0")}</span> / Full stack
          </span>
          {featured ? <span className="chip">Featured</span> : null}
        </div>

        <h3 className={`mt-6 tracking-tight text-foreground ${featured ? "text-3xl sm:text-4xl" : "text-2xl"}`}>
          <button
            type="button"
            onClick={openDetails}
            className="text-left transition-colors duration-200 hover:text-accent"
          >
            {project.title}
          </button>
        </h3>
        <p className="mt-3 text-[0.95rem] text-muted">{project.overview}</p>

        <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Tech stack">
          {project.technologies.map((technology) => (
            <li key={technology} className="chip">
              {technology}
            </li>
          ))}
        </ul>

        <div className={`flex flex-wrap items-center gap-2 pt-8 ${featured ? "" : "mt-auto"}`}>
          <button type="button" onClick={openDetails} className="btn btn-primary btn-sm">
            <PlusIcon className="h-3.5 w-3.5" />
            Case study
          </button>
          <a
            href={githubHref}
            target="_blank"
            rel="noreferrer"
            className="btn btn-secondary btn-sm"
            aria-label={`Open ${project.title} GitHub repository`}
          >
            <GitHubIcon className="h-3.5 w-3.5" />
            Code
          </a>
          {project.liveDemoUrl ? (
            <a href={project.liveDemoUrl} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm">
              Live demo
              <ArrowUpRightIcon className="btn-arrow h-3.5 w-3.5" />
            </a>
          ) : null}
        </div>
      </div>

      <div className={featured ? "lg:col-span-7" : "order-first"}>
        <SpecPanel project={project} featured={featured} />
      </div>
    </Reveal>
  );
}
