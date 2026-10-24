import Image from "next/image";
import { experience } from "@/data/experience";
import { Reveal } from "@/components/ui/reveal";

const orderedExperience = [...experience].sort((a, b) => a.order - b.order);

export function ExperienceTimeline() {
  return (
    <ol className="relative grid gap-4">
      {orderedExperience.map((item, index) => {
        const highlights = item.description
          .split(/\r?\n/)
          .map((highlight) => highlight.trim())
          .filter(Boolean);
        const technologies = "technologies" in item && Array.isArray(item.technologies) ? (item.technologies as string[]) : [];
        const isCurrent = /present/i.test(item.duration);

        return (
          <Reveal as="li" key={`${item.role}-${item.company}`} delay={index * 80} className="card p-5 sm:p-8">
            <article className="grid gap-6 md:grid-cols-12 md:gap-8">
              <div className="flex items-start gap-4 md:col-span-4 md:flex-col">
                {item.logo ? (
                  <span className="logo-tile h-12 w-12 rounded-xl">
                    <Image src={item.logo} alt={`${item.company} logo`} width={48} height={48} className="h-full w-full object-cover" />
                  </span>
                ) : null}
                <div className="min-w-0">
                  <p className="flex items-center gap-2 font-mono text-xs text-subtle">
                    {isCurrent ? <span className="status-dot" aria-hidden="true" /> : null}
                    {item.duration}
                  </p>
                  <p className="mt-2 text-sm text-muted">Bengaluru, Karnataka</p>
                </div>
              </div>

              <div className="min-w-0 md:col-span-8">
                <h3 className="text-2xl tracking-tight text-foreground sm:text-[1.7rem]">
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
              </div>
            </article>
          </Reveal>
        );
      })}
    </ol>
  );
}
