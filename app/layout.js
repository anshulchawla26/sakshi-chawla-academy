import './globals.css'
import { Providers } from './providers'
import { sanityClient } from '@/lib/sanity/client'
import { seoDefaultsQuery, siteSettingsQuery } from '@/lib/sanity/queries'
import { FALLBACKS } from '@/lib/sanity/fallbacks'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://sakshichawlaacademy.com'

export async function generateMetadata() {
  let seo = FALLBACKS.seoDefaults
  let site = FALLBACKS.siteSettings
  try {
    const [seoData, siteData] = await Promise.all([
      sanityClient.fetch(seoDefaultsQuery, {}, { next: { revalidate: 60 } }),
      sanityClient.fetch(siteSettingsQuery, {}, { next: { revalidate: 60 } }),
    ])
    if (seoData) seo = { ...seo, ...seoData }
    if (siteData) site = { ...site, ...siteData }
  } catch (e) {}

  const title = seo.title || `${site.academyName} — Premium Coaching`
  const description = seo.description
  const keywords = (seo.keywords || '').split(',').map((s) => s.trim()).filter(Boolean)

  return {
    title,
    description,
    keywords,
    metadataBase: new URL(BASE_URL),
    applicationName: site.academyName,
    authors: [{ name: site.academyName }],
    creator: site.academyName,
    publisher: site.academyName,
    alternates: { canonical: '/' },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
    openGraph: {
      title,
      description,
      url: BASE_URL,
      type: 'website',
      siteName: site.academyName,
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    icons: {
      icon: [
        { url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='20' fill='%230F4C81'/%3E%3Ctext x='50%25' y='55%25' font-family='Playfair Display,serif' font-size='58' font-weight='800' fill='%23F59E0B' text-anchor='middle' dominant-baseline='middle'%3ES%3C/text%3E%3C/svg%3E" },
      ],
    },
    formatDetection: { telephone: true, email: true, address: true },
  }
}

export default function RootLayout({ children }) {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Sakshi Chawla Academy',
    description:
      'Premium Mathematics and Science coaching for Class 9 and Class 10, plus Online Vedic Maths classes for Indian and international students.',
    url: BASE_URL,
    logo: `${BASE_URL}/icon.svg`,
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'admissions',
      availableLanguage: ['English', 'Hindi'],
    },
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script dangerouslySetInnerHTML={{ __html: 'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);' }} />
      </head>
      <body suppressHydrationWarning>
        <a href="#home" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-navy-700 focus:text-white focus:rounded-lg">
          Skip to main content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
