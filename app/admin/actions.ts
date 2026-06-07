"use server";

import { compare } from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import {
  ADMIN_SESSION_COOKIE,
  createAdminSessionToken,
  getAdminSessionCookieOptions,
} from "@/lib/session";
import { verifyAdminSessionToken } from "@/lib/session";

export type LoginState = {
  error?: string;
};

const PUBLIC_ROUTES = ["/", "/education", "/skills", "/projects", "/my-work", "/certificate", "/experience"];

function cleanString(value: FormDataEntryValue | null) {
  if (typeof value !== "string") {
    return "";
  }
  return value.trim();
}

function cleanOptionalString(value: FormDataEntryValue | null) {
  const trimmed = cleanString(value);
  return trimmed.length > 0 ? trimmed : null;
}

function cleanBoolean(value: FormDataEntryValue | null) {
  return value === "on" || value === "true" || value === "1";
}

function cleanNumber(value: FormDataEntryValue | null, fallback = 0) {
  const parsed = Number(cleanString(value));
  return Number.isFinite(parsed) ? parsed : fallback;
}

function parseTextLines(value: FormDataEntryValue | null) {
  return cleanString(value)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseLabelValueLines(value: FormDataEntryValue | null) {
  return parseTextLines(value).map((line) => {
    const [icon = "", label = "", ...rest] = line.split("|");
    return {
      icon: icon.trim() || undefined,
      label: label.trim() || icon.trim(),
      value: rest.join("|").trim(),
    };
  }).filter((item) => item.label && item.value);
}

function parseValueCards(value: FormDataEntryValue | null) {
  return parseTextLines(value).map((line) => {
    const [icon = "", title = "", ...rest] = line.split("|");
    return {
      icon: icon.trim(),
      title: title.trim(),
      description: rest.join("|").trim(),
    };
  }).filter((item) => item.icon && item.title && item.description);
}

function parseWorkingStyle(value: FormDataEntryValue | null) {
  return parseTextLines(value).map((line) => {
    const [icon = "", ...rest] = line.split("|");
    return {
      icon: icon.trim(),
      title: rest.join("|").trim(),
    };
  }).filter((item) => item.icon && item.title);
}

function parseStackLines(value: FormDataEntryValue | null) {
  return parseTextLines(value).map((line) => {
    const [name = "", src = "", iconClassName = ""] = line.split("|");
    return {
      name: name.trim(),
      src: src.trim(),
      iconClassName: iconClassName.trim() || undefined,
    };
  }).filter((item) => item.name && item.src);
}

function parseLinks(value: FormDataEntryValue | null) {
  return parseTextLines(value).map((line) => {
    const [label = "", url = ""] = line.split("|");
    return {
      label: label.trim(),
      url: url.trim(),
    };
  }).filter((item) => item.label && item.url);
}

async function fileToDataUrl(value: FormDataEntryValue | null) {
  if (!value || typeof value === "string" || value.size === 0) {
    return null;
  }

  const buffer = Buffer.from(await value.arrayBuffer());
  const type = value.type || "application/octet-stream";
  return `data:${type};base64,${buffer.toString("base64")}`;
}

async function requireAdmin() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not configured.");
  }

  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) {
    redirect("/admin/login");
  }

  const session = await verifyAdminSessionToken(token, secret);
  if (!session) {
    cookieStore.delete(ADMIN_SESSION_COOKIE);
    redirect("/admin/login");
  }

  return session;
}

function revalidatePortfolio() {
  for (const route of PUBLIC_ROUTES) {
    revalidatePath(route);
  }
  revalidatePath("/admin/dashboard");
}

function dashboardRedirect(message: string, section: string) {
  redirect(`/admin/dashboard?toast=${encodeURIComponent(message)}#${section}`);
}

export async function loginAdmin(_state: LoginState, formData: FormData): Promise<LoginState> {
  const password = cleanString(formData.get("password"));
  if (!password) {
    return { error: "Password is required." };
  }

  const hash = process.env.ADMIN_PASSWORD_HASH;
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!hash) {
    return { error: "ADMIN_PASSWORD_HASH is missing from the environment." };
  }

  if (!secret) {
    return { error: "ADMIN_SESSION_SECRET is missing from the environment." };
  }

  const valid = await compare(password, hash);
  if (!valid) {
    return { error: "Incorrect password." };
  }

  const token = await createAdminSessionToken(secret);
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, token, getAdminSessionCookieOptions());

  redirect("/admin/dashboard");
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
  redirect("/admin/login");
}

