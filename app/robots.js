const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://sakshichawlaacademy.com'

export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/', '/studio/'] },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  }
}
