import { existsSync } from "fs";
import { readFile, stat } from "fs/promises";
import path from "path";
import { PDFParse } from "pdf-parse";

const resumePdfPath = path.join(process.cwd(), "data", "resume", "resume.pdf");

let cachedResume:
  | {
      mtimeMs: number;
      text: string;
    }
  | null = null;

function normalizePdfText(text: string) {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]+\n/g, "\n")
    .trim();
}

export async function extractResumeText() {
  if (!existsSync(resumePdfPath)) {
    return {
      text: null as string | null,
      source: null as string | null,
    };
  }

  const fileStats = await stat(resumePdfPath);
  if (cachedResume && cachedResume.mtimeMs === fileStats.mtimeMs) {
    return {
      text: cachedResume.text,
      source: resumePdfPath,
    };
  }

  const fileBuffer = await readFile(resumePdfPath);
  const parser = new PDFParse({ data: fileBuffer });

  try {
    const parsed = await parser.getText({
      pageJoiner: "\n\n",
      lineEnforce: true,
      cellSeparator: " ",
    });
    const text = normalizePdfText(parsed.text || "");

    cachedResume = {
      mtimeMs: fileStats.mtimeMs,
      text,
    };

    return {
      text,
      source: resumePdfPath,
    };
  } finally {
    await parser.destroy();
  }
}