export async function saveProfile(formData: FormData) {
  await requireAdmin();

  await prisma.profile.upsert({
    where: { id: 1 },
    create: {
      id: 1,
      heroTitle: cleanString(formData.get("heroTitle")) || "Hi, I'm Siddhant Yojit.",
      introText: cleanString(formData.get("introText")),
      location: cleanString(formData.get("location")),
      coreFocus: cleanString(formData.get("coreFocus")),
      snapshotTitle: cleanString(formData.get("snapshotTitle")),
      whatICareAbout: cleanString(formData.get("whatICareAbout")),
      currentRole: cleanString(formData.get("currentRole")),
      openToOpportunitiesBadge: cleanString(formData.get("openToOpportunitiesBadge")),
      quickNotes: parseLabelValueLines(formData.get("quickNotes")),
      headerNotes: parseLabelValueLines(formData.get("headerNotes")),
      valueCards: parseValueCards(formData.get("valueCards")),
      workingStyle: parseWorkingStyle(formData.get("workingStyle")),
    },
    update: {
      heroTitle: cleanString(formData.get("heroTitle")),
      introText: cleanString(formData.get("introText")),
      location: cleanString(formData.get("location")),
      coreFocus: cleanString(formData.get("coreFocus")),
      snapshotTitle: cleanString(formData.get("snapshotTitle")),
      whatICareAbout: cleanString(formData.get("whatICareAbout")),
      currentRole: cleanString(formData.get("currentRole")),
      openToOpportunitiesBadge: cleanString(formData.get("openToOpportunitiesBadge")),
      quickNotes: parseLabelValueLines(formData.get("quickNotes")),
      headerNotes: parseLabelValueLines(formData.get("headerNotes")),
      valueCards: parseValueCards(formData.get("valueCards")),
      workingStyle: parseWorkingStyle(formData.get("workingStyle")),
    },
  });

  revalidatePortfolio();
  dashboardRedirect("Home updated successfully.", "home");
}

export async function createEducation(formData: FormData) {
  await requireAdmin();

  const logo = await fileToDataUrl(formData.get("logoFile")) ?? cleanOptionalString(formData.get("logo"));

  await prisma.education.create({
    data: {
      institute: cleanString(formData.get("institute")),
      degree: cleanString(formData.get("degree")),
      duration: cleanString(formData.get("duration")),
      description: cleanString(formData.get("description")),
      logo,
    },
  });

  revalidatePortfolio();
  dashboardRedirect("Education item created.", "education");
}

export async function updateEducation(id: number, formData: FormData) {
  await requireAdmin();

  const logo = (await fileToDataUrl(formData.get("logoFile"))) ?? cleanOptionalString(formData.get("logo"));

  await prisma.education.update({
    where: { id },
    data: {
      institute: cleanString(formData.get("institute")),
      degree: cleanString(formData.get("degree")),
      duration: cleanString(formData.get("duration")),
      description: cleanString(formData.get("description")),
      logo,
    },
  });

  revalidatePortfolio();
  dashboardRedirect("Education item updated.", "education");
}

export async function deleteEducation(id: number) {
  await requireAdmin();
  await prisma.education.delete({ where: { id } });
  revalidatePortfolio();
  dashboardRedirect("Education item deleted.", "education");
}

export async function createSkill(formData: FormData) {
  await requireAdmin();

  await prisma.skill.create({
    data: {
      name: cleanString(formData.get("name")),
      category: cleanString(formData.get("category")),
      icon: cleanString(formData.get("icon")),
      href: cleanOptionalString(formData.get("href")),
      order: cleanNumber(formData.get("order")),
    },
  });

  revalidatePortfolio();
  dashboardRedirect("Skill created.", "skills");
}

export async function updateSkill(id: number, formData: FormData) {
  await requireAdmin();

  await prisma.skill.update({
    where: { id },
    data: {
      name: cleanString(formData.get("name")),
      category: cleanString(formData.get("category")),
      icon: cleanString(formData.get("icon")),
      href: cleanOptionalString(formData.get("href")),
      order: cleanNumber(formData.get("order")),
    },
  });

  revalidatePortfolio();
  dashboardRedirect("Skill updated.", "skills");
}

export async function deleteSkill(id: number) {
  await requireAdmin();
  await prisma.skill.delete({ where: { id } });
  revalidatePortfolio();
  dashboardRedirect("Skill deleted.", "skills");
}

export async function createProject(formData: FormData) {
  await requireAdmin();

  const image = (await fileToDataUrl(formData.get("imageFile"))) ?? cleanOptionalString(formData.get("image"));

  await prisma.project.create({
    data: {
      title: cleanString(formData.get("title")),
      description: cleanString(formData.get("description")),
      stack: parseStackLines(formData.get("stack")),
      github: cleanOptionalString(formData.get("github")),
      liveLink: cleanOptionalString(formData.get("liveLink")),
      image,
      featured: cleanBoolean(formData.get("featured")),
      order: cleanNumber(formData.get("order")),
    },
  });

  revalidatePortfolio();
  dashboardRedirect("Project created.", "projects");
}

