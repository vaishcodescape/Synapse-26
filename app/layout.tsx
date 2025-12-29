import type { Metadata } from "next";
import { Geist, Geist_Mono, Bebas_Neue, Inter, Roboto } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const joker = localFont({
  src: "./fonts/joker.ttf",
  variable: "--font-joker",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "SYNAPSE'26 | DA Ka Tyohaar",
  description: "SYNAPSE'26 - The Ultimate Tech-Cultural Festival. Register now for the most anticipated event of the year.",
  keywords: ["synapse", "tech fest", "college fest", "2026", "technology", "events"],
  openGraph: {
    title: "SYNAPSE'26",
    description: "The Ultimate Techno-Cultural Festival",
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
        className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} ${inter.variable} ${roboto.variable} ${joker.variable} antialiased bg-black`}
      >
        {children}
      </body>
    </html>
  );
}
