import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { profile } from "@/data/profile";

const keyFacts = [
  { label: "Location", value: profile.location },
  { label: "Core focus", value: profile.coreFocus },
];

const notes = [
  ...profile.quickNotes.map((note) => ({ label: note.label, value: note.value })),
  ...profile.headerNotes
    .filter((note) => note.label !== "Current role")
    .map((note) => ({ label: note.label, value: note.value })),
];

export function About() {
  return (
    <section aria-labelledby="about-title" id="about" className="container-page scroll-mt-24">
      <Reveal>
        <SectionHeading
          id="about-title"
          index="01"
          eyebrow="About"
          title={
            <>
              Engineering the <span className="text-accent">small details</span> that make products easier to use.
            </>
          }
        />
      </Reveal>

      <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-12">
        <Reveal className="flex flex-col gap-10 lg:col-span-7 lg:justify-between lg:gap-8">
          <p className="text-lg leading-relaxed text-foreground/90 sm:text-xl xl:text-[1.35rem]">{profile.introText}</p>
          <figure className="border-l-2 border-accent pl-6">
            <blockquote className="text-xl font-medium leading-snug tracking-tight text-foreground sm:text-2xl">
              “{profile.whatICareAbout}”
            </blockquote>
            <figcaption className="eyebrow mt-4">What I care about</figcaption>
          </figure>
          <dl className="grid gap-x-8 sm:grid-cols-2">
            {keyFacts.map((fact) => (
              <div key={fact.label} className="border-t border-border py-4">
                <dt className="eyebrow">{fact.label}</dt>
                <dd className="mt-1.5 text-[0.95rem] text-foreground">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={80} className="lg:col-span-5">
          <dl className="card grid bg-surface-strong px-6 py-2 sm:px-8 md:grid-cols-2 md:gap-x-8 lg:grid-cols-1">
            {notes.map((fact, index) => (
              <div
                key={fact.label}
                className={`py-4 ${index === 0 ? "" : "border-t border-border"} ${index === 1 ? "md:border-t-0 lg:border-t" : ""}`}
              >
                <dt className="eyebrow">{fact.label}</dt>
                <dd className="mt-1.5 text-sm text-muted">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <ul className="mt-16 grid gap-4 md:grid-cols-3 lg:mt-20">
        {profile.valueCards.map((card, index) => (
          <Reveal as="li" key={card.title} delay={index * 80} className="card card-interactive flex flex-col p-6 sm:p-7">
            <span className="font-mono text-xs text-accent">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="mt-5 text-xl tracking-tight text-foreground">{card.title}</h3>
            <p className="mt-3 text-sm text-muted">{card.description}</p>
          </Reveal>
        ))}
      </ul>

      <div className="mt-16 grid gap-12 md:grid-cols-12 md:gap-8 lg:mt-20">
        <Reveal className="flex flex-col md:col-span-5">
          <h3 className="eyebrow eyebrow-accent">How I work</h3>
          <ol className="mt-6 grid flex-1 auto-rows-fr divide-y divide-border overflow-hidden rounded-[1.25rem] border border-border bg-surface-strong">
            {profile.workingApproach.map((step, index) => (
              <li key={step.title} className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-center gap-2 p-5 sm:px-6">
                <span className="font-mono text-sm text-accent">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <p className="text-lg tracking-tight text-foreground">{step.title}</p>
                  <p className="mt-1 text-sm text-muted">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={80} className="flex flex-col md:col-span-7">
          <h3 className="eyebrow eyebrow-accent">Focus areas</h3>
          <ul className="mt-6 grid flex-1 gap-px overflow-hidden rounded-[1.25rem] border border-border bg-border sm:grid-cols-2">
            {profile.focusAreas.map((area) => (
              <li key={area.title} className="bg-surface p-5">
                <p className="text-[0.95rem] text-foreground">{area.title}</p>
                <p className="mt-1 text-sm text-muted">{area.description}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
