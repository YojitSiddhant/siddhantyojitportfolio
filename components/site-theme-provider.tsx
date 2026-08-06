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
  accent: "#ff0000",
  accentStrong: "#ff0000",
  accentSoft: "transparent",
};

const routeThemes: Array<{ match: string; theme: ThemeVars }> = [
  {
    match: "/contact",
    theme: {
      accent: "#0000ff",
      accentStrong: "#0000ff",
      accentSoft: "transparent",
    },
  },
  {
    match: "/education",
    theme: {
      accent: "#00aa00",
      accentStrong: "#00aa00",
      accentSoft: "transparent",
    },
  },
  {
    match: "/skills",
    theme: {
      accent: "#ffcc00",
      accentStrong: "#ffcc00",
      accentSoft: "transparent",
    },
  },
  {
    match: "/projects",
    theme: {
      accent: "#ff6600",
      accentStrong: "#ff6600",
      accentSoft: "transparent",
    },
  },
  {
    match: "/full-stack-projects",
    theme: {
      accent: "#00ffff",
      accentStrong: "#00ffff",
      accentSoft: "transparent",
    },
  },
  {
    match: "/my-work",
    theme: {
      accent: "#ff00ff",
      accentStrong: "#ff00ff",
      accentSoft: "transparent",
    },
  },
  {
    match: "/certificate",
    theme: {
      accent: "#0000ff",
      accentStrong: "#0000ff",
      accentSoft: "transparent",
    },
  },
  {
    match: "/experience",
    theme: {
      accent: "#00ff00",
      accentStrong: "#00ff00",
      accentSoft: "transparent",
    },
  },
  {
    match: "/",
    theme: {
      accent: "#ff0000",
      accentStrong: "#ff0000",
      accentSoft: "transparent",
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
