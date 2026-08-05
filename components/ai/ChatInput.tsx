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
      className="rounded-2xl border border-gray-200 bg-white px-3 py-2.5 shadow-sm"
      onSubmit={(event) => {
        event.preventDefault();
        onSend();
      }}
    >
      <div className="relative flex items-end gap-2">
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
          placeholder={placeholder ?? "Reply"}
          rows={1}
          className="max-h-40 min-h-10 flex-1 resize-none rounded-xl border-none bg-white px-3 py-2.5 pr-12 text-sm leading-6 text-gray-900 outline-none placeholder:text-gray-500 focus:ring-0"
        />

        <button
          type="submit"
          disabled={isSending || !value.trim()}
          className="absolute right-2 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-blue-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <svg className="size-4" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" strokeLinejoin="round" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </form>
  );
}
