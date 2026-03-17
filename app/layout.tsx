import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/smooth-scroll";
import AnalyticsBeacon from "@/components/analytics-beacon";
import CustomCursor from "@/components/custom-cursor";
import Preloader from "@/components/preloader";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: {
    default: "Kaimanawa Trophy Safaris | Guided New Zealand Hunts",
    template: "%s | KAIMANAWA"
  },
  description:
    "Guided New Zealand hunting programs across Central North Island bush country and South Island alpine terrain, with tailored planning for international hunters.",
  applicationName: "Kaimanawa Trophy Safaris",
  alternates: siteUrl ? { canonical: "/" } : undefined,
  openGraph: {
    type: "website",
    ...(siteUrl ? { url: siteUrl } : {}),
    title: "Kaimanawa Trophy Safaris | Guided New Zealand Hunts",
    description:
      "A cinematic, premium hunting platform for Kaimanawa Trophy Safaris with fact-checked New Zealand planning notes and guided hunt enquiries.",
    siteName: "Kaimanawa Trophy Safaris",
    ...(siteUrl ? {
      images: [{
        url: "/brand-logo.png",
        width: 1200,
        height: 1200,
        alt: "KAIMANAWA premium hunts"
      }]
    } : {})
  },
  twitter: siteUrl
    ? {
        card: "summary_large_image",
        title: "Kaimanawa Trophy Safaris | Guided New Zealand Hunts",
        description: "Guided North and South Island New Zealand hunts with tailored planning for international hunters.",
        images: ["/brand-logo.png"]
      }
    : {
        card: "summary",
        title: "Kaimanawa Trophy Safaris | Guided New Zealand Hunts",
        description: "Guided North and South Island New Zealand hunts with tailored planning for international hunters."
      },
  icons: { icon: "/brand-logo.png", apple: "/brand-logo.png" },
  manifest: "/manifest.webmanifest"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#020403] text-white">
        <a href="#top" className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[200] focus:rounded-md focus:bg-white/95 focus:px-3 focus:py-2 focus:text-sm focus:text-black">
          Skip to content
        </a>
        <Preloader />
        <CustomCursor />
        <SmoothScroll />
        <AnalyticsBeacon />
        {children}
      </body>
    </html>
  );
}
