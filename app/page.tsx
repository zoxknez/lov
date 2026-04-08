import Header from '@/components/header';
import Footer from '@/components/footer';
import HeroSection from '@/components/hero-section';
import StorySection from '@/components/story-section';
import HuntAreaSection from '@/components/hunt-area-section';
import GameAnimalsSection from '@/components/game-animals-section';
import AccommodationSection from '@/components/accommodation-section';
import GallerySection from '@/components/gallery-section';
import ContactSection from '@/components/contact-section';
import GlobalBackground from '@/components/global-background';
import { getAbsoluteBlobAssetUrl } from '@/lib/blob-asset';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');

export default function Home() {
  const organizationLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Kaimanawa Trophy Safaris',
    ...(siteUrl
      ? {
          url: siteUrl,
          logo: getAbsoluteBlobAssetUrl('/media/logo.png', siteUrl),
          email: 'hunting@kaimanawasafaris.com',
          telephone: '+64 21 088 50131',
        }
      : {}),
    description:
      'Guided New Zealand trophy hunts for red deer, fallow deer, sika deer, rusa deer, Arapawa rams, Himalayan tahr, and chamois.',
    areaServed: 'New Zealand',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'NZ',
      addressLocality: 'Ohakune',
    },
  };

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Guided New Zealand Hunting Program',
    provider: {
      '@type': 'Organization',
      name: 'Kaimanawa Trophy Safaris',
    },
    areaServed: {
      '@type': 'Country',
      name: 'New Zealand',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'NZD',
      availability: 'https://schema.org/InStock',
      ...(siteUrl ? { url: siteUrl } : {}),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <Header />
      <main id="top" className="relative z-10 bg-black">
        <HeroSection />
        <div className="relative isolate overflow-hidden">
          <GlobalBackground />
          <StorySection />
          <HuntAreaSection />
          <GameAnimalsSection />
          <AccommodationSection />
          <GallerySection />
          <ContactSection />
          <Footer />
        </div>
      </main>
    </>
  );
}
