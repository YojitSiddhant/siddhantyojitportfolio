import Link from "next/link";
import { ArrowUpRightIcon, GitHubIcon, LinkedInIcon, PhoneIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { contactLinks } from "@/data/contact";
import { profile } from "@/data/profile";

export function ContactCta() {
  return (
    <section aria-labelledby="contact-title" id="contact" className="container-page scroll-mt-24">
      <Reveal className="card relative overflow-hidden bg-surface-strong px-6 py-14 sm:px-12 sm:py-20 lg:px-16 lg:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -bottom-40 h-120 w-120 rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(37,99,235,0.08), transparent)" }}
        />

        <p className="eyebrow eyebrow-accent">06 — Contact</p>
        <h2 id="contact-title" className="mt-8 max-w-4xl text-[2.5rem] text-foreground sm:text-6xl lg:text-7xl">
          Have a role or project in mind? <span className="serif-accent text-accent">Let&apos;s talk.</span>
        </h2>
        <p className="mt-6 max-w-xl text-base text-muted sm:text-lg">
          {profile.snapshotTitle} based in {profile.location}. Usually replies within 24 hours.
        </p>

        <a
          href={`mailto:${contactLinks.email}`}
          className="group mt-12 inline-flex max-w-full items-center gap-3 text-[clamp(1.2rem,4.6vw,2.6rem)] tracking-tight text-foreground transition-colors hover:text-accent"
        >
          <span className="truncate underline decoration-border-strong decoration-1 underline-offset-[0.25em] transition-colors group-hover:decoration-accent">
            {contactLinks.email}
          </span>
          <ArrowUpRightIcon className="btn-arrow h-[0.8em] w-[0.8em] shrink-0" />
        </a>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <Link href="/contact" className="btn btn-primary">
            Send a message
            <ArrowUpRightIcon className="btn-arrow h-4 w-4" />
          </Link>
          <a href={contactLinks.linkedin} target="_blank" rel="noreferrer" className="btn btn-secondary">
            <LinkedInIcon className="h-4 w-4" />
            LinkedIn
          </a>
          <a href={contactLinks.github} target="_blank" rel="noreferrer" className="btn btn-secondary">
            <GitHubIcon className="h-4 w-4" />
            GitHub
          </a>
          <a href={`tel:${contactLinks.phone.replace(/\s+/g, "")}`} className="btn btn-secondary">
            <PhoneIcon className="h-4 w-4" />
            {contactLinks.phone}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