export async function updateProject(id: number, formData: FormData) {
  await requireAdmin();

  const image = (await fileToDataUrl(formData.get("imageFile"))) ?? cleanOptionalString(formData.get("image"));

  await prisma.project.update({
    where: { id },
    data: {
      title: cleanString(formData.get("title")),
      description: cleanString(formData.get("description")),
      stack: parseStackLines(formData.get("stack")),
      github: cleanOptionalString(formData.get("github")),
      liveLink: cleanOptionalString(formData.get("liveLink")),
      image,
      featured: cleanBoolean(formData.get("featured")),
      order: cleanNumber(formData.get("order")),
    },
  });

  revalidatePortfolio();
  dashboardRedirect("Project updated.", "projects");
}

export async function deleteProject(id: number) {
  await requireAdmin();
  await prisma.project.delete({ where: { id } });
  revalidatePortfolio();
  dashboardRedirect("Project deleted.", "projects");
}

export async function createWorkItem(formData: FormData) {
  await requireAdmin();

  await prisma.workItem.create({
    data: {
      title: cleanString(formData.get("title")),
      summary: cleanString(formData.get("summary")),
      screenshots: parseTextLines(formData.get("screenshots")),
      links: parseLinks(formData.get("links")),
      order: cleanNumber(formData.get("order")),
    },
  });

  revalidatePortfolio();
  dashboardRedirect("Work item created.", "my-work");
}

export async function updateWorkItem(id: number, formData: FormData) {
  await requireAdmin();

  await prisma.workItem.update({
    where: { id },
    data: {
      title: cleanString(formData.get("title")),
      summary: cleanString(formData.get("summary")),
      screenshots: parseTextLines(formData.get("screenshots")),
      links: parseLinks(formData.get("links")),
      order: cleanNumber(formData.get("order")),
    },
  });

  revalidatePortfolio();
  dashboardRedirect("Work item updated.", "my-work");
}

export async function deleteWorkItem(id: number) {
  await requireAdmin();
  await prisma.workItem.delete({ where: { id } });
  revalidatePortfolio();
  dashboardRedirect("Work item deleted.", "my-work");
}

export async function createCertificate(formData: FormData) {
  await requireAdmin();

  const image = (await fileToDataUrl(formData.get("imageFile"))) ?? cleanOptionalString(formData.get("image"));

  await prisma.certificate.create({
    data: {
      title: cleanString(formData.get("title")),
      issuer: cleanString(formData.get("issuer")),
      issueDate: cleanString(formData.get("issueDate")),
      image,
      verificationLink: cleanOptionalString(formData.get("verificationLink")),
      order: cleanNumber(formData.get("order")),
    },
  });

  revalidatePortfolio();
  dashboardRedirect("Certificate created.", "certificate");
}

export async function updateCertificate(id: number, formData: FormData) {
  await requireAdmin();

  const image = (await fileToDataUrl(formData.get("imageFile"))) ?? cleanOptionalString(formData.get("image"));

  await prisma.certificate.update({
    where: { id },
    data: {
      title: cleanString(formData.get("title")),
      issuer: cleanString(formData.get("issuer")),
      issueDate: cleanString(formData.get("issueDate")),
      image,
      verificationLink: cleanOptionalString(formData.get("verificationLink")),
      order: cleanNumber(formData.get("order")),
    },
  });

  revalidatePortfolio();
  dashboardRedirect("Certificate updated.", "certificate");
}

export async function deleteCertificate(id: number) {
  await requireAdmin();
  await prisma.certificate.delete({ where: { id } });
  revalidatePortfolio();
  dashboardRedirect("Certificate deleted.", "certificate");
}

export async function createExperience(formData: FormData) {
  await requireAdmin();

  const logo = (await fileToDataUrl(formData.get("logoFile"))) ?? cleanOptionalString(formData.get("logo"));

  await prisma.experience.create({
    data: {
      company: cleanString(formData.get("company")),
      role: cleanString(formData.get("role")),
      duration: cleanString(formData.get("duration")),
      description: cleanString(formData.get("description")),
      technologies: parseTextLines(formData.get("technologies")),
      logo,
      order: cleanNumber(formData.get("order")),
    },
  });

  revalidatePortfolio();
  dashboardRedirect("Experience created.", "experience");
}

export async function updateExperience(id: number, formData: FormData) {
  await requireAdmin();

  const logo = (await fileToDataUrl(formData.get("logoFile"))) ?? cleanOptionalString(formData.get("logo"));

  await prisma.experience.update({
    where: { id },
    data: {
      company: cleanString(formData.get("company")),
      role: cleanString(formData.get("role")),
      duration: cleanString(formData.get("duration")),
      description: cleanString(formData.get("description")),
      technologies: parseTextLines(formData.get("technologies")),
      logo,
      order: cleanNumber(formData.get("order")),
    },
  });

  revalidatePortfolio();
  dashboardRedirect("Experience updated.", "experience");
}

export async function deleteExperience(id: number) {
  await requireAdmin();
  await prisma.experience.delete({ where: { id } });
  revalidatePortfolio();
  dashboardRedirect("Experience deleted.", "experience");
}
