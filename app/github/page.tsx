import type { Metadata } from "next";
import { HeaderStat, PageSectionHeader } from "@/components/page-section-header";
import { PageShell } from "@/components/page-shell";
import { GitHubDashboard } from "@/components/github-analytics/github-dashboard";
import { getGitHubContributionData, type GitHubContributionWeek } from "@/lib/github";

export const metadata: Metadata = { title: "GitHub | Siddhant Yojit", description: "GitHub activity, repositories, commits, and pull requests for Siddhant Yojit." };
export const dynamic = "force-dynamic";

export default async function GitHubPage() {
  const username = "YojitSiddhant";
  const now = new Date();
  const year = now.getUTCFullYear();
  const from = new Date(Date.UTC(year, 0, 1));
  const to = new Date(Date.UTC(year, 11, 31, 23, 59, 59));
  const [contributions] = await Promise.all([getGitHubContributionData(username, from.toISOString(), to.toISOString())]);
  const calendarWeeks: GitHubContributionWeek[] = contributions.contributionCalendar.weeks;
  const monthCounts = new Map<string, number>();
  calendarWeeks.flatMap((week) => week.contributionDays).forEach((day) => monthCounts.set(day.date.slice(0, 7), (monthCounts.get(day.date.slice(0, 7)) || 0) + day.contributionCount));
  const months = Array.from({ length: 12 }, (_, index) => { const date = new Date(Date.UTC(year, index, 1)); return { label: date.toLocaleDateString("en-US", { month: "short" }), value: monthCounts.get(date.toISOString().slice(0, 7)) || 0 }; });
  return <PageShell><PageSectionHeader eyebrow="GitHub" title={<>Code in <span className="text-accent">motion</span></>} description={`A precise, live view of my GitHub contribution history in ${year}.`} aside={<HeaderStat value={String(contributions.contributionCalendar.totalContributions)} label={`contributions · ${year}`} />} /><GitHubDashboard months={months} weeks={calendarWeeks} totalContributions={contributions.contributionCalendar.totalContributions} totalCommits={contributions.totalCommitContributions} totalPrs={contributions.totalPullRequestContributions} year={year} /></PageShell>;
}
