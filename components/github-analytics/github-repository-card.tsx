"use client";

/* eslint-disable @next/next/no-img-element */
import type { GitHubRepo } from "@/lib/github";

type GitHubRepositoryCardProps = {
  repo: GitHubRepo;
  compact?: boolean;
};

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(dateString));
}

export function GitHubRepositoryCard({ repo, compact = false }: GitHubRepositoryCardProps) {
  const liveUrl = repo.homepage?.trim() || "";
  const techList = [repo.language, ...repo.topics].filter(Boolean).slice(0, compact ? 3 : 5) as string[];

  return (
    <article className="flex h-full flex-col gap-4 border border-border bg-surface px-4 py-4 shadow-sm motion-reveal sm:px-5 sm:py-5">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border bg-surface-strong shadow-sm">
          <img
            src={repo.owner.avatar_url}
            alt={`${repo.owner.login} avatar`}
            className="h-full w-full object-cover"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="min-w-0 text-lg font-bold tracking-normal text-foreground">{repo.name}</h3>
            <span className="rounded-full border border-border px-2.5 py-1 text-[11px] font-black uppercase tracking-widest text-accent-strong">
              {repo.language || "Code"}
            </span>
          </div>
          <p className="mt-2 text-sm leading-6 text-muted">
            {repo.description || "A public repository from my GitHub profile."}
          </p>
        </div>
      </div>

      {techList.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {techList.map((tech) => (
            <span
              key={`${repo.id}-${tech}`}
              className="rounded-full border border-border bg-surface-strong px-3 py-2 text-[11px] font-black uppercase tracking-widest text-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
        <div className="text-xs font-medium text-muted">
          <p>Updated {formatDate(repo.updated_at)}</p>
          <p className="mt-1">
            {repo.stargazers_count} stars · {repo.forks_count} forks
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-border px-3 py-2 text-xs font-black uppercase tracking-widest text-foreground transition-colors hover:border-accent hover:bg-accent-soft"
          >
            GitHub
          </a>
          {liveUrl ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border px-3 py-2 text-xs font-black uppercase tracking-widest text-foreground transition-colors hover:border-accent hover:bg-accent-soft"
            >
              Live Demo
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
