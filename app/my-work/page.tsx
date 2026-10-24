import type { Metadata } from "next";
import { HeaderStat, PageSectionHeader } from "@/components/page-section-header";
import { PageShell } from "@/components/page-shell";
import { WorkGrid } from "@/components/work/work-grid";
import { workItems } from "@/data/work";

export const metadata: Metadata = {
  title: "My Work | Siddhant Yojit",
  description: "My work page for Siddhant Yojit.",
};

export default function MyWorkPage() {
  return (
    <PageShell>
      <PageSectionHeader
        eyebrow="My Work"
        title={
          <>
            Featured <span className="serif-accent text-accent">work</span>
          </>
        }
        description="Live client sites and platforms I've contributed to. Each opens in a new tab."
        aside={<HeaderStat value={String(workItems.length).padStart(2, "0")} label="live sites" />}
      />

      <WorkGrid />
    </PageShell>
  );
}
