import type { Metadata } from "next";
import { PageSectionHeader, HeaderStat } from "@/components/page-section-header";
import { PageShell } from "@/components/page-shell";
import { GitHubDashboard } from "@/components/github-analytics/github-dashboard";
import { getGitHubRepos, searchGitHubCommits, searchGitHubPullRequests } from "@/lib/github";

export const metadata: Metadata = { title: "GitHub | Siddhant Yojit", description: "GitHub activity, repositories, commits, and pull requests for Siddhant Yojit." };
function makeMonths(items: Array<{ date: string; count: number }>) { const now = new Date(); return Array.from({ length: 12 }, (_, index) => { const date = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 11 + index, 1)); const key = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`; return { label: date.toLocaleDateString("en-US", { month: "short" }), value: items.filter((item) => item.date.startsWith(key)).reduce((sum, item) => sum + item.count, 0) }; }); }

export default async function GitHubPage() {
  const username = "YojitSiddhant"; const since = new Date(); since.setUTCDate(since.getUTCDate() - 365);
  let repos = [] as Awaited<ReturnType<typeof getGitHubRepos>>;
  let commits = { total_count: 0, items: [] as Awaited<ReturnType<typeof searchGitHubCommits>>["items"] };
  let prs = { total_count: 0, items: [] as Array<{ repository_url?: string }> };

  try {
    [repos, commits, prs] = await Promise.all([
      getGitHubRepos(username),
      searchGitHubCommits(`author:${username} committer-date:>=${since.toISOString().slice(0, 10)}`),
      searchGitHubPullRequests(`author:${username}`),
    ]);
  } catch {
    // GitHub can temporarily throttle public API requests. Keep the page usable
    // and let the next cached request repopulate the live data.
  }
  const publicRepos = repos.filter((repo) => !repo.name.startsWith(".")).map((repo) => ({ ...repo, commits: 0, prs: 0 }));
  const counts = new Map<string, number>(); commits.items.forEach((commit) => { const key = commit.commit.author?.date?.slice(0, 10) || commit.commit.committer?.date?.slice(0, 10); if (key) counts.set(key, (counts.get(key) || 0) + 1); });
  const contributionDays = Array.from({ length: 365 }, (_, index) => { const date = new Date(); date.setUTCDate(date.getUTCDate() - 364 + index); const key = date.toISOString().slice(0, 10); return { date: key, count: counts.get(key) || 0 }; });
  const prCounts = new Map<string, number>();
  prs.items.forEach((item) => { const repoName = item.repository_url?.split("/repos/")[1]; if (repoName) prCounts.set(repoName, (prCounts.get(repoName) || 0) + 1); });
  const stats = publicRepos.map((repo) => ({ ...repo, commits: commits.items.filter((commit) => commit.repository?.full_name === repo.full_name).length, prs: prCounts.get(repo.full_name) || 0 }));
  return <PageShell><PageSectionHeader eyebrow="GitHub" title={<>Code in <span className="text-accent">motion</span></>} description="A live look at my public repositories, contribution rhythm, and shipping activity on GitHub." aside={<HeaderStat value={String(publicRepos.length).padStart(2, "0")} label="public repos" />} /><GitHubDashboard repos={stats} months={makeMonths(contributionDays)} contributions={contributionDays} totalCommits={commits.total_count} totalPrs={prs.total_count} /></PageShell>;
}
