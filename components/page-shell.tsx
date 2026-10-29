"use client";

import type { CSSProperties, ReactNode } from "react";
import { usePathname } from "next/navigation";

type PageShellProps = {
  children: ReactNode;
  maxWidthClassName?: string;
  sectionClassName?: string;
  animated?: boolean;
};

export function PageShell({
  children,
  maxWidthClassName = "",
  sectionClassName = "",
  animated = true,
}: PageShellProps) {
  const pathname = usePathname();
  const palettes: Record<string, [string, string, string]> = {
    "/": ["#2563eb", "#1d4ed8", "rgba(37,99,235,0.1)"],
    "/full-stack-projects": ["#0f766e", "#115e59", "rgba(13,148,136,0.1)"],
    "/projects": ["#7c3aed", "#6d28d9", "rgba(124,58,237,0.1)"],
    "/my-work": ["#c2410c", "#9a3412", "rgba(234,88,12,0.1)"],
    "/experience": ["#be123c", "#9f1239", "rgba(225,29,72,0.1)"],
    "/education": ["#0369a1", "#075985", "rgba(14,165,233,0.1)"],
    "/skills": ["#a16207", "#854d0e", "rgba(202,138,4,0.1)"],
    "/certificate": ["#9333ea", "#7e22ce", "rgba(168,85,247,0.1)"],
    "/contact": ["#047857", "#065f46", "rgba(16,185,129,0.1)"],
  };
  const [pageAccent, , pageAccentSoft] = palettes[pathname] ?? palettes["/"];
  const toneStyle = { "--page-accent": pageAccent, "--page-accent-soft": pageAccentSoft } as CSSProperties;
  return (
    <main className="relative isolate overflow-x-clip" style={toneStyle}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-112 bg-[radial-gradient(60%_100%_at_15%_0%,rgba(37,99,235,0.05),transparent_70%)]"
      />
      <section
        className={[
          "container-page relative z-10 flex flex-col gap-12 pt-12 sm:gap-16 sm:pt-20",
          maxWidthClassName,
          animated ? "motion-reveal" : "",
          sectionClassName,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
      </section>
    </main>
  );
}
