'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import SectionHeading from '@/components/shared/SectionHeading'

export default function FAQ({ items }) {
  return (
    <section id="faq" className="py-20 md:py-28 bg-navy-50/40">
      <div className="container">
        <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" description="Answers to help you make the right decision for your child." />

        {/* Plain div (no framer-motion wrapper) so that Radix's internal useId() calls
            stay in the same order on SSR and CSR. Framer Motion components can shift
            React's useId counter between server and client and cause hydration warnings
            in downstream Radix components like Accordion. */}
        <div className="max-w-3xl mx-auto mt-4">
          <Accordion type="single" collapsible className="space-y-3">
            {items.map((f, i) => (
              <AccordionItem key={f._id} value={`item-${i}`} className="bg-white rounded-2xl border border-navy-100 px-5 shadow-soft data-[state=open]:shadow-premium">
                <AccordionTrigger className="text-left font-display text-base md:text-lg text-navy-800 hover:no-underline">
                  {f.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                  {f.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
