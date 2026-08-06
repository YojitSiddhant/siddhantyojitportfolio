"use client";

import { useChat } from "@/hooks/useChat";
import { ChatWindow } from "./ChatWindow";

export function ChatButton() {
  const chat = useChat();

  return (
    <div className="fixed right-4 bottom-4 z-[90] w-fit sm:right-6 sm:bottom-6">
      <button
        type="button"
        onClick={chat.toggleChat}
        aria-label="Open portfolio AI assistant"
        className="group relative aspect-square h-[var(--sz-btn)] w-[var(--sz-btn)] cursor-pointer rounded-xl border border-solid border-transparent bg-[var(--accent)] [--sz-btn:68px] [--space:calc(var(--sz-btn)/5.5)] [--gen-sz:calc(var(--space)*2)] [--sz-text:calc(var(--sz-btn)-var(--gen-sz))] [box-shadow:#3c40434d_0_1px_2px_0,#3c404326_0_2px_6px_2px,#0000004d_0_30px_60px_-30px,#34343459_0_-2px_6px_0_inset] transition-transform duration-200 hover:bg-[var(--accent-strong)] active:scale-[0.95]"
      >
        <svg
          className="absolute left-[calc(var(--sz-text)/7)] top-[calc(var(--sz-text)/7)] z-10 h-[var(--gen-sz)] w-[var(--gen-sz)] animate-pulse overflow-visible text-white/90 transition-all duration-300 group-hover:left-[calc(var(--sz-text)/4)] group-hover:top-[calc(calc(var(--gen-sz))/2)] group-hover:h-[var(--sz-text)] group-hover:w-[var(--sz-text)] group-hover:text-white"
          stroke="none"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z"
          />
        </svg>
        <span className="absolute inset-0 z-20 flex items-center justify-center text-[var(--sz-text)] font-extrabold leading-none text-white transition-all duration-200 group-hover:opacity-0">
          AI
        </span>
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
    </div>
  );
}
