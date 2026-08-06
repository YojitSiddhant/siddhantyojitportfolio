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
  accent: "#2563eb",
  accentStrong: "#1d4ed8",
  accentSoft: "rgba(37, 99, 235, 0.12)",
};

const routeThemes: Array<{ match: string; theme: ThemeVars }> = [
  {
    match: "/contact",
    theme: {
      accent: "#2563eb",
      accentStrong: "#1d4ed8",
      accentSoft: "rgba(37, 99, 235, 0.12)",
    },
  },
  {
    match: "/education",
    theme: {
      accent: "#2563eb",
      accentStrong: "#1d4ed8",
      accentSoft: "rgba(37, 99, 235, 0.12)",
    },
  },
  {
    match: "/skills",
    theme: {
      accent: "#2563eb",
      accentStrong: "#1d4ed8",
      accentSoft: "rgba(37, 99, 235, 0.12)",
    },
  },
  {
    match: "/projects",
    theme: {
      accent: "#2563eb",
      accentStrong: "#1d4ed8",
      accentSoft: "rgba(37, 99, 235, 0.12)",
    },
  },
  {
    match: "/full-stack-projects",
    theme: {
      accent: "#2563eb",
      accentStrong: "#1d4ed8",
      accentSoft: "rgba(37, 99, 235, 0.12)",
    },
  },
  {
    match: "/my-work",
    theme: {
      accent: "#2563eb",
      accentStrong: "#1d4ed8",
      accentSoft: "rgba(37, 99, 235, 0.12)",
    },
  },
  {
    match: "/certificate",
    theme: {
      accent: "#2563eb",
      accentStrong: "#1d4ed8",
      accentSoft: "rgba(37, 99, 235, 0.12)",
    },
  },
  {
    match: "/experience",
    theme: {
      accent: "#2563eb",
      accentStrong: "#1d4ed8",
      accentSoft: "rgba(37, 99, 235, 0.12)",
    },
  },
  {
    match: "/",
    theme: {
      accent: "#2563eb",
      accentStrong: "#1d4ed8",
      accentSoft: "rgba(37, 99, 235, 0.12)",
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
