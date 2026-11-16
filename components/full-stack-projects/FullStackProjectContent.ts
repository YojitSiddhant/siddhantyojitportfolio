import { fullStackProjects } from "@/data/full-stack-projects";

type ProjectTech = string;

export type ProjectScreenshot = {
  src: string;
  alt: string;
};

export type FullStackProjectContent = {
  title: string;
  overview: string;
  problemStatement: string;
  technologies: ProjectTech[];
  keyFeatures: string[];
  myRole: string;
  challengesFaced: string[];
  keyLearnings: string[];
  architectureWorkflow?: string[];
  screenshots?: ProjectScreenshot[];
  githubUrl?: string;
  liveDemoUrl?: string;
  projectDuration?: string;
  futureImprovements?: string[];
};

const contentByTitle: Record<string, Omit<FullStackProjectContent, "title" | "technologies" | "githubUrl" | "liveDemoUrl">> = {
  "Revenue Reconciliation Dashboard": {
    overview:
      "A financial reconciliation platform that processes orders and payments CSV files to detect mismatches and explain discrepancies.",
    problemStatement:
      "Teams need a faster way to identify missing payments, missing orders, duplicate transactions, and amount mismatches without manually comparing spreadsheets.",
    keyFeatures: [
      "CSV upload",
      "Automatic reconciliation",
      "Dashboard analytics",
      "Duplicate detection",
      "Missing payment detection",
      "Missing order detection",
      "Amount mismatch detection",
      "AI explanations",
      "Search and filtering",
      "REST APIs",
    ],
    myRole:
      "I worked on the interface flow, helped structure the reconciliation workflow, and shaped the data presentation for clarity.",
    challengesFaced: [
      "Keeping reconciliation results easy to scan",
      "Balancing dense financial data with a clean interface",
      "Making AI explanations readable and useful",
    ],
    keyLearnings: [
      "How data-heavy workflows can still feel simple with the right UI structure",
      "How API-driven dashboards depend on clear state handling",
      "How to present discrepancies without overwhelming users",
    ],
    architectureWorkflow: [
      "Users upload Orders and Payments CSV files",
      "The backend compares records and identifies mismatches",
      "The dashboard highlights issues and AI explains the findings",
    ],
    futureImprovements: [
      "Add exportable reconciliation reports",
      "Include more advanced filtering and bulk actions",
      "Support saved reconciliation templates",
    ],
  },
  "User Submission System": {
    overview:
      "A document submission portal where users upload files and submit information while administrators manage the resulting records.",
    problemStatement:
      "Submission workflows become harder to manage when users and administrators share the same path without clear review and retrieval tools.",
    keyFeatures: [
      "File upload",
      "Form validation",
      "Admin dashboard",
      "Search",
      "Download attachments",
      "Delete records",
      "REST APIs",
      "Database integration",
    ],
    myRole:
      "I helped organize the submission flow, kept the UI responsive, and supported the admin-side workflow presentation.",
    challengesFaced: [
      "Handling file and form input together",
      "Keeping admin actions easy to understand",
      "Making upload feedback feel reliable",
    ],
    keyLearnings: [
      "How file workflows add complexity to simple forms",
      "How admin tools depend on clear records and search",
      "How validation improves submission confidence",
    ],
    architectureWorkflow: [
      "Users submit data and attachments through the frontend",
      "The backend stores records and files",
      "Admins review, search, download, and manage submissions",
    ],
    futureImprovements: [
      "Add better bulk management actions",
      "Include richer upload progress states",
      "Support audit history for submissions",
    ],
  },
  "Priority Notes App": {
    overview:
      "A note management application that lets users create, edit, search, and prioritize notes with a responsive interface.",
    problemStatement:
      "Many note tools become cluttered when they do not support search, prioritization, and a clear CRUD workflow.",
    keyFeatures: [
      "CRUD operations",
      "Search notes",
      "Priority management",
      "REST APIs",
      "Responsive UI",
      "Database integration",
    ],
    myRole:
      "I helped refine the note workflow and supported the user experience across create, update, and organize actions.",
    challengesFaced: [
      "Keeping note actions predictable",
      "Making search and priority states easy to read",
      "Maintaining responsiveness across screen sizes",
    ],
    keyLearnings: [
      "How CRUD patterns shape interface behavior",
      "How prioritization improves note usefulness",
      "How a clean layout keeps task-focused tools approachable",
    ],
    architectureWorkflow: [
      "Users interact with the React frontend",
      "The Express backend handles CRUD operations",
      "Notes are stored and retrieved from the database",
    ],
    futureImprovements: [
      "Add tags and richer filtering",
      "Support reminders and note archiving",
      "Include collaborative note sharing",
    ],
  },
  "Lead Management System": {
    overview:
      "A lightweight lead capture tool that validates enquiries, stores them safely, and supports production-style deployment.",
    problemStatement:
      "Small lead systems still need clean capture flows, validation, and status management so enquiries do not get lost.",
    keyFeatures: [
      "Lead capture form",
      "Input validation",
      "Status management",
      "REST APIs",
      "Database integration",
      "Production deployment",
      "Error logging",
    ],
    myRole:
      "I helped shape the lead flow and kept the interface clear for capture, review, and follow-up actions.",
    challengesFaced: [
      "Keeping validation helpful without slowing entry",
      "Making lead status changes easy to understand",
      "Ensuring the deployed experience stayed stable",
    ],
    keyLearnings: [
      "How a small form can still benefit from strong structure",
      "How deployment affects product reliability",
      "How status tracking supports lead workflows",
    ],
    architectureWorkflow: [
      "Users submit enquiries through the frontend",
      "The backend validates and stores lead data",
      "The deployed app keeps the workflow production-ready",
    ],
    futureImprovements: [
      "Add lead analytics and reporting",
      "Include assignment notifications",
      "Support CSV export for lead records",
    ],
  },
  "Collector Hub": {
    overview:
      "A collector platform that helps users browse products, participate in the community, and organize personal collections.",
    problemStatement:
      "Collectors often need one place to discover items, manage saved products, and interact with community content.",
    keyFeatures: [
      "Marketplace",
      "Community feed",
      "My collection",
      "Advanced search",
      "Filtering",
      "Responsive design",
      "Modern React architecture",
    ],
    myRole:
      "I helped build the user-facing experience and supported the product discovery and collection management flow.",
    challengesFaced: [
      "Balancing multiple sections in one experience",
      "Keeping search and filtering intuitive",
      "Making the interface feel cohesive across modules",
    ],
    keyLearnings: [
      "How to structure multi-module product experiences",
      "How state management supports filtering and saved items",
      "How modern React patterns improve maintainability",
    ],
    architectureWorkflow: [
      "Users navigate the marketplace and community sections",
      "React Query and routing support data flow and navigation",
      "Collection state keeps saved items organized",
    ],
    futureImprovements: [
      "Add richer collection analytics",
      "Include comparison tools for products",
      "Support more personalized recommendations",
    ],
  },
  "Gharpayy Local Auto Sync 100X": {
    overview:
      "A local-first operations system combining a Next.js frontend, FastAPI backend, MySQL persistence, and review-oriented OCR for WhatsApp screenshots.",
    problemStatement:
      "Operations teams need a controlled workflow for turning local screenshots and operational inputs into reviewable structured records.",
    keyFeatures: [
      "Local-first operations workflow",
      "WhatsApp screenshot upload",
      "English OCR processing",
      "Review-oriented extraction",
      "MySQL persistence",
      "Automated testing",
    ],
    myRole:
      "I contributed to the full-stack product workflow across the Next.js interface, backend integration, persistence, and OCR-oriented feature structure.",
    challengesFaced: [
      "Keeping OCR output reviewable instead of silently accepting uncertain data",
      "Coordinating a separate frontend and FastAPI backend",
      "Designing a local-first workflow around operational data",
    ],
    keyLearnings: [
      "How OCR features benefit from explicit review boundaries",
      "How frontend and backend contracts shape operational tools",
      "How persistence and migrations support reliable workflows",
    ],
    architectureWorkflow: [
      "Users work through the Next.js operations interface",
      "The FastAPI backend handles processing and application logic",
      "OCR output is persisted in MySQL for review and follow-up",
    ],
  },
  "Gharpayy AI Listing Ingestion": {
    overview: "An AI-assisted listing ingestion project for bringing listing data into a structured product workflow.",
    problemStatement: "Listing workflows need a consistent way to collect, structure, and prepare incoming data for downstream use.",
    keyFeatures: ["Listing ingestion", "Structured data processing", "AI-assisted workflow", "API integration"],
    myRole: "I contributed to the project structure and the workflow for turning incoming listing data into usable application records.",
    challengesFaced: ["Maintaining consistent listing fields", "Handling ingestion workflow states", "Keeping AI-assisted processing useful and reviewable"],
    keyLearnings: ["How ingestion pipelines support product workflows", "How structured records improve downstream operations", "How AI features need clear boundaries and validation"],
    architectureWorkflow: ["Listing data enters the ingestion workflow", "The application structures and processes incoming records", "Prepared listing data becomes available to downstream product features"],
  },
  A: {
    overview: "A full-stack project repository from the TECG/Gharpayy product work.",
    problemStatement: "The project provides an application workflow for a product-focused engineering use case.",
    keyFeatures: ["Application workflow", "Frontend and backend integration"],
    myRole: "I contributed to the implementation and refinement of the project workflow.",
    challengesFaced: ["Keeping the application flow clear", "Connecting the interface with backend behavior"],
    keyLearnings: ["How product requirements shape full-stack implementation", "How clear boundaries improve maintainability"],
    architectureWorkflow: ["Users interact with the application interface", "Application logic processes the workflow", "The project exposes the resulting product experience"],
  },
};

export const fullStackProjectContent: FullStackProjectContent[] = fullStackProjects.map((project) => ({
  title: project.title,
  overview: contentByTitle[project.title]?.overview ?? project.summary,
  problemStatement:
    contentByTitle[project.title]?.problemStatement ??
    "This project was designed to solve a practical workflow problem with a production-ready interface.",
  technologies: project.techStack,
  keyFeatures: contentByTitle[project.title]?.keyFeatures ?? [],
  myRole:
    contentByTitle[project.title]?.myRole ??
    "I contributed to the design, implementation, and refinement of the project experience.",
  challengesFaced: contentByTitle[project.title]?.challengesFaced ?? [],
  keyLearnings: contentByTitle[project.title]?.keyLearnings ?? [],
  architectureWorkflow: contentByTitle[project.title]?.architectureWorkflow,
  screenshots: [],
  githubUrl: project.githubUrl || undefined,
  liveDemoUrl: project.liveDemoUrl || undefined,
  futureImprovements: contentByTitle[project.title]?.futureImprovements,
}));
