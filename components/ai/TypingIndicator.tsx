"use client";

export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-foreground shadow-sm">
      <span className="h-2 w-2 rounded-full bg-accent motion-float" style={{ animationDelay: "0ms" }} />
      <span className="h-2 w-2 rounded-full bg-accent motion-float" style={{ animationDelay: "140ms" }} />
      <span className="h-2 w-2 rounded-full bg-accent motion-float" style={{ animationDelay: "280ms" }} />
      <span className="ml-2 text-xs font-medium uppercase tracking-widest text-muted">Thinking</span>
    </div>
  );
}
