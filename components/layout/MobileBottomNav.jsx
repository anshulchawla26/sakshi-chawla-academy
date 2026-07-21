'use client'

import { Phone, MessageCircle, Send } from 'lucide-react'
import { useEnquiry } from '@/components/shared/EnquiryProvider'

export default function MobileBottomNav({ site }) {
  const { openEnquiry } = useEnquiry() || {}
  const wa = site?.whatsapp?.replace(/\D/g, '') || ''

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-navy-100 shadow-[0_-10px_30px_-15px_rgba(15,76,129,0.2)]">
      <div className="grid grid-cols-3">
        <a href={`tel:${site?.phone?.replace(/\s/g, '')}`} className="flex flex-col items-center gap-1 py-2.5 text-navy-700">
          <div className="h-9 w-9 rounded-full bg-navy-50 flex items-center justify-center"><Phone className="h-4 w-4" /></div>
          <span className="text-[11px] font-semibold">Call</span>
        </a>
        <a
          href={`https://wa.me/${wa}`}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center gap-1 py-2.5 text-emerald-600"
        >
          <div className="h-9 w-9 rounded-full bg-emerald-50 flex items-center justify-center"><MessageCircle className="h-4 w-4" /></div>
          <span className="text-[11px] font-semibold">WhatsApp</span>
        </a>
        <button onClick={() => openEnquiry?.()} className="flex flex-col items-center gap-1 py-2.5 text-orange-500">
          <div className="h-9 w-9 rounded-full bg-orange-50 flex items-center justify-center"><Send className="h-4 w-4" /></div>
          <span className="text-[11px] font-semibold">Enquire</span>
        </button>
      </div>
    </div>
  )
}
