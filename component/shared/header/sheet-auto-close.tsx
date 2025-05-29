'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export const SheetAutoClose = ({ onClose }: { onClose: () => void }) => {
  const pathname = usePathname()

  useEffect(() => {
    onClose()
  }, [pathname])

  return null
}
