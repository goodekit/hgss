"use client"

// import { useEffect, useState } from 'react'
import { EllipsisLoader } from 'component/shared/loader'

const LoadingPage = () => {
  // const [textIndex, setTextIndex] = useState(0)
  // const loadingTexts = ['Initializing...', 'Loading Assets...', 'Booting System...', 'Checking Memory...', 'Decompressing Files...']

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTextIndex((prev) => (prev + 1) % loadingTexts.length)
  //   }, 1200)
  //   return () => clearInterval(interval)
  // }, [])

  return (
    <div className="w-full h-screen flex items-center justify-center text-punk font-mono relative overflow-hidden">
      {/* bg-[url('/scanlines.png')] for bg */}
      <EllipsisLoader dotSize={'text-4xl'} dotColor={'text-white'}/>
    </div>
  )
}

export default LoadingPage