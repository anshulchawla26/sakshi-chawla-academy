'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, MessageCircle, Mail, MapPin, Send, Loader2, CheckCircle2 } from 'lucide-react'
import SectionHeading from '@/components/shared/SectionHeading'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'

export default function Contact({ site }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', studentClass: '', message: '' })
  const [state, setState] = useState('idle') // idle | loading | done
  const wa = site?.whatsapp?.replace(/\D/g, '') || ''

  const submit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.phone) return toast.error('Name & phone are required')
    setState('loading')
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setState('done')
      toast.success('Thank you! We will get in touch shortly.')
      setForm({ name: '', phone: '', email: '', studentClass: '', message: '' })
      setTimeout(() => setState('idle'), 2500)
    } catch {
      setState('idle')
      toast.error('Could not submit. Please try WhatsApp or call.')
    }
  }

  return (
    <section id="contact" className="py-20 md:py-28 bg-white">
      <div className="container">
        <SectionHeading eyebrow="Contact" title="Let's Talk About Your Child's Growth" description="Reach us any way you prefer — call, WhatsApp, email, or fill the form." />

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-10 mt-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-4"
          >
            <ContactCard icon={Phone} label="Call Us" value={site?.phone} href={`tel:${site?.phone?.replace(/\s/g,'')}`} color="navy" />
            <ContactCard icon={MessageCircle} label="WhatsApp" value={site?.whatsapp} href={`https://wa.me/${wa}`} color="emerald" external />
            <ContactCard icon={Mail} label="Email" value={site?.email} href={`mailto:${site?.email}`} color="orange" />
            <ContactCard icon={MapPin} label="Address" value={site?.address} color="navy" />

            {site?.googleMapsEmbedUrl && (
              <div className="rounded-2xl overflow-hidden shadow-soft border border-navy-100">
                <iframe
                  src={site.googleMapsEmbedUrl}
                  className="w-full h-56"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location"
                />
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            {/* Plain form (no framer-motion wrapper) so Radix Select's useId() stays
                consistent between SSR and CSR. The parent motion.div still animates. */}
            <form
              onSubmit={submit}
              className="bg-gradient-to-br from-navy-50/60 to-white rounded-3xl p-6 md:p-8 border border-navy-100 shadow-soft"
            >
            <h3 className="font-display text-2xl font-bold text-navy-800">Send an Enquiry</h3>
            <p className="text-sm text-muted-foreground mt-1">Share your details — we’ll personally get in touch.</p>

            <div className="grid sm:grid-cols-2 gap-4 mt-5">
              <div><Label>Name *</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" className="mt-1" /></div>
              <div><Label>Phone *</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91" className="mt-1" /></div>
              <div><Label>Email</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" className="mt-1" /></div>
              <div>
                <Label>Interested In</Label>
                <Select value={form.studentClass} onValueChange={(v) => setForm({ ...form, studentClass: v })}>
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Choose course" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Class 9">Class 9</SelectItem>
                    <SelectItem value="Class 10">Class 10</SelectItem>
                    <SelectItem value="Online Vedic Maths">Online Vedic Maths</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-4">
              <Label>Message</Label>
              <Textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us anything you’d like us to know" className="mt-1" />
            </div>
            <Button type="submit" disabled={state === 'loading'} className="mt-5 w-full sm:w-auto bg-navy-600 hover:bg-navy-700 text-white rounded-xl h-12 px-8">
              {state === 'loading' ? (<><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Sending...</>) : state === 'done' ? (<><CheckCircle2 className="h-4 w-4 mr-2" /> Sent</>) : (<><Send className="h-4 w-4 mr-2" /> Send Enquiry</>)}
            </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ContactCard({ icon: Icon, label, value, href, color = 'navy', external }) {
  const bg = { navy: 'bg-navy-50 text-navy-600', emerald: 'bg-emerald-50 text-emerald-600', orange: 'bg-orange-50 text-orange-500' }[color] || 'bg-navy-50 text-navy-600'
  const Wrapper = href ? 'a' : 'div'
  return (
    <Wrapper
      {...(href ? { href, target: external ? '_blank' : undefined, rel: external ? 'noreferrer' : undefined } : {})}
      className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-navy-100 hover:shadow-soft transition-all"
    >
      <div className={`h-11 w-11 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}><Icon className="h-5 w-5" /></div>
      <div>
        <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{label}</div>
        <div className="text-navy-800 font-semibold text-sm mt-0.5">{value}</div>
      </div>
    </Wrapper>
  )
}
