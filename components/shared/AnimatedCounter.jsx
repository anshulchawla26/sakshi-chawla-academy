'use client'

import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'

function formatValue(current, target) {
  if (typeof target === 'number' && !Number.isInteger(target)) {
    return current.toFixed(1)
  }
  // Use plain integer formatting (locale-independent) to guarantee SSR/CSR match.
  const n = Math.round(current)
  // Simple grouping without Intl to avoid locale differences between Node and browser.
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export default function AnimatedCounter({ value = 0, suffix = '', duration = 2 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [mounted, setMounted] = useState(false)
  // Initial value MUST be identical on server and client to avoid hydration mismatch.
  const initial = formatValue(0, value)
  const [display, setDisplay] = useState(initial)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !inView) return
    const controls = animate(0, Number(value) || 0, {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(formatValue(v, value)),
    })
    return () => controls.stop()
  }, [inView, value, mounted, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  )
}
