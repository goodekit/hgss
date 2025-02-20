"use client"

import { useTheme } from 'next-themes'
import { systemPalette } from 'design'

const ProductRating = ({ value, caption }: { value: number; caption?: string }) => {
  const { theme, systemTheme } = useTheme()
  const _border                = theme === 'light' ? systemPalette.dark.common.black : theme === 'dark' ? systemPalette.dark.tape.primary : systemTheme === 'dark' ? systemPalette.dark.tape.primary : systemPalette.dark.tape.primary

  const Full = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill={_border} stroke={_border} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rectangle-horizontal"><rect width="20" height="12" x="2" y="6" rx="2" className='' /></svg>
  }
  const Half = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill={_border} stroke={_border} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rectangle-horizontal"><rect width="20" height="12" x="2" y="6" rx="2" className='' /></svg>
  }
  const Empty = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={_border} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rectangle-horizontal"><rect width="20" height="12" x="2" y="6" rx="2"/></svg>
  )

  return (
    <div className="flex gap-2">
      <div className="flex gap-1">
        {value >= 1 ? <Full /> : value >= 0.5 ? <Half /> : <Empty />}
        {value >= 2 ? <Full /> : value >= 1.5 ? <Half /> : <Empty />}
        {value >= 3 ? <Full /> : value >= 2.5 ? <Half /> : <Empty />}
        {value >= 4 ? <Full /> : value >= 3.5 ? <Half /> : <Empty />}
        {value >= 5 ? <Full /> : value >= 4.5 ? <Half /> : <Empty />}
      </div>

      {caption && <span className={"text-sm"}>{caption}</span>}
    </div>
  )
}


export default ProductRating
