export type CmsTextItem = {
  icon?: string;
  label: string;
  value: string;
};

export type CmsCardItem = {
  title: string;
  description: string;
  icon: string;
};

export type CmsSkillSeed = {
  name: string;
  category: string;
  icon: string;
  href: string;
  order: number;
};

export type CmsStackItem = {
  name: string;
  src: string;
  iconClassName?: string;
};

export type CmsLinkItem = {
  label: string;
  url: string;
};

export const initialProfile = {
  id: 1,
  heroTitle: "Hi, I'm Siddhant Yojit.",
  introText:
    "I'm a frontend developer with internship experience in building responsive, client-facing interfaces and validating them with a strong testing mindset. I enjoy turning requirements into UI that feels simple, practical, and polished.",
  location: "Bangalore, India",
  coreFocus: "Frontend, UI, testing",
  snapshotTitle: "Frontend Developer",
  whatICareAbout: "Clear UI, thoughtful testing, and small details that improve the overall product experience.",
  currentRole: "UI Developer Intern at TechVanta Labs Pvt. Ltd.",
  openToOpportunitiesBadge: "Open to opportunities",
  quickNotes: [
    {
      icon: "shield",
      label: "Testing habit",
      value:
        "I keep an eye on edge cases, responsive behavior, and how screens behave when content changes.",
    },
    {
      icon: "code",
      label: "Current stack",
      value: "React, Next.js, HTML, CSS, JavaScript, Angular, and a growing set of full-stack tools.",
    },
    {
      icon: "briefcase",
      label: "Project style",
      value: "I like business and NGO websites, clean dashboards, and practical interfaces that stay maintainable.",
    },
  ] satisfies CmsTextItem[],
  headerNotes: [
    {
      icon: "briefcase",
      label: "Current role",
      value: "UI Developer Intern at TechVanta Labs Pvt. Ltd.",
    },
    {
      icon: "code",
      label: "Experience style",
      value: "Client-facing frontend work, component-based UI, and testing-focused delivery.",
    },
    {
      icon: "sparkle",
      label: "Working goal",
      value: "To build interfaces that are clear, dependable, and easy to grow over time.",
    },
  ] satisfies CmsTextItem[],
  valueCards: [
    {
      icon: "layers",
      title: "Practical UI work",
      description:
        "I like building interfaces that feel clear, responsive, and easy to use, with enough structure to stay maintainable as they grow.",
    },
    {
      icon: "shield",
      title: "Testing as part of the craft",
      description:
        "UI testing, test-case design, defect reporting, and cross-flow validation are part of how I make sure the final experience is dependable.",
    },
    {
      icon: "code",
      title: "Learning across the stack",
      description:
        "My background also includes project exposure to Flutter Web, Spring Boot, MongoDB, Node.js, SQLite, Java, JDBC, and MySQL.",
    },
  ] satisfies CmsCardItem[],
  workingStyle: [
    {
      icon: "sparkle",
      title: "I turn business requirements into clean frontend screens and reusable interface sections.",
    },
    {
      icon: "check",
      title: "I pay attention to navigation clarity, responsive behavior, and handoff quality.",
    },
    {
      icon: "layers",
      title: "I prefer small, well-structured UI decisions that make a product feel polished.",
    },
  ] satisfies Array<{ icon: string; title: string }>,
};

export const initialEducation = [
  {
    institute: "PES University",
    degree: "MCA",
    duration: "2024 - 2026",
    description: "CGPA: 5.99/10",
    logo: "/company-logos/pes-logo.webp",
  },
  {
    institute: "New Horizon College",
    degree: "BCA",
    duration: "2020 - 2023",
    description: "CGPA: 7.59/10",
    logo: "/company-logos/nhcm-logo.jpeg",
  },
  {
    institute: "St Francis PU College",
    degree: "Class XII",
    duration: "2019 - 2020",
    description: "61.33%",
    logo: "/company-logos/st-francis-pu-college-logo.jpeg",
  },
  {
    institute: "Narayana e-Techno School",
    degree: "Class X",
    duration: "2016 - 2017",
    description: "CGPA: 10/10",
    logo: "/company-logos/narayana-e-techno-school.jpeg",
  },
];

export const initialSkills: CmsSkillSeed[] = [
  {
    name: "HTML",
    href: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    category: "Markup",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
    order: 1,
  },
  {
    name: "CSS",
    href: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    category: "Styling",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
    order: 2,
  },
  {
    name: "JAVASCRIPT",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    category: "Language",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    order: 3,
  },
  {
    name: "ANGULAR",
    href: "https://angular.dev/",
    category: "Framework",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg",
    order: 4,
  },
  {
    name: "REACT",
    href: "https://react.dev/",
    category: "Library",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    order: 5,
  },
  {
    name: "FLUTTER",
    href: "https://docs.flutter.dev/",
    category: "UI Toolkit",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg",
    order: 6,
  },
];

