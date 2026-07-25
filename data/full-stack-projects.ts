export type FullStackProject = {
  title: string;
  category: "Full Stack";
  summary: string;
  techStack: string[];
  keyFeatures: string[];
  architectureHighlights: string[];
  status: "Completed";
  githubUrl?: string;
  liveDemoUrl?: string;
  order: number;
};

export const fullStackProjects = [
  {
    title: "Revenue Reconciliation Dashboard",
    category: "Full Stack",
    summary:
      "A full-stack financial reconciliation platform that processes Orders and Payments CSV files to automatically identify missing payments, missing orders, duplicate transactions, and amount mismatches. The system also generates AI-powered explanations to help users understand discrepancies and recommended actions.",
    techStack: ["Node.js", "Express.js", "MySQL", "HTML", "CSS", "JavaScript", "Groq AI API"],
    keyFeatures: [
      "CSV Upload",
      "Automatic Reconciliation",
      "Dashboard Analytics",
      "Duplicate Detection",
      "Missing Payment Detection",
      "Missing Order Detection",
      "Amount Mismatch Detection",
      "AI Explanations",
      "Search & Filtering",
      "REST APIs",
    ],
    architectureHighlights: [
      "Modular backend architecture",
      "RESTful APIs",
      "MySQL relational database",
      "AI integration",
      "Scalable reconciliation engine",
    ],
    status: "Completed",
    order: 1,
  },
  {
    title: "AI Resume Maker",
    category: "Full Stack",
    summary:
      "An AI-powered resume builder that allows users to securely create, manage, and organize professional resumes through a modern dashboard. The application features authentication, resume management, and an architecture designed for future AI-assisted resume analysis.",
    techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    keyFeatures: [
      "User Authentication",
      "Resume Dashboard",
      "Resume Management",
      "Protected Routes",
      "Session Management",
      "Responsive Design",
      "Database Integration",
    ],
    architectureHighlights: [
      "Next.js App Router",
      "Prisma ORM",
      "PostgreSQL",
      "Modular architecture",
      "Scalable folder structure",
    ],
    status: "Completed",
    order: 2,
  },
  {
    title: "User Submission System",
    category: "Full Stack",
    summary:
      "A full-stack document submission portal where users can upload documents and submit personal information while administrators manage, search, download, and organize submissions through a dedicated admin dashboard.",
    techStack: ["Next.js", "Express.js", "MySQL", "Multer", "Railway", "Vercel"],
    keyFeatures: [
      "File Upload",
      "Form Validation",
      "Admin Dashboard",
      "Search",
      "Download Attachments",
      "Delete Records",
      "REST APIs",
      "Database Integration",
    ],
    architectureHighlights: [
      "Next.js frontend",
      "Express backend",
      "MySQL database",
      "File upload system",
      "REST API architecture",
    ],
    status: "Completed",
    order: 3,
  },
  {
    title: "Priority Notes App",
    category: "Full Stack",
    summary:
      "A full-stack note management application that enables users to create, edit, organize, search, and prioritize notes using a responsive interface backed by REST APIs and a relational database.",
    techStack: ["React", "Express.js", "MySQL", "Axios"],
    keyFeatures: [
      "CRUD Operations",
      "Search Notes",
      "Priority Management",
      "REST APIs",
      "Responsive UI",
      "Database Integration",
    ],
    architectureHighlights: [
      "React frontend",
      "Express backend",
      "MySQL database",
      "RESTful API design",
    ],
    status: "Completed",
    order: 4,
  },
  {
    title: "Lead Management System",
    category: "Full Stack",
    summary:
      "A lightweight lead management application that captures customer enquiries, validates user input, stores lead information in a MySQL database, and demonstrates production-ready backend integration with cloud deployment.",
    techStack: ["Next.js", "MySQL", "Railway", "Vercel"],
    keyFeatures: [
      "Lead Capture Form",
      "Input Validation",
      "Status Management",
      "REST APIs",
      "Database Integration",
      "Production Deployment",
      "Error Logging",
    ],
    architectureHighlights: [
      "Next.js frontend",
      "MySQL backend",
      "Cloud deployment",
      "Clean modular architecture",
    ],
    status: "Completed",
    order: 5,
  },
] satisfies FullStackProject[];
