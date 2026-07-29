import { projects } from "@/data/projects";

type ProjectTech = {
  name: string;
  src: string;
  iconClassName?: string;
};

export type ProjectScreenshot = {
  src: string;
  alt: string;
};

export type AcademicProjectContent = {
  title: string;
  badge: string;
  overview: string;
  problemStatement: string;
  keyFeatures: string[];
  technologies: ProjectTech[];
  myRole: string;
  keyLearnings: string;
  challengesFaced: string[];
  architectureWorkflow?: string;
  screenshots?: ProjectScreenshot[];
  githubUrl?: string;
  liveUrl?: string;
  projectDuration?: string;
};

const contentByTitle: Record<string, Omit<AcademicProjectContent, "title" | "badge" | "technologies" | "githubUrl" | "liveUrl">> = {
  "Smart Civic Grievance Redressal Web Application": {
    overview:
      "A civic workflow platform that helps users submit complaints, lets administrators assign them, and keeps progress visible end to end.",
    problemStatement:
      "Civic complaints are often difficult to track because the reporting, assignment, and resolution steps are fragmented across teams.",
    keyFeatures: [
      "Complaint submission",
      "Role-based access",
      "Image uploads",
      "Case tracking",
      "Status updates",
    ],
    myRole:
      "I worked on the interface structure, refined user flows, and helped validate the complaint lifecycle across user roles.",
    keyLearnings:
      "I learned how clear workflow boundaries and visible status changes make public-service applications more dependable.",
    challengesFaced: [
      "Keeping complaint states clear across multiple roles",
      "Maintaining a simple flow for first-time users",
      "Balancing readability with practical admin actions",
    ],
    architectureWorkflow:
      "Users submit complaints through the frontend, administrators assign and update cases, and the system keeps each complaint moving through a clear status workflow.",
  },
  "Smart Note-Taking App": {
    overview:
      "A responsive note management app with secure login, note creation, editing, search, and priority-based organization.",
    problemStatement:
      "Basic note apps become less useful when they do not support authentication, reliable CRUD actions, or quick retrieval of important notes.",
    keyFeatures: [
      "JWT authentication",
      "Password hashing",
      "CRUD operations",
      "Search",
      "Priority management",
    ],
    myRole:
      "I helped build the interface flow, supported the note management experience, and ensured the app stayed responsive and easy to use.",
    keyLearnings:
      "I learned how authentication and state-driven CRUD flows influence the reliability of a product.",
    challengesFaced: [
      "Keeping authentication and form validation consistent",
      "Making note actions feel quick and predictable",
      "Presenting search and priority states clearly",
    ],
    architectureWorkflow:
      "Authenticated users create and manage notes through a CRUD workflow, while search and priority controls help them organize content quickly.",
  },
  "Fake News Detection System": {
    overview:
      "A machine learning project that classifies news text as real or fake and shows the result through a simple user interface.",
    problemStatement:
      "Users need a quick way to evaluate suspicious news text before trusting or sharing it.",
    keyFeatures: [
      "TF-IDF vectorization",
      "Passive Aggressive Classifier",
      "Prediction output",
      "Accuracy reporting",
      "Text classification workflow",
    ],
    myRole:
      "I helped shape the model-to-UI flow so the classification result remained easy to understand.",
    keyLearnings:
      "I learned how preprocessing, vectorization, and classifier choice affect the quality of a machine learning solution.",
    challengesFaced: [
      "Presenting model output in a simple way",
      "Keeping the prediction flow easy to follow",
      "Balancing a technical project with a clear interface",
    ],
    architectureWorkflow:
      "News text is processed, transformed into model-ready vectors, classified, and then shown back to the user as a prediction result.",
  },
  "Fraudulent Seller Detection in Online Marketplaces": {
    overview:
      "A marketplace safety application that supports complaints and fraud detection across customer, seller, and admin workflows.",
    problemStatement:
      "Online marketplace fraud is difficult to manage when complaint handling and seller review are not structured in one workflow.",
    keyFeatures: [
      "Customer, seller, and admin roles",
      "Complaint filing",
      "Fraud detection workflow",
      "Case tracking",
      "Role-based UI flow",
    ],
    myRole:
      "I built the academic web application structure and worked on the role-based experiences that support the marketplace workflow.",
    keyLearnings:
      "I learned how role separation and structured records help a system stay understandable as it scales.",
    challengesFaced: [
      "Organizing different user journeys cleanly",
      "Keeping the complaint flow understandable",
      "Making the fraud-detection path readable for all roles",
    ],
    architectureWorkflow:
      "Customers submit reports, sellers are reviewed through the workflow, and administrators manage fraud-related actions from a shared system.",
  },
};

export const academicProjectContent: AcademicProjectContent[] = projects.map((project) => ({
  title: project.title,
  badge: project.badge ?? "Academic Project",
  overview: contentByTitle[project.title]?.overview ?? project.description,
  problemStatement:
    contentByTitle[project.title]?.problemStatement ??
    "This project was created to solve a practical workflow problem and improve the user experience.",
  keyFeatures: contentByTitle[project.title]?.keyFeatures ?? [],
  technologies: project.stack as ProjectTech[],
  myRole:
    contentByTitle[project.title]?.myRole ??
    "I contributed to the project design, implementation, and refinement of the user experience.",
  keyLearnings:
    contentByTitle[project.title]?.keyLearnings ??
    "I strengthened my understanding of how structured interfaces support practical software projects.",
  challengesFaced: contentByTitle[project.title]?.challengesFaced ?? [],
  architectureWorkflow: contentByTitle[project.title]?.architectureWorkflow,
  screenshots: [],
  githubUrl: project.github || undefined,
  liveUrl: project.liveLink || undefined,
}));

export function getAcademicProjectContent(title: string) {
  return academicProjectContent.find((project) => project.title === title);
}
