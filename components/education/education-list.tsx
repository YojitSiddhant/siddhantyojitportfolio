import Image from "next/image";
import { education } from "@/data/education";
import { Reveal } from "@/components/ui/reveal";

export function EducationList() {
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {education.map((item, index) => (
        <Reveal as="li" key={`${item.degree}-${item.institute}`} delay={index * 80} className="card card-interactive flex flex-col p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            {item.logo ? (
              <span className="logo-tile h-12 w-12 rounded-xl p-1.5">
                <Image src={item.logo} alt={`${item.institute} logo`} width={48} height={48} className="h-full w-full object-contain" />
              </span>
            ) : null}
            <span className="font-mono text-xs text-subtle">{item.duration}</span>
          </div>
          <h3 className="mt-10 text-2xl tracking-tight text-foreground">{item.institute}</h3>
          <p className="mt-2 text-muted">{item.degree}</p>
          {item.description ? <p className="mt-3 text-sm text-muted">{item.description}</p> : null}
        </Reveal>
      ))}
    </ul>
  );
}
