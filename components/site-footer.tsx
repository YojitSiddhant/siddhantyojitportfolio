import Link from "next/link";
import { ArrowUpRightIcon, GitHubIcon, LinkedInIcon, MailIcon } from "@/components/ui/icons";
import { contactLinks } from "@/data/contact";
import { navItems } from "@/data/navigation";
import { profile } from "@/data/profile";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-border bg-surface-strong sm:mt-32">
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
        <div className="container-page flex flex-col gap-2 py-6 pr-36 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between sm:pr-44">
          <p>© {year} Siddhant Yojit. All rights reserved.</p>
          <p className="font-mono">Built with Next.js &amp; Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
