'use client'

import * as Icons from 'lucide-react'

export default function DynamicIcon({ name = 'Sparkles', className = 'h-6 w-6' }) {
  const Cmp = Icons[name] || Icons.Sparkles
  return <Cmp className={className} />
}
