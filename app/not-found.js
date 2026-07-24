import Link from 'next/link'

export const metadata = { title: 'Page Not Found — Sakshi Chawla Academy', robots: { index: false, follow: true } }

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-mesh px-6 py-16">
      <div className="max-w-md text-center">
        <div className="font-display text-6xl md:text-7xl font-bold text-navy-800">404</div>
        <h1 className="mt-2 font-display text-2xl md:text-3xl font-semibold text-navy-800">Page not found</h1>
        <p className="mt-3 text-muted-foreground">
          The page you’re looking for doesn’t exist or has moved. Please head back home and continue exploring.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            href="/"
            className="bg-navy-600 hover:bg-navy-700 text-white rounded-xl px-5 h-11 text-sm font-semibold inline-flex items-center"
          >
            Go home
          </Link>
          <Link
            href="/#contact"
            className="bg-orange-400 hover:bg-orange-500 text-white rounded-xl px-5 h-11 text-sm font-semibold inline-flex items-center"
          >
            Contact us
          </Link>
        </div>
      </div>
    </div>
  )
}
