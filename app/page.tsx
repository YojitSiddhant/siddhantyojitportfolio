type IconProps = {
  className?: string;
};

function SparkleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M12 3.5 13.9 8l4.5 1.9-4.5 1.9L12 16.3l-1.9-4.5-4.5-1.9 4.5-1.9L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M18.5 14.5 19.3 16.2 21 17l-1.7.8-.8 1.7-.8-1.7-1.7-.8 1.7-.8.8-1.7Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BriefcaseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M9 7V6a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3v1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M4 9.5A1.5 1.5 0 0 1 5.5 8h13A1.5 1.5 0 0 1 20 9.5v8A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5v-8Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M4 13h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function MapPinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M12 21s6-5.1 6-10.2A6 6 0 1 0 6 10.8C6 15.9 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10.5" r="2.2" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function ShieldIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M12 3.5 19 6v5.2c0 4.6-3.1 8.5-7 9.8-3.9-1.3-7-5.2-7-9.8V6l7-2.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="m9.5 12.2 1.8 1.8 3.3-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CodeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path d="M9 18 3.5 12 9 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m15 6 5.5 6-5.5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LayersIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="m12 4 7 4-7 4-7-4 7-4Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="m5 12 7 4 7-4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m5 16 7 4 7-4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path d="m5 12 4.2 4.2L19 6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const heroNameWords = ["Hi,", "I'm", "Siddhant", "Yojit."];

const values = [
  {
    icon: LayersIcon,
    title: "Practical UI work",
    description:
      "I like building interfaces that feel clear, responsive, and easy to use, with enough structure to stay maintainable as they grow.",
  },
  {
    icon: ShieldIcon,
    title: "Testing as part of the craft",
    description:
      "UI testing, test-case design, defect reporting, and cross-flow validation are part of how I make sure the final experience is dependable.",
  },
  {
    icon: CodeIcon,
    title: "Learning across the stack",
    description:
      "My background also includes project exposure to Flutter Web, Spring Boot, MongoDB, Node.js, SQLite, Java, JDBC, and MySQL.",
  },
];

const workingStyle = [
  {
    icon: SparkleIcon,
    text: "I turn business requirements into clean frontend screens and reusable interface sections.",
  },
  {
    icon: CheckIcon,
    text: "I pay attention to navigation clarity, responsive behavior, and handoff quality.",
  },
  {
    icon: LayersIcon,
    text: "I prefer small, well-structured UI decisions that make a product feel polished.",
  },
];

const quickNotes = [
  {
    icon: ShieldIcon,
    label: "Testing habit",
    value: "I keep an eye on edge cases, responsive behavior, and how screens behave when content changes.",
  },
  {
    icon: CodeIcon,
    label: "Current stack",
    value: "React, Next.js, HTML, CSS, JavaScript, Angular, and a growing set of full-stack tools.",
  },
  {
    icon: BriefcaseIcon,
    label: "Project style",
    value: "I like business and NGO websites, clean dashboards, and practical interfaces that stay maintainable.",
  },
];

const headerNotes = [
  {
    icon: BriefcaseIcon,
    label: "Current role",
    value: "UI Developer Intern at TechVanta Labs Pvt. Ltd.",
  },
  {
    icon: CodeIcon,
    label: "Experience style",
    value: "Client-facing frontend work, component-based UI, and testing-focused delivery.",
  },
  {
    icon: SparkleIcon,
    label: "Working goal",
    value: "To build interfaces that are clear, dependable, and easy to grow over time.",
  },
];

