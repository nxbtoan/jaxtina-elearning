import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from '@/contexts/AuthContext';
import { Header } from '@/components/Header';
import { ProgressProvider } from '@/contexts/ProgressContext';
import { ThemeProvider } from '@/components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'E-Learning App',
  description: 'Frontend Developer Test',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="">
      <body
        className={`${inter.className} bg-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-300 min-h-screen`}
      >
        <ThemeProvider>
          <AuthProvider>
            <ProgressProvider>
              <Header />
              <main className="container mx-auto p-8">{children}</main>
            </ProgressProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
