import Link from "next/link";
import type { Metadata } from "next";
import { HeaderStat, PageSectionHeader } from "@/components/page-section-header";
import { PageShell } from "@/components/page-shell";
import { FullStackProjectsShowcase } from "@/components/full-stack-projects/full-stack-projects-showcase";
import { ArrowRightIcon } from "@/components/ui/icons";
import { fullStackProjects } from "@/data/full-stack-projects";

export const metadata: Metadata = {
  title: "Full Stack Projects | Siddhant Yojit",
  description: "A showcase of full stack projects built by Siddhant Yojit.",
};

export default function FullStackProjectsPage() {
  return (
    <PageShell>
      <PageSectionHeader
        eyebrow="Full Stack Projects"
        title={
          <>
            Completed <span className="serif-accent text-accent">builds</span>
          </>
        }
        description="Full-stack applications spanning REST APIs, relational databases, file workflows, dashboards, and AI integration."
        aside={
          <div className="grid gap-4">
            <HeaderStat value={String(fullStackProjects.length).padStart(2, "0")} label="projects" />
            <Link href="/projects" className="link-arrow">
              Academic projects
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        }
      />

      <FullStackProjectsShowcase />
    </PageShell>
  );
}
