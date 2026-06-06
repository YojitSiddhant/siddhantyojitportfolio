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
      className="page-watermark"
    />
  );
}
