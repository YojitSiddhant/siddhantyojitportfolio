"use client";

type ChatHeaderProps = {
  onClose: () => void;
  onClear: () => void;
  hasMessages: boolean;
};

export function ChatHeader({ onClose, onClear, hasMessages }: ChatHeaderProps) {
  return (
    <header className="flex items-start justify-between gap-4 border-b border-border px-4 py-4 sm:px-5">
      <div className="min-w-0">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-accent">
            ✦
          </span>
          <span>Ask Siddhant AI</span>
        </div>
        <p className="mt-1 text-sm leading-6 text-muted">
          Ask anything about Siddhant&apos;s projects, skills or experience.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onClear}
          disabled={!hasMessages}
          className="rounded-full border border-border px-3 py-2 text-xs font-medium text-foreground transition hover:border-accent/40 hover:bg-accent-soft hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition hover:border-accent/40 hover:bg-accent-soft hover:text-accent"
          aria-label="Close chat"
        >
          <span className="text-lg leading-none">×</span>
        </button>
      </div>
    </header>
  );
}
