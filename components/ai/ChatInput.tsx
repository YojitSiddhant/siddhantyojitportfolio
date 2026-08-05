"use client";

import { useEffect, useRef } from "react";

type ChatInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isSending: boolean;
  placeholder?: string;
};

export function ChatInput({ value, onChange, onSend, isSending, placeholder }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) {
      return;
    }

    textarea.style.height = "0px";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`;
  }, [value]);

  return (
    <form
      className="rounded-3xl border border-border bg-surface p-3 shadow-sm"
      onSubmit={(event) => {
        event.preventDefault();
        onSend();
      }}
    >
      <div className="flex items-end gap-2">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              onSend();
            }
          }}
          placeholder={placeholder ?? "Ask about Siddhant's portfolio..."}
          rows={1}
          className="max-h-40 min-h-12 flex-1 resize-none bg-transparent px-2 py-2 text-sm leading-6 text-foreground outline-none placeholder:text-muted"
        />

        <button
          type="submit"
          disabled={isSending || !value.trim()}
          className="inline-flex h-11 items-center justify-center rounded-2xl bg-accent px-4 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-accent-strong hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
        >
          Send
        </button>
      </div>

      <p className="mt-2 px-2 text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
        Enter to send · Shift+Enter for a new line
      </p>
    </form>
  );
}
