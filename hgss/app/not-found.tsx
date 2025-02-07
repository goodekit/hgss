'use client'

import Image from 'next/image'
import { en } from 'public/locale'
import { ASSET_DIR } from 'hgss-dir'
import { HTTP_RESPONSE } from 'lib/constant'
import { CODE } from 'lib/constant'
import { getRandomTextureClass } from 'lib/util/get-random-texture'

const NotFoundPage = () => {
  const handleNavigateHome = () => (window.location.href = '/')
  return (
    <div className="flex flex-col items-center justify-center min-h-screen shadow-none">
      <Image src={ASSET_DIR.LOGO_ALT} width={60} height={60} alt="logo" priority />
      <div className="p-6 w-1/3 rounded-sm text-center">
        <h4 className="text-lg mt-2">{CODE.NOT_FOUND}</h4>
        <h1 className="text-3xl font-bold mb-4">{HTTP_RESPONSE[404].title}</h1>
        <h6 className="mt-8">{HTTP_RESPONSE[404].description}</h6>
        <button className={`w-1/4 mt-4 ml-2 text-black w-full  ${getRandomTextureClass()} transform -rotate-1 hover:rotate-0 transition-transform`} onClick={handleNavigateHome}>
          {en.go_back}
        </button>
      </div>
    </div>
  )
}

export default NotFoundPage
