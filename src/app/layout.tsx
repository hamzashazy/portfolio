import type { Metadata } from 'next';
import { Inter, Sora, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'], variable: '--font-body' });
const sora = Sora({ subsets: ['latin'], variable: '--font-headline' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'Hamza Shahzad — Full Stack Developer · AI Automation',
  description:
    'Portfolio of Hamza Shahzad — Full Stack Developer building scalable web & mobile applications with Next.js, Flutter, Supabase, and Claude-powered AI automations.',
  keywords: ['Full Stack Developer', 'Next.js', 'Flutter', 'Supabase', 'AI Automation', 'MERN', 'Hamza Shahzad'],
  openGraph: {
    title: 'Hamza Shahzad — Full Stack Developer · AI Automation',
    description:
      'Building scalable web & mobile products — Next.js CRMs, Flutter apps, and Claude-powered automations.',
    url: 'https://hamzashazy.vercel.app',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${sora.variable} ${jetbrainsMono.variable} font-body antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
