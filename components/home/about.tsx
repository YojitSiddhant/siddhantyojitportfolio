import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { profile } from "@/data/profile";

const facts = [
  { label: "Location", value: profile.location },
  { label: "Core focus", value: profile.coreFocus },
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
              Engineering the <span className="serif-accent text-accent">small details</span> that make products easier to use.
            </>
          }
        />
      </Reveal>

      <div className="mt-12 grid gap-12 md:grid-cols-12 md:gap-8 lg:mt-16">
        <Reveal className="md:col-span-7 md:col-start-4 lg:col-span-6 lg:col-start-4">
          <p className="text-lg leading-relaxed text-foreground/90 sm:text-xl">{profile.introText}</p>
          <figure className="mt-10 border-l border-accent pl-6">
            <blockquote className="serif-accent text-2xl leading-snug text-foreground sm:text-[1.7rem]">
              “{profile.whatICareAbout}”
            </blockquote>
            <figcaption className="eyebrow mt-4">What I care about</figcaption>
          </figure>
        </Reveal>

        <Reveal as="dl" delay={80} className="grid content-start md:col-span-12 md:grid-cols-2 lg:col-span-3 lg:grid-cols-1">
          {facts.map((fact) => (
            <div key={fact.label} className="border-t border-border py-4 md:pr-6 lg:pr-0">
              <dt className="eyebrow">{fact.label}</dt>
              <dd className="mt-1.5 text-sm text-muted">{fact.value}</dd>
            </div>
          ))}
        </Reveal>
      </div>

      <ul className="mt-16 grid gap-4 md:grid-cols-3 lg:mt-24">
        {profile.valueCards.map((card, index) => (
          <Reveal as="li" key={card.title} delay={index * 80} className="card card-interactive flex flex-col p-6 sm:p-7">
            <span className="font-mono text-xs text-accent">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="mt-10 text-xl tracking-tight text-foreground">{card.title}</h3>
            <p className="mt-3 text-sm text-muted">{card.description}</p>
          </Reveal>
        ))}
      </ul>

      <div className="mt-16 grid gap-12 md:grid-cols-12 md:gap-8 lg:mt-24">
        <Reveal className="md:col-span-5">
          <h3 className="eyebrow eyebrow-accent">How I work</h3>
          <ol className="mt-6 grid gap-6">
            {profile.workingApproach.map((step, index) => (
              <li key={step.title} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-2">
                <span className="serif-accent text-2xl leading-none text-subtle">{index + 1}.</span>
                <div>
                  <p className="text-lg tracking-tight text-foreground">{step.title}</p>
                  <p className="mt-1 text-sm text-muted">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={80} className="md:col-span-7">
          <h3 className="eyebrow eyebrow-accent">Focus areas</h3>
          <ul className="mt-6 grid gap-px overflow-hidden rounded-[1.25rem] border border-border bg-border sm:grid-cols-2">
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
