import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Elevate Web Works — We Build 3D Digital Experiences",
  description:
    "AI-accelerated, 3D-native web experiences for growing businesses. Built in days, not months.",
  keywords: "web design, 3D websites, agency, WebGL, Next.js, AI",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body className="noise">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
