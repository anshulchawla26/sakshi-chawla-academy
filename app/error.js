'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    // Log to server-side logger in the future; for now just console.
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line no-console
      console.error('Runtime error:', error?.message)
    }
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-mesh px-6 py-16">
      <div className="max-w-md text-center">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-orange-100 text-orange-500 mx-auto mb-6">
          <span className="text-3xl font-bold">!</span>
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-navy-800">Something went wrong</h1>
        <p className="mt-3 text-muted-foreground">
          We hit a small hiccup. Please try again — if it keeps happening, please give us a call.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={() => reset?.()}
            className="bg-navy-600 hover:bg-navy-700 text-white rounded-xl px-5 h-11 text-sm font-semibold"
          >
            Try again
          </button>
          <Link
            href="/"
            className="bg-orange-400 hover:bg-orange-500 text-white rounded-xl px-5 h-11 text-sm font-semibold inline-flex items-center"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  )
}
