'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Trophy } from 'lucide-react'
import SectionHeading from '@/components/shared/SectionHeading'

export default function StudentResults({ results }) {
  return (
    <section id="results" className="py-20 md:py-28 bg-navy-50/40">
      <div className="container">
        <SectionHeading eyebrow="Student Results" title="Success Stories that Inspire" description="Real students. Real transformations. Real results." />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
          {results.map((r, i) => (
            <motion.div
              key={r._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-soft border border-navy-100 hover:shadow-premium transition"
            >
              <div className="relative aspect-[4/3]">
                <Image src={r.photoUrl} alt={r.name || 'Student'} fill unoptimized className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-400 text-white text-[11px] font-bold shadow-soft">
                  <Trophy className="h-3 w-3" /> {r.marks}
                </div>
              </div>
              <div className="p-5">
                <h4 className="font-display text-lg font-bold text-navy-800">{r.name}</h4>
                <div className="text-xs text-navy-600 font-semibold">{r.class} • {r.subject}</div>
                <p className="mt-2 text-sm text-muted-foreground leading-snug">{r.story}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
