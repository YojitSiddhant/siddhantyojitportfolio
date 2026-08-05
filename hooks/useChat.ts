"use client";

import { useMemo, useState } from "react";
import type { ChatMessage } from "@/types/ai";

const initialSuggestions = [
  "Tell me about Siddhant",
  "Show React projects",
  "What technologies does he know?",
  "Tell me about Collector Hub",
  "Explain LeadDesk Mini",
  "What internship experience does he have?",
  "Is he open for opportunities?",
  "How can I contact him?",
];

function createMessage(role: ChatMessage["role"], content: string): ChatMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    role,
    content,
  };
}

export function useChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFailedPrompt, setLastFailedPrompt] = useState<string | null>(null);

  const canSend = useMemo(() => input.trim().length > 0 && !isSending, [input, isSending]);

  function openChat() {
    setIsOpen(true);
  }

  function closeChat() {
    setIsOpen(false);
    setError(null);
  }

  function toggleChat() {
    setIsOpen((current) => !current);
  }

  function clearConversation() {
    setMessages([]);
    setInput("");
    setError(null);
    setLastFailedPrompt(null);
  }

  async function submitPrompt(prompt: string) {
    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt || isSending) {
      return;
    }

    const nextMessage = createMessage("user", trimmedPrompt);
    const nextMessages = [...messages, nextMessage];

    setMessages(nextMessages);
    setInput("");
    setIsSending(true);
    setError(null);
    setLastFailedPrompt(null);

    try {
      const response = await fetch("/api/portfolio-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: nextMessages,
        }),
      });

      const payload = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        throw new Error(payload.error || "The portfolio assistant could not respond right now.");
      }

      const assistantMessage = payload.message || "I couldn't find that information in Siddhant's portfolio.";
      setMessages((current) => [
        ...current,
        createMessage("assistant", assistantMessage),
      ]);
    } catch (requestError) {
      const errorMessage =
        requestError instanceof Error
          ? requestError.message
          : "The portfolio assistant could not respond right now.";

      setError(errorMessage);
      setLastFailedPrompt(trimmedPrompt);
    } finally {
      setIsSending(false);
    }
  }

  function sendMessage() {
    void submitPrompt(input);
  }

  function sendSuggestedQuestion(question: string) {
    void submitPrompt(question);
  }

  function retryLast() {
    if (!lastFailedPrompt) {
      return;
    }

    void submitPrompt(lastFailedPrompt);
  }

  return {
    isOpen,
    openChat,
    closeChat,
    toggleChat,
    messages,
    input,
    setInput,
    isSending,
    canSend,
    error,
    clearConversation,
    sendMessage,
    sendSuggestedQuestion,
    retryLast,
    suggestedQuestions: initialSuggestions,
  };
}
