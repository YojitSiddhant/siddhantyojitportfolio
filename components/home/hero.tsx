import Link from "next/link";
import { AcademicCapIcon, ArrowDownIcon, ArrowRightIcon, ArrowUpRightIcon, BriefcaseIcon, CodeIcon, GitHubIcon, LinkedInIcon, MapPinIcon } from "@/components/ui/icons";
import { contactLinks } from "@/data/contact";
import { education } from "@/data/education";
import { experience } from "@/data/experience";
import { fullStackProjects } from "@/data/full-stack-projects";
import { profile } from "@/data/profile";
import { workItems } from "@/data/work";

const current = [...experience].sort((a, b) => a.order - b.order)[0];
const latestDegree = education[0];

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

export function Hero({ githubContributions, githubYear }: { githubContributions: number | null; githubYear: number }) {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-48 left-1/2 -z-10 h-160 w-320 max-w-none -translate-x-1/2 rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(0,113,227,0.08), transparent)" }}
      />

      <div className="container-page flex flex-col items-center pt-20 pb-20 text-center sm:pt-28 sm:pb-24 lg:pt-36">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 motion-reveal">
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
          className="mt-8 max-w-5xl text-[clamp(2.8rem,9vw,7rem)] font-semibold text-foreground motion-reveal"
          style={{ animationDelay: "80ms" }}
        >
          Building clear, reliable <span className="text-accent">full-stack products</span>.
        </h1>

        <p
          className="mt-7 max-w-2xl text-lg leading-relaxed text-muted motion-reveal sm:text-xl"
          style={{ animationDelay: "180ms" }}
        >
          {profile.snapshotTitle} based in {profile.location.split(",")[0]} — React.js, Next.js, Node.js, and
          Express.js, with REST APIs and database-driven workflows on PostgreSQL and MySQL.
        </p>

        <div
          className="mt-9 flex flex-wrap items-center justify-center gap-3 motion-reveal"
          style={{ animationDelay: "280ms" }}
        >
          <Link href="/full-stack-projects" className="btn btn-primary">
            View projects
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
          <a href="/siddhant-yojit-resume.pdf" download className="btn btn-secondary">
            Download resume
            <ArrowDownIcon className="h-4 w-4" />
          </a>
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

      <div className="border-t border-border bg-surface-strong motion-reveal" style={{ animationDelay: "380ms" }}>
        <div className="container-page">
          <dl className="grid grid-cols-2 divide-x divide-y divide-border sm:grid-cols-4 sm:divide-y-0">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-2 py-8 text-center">
                <dd className="flex items-center gap-2.5 text-4xl tracking-tight text-foreground sm:text-5xl">
                  <stat.Icon className="h-5 w-5 text-accent sm:h-6 sm:w-6" />
                  {stat.value}
                </dd>
                <dt className="text-sm text-muted">{stat.label}</dt>
              </div>
            ))}
          </dl>

          {githubContributions !== null ? (
            <p className="border-t border-border py-4 text-center text-sm text-muted">
              <span className="text-foreground">{githubContributions}</span> public GitHub contributions in{" "}
              {githubYear}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
