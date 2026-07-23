/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { PageSectionHeader } from "@/components/page-section-header";
import { PageShell } from "@/components/page-shell";
import { GitHubRepoExplorer } from "@/components/github-analytics/github-repo-explorer";
import { GitHubRepositoryCard } from "@/components/github-analytics/github-repository-card";
import { developerJourney, githubProfile } from "@/data/github-profile";
import {
  buildContributionCalendar,
  formatRelativeGitHubDate,
  getGitHubEvents,
  getGitHubRepoCommits,
  getGitHubRepoLanguages,
  getGitHubRepos,
  getGitHubUser,
  type GitHubRepo,
} from "@/lib/github";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "GitHub Analytics | Siddhant Yojit",
  description: "GitHub analytics and repository insights for Siddhant Yojit.",
};

export const dynamic = "force-dynamic";

type AnalyticsState = {
  user: Awaited<ReturnType<typeof getGitHubUser>> | null;
  repos: GitHubRepo[];
  featuredRepos: GitHubRepo[];
  languageUsage: Array<{
    name: string;
    bytes: number;
    percentage: number;
  }>;
  technologyOptions: string[];
  contributionWeeks: ReturnType<typeof buildContributionCalendar>["weeks"];
  totalContributions: number;
  recentActivity: Array<{
    title: string;
    description: string;
    date: string;
    repoName: string;
    kind: "commit" | "update" | "release" | "create";
  }>;
  frameworkHighlights: string[];
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

function RepoIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M8 4.5h8A2.5 2.5 0 0 1 18.5 7v10A2.5 2.5 0 0 1 16 19.5H8A2.5 2.5 0 0 1 5.5 17V7A2.5 2.5 0 0 1 8 4.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M8.5 8h7M8.5 11.5h7M8.5 15h4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ActivityIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path d="M4 13h4l2-5 4 10 2.2-5H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function JourneyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path d="M5 6h14M5 12h9M5 18h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="18" cy="12" r="1.4" fill="currentColor" />
    </svg>
  );
}

