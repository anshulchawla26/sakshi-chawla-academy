'use client'

import Link from 'next/link'
import { GraduationCap, Phone, MessageCircle, Mail, MapPin, Instagram, Facebook, Youtube, Linkedin, Twitter } from 'lucide-react'

export default function Footer({ site }) {
  const year = new Date().getFullYear()
  const wa = site?.whatsapp?.replace(/\D/g, '') || ''
  return (
    <footer className="bg-navy-900 text-white pt-16 pb-24 md:pb-10">
      <div className="container grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-navy-600 to-navy-800 flex items-center justify-center border border-white/10">
              <GraduationCap className="h-5 w-5 text-orange-400" />
            </div>
            <div>
              <div className="font-display text-lg font-bold">Sakshi Chawla</div>
              <div className="text-[11px] tracking-[0.18em] uppercase text-orange-400 font-semibold">Academy</div>
            </div>
          </div>
          <p className="mt-4 text-sm text-white/70 leading-relaxed">{site?.footerTagline}</p>
          <div className="mt-5 flex items-center gap-3">
            {site?.socialLinks?.instagram && (
              <a href={site.socialLinks.instagram} target="_blank" rel="noreferrer" className="h-9 w-9 rounded-lg bg-white/5 hover:bg-orange-400 hover:text-navy-900 flex items-center justify-center transition"><Instagram className="h-4 w-4" /></a>
            )}
            {site?.socialLinks?.facebook && (
              <a href={site.socialLinks.facebook} target="_blank" rel="noreferrer" className="h-9 w-9 rounded-lg bg-white/5 hover:bg-orange-400 hover:text-navy-900 flex items-center justify-center transition"><Facebook className="h-4 w-4" /></a>
            )}
            {site?.socialLinks?.youtube && (
              <a href={site.socialLinks.youtube} target="_blank" rel="noreferrer" className="h-9 w-9 rounded-lg bg-white/5 hover:bg-orange-400 hover:text-navy-900 flex items-center justify-center transition"><Youtube className="h-4 w-4" /></a>
            )}
            {site?.socialLinks?.linkedin && (
              <a href={site.socialLinks.linkedin} target="_blank" rel="noreferrer" className="h-9 w-9 rounded-lg bg-white/5 hover:bg-orange-400 hover:text-navy-900 flex items-center justify-center transition"><Linkedin className="h-4 w-4" /></a>
            )}
            {site?.socialLinks?.twitter && (
              <a href={site.socialLinks.twitter} target="_blank" rel="noreferrer" className="h-9 w-9 rounded-lg bg-white/5 hover:bg-orange-400 hover:text-navy-900 flex items-center justify-center transition"><Twitter className="h-4 w-4" /></a>
            )}
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-white/70">
            {['About', 'Courses', 'Why Choose Us', 'Student Results', 'Gallery', 'Reviews', 'FAQ', 'Contact'].map((l) => (
              <li key={l}><a href={`#${l.toLowerCase().replace(/ /g, '-').replace('why-choose-us','why-us').replace('student-results','results')}`} className="hover:text-orange-400">{l}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg mb-4">Courses</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li>Class 9 — Maths & Science</li>
            <li>Class 10 — Maths & Science</li>
            <li>Online Vedic Maths</li>
            <li>International Students Welcome</li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-2"><Phone className="h-4 w-4 mt-0.5 text-orange-400" /><a href={`tel:${site?.phone?.replace(/\s/g,'')}`}>{site?.phone}</a></li>
            <li className="flex items-start gap-2"><MessageCircle className="h-4 w-4 mt-0.5 text-orange-400" /><a href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer">WhatsApp</a></li>
            <li className="flex items-start gap-2"><Mail className="h-4 w-4 mt-0.5 text-orange-400" /><a href={`mailto:${site?.email}`}>{site?.email}</a></li>
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 text-orange-400" /><span>{site?.address}</span></li>
          </ul>
        </div>
      </div>

      <div className="container mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/50">
        <p>© {year} Sakshi Chawla Academy. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <Link href="/studio" className="hover:text-orange-400">CMS Studio</Link>
          <a href="#" className="hover:text-orange-400">Privacy Policy</a>
          <a href="#" className="hover:text-orange-400">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  )
}
