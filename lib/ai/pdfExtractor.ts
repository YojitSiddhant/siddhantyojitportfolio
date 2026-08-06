function normalizePdfText(text: string) {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]+\n/g, "\n")
    .trim();
}

export async function extractResumeText() {
  const { resumeText } = await import("@/data/resume/resume-text");
  const text = normalizePdfText(resumeText);

  return {
    text,
    source: "data/resume/resume.pdf",
  };
}
