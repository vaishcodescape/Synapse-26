import type { Metadata } from "next";
import { Geist, Geist_Mono, Bebas_Neue } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SYNAPSE'26 | DA Ka Tyohaar",
  description: "SYNAPSE'26 - The Ultimate Tech Festival. Register now for the most anticipated event of the year.",
  keywords: ["synapse", "tech fest", "college fest", "2026", "technology", "events"],
  openGraph: {
    title: "SYNAPSE'26",
    description: "The Ultimate Tech Festival",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} antialiased bg-black`}
      >
        {children}
      </body>
    </html>
  );
}
