import { About } from "@/components/home/about";
import { Hero } from "@/components/home/hero";
import { getGitHubContributionData } from "@/lib/github";

export const dynamic = "force-dynamic";

export default async function Home() {
  const now = new Date();
  const year = now.getUTCFullYear();
  let contributions = 0;
  try {
    const data = await getGitHubContributionData("YojitSiddhant", new Date(Date.UTC(year, 0, 1)).toISOString(), new Date(Date.UTC(year, 11, 31, 23, 59, 59)).toISOString());
    contributions = data.contributionCalendar.totalContributions;
  } catch {
    contributions = 0;
  }
  return (
    <main className="relative isolate overflow-x-clip">
      <Hero githubContributions={contributions} githubYear={year} />

      <div className="pt-8 sm:pt-12">
        <About />
      </div>
    </main>
  );
}