export default function Home() {
  return (
    <main className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(0,0,0,0.01),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(0,0,0,0.008),_transparent_28%),radial-gradient(circle_at_bottom,_rgba(0,0,0,0.004),_transparent_36%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[18rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.78)_0%,rgba(255,255,255,0.56)_70%,rgba(255,255,255,0.18)_100%)]" />

      <section className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 pb-10 pt-5 sm:px-6 sm:pb-12 sm:pt-6 lg:px-8 lg:pt-8 motion-reveal">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)] px-1 py-4 motion-reveal" style={{ animationDelay: "80ms" }}>
          <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.24em] text-[var(--foreground)]">
            <SparkleIcon className="h-4 w-4 text-[var(--accent)]" />
            About me
          </div>
          <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
            <BriefcaseIcon className="h-4 w-4 text-[var(--accent)]" />
            UI Developer Intern at TechVanta Labs Pvt. Ltd.
          </div>
        </div>

        <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5 px-1 py-2 motion-reveal" style={{ animationDelay: "140ms" }}>
            <h1 className="max-w-4xl text-[clamp(2.9rem,7vw,5.9rem)] font-semibold tracking-tight text-[var(--foreground)] text-balance leading-[0.95]">
              {heroNameWords.map((word, index) => (
                <span
                  key={word}
                  className="mr-2 inline-block transition duration-200 ease-out last:mr-0 hover:text-[var(--accent)] motion-reveal"
                  style={{ animationDelay: `${160 + index * 110}ms` }}
                >
                  {word}
                </span>
              ))}
            </h1>
            <p className="max-w-2xl text-[1rem] leading-7 text-[var(--muted)] text-pretty sm:text-[1.05rem]">
              I&apos;m a frontend developer with internship experience in building responsive,
              client-facing interfaces and validating them with a strong testing mindset.
              I enjoy turning requirements into UI that feels simple, practical, and polished.
            </p>

            <div className="grid gap-3 border-t border-[var(--border)] pt-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 py-2 motion-reveal" style={{ animationDelay: "420ms" }}>
                <MapPinIcon className="h-5 w-5 text-[var(--accent)]" />
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--foreground)]">Location</p>
                  <p className="mt-1 text-sm font-medium text-[var(--foreground)]">Bangalore, India</p>
                </div>
              </div>
              <div className="flex items-center gap-3 py-2 motion-reveal" style={{ animationDelay: "500ms" }}>
                <CodeIcon className="h-5 w-5 text-[var(--accent)]" />
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--foreground)]">Core focus</p>
                  <p className="mt-1 text-sm font-medium text-[var(--foreground)]">Frontend, UI, testing</p>
                </div>
              </div>
            </div>

            <div className="border-t border-[var(--border)] pt-4">
              <p className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.24em] text-[var(--foreground)]">
                <SparkleIcon className="h-4 w-4 text-[var(--accent)]" />
                Quick notes
              </p>
              <div className="mt-4 grid gap-0">
                {quickNotes.map((item, index) => (
                  <div
                    key={item.label}
                    className="flex gap-3 border-b border-[var(--border)] py-4 last:border-b-0 motion-reveal"
                    style={{ animationDelay: `${560 + index * 120}ms` }}
                  >
                    <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
                    <div className="min-w-0">
                      <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--foreground)]">
                        {item.label}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-[var(--foreground)]">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="px-1 py-2 motion-reveal" style={{ animationDelay: "180ms" }}>
            <div className="flex items-center justify-between gap-3 border-b border-[var(--border)] pb-4">
              <div>
                <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] text-[var(--foreground)]">
                  <BriefcaseIcon className="h-4 w-4 text-[var(--accent)]" />
                  Snapshot
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-[var(--foreground)]">
                  Frontend Developer
                </h2>
              </div>
              <div className="rounded-full border border-[var(--border)] bg-white px-3 py-1 text-xs font-medium text-[var(--accent-strong)]">
                Open to opportunities
              </div>
            </div>

            <div className="grid gap-0 py-4">
              {values.map((item, index) => (
                <div
                  key={item.title}
                  className="border-b border-[var(--border)] py-4 last:border-b-0 motion-reveal"
                  style={{ animationDelay: `${320 + index * 120}ms` }}
                >
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-[var(--foreground)]">
                    <item.icon className="h-4 w-4 text-[var(--accent)]" />
                    {item.title}
                  </div>
                  <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-[var(--border)] pt-4">
              <p className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.22em] text-[var(--foreground)]">
                <ShieldIcon className="h-4 w-4 text-[var(--accent)]" />
                What I care about
              </p>
              <p className="mt-2 text-sm leading-7 text-[var(--foreground)]">
                Clear UI, thoughtful testing, and small details that improve the overall product experience.
              </p>
            </div>

            <div className="border-t border-[var(--border)] pt-4">
              <p className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.24em] text-[var(--foreground)]">
                <SparkleIcon className="h-4 w-4 text-[var(--accent)]" />
                Header notes
              </p>
              <div className="mt-4 grid gap-0">
                {headerNotes.map((item) => (
                  <div key={item.label} className="flex gap-3 border-b border-[var(--border)] py-4 last:border-b-0">
                    <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
                    <div className="min-w-0">
                      <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--foreground)]">
                        {item.label}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-[var(--foreground)]">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {values.map((item, index) => (
            <article
              key={item.title}
              className="border-t border-[var(--border)] p-5 motion-reveal"
              style={{ animationDelay: `${220 + index * 120}ms` }}
            >
              <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.24em] text-[var(--foreground)]">
                <item.icon className="h-4 w-4 text-[var(--accent)]" />
                Value
              </div>
              <h3 className="mt-3 text-xl font-bold tracking-tight text-[var(--foreground)]">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{item.description}</p>
            </article>
          ))}
        </section>

        <section className="px-1 py-2">
          <p className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.28em] text-[var(--foreground)]">
            <CodeIcon className="h-4 w-4 text-[var(--accent)]" />
            How I work
          </p>
          <div className="mt-4 grid gap-0 lg:grid-cols-3 lg:gap-x-6">
            {workingStyle.map((item, index) => (
              <div
                key={item.text}
                className="border-b border-[var(--border)] py-4 lg:border-b-0 lg:border-t lg:pt-4 motion-reveal"
                style={{ animationDelay: `${220 + index * 120}ms` }}
              >
                <div className="flex items-center gap-2 text-sm font-black text-[var(--foreground)]">
                  <item.icon className="h-4 w-4 text-[var(--accent)]" />
                  Approach
                </div>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{item.text}</p>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
