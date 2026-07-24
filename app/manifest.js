export default function manifest() {
  return {
    name: 'Sakshi Chawla Academy',
    short_name: 'SC Academy',
    description:
      'Premium Maths & Science coaching for Class 9 and Class 10. Online Vedic Maths for Indian and international students.',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#ffffff',
    theme_color: '#0F4C81',
    categories: ['education', 'academy', 'coaching'],
    icons: [
      {
        src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='20' fill='%230F4C81'/%3E%3Ctext x='50%25' y='55%25' font-family='Playfair Display,serif' font-size='58' font-weight='800' fill='%23F59E0B' text-anchor='middle' dominant-baseline='middle'%3ES%3C/text%3E%3C/svg%3E",
        sizes: '192x192',
        type: 'image/svg+xml',
        purpose: 'any maskable',
      },
    ],
  }
}
