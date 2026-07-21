'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star, ExternalLink } from 'lucide-react'
import SectionHeading from '@/components/shared/SectionHeading'
import { Button } from '@/components/ui/button'

export default function GoogleReviews({ items }) {
  return (
    <section id="reviews" className="py-20 md:py-28 bg-white">
      <div className="container">
        <SectionHeading
          eyebrow="Google Reviews"
          title={<span>Rated <span className="text-gradient-orange">4.9 / 5</span> by Real Parents</span>}
          description="Verified reviews from Google — the voice of our community."
        />

        <div className="grid md:grid-cols-3 gap-5 mt-6">
          {items.map((r, i) => (
            <motion.div
              key={r._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="p-6 rounded-3xl bg-gradient-to-br from-white to-navy-50/50 border border-navy-100 hover:shadow-premium transition"
            >
              <div className="flex items-center gap-3">
                <div className="relative h-11 w-11 rounded-full overflow-hidden">
                  <Image src={r.photoUrl} alt={r.reviewerName} fill unoptimized className="object-cover" />
                </div>
                <div>
                  <div className="font-bold text-navy-800">{r.reviewerName}</div>
                  <div className="text-[11px] text-muted-foreground">{r.date}</div>
                </div>
                <svg className="ml-auto h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.75h3.57c2.09-1.93 3.28-4.77 3.28-8.07z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.75c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.12c-.22-.66-.35-1.36-.35-2.12s.13-1.46.35-2.12V7.04H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.96l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.2 1.65l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.04l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" fill="#EA4335"/></svg>
              </div>
              <div className="flex items-center gap-0.5 text-orange-400 mt-3">
                {[...Array(r.rating || 5)].map((_, k) => (<Star key={k} className="h-4 w-4 fill-orange-400" />))}
              </div>
              <p className="mt-3 text-sm text-navy-700 leading-relaxed">“{r.review}”</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button asChild variant="outline" className="border-navy-200 text-navy-700 hover:bg-navy-600 hover:text-white rounded-xl h-11 px-6">
            <a href="https://www.google.com/search?q=Sakshi+Chawla+Academy" target="_blank" rel="noreferrer">View All Reviews <ExternalLink className="h-4 w-4 ml-1.5" /></a>
          </Button>
        </div>
      </div>
    </section>
  )
}
