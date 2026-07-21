'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Phone, MessageCircle, Sparkles, Star, ArrowRight, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEnquiry } from '@/components/shared/EnquiryProvider'

export default function Hero({ data, site }) {
  const { openEnquiry } = useEnquiry() || {}
  const wa = site?.whatsapp?.replace(/\D/g, '') || ''

  return (
    <section id="home" className="relative overflow-hidden pt-24 md:pt-28 pb-14 md:pb-24 bg-mesh">
      <div className="absolute -top-40 -right-32 h-[500px] w-[500px] rounded-full bg-orange-400/10 blur-3xl" />
      <div className="absolute -bottom-40 -left-32 h-[500px] w-[500px] rounded-full bg-navy-500/10 blur-3xl" />

      <div className="container relative grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 backdrop-blur border border-navy-100 text-navy-700 text-xs font-semibold"
          >
            <Sparkles className="h-3.5 w-3.5 text-orange-500" />
            {data?.badge || 'Premium Coaching for Class 9, 10 & Vedic Maths'}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-bold leading-[1.05] mt-5 text-navy-800"
          >
            {data?.headingLine1 || 'Build Strong Concepts.'} <br />
            <span className="text-gradient-orange">{data?.headingLine2 || 'Achieve Outstanding Results.'}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed"
          >
            {data?.subheading}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button onClick={() => openEnquiry?.()} size="lg" className="bg-orange-400 hover:bg-orange-500 text-white rounded-xl h-12 px-6 shadow-soft group">
              {data?.primaryCtaLabel || 'Enquire Now'} <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition" />
            </Button>
            <Button asChild size="lg" variant="outline" className="border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white rounded-xl h-12 px-5">
              <a href={`https://wa.me/${wa}?text=${encodeURIComponent('Hi! I would like to enquire about your classes.')}`} target="_blank" rel="noreferrer">
                <MessageCircle className="h-4 w-4 mr-1.5" /> WhatsApp Now
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-navy-200 text-navy-700 hover:bg-navy-600 hover:text-white rounded-xl h-12 px-5">
              <a href={`tel:${site?.phone?.replace(/\s/g,'')}`}>
                <Phone className="h-4 w-4 mr-1.5" /> Call Now
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center gap-6 text-sm text-navy-700"
          >
            <div className="flex items-center gap-2"><Star className="h-4 w-4 text-orange-500 fill-orange-500" /> <b>4.9/5</b> Google Rating</div>
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-500" /> 1500+ Students Trained</div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-gradient-to-br from-orange-400/25 to-navy-500/25 rounded-[2.5rem] blur-2xl" />
          <div className="relative rounded-[2rem] overflow-hidden shadow-premium border border-white/70">
            <div className="aspect-[4/5] md:aspect-[5/6] relative">
              <Image src={data?.imageUrl} alt="Sakshi Chawla Academy — Teacher and students" fill unoptimized className="object-cover" priority />
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="hidden md:block absolute -left-6 top-10 glass rounded-2xl p-4 shadow-soft w-52"
          >
            <div className="text-[11px] uppercase tracking-wider text-navy-700 font-semibold">Board Results 2024</div>
            <div className="font-display text-3xl font-bold text-navy-800 mt-1">96%</div>
            <div className="text-xs text-muted-foreground">Students scored above 90%</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="hidden md:block absolute -right-6 bottom-16 glass rounded-2xl p-4 shadow-soft w-56"
          >
            <div className="flex items-center gap-1 text-orange-500">
              {[...Array(5)].map((_, i) => (<Star key={i} className="h-3.5 w-3.5 fill-orange-500" />))}
            </div>
            <p className="text-xs text-navy-800 font-medium mt-1 leading-snug">"My daughter fell in love with maths again."</p>
            <p className="text-[10px] text-muted-foreground mt-1">— Parent, Class 10</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
