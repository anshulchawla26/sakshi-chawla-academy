'use client'

import { motion } from 'framer-motion'
import SectionHeading from '@/components/shared/SectionHeading'
import DynamicIcon from '@/components/shared/DynamicIcon'
import { ArrowDown } from 'lucide-react'

export default function LearningProcess({ steps }) {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container">
        <SectionHeading eyebrow="Our Process" title="How Learning Begins" description="A clear, welcoming journey from your first message to consistent progress." />

        <div className="mt-6 relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-14 bottom-14 w-px bg-gradient-to-b from-orange-400 via-navy-300 to-orange-400 hidden md:block" />

          <div className="space-y-6 md:space-y-4">
            {steps.map((s, i) => {
              const left = i % 2 === 0
              return (
                <motion.div
                  key={s._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className={`flex flex-col md:flex-row items-center gap-4 md:gap-8 ${left ? '' : 'md:flex-row-reverse'}`}
                >
                  <div className="md:w-1/2 md:text-right">
                    <div className={`inline-block p-5 md:p-6 rounded-2xl bg-white border border-navy-100 shadow-soft ${left ? 'md:mr-6' : 'md:ml-6 md:text-left'}`}>
                      <div className="text-xs uppercase tracking-wider text-orange-500 font-bold">Step {i + 1}</div>
                      <h4 className="font-display text-xl font-bold text-navy-800 mt-1">{s.title}</h4>
                      <p className="mt-1 text-sm text-muted-foreground">{s.description}</p>
                    </div>
                  </div>

                  <div className="relative z-10 h-14 w-14 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 text-white flex items-center justify-center shadow-premium ring-4 ring-white">
                    <DynamicIcon name={s.icon} className="h-6 w-6" />
                  </div>

                  <div className="md:w-1/2" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
