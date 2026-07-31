"use client";

import { createPortal } from "react-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import type { FullStackProjectContent } from "@/components/full-stack-projects/FullStackProjectContent";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "textarea",
  "input",
  "select",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function BulletIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <circle cx="12" cy="12" r="2.2" fill="currentColor" />
    </svg>
  );
}

const technologyIcons: Record<string, { src: string; alt: string }> = {
  "Node.js": {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
    alt: "Node.js logo",
  },
  "Express.js": {
    src: "https://cdn.simpleicons.org/express/0A0A0A",
    alt: "Express.js logo",
  },
  MySQL: {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
    alt: "MySQL logo",
  },
  HTML: {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
    alt: "HTML logo",
  },
  CSS: {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
    alt: "CSS logo",
  },
  JavaScript: {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    alt: "JavaScript logo",
  },
  "Groq AI API": {
    src: "https://cdn.jsdelivr.net/npm/@tabler/icons@latest/icons/brain.svg",
    alt: "AI icon",
  },
  "Next.js": {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
    alt: "Next.js logo",
  },
  Multer: {
    src: "https://cdn.jsdelivr.net/npm/@tabler/icons@latest/icons/upload.svg",
    alt: "Upload icon",
  },
  Railway: {
    src: "https://cdn.simpleicons.org/railway/0B0D0E",
    alt: "Railway logo",
  },
  Vercel: {
    src: "https://cdn.simpleicons.org/vercel/000000",
    alt: "Vercel logo",
  },
  React: {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    alt: "React logo",
  },
  TypeScript: {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
    alt: "TypeScript logo",
  },
  "React Router": {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/reactrouter/reactrouter-original.svg",
    alt: "React Router logo",
  },
  "React Query": {
    src: "https://cdn.jsdelivr.net/npm/@tabler/icons@latest/icons/search.svg",
    alt: "Query icon",
  },
  "Tailwind CSS": {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    alt: "Tailwind CSS logo",
  },
  "JSON Server": {
    src: "https://cdn.jsdelivr.net/npm/@tabler/icons@latest/icons/database.svg",
    alt: "Database icon",
  },
  Axios: {
    src: "https://cdn.simpleicons.org/axios/5A29E4",
    alt: "Axios logo",
  },
};

function TechIcon({ technology }: { technology: string }) {
  const icon = technologyIcons[technology];

  if (!icon) {
    return (
      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-border bg-surface text-[9px] font-black uppercase text-muted">
        {technology.slice(0, 1)}
      </span>
    );
  }

  return (
    <img
      src={icon.src}
      alt={icon.alt}
      className="h-4 w-4 shrink-0 object-contain"
      loading="lazy"
      referrerPolicy="no-referrer"
    />
  );
}

type FullStackProjectModalProps = {
  project: FullStackProjectContent | null;
  open: boolean;
  onClose: () => void;
};

