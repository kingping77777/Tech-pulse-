import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { TopNav } from '@/components/layout/TopNav';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'TechPulse',
  description: 'Fresh, focused coverage of AI, Big Tech, and global tech trends',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-text-primary selection:bg-accent-violet/30 min-h-screen" suppressHydrationWarning={true}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          {/* Global Ambient Radial Glow */}
          <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#05050A]">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,180,255,0.08),transparent_60%)]" />
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(200,0,255,0.04),transparent_60%)]" />
             <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-accent-cyan/10 blur-[150px] rounded-full animate-pulse-ring" />
          </div>

          <div className="flex flex-col min-h-screen w-full relative z-0">
            <TopNav />
            <main className="flex-1 w-full pt-20 animate-fade-in-up">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
