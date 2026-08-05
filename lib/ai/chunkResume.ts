import { certificates } from "@/data/certificates";
import { education } from "@/data/education";
import { experience } from "@/data/experience";
import { fullStackProjects } from "@/data/full-stack-projects";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillSections } from "@/data/skills";
import { workItems } from "@/data/work";
import type { KnowledgeBase, KnowledgeChunk } from "@/types/ai";
import { extractResumeText } from "./pdfExtractor";

function normalizeWhitespace(value: string) {
  return value
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function buildSection(source: string, title: string, content: string, weight = 1): KnowledgeChunk {
  return {
    source,
    title,
    content: normalizeWhitespace(content),
    weight,
  };
}

function buildStructuredChunks(): KnowledgeChunk[] {
  const chunks: KnowledgeChunk[] = [
    buildSection(
      "portfolio/profile",
      "Profile summary",
      [
        profile.heroTitle,
        profile.introText,
        `Location: ${profile.location}`,
        `Core focus: ${profile.coreFocus}`,
        `Open to opportunities: ${profile.openToOpportunitiesBadge}`,
      ].join("\n"),
      3,
    ),
    buildSection(
      "portfolio/experience",
      "Work experience",
      experience
        .map(
          (item) =>
            `${item.role} at ${item.company}\nDuration: ${item.duration}\nDetails: ${item.description}\nTechnologies: ${(item.technologies ?? []).join(", ")}`,
        )
        .join("\n\n"),
      3,
    ),
    buildSection(
      "portfolio/skills",
      "Skills",
      skillSections
        .map(
          (section) =>
            `${section.title}: ${section.items
              .map((item) => item.name)
              .join(", ")}`,
        )
        .join("\n"),
      2,
    ),
    buildSection(
      "portfolio/education",
      "Education",
      education.map((item) => `${item.degree} at ${item.institute} (${item.duration})`).join("\n"),
      2,
    ),
    buildSection(
      "portfolio/projects",
      "Projects",
      projects
        .map((project) => `${project.title}\n${project.description}\nStack: ${(project.stack ?? []).map((item) => item.name).join(", ")}`)
        .join("\n\n"),
      3,
    ),
    buildSection(
      "portfolio/full-stack-projects",
      "Full stack projects",
      fullStackProjects
        .map(
          (project) =>
            `${project.title}\nSummary: ${project.summary}\nTech stack: ${project.techStack.join(", ")}\nKey features: ${project.keyFeatures.join(", ")}\nArchitecture: ${project.architectureHighlights.join(", ")}`,
        )
        .join("\n\n"),
      3,
    ),
    buildSection(
      "portfolio/certificates",
      "Certifications",
      certificates.map((certificate) => `${certificate.title} - ${certificate.issuer}`).join("\n"),
      2,
    ),
    buildSection(
      "portfolio/work",
      "Client and published work",
      workItems.map((item) => `${item.title}${item.links.length ? ` - ${item.links.map((link) => link.url).join(", ")}` : ""}`).join("\n"),
      1,
    ),
  ];

  return chunks;
}

function chunkLongText(source: string, title: string, content: string, weight = 1) {
  const normalized = normalizeWhitespace(content);
  if (!normalized) {
    return [];
  }

  const maxChunkSize = 900;
  const paragraphs = normalized.split(/\n\n+/);
  const chunks: KnowledgeChunk[] = [];
  let current = "";

  const pushCurrent = () => {
    const trimmed = current.trim();
    if (trimmed) {
      chunks.push(buildSection(source, title, trimmed, weight));
    }
    current = "";
  };

  for (const paragraph of paragraphs) {
    if (!current) {
      current = paragraph;
      continue;
    }

    if (`${current}\n\n${paragraph}`.length <= maxChunkSize) {
      current = `${current}\n\n${paragraph}`;
      continue;
    }

    pushCurrent();
    current = paragraph;
  }

  pushCurrent();
  return chunks;
}

export function scoreChunk(chunk: KnowledgeChunk, query: string) {
  const queryTokens = new Set<string>(query.toLowerCase().match(/[a-z0-9]+/g) ?? []);
  const chunkTokens = (chunk.content.toLowerCase().match(/[a-z0-9]+/g) ?? []) as string[];
  const titleTokens = (chunk.title.toLowerCase().match(/[a-z0-9]+/g) ?? []) as string[];

  let score = 0;

  for (const token of queryTokens) {
    if (chunkTokens.includes(token)) {
      score += 1 + (chunk.weight ?? 1) * 0.6;
    }

    if (titleTokens.includes(token)) {
      score += 1.5;
    }
  }

  const queryLower = query.toLowerCase();
  if (queryLower.includes("opportunit") && chunk.content.toLowerCase().includes("open to opportunities")) {
    score += 4;
  }

  if (queryLower.includes("intern") && chunk.content.toLowerCase().includes("intern")) {
    score += 4;
  }

  if (queryLower.includes("project") && chunk.source.includes("project")) {
    score += 2;
  }

  return score;
}

export function selectRelevantChunks(chunks: KnowledgeChunk[], query: string, limit = 6) {
  return [...chunks]
    .map((chunk) => ({
      chunk,
      score: scoreChunk(chunk, query),
    }))
    .sort((left, right) => right.score - left.score)
    .filter(({ score }) => score > 0)
    .slice(0, limit)
    .map(({ chunk }) => chunk);
}

export function formatKnowledgeChunks(chunks: KnowledgeChunk[]) {
  return chunks
    .map((chunk) => `[${chunk.title} | ${chunk.source}]\n${chunk.content}`)
    .join("\n\n---\n\n");
}

export async function buildKnowledgeBase(): Promise<KnowledgeBase> {
  const resume = await extractResumeText();
  const structuredChunks = buildStructuredChunks();
  const resumeChunks = resume.text
    ? chunkLongText("resume/pdf", "Resume PDF", resume.text, 4)
    : [];

  return {
    chunks: [...resumeChunks, ...structuredChunks],
    resumeText: resume.text,
    resumeSource: resume.source,
  };
}
