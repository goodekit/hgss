"use client"

import React, { FC, Fragment, JSX } from "react"
import { cn } from "lib"
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
  icon     ?: JSX.Element |string
  onClick  ?: () => void
  textSize ?: string
}

const textureClasses = [
  'texture-bg',
  'texture-2-bg',
  'texture-3-bg',
  'texture-4-bg',
  'texture-5-bg',
  'texture-6-bg',
  'texture-7-bg',
  'texture-8-bg'
]

export const getRandomTextureClass = () => {
  return textureClasses[Math.floor(Math.random() * textureClasses.length)]
}

const TapeBtn: FC<TapeBtnProps> = ({ href, label, className, disabled, type = 'submit', isLink = false, onClick, icon, isPending, textSize }) => {
//  const randomizedClasses  = NAV_CONFIG.map(() => getRandomTextureClass())
 const renderPendingState = isPending ? ( <EllipsisLoader /> ) : ( <Fragment> {label} {icon} </Fragment> )

  return (
    <button disabled={disabled} type={type} className={cn(`w-full permanent-marker-regular text-black transform -rotate-1 disabled:-rotate-1 disabled:opacity-20 hover:rotate-0 transition-transform disabled:transition-none`, textSize ? textSize : 'text-lg lg:text-4xl', className)} onClick={onClick}>
     {isLink ? <a href={href}>{renderPendingState}</a> : renderPendingState}
    </button>
  )
}

export default TapeBtn
