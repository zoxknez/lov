import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/smooth-scroll";
import AnalyticsBeacon from "@/components/analytics-beacon";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "KAIMANAWA | Premium New Zealand Trophy Hunts",
    template: "%s | KAIMANAWA"
  },
  description:
    "Ultra-premium New Zealand trophy hunting platform in the Kaimanawa Range with private guides, cinematic estate intel, and concierge booking.",
  applicationName: "KAIMANAWA Premium Hunts",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "KAIMANAWA | Premium New Zealand Trophy Hunts",
    description:
      "Private Kaimanawa trophy programs with elite guides, estate intelligence, and concierge-level expedition planning.",
    siteName: "KAIMANAWA",
    images: [
      {
        url: "/brand-logo.png",
        width: 1200,
        height: 1200,
        alt: "KAIMANAWA premium hunts"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "KAIMANAWA | Premium New Zealand Trophy Hunts",
    description:
      "Private Kaimanawa trophy programs with elite guides and concierge expedition design.",
    images: ["/brand-logo.png"]
  },
  icons: {
    icon: "/brand-logo.png",
    apple: "/brand-logo.png"
  },
  manifest: "/manifest.webmanifest"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <a href="#top" className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[200] focus:rounded-md focus:bg-black/80 focus:px-3 focus:py-2 focus:text-sm">
          Skip to content
        </a>
        <div className="noise-overlay" aria-hidden />
        <SmoothScroll />
        <AnalyticsBeacon />
        {children}
      </body>
    </html>
  );
}
