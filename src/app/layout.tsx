import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AstraPulse — Your Daily Cosmic Ritual",
  description:
    "A 30-second daily ritual that learns who you are, then turns astrology into hyper-personalized, explainable, culturally-native guidance.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "AstraPulse",
  },
  openGraph: {
    title: "AstraPulse — Your Daily Cosmic Ritual",
    description: "Astrology that actually knows you.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0a0a1a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className="font-sans antialiased bg-cosmic-900 text-white noise-bg"
        style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
