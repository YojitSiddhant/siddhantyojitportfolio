import { About } from "@/components/home/about";
import { Hero } from "@/components/home/hero";
import { GitHubHeatmap } from "@/components/home/github-heatmap";
import { getGitHubContributionData, type GitHubContributionCalendar } from "@/lib/github";

export const revalidate = 3600;

export default async function Home() {
  const now = new Date();
  const year = now.getUTCFullYear();
  let githubContributions: number | null = null;
  let githubCalendar: GitHubContributionCalendar | null = null;
  try {
    const from = new Date(now);
    from.setUTCDate(from.getUTCDate() - 365);
    const data = await getGitHubContributionData("YojitSiddhant", from.toISOString(), now.toISOString());
    githubContributions = data.contributionCalendar.totalContributions;
    githubCalendar = data.contributionCalendar;
  } catch {
    // Do not render an invented fallback value.
  }
  return (
    <main className="relative isolate overflow-x-clip">
      <Hero githubContributions={githubContributions} githubYear={year} />
      {githubCalendar ? (
        <div className="container-page">
          <GitHubHeatmap calendar={githubCalendar} />
        </div>
      ) : null}
      <About />
    </main>
  );
}
