import Image from "next/image";
import { Suspense } from "react";
import ModernSite from "@/components/modern-site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

function StaticFallback() {
  return (
    <main className="relative z-10">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#040705]/80 backdrop-blur-xl">
        <div className="section-shell flex min-h-[100px] items-center justify-between gap-4 py-2">
          <div className="flex items-center gap-4">
            <span className="gradient-ring grid h-20 w-20 place-items-center overflow-hidden rounded-full bg-gradient-to-b from-[#213326] to-[#101811] p-1">
              <Image src="/brand-logo.png" alt="Kaimanawa logo" width={96} height={96} className="h-full w-full rounded-full object-cover" />
            </span>
            <div>
              <p className="font-serif text-xl tracking-[0.24em]">KAIMANAWA</p>
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#d1b988]">New Zealand Private Hunts</p>
            </div>
          </div>
          <span className="premium-panel rounded-full bg-black/40 px-3 py-2 text-xs uppercase tracking-[0.14em] text-[#dfc28f]">
            Loading Private Program...
          </span>
        </div>
      </header>

      <section className="section-shell py-24">
        <p className="text-xs uppercase tracking-[0.2em] text-[#d9b167]">KAIMANAWA 2027</p>
        <h1 className="mt-3 max-w-[14ch] font-serif text-5xl leading-[1] md:text-7xl">
          Private program overview is loading.
        </h1>
        <p className="mt-5 max-w-2xl text-stone-200">
          Kaimanawa Range, Central North Island (Manawatu-Whanganui / Waikato), New Zealand.
          If the interactive version does not appear, refresh once with Ctrl+F5.
        </p>
      </section>
    </main>
  );
}

export default function Home() {
  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: "KAIMANAWA Premium Hunts",
    url: siteUrl,
    logo: `${siteUrl}/brand-logo.png`,
    description:
      "Private New Zealand trophy hunting programs with guide-led logistics and concierge expedition planning.",
    areaServed: "New Zealand",
    address: {
      "@type": "PostalAddress",
      addressCountry: "NZ",
      addressRegion: "Manawatu-Whanganui / Waikato"
    }
  };

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Private Trophy Hunting Expedition",
    provider: {
      "@type": "Organization",
      name: "KAIMANAWA Premium Hunts"
    },
    areaServed: {
      "@type": "Country",
      name: "New Zealand"
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "NZD",
      availability: "https://schema.org/InStock",
      url: siteUrl
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
