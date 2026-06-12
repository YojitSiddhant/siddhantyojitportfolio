import type { Metadata } from "next";
import { SiteNavbar } from "@/components/site-navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Siddhant Yojit | Frontend Developer",
  description:
    "Portfolio website for Siddhant Yojit, a frontend developer focused on responsive interfaces, UI testing, and practical product delivery.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="relative isolate min-h-full bg-[var(--background)] text-[var(--foreground)]">
        <div className="relative z-10">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div
              className="theme-orb motion-float absolute left-[-7rem] top-24 h-[18rem] w-[18rem] rounded-full blur-3xl md:h-[26rem] md:w-[26rem]"
              style={{
                animationDelay: "0ms",
                background:
                  "radial-gradient(circle, var(--orb-1) 0%, var(--orb-1-soft) 42%, transparent 72%)",
              }}
            />
            <div
              className="theme-orb motion-pulse absolute bottom-[-8rem] right-[-8rem] h-[20rem] w-[20rem] rounded-full blur-3xl md:h-[28rem] md:w-[28rem]"
              style={{
                animationDelay: "1200ms",
                background:
                  "radial-gradient(circle, var(--orb-2) 0%, var(--orb-2-soft) 44%, transparent 74%)",
              }}
            />
          </div>
          <SiteNavbar />
          {children}
        </div>
      </body>
    </html>
  );
}
