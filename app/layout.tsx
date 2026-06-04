import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import { SiteNavbar } from "@/components/site-navbar";
import { NavigationLoaderProvider } from "@/components/navigation-loader-provider";
import { PageWatermark } from "@/components/page-watermark";
import "./globals.css";

const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body-font",
});

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading-font",
});

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
    <html
      lang="en"
      className={`${bodyFont.variable} ${headingFont.variable} h-full antialiased`}
      style={{ colorScheme: "light" }}
    >
      <body className="relative isolate min-h-full bg-[var(--background)] text-[var(--foreground)]">
        <PageWatermark />
        <NavigationLoaderProvider>
          <div className="relative z-10">
            <SiteNavbar />
            {children}
          </div>
        </NavigationLoaderProvider>
      </body>
    </html>
  );
}
