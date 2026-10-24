"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRightIcon, GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { contactLinks } from "@/data/contact";
import { navItems } from "@/data/navigation";

const desktopItems = navItems.filter((item) => item.href !== "/" && item.href !== "/contact");

export function SiteNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const menuButton = menuButtonRef.current;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    sheetRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      menuButton?.focus();
    };
  }, [isOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 h-(--header-height) border-b transition-colors duration-300 ${
          isScrolled || isOpen
            ? "border-border bg-background/80 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="container-page flex h-full items-center justify-between gap-6">
          <Link href="/" className="group flex items-center gap-3" aria-label="Siddhant Yojit — home">
            <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full ring-1 ring-border-strong">
              <Image src="/favicon.png" alt="" fill sizes="32px" className="object-cover" />
            </span>
            <span className="text-[0.95rem] font-medium tracking-tight text-foreground">
              Siddhant Yojit
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {desktopItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`relative rounded-full px-3 py-1.5 text-[0.84rem] transition-colors duration-200 ${
                        active ? "bg-surface-hover text-foreground" : "text-muted hover:text-foreground"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              aria-current={isActive("/contact") ? "page" : undefined}
              className="btn btn-primary btn-sm hidden sm:inline-flex"
            >
              Contact
              <ArrowUpRightIcon className="btn-arrow h-3.5 w-3.5" />
            </Link>

            <button
              ref={menuButtonRef}
              type="button"
              className="btn btn-secondary btn-sm gap-2 xl:hidden"
              onClick={() => setIsOpen((current) => !current)}
              aria-expanded={isOpen}
              aria-controls="site-navigation-sheet"
            >
              <span>{isOpen ? "Close" : "Menu"}</span>
              <span aria-hidden="true" className="relative block h-2.5 w-3.5">
                <span
                  className={`absolute left-0 h-px w-full bg-current transition-transform duration-300 ${
                    isOpen ? "top-1/2 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 h-px w-full bg-current transition-transform duration-300 ${
                    isOpen ? "top-1/2 -rotate-45" : "bottom-0"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {isOpen
        ? createPortal(
            <div className="fixed inset-x-0 bottom-0 top-(--header-height) z-40 xl:hidden">
              <div
                className="absolute inset-0 bg-background/95 backdrop-blur-xl motion-reveal-fade"
                onClick={() => setIsOpen(false)}
              />
              <div
                ref={sheetRef}
                id="site-navigation-sheet"
                role="dialog"
                aria-modal="true"
                aria-label="Site navigation"
                tabIndex={-1}
                className="relative flex h-full flex-col overflow-y-auto outline-none motion-sheet"
              >
                <nav aria-label="Mobile" className="container-page flex-1 pt-6 pb-8">
                  <ul className="grid">
                    {navItems.map((item, index) => {
                      const active = isActive(item.href);
                      return (
                        <li key={item.href} className="border-b border-border">
                          <Link
                            href={item.href}
                            aria-current={active ? "page" : undefined}
                            onClick={() => setIsOpen(false)}
                            className="group flex items-baseline gap-4 py-3.5 motion-reveal"
                            style={{ animationDelay: `${60 + index * 35}ms` }}
                          >
                            <span className="w-6 font-mono text-[0.7rem] text-subtle">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span
                              className={`text-[1.7rem] leading-tight tracking-tight transition-colors sm:text-3xl ${
                                active ? "text-accent" : "text-foreground group-hover:text-accent"
                              }`}
                            >
                              {item.label}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <a href={`mailto:${contactLinks.email}`} className="btn btn-primary">
                      {contactLinks.email}
                    </a>
                    <a href={contactLinks.github} target="_blank" rel="noreferrer" className="btn btn-secondary btn-icon" aria-label="GitHub profile">
                      <GitHubIcon className="h-4 w-4" />
                    </a>
                    <a href={contactLinks.linkedin} target="_blank" rel="noreferrer" className="btn btn-secondary btn-icon" aria-label="LinkedIn profile">
                      <LinkedInIcon className="h-4 w-4" />
                    </a>
                  </div>
                </nav>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
