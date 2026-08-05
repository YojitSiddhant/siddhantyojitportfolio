"use client";

import { useEffect, useRef } from "react";
import type { ChatMessage } from "@/types/ai";
import { TypingIndicator } from "./TypingIndicator";

type ChatMessagesProps = {
  messages: ChatMessage[];
  isSending: boolean;
  error: string | null;
  onRetry: () => void;
};

function formatTime(timestamp?: string) {
  if (!timestamp) {
    return "";
  }

  return new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function ChatMessages({ messages, isSending, error, onRetry }: ChatMessagesProps) {
  const scrollRef = useRef<HTMLUListElement | null>(null);
  const hasMessages = messages.length > 0;
  const displayMessages = messages.map((message, index) => ({
    role: message.role,
    time: formatTime(message.createdAt),
    content: message.content,
    key: message.id || `${message.role}-${index}`,
  }));

  useEffect(() => {
    const node = scrollRef.current;
    if (!node) {
      return;
    }

    node.scrollTo({ top: node.scrollHeight, behavior: "smooth" });
  }, [messages, isSending, error]);

  return (
    <ul ref={scrollRef} className="border-t border-gray-200 p-3 pb-6">
      {hasMessages
        ? displayMessages.map((message) => (
            <li
              key={message.key}
              className={`flex flex-col ${message.role === "user" ? "items-end" : "items-start"}`}
            >
              {message.time ? (
                <div className="text-right text-xs text-gray-500">{message.time}</div>
              ) : null}
              <div
                className={
                  message.role === "user"
                    ? "w-40 rounded-lg bg-blue-600/70 px-2 py-1 text-right text-sm text-white"
                    : "w-fit rounded-lg bg-gray-100 px-2 py-1 text-sm text-gray-900"
                }
              >
                {message.content}
              </div>
            </li>
          ))
        : null}

      {isSending ? (
        <li className="flex flex-col items-start">
          <div className="flex w-fit items-center gap-1 rounded-lg bg-gray-100 px-2 py-2.5 text-sm">
            <TypingIndicator />
          </div>
        </li>
      ) : null}

      {error ? (
        <li className="mt-2 rounded-lg bg-red-50 p-2 text-sm text-red-700">
          <div>{error}</div>
          <button
            type="button"
            onClick={onRetry}
            className="mt-2 inline-flex rounded-full bg-red-600 px-3 py-1.5 text-xs font-semibold text-white"
          >
            Retry
          </button>
        </li>
      ) : null}
    </ul>
  );
}
