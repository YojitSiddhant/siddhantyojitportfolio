"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Home", href: "/", icon: HomeIcon },
  { label: "Education", href: "/education", icon: GraduationIcon },
  { label: "Skills", href: "/skills", icon: SparklesIcon },
  { label: "Projects", href: "/projects", icon: BriefcaseIcon },
  { label: "Full Stack Projects", href: "/full-stack-projects", icon: FullStackProjectsIcon },
  { label: "My Work", href: "/my-work", icon: WorkIcon },
  { label: "Certificate", href: "/certificate", icon: CertificateIcon },
  { label: "Experience", href: "/experience", icon: TimelineIcon },
  { label: "Contact", href: "/contact", icon: MailIcon },
];

type IconProps = {
  className?: string;
};

function HomeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`h-4 w-4 ${className ?? ""}`} fill="none">
      <path
        d="M4 11.5 12 5l8 6.5V20a1 1 0 0 1-1 1h-4.5v-6h-5V21H5a1 1 0 0 1-1-1v-8.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GraduationIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`h-4 w-4 ${className ?? ""}`} fill="none">
      <path
        d="M3 10.5 12 6l9 4.5-9 4.5-9-4.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 12.5V16c0 1.6 2.5 3 5.5 3s5.5-1.4 5.5-3v-3.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SparklesIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`h-4 w-4 ${className ?? ""}`} fill="none">
      <path
        d="M12 3.5 13.9 8l4.5 1.9-4.5 1.9L12 16.3l-1.9-4.5-4.5-1.9 4.5-1.9L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M18.5 14.5 19.3 16.2 21 17l-1.7.8-.8 1.7-.8-1.7-1.7-.8 1.7-.8.8-1.7Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BriefcaseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`h-4 w-4 ${className ?? ""}`} fill="none">
      <path
        d="M9 7V6a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3v1"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M4 9.5A1.5 1.5 0 0 1 5.5 8h13A1.5 1.5 0 0 1 20 9.5v8A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5v-8Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M4 13h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function FullStackProjectsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`h-4 w-4 ${className ?? ""}`} fill="none">
      <path d="M4 13h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path
        d="M6.5 7.5h11A2 2 0 0 1 19.5 9.5v5A2 2 0 0 1 17.5 16.5h-11A2 2 0 0 1 4.5 14.5v-5a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M9 9.5h6M9 11.5h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function WorkIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`h-4 w-4 ${className ?? ""}`} fill="none">
      <path
        d="M9 7V6a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3v1"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M4 9.5A1.5 1.5 0 0 1 5.5 8h13A1.5 1.5 0 0 1 20 9.5v8A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5v-8Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M4 13h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M9.5 13.5V15h5v-1.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function CertificateIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`h-4 w-4 ${className ?? ""}`} fill="none">
      <path
        d="M7 5.5A1.5 1.5 0 0 1 8.5 4h7A1.5 1.5 0 0 1 17 5.5v8A1.5 1.5 0 0 1 15.5 15h-7A1.5 1.5 0 0 1 7 13.5v-8Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M9 18.5 10.5 15l1.5 1 1.5-1 1.5 3.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9.5 7.5h5M9.5 10h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function TimelineIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`h-4 w-4 ${className ?? ""}`} fill="none">
      <path
        d="M5 6h14M5 12h9M5 18h14"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <circle cx="18" cy="12" r="1.4" fill="currentColor" />
    </svg>
  );
}

function MailIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`h-4 w-4 ${className ?? ""}`} fill="none">
      <path
        d="M4 7.5A1.5 1.5 0 0 1 5.5 6h13A1.5 1.5 0 0 1 20 7.5v9A1.5 1.5 0 0 1 18.5 18h-13A1.5 1.5 0 0 1 4 16.5v-9Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="m5.5 7.5 6.5 5 6.5-5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SiteNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-surface-strong backdrop-blur-md supports-backdrop-filter:bg-surface-strong">
        <div className="portfolio-navbar-shell mx-auto flex w-full max-w-7xl items-center justify-between px-3 py-3 sm:px-6 sm:py-4 lg:px-8 motion-reveal">
          <Link
            href="/"
            className="portfolio-navbar-logo relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full shadow-md"
            aria-label="Go to home"
          >
            <Image src="/favicon.png" alt="" fill sizes="36px" className="object-cover" priority={false} />
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden text-sm font-black uppercase tracking-wide text-foreground sm:block sm:text-base"
              aria-label="Go to home"
            >
              Siddhant Yojit
            </Link>

            <button
              type="button"
              className={`burger-menu-button inline-flex items-center justify-center text-foreground transition-colors hover:text-accent ${isOpen ? "burger-menu-button--open" : ""}`}
              onClick={() => setIsOpen((current) => !current)}
              aria-expanded={isOpen}
              aria-controls="desktop-navigation-menu"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              <span className="sr-only">{isOpen ? "Close navigation menu" : "Open navigation menu"}</span>
              <span className="burger-menu-button__lines" aria-hidden="true">
                <span className="burger-menu-button__line burger-menu-button__line--top" />
                <span className="burger-menu-button__line burger-menu-button__line--middle" />
                <span className="burger-menu-button__line burger-menu-button__line--bottom" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {isOpen
        ? createPortal(
            <div
              className="fixed inset-0 z-60 flex items-center justify-center bg-black/20 px-4 py-6 backdrop-blur-sm motion-reveal-fade sm:py-8"
              onClick={() => setIsOpen(false)}
            >
              <div
                id="desktop-navigation-menu"
                role="dialog"
                aria-modal="true"
                aria-label="Site navigation"
                className="portfolio-navbar-mobile w-full max-w-104 max-h-screen overflow-hidden rounded-3xl border border-border bg-surface-strong p-4 shadow-2xl backdrop-blur-xl sm:max-h-screen sm:p-5"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted">Navigation</p>
                    <p className="mt-1 text-sm text-muted">Choose a section to jump to.</p>
                  </div>
                  <button
                    type="button"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-colors hover:bg-accent-soft"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close navigation menu"
                  >
                    <span className="block text-xl leading-none">&times;</span>
                  </button>
                </div>

                <nav className="grid max-h-full gap-2 overflow-y-auto pr-1 sm:grid-cols-2">
                  {navItems.map((item, index) => {
                    const isFullStackProjects = item.label === "Full Stack Projects";

                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        onClick={() => {
                          setIsOpen(false);
                        }}
                        className={`group inline-flex w-full items-center justify-center gap-2.5 rounded-2xl border px-4 py-2.5 text-center text-sm transition duration-300 motion-reveal ${
                          isActive(item.href)
                            ? "border-accent! bg-accent! font-bold! text-white!"
                            : "border-border font-normal text-muted hover:border-accent hover:bg-accent-soft hover:font-bold hover:text-foreground"
                        }`}
                        style={{ animationDelay: `${index * 70}ms` }}
                      >
                        <span
                          className={`transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110 group-hover:rotate-12 ${
                            isActive(item.href) ? "text-white" : "text-accent"
                          }`}
                        >
                          <item.icon />
                        </span>
                        <span
                          className={`text-center transition-transform duration-300 group-hover:translate-x-0.5 ${
                            isFullStackProjects ? "whitespace-nowrap text-[13px] leading-none sm:text-sm" : ""
                          }`}
                        >
                          {item.label}
                        </span>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
