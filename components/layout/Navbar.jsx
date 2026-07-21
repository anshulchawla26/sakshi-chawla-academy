'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEnquiry } from '@/components/shared/EnquiryProvider'

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Courses', href: '#courses' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Results', href: '#results' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar({ site }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { openEnquiry } = useEnquiry() || {}

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-white/85 backdrop-blur-xl border-b border-navy-100 shadow-soft' : 'bg-transparent'
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link href="#home" className="flex items-center gap-2.5 group">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-navy-600 to-navy-800 flex items-center justify-center shadow-soft">
            <GraduationCap className="h-5 w-5 text-orange-400" />
          </div>
          <div className="leading-tight">
            <div className="font-display font-bold text-navy-800 text-base md:text-lg">Sakshi Chawla</div>
            <div className="text-[10px] md:text-xs tracking-[0.18em] uppercase text-orange-500 font-semibold">Academy</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm font-medium text-navy-700 hover:text-orange-500 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <a href={`tel:${site?.phone?.replace(/\s/g, '')}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 hover:text-orange-500">
            <Phone className="h-4 w-4" /> {site?.phone}
          </a>
          <Button onClick={() => openEnquiry?.()} className="bg-orange-400 hover:bg-orange-500 text-white rounded-xl px-5">
            Enquire Now
          </Button>
        </div>

        <button className="lg:hidden p-2 rounded-lg text-navy-700" onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu className="h-6 w-6" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-navy-900/95 backdrop-blur-xl"
          >
            <div className="container flex items-center justify-between h-16 md:h-20">
              <div className="font-display font-bold text-white text-lg">Sakshi Chawla Academy</div>
              <button className="p-2 text-white" onClick={() => setOpen(false)} aria-label="Close menu"><X className="h-6 w-6" /></button>
            </div>
            <nav className="container flex flex-col gap-1 mt-4">
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="text-white text-2xl font-display py-3 border-b border-white/10"
                >
                  {item.label}
                </motion.a>
              ))}
              <Button onClick={() => { setOpen(false); openEnquiry?.() }} className="mt-6 h-12 bg-orange-400 hover:bg-orange-500 text-white rounded-xl">
                Enquire Now
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
