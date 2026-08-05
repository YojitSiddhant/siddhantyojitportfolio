"use client";

import { useEffect, useMemo, useRef } from "react";
import type { ChatMessage } from "@/types/ai";
import { EmptyState } from "./EmptyState";
import { TypingIndicator } from "./TypingIndicator";

type ChatMessagesProps = {
  messages: ChatMessage[];
  isSending: boolean;
  error: string | null;
  onRetry: () => void;
};

function splitParagraphs(text: string) {
  return text.split(/\n{2,}/).map((paragraph) => paragraph.trim()).filter(Boolean);
}

function renderFormattedText(content: string) {
  const segments = content.split(/```([\s\S]*?)```/g);

  return segments.map((segment, index) => {
    if (index % 2 === 1) {
      const code = segment.replace(/^[a-zA-Z0-9-]+\n?/, "");

      return (
        <pre
          key={`${segment}-${index}`}
          className="overflow-x-auto rounded-2xl border border-border bg-[#0b1220] p-4 text-xs leading-6 text-white"
        >
          <code>{code}</code>
        </pre>
      );
    }

    const paragraphs = splitParagraphs(segment);

    return paragraphs.map((paragraph) => {
      const lines = paragraph.split(/\n/);
      const isList = lines.every((line) => /^(-|\*|\d+\.)\s+/.test(line));

      if (isList) {
        return (
          <ul key={paragraph} className="space-y-2">
            {lines.map((line) => (
              <li key={line} className="flex gap-2 text-sm leading-6 text-foreground">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{line.replace(/^(-|\*|\d+\.)\s+/, "")}</span>
              </li>
            ))}
          </ul>
        );
      }

      return (
        <p key={paragraph} className="text-sm leading-6 text-foreground">
          {lines.map((line, lineIndex) => (
            <span key={`${line}-${lineIndex}`}>
              {line}
              {lineIndex < lines.length - 1 ? <br /> : null}
            </span>
          ))}
        </p>
      );
    });
  });
}

export function ChatMessages({ messages, isSending, error, onRetry }: ChatMessagesProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const hasMessages = messages.length > 0;

  const renderedMessages = useMemo(
    () =>
      messages.map((message) => (
        <div
          key={message.id}
          className={[
            "flex",
            message.role === "user" ? "justify-end" : "justify-start",
          ].join(" ")}
        >
          <div
            className={[
              "max-w-[92%] rounded-3xl border px-4 py-3 shadow-sm sm:max-w-[85%]",
              message.role === "user"
                ? "border-accent/20 bg-accent text-white"
                : "border-border bg-surface text-foreground",
            ].join(" ")}
          >
            {message.role === "user" ? (
              <p className="text-sm leading-6 text-white">{message.content}</p>
            ) : (
              <div className="space-y-3">{renderFormattedText(message.content)}</div>
            )}
          </div>
        </div>
      )),
    [messages],
  );

  useEffect(() => {
    const node = scrollRef.current;
    if (!node) {
      return;
    }

    node.scrollTo({ top: node.scrollHeight, behavior: "smooth" });
  }, [messages, isSending, error]);

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 sm:px-5">
      <div className="flex min-h-full flex-col gap-3">
        {hasMessages ? (
          renderedMessages
        ) : (
          <EmptyState />
        )}

        {isSending ? (
          <div className="flex justify-start">
            <TypingIndicator />
          </div>
        ) : null}

        {error ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <div>{error}</div>
            <button
              type="button"
              onClick={onRetry}
              className="mt-2 inline-flex rounded-full bg-red-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