function SnapshotIcon({ className }: { className?: string }) {
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

function GitHubAvatar({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-3xl border border-border bg-surface shadow-sm sm:h-40 sm:w-40">
      <img src={src} alt={alt} className="h-full w-full object-cover" loading="eager" referrerPolicy="no-referrer" />
    </div>
  );
}

function buildFrameworkHighlights(repos: GitHubRepo[]) {
  const keywords = [
    "React",
    "Next.js",
    "Flutter",
    "Node.js",
    "Spring Boot",
    "Flask",
    "MongoDB",
    "MySQL",
    "Python",
    "Java",
    "JavaScript",
    "TypeScript",
    "Angular",
  ];

  const discovered = new Set<string>();
  const haystack = repos
    .map((repo) => [repo.name, repo.description ?? "", repo.language ?? "", ...repo.topics].join(" "))
    .join(" ")
    .toLowerCase();

  for (const keyword of keywords) {
    if (haystack.includes(keyword.toLowerCase())) {
      discovered.add(keyword);
    }
  }

  for (const repo of repos) {
    for (const topic of repo.topics) {
      if (topic && topic.length <= 20) {
        discovered.add(topic);
      }
    }
  }

  return Array.from(discovered).slice(0, 10);
}

function buildTechnologyOptions(repos: GitHubRepo[]) {
  const values = new Set<string>();

  for (const repo of repos) {
    if (repo.language) {
      values.add(repo.language);
    }
    for (const topic of repo.topics) {
      if (topic) {
        values.add(topic);
      }
    }
  }

  return Array.from(values).sort((left, right) => left.localeCompare(right));
}

async function loadAnalytics(): Promise<AnalyticsState> {
  const username = githubProfile.username;
  const oneYearAgo = new Date();
  oneYearAgo.setUTCFullYear(oneYearAgo.getUTCFullYear() - 1);
  const sinceISO = oneYearAgo.toISOString();

  const [userResult, reposResult, eventsResult] = await Promise.allSettled([
    getGitHubUser(username),
    getGitHubRepos(username),
    getGitHubEvents(username),
  ]);

  const warningParts: string[] = [];

  const user = userResult.status === "fulfilled" ? userResult.value : null;
  if (userResult.status === "rejected") {
    warningParts.push("GitHub profile data is temporarily unavailable.");
  }

  const repos = reposResult.status === "fulfilled" ? reposResult.value : [];
  if (reposResult.status === "rejected") {
    warningParts.push("Repository data is temporarily unavailable.");
  }

  const events = eventsResult.status === "fulfilled" ? eventsResult.value : [];
  if (eventsResult.status === "rejected") {
    warningParts.push("Recent activity data is temporarily unavailable.");
  }

  const orderedRepos = [...repos].sort((left, right) => {
    const rightUpdated = new Date(right.pushed_at || right.updated_at).getTime();
    const leftUpdated = new Date(left.pushed_at || left.updated_at).getTime();
    return rightUpdated - leftUpdated;
  });

  const featuredRepos = [...orderedRepos]
    .sort((left, right) => {
      const leftScore = left.stargazers_count * 2 + left.forks_count + new Date(left.pushed_at).getTime() / 1e12;
      const rightScore = right.stargazers_count * 2 + right.forks_count + new Date(right.pushed_at).getTime() / 1e12;
      return rightScore - leftScore;
    })
    .slice(0, 4);

  const technologyOptions = buildTechnologyOptions(repos);
  const frameworkHighlights = buildFrameworkHighlights(featuredRepos.length > 0 ? featuredRepos : repos);

  const repositoriesForAnalytics = orderedRepos.slice(0, 6);

  const languageSettled = await Promise.allSettled(
    repositoriesForAnalytics.map((repo) => getGitHubRepoLanguages(repo.owner.login, repo.name)),
  );
  const languageCounts = new Map<string, number>();

  for (const settled of languageSettled) {
    if (settled.status !== "fulfilled") {
      continue;
    }

    for (const [language, bytes] of Object.entries(settled.value)) {
      languageCounts.set(language, (languageCounts.get(language) ?? 0) + bytes);
    }
  }

  if (languageCounts.size === 0) {
    for (const repo of repositoriesForAnalytics) {
      if (repo.language) {
        languageCounts.set(repo.language, (languageCounts.get(repo.language) ?? 0) + 1);
      }
    }
  }

  const languageUsage = Array.from(languageCounts.entries())
    .sort((left, right) => right[1] - left[1])
    .slice(0, 6)
    .map(([name, bytes]) => ({ name, bytes, percentage: 0 }));

  const totalLanguageBytes = languageUsage.reduce((sum, item) => sum + item.bytes, 0);
  for (const item of languageUsage) {
    item.percentage = totalLanguageBytes ? Math.round((item.bytes / totalLanguageBytes) * 100) : 0;
  }

  const commitSettled = await Promise.allSettled(
    repositoriesForAnalytics.map((repo) => getGitHubRepoCommits(repo.owner.login, repo.name, username, sinceISO)),
  );
  const contributionDates: string[] = [];

  for (const settled of commitSettled) {
    if (settled.status !== "fulfilled") {
      continue;
    }

    for (const commit of settled.value) {
      const date = commit.commit.author?.date ?? commit.commit.committer?.date;
      if (date) {
        contributionDates.push(date);
      }
    }
  }

  if (contributionDates.length === 0) {
    for (const event of events) {
      if (event.type === "PushEvent") {
        contributionDates.push(event.created_at);
      }
    }
  }

  const contributionCalendar = buildContributionCalendar(contributionDates, 365);

  const recentActivity = [
    ...events
      .filter((event) => ["PushEvent", "ReleaseEvent", "CreateEvent"].includes(event.type))
      .slice(0, 8)
      .map((event) => {
        const commitCount = event.payload.commits?.length ?? 0;
        if (event.type === "PushEvent") {
          return {
            title: commitCount > 0 ? `${commitCount} commit${commitCount === 1 ? "" : "s"} pushed` : "Repository updated",
            description: event.payload.commits?.[0]?.message || "Recent push activity on GitHub.",
            date: event.created_at,
            repoName: event.repo.name.split("/")[1] ?? event.repo.name,
            kind: "commit" as const,
          };
        }

        return {
          title: event.type === "ReleaseEvent" ? "Release published" : "Repository created",
          description: event.repo.name,
          date: event.created_at,
          repoName: event.repo.name.split("/")[1] ?? event.repo.name,
          kind: event.type === "ReleaseEvent" ? ("release" as const) : ("create" as const),
        };
      }),
    ...orderedRepos.slice(0, 4).map((repo) => ({
      title: "Repository updated",
      description: repo.description || "Repository metadata updated on GitHub.",
      date: repo.updated_at,
      repoName: repo.name,
      kind: "update" as const,
    })),
  ]
    .sort((left, right) => new Date(right.date).getTime() - new Date(left.date).getTime())
    .slice(0, 8);

  const warningMessage = warningParts.length > 0 ? warningParts.join(" ") : null;

  return {
    user,
    repos: orderedRepos,
    featuredRepos,
    languageUsage,
    technologyOptions,
    contributionWeeks: contributionCalendar.weeks,
    totalContributions: contributionCalendar.totalContributions,
    recentActivity,
    frameworkHighlights,
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

      <section className="space-y-5 px-1 py-2 motion-reveal" style={{ animationDelay: "380ms" }}>
        <div className="flex items-center justify-between gap-3 border-t border-border pt-4">
          {sectionTitle(<RepoIcon className="h-4 w-4 text-accent" />, "Featured Repositories", "A small set of the strongest public repositories from GitHub.")}
        </div>

        <div className="grid gap-0">
          {analytics.featuredRepos.length > 0 ? (
            analytics.featuredRepos.map((repo) => <GitHubRepositoryCard key={repo.id} repo={repo} />)
          ) : (
            <div className="border-t border-border pt-4 text-sm text-muted">
              No featured repositories could be loaded right now.
            </div>
          )}
        </div>
      </section>

      <section className="space-y-5 px-1 py-2 motion-reveal" style={{ animationDelay: "460ms" }}>
        <div className="flex items-center justify-between gap-3 border-t border-border pt-4">
          {sectionTitle(<ActivityIcon className="h-4 w-4 text-accent" />, "Repository Explorer", "Search, filter, and sort the public repository list.")}
        </div>

        <GitHubRepoExplorer repos={analytics.repos} technologyOptions={analytics.technologyOptions} />
      </section>

      <section className="space-y-5 px-1 py-2 motion-reveal" style={{ animationDelay: "540ms" }}>
        <div className="flex items-center justify-between gap-3 border-t border-border pt-4">
          {sectionTitle(<SnapshotIcon className="h-4 w-4 text-accent" />, "Technology Usage", "Language share and framework highlights from public repositories.")}
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <article className="flex flex-col gap-4 border-t border-border pt-4">
            <p className="text-xs font-black uppercase tracking-widest text-foreground">Languages</p>
            <div className="grid gap-4">
              {analytics.languageUsage.length > 0 ? (
                analytics.languageUsage.map((language) => (
                  <div key={language.name} className="grid gap-2">
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span className="font-medium text-foreground">{language.name}</span>
                      <span className="font-black text-foreground">{language.percentage}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-accent-soft">
                      <div
                        className="h-2 rounded-full bg-accent transition-all duration-300"
                        style={{ width: `${Math.max(language.percentage, 6)}%` }}
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted">Language data is unavailable right now.</p>
              )}
            </div>
          </article>

          <article className="flex flex-col gap-4 border-t border-border pt-4">
            <p className="text-xs font-black uppercase tracking-widest text-foreground">Frameworks and tools</p>
            <div className="flex flex-wrap gap-2">
              {analytics.frameworkHighlights.length > 0 ? (
                analytics.frameworkHighlights.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border bg-surface-strong px-3 py-2 text-xs font-black uppercase tracking-widest text-foreground"
                  >
                    {item}
                  </span>
                ))
              ) : (
                <p className="text-sm text-muted">Framework highlights are unavailable right now.</p>
              )}
            </div>
          </article>
        </div>
      </section>

      <section className="space-y-5 px-1 py-2 motion-reveal" style={{ animationDelay: "620ms" }}>
        <div className="flex items-center justify-between gap-3 border-t border-border pt-4">
          {sectionTitle(<ActivityIcon className="h-4 w-4 text-accent" />, "Recent GitHub Activity", "Recent commits and repository updates in a clean timeline.")}
        </div>

        <div className="grid gap-0">
          {analytics.recentActivity.length > 0 ? (
            analytics.recentActivity.map((item) => (
              <article key={`${item.title}-${item.date}-${item.repoName}`} className="flex gap-3 border-b border-border py-4 last:border-b-0">
                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border bg-surface-strong text-[10px] font-black uppercase tracking-widest text-accent">
                  {item.kind === "commit" ? "C" : item.kind === "release" ? "R" : item.kind === "create" ? "N" : "U"}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-xs font-black uppercase tracking-widest text-foreground">{item.title}</p>
                    <p className="text-xs text-muted">{formatRelativeGitHubDate(item.date)}</p>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-foreground">{item.description}</p>
                  <p className="mt-1 text-xs font-black uppercase tracking-wider text-muted">{item.repoName}</p>
                </div>
              </article>
            ))
          ) : (
            <div className="rounded-3xl border border-border bg-surface px-4 py-6 text-sm text-muted">
              Recent GitHub activity could not be loaded right now.
            </div>
          )}
        </div>
      </section>

      <section className="space-y-5 px-1 py-2 motion-reveal" style={{ animationDelay: "700ms" }}>
        <div className="flex items-center justify-between gap-3 border-t border-border pt-4">
          {sectionTitle(<JourneyIcon className="h-4 w-4 text-accent" />, "Developer Journey", "A timeline that matches the portfolio's experience section.")}
        </div>

        <div className="grid gap-0">
          {developerJourney.map((step, index) => (
            <article key={step.title} className="flex gap-3 border-b border-border py-4 last:border-b-0">
              <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border bg-surface-strong text-[10px] font-black uppercase tracking-widest text-accent">
                {index + 1}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-black uppercase tracking-widest text-foreground">{step.title}</p>
                <p className="mt-2 text-sm leading-7 text-muted">{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
