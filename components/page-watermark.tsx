"use client";

import { usePathname } from "next/navigation";

export function PageWatermark() {
  const pathname = usePathname();

  if (pathname === "/contact") {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.35]"
      style={{
        backgroundImage: "url('/siddhant-watermark-transparent.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center 28%",
        backgroundSize: "min(92vw, 1100px) auto",
      }}
    />
  );
}
