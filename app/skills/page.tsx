/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { PageSectionHeader } from "@/components/page-section-header";
import { PageShell } from "@/components/page-shell";
import { skillSections } from "@/data/skills";

export const metadata: Metadata = {
  title: "Skills | Siddhant Yojit",
  description: "Technical skills for Siddhant Yojit.",
};

type LogoProps = {
  className?: string;
};

function TechBadgeIcon({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M9 18 3.5 12 9 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m15 6 5.5 6-5.5 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BriefcaseIcon({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M9 7V6a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3v1"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M4 9.5A1.5 1.5 0 0 1 5.5 8h13A1.5 1.5 0 0 1 20 9.5v8A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5v-8Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M4 13h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function SkillCard({
  skill,
  index,
  sectionIndex,
}: {
  skill: (typeof skillSections)[number]["items"][number];
  index: number;
  sectionIndex: number;
}) {
  return (
    <article
      className="flex min-w-36 flex-1 basis-40 flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-surface px-4 py-5 text-center shadow-card motion-reveal"
      style={{ animationDelay: `${220 + sectionIndex * 180 + index * 100}ms` }}
    >
      {skill.textOnly ? null : (
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden">
          {skill.badge ? (
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-background text-xs font-black uppercase tracking-widest text-foreground">
              {skill.badge}
            </div>
          ) : (
            <img
              src={skill.icon}
              alt={`${skill.name} logo`}
              className="h-14 w-14 object-contain"
              loading="lazy"
            />
          )}
        </div>
      )}

      {skill.href ? (
        <a
          href={skill.href}
          target="_blank"
          rel="noreferrer"
          className="min-w-0 text-base font-black uppercase tracking-widest text-foreground transition-colors hover:text-accent"
        >
          {skill.name}
        </a>
      ) : (
        <p className="min-w-0 text-base font-black uppercase tracking-widest text-foreground">
          {skill.name}
        </p>
      )}
    </article>
  );
}

export default function SkillsPage() {
  return (
    <PageShell>
      <PageSectionHeader
        className="motion-reveal"
        style={{ animationDelay: "80ms" }}
        left={
          <div className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-foreground">
            <TechBadgeIcon className="h-4 w-4 text-accent" />
            Skills
          </div>
        }
        right={
          <div className="flex items-center gap-2 text-sm text-muted">
            <BriefcaseIcon className="h-4 w-4 text-accent" />
            Full Stack
          </div>
        }
      />

      <section className="motion-reveal" style={{ animationDelay: "160ms" }}>
        <div className="grid gap-8">
          {skillSections.map((section, sectionIndex) => (
            <div key={section.title} className="grid gap-4">
              <p className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-foreground">
                <TechBadgeIcon className="h-4 w-4 text-accent" />
                {section.title}
              </p>
              <div className="flex flex-wrap gap-4">
                {section.items.map((skill, index) => (
                  <SkillCard key={skill.name} skill={skill} index={index} sectionIndex={sectionIndex} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
