import "server-only";

import { prisma } from "@/lib/prisma";
import {
  initialCertificates,
  initialEducation,
  initialExperience,
  initialProfile,
  initialProjects,
  initialSkills,
  initialWorkItems,
} from "@/lib/cms-content";

export type ProfileRecord = typeof initialProfile;

async function ensureSeeded() {
  await prisma.profile.upsert({
    where: { id: 1 },
    create: initialProfile,
    update: {},
  });

  if ((await prisma.education.count()) === 0) {
    await prisma.education.createMany({ data: initialEducation });
  }

  if ((await prisma.skill.count()) === 0) {
    await prisma.skill.createMany({ data: initialSkills });
  }

  if ((await prisma.project.count()) === 0) {
    await prisma.project.createMany({ data: initialProjects });
  }

  if ((await prisma.workItem.count()) === 0) {
    await prisma.workItem.createMany({ data: initialWorkItems });
  }

  if ((await prisma.certificate.count()) === 0) {
    await prisma.certificate.createMany({ data: initialCertificates });
  }

  if ((await prisma.experience.count()) === 0) {
    await prisma.experience.createMany({ data: initialExperience });
  }
}

export async function getCmsSnapshot() {
  await ensureSeeded();

  const [profile, education, skills, projects, work, certificates, experience] = await Promise.all([
    prisma.profile.findUnique({ where: { id: 1 } }),
    prisma.education.findMany({ orderBy: { id: "asc" } }),
    prisma.skill.findMany({ orderBy: [{ order: "asc" }, { id: "asc" }] }),
    prisma.project.findMany({ orderBy: [{ featured: "desc" }, { order: "asc" }, { id: "asc" }] }),
    prisma.workItem.findMany({ orderBy: [{ order: "asc" }, { id: "asc" }] }),
    prisma.certificate.findMany({ orderBy: [{ order: "asc" }, { id: "asc" }] }),
    prisma.experience.findMany({ orderBy: [{ order: "asc" }, { id: "asc" }] }),
  ]);

  if (!profile) {
    throw new Error("Portfolio profile is missing.");
  }

  return {
    profile,
    education,
    skills,
    projects,
    work,
    certificates,
    experience,
  };
}

export async function getAdminSnapshot() {
  return getCmsSnapshot();
}
