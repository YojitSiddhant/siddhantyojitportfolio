/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { skillGroups } from "@/data/skills";

export const metadata: Metadata = {
  title: "Skills | Siddhant Yojit",
  description: "Full stack skills for Siddhant Yojit.",
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
    <main className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(0,0,0,0.01),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(0,0,0,0.008),_transparent_28%),radial-gradient(circle_at_bottom,_rgba(0,0,0,0.004),_transparent_36%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[18rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.78)_0%,rgba(255,255,255,0.56)_70%,rgba(255,255,255,0.18)_100%)]" />

      <section className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 pb-10 pt-5 sm:px-6 sm:pb-12 sm:pt-6 lg:px-8 lg:pt-8 motion-reveal">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)] px-1 py-4 motion-reveal" style={{ animationDelay: "80ms" }}>
          <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.24em] text-[var(--foreground)]">
            <TechBadgeIcon className="h-4 w-4 text-[var(--accent)]" />
            Skills
          </div>
          <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
            <BriefcaseIcon className="h-4 w-4 text-[var(--accent)]" />
            Frontend, Backend, Database, Tools
          </div>
        </div>

        <section className="px-1 py-2 motion-reveal" style={{ animationDelay: "160ms" }}>
          <div className="grid gap-5 lg:grid-cols-2">
            {skillGroups.map((group, index) => (
              <article
                key={group.title}
                className="flex h-full flex-col gap-4 border-b border-[var(--border)] pb-5 motion-reveal"
                style={{ animationDelay: `${220 + index * 100}ms` }}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--foreground)]">
                      {group.title}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{group.description}</p>
                  </div>
                  <span className="rounded-full border border-[var(--border)] bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--accent-strong)]">
                    {group.skills.length} skills
                  </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {group.skills.map((skill) => (
                    <a
                      key={skill.name}
                      href={skill.href ?? "#"}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 transition-transform hover:-translate-y-0.5 hover:border-[var(--accent)]"
                    >
                      <img
                        src={skill.icon}
                        alt={`${skill.name} logo`}
                        className="h-8 w-8 shrink-0 object-contain"
                        loading="lazy"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-black uppercase tracking-[0.18em] text-[var(--foreground)] transition-colors group-hover:text-[var(--accent)]">
                          {skill.name}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
