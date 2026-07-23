/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { skills } from "@/data/skills";

export const metadata: Metadata = {
  title: "Skills | Siddhant Yojit",
  description: "Frontend skills for Siddhant Yojit.",
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

export default function SkillsPage() {
  return (
    <main className="relative isolate overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[var(--background)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[18rem] bg-[var(--background)]" />

      <section className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 pb-10 pt-5 sm:px-6 sm:pb-12 sm:pt-6 lg:px-8 lg:pt-8 motion-reveal">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)] px-1 py-4 motion-reveal" style={{ animationDelay: "80ms" }}>
          <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.24em] text-[var(--foreground)]">
            <TechBadgeIcon className="h-4 w-4 text-[var(--accent)]" />
            Frontend Skills
          </div>
          <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
            <BriefcaseIcon className="h-4 w-4 text-[var(--accent)]" />
            Frontend, UI
          </div>
        </div>

        <section className="px-1 py-2 motion-reveal" style={{ animationDelay: "160ms" }}>
          <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill, index) => (
              <article
                key={skill.name}
                className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-[var(--border)] bg-[var(--surface)] px-4 py-6 text-center motion-reveal"
                style={{ animationDelay: `${220 + index * 100}ms` }}
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center">
                  <img src={skill.icon} alt={`${skill.name} logo`} className="h-14 w-14 object-contain" loading="lazy" />
                </div>
                <a
                  href={skill.href ?? "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="min-w-0 text-base font-black uppercase tracking-[0.24em] text-[var(--foreground)] transition-colors hover:text-[var(--accent)]"
                >
                  {skill.name}
                </a>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
