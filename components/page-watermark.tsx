"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

export function PageWatermark() {
  const pathname = usePathname();

  if (pathname === "/contact" || pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <div aria-hidden="true" className="page-watermark">
      <Image
        className="page-watermark__image"
        src="/siddhant-watermark-transparent.png"
        alt=""
        width={1408}
        height={768}
        sizes="(max-width: 480px) 102vw, (max-width: 768px) 96vw, min(92vw, 1100px)"
        priority={false}
      />
    </div>
  );
}
