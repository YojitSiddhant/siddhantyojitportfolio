import { Reveal } from "@/components/ui/reveal";
import { profile } from "@/data/profile";
import { AcademicCapIcon, BriefcaseIcon, CodeIcon } from "@/components/ui/icons";

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

const valueIcons = [CodeIcon, BriefcaseIcon, AcademicCapIcon];

export function About() {
  return (
    <div id="about">
      {/* Feature section 1 — the statement */}
      <section aria-labelledby="about-title" className="container-page py-20 sm:py-28">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center">About</p>
          <h2 id="about-title" className="mt-5 text-3xl tracking-tight text-foreground sm:text-5xl lg:text-[3.4rem]">
            Engineering the <span className="text-accent">small details</span> that make products easier to use.
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-muted">{profile.introText}</p>
        </Reveal>

        <Reveal delay={120} className="mx-auto mt-14 grid max-w-4xl gap-px overflow-hidden rounded-[1.25rem] border border-border bg-border sm:grid-cols-3">
          {notes.map((note) => (
            <div key={note.label} className="bg-surface p-6 text-left">
              <p className="eyebrow">{note.label}</p>
              <p className="mt-2 text-sm text-muted">{note.value}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Feature section 2 — what I care about, on a soft grey band */}
      <section aria-label="What I care about" className="border-y border-border bg-surface-strong py-20 sm:py-28">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <blockquote className="text-2xl font-medium leading-snug tracking-tight text-foreground sm:text-3xl">
              “{profile.whatICareAbout}”
            </blockquote>
          </Reveal>
          <Reveal delay={100} className="mx-auto mt-12 grid max-w-xl gap-8 sm:grid-cols-2">
            {keyFacts.map((fact) => (
              <div key={fact.label} className="text-center">
                <p className="eyebrow justify-center">{fact.label}</p>
                <p className="mt-2 text-base text-foreground">{fact.value}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Feature section 3 — value props */}
      <section aria-label="What I bring" className="container-page py-20 sm:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h3 className="text-2xl tracking-tight text-foreground sm:text-4xl">What I bring to a team</h3>
        </Reveal>
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {profile.valueCards.map((card, index) => {
            const Icon = valueIcons[index] ?? CodeIcon;
            return (
              <Reveal
                as="li"
                key={card.title}
                delay={index * 90}
                className={`card card-interactive flex flex-col p-7 sm:p-8 ${index === 0 ? "md:col-span-3 lg:col-span-1" : ""}`}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft text-accent">
                  <Icon className="h-5 w-5" />
                </span>
                <h4 className="mt-6 text-xl tracking-tight text-foreground">{card.title}</h4>
                <p className="mt-3 text-sm text-muted">{card.description}</p>
              </Reveal>
            );
          })}
        </ul>
      </section>

      {/* Feature section 4 — how I work + focus areas, on a soft grey band */}
      <section aria-label="How I work" className="border-t border-border bg-surface-strong py-20 sm:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <h3 className="eyebrow eyebrow-accent">How I work</h3>
            <ol className="mt-6 grid gap-6">
              {profile.workingApproach.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="shrink-0 font-mono text-sm text-accent">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="text-lg tracking-tight text-foreground">{step.title}</p>
                    <p className="mt-1 text-sm text-muted">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={80} className="lg:col-span-7">
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
    </div>
  );
}
