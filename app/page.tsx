import { About } from "@/components/home/about";
import { Hero } from "@/components/home/hero";
import { getGitHubContributionData, getGitHubRepos, searchGitHubPullRequests } from "@/lib/github";

export default async function Home() {
  const now = new Date();
  const githubFrom = new Date("2008-01-01T00:00:00.000Z");
  let githubStats = { contributions: 0, repositories: 0, mergedPullRequests: 0, pullRequests: 0, commits: 0 };
  try {
    const [data, repos, pullRequests, mergedPullRequests] = await Promise.all([
      getGitHubContributionData("YojitSiddhant", githubFrom.toISOString(), now.toISOString()),
      getGitHubRepos("YojitSiddhant"),
      searchGitHubPullRequests("author:YojitSiddhant"),
      searchGitHubPullRequests("author:YojitSiddhant is:merged"),
    ]);
    githubStats = { contributions: data.contributionCalendar.totalContributions, repositories: repos.length, mergedPullRequests: mergedPullRequests.total_count, pullRequests: pullRequests.total_count, commits: data.totalCommitContributions };
  } catch {
    // Keep the home page available if GitHub briefly throttles the API.
  }
  return (
    <main className="relative isolate overflow-x-clip">
      <Hero githubStats={githubStats} />

      <div className="pt-8 sm:pt-12">
        <About />
      </div>
    </main>
  );
}