export function FullStackProjectModal({ project, open, onClose }: FullStackProjectModalProps) {
  const [portalTarget] = useState<HTMLElement | null>(() => (typeof document === "undefined" ? null : document.body));
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open && project) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const animationFrame = window.requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          event.preventDefault();
          onClose();
          return;
        }

        if (event.key !== "Tab") {
          return;
        }

        const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
        const elements = focusableElements ? Array.from(focusableElements).filter((element) => !element.hasAttribute("disabled")) : [];

        if (elements.length === 0) {
          event.preventDefault();
          closeButtonRef.current?.focus();
          return;
        }

        const firstElement = elements[0];
        const lastElement = elements[elements.length - 1];
        const activeElement = document.activeElement;

        if (event.shiftKey) {
          if (activeElement === firstElement || !modalRef.current?.contains(activeElement)) {
            event.preventDefault();
            lastElement.focus();
          }
          return;
        }

        if (activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      };

      document.addEventListener("keydown", handleKeyDown);

      return () => {
        window.cancelAnimationFrame(animationFrame);
        document.body.style.overflow = previousOverflow;
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [open, project, onClose]);

  const overlayClassName = useMemo(
    () =>
      [
        "fixed inset-0 z-50 flex items-start justify-center px-3 py-2 sm:items-center sm:px-6 sm:py-8",
        "bg-background/70 backdrop-blur-sm transition-opacity duration-200 ease-out",
        open ? "opacity-100" : "pointer-events-none opacity-0",
      ].join(" "),
    [open],
  );

  const panelClassName = useMemo(
    () =>
      [
        "relative mt-0 w-[min(100%,72rem)] max-h-[calc(100dvh-1rem)] overflow-hidden rounded-2xl border border-border",
        "bg-background shadow-2xl transition-all duration-200 ease-out sm:rounded-3xl sm:w-[min(92vw,72rem)] sm:max-h-[calc(100dvh-3rem)]",
        open ? "scale-100 opacity-100" : "scale-95 opacity-0",
      ].join(" "),
    [open],
  );

  if (!portalTarget || !project) {
    return null;
  }

  return createPortal(
    <div
      className={overlayClassName}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      aria-hidden={!open}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="full-stack-project-modal-title"
        className={panelClassName}
      >
        <div className="flex items-start justify-between gap-4 border-b border-border px-3 py-3 sm:px-6 sm:py-4">
          <div className="min-w-0">
            <h2
              id="full-stack-project-modal-title"
              className="text-xl font-bold tracking-normal text-foreground sm:text-3xl"
            >
              {project.title}
            </h2>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-accent hover:text-accent"
            aria-label="Close project details"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[calc(100dvh-7rem)] overflow-y-auto px-3 py-4 sm:max-h-[calc(100dvh-9rem)] sm:px-6 sm:py-5">
          <div className="grid gap-5">
            <section className="grid gap-2 border-b border-border pb-4">
              <p className="text-xs font-black uppercase tracking-widest text-foreground">Project Overview</p>
              <p className="text-sm leading-7 text-muted">{project.overview}</p>
            </section>

            <section className="grid gap-2 border-b border-border pb-4">
              <p className="text-xs font-black uppercase tracking-widest text-foreground">Problem Statement</p>
              <p className="text-sm leading-7 text-muted">{project.problemStatement}</p>
            </section>

            <section className="grid gap-3 border-b border-border pb-4">
              <p className="text-xs font-black uppercase tracking-widest text-foreground">Technologies Used</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-2 text-xs font-black uppercase tracking-widest text-foreground"
                  >
                    <TechIcon technology={technology} />
                    {technology}
                  </span>
                ))}
              </div>
            </section>

            <section className="grid gap-3 border-b border-border pb-4">
              <p className="text-xs font-black uppercase tracking-widest text-foreground">Key Features</p>
              <div className="grid gap-2">
                {project.keyFeatures.map((feature) => (
                  <div key={feature} className="flex gap-3">
                    <BulletIcon className="mt-1 h-4 w-4 shrink-0 text-accent" />
                    <p className="text-sm leading-7 text-foreground">{feature}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid gap-2 border-b border-border pb-4">
              <p className="text-xs font-black uppercase tracking-widest text-foreground">My Role</p>
              <p className="text-sm leading-7 text-muted">{project.myRole}</p>
            </section>

            <section className="grid gap-2 border-b border-border pb-4">
              <p className="text-xs font-black uppercase tracking-widest text-foreground">Challenges Faced</p>
              <div className="grid gap-2">
                {project.challengesFaced.map((challenge) => (
                  <div key={challenge} className="flex gap-3">
                    <BulletIcon className="mt-1 h-4 w-4 shrink-0 text-accent" />
                    <p className="text-sm leading-7 text-foreground">{challenge}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid gap-2 border-b border-border pb-4">
              <p className="text-xs font-black uppercase tracking-widest text-foreground">Key Learnings</p>
              <div className="grid gap-2">
                {project.keyLearnings.map((learning) => (
                  <div key={learning} className="flex gap-3">
                    <BulletIcon className="mt-1 h-4 w-4 shrink-0 text-accent" />
                    <p className="text-sm leading-7 text-foreground">{learning}</p>
                  </div>
                ))}
              </div>
            </section>

            {project.architectureWorkflow?.length ? (
              <section className="grid gap-2 border-b border-border pb-4">
                <p className="text-xs font-black uppercase tracking-widest text-foreground">
                  Architecture / Workflow
                </p>
                <div className="grid gap-2">
                  {project.architectureWorkflow.map((line) => (
                    <div key={line} className="flex gap-3">
                      <BulletIcon className="mt-1 h-4 w-4 shrink-0 text-accent" />
                      <p className="text-sm leading-7 text-foreground">{line}</p>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {project.futureImprovements?.length ? (
              <section className="grid gap-2 border-b border-border pb-4">
                <p className="text-xs font-black uppercase tracking-widest text-foreground">Future Improvements</p>
                <div className="grid gap-2">
                  {project.futureImprovements.map((item) => (
                    <div key={item} className="flex gap-3">
                      <BulletIcon className="mt-1 h-4 w-4 shrink-0 text-accent" />
                      <p className="text-sm leading-7 text-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {project.liveDemoUrl ? (
              <section className="grid gap-2 border-b border-border pb-4">
                <p className="text-xs font-black uppercase tracking-widest text-foreground">Live Demo</p>
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-fit items-center rounded-full border border-border px-3 py-2 text-xs font-black uppercase tracking-widest text-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  Open Demo
                </a>
              </section>
            ) : null}

            {project.projectDuration ? (
              <section className="grid gap-2 border-b border-border pb-4">
                <p className="text-xs font-black uppercase tracking-widest text-foreground">Project Duration</p>
                <p className="text-sm leading-7 text-muted">{project.projectDuration}</p>
              </section>
            ) : null}

            {project.screenshots && project.screenshots.length > 0 ? (
              <section className="grid gap-3 border-b border-border pb-4">
                <p className="text-xs font-black uppercase tracking-widest text-foreground">Screenshots</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {project.screenshots.map((image) => (
                    <figure key={image.src} className="overflow-hidden rounded-2xl border border-border bg-surface">
                      <img src={image.src} alt={image.alt} className="h-full w-full object-cover" loading="lazy" />
                    </figure>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </div>
      </div>
    </div>,
    portalTarget,
  );
}
