import type { Metadata } from "next";
import { HeaderStat, PageSectionHeader } from "@/components/page-section-header";
import { PageShell } from "@/components/page-shell";
import { GitHubDashboard } from "@/components/github-analytics/github-dashboard";
import { getGitHubContributionData, getGitHubRepos, searchGitHubPullRequests } from "@/lib/github";

export const metadata: Metadata = { title: "GitHub | Siddhant Yojit", description: "GitHub activity, repositories, commits, and pull requests for Siddhant Yojit." };
export const dynamic = "force-dynamic";

export default async function GitHubPage() {
  const username = "YojitSiddhant";
  const to = new Date();
  const from = new Date(to); from.setUTCFullYear(from.getUTCFullYear() - 1);
  const [repos, contributions, prs] = await Promise.all([getGitHubRepos(username), getGitHubContributionData(username, from.toISOString(), to.toISOString()), searchGitHubPullRequests(`author:${username}`)]);
  const publicRepos = repos.filter((repo) => !repo.name.startsWith(".")).map((repo) => ({ ...repo, commits: 0, prs: 0 }));
  const prCounts = new Map<string, number>();
  prs.items.forEach((item) => { const repoName = item.repository_url?.split("/repos/")[1]; if (repoName) prCounts.set(repoName, (prCounts.get(repoName) || 0) + 1); });
  const stats = publicRepos.map((repo) => ({ ...repo, prs: prCounts.get(repo.full_name) || 0 }));
  const monthCounts = new Map<string, number>();
  contributions.contributionCalendar.weeks.flatMap((week) => week.contributionDays).forEach((day) => monthCounts.set(day.date.slice(0, 7), (monthCounts.get(day.date.slice(0, 7)) || 0) + day.contributionCount));
  const months = Array.from({ length: 12 }, (_, index) => { const date = new Date(Date.UTC(to.getUTCFullYear(), to.getUTCMonth() - 11 + index, 1)); return { label: date.toLocaleDateString("en-US", { month: "short" }), value: monthCounts.get(date.toISOString().slice(0, 7)) || 0 }; });
  return <PageShell><PageSectionHeader eyebrow="GitHub" title={<>Code in <span className="text-accent">motion</span></>} description="A precise, live view of my public repositories and contribution history on GitHub." aside={<HeaderStat value={String(contributions.contributionCalendar.totalContributions)} label="contributions · 1 year" />} /><GitHubDashboard repos={stats} months={months} weeks={contributions.contributionCalendar.weeks} totalContributions={contributions.contributionCalendar.totalContributions} totalCommits={contributions.totalCommitContributions} totalPrs={contributions.totalPullRequestContributions} /></PageShell>;
}
