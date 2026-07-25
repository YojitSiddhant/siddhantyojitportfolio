import type { FullStackProject } from "@/data/full-stack-projects";
import { FullStackProjectCard } from "@/components/full-stack-projects/full-stack-project-card";

type FullStackProjectsShowcaseProps = {
  projects: FullStackProject[];
};

function EmptyState() {
  return (
    <div className="rounded-3xl border border-border bg-surface px-5 py-6 text-sm leading-7 text-foreground shadow-sm">
      No full stack projects have been added yet.
    </div>
  );
}

export function FullStackProjectsShowcase({ projects }: FullStackProjectsShowcaseProps) {
  const sortedProjects = [...projects].sort((a, b) => a.order - b.order);

  return (
    <section className="px-1 py-2 motion-reveal" style={{ animationDelay: "160ms" }}>
      {sortedProjects.length > 0 ? (
        <div className="grid gap-5">
          {sortedProjects.map((project, index) => (
            <FullStackProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </section>
  );
}
