"use client";

export function EmptyState() {
  return (
    <div className="flex h-full min-h-[260px] flex-col justify-center rounded-3xl border border-dashed border-border bg-surface/60 px-5 py-8 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-accent">
        <span className="text-2xl">✦</span>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-foreground">Ask Siddhant&apos;s portfolio</h3>
      <p className="mt-2 text-sm leading-6 text-muted">
        Ask about experience, projects, skills, education, certifications, or internship work. The assistant only uses Siddhant&apos;s portfolio context.
      </p>
    </div>
  );
}
