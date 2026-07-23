/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { PageSectionHeader } from "@/components/page-section-header";
import { PageShell } from "@/components/page-shell";
import { githubProfile } from "@/data/github-profile";
import {
  buildContributionCalendar,
  getGitHubEvents,
  getGitHubUser,
} from "@/lib/github";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "GitHub Analytics | Siddhant Yojit",
  description: "GitHub analytics and repository insights for Siddhant Yojit.",
};

export const dynamic = "force-dynamic";

type AnalyticsState = {
  user: Awaited<ReturnType<typeof getGitHubUser>> | null;
  contributionWeeks: ReturnType<typeof buildContributionCalendar>["weeks"];
  warningMessage: string | null;
};

function GitHubBadgeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M12 4.2c-4.3 0-7.8 3.5-7.8 7.8 0 3.4 2.2 6.3 5.3 7.4.4.1.5-.1.5-.3v-1.3c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8 0 1.2.8 1.2.8.7 1.2 1.8.8 2.3.6.1-.5.3-.8.5-1-1.8-.2-3.7-.9-3.7-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.2.8 2.1 0 3.1-1.9 3.8-3.7 4 .3.3.5.7.5 1.4v2.1c0 .2.1.4.5.3 3.1-1.1 5.3-4 5.3-7.4 0-4.3-3.5-7.8-7.8-7.8Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M7 4.5v3M17 4.5v3M4.5 9h15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M6.5 7.5h11A2 2 0 0 1 19.5 9.5v9A2 2 0 0 1 17.5 20h-11A2 2 0 0 1 4.5 18.5v-9a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GitHubAvatar({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-3xl border border-border bg-surface shadow-sm sm:h-40 sm:w-40">
      <img src={src} alt={alt} className="h-full w-full object-cover" loading="eager" referrerPolicy="no-referrer" />
    </div>
  );
}

async function loadAnalytics(): Promise<AnalyticsState> {
  const username = githubProfile.username;

  const [userResult, eventsResult] = await Promise.allSettled([
    getGitHubUser(username),
    getGitHubEvents(username),
  ]);

  const warningParts: string[] = [];

  const user = userResult.status === "fulfilled" ? userResult.value : null;
  if (userResult.status === "rejected") {
    warningParts.push("GitHub profile data is temporarily unavailable.");
  }

  const events = eventsResult.status === "fulfilled" ? eventsResult.value : [];
  if (eventsResult.status === "rejected") {
    warningParts.push("Recent activity data is temporarily unavailable.");
  }
  const contributionDates: string[] = [];

  if (contributionDates.length === 0) {
    for (const event of events) {
      if (event.type === "PushEvent") {
        contributionDates.push(event.created_at);
      }
    }
  }

  const contributionCalendar = buildContributionCalendar(contributionDates, 365);

  const warningMessage = warningParts.length > 0 ? warningParts.join(" ") : null;

  return {
    user,
    contributionWeeks: contributionCalendar.weeks,
    warningMessage,
  };
}

function sectionTitle(icon: ReactNode, title: string, subtitle?: string) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-foreground">
        {icon}
        {title}
      </div>
      {subtitle ? <p className="text-sm leading-6 text-muted">{subtitle}</p> : null}
    </div>
  );
}

