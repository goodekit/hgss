"use client"

import { EllipsisLoader } from 'component/shared/loader'

const LoadingPage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center text-punk font-mono relative overflow-hidden">
      <EllipsisLoader dotSize={'text-4xl'} />
    </div>
  )
}

export default LoadingPage