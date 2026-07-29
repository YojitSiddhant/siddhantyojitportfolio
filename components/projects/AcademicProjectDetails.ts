import { projects } from "@/data/projects";

type ProjectTech = {
  name: string;
  src: string;
  iconClassName?: string;
};

export type ProjectImage = {
  src: string;
  alt: string;
};

export type ProjectAttachment = {
  label: string;
  href: string;
};

export type AcademicProjectDetail = {
  title: string;
  badge: string;
  overview: string;
  problemStatement: string;
  keyFeatures: string[];
  technologies: ProjectTech[];
  myRole: string;
  keyLearnings: string;
  githubUrl?: string;
  liveUrl?: string;
  images?: ProjectImage[];
  attachments?: ProjectAttachment[];
};

const detailMap: Record<string, Omit<AcademicProjectDetail, "title" | "badge" | "technologies" | "githubUrl" | "liveUrl">> = {
  "Smart Civic Grievance Redressal Web Application": {
    overview:
      "A civic service platform that streamlines complaint submission, assignment, and progress tracking for users and administrators.",
    problemStatement:
      "Civic complaints are often difficult to register and monitor across departments, which can slow down resolution and reduce visibility for citizens.",
    keyFeatures: [
      "Complaint registration flow",
      "Role-based access",
      "Image uploads",
      "Status tracking",
      "Admin assignment workflow",
    ],
    myRole:
      "I designed the user flows, helped shape the interface structure, and validated the complaint lifecycle across different user roles.",
    keyLearnings:
      "I learned how role-based experiences, clear status updates, and structured workflows improve trust in public-service applications.",
  },
  "Smart Note-Taking App": {
    overview:
      "A responsive note management app with secure login, CRUD actions, search, and priority organization.",
    problemStatement:
      "Simple note-taking tools become harder to use when they lack authentication, search, and a way to prioritize important notes.",
    keyFeatures: [
      "JWT authentication",
      "Password hashing",
      "Note CRUD operations",
      "Search",
      "Priority organization",
    ],
    myRole:
      "I built and refined the interface interactions, supported the note workflow, and helped keep the app responsive and easy to use.",
    keyLearnings:
      "I learned how authentication, state updates, and CRUD flows shape a dependable product experience.",
  },
  "Fake News Detection System": {
    overview:
      "A machine learning application that classifies news content as real or fake and presents predictions through a simple interface.",
    problemStatement:
      "Users need a quick way to evaluate suspicious news text before sharing it or treating it as trustworthy.",
    keyFeatures: [
      "TF-IDF vectorization",
      "Passive Aggressive Classifier",
      "Prediction output",
      "Accuracy reporting",
      "Text classification workflow",
    ],
    myRole:
      "I helped present the model-driven flow clearly in the UI and worked on making the prediction experience easy to follow.",
    keyLearnings:
      "I learned how preprocessing and model selection influence classification quality in a practical machine learning project.",
  },
  "Fraudulent Seller Detection in Online Marketplaces": {
    overview:
      "A marketplace safety application that supports complaint filing and fraud-detection workflows for different user roles.",
    problemStatement:
      "Online marketplaces need structured tools to flag suspicious sellers and organize complaints in a transparent way.",
    keyFeatures: [
      "Customer, seller, and admin roles",
      "Complaint filing",
      "Fraud detection workflow",
      "Workflow tracking",
      "Role-based UI flow",
    ],
    myRole:
      "I built the academic web app structure and worked on the role-based user flows that support the marketplace workflow.",
    keyLearnings:
      "I learned how database-backed workflows and role separation help create clearer application behavior for different users.",
  },
};

export const academicProjectDetails: AcademicProjectDetail[] = projects.map((project) => ({
  title: project.title,
  badge: project.badge ?? "Academic Project",
  overview: detailMap[project.title]?.overview ?? project.description,
  problemStatement:
    detailMap[project.title]?.problemStatement ??
    "This project was created to solve a real workflow challenge and make the user experience clearer and more reliable.",
  keyFeatures: detailMap[project.title]?.keyFeatures ?? [],
  technologies: project.stack as ProjectTech[],
  myRole:
    detailMap[project.title]?.myRole ??
    "I contributed to the project design, implementation, and refinement of the user experience.",
  keyLearnings:
    detailMap[project.title]?.keyLearnings ??
    "I strengthened my understanding of how thoughtful interface decisions support practical software projects.",
  githubUrl: project.github || undefined,
  liveUrl: project.liveLink || undefined,
}));

export function getAcademicProjectDetail(title: string) {
  return academicProjectDetails.find((project) => project.title === title);
}