export default async function GitHubAnalyticsPage() {
  const analytics = await loadAnalytics();
  const avatarUrl = analytics.user?.avatar_url || `https://github.com/${githubProfile.username}.png?size=256`;
  const displayName = analytics.user?.name || githubProfile.displayName;
  const username = analytics.user?.login || githubProfile.username;
  const bio = analytics.user?.bio || githubProfile.description;
  const profileUrl = analytics.user?.html_url || githubProfile.profileUrl;

  return (
    <PageShell>
      <PageSectionHeader
        className="motion-reveal"
        style={{ animationDelay: "80ms" }}
        left={
          <div className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-foreground">
            <GitHubBadgeIcon className="h-4 w-4 text-accent" />
            GitHub Analytics
          </div>
        }
        right={<div className="text-sm font-black text-foreground">Live REST data</div>}
      />

      <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="flex flex-col gap-5 border-t border-border px-1 py-4 motion-reveal" style={{ animationDelay: "150ms" }}>
          <div className="flex items-start gap-4">
            <GitHubAvatar src={avatarUrl} alt={`${displayName} GitHub avatar`} />
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-foreground">
                <GitHubBadgeIcon className="h-4 w-4 text-accent" />
                Profile
              </p>
              <h1 className="mt-3 max-w-4xl text-3xl font-semibold leading-none tracking-normal text-foreground text-balance sm:text-5xl lg:text-7xl">
                {displayName.split(" ").map((word, index) => (
                  <span
                    key={`${word}-${index}`}
                    className="mr-2 inline-block transition duration-200 ease-out last:mr-0 hover:text-accent motion-reveal"
                    style={{ animationDelay: `${180 + index * 100}ms` }}
                  >
                    {word}
                  </span>
                ))}
              </h1>
              <p className="mt-3 text-sm font-black uppercase tracking-wider text-accent-strong">
                @{username}
              </p>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted text-pretty sm:text-lg">{bio}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 border-t border-border pt-4">
            <a
              href={profileUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border px-4 py-2 text-xs font-black uppercase tracking-widest text-foreground transition-colors hover:border-accent hover:bg-accent-soft"
            >
              View GitHub Profile
            </a>
            {analytics.warningMessage ? (
              <p className="text-sm leading-6 text-muted">{analytics.warningMessage}</p>
            ) : null}
          </div>

        </article>

        <article className="flex flex-col gap-5 border-t border-border px-1 py-4 motion-reveal" style={{ animationDelay: "220ms" }}>
          <div className="flex items-center justify-between gap-3">
            {sectionTitle(<CalendarIcon className="h-4 w-4 text-accent" />, "Contribution Calendar", "Public commit activity over the last 365 days.")}
          </div>

          <div className="py-1">
            <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-black uppercase tracking-widest text-muted">
              <span>Less</span>
              <span className="inline-flex h-3 w-3 rounded-sm bg-accent-soft" aria-hidden="true" />
              <span className="inline-flex h-3 w-3 rounded-sm" style={{ backgroundColor: "rgba(37, 99, 235, 0.22)" }} aria-hidden="true" />
              <span className="inline-flex h-3 w-3 rounded-sm" style={{ backgroundColor: "rgba(37, 99, 235, 0.38)" }} aria-hidden="true" />
              <span className="inline-flex h-3 w-3 rounded-sm" style={{ backgroundColor: "rgba(37, 99, 235, 0.58)" }} aria-hidden="true" />
              <span className="inline-flex h-3 w-3 rounded-sm" style={{ backgroundColor: "rgba(37, 99, 235, 0.82)" }} aria-hidden="true" />
              <span>More</span>
            </div>

            <div className="mt-4 flex justify-center overflow-x-auto border-b border-border pb-4">
              <div className="grid grid-flow-col grid-rows-7 gap-1.5" role="img" aria-label="GitHub contribution heatmap">
                {analytics.contributionWeeks.flatMap((week, weekIndex) =>
                  week.map((cell, dayIndex) => {
                    const intensity =
                      cell.count === 0
                        ? "bg-accent-soft"
                        : cell.count < 2
                          ? "[background-color:rgba(37,99,235,0.22)]"
                          : cell.count < 4
                            ? "[background-color:rgba(37,99,235,0.38)]"
                            : cell.count < 7
                              ? "[background-color:rgba(37,99,235,0.58)]"
                              : "[background-color:rgba(37,99,235,0.82)]";

                    return (
                      <span
                        key={`${cell.date}-${weekIndex}-${dayIndex}`}
                        title={cell.empty ? "No data" : `${cell.count} contribution${cell.count === 1 ? "" : "s"} on ${cell.date}`}
                        aria-label={cell.empty ? "No data" : `${cell.count} contributions on ${cell.date}`}
                        className={`h-3.5 w-3.5 rounded-sm border border-border/40 ${cell.empty ? "bg-surface" : intensity}`}
                      />
                    );
                  }),
                )}
              </div>
            </div>
          </div>
        </article>
      </section>

    </PageShell>
  );
}
