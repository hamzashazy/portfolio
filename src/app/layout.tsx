import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Caveat, JetBrains_Mono, Michroma, Outfit } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { TopBar } from "@/components/shell/top-bar";
import { WelcomeGate } from "@/components/shell/welcome-gate";
import { HireDock } from "@/components/shell/hire-dock";
import { Footer } from "@/components/shell/footer";
import { profile } from "@/data/profile";
import "./globals.css";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", display: "swap" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const michroma = Michroma({ subsets: ["latin"], weight: "400", variable: "--font-michroma", display: "swap", preload: false });
const caveat = Caveat({ subsets: ["latin"], weight: "600", variable: "--font-caveat", display: "swap", preload: false });
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
    { media: "(prefers-color-scheme: light)", color: "#0f2a20" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${bricolage.variable} ${outfit.variable} ${jetbrains.variable} ${michroma.variable} ${caveat.variable}`}>
      <head>
        {/* Returning visitors skip the welcome gate before first paint. */}
        <script dangerouslySetInnerHTML={{ __html: "try{if(localStorage.getItem('entered'))document.documentElement.dataset.entered='1'}catch(e){}" }} />
      </head>
      <body className="min-h-dvh">
        <ThemeProvider>
          <WelcomeGate />
          <TopBar />
          <main id="main" className="min-w-0">
            {children}
          </main>
          <Footer />
          <HireDock />
        </ThemeProvider>
      </body>
    </html>
  );
}
