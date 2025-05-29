'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function SheetAutoClose({ onClose }: { onClose: () => void }) {
  const pathname = usePathname()

  useEffect(() => {
    onClose()
  }, [pathname])

  return null
}
