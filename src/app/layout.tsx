import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "AstraPulse — Your Daily Cosmic Ritual | Vedic & Western Astrology",
    template: "%s | AstraPulse",
  },
  description:
    "A 30-second daily ritual that learns who you are, then turns astrology into hyper-personalized, explainable guidance. Vedic + Western. Free forever.",
  keywords: [
    "astrology", "vedic astrology", "horoscope", "daily horoscope",
    "nakshatra", "rashi", "kundli", "birth chart", "moon sign",
    "sun sign", "compatibility", "indian astrology", "jyotish",
    "personalized horoscope", "astrology app", "zodiac",
  ],
  manifest: "/manifest.json",
  metadataBase: new URL("https://astrapulse.app"),
  alternates: {
    canonical: "/",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "AstraPulse",
  },
  openGraph: {
    title: "AstraPulse — Astrology That Actually Knows You",
    description: "A 30-second daily ritual. Vedic + Western astrology. Hyper-personalized readings that learn who you are. Free forever.",
    type: "website",
    siteName: "AstraPulse",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "AstraPulse — Astrology That Actually Knows You",
    description: "A 30-second daily ritual that turns your birth chart into guidance so personal it feels like magic.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0a1a",
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "AstraPulse",
  description: "A 30-second daily ritual that learns who you are, then turns astrology into hyper-personalized, explainable guidance.",
  url: "https://astrapulse.app",
  applicationCategory: "LifestyleApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "1240",
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AstraPulse",
  url: "https://astrapulse.app",
  logo: "https://astrapulse.app/icons/icon-512.png",
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body
        className="font-sans antialiased bg-cosmic-900 text-white noise-bg"
        style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
