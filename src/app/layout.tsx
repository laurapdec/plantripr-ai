import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CookieConsent } from "@/components/ui/cookie-consent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Plantrip'r - Smart Travel Planning",
  description: "Plan perfect trips with AI. Create personalized itineraries, collaborate with friends, and manage expenses in multiple currencies.",
  keywords: "travel planning, AI travel, trip planner, itinerary, travel collaboration",
  authors: [{ name: "Myriam Tsafack" }, { name: "Laura Pereira de Castro" }],
  creator: "Plantrip'r",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://plantripr.ai",
    siteName: "Plantrip'r",
    title: "Plantrip'r - Smart Travel Planning",
    description: "Plan perfect trips with AI. Create personalized itineraries, collaborate with friends, and manage expenses.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
