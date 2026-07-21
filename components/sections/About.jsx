'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { CheckCircle2, Target, Compass, Heart } from 'lucide-react'
import SectionHeading from '@/components/shared/SectionHeading'

export default function About({ data }) {
  return (
    <section id="about" className="py-20 md:py-28 bg-white">
      <div className="container">
        <SectionHeading eyebrow="About Us" title={data?.heading || 'About the Academy'} description={data?.intro} />

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mt-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-navy-500/15 to-orange-400/15 rounded-3xl blur-2xl" />
            <div className="relative rounded-3xl overflow-hidden shadow-premium">
              <div className="relative aspect-[5/4]">
                <Image src={data?.imageUrl} alt="About Sakshi Chawla Academy" fill unoptimized className="object-cover" />
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 hidden md:block glass rounded-2xl p-4 shadow-soft w-52">
              <div className="text-orange-500 font-display text-3xl font-bold">10+</div>
              <div className="text-xs text-navy-700">Years transforming students</div>
            </div>
          </motion.div>

          <div className="space-y-4">
            {[
              { icon: Target, title: 'Our Mission', text: data?.mission, color: 'text-navy-600', bg: 'bg-navy-50' },
              { icon: Compass, title: 'Our Vision', text: data?.vision, color: 'text-orange-500', bg: 'bg-orange-50' },
              { icon: Heart, title: 'Teaching Philosophy', text: data?.philosophy, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-5 md:p-6 rounded-2xl border border-navy-100 bg-white hover:shadow-soft transition-shadow group"
              >
                <div className="flex items-start gap-4">
                  <div className={`h-12 w-12 rounded-xl ${item.bg} ${item.color} flex items-center justify-center flex-shrink-0`}>
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-navy-800">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {data?.highlights?.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex flex-wrap gap-2 pt-3"
              >
                {data.highlights.map((h) => (
                  <span key={h} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-navy-50 text-navy-700 text-xs font-semibold border border-navy-100">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> {h}
                  </span>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
