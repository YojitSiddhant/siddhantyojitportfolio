"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

type ThemeVars = {
  accent: string;
  accentStrong: string;
  accentSoft: string;
};

const defaultTheme: ThemeVars = {
  accent: "#7c3aed",
  accentStrong: "#ec4899",
  accentSoft: "rgba(124, 58, 237, 0.12)",
};

const routeThemes: Array<{ match: string; theme: ThemeVars }> = [
  {
    match: "/contact",
    theme: {
      accent: "#d946ef",
      accentStrong: "#a21caf",
      accentSoft: "rgba(217, 70, 239, 0.12)",
    },
  },
  {
    match: "/education",
    theme: {
      accent: "#10b981",
      accentStrong: "#059669",
      accentSoft: "rgba(16, 185, 129, 0.14)",
    },
  },
  {
    match: "/skills",
    theme: {
      accent: "#f59e0b",
      accentStrong: "#d97706",
      accentSoft: "rgba(245, 158, 11, 0.14)",
    },
  },
  {
    match: "/projects",
    theme: {
      accent: "#f97316",
      accentStrong: "#ea580c",
      accentSoft: "rgba(249, 115, 22, 0.14)",
    },
  },
  {
    match: "/full-stack-projects",
    theme: {
      accent: "#14b8a6",
      accentStrong: "#0f766e",
      accentSoft: "rgba(20, 184, 166, 0.14)",
    },
  },
  {
    match: "/my-work",
    theme: {
      accent: "#8b5cf6",
      accentStrong: "#7c3aed",
      accentSoft: "rgba(139, 92, 246, 0.12)",
    },
  },
  {
    match: "/certificate",
    theme: {
      accent: "#eab308",
      accentStrong: "#ca8a04",
      accentSoft: "rgba(234, 179, 8, 0.14)",
    },
  },
  {
    match: "/experience",
    theme: {
      accent: "#06b6d4",
      accentStrong: "#0891b2",
      accentSoft: "rgba(6, 182, 212, 0.14)",
    },
  },
  {
    match: "/",
    theme: {
      accent: "#ec4899",
      accentStrong: "#db2777",
      accentSoft: "rgba(236, 72, 153, 0.12)",
    },
  },
];

function getThemeForPathname(pathname: string) {
  const theme = routeThemes.find((entry) =>
    entry.match === "/" ? pathname === "/" : pathname.startsWith(entry.match),
  )?.theme;

  return theme ?? defaultTheme;
}

export function SiteThemeProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const theme = getThemeForPathname(pathname);
    const root = document.documentElement;

    const previous = {
      accent: root.style.getPropertyValue("--accent"),
      accentStrong: root.style.getPropertyValue("--accent-strong"),
      accentSoft: root.style.getPropertyValue("--accent-soft"),
    };

    root.style.setProperty("--accent", theme.accent);
    root.style.setProperty("--accent-strong", theme.accentStrong);
    root.style.setProperty("--accent-soft", theme.accentSoft);

    return () => {
      root.style.setProperty("--accent", previous.accent || defaultTheme.accent);
      root.style.setProperty("--accent-strong", previous.accentStrong || defaultTheme.accentStrong);
      root.style.setProperty("--accent-soft", previous.accentSoft || defaultTheme.accentSoft);
    };
  }, [pathname]);

  return children;
}
