import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from '@/contexts/AuthContext';
import { Header } from '@/components/Header';
import { ProgressProvider } from '@/contexts/ProgressContext';

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
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ProgressProvider>
            <Header />
            <main className="container mx-auto p-4">{children}</main>
          </ProgressProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
