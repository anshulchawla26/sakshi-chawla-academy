'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Award, GraduationCap, Trophy, PlayCircle } from 'lucide-react'
import SectionHeading from '@/components/shared/SectionHeading'

function extractYoutubeId(url) {
  if (!url) return null
  const m = url.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/)
  return m ? m[1] : null
}

export default function MeetTeacher({ data }) {
  const ytId = extractYoutubeId(data?.youtubeUrl)

  return (
    <section id="teacher" className="py-20 md:py-28 bg-gradient-to-b from-navy-50/60 to-white">
      <div className="container">
        <SectionHeading eyebrow="Meet Your Teacher" title="Learn from a Passionate Educator" description="Dedicated, experienced and deeply invested in every student's success." />

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center mt-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-orange-400/20 to-navy-500/20 rounded-[2rem] blur-2xl" />
            <div className="relative rounded-[2rem] overflow-hidden shadow-premium">
              <div className="relative aspect-[4/5]">
                <Image src={data?.photoUrl} alt={data?.name} fill unoptimized className="object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-900/85 via-navy-900/50 to-transparent p-6">
                  <div className="text-orange-300 text-xs font-semibold tracking-widest uppercase">{data?.title}</div>
                  <div className="font-display text-3xl font-bold text-white mt-1">{data?.name}</div>
                </div>
              </div>
            </div>
          </motion.div>

          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg text-navy-800 font-medium leading-relaxed"
            >
              {data?.intro}
            </motion.p>
            <p className="mt-4 text-muted-foreground leading-relaxed">{data?.philosophy}</p>

            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              <div className="p-5 rounded-2xl bg-white border border-navy-100 shadow-soft">
                <div className="flex items-center gap-2 text-navy-700"><GraduationCap className="h-5 w-5 text-orange-500" /><span className="font-semibold">Qualifications</span></div>
                <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                  {data?.qualifications?.map((q) => (<li key={q}>• {q}</li>))}
                </ul>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-navy-100 shadow-soft">
                <div className="flex items-center gap-2 text-navy-700"><Award className="h-5 w-5 text-orange-500" /><span className="font-semibold">Experience</span></div>
                <p className="mt-3 text-sm text-muted-foreground">{data?.experience}</p>
              </div>
            </div>

            <div className="mt-5 p-5 rounded-2xl bg-navy-600 text-white">
              <div className="flex items-center gap-2"><Trophy className="h-5 w-5 text-orange-300" /><span className="font-semibold">Achievements</span></div>
              <ul className="mt-3 grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-white/90">
                {data?.achievements?.map((a) => (<li key={a}>• {a}</li>))}
              </ul>
            </div>

            <div className="mt-8">
              {ytId ? (
                <div className="relative rounded-2xl overflow-hidden shadow-soft aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${ytId}`}
                    title="Teacher Introduction"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-navy-700 to-navy-900 aspect-video flex items-center justify-center shadow-soft group cursor-pointer">
                  <PlayCircle className="h-16 w-16 text-orange-400 group-hover:scale-110 transition-transform" />
                  <div className="absolute bottom-4 left-5 text-white/80 text-sm">Video intro coming soon — add via CMS anytime.</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
