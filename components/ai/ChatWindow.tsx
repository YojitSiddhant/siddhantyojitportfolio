"use client";

import { useEffect } from "react";
import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";
import { ChatMessages } from "./ChatMessages";

type ChatWindowProps = {
  isOpen: boolean;
  onClose: () => void;
  onClear: () => void;
  messages: {
    id: string;
    role: "user" | "assistant";
    content: string;
  }[];
  input: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onRetry: () => void;
  isSending: boolean;
  error: string | null;
};

export function ChatWindow({
  isOpen,
  onClose,
  onClear,
  messages,
  input,
  onInputChange,
  onSend,
  onRetry,
  isSending,
  error,
}: ChatWindowProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-end bg-black/15 p-2 backdrop-blur-[2px] sm:p-6">
      <button
        type="button"
        aria-label="Close chat overlay"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
      />

      <section className="relative flex h-[calc(100dvh-1rem)] w-[calc(100vw-1rem)] flex-col overflow-hidden rounded-[28px] border border-border bg-white shadow-[0_24px_80px_rgba(15,23,42,0.16)] sm:h-[650px] sm:w-[420px] sm:rounded-[32px]">
        <div className="relative z-10 flex h-full flex-col">
          <ChatHeader onClose={onClose} onClear={onClear} hasMessages={messages.length > 0} />

          <ChatMessages messages={messages} isSending={isSending} error={error} onRetry={onRetry} />

          <div className="border-t border-border/80 bg-white p-4 sm:p-5">
            <ChatInput
              value={input}
              onChange={onInputChange}
              onSend={onSend}
              isSending={isSending}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
