export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

export type ChatRequestBody = {
  messages: ChatMessage[];
};

export type KnowledgeChunk = {
  source: string;
  title: string;
  content: string;
  weight?: number;
};

export type KnowledgeBase = {
  chunks: KnowledgeChunk[];
  resumeText: string | null;
  resumeSource: string | null;
};
