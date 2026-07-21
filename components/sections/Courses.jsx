'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Globe, MonitorPlay } from 'lucide-react'
import SectionHeading from '@/components/shared/SectionHeading'
import DynamicIcon from '@/components/shared/DynamicIcon'
import { Button } from '@/components/ui/button'
import { useEnquiry } from '@/components/shared/EnquiryProvider'

const GRADIENTS = {
  navy: 'from-navy-600 via-navy-700 to-navy-800',
  orange: 'from-orange-400 via-orange-500 to-orange-600',
  blend: 'from-navy-600 via-navy-700 to-orange-500',
}

export default function Courses({ courses }) {
  const { openEnquiry } = useEnquiry() || {}

  return (
    <section id="courses" className="py-20 md:py-28 bg-white">
      <div className="container">
        <SectionHeading eyebrow="Our Courses" title="Programs Built for Excellence" description="Choose from expertly designed courses for Class 9, Class 10 and Online Vedic Maths." />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-6">
          {courses.map((c, i) => {
            const gradient = GRADIENTS[c.gradient] || GRADIENTS.navy
            return (
              <motion.div
                key={c._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="relative group"
              >
                <div className={`absolute -inset-1 bg-gradient-to-br ${gradient} rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity`} />
                <div className="relative bg-white rounded-3xl border border-navy-100 shadow-soft group-hover:shadow-premium transition-shadow p-7 h-full flex flex-col">
                  <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${gradient} text-white flex items-center justify-center shadow-soft`}>
                    <DynamicIcon name={c.icon} className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold text-navy-800">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.shortDescription}</p>

                  <div className="mt-5 space-y-2">
                    {c.subjects?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {c.subjects.map((s) => (
                          <span key={s} className="text-[11px] px-2.5 py-1 rounded-full bg-navy-50 text-navy-700 font-semibold">{s}</span>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-xs text-navy-700 font-semibold">
                      <MonitorPlay className="h-3.5 w-3.5 text-orange-500" /> {c.mode}
                    </div>
                    {c.audience && (
                      <div className="flex items-center gap-2 text-xs text-navy-700">
                        <Globe className="h-3.5 w-3.5 text-orange-500" /> {c.audience}
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-5 border-t border-navy-100">
                    <Button onClick={() => openEnquiry?.(c.title)} className="w-full bg-navy-600 hover:bg-navy-700 text-white rounded-xl h-11 group/btn">
                      Enquire Now <ArrowRight className="h-4 w-4 ml-1 group-hover/btn:translate-x-0.5 transition" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
