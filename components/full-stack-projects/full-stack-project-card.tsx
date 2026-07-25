import Image from "next/image";
import type { FullStackProject } from "@/data/full-stack-projects";

type FullStackProjectCardProps = {
  project: FullStackProject;
  index: number;
};

type TechBadgeAsset =
  | {
      kind: "image";
      src: string;
      className?: string;
    }
  | {
      kind: "icon";
      node: React.ReactNode;
    };

const techBadgeAssets: Record<string, TechBadgeAsset> = {
  "Node.js": {
    kind: "image",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  },
  "Express.js": {
    kind: "image",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
  },
  MySQL: {
    kind: "image",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
  },
  HTML: {
    kind: "image",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  },
  CSS: {
    kind: "image",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
  },
  JavaScript: {
    kind: "image",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  },
  "Groq AI API": {
    kind: "image",
    src: "/favicon.png",
    className: "h-5 w-5 rounded-full",
  },
  "Next.js": {
    kind: "image",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
  },
  TypeScript: {
    kind: "image",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  },
  Prisma: {
    kind: "image",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg",
  },
  PostgreSQL: {
    kind: "image",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
  },
  React: {
    kind: "image",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  },
  Axios: {
    kind: "image",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/axios/axios-plain.svg",
  },
  Railway: {
    kind: "image",
    src: "https://devicons.railway.com/railway?variant=dark",
  },
  Vercel: {
    kind: "image",
    src: "https://assets.vercel.com/image/upload/front/favicon/vercel/57x57.png",
  },
  Multer: {
    kind: "icon",
    node: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 shrink-0 text-foreground" fill="none">
        <path d="M7 4.5h6l3.5 3.5V19A1.5 1.5 0 0 1 15 20.5H8A1.5 1.5 0 0 1 6.5 19V6A1.5 1.5 0 0 1 8 4.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M13 4.5V8h3.5" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M12 16V10.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M9.8 12.7 12 10.5l2.2 2.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
};

function TechBadge({ name }: { name: string }) {
  const asset = techBadgeAssets[name];

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-2 text-xs font-black uppercase tracking-widest text-foreground">
      {asset ? (
        asset.kind === "image" ? (
          <Image
            src={asset.src}
            alt={`${name} logo`}
            width={20}
            height={20}
            unoptimized
            className={`shrink-0 object-contain ${asset.className ?? "h-5 w-5"}`}
          />
        ) : (
          asset.node
        )
      ) : (
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent-soft text-[10px] font-black text-accent-strong">
          {name.charAt(0)}
        </span>
      )}
      <span>{name}</span>
    </span>
  );
}

export function FullStackProjectCard({ project, index }: FullStackProjectCardProps) {
  return (
    <article
      className="grid gap-4 border-b border-border pb-5 motion-reveal lg:grid-cols-2 lg:items-start lg:gap-8"
      style={{ animationDelay: `${220 + index * 120}ms` }}
    >
      <div className="min-w-0 flex-1">
        <h2 className="mt-1 text-xl font-bold tracking-normal text-foreground">{project.title}</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.techStack.map((technology) => (
            <TechBadge key={`${project.title}-${technology}`} name={technology} />
          ))}
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-1 text-sm text-foreground lg:justify-self-end lg:text-right">
        <p>{project.summary}</p>
        {project.liveDemoUrl ? (
          <div className="mt-3 flex flex-wrap gap-2 sm:justify-end">
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border px-3 py-1 text-xs font-black uppercase tracking-widest text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              Live
            </a>
          </div>
        ) : null}
      </div>
    </article>
  );
}
