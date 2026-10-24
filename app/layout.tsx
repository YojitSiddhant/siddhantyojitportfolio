import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { SiteNavbar } from "@/components/site-navbar";
import { SiteFooter } from "@/components/site-footer";
import { ChatButton } from "@/components/ai/ChatButton";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const description =
  "Siddhant Yojit is a Full Stack Developer in Bengaluru building responsive React.js and Next.js applications, REST APIs, and database-driven workflows with Node.js, Express.js, PostgreSQL, and MySQL.";

export const metadata: Metadata = {
  title: {
    default: "Siddhant Yojit | Full Stack Developer",
    template: "%s",
  },
  description,
  applicationName: "Siddhant Yojit Portfolio",
  authors: [{ name: "Siddhant Yojit", url: "https://github.com/YojitSiddhant" }],
  keywords: [
    "Siddhant Yojit",
    "Full Stack Developer",
    "Frontend Developer",
    "React.js",
    "Next.js",
    "Node.js",
    "Express.js",
    "Bengaluru",
  ],
  openGraph: {
    type: "website",
    title: "Siddhant Yojit | Full Stack Developer",
    description,
    siteName: "Siddhant Yojit",
  },
  twitter: {
    card: "summary",
    title: "Siddhant Yojit | Full Stack Developer",
    description,
  },
  icons: {
    icon: "/favicon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="relative isolate min-h-full bg-background text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-200 focus:rounded-full focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:text-background"
        >
          Skip to content
        </a>
        <div className="relative z-10 flex min-h-dvh flex-col">
          <SiteNavbar />
          <div id="main-content" className="flex-1">
            {children}
          </div>
          <SiteFooter />
          <ChatButton />
        </div>
      </body>
    </html>
  );
}
