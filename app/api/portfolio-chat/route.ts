import { NextResponse } from "next/server";
import { buildKnowledgeBase, formatKnowledgeChunks, selectRelevantChunks } from "@/lib/ai/chunkResume";
import { groqClient } from "@/lib/ai/groq";
import type { ChatRequestBody } from "@/types/ai";

export const runtime = "nodejs";

function getLastUserMessage(messages: ChatRequestBody["messages"]) {
  const reversed = [...messages].reverse();
  return reversed.find((message) => message.role === "user");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ChatRequestBody>;
    const messages = Array.isArray(body.messages) ? body.messages : [];
    const lastUserMessage = getLastUserMessage(messages);

    if (!lastUserMessage?.content?.trim()) {
      return NextResponse.json(
        { error: "Please send a question about Siddhant's portfolio." },
        { status: 400 },
      );
    }

    const knowledgeBase = await buildKnowledgeBase();
    const relevantChunks = selectRelevantChunks(knowledgeBase.chunks, lastUserMessage.content, 6);
    const contextChunks = relevantChunks.length ? relevantChunks : knowledgeBase.chunks.slice(0, 4);
    const context = formatKnowledgeChunks(contextChunks);

    if (!context.trim()) {
      return NextResponse.json(
        { message: "I couldn't find that information in Siddhant's portfolio." },
        { status: 200 },
      );
    }

    const assistantReply = await groqClient.generatePortfolioReply({
      query: lastUserMessage.content,
      context,
      history: messages.slice(0, -1),
    });

    return NextResponse.json({
      message: assistantReply,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    const missingKeyMessage =
      "Missing GROQ_API_KEY environment variable.";
    return NextResponse.json(
      {
        error:
          message === missingKeyMessage
            ? "⚠ Missing GROQ_API_KEY. Create .env.local and add: GROQ_API_KEY=your_groq_api_key"
            : "The portfolio assistant could not respond right now.",
      },
      { status: 500 },
    );
  }
}
