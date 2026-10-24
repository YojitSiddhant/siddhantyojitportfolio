import Link from "next/link";
import type { Metadata } from "next";
import { AcademicProjectsShowcase } from "@/components/projects/AcademicProjectsShowcase";
import { HeaderStat, PageSectionHeader } from "@/components/page-section-header";
import { PageShell } from "@/components/page-shell";
import { ArrowRightIcon } from "@/components/ui/icons";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Academic Projects | Siddhant Yojit",
  description: "Academic projects for Siddhant Yojit.",
};

export default function ProjectsPage() {
  return (
    <PageShell>
      <PageSectionHeader
        eyebrow="Academic Projects"
        title={
          <>
            Academic <span className="serif-accent text-accent">portfolio</span>
          </>
        }
        description="Academic work spanning civic platforms, machine learning, secure authentication, and fraud detection."
        aside={
          <div className="grid gap-4">
            <HeaderStat value={String(projects.length).padStart(2, "0")} label="projects" />
            <Link href="/full-stack-projects" className="link-arrow">
              Full-stack projects
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        }
      />

      <AcademicProjectsShowcase />
    </PageShell>
  );
}
