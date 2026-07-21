'use client'

import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'

export default function AnimatedCounter({ value = 0, suffix = '', duration = 2 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => {
    if (typeof value === 'number' && !Number.isInteger(value)) {
      return latest.toFixed(1)
    }
    return Math.round(latest).toLocaleString('en-IN')
  })

  useEffect(() => {
    if (inView) {
      const controls = animate(count, Number(value) || 0, { duration, ease: 'easeOut' })
      return () => controls.stop()
    }
  }, [inView, value, count, duration])

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}
