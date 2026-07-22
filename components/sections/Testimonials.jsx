'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import SectionHeading from '@/components/shared/SectionHeading'

export default function Testimonials({ items }) {
  const [i, setI] = useState(0)
  const prev = () => setI((v) => (v - 1 + items.length) % items.length)
  const next = () => setI((v) => (v + 1) % items.length)

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-navy-50/50 to-white">
      <div className="container">
        <SectionHeading eyebrow="Testimonials" title="Loved by Parents & Students" description="What families say about their journey with us." />

        <div className="relative max-w-4xl mx-auto mt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="relative bg-white rounded-3xl border border-navy-100 shadow-premium p-8 md:p-12"
            >
              <Quote className="absolute top-6 right-6 h-10 w-10 text-orange-100" />
              <div className="flex items-center gap-1 text-orange-400">
                {[...Array(items[i]?.rating || 5)].map((_, k) => (<Star key={k} className="h-4 w-4 fill-orange-400" />))}
              </div>
              <p className="mt-5 text-lg md:text-xl text-navy-800 font-medium leading-relaxed">“{items[i]?.review}”</p>
              <div className="mt-6 flex items-center gap-4">
                <div className="relative h-14 w-14 rounded-full overflow-hidden ring-2 ring-orange-200">
                  <Image src={items[i]?.photoUrl} alt={items[i]?.parentName || 'Parent'} fill unoptimized className="object-cover" />
                </div>
                <div>
                  <div className="font-display text-lg font-bold text-navy-800">{items[i]?.parentName}</div>
                  <div className="text-xs text-muted-foreground">Parent of {items[i]?.studentName}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center items-center gap-3 mt-6">
            <button onClick={prev} className="h-11 w-11 rounded-full bg-white border border-navy-200 text-navy-700 hover:bg-navy-600 hover:text-white flex items-center justify-center transition"><ChevronLeft className="h-5 w-5" /></button>
            <div className="flex items-center gap-1.5">
              {items.map((_, k) => (
                <button key={k} onClick={() => setI(k)} className={`h-2 rounded-full transition-all ${k === i ? 'w-8 bg-orange-400' : 'w-2 bg-navy-200'}`} aria-label={`Go to ${k+1}`} />
              ))}
            </div>
            <button onClick={next} className="h-11 w-11 rounded-full bg-white border border-navy-200 text-navy-700 hover:bg-navy-600 hover:text-white flex items-center justify-center transition"><ChevronRight className="h-5 w-5" /></button>
          </div>
        </div>
      </div>
    </section>
  )
}
