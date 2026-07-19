import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "ArenaMind AI – Smart Stadium Operating System",
  description: "AI-powered stadium operations platform for the FIFA World Cup 2026. Real-time crowd intelligence, predictive analytics, smart navigation, and multilingual support.",
  keywords: ["stadium AI", "FIFA 2026", "crowd analytics", "smart stadium", "hackathon"],
  authors: [{ name: "ArenaMind Team" }],
  openGraph: {
    title: "ArenaMind AI – Smart Stadium OS",
    description: "Real-time AI operations for FIFA World Cup 2026 stadiums.",
    type: "website",
    locale: "en_US",
    siteName: "ArenaMind AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "ArenaMind AI – Smart Stadium OS",
    description: "Real-time AI operations for FIFA World Cup 2026 stadiums.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased min-h-screen text-foreground`}>
        <div className="aurora-bg" />
        {children}
      </body>
    </html>
  );
}
