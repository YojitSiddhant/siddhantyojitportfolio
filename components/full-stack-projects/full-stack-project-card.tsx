"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useId, useState } from "react";
import type { ReactNode } from "react";
import type { FullStackProject } from "@/data/full-stack-projects";

type FullStackProjectCardProps = {
  project: FullStackProject;
  index: number;
};

type TechLogo = {
  src: string;
  className?: string;
};

const techLogos: Record<string, TechLogo> = {
  "Node.js": {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  },
  "Express.js": {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
  },
  MySQL: {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
  },
  HTML: {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  },
  CSS: {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
  },
  JavaScript: {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  },
  "Groq AI API": {
    src: "/favicon.png",
    className: "h-5 w-5 rounded-full",
  },
  "Next.js": {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
  },
  TypeScript: {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  },
  Prisma: {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg",
  },
  PostgreSQL: {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
  },
  React: {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  },
  Axios: {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/axios/axios-plain.svg",
  },
  Vercel: {
    src: "https://assets.vercel.com/image/upload/front/favicon/vercel/57x57.png",
  },
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

function TechBadge({ name }: { name: string }) {
  const logo = techLogos[name];

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-2 text-xs font-black uppercase tracking-widest text-foreground">
      {logo ? (
        <Image
          src={logo.src}
          alt={`${name} logo`}
          width={20}
          height={20}
          unoptimized
          className={`shrink-0 object-contain ${logo.className ?? "h-5 w-5"}`}
        />
      ) : (
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent-soft text-[10px] font-black text-accent-strong">
          {name.charAt(0)}
        </span>
      )}
      <span>{name}</span>
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const detailsId = useId();

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isModalOpen]);

  return (
    <>
      <article
        className="grid gap-4 border-b border-border pb-5 motion-reveal lg:grid-cols-2 lg:items-start lg:gap-8"
        style={{ animationDelay: `${220 + index * 120}ms` }}
      >
        <div className="min-w-0 flex-1">
          <h2 className="mt-1 text-xl font-bold tracking-normal text-foreground">{project.title}</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge className="bg-accent-soft text-accent-strong">{project.category}</Badge>
            <Badge className="bg-surface text-foreground">{project.status}</Badge>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.techStack.map((technology) => (
              <TechBadge key={`${project.title}-${technology}`} name={technology} />
            ))}
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-1 text-sm text-foreground lg:justify-self-end lg:text-right">
          <p>{project.summary}</p>
          <div className="mt-3 flex flex-wrap gap-2 sm:justify-end">
            <button
              type="button"
              className="rounded-full border border-border px-3 py-1 text-xs font-black uppercase tracking-widest text-foreground transition-colors hover:border-accent hover:text-accent"
              aria-expanded={isModalOpen}
              aria-controls={detailsId}
              onClick={() => setIsModalOpen(true)}
            >
              More
            </button>
            {project.githubUrl ? (
              <ActionButton href={project.githubUrl}>GitHub</ActionButton>
            ) : (
              <ActionButton disabled>GitHub</ActionButton>
            )}
            {project.liveDemoUrl ? <ActionButton href={project.liveDemoUrl}>Live</ActionButton> : null}
          </div>
        </div>
      </article>

      {isModalOpen && typeof document !== "undefined"
        ? createPortal(
            <div
              className="fixed inset-0 z-60 flex items-center justify-center bg-black/20 px-4 py-6 backdrop-blur-sm motion-reveal-fade sm:py-8"
              role="dialog"
              aria-modal="true"
              aria-labelledby={`${detailsId}-title`}
              aria-describedby={`${detailsId}-description`}
              onClick={() => setIsModalOpen(false)}
            >
              <div
                className="w-full max-w-104 max-h-screen overflow-hidden rounded-3xl border border-border bg-surface-strong p-4 shadow-2xl backdrop-blur-xl sm:max-h-screen sm:p-5"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-black uppercase tracking-wider text-accent">Full Stack Project</p>
                    <h2 id={`${detailsId}-title`} className="mt-2 text-xl font-bold tracking-normal text-foreground">
                      {project.title}
                    </h2>
                    <p id={`${detailsId}-description`} className="mt-2 text-sm text-foreground">
                      {project.summary}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-accent-soft"
                    aria-label="Close project details"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>

                <div className="mt-5 grid gap-4 overflow-y-auto pr-1 sm:max-h-[60vh]">
                  <div>
                    <SectionHeader>Technology Stack</SectionHeader>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.techStack.map((technology) => (
                        <TechBadge key={`${project.title}-${technology}-modal`} name={technology} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <SectionHeader>Key Features</SectionHeader>
                    <DetailList items={project.keyFeatures} />
                  </div>

                  <div>
                    <SectionHeader>Architecture Highlights</SectionHeader>
                    <DetailList items={project.architectureHighlights} />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.githubUrl ? (
                      <ActionButton href={project.githubUrl}>GitHub</ActionButton>
                    ) : (
                      <ActionButton disabled>GitHub</ActionButton>
                    )}
                    {project.liveDemoUrl ? <ActionButton href={project.liveDemoUrl}>Live</ActionButton> : null}
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="rounded-full bg-accent px-4 py-2 text-sm font-black uppercase tracking-wide text-white transition-colors hover:bg-accent-strong"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
