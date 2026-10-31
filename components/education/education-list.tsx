import Image from "next/image";
import { education } from "@/data/education";
import { Reveal } from "@/components/ui/reveal";

export function EducationList() {
  return (
    <ul className="grid gap-4">
      {education.map((item, index) => (
        <Reveal
          as="li"
          key={`${item.degree}-${item.institute}`}
          delay={index * 80}
          className="card flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:gap-6 sm:p-7"
        >
          {item.logo ? (
            <span className="logo-tile h-12 w-12 shrink-0 rounded-xl p-1.5">
              <Image src={item.logo} alt={`${item.institute} logo`} width={48} height={48} className="h-full w-full object-contain" />
            </span>
          ) : null}
          <div className="min-w-0 flex-1">
            <h3 className="text-lg tracking-tight text-foreground">{item.institute}</h3>
            <p className="mt-0.5 text-sm text-muted">{item.degree}</p>
            {item.description ? <p className="mt-2 text-sm text-muted">{item.description}</p> : null}
          </div>
          <span className="shrink-0 font-mono text-xs text-subtle sm:ml-auto">{item.duration}</span>
        </Reveal>
      ))}
    </ul>
  );
}
