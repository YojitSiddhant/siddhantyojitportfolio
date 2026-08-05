"use client";

import { useChat } from "@/hooks/useChat";
import { ChatWindow } from "./ChatWindow";

export function ChatButton() {
  const chat = useChat();

  return (
    <>
      <button
        type="button"
        onClick={chat.toggleChat}
        className="group fixed bottom-5 right-5 z-[90] inline-flex items-center gap-2 rounded-full border border-accent/15 bg-accent px-4 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(37,99,235,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-strong hover:shadow-[0_18px_36px_rgba(29,78,216,0.32)] sm:bottom-6 sm:right-6"
        aria-label="Open portfolio AI assistant"
      >
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-base transition-transform duration-200 group-hover:rotate-12">
          ✦
        </span>
        <span>Ask AI</span>
      </button>

      <ChatWindow
        isOpen={chat.isOpen}
        onClose={chat.closeChat}
        messages={chat.messages}
        input={chat.input}
        onInputChange={chat.setInput}
        onSend={chat.sendMessage}
        onRetry={chat.retryLast}
        isSending={chat.isSending}
        error={chat.error}
      />
    </>
  );
}
