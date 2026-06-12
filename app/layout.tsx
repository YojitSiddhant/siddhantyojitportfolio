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
    <html lang="en" className="h-full antialiased" style={{ colorScheme: "light" }}>
      <body className="relative isolate min-h-full bg-[var(--background)] text-[var(--foreground)]">
        <div className="relative z-10">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div
              className="motion-float absolute left-[-7rem] top-24 h-[18rem] w-[18rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.72)_42%,transparent_72%)] blur-3xl md:h-[26rem] md:w-[26rem]"
              style={{ animationDelay: "0ms" }}
            />
            <div
              className="motion-pulse absolute bottom-[-8rem] right-[-8rem] h-[20rem] w-[20rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.88)_0%,rgba(255,255,255,0.66)_44%,transparent_74%)] blur-3xl md:h-[28rem] md:w-[28rem]"
              style={{ animationDelay: "1200ms" }}
            />
          </div>
          <SiteNavbar />
          {children}
        </div>
      </body>
    </html>
  );
}
