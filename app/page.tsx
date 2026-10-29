import { About } from "@/components/home/about";
import { Hero } from "@/components/home/hero";
import { getGitHubContributionData, getGitHubRepos, searchGitHubPullRequests } from "@/lib/github";

export default async function Home() {
  const now = new Date();
  const githubFrom = new Date("2008-01-01T00:00:00.000Z");
  let githubStats = { contributions: 0, repositories: 0, mergedPullRequests: 0, pullRequests: 0, commits: 0 };
  const [dataResult, reposResult, pullRequestsResult, mergedPullRequestsResult] = await Promise.allSettled([
      getGitHubContributionData("YojitSiddhant", githubFrom.toISOString(), now.toISOString()),
      getGitHubRepos("YojitSiddhant"),
      searchGitHubPullRequests("author:YojitSiddhant"),
      searchGitHubPullRequests("author:YojitSiddhant is:merged"),
  ]);
  if (dataResult.status === "fulfilled") githubStats.contributions = dataResult.value.contributionCalendar.totalContributions;
  if (dataResult.status === "fulfilled") githubStats.commits = dataResult.value.totalCommitContributions;
  if (reposResult.status === "fulfilled") githubStats.repositories = reposResult.value.length;
  if (pullRequestsResult.status === "fulfilled") githubStats.pullRequests = pullRequestsResult.value.total_count;
  if (mergedPullRequestsResult.status === "fulfilled") githubStats.mergedPullRequests = mergedPullRequestsResult.value.total_count;
  return (
    <main className="relative isolate overflow-x-clip">
      <Hero githubStats={githubStats} />

      <div className="pt-8 sm:pt-12">
        <About />
      </div>
    </main>
  );
}
