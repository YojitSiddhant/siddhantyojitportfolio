import { contactLinks } from "@/data/contact";
import { certificates } from "@/data/certificates";
import { developerJourney, githubProfile } from "@/data/github-profile";
import { education } from "@/data/education";
import { experience } from "@/data/experience";
import { fullStackProjects } from "@/data/full-stack-projects";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillSections } from "@/data/skills";
import { workItems } from "@/data/work";
import type { KnowledgeBase, KnowledgeChunk } from "@/types/ai";

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

function joinItems(items: string[]) {
  return items.filter(Boolean).join("\n");
}

function buildWebsiteChunks(): KnowledgeChunk[] {
  return [
    buildSection(
      "website/home",
      "Home page overview",
      [
        profile.heroTitle,
        profile.introText,
        `Snapshot: ${profile.snapshotTitle}`,
        `Location: ${profile.location}`,
        `Core focus: ${profile.coreFocus}`,
        `What I care about: ${profile.whatICareAbout}`,
        `Open to opportunities: ${profile.openToOpportunitiesBadge}`,
        `Quick notes: ${profile.quickNotes
          .map((note) => `${note.label}: ${note.value}`)
          .join(" | ")}`,
        `Working style: ${profile.workingStyle.map((item) => item.title).join(" | ")}`,
      ].join("\n"),
      4,
    ),
    buildSection(
      "website/contact",
      "Contact details",
      [
        `Email: ${contactLinks.email}`,
        `Phone: ${contactLinks.phone}`,
        `WhatsApp: ${contactLinks.whatsapp}`,
        `LinkedIn: ${contactLinks.linkedin}`,
        `GitHub: ${contactLinks.github}`,
        `Preferred location: ${profile.location}`,
      ].join("\n"),
      4,
    ),
    buildSection(
      "website/github",
      "GitHub profile",
      [
        `Display name: ${githubProfile.displayName}`,
        `Username: ${githubProfile.username}`,
        `Profile URL: ${githubProfile.profileUrl}`,
        githubProfile.description,
      ].join("\n"),
      2,
    ),
    buildSection(
      "website/journey",
      "Developer journey",
      developerJourney
        .map((step, index) => `${index + 1}. ${step.title} - ${step.description}`)
        .join("\n"),
      1,
    ),
    buildSection(
      "website/experience",
      "Work experience",
      experience
        .map(
          (item) =>
            `${item.role} at ${item.company}\nDuration: ${item.duration}\nDetails: ${item.description}\nTechnologies: ${(item.technologies ?? []).join(", ") || "Not listed"}`,
        )
        .join("\n\n"),
      4,
    ),
    buildSection(
      "website/skills",
      "Skills",
      skillSections
        .map(
          (section) =>
            `${section.title}: ${section.items
              .map((item) => item.name)
              .join(", ")}`,
        )
        .join("\n"),
      3,
    ),
    buildSection(
      "website/education",
      "Education",
      education.map((item) => `${item.degree} at ${item.institute} (${item.duration})`).join("\n"),
      2,
    ),
    buildSection(
      "website/certificates",
      "Certificates",
      certificates.map((certificate) => `${certificate.title} - ${certificate.issuer}`).join("\n"),
      2,
    ),
    buildSection(
      "website/academic-projects",
      "Academic projects",
      projects
        .map(
          (project) =>
            `${project.title}\n${project.description}\nStack: ${(project.stack ?? []).map((item) => item.name).join(", ") || "Not listed"}\nGitHub: ${project.github || "Not listed"}`,
        )
        .join("\n\n"),
      3,
    ),
    buildSection(
      "website/full-stack-projects",
      "Full stack projects",
      fullStackProjects
        .map(
          (project) =>
            `${project.title}\nSummary: ${project.summary}\nTech stack: ${project.techStack.join(", ")}\nKey features: ${project.keyFeatures.join(", ")}\nArchitecture: ${project.architectureHighlights.join(", ")}\nGitHub: ${project.githubUrl || "Not listed"}`,
        )
        .join("\n\n"),
      4,
    ),
    buildSection(
      "website/work",
      "Client and published work",
      workItems
        .map(
          (item) =>
            `${item.title}\nLinks: ${item.links.map((link) => `${link.label}: ${link.url}`).join(", ") || "Not listed"}`,
        )
        .join("\n\n"),
      2,
    ),
  ];
}

function buildWebsiteSupplementChunks(): KnowledgeChunk[] {
  return [
    buildSection(
      "website/supplement",
      "Additional website coverage",
      joinItems([
        "The website also reflects that Siddhant is comfortable with MySQL, PostgreSQL, GitHub Copilot, Cursor, and ChatGPT.",
        "The work and experience sections emphasize UI enhancements, testing workflows, debugging support, Git and GitHub collaboration, and live client delivery.",
        "For short contact answers, the website exposes the email, phone number, WhatsApp, LinkedIn, GitHub, and location directly in the contact section.",
      ]),
      1,
    ),
  ];
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
  const chunks = [...buildWebsiteChunks(), ...buildWebsiteSupplementChunks()];

  return {
    chunks,
    resumeText: null,
    resumeSource: null,
  };
}
