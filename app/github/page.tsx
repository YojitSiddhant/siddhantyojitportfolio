import type { Metadata } from "next";
import { HeaderStat, PageSectionHeader } from "@/components/page-section-header";
import { PageShell } from "@/components/page-shell";
import { GitHubDashboard } from "@/components/github-analytics/github-dashboard";
import { getGitHubContributionData, type GitHubContributionWeek } from "@/lib/github";

export const metadata: Metadata = { title: "GitHub | Siddhant Yojit", description: "GitHub activity, repositories, commits, and pull requests for Siddhant Yojit." };
export const dynamic = "force-dynamic";

export default async function GitHubPage() {
  const username = "YojitSiddhant";
  const to = new Date();
  const from = new Date(Date.UTC(to.getUTCFullYear(), 0, 1));
  const [contributions] = await Promise.all([getGitHubContributionData(username, from.toISOString(), to.toISOString())]);
  const contributionMap = new Map(contributions.contributionCalendar.weeks.flatMap((week) => week.contributionDays).map((day) => [day.date, day]));
  const calendarStart = new Date(Date.UTC(to.getUTCFullYear(), 0, 1));
  calendarStart.setUTCDate(calendarStart.getUTCDate() - calendarStart.getUTCDay());
  const calendarEnd = new Date(Date.UTC(to.getUTCFullYear(), 11, 31));
  const calendarWeeks: GitHubContributionWeek[] = [];
  for (let cursor = new Date(calendarStart); cursor <= calendarEnd; cursor.setUTCDate(cursor.getUTCDate() + 7)) {
    const days = Array.from({ length: 7 }, (_, offset) => { const date = new Date(cursor); date.setUTCDate(date.getUTCDate() + offset); const key = date.toISOString().slice(0, 10); const existing = contributionMap.get(key); return existing || { date: key, contributionCount: 0, contributionLevel: "NONE" as const, weekday: offset }; });
    calendarWeeks.push({ contributionDays: days });
  }
  const monthCounts = new Map<string, number>();
  calendarWeeks.flatMap((week) => week.contributionDays).forEach((day) => monthCounts.set(day.date.slice(0, 7), (monthCounts.get(day.date.slice(0, 7)) || 0) + day.contributionCount));
  const months = Array.from({ length: 12 }, (_, index) => { const date = new Date(Date.UTC(to.getUTCFullYear(), index, 1)); return { label: date.toLocaleDateString("en-US", { month: "short" }), value: monthCounts.get(date.toISOString().slice(0, 7)) || 0 }; });
  return <PageShell><PageSectionHeader eyebrow="GitHub" title={<>Code in <span className="text-accent">motion</span></>} description={`A precise, live view of my GitHub contribution history in ${to.getUTCFullYear()}.`} aside={<HeaderStat value={String(contributions.contributionCalendar.totalContributions)} label={`contributions · ${to.getUTCFullYear()}`} />} /><GitHubDashboard months={months} weeks={calendarWeeks} totalContributions={contributions.contributionCalendar.totalContributions} totalCommits={contributions.totalCommitContributions} totalPrs={contributions.totalPullRequestContributions} year={to.getUTCFullYear()} /></PageShell>;
}
