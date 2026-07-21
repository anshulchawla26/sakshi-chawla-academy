'use client'

import { motion } from 'framer-motion'

export default function SectionHeading({ eyebrow, title, description, align = 'center', invert = false }) {
  const alignCls = align === 'center' ? 'text-center mx-auto' : 'text-left'
  return (
    <div className={`max-w-3xl ${alignCls} mb-12`}>
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase mb-4 ${
            invert ? 'bg-white/10 text-orange-300 border border-white/20' : 'bg-orange/10 text-orange-500 border border-orange-200'
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
          {eyebrow}
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`font-display text-3xl md:text-5xl font-bold leading-[1.1] ${invert ? 'text-white' : 'text-navy-800'}`}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`mt-4 text-base md:text-lg leading-relaxed ${invert ? 'text-white/70' : 'text-muted-foreground'}`}
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}
