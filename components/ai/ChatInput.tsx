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
    <div className="relative">
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
        className="h-10 w-full rounded-b-lg border-t border-gray-200 bg-gray-100 pl-3 text-sm focus:outline-blue-600/50"
      />
      <button
        type="button"
        disabled={isSending || !value.trim()}
        onClick={onSend}
        className="absolute top-0 right-1 bottom-0 my-auto size-fit cursor-pointer rounded-full p-2 text-blue-600 hover:bg-gray-200 focus:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
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
