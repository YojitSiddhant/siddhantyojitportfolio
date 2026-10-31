"use client";

type ChatInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isSending: boolean;
  placeholder?: string;
};

export function ChatInput({ value, onChange, onSend, isSending, placeholder }: ChatInputProps) {
  return (
    <div className="relative border-t border-border bg-surface p-3">
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            onSend();
          }
        }}
        placeholder={placeholder ?? "Reply"}
        className="h-12 w-full rounded-xl border border-border bg-surface-strong px-4 pr-14 text-sm text-foreground outline-none transition placeholder:text-subtle focus:border-accent"
      />
      <button
        type="button"
        disabled={isSending || !value.trim()}
        onClick={onSend}
        aria-label="Send message"
        className="btn btn-primary btn-icon absolute right-4 top-1/2 -translate-y-1/2 p-0"
      >
        <svg
          className="size-4"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}
