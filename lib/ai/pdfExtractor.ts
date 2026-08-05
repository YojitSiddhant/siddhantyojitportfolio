import { existsSync } from "fs";
import { readFile, stat } from "fs/promises";
import path from "path";
import { inflateRawSync, inflateSync } from "zlib";

const resumePdfPath = path.join(process.cwd(), "data", "resume", "resume.pdf");

let cachedResume:
  | {
      mtimeMs: number;
      text: string;
    }
  | null = null;

function decodePdfString(value: string) {
  let result = "";

  for (let index = 0; index < value.length; index += 1) {
    const character = value[index];

    if (character !== "\\") {
      result += character;
      continue;
    }

    const next = value[index + 1];

    if (!next) {
      break;
    }

    switch (next) {
      case "n":
        result += "\n";
        index += 1;
        break;
      case "r":
        result += "\r";
        index += 1;
        break;
      case "t":
        result += "\t";
        index += 1;
        break;
      case "b":
        result += "\b";
        index += 1;
        break;
      case "f":
        result += "\f";
        index += 1;
        break;
      case "(":
      case ")":
      case "\\":
        result += next;
        index += 1;
        break;
      case "\r":
      case "\n":
        index += next === "\r" && value[index + 2] === "\n" ? 2 : 1;
        break;
      default: {
        if (/[0-7]/.test(next)) {
          const octalMatch = value.slice(index + 1, index + 4).match(/^[0-7]{1,3}/);
          if (octalMatch?.[0]) {
            result += String.fromCharCode(Number.parseInt(octalMatch[0], 8));
            index += octalMatch[0].length;
          } else {
            result += next;
            index += 1;
          }
          break;
        }

        result += next;
        index += 1;
      }
    }
  }

  return result;
}

function extractTextFromDecodedContent(content: string) {
  const decodedStrings: string[] = [];

  const textRegex = /\((?:\\.|[^\\)])*\)\s*(?:Tj|TJ)/g;
  let match: RegExpExecArray | null;

  while ((match = textRegex.exec(content))) {
    const raw = match[0].match(/\((?:\\.|[^\\)])*\)/)?.[0];
    if (!raw) {
      continue;
    }
    decodedStrings.push(decodePdfString(raw.slice(1, -1)));
  }

  if (!decodedStrings.length) {
    const allStrings = content.match(/\((?:\\.|[^\\)])*\)/g) ?? [];
    for (const raw of allStrings) {
      decodedStrings.push(decodePdfString(raw.slice(1, -1)));
    }
  }

  return decodedStrings.join(" ");
}

function extractTextFromPdfBuffer(buffer: Buffer) {
  const raw = buffer.toString("latin1");
  const streamRegex = /stream\r?\n([\s\S]*?)\r?\nendstream/g;
  const extractedParts: string[] = [];

  let streamMatch: RegExpExecArray | null;
  while ((streamMatch = streamRegex.exec(raw))) {
    const streamContent = streamMatch[1];
    const streamBuffer = Buffer.from(streamContent, "latin1");

    const decodedCandidates = [
      (() => {
        try {
          return inflateSync(streamBuffer).toString("latin1");
        } catch {
          return null;
        }
      })(),
      (() => {
        try {
          return inflateRawSync(streamBuffer).toString("latin1");
        } catch {
          return null;
        }
      })(),
      streamContent,
    ].filter(Boolean) as string[];

    const streamText = decodedCandidates
      .map((candidate) => extractTextFromDecodedContent(candidate))
      .find((candidate) => candidate.trim().length > 0);

    if (streamText) {
      extractedParts.push(streamText);
    }
  }

  if (!extractedParts.length) {
    extractedParts.push(extractTextFromDecodedContent(raw));
  }

  return extractedParts
    .join("\n")
    .replace(/\s+/g, " ")
    .replace(/\s+\n/g, "\n")
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
  const text = extractTextFromPdfBuffer(fileBuffer);

  cachedResume = {
    mtimeMs: fileStats.mtimeMs,
    text,
  };

  return {
    text,
    source: resumePdfPath,
  };
}
