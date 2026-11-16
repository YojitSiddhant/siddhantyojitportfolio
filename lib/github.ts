export type GitHubContributionDay = {
  date: string;
  contributionCount: number;
  contributionLevel: "NONE" | "FIRST_QUARTILE" | "SECOND_QUARTILE" | "THIRD_QUARTILE" | "FOURTH_QUARTILE";
  weekday: number;
};

export type GitHubContributionWeek = { contributionDays: GitHubContributionDay[] };
export type GitHubContributionCalendar = { totalContributions: number; weeks: GitHubContributionWeek[] };
export type GitHubContributionData = { contributionCalendar: GitHubContributionCalendar };

const apiVersion = "2026-03-10";

function getHeaders() {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": apiVersion,
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

async function githubGraphQL<T>(query: string, variables: Record<string, string>) {
  if (!process.env.GITHUB_TOKEN) throw new Error("GITHUB_TOKEN is required for GitHub contribution data");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { ...getHeaders(), "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 3600 },
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`GitHub GraphQL request failed (${response.status})`);

    const payload = (await response.json()) as { data?: T; errors?: Array<{ message: string }> };
    if (payload.errors?.length || !payload.data) {
      throw new Error(payload.errors?.[0]?.message || "GitHub GraphQL request failed");
    }
    return payload.data;
  } finally {
    clearTimeout(timeout);
  }
}

export async function getGitHubContributionData(username: string, from: string, to: string) {
  const query = `query($login: String!, $from: DateTime!, $to: DateTime!) { user(login: $login) { contributionsCollection(from: $from, to: $to) { contributionCalendar { totalContributions weeks { contributionDays { date contributionCount contributionLevel weekday } } } } } }`;
  const data = await githubGraphQL<{ user: { contributionsCollection: GitHubContributionData } }>(query, {
    login: username,
    from,
    to,
  });
  return data.user.contributionsCollection;
}
