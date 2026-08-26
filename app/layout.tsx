import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Display face — used for headlines. Geometric and confident.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

// Body face — used for paragraphs and UI text. Neutral and easy to read.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

// Mono face — used for small labels, categories, and timecodes.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "Nova Motion — Motion Graphics & Motion Design Studio",
    template: "%s | Nova Motion",
  },
  description:
    "Motion graphics and motion design for brands, products, businesses, and social media. Watch the showreel, browse the work, and start a project.",
  openGraph: {
    title: "Nova Motion — Motion Graphics & Motion Design Studio",
    description:
      "Motion graphics and motion design for brands, products, businesses, and social media.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-body bg-obsidian text-white antialiased">
        {children}
      </body>
    </html>
  );
}
