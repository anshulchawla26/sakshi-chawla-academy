'use client'

import dynamic from 'next/dynamic'

// sonner's <Toaster /> touches window during render, which can cause SSR/CSR
// hydration mismatches. Load client-side only.
const Toaster = dynamic(() => import('sonner').then((m) => m.Toaster), { ssr: false })

export default function ClientToaster() {
  return <Toaster position="top-right" richColors />
}
