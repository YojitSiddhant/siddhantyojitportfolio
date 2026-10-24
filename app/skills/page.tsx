import type { Metadata } from "next";
import { HeaderStat, PageSectionHeader } from "@/components/page-section-header";
import { PageShell } from "@/components/page-shell";
import { SkillGroups } from "@/components/skills/skill-groups";
import { profile } from "@/data/profile";
import { skillSections } from "@/data/skills";

export const metadata: Metadata = {
  title: "Skills | Siddhant Yojit",
  description: "Technical skills for Siddhant Yojit.",
};

const totalSkills = skillSections.reduce((total, section) => total + section.items.length, 0);

export default function SkillsPage() {
  return (
    <PageShell>
      <PageSectionHeader
        eyebrow="Skills"
        title={
          <>
            Tools &amp; <span className="serif-accent text-accent">technologies</span>
          </>
        }
        description={profile.coreFocus}
        aside={
          <div className="grid gap-4">
            <HeaderStat value={totalSkills} label="technologies & concepts" />
            <HeaderStat value={skillSections.length} label="categories" />
          </div>
        }
      />

      <SkillGroups />
    </PageShell>
  );
}
