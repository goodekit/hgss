import React, { FC, JSX } from "react"
import { NAV_CONFIG } from "hgss-nav"
import { getRandomTextureClass, cn } from "lib"

interface TapeBtnProps {
  label     : JSX.Element | string
  href     ?: string
  className?: string
  type     ?: ButtonType
  index    ?: number
  disabled ?: boolean
  isLink   ?: boolean
  textSize ?: string
  onClick  ?: () => void
}

const TapeBtn: FC<TapeBtnProps> = ({ href, label, className, index = 2, disabled, type = 'submit', isLink = false, onClick, textSize }) => {
 const randomizedClasses = NAV_CONFIG.map(() => getRandomTextureClass())
  return (
    <button disabled={disabled} type={type} className={cn(`w-full xs:text-xl permanent-marker-regular text-black font-bold transform -rotate-1 hover:rotate-0 transition-transform`, randomizedClasses[index], textSize ? textSize : 'text-4xl',  className)} onClick={onClick}>
     {isLink ? <a href={href}>{label}</a> : label}
    </button>
  )
}

export default TapeBtn
