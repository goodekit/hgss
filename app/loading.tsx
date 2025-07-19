"use client"

import { EllipsisLoader } from 'component/shared/loader'

const LoadingPage = () => {
  return (
    <div className={'w-full h-screen flex items-center justify-center text-punk font-mono relative overflow-hidden permanent-marker-regular'}>
      <EllipsisLoader dotSize={'text-4xl'} dotColor={'text-default'} />
    </div>
  )
}

export default LoadingPage