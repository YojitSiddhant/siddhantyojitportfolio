export type GitHubUser = {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
};

export type GitHubRepo = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  pushed_at: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  languages_url: string;
};

export type GitHubEvent = {
  id: string;
  type: string;
  created_at: string;
  repo: {
    name: string;
  };
  payload: {
    commits?: Array<{
      message: string;
      sha: string;
    }>;
  };
};

export type GitHubCommit = {
  sha: string;
  commit: {
    author?: {
      name: string;
      email: string;
      date: string;
    };
    committer?: {
      name: string;
      email: string;
      date: string;
    };
    message: string;
  };
};

export type GitHubLanguages = Record<string, number>;
export type GitHubSearchCommit = GitHubCommit & { repository?: { full_name?: string; name?: string } };
export type GitHubContributionDay = { date: string; contributionCount: number; weekday: number };
export type GitHubContributionWeek = { contributionDays: GitHubContributionDay[] };
export type GitHubContributionCalendar = { totalContributions: number; weeks: GitHubContributionWeek[] };
export type GitHubContributionData = {
  contributionCalendar: GitHubContributionCalendar;
  totalCommitContributions: number;
  totalPullRequestContributions: number;
  commitContributionsByRepository: Array<{ repository: { nameWithOwner: string }; contributions: { totalCount: number } }>;
  pullRequestContributionsByRepository: Array<{ repository: { nameWithOwner: string }; contributions: { totalCount: number } }>;
};

const apiBase = "https://api.github.com";
const apiVersion = "2026-03-10";

function getHeaders() {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": apiVersion,
  };

  const token = process.env.GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

async function githubFetch<T>(path: string): Promise<T> {
  const response = await fetch(`${apiBase}${path}`, {
    headers: getHeaders(),
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    const message = await response.text().catch(() => "");
    throw new Error(
      `GitHub API request failed (${response.status}${response.statusText ? ` ${response.statusText}` : ""})${message ? `: ${message}` : ""}`,
    );
  }

  return (await response.json()) as T;
}

async function githubGraphQL<T>(query: string, variables: Record<string, string>) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN is required for GitHub contribution data");
  const response = await fetch("https://api.github.com/graphql", { method: "POST", headers: { ...getHeaders(), "Content-Type": "application/json" }, body: JSON.stringify({ query, variables }), next: { revalidate: 3600 } });
  if (!response.ok) throw new Error(`GitHub GraphQL request failed (${response.status})`);
  const payload = (await response.json()) as { data?: T; errors?: Array<{ message: string }> };
  if (payload.errors?.length || !payload.data) throw new Error(payload.errors?.[0]?.message || "GitHub GraphQL request failed");
  return payload.data;
}

export async function getGitHubContributionData(username: string, from: string, to: string) {
  const query = `query($login: String!, $from: DateTime!, $to: DateTime!) { user(login: $login) { contributionsCollection(from: $from, to: $to) { totalCommitContributions totalPullRequestContributions commitContributionsByRepository(maxRepositories: 100) { repository { nameWithOwner } contributions { totalCount } } pullRequestContributionsByRepository(maxRepositories: 100) { repository { nameWithOwner } contributions { totalCount } } contributionCalendar { totalContributions weeks { contributionDays { date contributionCount weekday } } } } } }`;
  const data = await githubGraphQL<{ user: { contributionsCollection: GitHubContributionData } }>(query, { login: username, from, to });
  return data.user.contributionsCollection;
}

export async function getGitHubUser(username: string) {
  return githubFetch<GitHubUser>(`/users/${encodeURIComponent(username)}`);
}

export async function getGitHubRepos(username: string) {
  return githubFetch<GitHubRepo[]>(
    `/users/${encodeURIComponent(username)}/repos?type=owner&sort=pushed&direction=desc&per_page=100`,
  );
}

export async function getGitHubEvents(username: string) {
  return githubFetch<GitHubEvent[]>(
    `/users/${encodeURIComponent(username)}/events/public?per_page=100`,
  );
}

export async function getGitHubRepoLanguages(owner: string, repo: string) {
  return githubFetch<GitHubLanguages>(
    `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/languages`,
  );
}

export async function getGitHubRepoCommits(
  owner: string,
  repo: string,
  username: string,
  sinceISO: string,
) {
  return githubFetch<GitHubCommit[]>(
    `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/commits?author=${encodeURIComponent(
      username,
    )}&since=${encodeURIComponent(sinceISO)}&per_page=100`,
  );
}

export async function searchGitHubCommits(query: string, perPage = 100) {
  return githubFetch<{ total_count: number; items: GitHubSearchCommit[] }>(`/search/commits?q=${encodeURIComponent(query)}&sort=author-date&order=desc&per_page=${perPage}`);
}

export async function searchGitHubPullRequests(query: string) {
  return githubFetch<{ total_count: number; items: Array<{ repository_url?: string }> }>(`/search/issues?q=${encodeURIComponent(`${query} is:pr`)}&per_page=100`);
}

export function formatGitHubDate(dateString: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(dateString));
}

export function formatRelativeGitHubDate(dateString: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
  }).format(new Date(dateString));
}

export function toDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function buildContributionCalendar(dates: string[], days = 365) {
  const today = new Date();
  const start = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
  start.setUTCDate(start.getUTCDate() - (days - 1));

  const countsByDate = new Map<string, number>();

  for (const dateString of dates) {
    const key = dateString.slice(0, 10);
    countsByDate.set(key, (countsByDate.get(key) ?? 0) + 1);
  }

  const cells: Array<{
    date: string;
    count: number;
  }> = [];

  const current = new Date(start);
  while (current <= today) {
    const key = toDateKey(current);
    cells.push({
      date: key,
      count: countsByDate.get(key) ?? 0,
    });
    current.setUTCDate(current.getUTCDate() + 1);
  }

  const padStartDay = start.getUTCDay();
  const paddedCells: Array<{ date: string; count: number; empty: boolean }> = [];

  for (let index = 0; index < padStartDay; index += 1) {
    paddedCells.push({ date: `pad-${index}`, count: 0, empty: true });
  }

  for (const cell of cells) {
    paddedCells.push({ ...cell, empty: false });
  }

  const weeks: Array<Array<{ date: string; count: number; empty: boolean }>> = [];
  for (let index = 0; index < paddedCells.length; index += 7) {
    weeks.push(paddedCells.slice(index, index + 7));
  }

  return {
    weeks,
    totalContributions: dates.length,
  };
}

export function getStreaks(dates: string[]) {
  const counts = new Map<string, number>();
  for (const dateString of dates) {
    const key = dateString.slice(0, 10);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  const today = new Date();
  const current = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));

  let currentStreak = 0;
  while (true) {
    const key = toDateKey(current);
    if ((counts.get(key) ?? 0) > 0) {
      currentStreak += 1;
      current.setUTCDate(current.getUTCDate() - 1);
      continue;
    }
    break;
  }

  let longestStreak = 0;
  let runningStreak = 0;

  const orderedKeys = Array.from(counts.keys()).sort();
  const allDates = new Set(orderedKeys);
  if (allDates.size === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  const firstKey = orderedKeys[0];
  const lastKey = orderedKeys[orderedKeys.length - 1];
  const cursor = new Date(`${firstKey}T00:00:00Z`);
  const end = new Date(`${lastKey}T00:00:00Z`);

  while (cursor <= end) {
    const key = toDateKey(cursor);
    if ((counts.get(key) ?? 0) > 0) {
      runningStreak += 1;
      longestStreak = Math.max(longestStreak, runningStreak);
    } else {
      runningStreak = 0;
    }
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }

  return { currentStreak, longestStreak };
}
