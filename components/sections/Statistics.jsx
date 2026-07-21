'use client'

import { motion } from 'framer-motion'
import AnimatedCounter from '@/components/shared/AnimatedCounter'
import DynamicIcon from '@/components/shared/DynamicIcon'

export default function Statistics({ stats }) {
  return (
    <section className="relative py-20 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy-700 via-navy-800 to-navy-900" />
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(at_top_left,rgba(245,158,11,0.35),transparent_50%),radial-gradient(at_bottom_right,rgba(15,76,129,0.5),transparent_60%)]" />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-orange-300 text-xs font-semibold uppercase tracking-wider border border-white/20">Our Impact</div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mt-4">Numbers that Build Trust</h2>
          <p className="mt-3 text-white/70">A decade of dedication, thousands of transformed academic journeys.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center p-5 md:p-6 rounded-2xl glass-dark"
            >
              <div className="mx-auto h-11 w-11 rounded-xl bg-orange-400/20 text-orange-300 flex items-center justify-center">
                <DynamicIcon name={s.icon} className="h-5 w-5" />
              </div>
              <div className="mt-3 font-display text-3xl md:text-4xl font-bold text-white">
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-xs md:text-sm text-white/70">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
