import { prisma } from "@/lib/prisma";

type CmsMediaCollection = "education" | "certificate" | "experience" | "project";

function parseDataUrl(value: string) {
  const match = /^data:([^;]+);base64,([\s\S]+)$/.exec(value);
  if (!match) {
    return null;
  }

  return {
    contentType: match[1],
    buffer: Buffer.from(match[2], "base64"),
  };
}

async function getMediaRecord(collection: CmsMediaCollection, id: number) {
  switch (collection) {
    case "education":
      return prisma.education.findUnique({ where: { id } });
    case "certificate":
      return prisma.certificate.findUnique({ where: { id } });
    case "experience":
      return prisma.experience.findUnique({ where: { id } });
    case "project":
      return prisma.project.findUnique({ where: { id } });
    default:
      return null;
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const collection = url.searchParams.get("collection") as CmsMediaCollection | null;
  const id = Number(url.searchParams.get("id"));
  const field = url.searchParams.get("field");

  if (!collection || !field || !Number.isInteger(id) || id <= 0) {
    return new Response("Not found", { status: 404 });
  }

  const record = await getMediaRecord(collection, id);
  if (!record) {
    return new Response("Not found", { status: 404 });
  }

  const value = (record as Record<string, unknown>)[field];
  if (typeof value !== "string" || value.length === 0) {
    return new Response("Not found", { status: 404 });
  }

  if (value.startsWith("data:")) {
    const parsed = parseDataUrl(value);
    if (!parsed) {
      return new Response("Unsupported media", { status: 415 });
    }

    return new Response(parsed.buffer, {
      headers: {
        "Content-Type": parsed.contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  }

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return Response.redirect(value, 302);
  }

  return Response.redirect(new URL(value, request.url), 302);
}
