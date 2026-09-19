export type SkillItem = {
  name: string;
  href?: string;
  icon?: string;
  badge?: string;
  textOnly?: boolean;
};

export type SkillSection = {
  title: string;
  items: SkillItem[];
};

export const skillSections: SkillSection[] = [
  {
    title: "Languages",
    items: [
      {
        name: "HTML",
        href: "https://developer.mozilla.org/en-US/docs/Web/HTML",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
      },
      {
        name: "CSS",
        href: "https://developer.mozilla.org/en-US/docs/Web/CSS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
      },
      {
        name: "JavaScript",
        href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
      },
      {
        name: "TypeScript",
        href: "https://www.typescriptlang.org/",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
      },
      {
        name: "SQL",
        icon: "https://api.iconify.design/vscode-icons/file-type-sql.svg",
        href: "https://www.postgresql.org/docs/current/sql-syntax.html",
      },
    ],
  },
  {
    title: "Frontend",
    items: [
      {
        name: "React.js",
        href: "https://react.dev/",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
      },
      {
        name: "Next.js",
        href: "https://nextjs.org/",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
      },
      {
        name: "Bootstrap",
        href: "https://getbootstrap.com/",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg",
      },
      {
        name: "Tailwind CSS",
        href: "https://tailwindcss.com/",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
      },
    ],
  },
  {
    title: "Backend",
    items: [
      {
        name: "Node.js",
        href: "https://nodejs.org/",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
      },
      {
        name: "Express.js",
        href: "https://expressjs.com/",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
      },
    ],
  },
  {
    title: "Databases",
    items: [
      {
        name: "PostgreSQL",
        href: "https://www.postgresql.org/",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
      },
      {
        name: "MySQL",
        href: "https://www.mysql.com/",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
      },
      {
        name: "Prisma ORM",
        href: "https://www.prisma.io/",
        icon: "https://cdn.simpleicons.org/prisma/2D3748",
      },
      {
        name: "JSON Server",
        icon: "https://api.iconify.design/vscode-icons/file-type-json.svg",
        href: "https://github.com/typicode/json-server",
      },
    ],
  },
  {
    title: "Tools",
    items: [
      {
        name: "Git",
        href: "https://git-scm.com/",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
      },
      {
        name: "GitHub",
        href: "https://github.com/",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
      },
      {
        name: "VS Code",
        href: "https://code.visualstudio.com/",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
      },
      {
        name: "Postman",
        href: "https://www.postman.com/",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg",
      },
      {
        name: "Vite",
        href: "https://vite.dev/",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",
      },
      {
        name: "npm",
        href: "https://www.npmjs.com/",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original-wordmark.svg",
      },
      {
        name: "GitHub Copilot",
        href: "https://github.com/features/copilot",
        icon: "https://api.iconify.design/simple-icons/githubcopilot.svg?color=%238534f3",
      },
      {
        name: "Cursor",
        href: "https://cursor.com/",
        icon: "https://api.iconify.design/simple-icons/cursor.svg?color=%237c3aed",
      },
      {
        name: "ChatGPT",
        href: "https://chatgpt.com/",
        icon: "https://api.iconify.design/simple-icons/openai.svg?color=%2310a37f",
      },
    ],
  },
  {
    title: "Deployment",
    items: [
      {
        name: "Vercel",
        href: "https://vercel.com/",
        icon: "https://cdn.simpleicons.org/vercel/000000",
      },
      {
        name: "Railway",
        href: "https://railway.app/",
        icon: "https://api.iconify.design/simple-icons/railway.svg?color=%237c3aed",
      },
    ],
  },
  {
    title: "Core Concepts",
    items: [
      {
        name: "Responsive Web Development",
        icon: "https://api.iconify.design/fa6-solid/laptop-code.svg?color=%232563eb",
      },
      {
        name: "REST APIs",
        icon: "https://api.iconify.design/fa6-solid/code.svg?color=%23e11d48",
      },
      {
        name: "CRUD Operations",
        icon: "https://api.iconify.design/fa6-solid/database.svg?color=%23d97706",
      },
      {
        name: "API Integration",
        icon: "https://api.iconify.design/fa6-solid/plug.svg?color=%23059669",
      },
      {
        name: "JWT Authentication",
        icon: "https://api.iconify.design/fa6-solid/user-shield.svg?color=%237c3aed",
      },
      {
        name: "Authentication & Authorization",
        icon: "https://api.iconify.design/fa6-solid/shield-halved.svg?color=%230f766e",
      },
    ],
  },
];
