/* eslint-disable @next/next/no-img-element */
import { skillSections, type SkillItem } from "@/data/skills";
import { Reveal } from "@/components/ui/reveal";

function SkillChip({ skill }: { skill: SkillItem }) {
  const content = (
    <>
      {skill.icon && !skill.textOnly ? (
        <span className="logo-tile h-5 w-5 p-[3px]">
          <img src={skill.icon} alt="" className="h-full w-full object-contain" loading="lazy" referrerPolicy="no-referrer" />
        </span>
      ) : null}
      <span>{skill.name}</span>
    </>
  );

  const className =
    "inline-flex items-center gap-2.5 rounded-full border border-border bg-white/2 py-1.5 pl-1.5 pr-3.5 text-sm text-foreground transition-colors duration-200";

  return skill.href ? (
    <a
      href={skill.href}
      target="_blank"
      rel="noreferrer"
      className={`${className} hover:border-border-strong hover:bg-white/6`}
    >
      {content}
    </a>
  ) : (
    <span className={className}>{content}</span>
  );
}

export function SkillGroups() {
  return (
    <div className="border-b border-border">
      {skillSections.map((section, index) => (
        <Reveal
          key={section.title}
          delay={index * 40}
          className="grid gap-4 border-t border-border py-6 md:grid-cols-12 md:gap-8 md:py-7"
        >
          <div className="flex items-baseline justify-between gap-4 md:col-span-3 md:flex-col md:justify-start md:gap-1.5">
            <h3 className="text-lg tracking-tight text-foreground">{section.title}</h3>
            <span className="font-mono text-xs text-subtle">
              {String(section.items.length).padStart(2, "0")} {section.title === "Core Concepts" ? "concepts" : section.items.length === 1 ? "tool" : "tools"}
            </span>
          </div>
          <ul className="flex flex-wrap gap-2 md:col-span-9">
            {section.items.map((skill) => (
              <li key={skill.name}>
                <SkillChip skill={skill} />
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  );
}
