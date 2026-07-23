'use client'

import { useState } from 'react'
import Image from 'next/image'

// Deterministic hue from name (0-360)
function hashHue(str = '') {
  let h = 0
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0
  return Math.abs(h) % 360
}

function initials(name = '') {
  const parts = name.trim().split(/\s+/).slice(0, 2)
  return parts.map((p) => p[0] || '').join('').toUpperCase() || '?'
}

/**
 * Avatar renders a circular photo when a valid URL is provided, or a colored
 * initials fallback when the URL is missing OR fails to load at runtime. Also
 * used as a safety net when an external CDN image 404s or returns a broken response.
 */
export default function Avatar({
  src,
  name = '',
  size = 44,
  className = '',
  ring = false,
}) {
  const [broken, setBroken] = useState(false)
  const useFallback = !src || broken
  const hue = hashHue(name)
  const style = {
    width: size,
    height: size,
    background: useFallback
      ? `linear-gradient(135deg, hsl(${hue} 65% 40%), hsl(${(hue + 40) % 360} 65% 30%))`
      : undefined,
  }

  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full ${ring ? 'ring-2 ring-orange-200' : ''} ${className}`}
      style={style}
      aria-hidden={useFallback ? 'true' : undefined}
    >
      {!useFallback ? (
        <Image
          src={src}
          alt={name || 'Photo'}
          fill
          unoptimized
          onError={() => setBroken(true)}
          sizes={`${size}px`}
          className="object-cover"
        />
      ) : (
        <span
          className="text-white font-semibold"
          style={{ fontSize: Math.max(11, Math.round(size / 2.6)) }}
        >
          {initials(name)}
        </span>
      )}
    </div>
  )
}
