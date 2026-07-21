'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MessageCircle, ArrowUp } from 'lucide-react'

export default function FloatingButtons({ site }) {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const on = () => setShowTop(window.scrollY > 500)
    window.addEventListener('scroll', on)
    return () => window.removeEventListener('scroll', on)
  }, [])

  const wa = site?.whatsapp?.replace(/\D/g, '') || ''

  return (
    <div className="hidden md:flex flex-col gap-3 fixed right-5 bottom-6 z-40">
      <a
        href={`https://wa.me/${wa}?text=${encodeURIComponent('Hi! I’d like to know more about your classes.')}`}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="h-14 w-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-premium hover:scale-110 transition-transform"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
      <a
        href={`tel:${site?.phone?.replace(/\s/g, '')}`}
        aria-label="Call"
        className="h-14 w-14 rounded-full bg-navy-600 hover:bg-navy-700 text-white flex items-center justify-center shadow-premium hover:scale-110 transition-transform"
      >
        <Phone className="h-6 w-6" />
      </a>
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className="h-12 w-12 rounded-full bg-orange-400 hover:bg-orange-500 text-white flex items-center justify-center shadow-premium hover:scale-110 transition-transform"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
