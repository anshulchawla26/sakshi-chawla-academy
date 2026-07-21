import './globals.css'
import { Providers } from './providers'
import { sanityClient } from '@/lib/sanity/client'
import { seoDefaultsQuery, siteSettingsQuery } from '@/lib/sanity/queries'
import { FALLBACKS } from '@/lib/sanity/fallbacks'

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
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://sakshichawlaacademy.com'),
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: site.academyName,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default function RootLayout({ children }) {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Sakshi Chawla Academy',
    description:
      'Premium Mathematics and Science coaching for Class 9 and Class 10, plus Online Vedic Maths classes for Indian and international students.',
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://sakshichawlaacademy.com',
    sameAs: [],
  }

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='20' fill='%230F4C81'/%3E%3Ctext x='50%25' y='55%25' font-family='Playfair Display,serif' font-size='58' font-weight='800' fill='%23F59E0B' text-anchor='middle' dominant-baseline='middle'%3ES%3C/text%3E%3C/svg%3E" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script dangerouslySetInnerHTML={{ __html: 'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);' }} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
