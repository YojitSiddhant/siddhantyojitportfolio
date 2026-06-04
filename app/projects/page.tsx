/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Siddhant Yojit",
  description: "Projects for Siddhant Yojit.",
};

type Project = {
  title: string;
  stack: Array<{
    name: string;
    src: string;
    iconClassName?: string;
  }>;
  result: string;
};

function ProjectsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M9 7V6a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3v1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M4 9.5A1.5 1.5 0 0 1 5.5 8h13A1.5 1.5 0 0 1 20 9.5v8A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5v-8Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M4 13h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function TechIcon({ src, name, className }: { src: string; name: string; className?: string }) {
  return (
    <img
      src={src}
      alt={`${name} logo`}
      className={`shrink-0 object-contain ${className ?? "h-5 w-5"}`}
      loading="lazy"
      referrerPolicy="no-referrer"
    />
  );
}

const projects: Project[] = [
  {
    title: "Smart Civic Grievance Redressal Web Application",
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
    ],
    result:
      "Built a full-stack civic platform with complaint registration, assignment, tracking, role-based access, image uploads, and status updates.",
  },
  {
    title: "Smart Note-Taking App",
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
    ],
    result:
      "Developed a responsive note-management app with JWT authentication, bcrypt password hashing, CRUD operations, search, and priority organization.",
  },
  {
    title: "Fake News Detection System",
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
    ],
    result:
      "Built a machine learning web app that classifies news as real or fake using TF-IDF and a Passive Aggressive Classifier, reaching 93.53% accuracy on a 6,335-record dataset.",
  },
  {
    title: "Fraudulent Seller Detection in Online Marketplaces",
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
    ],
    result:
      "Created a BCA web application with customer, seller, admin, complaint-filing, and fraud-detection workflows backed by MySQL.",
  },
];

export default function ProjectsPage() {
  return (
    <main className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(0,0,0,0.01),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(0,0,0,0.008),_transparent_28%),radial-gradient(circle_at_bottom,_rgba(0,0,0,0.004),_transparent_36%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[18rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.78)_0%,rgba(255,255,255,0.56)_70%,rgba(255,255,255,0.18)_100%)]" />

      <section className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 pb-10 pt-5 sm:px-6 sm:pb-12 sm:pt-6 lg:px-8 lg:pt-8 motion-reveal">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)] px-1 py-4 motion-reveal" style={{ animationDelay: "80ms" }}>
          <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.24em] text-[var(--foreground)]">
            <ProjectsIcon className="h-4 w-4 text-[var(--accent)]" />
            Projects
          </div>
          <div className="text-sm font-black text-[var(--foreground)]">Resume projects</div>
        </div>

        <section className="px-1 py-2 motion-reveal" style={{ animationDelay: "160ms" }}>
          <div className="grid gap-5">
            {projects.map((project, index) => (
              <article
                key={project.title}
                className="flex flex-col gap-2 border-b border-[var(--border)] pb-5 sm:flex-row sm:items-center sm:justify-between motion-reveal"
                style={{ animationDelay: `${220 + index * 120}ms` }}
              >
                <div className="min-w-0 flex-1">
                  <h2 className="mt-1 text-xl font-bold tracking-tight text-[var(--foreground)]">
                    {project.title}
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map(({ name, src, iconClassName }) => (
                      <span
                        key={name}
                        className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--foreground)]"
                      >
                        <TechIcon src={src} name={name} className={iconClassName} />
                        <span>{name}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-1 text-sm text-[var(--foreground)] sm:max-w-2xl sm:text-right">
                  <p>{project.result}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
