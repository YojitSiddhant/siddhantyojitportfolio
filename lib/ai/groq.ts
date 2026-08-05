import type { ChatMessage } from "@/types/ai";
import { buildPortfolioPrompt } from "./prompt";

type GroqMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type GroqResponse = {
  choices?: Array<{
    message?: {
      content?: string | null;
    };
  }>;
};

export async function generatePortfolioReply({
  query,
  context,
  history,
}: {
  query: string;
  context: string;
  history: ChatMessage[];
}) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not configured.");
  }

  const model = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";
  const apiUrl = "https://api.groq.com/openai/v1/chat/completions";

  const messages: GroqMessage[] = [
    {
      role: "system",
      content: buildPortfolioPrompt(context),
    },
    ...history.map((message) => ({
      role: message.role,
      content: message.content,
    })),
    {
      role: "user",
      content: query,
    },
  ];

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.2,
      top_p: 1,
      max_tokens: 400,
    }),
  });

  if (!response.ok) {
    const responseText = await response.text();
    throw new Error(`Groq request failed with status ${response.status}: ${responseText}`);
  }

  const payload = (await response.json()) as GroqResponse;
  const reply = payload.choices?.[0]?.message?.content?.trim();

  if (!reply) {
    throw new Error("Groq returned an empty response.");
  }

  return reply;
}
