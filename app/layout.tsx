import "./globals.css";
import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import SmoothScroll from "@/components/ui/SmoothScroll";
import VisitTracker from "@/components/analytics/VisitTracker";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-main",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: " Home | Vidula Wickramasinghe",
    template: "%s | Vidula Wickramasinghe",
  },
  description:
    "Information Systems & Data Science student — building intelligent systems, scalable web apps, and future-driven digital solutions.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={`${inter.variable} min-h-screen bg-[var(--color-bg)] text-[var(--color-primary)] antialiased`}>
        <VisitTracker />
        <SmoothScroll>
          <ScrollProgress />
          <Navbar />
          <main className="relative">{children}</main>
          <Footer />
        </SmoothScroll>
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  );
}