import Link from "next/link";
import { About } from "@/components/home/about";
import { ContactCta } from "@/components/home/contact-cta";
import { Hero } from "@/components/home/hero";
import { EducationList } from "@/components/education/education-list";
import { ExperienceTimeline } from "@/components/experience/experience-timeline";
import { FullStackProjectsShowcase } from "@/components/full-stack-projects/full-stack-projects-showcase";
import { SkillGroups } from "@/components/skills/skill-groups";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { WorkGrid } from "@/components/work/work-grid";
import { certificates } from "@/data/certificates";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <main className="relative isolate overflow-x-clip">
      <Hero />

      <div className="flex flex-col gap-28 pt-8 sm:gap-36 sm:pt-12">
        <About />

        <section aria-labelledby="skills-title" id="skills" className="container-page scroll-mt-24">
          <Reveal>
            <SectionHeading
              id="skills-title"
              index="02"
              eyebrow="Toolkit"
              title={
                <>
                  The stack I use to <span className="serif-accent text-accent">ship</span>.
                </>
              }
              description={profile.coreFocus}
              link={{ href: "/skills", label: "Skills page" }}
            />
          </Reveal>
          <div className="mt-12">
            <SkillGroups />
          </div>
        </section>

        <section aria-labelledby="projects-title" id="projects" className="container-page scroll-mt-24">
          <Reveal>
            <SectionHeading
              id="projects-title"
              index="03"
              eyebrow="Selected work"
              title={
                <>
                  Full-stack products, <span className="serif-accent text-accent">built end to end</span>.
                </>
              }
              description="Frontend, backend, and database work that fits together — open any project for the full case study."
              link={{ href: "/full-stack-projects", label: "All full-stack projects" }}
            />
          </Reveal>
          <div className="mt-12">
            <FullStackProjectsShowcase />
          </div>
          <Reveal className="mt-4">
            <Link
              href="/projects"
              className="group card card-interactive flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7"
            >
              <span>
                <span className="eyebrow">Academic projects · {String(projects.length).padStart(2, "0")}</span>
                <span className="mt-2 block text-lg tracking-tight text-foreground">
                  {projects.map((project) => project.title).join(" · ")}
                </span>
              </span>
              <ArrowRightIcon className="h-5 w-5 shrink-0 text-subtle transition-all group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
          </Reveal>
        </section>

        <section aria-labelledby="work-title" id="work" className="container-page scroll-mt-24">
          <Reveal>
            <SectionHeading
              id="work-title"
              index="04"
              eyebrow="Client work"
              title={
                <>
                  Live sites I&apos;ve <span className="serif-accent text-accent">contributed to</span>.
                </>
              }
              link={{ href: "/my-work", label: "My Work page" }}
            />
          </Reveal>
          <div className="mt-12">
            <WorkGrid />
          </div>
        </section>

        <section aria-labelledby="experience-title" id="experience" className="container-page scroll-mt-24">
          <Reveal>
            <SectionHeading
              id="experience-title"
              index="05"
              eyebrow="Experience & education"
              title={
                <>
                  Where I&apos;ve been <span className="serif-accent text-accent">building</span>.
                </>
              }
              link={{ href: "/experience", label: "Experience page" }}
            />
          </Reveal>
          <div className="mt-12">
            <ExperienceTimeline />
          </div>

          <div className="mt-16 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h3 className="eyebrow eyebrow-accent">Education</h3>
            <Link href="/certificate" className="link-arrow text-sm">
              {certificates.length} certificates
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-6">
            <EducationList />
          </div>
        </section>

        <ContactCta />
      </div>
    </main>
  );
}
