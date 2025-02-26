"use client"

import React, { FC, Fragment, JSX } from "react"
import { NAV_CONFIG } from "hgss-nav"
import { getRandomTextureClass, cn } from "lib"
import { EllipsisLoader } from 'component/shared/loader'

interface TapeBtnProps {
  label     : JSX.Element | string
  href     ?: string
  className?: string
  type     ?: ButtonType
  index    ?: number
  isPending?: boolean
  disabled ?: boolean
  isLink   ?: boolean
  textSize ?: string
  icon     ?: JSX.Element |string
  onClick  ?: () => void
}

const TapeBtn: FC<TapeBtnProps> = ({ href, label, className, index = 2, disabled, type = 'submit', isLink = false, onClick, textSize, icon, isPending }) => {
 const randomizedClasses  = NAV_CONFIG.map(() => getRandomTextureClass())
 const renderPendingState = isPending ? ( <EllipsisLoader /> ) : ( <Fragment> {label} {icon} </Fragment> )

  return (
    <button disabled={disabled} type={type} className={cn(`w-full xs:text-md permanent-marker-regular text-black font-bold transform -rotate-1 hover:rotate-0 transition-transform`, randomizedClasses[index], textSize ? textSize : 'text-4xl',  className)} onClick={onClick}>
     {isLink ? <a href={href}>{renderPendingState}</a> : renderPendingState}
    </button>
  )
}

export default TapeBtn
