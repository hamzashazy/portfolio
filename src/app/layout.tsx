import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Sidebar } from "@/components/shell/sidebar";
import { MobileHeader } from "@/components/shell/mobile-header";
import { profile } from "@/data/profile";
import "./globals.css";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", display: "swap" });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(profile.site),
  title: {
    default: `${profile.name} · ${profile.role}`,
    template: `%s · ${profile.name}`,
  },
  description:
    "AI solutions developer building products that ship: recommendation engines, RAG matching, LLM agents and automations, plus the storefronts, apps and business systems around them. Next.js, Supabase, Flutter, Claude API.",
  keywords: ["Hamza Shahzad", "AI solutions developer", "AI automation", "RAG", "Claude API", "full stack developer", "Next.js", "Flutter", "Supabase", "Tauri", "Islamabad", "portfolio"],
  authors: [{ name: profile.name, url: profile.site }],
  creator: profile.name,
  openGraph: {
    type: "website",
    url: profile.site,
    siteName: profile.name,
    title: `${profile.name} · ${profile.role}`,
    description: "AI products, automations, storefronts and games, each with a real status in the market.",
  },
  twitter: { card: "summary_large_image", title: `${profile.name} · ${profile.role}` },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#1a1917" },
    { media: "(prefers-color-scheme: light)", color: "#fbfaf8" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${bricolage.variable} ${geist.variable} ${jetbrains.variable}`}>
      <body className="min-h-dvh">
        <ThemeProvider>
          <div className="lg:grid lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)]">
            <Sidebar />
            <MobileHeader />
            <main id="main" className="min-w-0">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
