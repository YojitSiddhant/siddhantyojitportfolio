import type { Metadata } from "next";
import { ExperienceTimeline } from "@/components/experience/experience-timeline";
import { HeaderStat, PageSectionHeader } from "@/components/page-section-header";
import { PageShell } from "@/components/page-shell";
import { experience } from "@/data/experience";

export const metadata: Metadata = {
  title: "Experience | Siddhant Yojit",
  description: "Experience details for Siddhant Yojit.",
};

export default function ExperiencePage() {
  return (
    <PageShell>
      <PageSectionHeader
        eyebrow="Experience"
        title={
          <>
            Work <span className="text-accent">history</span>
          </>
        }
        description="Internships building production-facing interfaces, CRM workflows, and live client projects in Bengaluru."
        aside={<HeaderStat value={String(experience.length).padStart(2, "0")} label="roles" />}
      />

      <ExperienceTimeline />
    </PageShell>
  );
}
