import { Suspense } from "react";
import ModernSite from "@/components/modern-site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

function StaticFallback() {
  return (
    <main className="relative z-10 min-h-screen bg-[#060907] text-white">
      <header className="absolute inset-x-0 top-0 z-50 border-b border-white/10 bg-[#060907]/60">
        <div className="section-shell flex min-h-[90px] items-center justify-between gap-5 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5">
              <span className="font-display text-xl text-white">K</span>
            </span>
            <div>
              <p className="font-display text-xl uppercase tracking-[0.24em]">KAIMANAWA</p>
              <p className="text-[10px] uppercase tracking-[0.32em] text-white/70">Trophy Safaris | New Zealand</p>
            </div>
          </div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#d9b167]">Loading...</span>
        </div>
      </header>

      <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <span className="text-[11px] uppercase tracking-[0.2em] text-[#d9b167]">Kaimanawa Trophy Safaris</span>
        <h1 className="mt-6 font-display text-5xl leading-tight text-white md:text-7xl">
          Guided New Zealand hunting is loading
        </h1>
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
