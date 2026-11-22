import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
// Serif display face, bundled locally (no Google Fonts request).
import "@fontsource/playfair-display/400.css";
import "@fontsource/playfair-display/500.css";
import "@fontsource/playfair-display/600.css";
import "@fontsource/playfair-display/400-italic.css";
import "@fontsource/playfair-display/500-italic.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "CSP Matrimony — Every love story deserves a beautiful beginning",
  description:
    "CSP Matrimony helps you discover meaningful connections and meet compatible people looking for a lifelong partner.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
