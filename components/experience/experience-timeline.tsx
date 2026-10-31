import Image from "next/image";
import { experience } from "@/data/experience";
import { Reveal } from "@/components/ui/reveal";

const orderedExperience = [...experience].sort((a, b) => a.order - b.order);

export function ExperienceTimeline() {
  return (
    <ol className="relative grid gap-0">
      <div aria-hidden="true" className="absolute left-5 top-2 bottom-2 w-px bg-border sm:left-6" />

      {orderedExperience.map((item, index) => {
        const highlights = item.description
          .split(/\r?\n/)
          .map((highlight) => highlight.trim())
          .filter(Boolean);
        const technologies = "technologies" in item && Array.isArray(item.technologies) ? (item.technologies as string[]) : [];
        const isCurrent = /present/i.test(item.duration);

        return (
          <Reveal as="li" key={`${item.role}-${item.company}`} delay={index * 80} className="relative pb-10 pl-14 last:pb-0 sm:pl-16">
            <span
              className={`absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full border-2 bg-background sm:h-12 sm:w-12 ${
                isCurrent ? "border-accent" : "border-border-strong"
              }`}
            >
              {item.logo ? (
                <Image src={item.logo} alt={`${item.company} logo`} width={28} height={28} className="h-6 w-6 rounded-full object-cover sm:h-7 sm:w-7" />
              ) : (
                <span className={`h-2.5 w-2.5 rounded-full ${isCurrent ? "bg-accent" : "bg-subtle"}`} />
              )}
            </span>

            <article className={isCurrent ? "card p-6 sm:p-8" : "border-b border-border pb-10 last:border-b-0"}>
              <p className="flex items-center gap-2 font-mono text-xs text-subtle">
                {isCurrent ? <span className="status-dot" aria-hidden="true" /> : null}
                {item.duration}
              </p>

              <h3 className="mt-3 text-2xl tracking-tight text-foreground sm:text-[1.7rem]">
                {item.role}
                <span className="text-muted"> · </span>
                <span className="text-accent">{item.company}</span>
              </h3>

              {"summary" in item && item.summary ? (
                <p className="mt-4 text-[0.98rem] text-foreground/90">{item.summary}</p>
              ) : null}

              <ul className="mt-5 grid gap-3">
                {highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-sm text-muted sm:text-[0.95rem]">
                    <span aria-hidden="true" className="mt-[0.65em] h-0.5 w-2.5 shrink-0 rounded-full bg-accent/80" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              {technologies.length > 0 ? (
                <ul className="mt-5 flex flex-wrap gap-2">
                  {technologies.map((technology) => (
                    <li key={`${item.company}-${technology}`} className="chip">
                      {technology}
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          </Reveal>
        );
      })}
    </ol>
  );
}