export const initialProjects = [
  {
    title: "Smart Civic Grievance Redressal Web Application",
    description:
      "Built a full-stack civic platform with complaint registration, assignment, tracking, role-based access, image uploads, and status updates.",
    stack: [
      {
        name: "Flutter Web",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg",
      },
      {
        name: "Spring Boot",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg",
      },
      {
        name: "MongoDB",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
      },
    ] satisfies CmsStackItem[],
    github: "",
    liveLink: "",
    image: "",
    featured: true,
    order: 1,
  },
  {
    title: "Smart Note-Taking App",
    description:
      "Developed a responsive note-management app with JWT authentication, bcrypt password hashing, CRUD operations, search, and priority organization.",
    stack: [
      {
        name: "HTML",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
      },
      {
        name: "CSS",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
      },
      {
        name: "JavaScript",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
      },
      {
        name: "Node.js",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
      },
      {
        name: "SQLite",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg",
      },
    ] satisfies CmsStackItem[],
    github: "",
    liveLink: "",
    image: "",
    featured: false,
    order: 2,
  },
  {
    title: "Fake News Detection System",
    description:
      "Built a machine learning web app that classifies news as real or fake using TF-IDF and a Passive Aggressive Classifier, reaching 93.53% accuracy on a 6,335-record dataset.",
    stack: [
      {
        name: "Python",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
      },
      {
        name: "Flask",
        src: "/project-icons/flask-logo.svg",
        iconClassName: "h-5 w-12",
      },
      {
        name: "scikit-learn",
        src: "https://raw.githubusercontent.com/scikit-learn/scikit-learn/main/doc/logos/scikit-learn-logo.png",
      },
      {
        name: "Pandas",
        src: "https://pandas.pydata.org/static/img/pandas.svg",
        iconClassName: "h-5 w-14",
      },
      {
        name: "NumPy",
        src: "https://numpy.org/images/logo.svg",
      },
    ] satisfies CmsStackItem[],
    github: "",
    liveLink: "",
    image: "",
    featured: false,
    order: 3,
  },
  {
    title: "Fraudulent Seller Detection in Online Marketplaces",
    description:
      "Created a BCA web application with customer, seller, admin, complaint-filing, and fraud-detection workflows backed by MySQL.",
    stack: [
      {
        name: "JSP",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
      },
      {
        name: "Java",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
      },
      {
        name: "JDBC",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
      },
      {
        name: "MySQL",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
      },
      {
        name: "Apache Tomcat",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tomcat/tomcat-original.svg",
      },
    ] satisfies CmsStackItem[],
    github: "",
    liveLink: "",
    image: "",
    featured: false,
    order: 4,
  },
];

export const initialWorkItems = [
  {
    title: "Portfolio section system",
    summary:
      "Restructured the site into section-driven content that can be updated from the admin dashboard without editing code.",
    screenshots: ["/siddhant-watermark-transparent.png"],
    links: [{ label: "Home", url: "/" }] satisfies CmsLinkItem[],
    order: 1,
  },
];

export const initialCertificates = [
  {
    title: "ChatGPT for Excel",
    issuer: "Great Learning Academy",
    issueDate: "Mar 2024",
    image: "/certificates/chatgpt-for-excel.png",
    verificationLink: "",
    order: 1,
  },
  {
    title: "Data Visualization With Power BI",
    issuer: "Great Learning Academy",
    issueDate: "Mar 2024",
    image: "/certificates/data-visualization-with-power-bi.png",
    verificationLink: "",
    order: 2,
  },
  {
    title: "Google Bard for Microsoft Powerpoint",
    issuer: "Great Learning Academy",
    issueDate: "Mar 2024",
    image: "/certificates/google-bard-for-microsoft-powerpoint.png",
    verificationLink: "",
    order: 3,
  },
  {
    title: "Html In Hindi",
    issuer: "Great Learning Academy",
    issueDate: "Mar 2024",
    image: "/certificates/html-in-hindi.png",
    verificationLink: "",
    order: 4,
  },
];

export const initialExperience = [
  {
    company: "TechVanta Labs Pvt. Ltd.",
    role: "UI Developer Intern",
    duration: "Jan 2026 - Present",
    description:
      "Develop responsive, client-facing websites and UI flows from business requirements.\nImprove page structure and navigation clarity for better usability.\nWork with manual testing, UI testing, test-case design, and defect reporting.",
    technologies: ["React", "Next.js", "Testing", "UI Development"],
    logo: "/company-logos/techvanta-logo-v3.jpeg",
    order: 1,
  },
];
