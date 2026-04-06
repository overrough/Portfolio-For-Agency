import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Elevate Web Works — We Build 3D Digital Revenue Engines",
  description:
    "AI-accelerated, 3D-native web experiences for growing businesses. Built in 3 weeks. Not 3 months.",
  keywords: "web design, 3D websites, agency, WebGL, Next.js, AI",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable}`}
    >
      <body className="noise">{children}</body>
    </html>
  );
}
