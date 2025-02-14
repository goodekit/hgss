"use client"

import { useEffect, useState } from 'react'

const LoadingPage = () => {
  const [textIndex, setTextIndex] = useState(0)
  const loadingTexts = ['Initializing...', 'Loading Assets...', 'Booting System...', 'Checking Memory...', 'Decompressing Files...']

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingTexts.length)
    }, 1200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full h-screen flex items-center justify-center text-punk font-mono relative overflow-hidden">
      {/* bg-[url('/scanlines.png')] for bg */}
      <div className="absolute top-0 left-0 w-full h-full opacity-25 pointer-events-none"></div>
      <p className="text-md md:text-md tracking-wide animate-choppy">
        {loadingTexts[textIndex]} <span className="animate-blink">█</span>
      </p>
    </div>
  )
}

export default LoadingPage