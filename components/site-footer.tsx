import Link from "next/link";
import { ArrowDownIcon, ArrowUpRightIcon, GitHubIcon, LinkedInIcon, MailIcon } from "@/components/ui/icons";
import { contactLinks } from "@/data/contact";
import { navItems } from "@/data/navigation";
import { profile } from "@/data/profile";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-border sm:mt-32">
      {/* CTA band */}
      <div className="border-b border-border bg-surface-strong">
        <div className="container-page flex flex-col items-center gap-6 py-16 text-center sm:py-20">
          <p className="eyebrow justify-center">Let&apos;s work together</p>
          <h2 className="max-w-2xl text-3xl tracking-tight text-foreground sm:text-5xl">
            Have a project in mind? <span className="text-accent">Let&apos;s talk.</span>
          </h2>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <Link href="/contact" className="btn btn-primary">
              Contact me
              <ArrowUpRightIcon className="btn-arrow h-4 w-4" />
            </Link>
            <a href="/siddhant-yojit-resume.pdf" download className="btn btn-secondary">
              Download resume
              <ArrowDownIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Sitemap */}
      <div className="container-page grid gap-12 py-14 sm:grid-cols-2 md:py-16 lg:grid-cols-12">
        <div className="sm:col-span-2 lg:col-span-5">
          <p className="text-2xl tracking-tight text-foreground">
            Siddhant Yojit<span className="text-accent">.</span>
          </p>
          <p className="mt-3 max-w-sm text-sm text-muted">
            {profile.snapshotTitle} based in {profile.location}. {profile.whatICareAbout}
          </p>
          <div className="mt-6 flex items-center gap-2">
            <a href={contactLinks.github} target="_blank" rel="noreferrer" className="btn btn-secondary btn-icon" aria-label="GitHub profile">
              <GitHubIcon className="h-4 w-4" />
            </a>
            <a href={contactLinks.linkedin} target="_blank" rel="noreferrer" className="btn btn-secondary btn-icon" aria-label="LinkedIn profile">
              <LinkedInIcon className="h-4 w-4" />
            </a>
            <a href={`mailto:${contactLinks.email}`} className="btn btn-secondary btn-icon" aria-label="Send an email">
              <MailIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        <nav aria-label="Footer" className="lg:col-span-4">
          <p className="eyebrow">Sitemap</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-muted transition-colors hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <p className="eyebrow">Get in touch</p>
          <ul className="mt-4 grid gap-2.5 text-sm">
            <li>
              <a href={`mailto:${contactLinks.email}`} className="text-muted transition-colors hover:text-foreground">
                {contactLinks.email}
              </a>
            </li>
            <li>
              <a href={`tel:${contactLinks.phone.replace(/\s+/g, "")}`} className="text-muted transition-colors hover:text-foreground">
                {contactLinks.phone}
              </a>
            </li>
            <li>
              <a href={contactLinks.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-muted transition-colors hover:text-foreground">
                WhatsApp
                <ArrowUpRightIcon className="h-3.5 w-3.5" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-2 pt-6 pb-20 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between sm:py-6 sm:pr-44">
          <p>© {year} Siddhant Yojit. All rights reserved.</p>
          <p className="font-mono">Built with Next.js &amp; Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
