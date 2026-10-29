import { About } from "@/components/home/about";
import { Hero } from "@/components/home/hero";
import { getGitHubContributionData } from "@/lib/github";

export const dynamic = "force-dynamic";

export default async function Home() {
  const now = new Date();
  const year = now.getUTCFullYear();
  let githubContributions: number | null = null;
  try {
    const data = await getGitHubContributionData("YojitSiddhant", new Date(Date.UTC(year, 0, 1)).toISOString(), now.toISOString());
    githubContributions = data.contributionCalendar.totalContributions;
  } catch {
    // Do not render an invented fallback value.
  }
  return (
    <main className="relative isolate overflow-x-clip">
      <Hero githubContributions={githubContributions} githubYear={year} />

      <div className="pt-6 sm:pt-8">
        <About />
      </div>
    </main>
  );
}
