import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import LenisProvider from "@/components/LenisProvider";
import ScrollProgress from "@/components/ScrollProgress";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MAYA'S | Fine Jewelry · Miami · Since 1985",
  description:
    "Four decades of curating exquisite jewelry in the heart of Miami. Heritage gold, diamonds, and bespoke pieces crafted with timeless elegance at Maya's Cash & Gold.",
  openGraph: {
    title: "MAYA'S | Fine Jewelry · Miami · Since 1985",
    description:
      "Four decades of curating exquisite jewelry in the heart of Miami. Heritage gold, diamonds, and bespoke pieces crafted with timeless elegance.",
    type: "website",
    locale: "en_US",
    siteName: "MAYA'S",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} antialiased`}
    >
      <body className="bg-obsidian min-h-screen">
        <LenisProvider>
          <ScrollProgress />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
