import Link from "next/link";
import type { Metadata } from "next";
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
      <header className="pt-6 sm:pt-8">
        <nav aria-label="Breadcrumb" className="eyebrow">
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-accent">Skills</span>
        </nav>
        <h1 className="mt-4 text-3xl text-foreground sm:text-4xl">
          Tools &amp; <span className="text-accent">technologies</span>
        </h1>
        <p className="mt-3 max-w-2xl text-base text-muted">{profile.coreFocus}</p>
        <p className="mt-4 text-sm text-subtle">
          <span className="text-foreground">{totalSkills}</span> technologies &amp; concepts across{" "}
          <span className="text-foreground">{skillSections.length}</span> categories
        </p>
      </header>

      <SkillGroups />
    </PageShell>
  );
}
