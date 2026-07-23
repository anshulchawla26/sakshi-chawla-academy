'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react'
import SectionHeading from '@/components/shared/SectionHeading'

export default function Gallery({ categories, images }) {
  const [active, setActive] = useState('all')
  const [lightbox, setLightbox] = useState(null)

  const filtered = useMemo(() => {
    if (active === 'all') return images
    return images.filter((img) => img.category?.slug?.current === active)
  }, [active, images])

  const openIdx = (idx) => setLightbox(idx)
  const close = () => setLightbox(null)
  const prev = () => setLightbox((i) => (i - 1 + filtered.length) % filtered.length)
  const next = () => setLightbox((i) => (i + 1) % filtered.length)

  return (
    <section id="gallery" className="py-20 md:py-28 bg-white">
      <div className="container">
        <SectionHeading eyebrow="Gallery" title="Inside the Academy" description="Snapshots of learning moments, both offline and online." />

        <div className="flex flex-wrap justify-center gap-2 mb-8" role="tablist" aria-label="Gallery categories">
          <button
            onClick={() => setActive('all')}
            role="tab"
            aria-selected={active === 'all'}
            className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${active === 'all' ? 'bg-navy-600 text-white border-navy-600' : 'bg-white text-navy-700 border-navy-200 hover:border-orange-300'}`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c._id}
              onClick={() => setActive(c.slug.current)}
              role="tab"
              aria-selected={active === c.slug.current}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${active === c.slug.current ? 'bg-navy-600 text-white border-navy-600' : 'bg-white text-navy-700 border-navy-200 hover:border-orange-300'}`}
            >
              {c.name}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {filtered.map((img, idx) => (
            <motion.button
              key={img._id}
              onClick={() => openIdx(idx)}
              aria-label={`Open gallery image: ${img.caption || 'Untitled'}`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: (idx % 8) * 0.04 }}
              whileHover={{ scale: 1.02 }}
              className="relative group aspect-square rounded-2xl overflow-hidden shadow-soft"
            >
              <Image src={img.imageUrl} alt={img.caption || 'Gallery'} fill unoptimized className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <div className="text-white text-xs font-semibold flex items-center gap-1"><Camera className="h-3 w-3" /> {img.caption}</div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-navy-950/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={close}
          >
            <button onClick={(e) => { e.stopPropagation(); prev() }} className="absolute left-4 md:left-8 h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"><ChevronLeft className="h-5 w-5" /></button>
            <button onClick={(e) => { e.stopPropagation(); next() }} className="absolute right-4 md:right-8 h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"><ChevronRight className="h-5 w-5" /></button>
            <button onClick={close} className="absolute top-4 right-4 h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"><X className="h-5 w-5" /></button>
            <motion.div
              key={lightbox}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-5xl w-full aspect-[4/3] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={filtered[lightbox].imageUrl} alt={filtered[lightbox].caption || 'Gallery image'} fill unoptimized className="object-contain" />
            </motion.div>
            <div className="absolute bottom-6 inset-x-0 text-center text-white/90 text-sm">{filtered[lightbox].caption}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
