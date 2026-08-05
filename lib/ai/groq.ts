import "server-only";

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

let groqConfigChecked = false;

export function validateGroqConfig() {
  if (groqConfigChecked) {
    return process.env.GROQ_API_KEY;
  }

  groqConfigChecked = true;

  const apiKey = process.env.GROQ_API_KEY;

  if (apiKey) {
    console.info("✓ Groq API configured");
  } else {
    console.warn(
      "⚠ Missing GROQ_API_KEY.\nCreate .env.local and add:\n\nGROQ_API_KEY=your_groq_api_key",
    );
  }

  return apiKey;
}

function getGroqApiKey() {
  const apiKey = validateGroqConfig();

  if (!apiKey) {
    throw new Error("Missing GROQ_API_KEY environment variable.");
  }

  return apiKey;
}

class GroqClient {
  private readonly apiUrl = "https://api.groq.com/openai/v1/chat/completions";
  private readonly model = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

  async generatePortfolioReply({
    query,
    context,
    history,
  }: {
    query: string;
    context: string;
    history: ChatMessage[];
  }) {
    const apiKey = getGroqApiKey();

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

    const response = await fetch(this.apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: this.model,
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
}

export const groqClient = new GroqClient();
