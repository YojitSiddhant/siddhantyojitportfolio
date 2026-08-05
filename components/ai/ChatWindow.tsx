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
    <section className="fixed bottom-5 right-5 z-[100] w-64 overflow-hidden rounded-lg bg-white shadow-lg">
      <div className="relative">
          <ChatHeader />

          <ChatMessages messages={messages} isSending={isSending} error={error} onRetry={onRetry} />

          <div className="">
            <ChatInput
              value={input}
              onChange={onInputChange}
              onSend={onSend}
              isSending={isSending}
            />
          </div>
      </div>
    </section>
  );
}
