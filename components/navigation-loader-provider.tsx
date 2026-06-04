"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { RouteLoader } from "@/components/route-loader";

type NavigationLoaderContextValue = {
  beginNavigation: () => void;
};

const NavigationLoaderContext = createContext<NavigationLoaderContextValue | null>(null);
const MIN_VISIBLE_MS = 1600;

export function NavigationLoaderProvider({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const navigationStartRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isNavigating) {
      return;
    }

    const startedAt = navigationStartRef.current ?? Date.now();
    const elapsed = Date.now() - startedAt;
    const remaining = Math.max(MIN_VISIBLE_MS - elapsed, 0);
    const timeout = window.setTimeout(() => {
      setIsNavigating(false);
      navigationStartRef.current = null;
    }, remaining);

    return () => window.clearTimeout(timeout);
  }, [isNavigating, pathname]);

  const value = useMemo(
    () => ({
      beginNavigation: () => {
        navigationStartRef.current = Date.now();
        setIsNavigating(true);
      },
    }),
    []
  );

  return (
    <NavigationLoaderContext.Provider value={value}>
      {children}
      {isNavigating ? <RouteLoader /> : null}
    </NavigationLoaderContext.Provider>
  );
}

export function useNavigationLoader() {
  const context = useContext(NavigationLoaderContext);

  if (!context) {
    throw new Error("useNavigationLoader must be used within NavigationLoaderProvider");
  }

  return context;
}
