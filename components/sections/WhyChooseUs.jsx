'use client'

import { motion } from 'framer-motion'
import SectionHeading from '@/components/shared/SectionHeading'
import DynamicIcon from '@/components/shared/DynamicIcon'

export default function WhyChooseUs({ items }) {
  return (
    <section id="why-us" className="py-20 md:py-28 bg-gradient-to-b from-white to-navy-50/40">
      <div className="container">
        <SectionHeading eyebrow="Why Choose Us" title="The Sakshi Chawla Academy Difference" description="Ten reasons parents trust us with their child’s academic future." />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5 mt-6">
          {items.map((it, i) => (
            <motion.div
              key={it._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 5) * 0.06 }}
              whileHover={{ y: -4 }}
              className="group p-5 rounded-2xl bg-white border border-navy-100 hover:border-orange-300 hover:shadow-premium transition-all"
            >
              <div className="h-11 w-11 rounded-xl bg-navy-50 group-hover:bg-orange-100 text-navy-600 group-hover:text-orange-500 flex items-center justify-center transition-colors">
                <DynamicIcon name={it.icon} className="h-5 w-5" />
              </div>
              <h4 className="mt-3 font-display font-bold text-navy-800 text-sm md:text-base">{it.title}</h4>
              <p className="mt-1 text-xs text-muted-foreground leading-snug">{it.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
