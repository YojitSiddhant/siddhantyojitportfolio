import type { Metadata } from "next";
import { SiteNavbar } from "@/components/site-navbar";
import { PageWatermark } from "@/components/page-watermark";
import "./globals.css";

export const metadata: Metadata = {
  title: "Siddhant Yojit | Frontend Developer",
  description:
    "Portfolio website for Siddhant Yojit, a frontend developer focused on responsive interfaces, UI testing, and practical product delivery.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" style={{ colorScheme: "light" }}>
      <body className="relative isolate min-h-full bg-[var(--background)] text-[var(--foreground)]">
        <PageWatermark />
        <div className="relative z-10">
          <SiteNavbar />
          {children}
        </div>
      </body>
    </html>
  );
}
