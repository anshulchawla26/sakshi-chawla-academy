import { FALLBACKS } from '@/lib/sanity/fallbacks'

const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://sakshichawlaacademy.com'

export default function sitemap() {
  const now = new Date()
  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/#about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/#courses`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/#results`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/#gallery`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${BASE}/#reviews`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/#faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/#contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
  ]
}
