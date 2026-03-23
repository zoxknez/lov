import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/smooth-scroll";
import AnalyticsBeacon from "@/components/analytics-beacon";
import CustomCursor from "@/components/custom-cursor";
import Preloader from "@/components/preloader";
import GlobalBackground from "@/components/global-background";
import { getAbsoluteBlobAssetUrl, getBlobAssetUrl } from "@/lib/blob-asset";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
const logoAssetUrl = getBlobAssetUrl("/media/logo.png");
const absoluteLogoAssetUrl = getAbsoluteBlobAssetUrl("/media/logo.png", siteUrl);

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: {
    default: "Kaimanawa Trophy Safaris | Guided New Zealand Hunts",
    template: "%s | KAIMANAWA"
  },
  description:
    "Guided New Zealand trophy hunts across Central North Island bush country and South Island alpine terrain, with tailored planning for international hunters.",
  applicationName: "Kaimanawa Trophy Safaris",
  alternates: siteUrl ? { canonical: "/" } : undefined,
  openGraph: {
    type: "website",
    ...(siteUrl ? { url: siteUrl } : {}),
    title: "Kaimanawa Trophy Safaris | Guided New Zealand Hunts",
    description:
      "Guided New Zealand trophy hunts across Central North Island bush country and South Island alpine terrain.",
    siteName: "Kaimanawa Trophy Safaris",
    ...(siteUrl ? {
      images: [{
        url: absoluteLogoAssetUrl,
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
        description: "Guided New Zealand trophy hunts with tailored planning for international hunters.",
        images: [absoluteLogoAssetUrl]
      }
    : {
        card: "summary",
        title: "Kaimanawa Trophy Safaris | Guided New Zealand Hunts",
        description: "Guided New Zealand trophy hunts with tailored planning for international hunters."
      },
  icons: { icon: logoAssetUrl, apple: logoAssetUrl },
  manifest: "/manifest.webmanifest"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-black text-white cursor-none selection:bg-gold-400/30 overflow-x-hidden">
        <GlobalBackground />
        <a href="#top" className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[200] focus:rounded-md focus:bg-white/95 focus:px-3 focus:py-2 focus:text-sm focus:text-black">
          Skip to content
        </a>
        <Preloader />
        <CustomCursor />
        <SmoothScroll>
          <AnalyticsBeacon />
          {children}
        </SmoothScroll>
      </body>

    </html>
  );
}
