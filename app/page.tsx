import Image from "next/image";
import { Suspense } from "react";
import ModernSite from "@/components/modern-site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

function StaticFallback() {
  return (
    <main className="relative z-10">
      <header className="sticky top-0 z-50 border-b border-white/60 bg-[rgba(247,242,232,0.9)] backdrop-blur-xl">
        <div className="section-shell flex min-h-[88px] items-center justify-between gap-4 py-2">
          <div className="flex items-center gap-4">
            <span className="brand-medallion">
              <Image src="/brand-logo.png" alt="Kaimanawa logo" width={96} height={96} className="h-16 w-16 rounded-full object-cover" />
            </span>
            <div>
              <p className="font-display text-xl tracking-[0.24em] text-[#142019]">KAIMANAWA</p>
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#7a6650]">Trophy Safaris | New Zealand</p>
            </div>
          </div>
          <span className="eyebrow-pill">
            Loading Site...
          </span>
        </div>
      </header>

      <section className="section-shell py-24">
        <p className="text-xs uppercase tracking-[0.2em] text-[#8d6b42]">KAIMANAWA TROPHY SAFARIS</p>
        <h1 className="mt-3 max-w-[14ch] font-display text-5xl leading-[1] text-[#142019] md:text-7xl">
          Guided New Zealand hunting is loading.
        </h1>
        <p className="mt-5 max-w-2xl text-[#4f5c52]">
          Central North Island bush country, South Island alpine access, and tailored hunt planning for international guests.
        </p>
      </section>
    </main>
  );
}

export default function Home() {
  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: "Kaimanawa Trophy Safaris",
    ...(siteUrl ? { url: siteUrl, logo: `${siteUrl}/brand-logo.png`, email: "hunting@kaimanawasafaris.com", telephone: "+64 21 088 50131" } : {}),
    description:
      "Guided New Zealand hunting programs with tailored planning across Central North Island bush country and South Island alpine terrain.",
    areaServed: "New Zealand",
    address: {
      "@type": "PostalAddress",
      addressCountry: "NZ",
      addressRegion: "Central North Island / South Island"
    }
  };

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Guided New Zealand Hunting Program",
    provider: {
      "@type": "Organization",
      name: "Kaimanawa Trophy Safaris"
    },
    areaServed: {
      "@type": "Country",
      name: "New Zealand"
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "NZD",
      availability: "https://schema.org/InStock",
      ...(siteUrl ? { url: siteUrl } : {})
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <Suspense fallback={<StaticFallback />}>
        <ModernSite />
      </Suspense>
    </>
  );
}
