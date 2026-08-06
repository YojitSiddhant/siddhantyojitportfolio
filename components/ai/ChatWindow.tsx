"use client";

import { useEffect } from "react";
import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";
import { ChatMessages } from "./ChatMessages";

type ChatWindowProps = {
  isOpen: boolean;
  onClose: () => void;
  messages: {
    id: string;
    role: "user" | "assistant";
    content: string;
    createdAt?: string;
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
    <section className="fixed bottom-4 right-4 z-[100] flex h-[calc(100dvh-1rem)] w-[calc(100vw-1rem)] overflow-hidden rounded-2xl bg-white shadow-[0_20px_60px_rgba(15,23,42,0.18)] ring-1 ring-black/5 sm:bottom-6 sm:right-6 sm:h-[760px] sm:w-[520px] lg:h-[780px] lg:w-[540px]">
      <div className="flex h-full w-full flex-col">
        <ChatHeader />

        <ChatMessages messages={messages} isSending={isSending} error={error} onRetry={onRetry} />

        <div className="shrink-0">
          <ChatInput value={input} onChange={onInputChange} onSend={onSend} isSending={isSending} />
        </div>
      </div>
    </section>
  );
}
