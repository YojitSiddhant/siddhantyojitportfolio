import Link from "next/link";
import type { CSSProperties } from "react";
import { AcademicCapIcon, ArrowRightIcon, ArrowUpRightIcon, BriefcaseIcon, CodeIcon, GitHubIcon, LinkedInIcon, MapPinIcon } from "@/components/ui/icons";
import { contactLinks } from "@/data/contact";
import { education } from "@/data/education";
import { experience } from "@/data/experience";
import { fullStackProjects } from "@/data/full-stack-projects";
import { profile } from "@/data/profile";
import { workItems } from "@/data/work";

const gridMask = "radial-gradient(ellipse 70% 60% at 30% 10%, #000 30%, transparent 75%)";
const heroGridStyle: CSSProperties = {
  backgroundImage:
    "linear-gradient(to right, rgba(15,23,42,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.045) 1px, transparent 1px)",
  backgroundSize: "4.5rem 4.5rem",
  maskImage: gridMask,
  WebkitMaskImage: gridMask,
};

const current =[...experience].sort((a, b) => a.order - b.order)[0];
const latestDegree = education[0];
const introLead = profile.introText.split(/(?<=\.)\s/)[0];

const stats = [
  { value: String(fullStackProjects.length).padStart(2, "0"), label: "Full-stack builds", Icon: CodeIcon },
  { value: String(workItems.length).padStart(2, "0"), label: "Live client sites", Icon: BriefcaseIcon },
  {
    value: String(experience.filter((item) => /intern/i.test(item.role)).length).padStart(2, "0"),
    label: "Internships",
    Icon: BriefcaseIcon,
  },
  { value: "MCA", label: latestDegree.institute, Icon: AcademicCapIcon },
];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={heroGridStyle}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-[-10%] -z-10 h-144 w-200 max-w-none rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(37,99,235,0.07), transparent)" }}
      />

      <div className="container-page pt-14 pb-16 sm:pt-24 sm:pb-20 lg:pt-28">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 motion-reveal">
          {current ? (
            <Link
              href="/experience"
              className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface py-1.5 pl-3 pr-4 text-[0.8rem] text-muted transition-colors hover:border-border-strong hover:text-foreground"
            >
              <span className="status-dot" aria-hidden="true" />
              <span>
                {current.role} at <span className="text-foreground">{current.company}</span>
              </span>
            </Link>
          ) : null}
          <span className="inline-flex items-center gap-1.5 text-[0.8rem] text-subtle">
            <MapPinIcon className="h-3.5 w-3.5" />
            {profile.location}
          </span>
        </div>

        <h1
          id="hero-title"
          className="mt-10 text-[clamp(3.4rem,12vw,9.5rem)] font-semibold text-foreground motion-reveal"
          style={{ animationDelay: "80ms" }}
        >
          Siddhant <span className="text-accent">Yojit</span>
        </h1>

        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-12">
          <p
            className="max-w-3xl text-2xl font-medium leading-tight tracking-tight text-subtle sm:text-3xl lg:col-span-7 lg:text-[2.1rem] motion-reveal"
            style={{ animationDelay: "180ms" }}
          >
            {profile.snapshotTitle} building{" "}
            <span className="text-foreground">clear interfaces</span>, reusable components, and{" "}
            <span className="text-foreground">reliable workflows</span> for the web.
          </p>

          <div className="flex flex-col gap-8 lg:col-span-5 motion-reveal" style={{ animationDelay: "280ms" }}>
            <p className="text-base text-muted sm:text-lg">{introLead}</p>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/full-stack-projects" className="btn btn-primary">
                View projects
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="btn btn-secondary">
                Contact me
                <ArrowUpRightIcon className="btn-arrow h-4 w-4" />
              </Link>
              <span className="flex items-center gap-2">
                <a href={contactLinks.github} target="_blank" rel="noreferrer" className="btn btn-secondary btn-icon" aria-label="GitHub profile">
                  <GitHubIcon className="h-4 w-4" />
                </a>
                <a href={contactLinks.linkedin} target="_blank" rel="noreferrer" className="btn btn-secondary btn-icon" aria-label="LinkedIn profile">
                  <LinkedInIcon className="h-4 w-4" />
                </a>
              </span>
            </div>
          </div>
        </div>

        <dl
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-[1.25rem] border border-border bg-border sm:mt-20 lg:grid-cols-4 motion-reveal"
          style={{ animationDelay: "380ms" }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse items-center gap-1 bg-surface px-5 py-5 text-center sm:px-6 sm:py-6">
              <dt className="text-sm text-muted">{stat.label}</dt>
              <dd className="flex items-center justify-center gap-3 text-3xl tracking-tight text-foreground sm:text-4xl"><span>{stat.value}</span><stat.Icon className="h-5 w-5 text-accent sm:h-6 sm:w-6" /></dd>
            </div>
          ))}
        </dl>


      </div>
    </section>
  );
}
