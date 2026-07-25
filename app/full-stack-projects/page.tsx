import type { Metadata } from "next";
import { PageSectionHeader } from "@/components/page-section-header";
import { PageShell } from "@/components/page-shell";
import { FullStackProjectsShowcase } from "@/components/full-stack-projects/full-stack-projects-showcase";
import { fullStackProjects } from "@/data/full-stack-projects";

export const metadata: Metadata = {
  title: "Full Stack Projects | Siddhant Yojit",
  description: "A showcase of full stack projects built by Siddhant Yojit.",
};

function ProjectsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M9 7V6a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3v1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M4 9.5A1.5 1.5 0 0 1 5.5 8h13A1.5 1.5 0 0 1 20 9.5v8A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5v-8Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M4 13h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function FullStackProjectsPage() {
  return (
    <PageShell maxWidthClassName="max-w-7xl">
      <PageSectionHeader
        className="motion-reveal"
        style={{ animationDelay: "80ms" }}
        left={
          <div className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-foreground">
            <ProjectsIcon className="h-4 w-4 text-accent" />
            Full Stack Projects
          </div>
        }
        right={<div className="text-sm font-black text-foreground">Completed builds</div>}
      />

      <FullStackProjectsShowcase projects={fullStackProjects} />
    </PageShell>
  );
}

