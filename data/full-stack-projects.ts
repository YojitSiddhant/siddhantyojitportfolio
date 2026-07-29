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

export const fullStackProjects: FullStackProject[] = [
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
    order: 2,
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
    order: 3,
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
    order: 4,
  },
  {
    title: "Collector Hub",
    category: "Full Stack",
    summary:
      "A full-stack collector platform that enables users to discover collectible products, engage with the collector community, and organize personal collections in one unified experience. The application features a Marketplace, Community Feed, and My Collection module with advanced search, filtering, responsive design, and modern React architecture.",
    techStack: ["React", "TypeScript", "React Router", "Axios", "React Query", "Tailwind CSS", "JSON Server"],
    keyFeatures: [
      "Marketplace",
      "Community Feed",
      "My Collection",
      "Advanced Search",
      "Filtering",
      "Responsive Design",
      "Modern React Architecture",
    ],
    architectureHighlights: [
      "React frontend",
      "TypeScript-based UI",
      "React Router navigation",
      "React Query data fetching",
      "JSON Server backend",
    ],
    status: "Completed",
    order: 5,
  },
];
