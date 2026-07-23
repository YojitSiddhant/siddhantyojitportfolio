"use client";

import { useState } from "react";
import { GitHubRepositoryCard } from "@/components/github-analytics/github-repository-card";
import type { GitHubRepo } from "@/lib/github";

type GitHubRepoExplorerProps = {
  repos: GitHubRepo[];
  technologyOptions: string[];
};

type SortKey = "updated" | "stars" | "forks" | "name";

export function GitHubRepoExplorer({ repos, technologyOptions }: GitHubRepoExplorerProps) {
  const [search, setSearch] = useState("");
  const [technology, setTechnology] = useState("all");
  const [sortBy, setSortBy] = useState<SortKey>("updated");

  const filteredRepos = [...repos]
    .filter((repo) => {
      const query = search.trim().toLowerCase();
      const searchable = [repo.name, repo.description ?? "", repo.language ?? "", ...repo.topics]
        .join(" ")
        .toLowerCase();
      const matchesSearch = !query || searchable.includes(query);
      const matchesTechnology =
        technology === "all" ||
        repo.language === technology ||
        repo.topics.some((topic) => topic.toLowerCase() === technology.toLowerCase());

      return matchesSearch && matchesTechnology;
    })
    .sort((left, right) => {
      if (sortBy === "stars") return right.stargazers_count - left.stargazers_count;
      if (sortBy === "forks") return right.forks_count - left.forks_count;
      if (sortBy === "name") return left.name.localeCompare(right.name);
      return new Date(right.updated_at).getTime() - new Date(left.updated_at).getTime();
    });

  return (
    <section className="space-y-5">
      <div className="grid gap-3 rounded-3xl border border-border bg-surface px-4 py-4 shadow-sm sm:grid-cols-3 sm:items-end sm:gap-4">
        <label className="grid gap-2">
          <span className="text-xs font-black uppercase tracking-widest text-foreground">Search</span>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search repositories"
            className="h-12 rounded-full border border-border bg-surface-strong px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-xs font-black uppercase tracking-widest text-foreground">Technology</span>
          <select
            value={technology}
            onChange={(event) => setTechnology(event.target.value)}
            className="h-12 rounded-full border border-border bg-surface-strong px-4 text-sm text-foreground outline-none transition-colors focus:border-accent"
          >
            <option value="all">All technologies</option>
            {technologyOptions.map((tech) => (
              <option key={tech} value={tech}>
                {tech}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2">
          <span className="text-xs font-black uppercase tracking-widest text-foreground">Sort</span>
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value as SortKey)}
            className="h-12 rounded-full border border-border bg-surface-strong px-4 text-sm text-foreground outline-none transition-colors focus:border-accent"
          >
            <option value="updated">Recently updated</option>
            <option value="stars">Most stars</option>
            <option value="forks">Most forks</option>
            <option value="name">Repository name</option>
          </select>
        </label>
      </div>

      <div className="flex items-center justify-between gap-3 px-1">
        <p className="text-sm text-muted">
          {filteredRepos.length} {filteredRepos.length === 1 ? "repository" : "repositories"}
        </p>
        <button
          type="button"
          onClick={() => {
            setSearch("");
            setTechnology("all");
            setSortBy("updated");
          }}
          className="rounded-full border border-border px-3 py-2 text-xs font-black uppercase tracking-widest text-foreground transition-colors hover:border-accent hover:bg-accent-soft"
        >
          Reset
        </button>
      </div>

      <div className="grid gap-5">
        {filteredRepos.length > 0 ? (
          filteredRepos.map((repo) => <GitHubRepositoryCard key={repo.id} repo={repo} compact />)
        ) : (
          <div className="rounded-3xl border border-border bg-surface px-4 py-6 text-sm text-muted">
            No repositories match the current filters.
          </div>
        )}
      </div>
    </section>
  );
}
