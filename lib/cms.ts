import "server-only";

import { unstable_cache } from "next/cache";
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

export const CMS_CACHE_TAG = "portfolio-cms";
const CMS_CACHE_REVALIDATE_SECONDS = 300;

export type ProfileRecord = typeof initialProfile;
export type AdminSnapshot = Awaited<ReturnType<typeof getCmsSnapshot>>;

let seedPromise: Promise<void> | null = null;

async function ensureSeeded() {
  if (seedPromise) {
    return seedPromise;
  }

  seedPromise = (async () => {
    const profileExists = await prisma.profile.findUnique({
      where: { id: 1 },
      select: { id: true },
    });

    if (profileExists) {
      return;
    }

    await prisma.profile.create({
      data: initialProfile,
    });

    await Promise.all([
      prisma.education.createMany({ data: initialEducation }),
      prisma.skill.createMany({ data: initialSkills }),
      prisma.project.createMany({ data: initialProjects }),
      prisma.workItem.createMany({ data: initialWorkItems }),
      prisma.certificate.createMany({ data: initialCertificates }),
      prisma.experience.createMany({ data: initialExperience }),
    ]);
  })().finally(() => {
    seedPromise = null;
  });

  return seedPromise;
}

function createCachedLoader<T>(key: string, loader: () => Promise<T>) {
  return unstable_cache(
    async () => {
      await ensureSeeded();
      return loader();
    },
    ["cms", key],
    {
      tags: [CMS_CACHE_TAG],
      revalidate: CMS_CACHE_REVALIDATE_SECONDS,
    },
  );
}

const getCachedProfile = createCachedLoader("profile", async () => {
  const profile = await prisma.profile.findUnique({ where: { id: 1 } });
  if (!profile) {
    throw new Error("Portfolio profile is missing.");
  }
  return profile;
});

const getCachedEducation = createCachedLoader("education", async () =>
  prisma.education.findMany({ orderBy: { id: "asc" } }),
);

const getCachedSkills = createCachedLoader("skills", async () =>
  prisma.skill.findMany({ orderBy: [{ order: "asc" }, { id: "asc" }] }),
);

const getCachedProjects = createCachedLoader("projects", async () =>
  prisma.project.findMany({ orderBy: [{ featured: "desc" }, { order: "asc" }, { id: "asc" }] }),
);

const getCachedWorkItems = createCachedLoader("work", async () =>
  prisma.workItem.findMany({ orderBy: [{ order: "asc" }, { id: "asc" }] }),
);

const getCachedCertificates = createCachedLoader("certificates", async () =>
  prisma.certificate.findMany({ orderBy: [{ order: "asc" }, { id: "asc" }] }),
);

const getCachedExperience = createCachedLoader("experience", async () =>
  prisma.experience.findMany({ orderBy: [{ order: "asc" }, { id: "asc" }] }),
);

export async function getProfile() {
  return getCachedProfile();
}

export async function getEducation() {
  return getCachedEducation();
}

export async function getSkills() {
  return getCachedSkills();
}

export async function getProjects() {
  return getCachedProjects();
}

export async function getWorkItems() {
  return getCachedWorkItems();
}

export async function getCertificates() {
  return getCachedCertificates();
}

export async function getExperience() {
  return getCachedExperience();
}

export async function getCmsSnapshot() {
  const [profile, education, skills, projects, work, certificates, experience] = await Promise.all([
    getProfile(),
    getEducation(),
    getSkills(),
    getProjects(),
    getWorkItems(),
    getCertificates(),
    getExperience(),
  ]);

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

export function getEmptyAdminSnapshot(): AdminSnapshot {
  const now = new Date();

  return {
    profile: {
      ...initialProfile,
      createdAt: now,
      updatedAt: now,
    },
    education: [],
    skills: [],
    projects: [],
    work: [],
    certificates: [],
    experience: [],
  };
}

export async function getAdminSnapshotSafe() {
  try {
    return await getAdminSnapshot();
  } catch {
    return getEmptyAdminSnapshot();
  }
}
