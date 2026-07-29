import type { Metadata } from "next";
import { AcademicProjectsShowcase } from "@/components/projects/AcademicProjectsShowcase";
import { PageSectionHeader } from "@/components/page-section-header";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Academic Projects | Siddhant Yojit",
  description: "Academic projects for Siddhant Yojit.",
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

export default function ProjectsPage() {
  return (
    <PageShell>
      <PageSectionHeader
        className="motion-reveal"
        style={{ animationDelay: "80ms" }}
        left={
          <div className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-foreground">
            <ProjectsIcon className="h-4 w-4 text-accent" />
            Academic Projects
          </div>
        }
        right={<div className="text-sm font-black text-foreground">Academic Portfolio</div>}
      />

      <section className="px-1 py-2 motion-reveal" style={{ animationDelay: "160ms" }}>
        <AcademicProjectsShowcase />
      </section>
    </PageShell>
  );
}
