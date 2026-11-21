import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import { profile } from "@/data/profile";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: "Chandan V N (@Chandan767) — Full-Stack & Systems Engineer",
  description:
    "Full-stack & systems engineer specializing in TypeScript, React, Node.js, PostgreSQL, Redis, AWS, API Integrations, Workflow Automation, and Applied AI (LangGraph & Scikit-learn) — 967+ commits, 161 DB models, 88 API modules, 15+ campuses.",
  openGraph: {
    title: "Chandan V N (@Chandan767) — Full-Stack & Systems Engineer",
    description:
      "Building Scalable Enterprise Platforms, API Integrations & Intelligent Systems. 967+ commits, 161 PostgreSQL models, 88 API modules across 15+ campuses.",
    type: "website",
    url: profile.siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Chandan V N (@Chandan767) — Full-Stack & Systems Engineer",
    description:
      "Building Scalable Enterprise Platforms, API Integrations & Intelligent Systems.",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  alternateName: profile.handle,
  jobTitle: profile.role,
  url: profile.siteUrl,
  email: `mailto:${profile.email}`,
  sameAs: [profile.github, profile.linkedin],
  knowsAbout: [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "Prisma ORM",
    "Redis",
    "AWS",
    "PM2 Cluster Mode",
    "OAuth 2.0",
    "LangGraph",
    "FastAPI",
    "Scikit-learn",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${plusJakarta.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider>
          <ScrollProgressBar />
          <CommandPalette />
          <div className="relative min-h-screen bg-dot-grid">
            <div className="pointer-events-none fixed inset-0 hero-mesh-glow" />
            <div className="relative z-10 flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
