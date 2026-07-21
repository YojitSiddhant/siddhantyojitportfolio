import { profile } from "@/data/profile";

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

const iconMap = {
  layers: LayersIcon,
  shield: ShieldIcon,
  code: CodeIcon,
  sparkle: SparkleIcon,
  check: CheckIcon,
  briefcase: BriefcaseIcon,
} as const;

export default function Home() {
  const heroNameWords = profile.heroTitle.split(" ");
  const values = profile.valueCards as Array<{ icon: keyof typeof iconMap; title: string; description: string }>;
  const workingStyle = profile.workingStyle as Array<{ icon: keyof typeof iconMap; title: string }>;
  const quickNotes = profile.quickNotes as Array<{ icon?: keyof typeof iconMap; label: string; value: string }>;
  const headerNotes = profile.headerNotes as Array<{ icon?: keyof typeof iconMap; label: string; value: string }>;

  function renderIcon(icon: keyof typeof iconMap | undefined, className: string) {
    const Icon = icon ? iconMap[icon] : null;
    return Icon ? <Icon className={className} /> : null;
  }

  return (
    <main className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[var(--background)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[18rem] bg-[var(--background)]" />

      <section className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 pb-10 pt-5 sm:px-6 sm:pb-12 sm:pt-6 lg:px-8 lg:pt-8 motion-reveal">
        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <article
            className="flex h-full flex-col gap-5 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 text-left shadow-[0_12px_30px_rgba(0,0,0,0.05)] motion-reveal sm:p-6"
            style={{ animationDelay: "80ms" }}
          >
            <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.24em] text-[var(--foreground)]">
              <SparkleIcon className="h-4 w-4 text-[var(--accent)]" />
              About me
            </div>

            <div className="space-y-5">
              <div className="space-y-4">
                <h1 className="max-w-4xl text-3xl font-semibold leading-none tracking-normal text-[var(--foreground)] text-balance sm:text-5xl lg:text-7xl">
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
                  {profile.introText}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-4 motion-reveal" style={{ animationDelay: "420ms" }}>
                  <div className="flex items-center gap-3">
                    <MapPinIcon className="h-5 w-5 shrink-0 text-[var(--accent)]" />
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--foreground)]">Location</p>
                      <p className="mt-1 text-sm font-medium text-[var(--foreground)]">{profile.location}</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-4 motion-reveal" style={{ animationDelay: "500ms" }}>
                  <div className="flex items-center gap-3">
                    <CodeIcon className="h-5 w-5 shrink-0 text-[var(--accent)]" />
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--foreground)]">Core focus</p>
                      <p className="mt-1 text-sm font-medium text-[var(--foreground)]">{profile.coreFocus}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface-strong)] p-4 sm:p-5">
                <p className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.24em] text-[var(--foreground)]">
                  <SparkleIcon className="h-4 w-4 text-[var(--accent)]" />
                  Quick notes
                </p>
                <div className="mt-4 grid gap-3">
                  {quickNotes.map((item, index) => (
                    <div
                      key={item.label}
                      className="flex gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 motion-reveal"
                      style={{ animationDelay: `${560 + index * 120}ms` }}
                    >
                      {renderIcon(item.icon, "mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]")}
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
          </article>

          <article
            className="flex h-full flex-col gap-5 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 text-left shadow-[0_12px_30px_rgba(0,0,0,0.05)] motion-reveal sm:p-6"
            style={{ animationDelay: "180ms" }}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] text-[var(--foreground)]">
                  <BriefcaseIcon className="h-4 w-4 text-[var(--accent)]" />
                  Snapshot
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-normal text-[var(--foreground)]">
                  {profile.snapshotTitle}
                </h2>
              </div>
              <div className="rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-3 py-1 text-xs font-medium text-[var(--accent-strong)]">
                {profile.openToOpportunitiesBadge}
              </div>
            </div>

            <div className="grid gap-3">
              {values.map((item, index) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-4 motion-reveal"
                  style={{ animationDelay: `${320 + index * 120}ms` }}
                >
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-[var(--foreground)]">
                    {renderIcon(item.icon, "h-4 w-4 text-[var(--accent)]")}
                    {item.title}
                  </div>
                  <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface-strong)] p-4 sm:p-5">
              <p className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.22em] text-[var(--foreground)]">
                <ShieldIcon className="h-4 w-4 text-[var(--accent)]" />
                What I care about
              </p>
              <p className="mt-2 text-sm leading-7 text-[var(--foreground)]">
                {profile.whatICareAbout}
              </p>
            </div>

            <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface-strong)] p-4 sm:p-5">
              <p className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.24em] text-[var(--foreground)]">
                <SparkleIcon className="h-4 w-4 text-[var(--accent)]" />
                Header notes
              </p>
              <div className="mt-4 grid gap-3">
                {headerNotes.map((item) => (
                  <div key={item.label} className="flex gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
                    {renderIcon(item.icon, "mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]")}
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
          </article>
        </div>

        <section className="grid items-stretch gap-4 md:grid-cols-3">
          {values.map((item, index) => (
            <article
              key={item.title}
              className="flex h-full flex-col items-start rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 text-left motion-reveal"
              style={{ animationDelay: `${220 + index * 120}ms` }}
            >
              <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.24em] text-[var(--foreground)]">
                {renderIcon(item.icon, "h-4 w-4 text-[var(--accent)]")}
                Value
              </div>
              <h3 className="mt-3 text-xl font-bold tracking-normal text-[var(--foreground)]">
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
          <div className="mt-4 grid items-stretch gap-4 lg:grid-cols-3">
            {workingStyle.map((item, index) => (
              <div
                key={item.title}
                className="flex h-full flex-col items-start rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 text-left motion-reveal"
                style={{ animationDelay: `${220 + index * 120}ms` }}
              >
                <div className="flex items-center gap-2 text-sm font-black text-[var(--foreground)]">
                  {renderIcon(item.icon, "h-4 w-4 text-[var(--accent)]")}
                  Approach
                </div>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{item.title}</p>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
