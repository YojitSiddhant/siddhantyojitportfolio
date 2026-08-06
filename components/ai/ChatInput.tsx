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
    <div className="relative border-t border-gray-200 bg-white p-3">
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
        className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 pr-12 text-sm text-gray-900 outline-none transition focus:border-blue-300 focus:bg-white"
      />
      <button
        type="button"
        disabled={isSending || !value.trim()}
        onClick={onSend}
        className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full p-2 text-blue-600 transition hover:bg-gray-100 focus:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
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
