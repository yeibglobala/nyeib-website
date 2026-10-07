import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/shared/components/Navbar";
import { SmoothScroll } from "@/shared/components/SmoothScroll";
import { CtaSection } from "@/components/cta/CtaSection";
import { Footer } from "@/components/footer/Footer";

export const viewport: Viewport = {
  themeColor: "#0b1310",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Nigeria YEIB Investment Funds — Unlocking Pathways for Investable Businesses",
  description: "Nigeria YEIB Investment Funds connects growth-oriented businesses with the capital, strategic partnerships and practical support they need to become more credible, resilient and investment-ready.",
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Asul:wght@400;700&family=Chivo:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[var(--bg-deep)] text-[var(--fg-main)] font-[var(--font-body)] antialiased min-h-screen flex flex-col">
        <SmoothScroll>
          <Navbar />
          <div className="flex-1 w-full">{children}</div>
          <CtaSection />
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}

