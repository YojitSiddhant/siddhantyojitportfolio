import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills | Siddhant Yojit",
  description: "Frontend skills for Siddhant Yojit.",
};

type LogoProps = {
  className?: string;
};

type SkillItem = {
  name: string;
  href: string;
  Logo: ({ className }: LogoProps) => React.JSX.Element;
};

function HtmlLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className} fill="none">
      <path d="M10 6h44l-4 46-18 6-18-6-4-46Z" fill="#E34F26" />
      <path d="M32 12v38.5l13-4.1 3.4-34.4H32Z" fill="#EF652A" opacity="0.9" />
      <path d="M20 19h24l-1 5H25.4l.7 6.7H42l-1.6 16-8.4 2.5-8.4-2.5-.6-6h4.8l.3 2.9 4 1.2 4-1.2.5-5.3H22.6L21 19Z" fill="#fff" />
    </svg>
  );
}

function CssLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className} fill="none">
      <path d="M10 6h44l-4 46-18 6-18-6-4-46Z" fill="#1572B6" />
      <path d="M32 12v38.5l13-4.1 3.4-34.4H32Z" fill="#33A9DC" opacity="0.9" />
      <path d="M21 19h22l-.4 4.7H25.4l.6 5.6h13.7l-1.5 15.3-6.2 2-6.3-2-.5-4.9h4.2l.2 2 2.4.8 2.4-.8.4-4.4H23.2L21 19Z" fill="#fff" />
    </svg>
  );
}

function JavascriptLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className} fill="none">
      <rect x="8" y="8" width="48" height="48" rx="8" fill="#F7DF1E" />
      <path d="M28 24h4v14.5c0 4.7-2.6 7.5-7 7.5-2.6 0-4.4-1-5.8-3l3.1-2.2c.6 1.1 1.4 1.7 2.5 1.7 1.7 0 2.8-1 2.8-3.9V24Zm11 0h4v18h-4V24Z" fill="#1E1E1E" />
    </svg>
  );
}

function AngularLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className} fill="none">
      <path d="M32 6 10 14l4 26 18 18 18-18 4-26L32 6Z" fill="#DD0031" />
      <path d="M32 12 16 18l3 20 13 14 13-14 3-20-16-6Z" fill="#C3002F" />
      <path d="M32 20 22 43h6l2-5h8l2 5h6L32 20Zm-1 13 2.4-6.4L35 33h-4Z" fill="#fff" />
    </svg>
  );
}

function ReactLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className} fill="none">
      <circle cx="32" cy="32" r="5.2" fill="#61DAFB" />
      <ellipse cx="32" cy="32" rx="24" ry="8.2" stroke="#61DAFB" strokeWidth="3" />
      <ellipse cx="32" cy="32" rx="24" ry="8.2" stroke="#61DAFB" strokeWidth="3" transform="rotate(60 32 32)" />
      <ellipse cx="32" cy="32" rx="24" ry="8.2" stroke="#61DAFB" strokeWidth="3" transform="rotate(120 32 32)" />
    </svg>
  );
}

function FlutterLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className} fill="none">
      <path d="M10 32 32 10h14L24 32 46 54H32L10 32Z" fill="#02569B" />
      <path d="M26 32 42 16h10L36 32l16 16H42L26 32Z" fill="#44D1FD" />
      <path d="M26 32 38 20h8L32 34l12 12h-8L26 32Z" fill="#fff" opacity="0.92" />
    </svg>
  );
}

function TechBadgeIcon({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M9 18 3.5 12 9 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m15 6 5.5 6-5.5 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BriefcaseIcon({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
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

const skills: SkillItem[] = [
  { name: "HTML", href: "https://developer.mozilla.org/en-US/docs/Web/HTML", Logo: HtmlLogo },
  { name: "CSS", href: "https://developer.mozilla.org/en-US/docs/Web/CSS", Logo: CssLogo },
  {
    name: "JAVASCRIPT",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    Logo: JavascriptLogo,
  },
  { name: "ANGULAR", href: "https://angular.dev/", Logo: AngularLogo },
  { name: "REACT", href: "https://react.dev/", Logo: ReactLogo },
  { name: "FLUTTER", href: "https://docs.flutter.dev/", Logo: FlutterLogo },
];

export default function SkillsPage() {
  return (
    <main className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(0,0,0,0.01),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(0,0,0,0.008),_transparent_28%),radial-gradient(circle_at_bottom,_rgba(0,0,0,0.004),_transparent_36%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[18rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.78)_0%,rgba(255,255,255,0.56)_70%,rgba(255,255,255,0.18)_100%)]" />

      <section className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 pb-10 pt-5 sm:px-6 sm:pb-12 sm:pt-6 lg:px-8 lg:pt-8 motion-reveal">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)] px-1 py-4 motion-reveal" style={{ animationDelay: "80ms" }}>
          <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.24em] text-[var(--foreground)]">
            <TechBadgeIcon className="h-4 w-4 text-[var(--accent)]" />
            Frontend Skills
          </div>
          <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
            <BriefcaseIcon className="h-4 w-4 text-[var(--accent)]" />
            Frontend, UI
          </div>
        </div>

        <section className="px-1 py-2 motion-reveal" style={{ animationDelay: "160ms" }}>
          <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
            {skills.map(({ name, href, Logo }, index) => (
              <article
                key={name}
                className="flex flex-col items-center justify-center gap-3 px-4 py-6 text-center motion-reveal"
                style={{ animationDelay: `${220 + index * 100}ms` }}
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center">
                  <Logo className="h-14 w-14" />
                </div>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="min-w-0 text-base font-black uppercase tracking-[0.24em] text-[var(--foreground)] transition-colors hover:text-[var(--accent)]"
                >
                  {name}
                </a>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
