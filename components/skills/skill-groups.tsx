/* eslint-disable @next/next/no-img-element */
import { skillSections, type SkillItem } from "@/data/skills";
import { Reveal } from "@/components/ui/reveal";

function SkillChip({ skill }: { skill: SkillItem }) {
  const content = (
    <>
      {skill.icon && !skill.textOnly ? (
        <span className="logo-tile h-5 w-5 shrink-0 p-[3px]">
          <img src={skill.icon} alt="" className="h-full w-full object-contain" loading="lazy" referrerPolicy="no-referrer" />
        </span>
      ) : null}
      <span>{skill.name}</span>
    </>
  );

  const className =
    "inline-flex max-w-full items-center gap-2.5 whitespace-normal break-words rounded-full border border-border bg-surface py-1.5 pl-1.5 pr-3.5 text-sm text-foreground transition-colors duration-200";

  return skill.href ? (
    <a
      href={skill.href}
      target="_blank"
      rel="noreferrer"
      className={`${className} hover:border-border-strong hover:bg-surface-hover`}
    >
      {content}
    </a>
  ) : (
    <span className={className}>{content}</span>
  );
}

export function SkillGroups() {
  return (
    <Reveal as="div" className="overflow-hidden rounded-[1.25rem] border border-border">
      <ul className="divide-y divide-border">
        {skillSections.map((section) => (
          <li key={section.title} className="flex flex-col gap-4 bg-surface px-6 py-5 sm:flex-row sm:gap-6">
            <div className="shrink-0 sm:w-40">
              <p className="text-[0.95rem] text-foreground">{section.title}</p>
              <p className="mt-0.5 font-mono text-xs text-subtle">
                {String(section.items.length).padStart(2, "0")} {section.title === "Core Concepts" ? "concepts" : section.items.length === 1 ? "tool" : "tools"}
              </p>
            </div>
            <ul className="flex min-w-0 flex-1 flex-wrap gap-2">
              {section.items.map((skill) => (
                <li key={skill.name} className="min-w-0 max-w-full">
                  <SkillChip skill={skill} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
