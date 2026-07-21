'use client'

import { createContext, useContext, useState, useCallback } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { Send, Loader2, CheckCircle2 } from 'lucide-react'

const EnquiryContext = createContext(null)

export function useEnquiry() {
  return useContext(EnquiryContext)
}

export function EnquiryProvider({ children }) {
  const [open, setOpen] = useState(false)
  const [defaultCourse, setDefaultCourse] = useState('')

  const openEnquiry = useCallback((course) => {
    setDefaultCourse(course || '')
    setOpen(true)
  }, [])

  return (
    <EnquiryContext.Provider value={{ openEnquiry }}>
      {children}
      <EnquiryModal open={open} onOpenChange={setOpen} defaultCourse={defaultCourse} />
    </EnquiryContext.Provider>
  )
}

function EnquiryModal({ open, onOpenChange, defaultCourse }) {
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', email: '', studentClass: defaultCourse, message: '' })

  const submit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.phone) {
      toast.error('Please share your name and phone number')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('failed')
      setDone(true)
      toast.success('Enquiry sent! We will call you shortly.')
      setTimeout(() => {
        onOpenChange(false)
        setDone(false)
        setForm({ name: '', phone: '', email: '', studentClass: '', message: '' })
      }, 1800)
    } catch (err) {
      toast.error('Could not submit. Please try WhatsApp or call.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg rounded-2xl border-navy-100">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-navy-800">Start Your Enquiry</DialogTitle>
          <DialogDescription>Share a few details and we will personally call you back.</DialogDescription>
        </DialogHeader>
        {done ? (
          <div className="py-10 flex flex-col items-center justify-center text-center">
            <CheckCircle2 className="h-14 w-14 text-emerald-500 mb-3" />
            <p className="font-semibold text-navy-800 text-lg">Thank you!</p>
            <p className="text-sm text-muted-foreground mt-1">We’ll reach out to you very soon.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4 mt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label htmlFor="name">Parent / Student Name *</Label>
                <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91" className="mt-1" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" className="mt-1" />
              </div>
              <div>
                <Label>Interested In</Label>
                <Select value={form.studentClass} onValueChange={(v) => setForm({ ...form, studentClass: v })}>
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Choose course" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Class 9">Class 9</SelectItem>
                    <SelectItem value="Class 10">Class 10</SelectItem>
                    <SelectItem value="Online Vedic Maths">Online Vedic Maths</SelectItem>
                    <SelectItem value="Not sure yet">Not sure yet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="message">Message (optional)</Label>
              <Textarea id="message" rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us anything you’d like us to know" className="mt-1" />
            </div>
            <Button type="submit" disabled={submitting} className="w-full bg-navy-600 hover:bg-navy-700 text-white h-11 rounded-xl">
              {submitting ? (<><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Sending...</>) : (<><Send className="h-4 w-4 mr-2" /> Submit Enquiry</>)}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
